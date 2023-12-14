window.onload = () => {
    
    viewAll();
    let defaultOption = document.getElementById('defaultOption')

}
let viewAll = () => {
    let selectEl = document.getElementById('selectCategoryEl');
    let selectSpecificEl = document.getElementById('selectSpecificCat');
    let outputEl = document.getElementById('output')    
    let allCatUrl = 'http://localhost:8081/api/categories'
    let allProductsURL = 'http://localhost:8081/api/products';


    selectEl.onchange = () => {
        if (selectEl.value === '1') {
            outputEl.innerHTML = '';
            selectSpecificEl.classList.toggle('d-none');
            // Fetch categories
            fetch(allCatUrl)
                .then((res)=>res.json())
                .then((allCategories)=>{
                    allCategories.forEach((category)=>{
                        let option = document.createElement('option');
                        option.value = category.categoryId
                        option.textContent = category.name;
                        selectSpecificEl.appendChild(option); 
                    })
                })
        }
        else if (selectEl.value === '2') {
            outputEl.innerHTML = '';
            // Fetch all products
            fetch(allProductsURL)
                .then((res)=>res.json())
                .then((allProducts)=>{
                    allProducts.forEach(product => {
                        let li = document.createElement('li');
                        li.innerHTML = `${product.productName} `
                        li.value = product.productId;
                        let link = document.createElement('a')
                        link.innerHTML = 'see details'
                        link.href = `product.html?id=${product.productId}`
                        li.appendChild(link)
                        outputEl.appendChild(li);
                    });

                })
        }
    }

    selectSpecificEl.onchange = () => {
        outputEl.innerHTML = '';
        
        fetch(allProductsURL)
            .then((res)=>res.json())
            .then((allProducts)=>{
                let selectedCategory = allProducts.filter((product => {
                    return product.categoryId === Number(selectSpecificEl.value)
                }))
                selectedCategory.forEach((product)=> {
                    let li = document.createElement('li');
                    li.innerHTML = `${product.productName} `
                    li.value = product.productId;
                    let link = document.createElement('a');
                    link.innerHTML = 'see details'
                    link.href = `product.html?id=${product.productId}`
                    li.appendChild(link)
                    outputEl.appendChild(li);
                })
            })
    }
}