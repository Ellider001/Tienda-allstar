document.addEventListener("DOMContentLoaded", function() {
    // Carrito
    const btnCart = document.querySelector('.container-cart-icon');
    const containerCartProducts = document.querySelector('.container-cart-products');
    const rowProduct = document.querySelector('.row-product');
    const productsList = document.querySelector('.container-items');
    const valorTotal = document.querySelector('.total-pagar');
    const countProducts = document.querySelector('#contador-productos');
    const cartEmpty = document.querySelector('.cart-empty');
    const cartTotal = document.querySelector('.cart-total');
    const linkComprar = document.getElementById('link-comprar'); // Agregado

    // Lista de productos en el carrito
    let allProducts = [];

    // Mostrar/Ocultar carrito
    if (btnCart && containerCartProducts) {
        btnCart.addEventListener('click', () => {
            containerCartProducts.classList.toggle('hidden-cart');
        });
    }

    // Añadir productos al carrito
    if (productsList) {
        productsList.addEventListener('click', e => {
            if (e.target.classList.contains('btn-add-cart')) {
                const product = e.target.closest('.item');
                const title = product.querySelector('h2').textContent;
                const priceText = product.querySelector('.price').textContent;
                const price = parseFloat(priceText.replace(/[$,]/g, '')); // Elimina el signo $ y las comas

                const existingProduct = allProducts.find(prod => prod.title === title);

                if (existingProduct) {
                    existingProduct.quantity++;
                } else {
                    allProducts.push({
                        title,
                        price,
                        quantity: 1
                    });
                }

                showHTML();
            }
        });
    }

    // Eliminar productos del carrito
    if (rowProduct) {
        rowProduct.addEventListener('click', e => {
            if (e.target.classList.contains('icon-close')) {
                const product = e.target.closest('.cart-product');
                const title = product.querySelector('.titulo-producto-carrito').textContent;

                allProducts = allProducts.filter(prod => prod.title !== title);

                showHTML();
            }
        });
    }

    // Mostrar carrito en HTML
    const showHTML = () => {
        if (allProducts.length === 0) {
            if (cartEmpty) cartEmpty.classList.remove('hidden');
            if (rowProduct) rowProduct.classList.add('hidden');
            if (cartTotal) cartTotal.classList.add('hidden');
            if (linkComprar) linkComprar.classList.add('hidden');
        } else {
            if (cartEmpty) cartEmpty.classList.add('hidden');
            if (rowProduct) rowProduct.classList.remove('hidden');
            if (cartTotal) cartTotal.classList.remove('hidden');
            if (linkComprar) linkComprar.classList.remove('hidden');
        }

        if (rowProduct) rowProduct.innerHTML = '';
        let total = 0;
        let totalOfProducts = 0;

        allProducts.forEach(product => {
            const containerProduct = document.createElement('div');
            containerProduct.classList.add('cart-product');

            containerProduct.innerHTML = `
                <div class="info-cart-product">
                    <span class="cantidad-producto-carrito">${product.quantity}</span>
                    <p class="titulo-producto-carrito">${product.title}</p>
                    <span class="precio-producto-carrito">$${product.price.toFixed(2)}</span>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="icon-close">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
                </svg>
            `;

            if (rowProduct) rowProduct.append(containerProduct);
            total += product.quantity * product.price;
            totalOfProducts += product.quantity;
        });

        if (valorTotal) valorTotal.innerText = `$${total.toFixed(2)}`;
        if (countProducts) countProducts.innerText = totalOfProducts;
    };

    // Modal
    const modals = document.querySelectorAll('.modal');
    const triggerImages = document.querySelectorAll('.triggerImage');
    const spans = document.getElementsByClassName("close");

    function openModal(modal) {
        modal.style.display = "block";
    }

    function closeModal(modal) {
        modal.style.display = "none";
    }

    triggerImages.forEach((img) => {
        img.onclick = function() {
            const modalId = img.getAttribute('data-modal');
            const modal = document.getElementById(modalId);
            if (modal) openModal(modal);
        };
    });

    Array.from(spans).forEach((span) => {
        span.onclick = function() {
            const modal = span.closest('.modal');
            if (modal) closeModal(modal);
        };
    });

    window.onclick = function(event) {
        modals.forEach(modal => {
            if (event.target === modal) {
                closeModal(modal);
            }
        });
    };

    // Catalogo
    const uploadCatalogButton = document.getElementById("uploadCatalogButton");
    const catalogUploadForm = document.getElementById("catalogUploadForm");
    const catalogContainer = document.getElementById("catalogContainer");

    if (uploadCatalogButton) {
        uploadCatalogButton.addEventListener("click", function() {
            if (catalogUploadForm) catalogUploadForm.classList.toggle("hidden");
        });
    }

    if (catalogUploadForm) {
        catalogUploadForm.addEventListener("submit", function(event) {
            event.preventDefault();

            const name = document.getElementById("catalogName").value;
            const price = document.getElementById("catalogPrice").value;
            const description = document.getElementById("catalogDescription").value;
            const imageFile = document.getElementById("catalogImage").files[0];

            const newCatalogItem = document.createElement("div");
            newCatalogItem.classList.add("item");

            const imageURL = URL.createObjectURL(imageFile);

            newCatalogItem.innerHTML = `
                <figure>
                    <img src="${imageURL}" alt="${name}" class="triggerImage">
                </figure>
                <div class="info-product">
                    <h2>${name}</h2>
                    <p class="price">${price}</p>
                    <p>${description}</p>
                    <button class="btn-add-cart">Añadir al carrito</button>
                </div>
            `;

            catalogContainer.appendChild(newCatalogItem);
            catalogUploadForm.reset();
            if (catalogUploadForm) catalogUploadForm.classList.add("hidden");
        });
    }
});


