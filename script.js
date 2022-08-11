var root = document.querySelector('#root');
var button = root.querySelector("#root button")

button.addEventListener("click", () => {
	if (checkStorageForItem() === null) {
		localStorage.setItem('2053266', JSON.stringify(buildProductJson()));
	} else {
		var item = JSON.parse(localStorage.getItem('2053266'));
		item.qty++
		localStorage.setItem('2053266', JSON.stringify(item));
	}
	

})

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