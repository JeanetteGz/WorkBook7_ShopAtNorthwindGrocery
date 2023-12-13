window.onload = () => {
    let mainDropdownSelect = document.getElementById("searchOption");
    let categoryDropdownOptions = document.getElementById("category");
    let productsList = document.getElementById("results");

    mainDropdownSelect.addEventListener("change", () => {
        if (mainDropdownSelect.value === "searchByCategory") {
            fetch("http://localhost:8081/api/categories")
                .then((res) => res.json())
                .then((allCategories) => {
                    categoryDropdownOptions.innerHTML = ''; // Clear previous options
                    for (let category of allCategories) {
                        var optionElement = document.createElement("option");
                        optionElement.textContent = category.name;
                        optionElement.value = category.categoryId;
                        categoryDropdownOptions.appendChild(optionElement);
                    }
                });
        }
        if (mainDropdownSelect.value === "viewAll") {
            fetch("http://localhost:8081/api/products")
                .then((res) => res.json())
                .then((allProducts) => {
                    productsList.innerHTML = ' '; // Clear previous content
                    for (let product of allProducts) {
                        productsList.innerHTML += `${product.productName} <a href="${product.productId}">${product.productName}</a><br>`;
                    }
                });
        }
    });

    categoryDropdownOptions.addEventListener("change", () => {
        let selectedCategory = categoryDropdownOptions.value;
        fetch("http://localhost:8081/api/products")
            .then((res) => res.json())
            .then((allProducts) => {
                let products = allProducts.filter(val => val.categoryId == selectedCategory);
                productsList.innerHTML = ' '; // Clear previous content
                for (let product of products) {
                    productsList.innerHTML += `${product.productName} <br>`;
                }
            });
    });
};
