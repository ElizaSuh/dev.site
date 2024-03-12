var products = [
    {
        "SKU": "SKU12345",
        "Product": "Stainless Steel Toaster",
        "Price": 39.99,
        "Image": "https://m.media-amazon.com/images/I/613d2Gt6zuL._AC_UF894,1000_QL80_.jpg"
    },
    {
        "SKU": "SKU23456",
        "Product": "Robotic Vacuum Cleaner",
        "Price": 199.99,
        "Image": "https://m.media-amazon.com/images/I/61me8luG2-L._AC_UF894,1000_QL80_.jpg"
    },
    {
        "SKU": "SKU34567",
        "Product": "Electric Kettle",
        "Price": 29.99,
        "Image": "https://img.fruugo.com/product/0/79/1073635790_max.jpg"
    },
    {
        "SKU": "SKU45678",
        "Product": "Air Fryer",
        "Price": 79.99,
        "Image": "https://helios-i.mashable.com/imagery/reviews/03IFfpErBQS4LomGIBBrWpF/hero-image.fill.size_1200x900.v1631027710.jpg"
    },
    {
        "SKU": "SKU56789",
        "Product": "Microwave Oven",
        "Price": 99.99,
        "Image": "https://shop.union.ph/cdn/shop/products/1_14a51e69-e26b-40bd-8715-f26623b19f50_2048x2048.jpg?v=1688452647"
    },
    {
        "SKU": "SKU67890",
        "Product": "Coffee Maker",
        "Price": 49.99,
        "Image": "https://i5.walmartimages.com/seo/Mainstays-Black-5-Cup-Drip-Coffee-Maker-New_16f77040-27ab-4008-9852-59c900d7a7d9_1.c524f1d9c465e122596bf65f939c8d26.jpeg"
    },
    {
        "SKU": "SKU78901",
        "Product": "Food Processor",
        "Price": 69.99,
        "Image": "https://www.wmf.com/cdn-cgi/image/quality=85/media/catalog/product/cache/3fa49c88302b6836da2cf41e5d97366d/3/c/3c9d79ad-37ca-492d-b84a5f34e5f7947a-696ff880-3200000431-20211019-152604.jpg"
    },
    {
        "SKU": "SKU89012",
        "Product": "Handheld Steamer",
        "Price": 34.99,
        "Image": "https://m.media-amazon.com/images/I/71iYDpeMfIL._AC_UF894,1000_QL80_.jpg"
    },
    {
        "SKU": "SKU90123",
        "Product": "Blender",
        "Price": 49.99,
        "Image": "https://s7d9.scene7.com/is/image/NewellRubbermaid/DC_42622_Oster_2022_Innovation_PowerBlender_EasyTouchTechnology_Update_Enhanced_ATF_1"
    },
    {
        "SKU": "SKU01234",
        "Product": "Slow Cooker",
        "Price": 39.99,
        "Image": "https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1696867682-61X5kPlRg0L.jpg?crop=1xw:1.00xh;center,top&resize=980:*"
    }
];


var template = document.querySelector(".product.template");

products.forEach(function(product){
	setTimeout(function() {
		var newProduct = template.cloneNode(true);
		var image = newProduct.querySelector("img");
		var name = newProduct.querySelector(".name");
		var price = newProduct.querySelector(".price span");
	
		newProduct.classList.remove("template");
		newProduct.setAttribute("data-sku", product["SKU"]);
		image.src = product["Image"];
		name.textContent = product["Product"]
		price.textContent = product["Price"]
	
		// template.parentElement.appendChild(newProduct);
	
		template.parentElement.appendChild(newProduct);
		newProduct.setAttribute("style", "display:flex");
	}, 100);
});
