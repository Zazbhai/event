document.addEventListener("DOMContentLoaded", () => {
    const fileInput = document.getElementById("fileInput");
    const preview = document.getElementById("preview");
    const uploadForm = document.getElementById("uploadForm");
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");

    // Load images from localStorage
    let uploadedImages = JSON.parse(localStorage.getItem("uploadedImages")) || [];

    function displayImages() {
        preview.innerHTML = "";
        uploadedImages.forEach((image, index) => {
            const img = document.createElement("img");
            img.src = image;
            img.alt = `Uploaded Image ${index + 1}`;
            img.classList.add("preview-img");
            img.onclick = () => openLightbox(image);
            preview.appendChild(img);
        });
    }

    displayImages(); // Show images on page load

    uploadForm.addEventListener("submit", (e) => {
        e.preventDefault();
        if (fileInput.files.length === 0) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            uploadedImages.push(event.target.result);
            localStorage.setItem("uploadedImages", JSON.stringify(uploadedImages));
            displayImages(); // Refresh preview
        };
        reader.readAsDataURL(fileInput.files[0]);

        fileInput.value = ""; // Clear input
    });

    function openLightbox(imageSrc) {
        lightboxImg.src = imageSrc;
        lightbox.style.display = "flex";
    }

    function closeLightbox() {
        lightbox.style.display = "none";
    }

    lightbox.addEventListener("click", (e) => {
        if (e.target !== lightboxImg) closeLightbox();
    });
});


// Function to open the lightbox with the clicked image
function openLightbox(imageSrc) {
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");

    lightbox.style.display = "flex"; // Show lightbox
    lightboxImg.src = imageSrc; // Set clicked image as lightbox content
}

// Function to close the lightbox when clicking outside the image
function closeLightbox() {
    document.getElementById("lightbox").style.display = "none";
}
