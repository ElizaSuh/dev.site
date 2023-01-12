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


	})
}

// if (window.location.href.includes("cart") && checkStorageForItem()) {
// 	fillCartData();
// 	emptyCart.style.setProperty("display", "none")
// }

// if (button.classList.contains("checkout")) {
// 	button.addEventListener("click", () => {
// 		localStorage.removeItem('cart');
// 		window.location.href="./index.html";
// 	})
// } else {
// 	var sku = button.getAttribute("sku");
// 	button.addEventListener("click", () => {
// 		if (checkStorageForItem() === null) {
// 			var cart = {};
// 			cart[sku] = buildProductJson(button)
// 			localStorage.setItem('cart', JSON.stringify(cart));
// 		} else {
// 			var cart = JSON.parse(localStorage.getItem('cart'));
// 			cart[sku] ? cart[sku].qty++ : cart[sku] = buildProductJson(button);
// 			localStorage.setItem('cart', JSON.stringify(cart));
// 		}


// 	})
// }

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
