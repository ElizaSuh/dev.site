var root = document.querySelector('#root');

// cart page logic
if (window.location.href.includes("cart")) {
	var button = root.querySelector("#root button");
	var productInCart = root.querySelector(".product-in-cart.item")
	var emptyCart = root.querySelector(".product-in-cart.no-items-found")
	
// 	fill cart with stored data
	if (checkStorageForItem()) {
		fillCartData();
		emptyCart.style.setProperty("display", "none")
	}
	
// 	clear cart after checkout
	button.addEventListener("click", () => {
		firePurchaseEvent();
		localStorage.removeItem('cart');
		window.location.href="./index.html";
	})
} 

// product page logic
else if (window.location.href.includes("product")){
	var button = root.querySelector("#root button");
	var sku = button.getAttribute("sku");
	
	button.addEventListener("click", () => {
		if (checkStorageForItem() === null) {
			var cart = {};
			cart[sku] = buildProductJson(button)
			localStorage.setItem('cart', JSON.stringify(cart));
		} else {
			var cart = JSON.parse(localStorage.getItem('cart'));
			cart[sku] ? cart[sku].qty++ : cart[sku] = buildProductJson(button);
			localStorage.setItem('cart', JSON.stringify(cart));
		}
		fireAddToCartEvent(button);
	})
}

function buildProductJson(el){
	return {
		"name": el.getAttribute("name"),
		"price": el.getAttribute("price"),
		"qty" : 1
	}
}

function checkStorageForItem(){
	return localStorage.getItem('cart');
}

function fillCartData(){
	var cart = JSON.parse(localStorage.getItem('cart'));
	if(cart) {
		Object.keys(cart).forEach(product => {
			var newEl = createNewNode();
			var title = newEl.querySelector(".name");
			var price = newEl.querySelector(".price");
			var quantity = newEl.querySelector(".quantity");

			title.textContent = cart[product].name;
			price.textContent = cart[product].price;
			quantity.textContent = cart[product].qty;

			appendNewNode(newEl);
		})
	}
}

function createNewNode(){
	return productInCart.cloneNode(true)
}

function appendNewNode(node){
	productInCart.parentElement.appendChild(node);
	node.style.setProperty("display", "flex")
}

function firePurchaseEvent(){
  var total = 0;
  var cartStatus = [];
  var cart = JSON.parse(localStorage.getItem("cart"));

  Object.keys(cart).forEach(item => {
    total += cart[item].price * cart[item].qty

    cartStatus.push({
      productId: item,
      quantity: cart[item].qty,
      itemPrice: cart[item].price,
    })
  })

  DY.API("event", {
    name: "Purchase",
    properties: {
      uniqueTransactionId: Math.floor(Math.random()*10e20),
      dyType: "purchase-v1",
      value: total,
      currency: "EUR",
      cart: cartStatus
    }
  });
}

function fireAddToCartEvent(button){
	DY.API("event", {
	  name: "Add to Cart",
	  properties: {
	    dyType: "add-to-cart-v1",
	    value: button.getAttribute("price"),
	    currency: "EUR",
	    productId: button.getAttribute("sku"),
	    quantity: 1
	  }
	});
}
