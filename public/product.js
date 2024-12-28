import products from './products.js';
import cart from './cart.js';

const app = document.getElementById('app');
const temporaryContent = document.getElementById('temporaryContent');

// Function to load layout file
const loadTemplate = () => {
    fetch('./template.html')
        .then((response) => {
            if (!response.ok) throw new Error('Failed to load template');
            return response.text();
        })
        .then((html) => {
            app.innerHTML = html;

            const contentTab = document.getElementById('contentTab');
            if (contentTab) {
                contentTab.innerHTML = temporaryContent.innerHTML;
                temporaryContent.innerHTML = null;
            }

            cart(); // Initialize cart
            initApp(); // Initialize app
        })
        .catch((error) => console.error('Error loading template:', error));
};

// Function to initialize the app
const initApp = () => {
    const listProductHTML = document.querySelector('.listProduct');
    if (!listProductHTML) {
        console.error('Product list container not found!');
        return;
    }

    listProductHTML.innerHTML = ''; // Clear existing content

    // Populate products
    products.forEach((product) => {
        if (!product.id || !product.image || !product.name || !product.price) {
            console.warn('Invalid product data:', product);
            return;
        }

        const newProduct = document.createElement('div');
        newProduct.classList.add('item');
        newProduct.innerHTML = `
            <a href="./detail.html?id=${product.id}">
                <img src="${product.image}" alt="${product.name}">
            </a>
            <h2>${product.name}</h2>
            <div class="price">$${product.price.toFixed(2)}</div>
            <button 
                class="addCart" 
                data-id="${product.id}">
                Add To Cart
            </button>`;
        listProductHTML.appendChild(newProduct);
    });

    // Add event listeners for "Add to Cart" buttons
    document.querySelectorAll('.addCart').forEach((button) => {
        button.addEventListener('click', (event) => {
            const productId = event.target.dataset.id;
            cart.addToCart(productId); // Call cart.js function
        });
    });
};

// Load the template on page load
loadTemplate();
