var root = document.querySelector('#root');
if (root.querySelector("#root button")) {
	var button = root.querySelector("#root button");
}
if (root.querySelector(".product-in-cart")) {
	var productInCart = root.querySelector(".product-in-cart")
}

if (productInCart) {
	var name = productInCart.querySelector(".name");
	var price = productInCart.querySelector(".price");
	var quantity = productInCart.querySelector(".quantity");
	fillCartData(name, price, quantity);
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
		"name": "EOS 500D body",
		"price": "1695.36",
		"qty" : 1
	}
}

function checkStorageForItem(){
	return localStorage.getItem('2053266');
}

function fillCartData(name, price){
	var item = JSON.parse(localStorage.getItem('2053266'));
	name.textContent = item.name;
	price.textContent = item.price;
	quantity.textContent = item.qty;
}
