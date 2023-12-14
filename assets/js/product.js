const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');


//Fetch to get product details by ID
fetch(`http://localhost:8081/api/products/${productId}`)
    .then((res) => res.json())
    .then((product) => {
        const productTitleElement = document.getElementById('productTitle');
        const productDescriptionElement = document.getElementById('productDescription');
        productTitleElement.textContent = `${product.productName}`;
        productDescriptionElement.textContent = `Supplier: ${product.supplier}, Price: $${product.unitPrice}`;
    })