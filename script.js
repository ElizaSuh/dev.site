var root = document.querySelector('#root');
if (root.querySelector("#root button")) {
	var button = root.querySelector("#root button");
}
if (root.querySelector(".product-in-cart.item")) {
	var productInCart = root.querySelector(".product-in-cart.item")
}
if (root.querySelector(".product-in-cart.no-items-found")) {
	var emptyCart = root.querySelector(".product-in-cart.no-items-found")
}

if (checkStorageForItem()) {
	var sku = button.getAttribute("sku");
	var title = productInCart.querySelector(".name");
	var price = productInCart.querySelector(".price");
	var quantity = productInCart.querySelector(".quantity");
	fillCartData(sku, title, price, quantity);
	productInCart.style.setProperty("display", "flex")
	emptyCart.style.setProperty("display", "none")
}

if (button.classList.contains("checkout")) {
	button.addEventListener("click", () => {
		localStorage.removeItem('cart');
		window.location.href="./index.html";
	})
} else {
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

function fillCartData(sku, title, price, quantity){
	var cart = JSON.parse(localStorage.getItem('cart'));
	if(cart) {
		title.textContent = cart[sku].name;
		price.textContent = cart[sku].price;
		quantity.textContent = cart[sku].qty;
	}
}
