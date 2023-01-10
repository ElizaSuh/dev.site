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

if (checkStorageForItem) {
	var image = productInCart.querySelector("img");
	var name = productInCart.querySelector(".name");
	var price = productInCart.querySelector(".price");
	var quantity = productInCart.querySelector(".quantity");
	fillCartData(image, name, price, quantity);
	productInCart.style.setProperty("display", "flex")
	emptyCart.style.setProperty("display", "none")
}

if (button.classList.contains("checkout")) {
	button.addEventListener("click", () => {
		localStorage.removeItem('2053266');
		window.location.href="./index.html";
	})
} else {
	button.addEventListener("click", () => {
		if (checkStorageForItem() === null) {
			localStorage.setItem('2053266', JSON.stringify(buildProductJson()));
		} else {
			var item = JSON.parse(localStorage.getItem('2053266'));
			item.qty++
			localStorage.setItem('2053266', JSON.stringify(item));
		}


	})
}

function buildProductJson(){
	return {
		"image": "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1064&q=80",
		"name": "EOS 500D body",
		"price": "1695.36",
		"qty" : 1
	}
}

function checkStorageForItem(){
	return localStorage.getItem('2053266');
}

function fillCartData(image, name, price, quantity){
	var item = JSON.parse(localStorage.getItem('2053266'));
	if(item) {
		image.src = item.image;
		name.textContent = item.name;
		price.textContent = item.price;
		quantity.textContent = item.qty;
	}
}
