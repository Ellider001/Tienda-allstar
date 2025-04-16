document.addEventListener("DOMContentLoaded", function() {
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
            catalogUploadForm.classList.add("hidden");
        });
    }
});





