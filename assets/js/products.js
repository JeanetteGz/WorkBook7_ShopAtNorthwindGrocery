// productDetails.js

// Get the product ID from the URL
const productId = new URLSearchParams(window.location.search).get('productId');

// Check if productId is present; otherwise, redirect to the home page
if (!productId) {
    window.location.href = 'index.html';
}

// Fetch product details based on productId
fetch(`http://localhost:8081/api/products/${productId}`)
    .then(response => response.json())
    .then(product => {
        const productDetailsContainer = document.querySelector(".product-details-container");

        // Create and append elements for each property
        for (const [key, value] of Object.entries(product)) {
            const propertyDiv = document.createElement("div");
            propertyDiv.classList.add("product-item");

            const propertyNameSpan = createSpan("property-name", `${key}:`);
            const propertyValueSpan = createSpan("property-value", formatPropertyValue(key, value));

            propertyDiv.appendChild(propertyNameSpan);
            propertyDiv.appendChild(propertyValueSpan);

            productDetailsContainer.appendChild(propertyDiv);
        }

        // Add a link to go back to the home page
        const detailsLink = document.createElement("div");
        detailsLink.classList.add("details-link");

        const homeLink = createLink("index.html", "Back to Home");

        detailsLink.appendChild(homeLink);
        productDetailsContainer.appendChild(detailsLink);
    })
    .catch(error => console.error("Error fetching product details:", error));

// Helper function to create a span element with a class and text content
function createSpan(className, textContent) {
    const span = document.createElement("span");
    span.classList.add(className);
    span.textContent = textContent;
    return span;
}

// Helper function to create a link element with an href and text content
function createLink(href, textContent) {
    const link = document.createElement("a");
    link.href = href;
    link.textContent = textContent;
    return link;
}

// Helper function to format property values
function formatPropertyValue(key, value) {
    return (key === "unitPrice") ? `$${parseFloat(value).toFixed(2)}` : value;
}
