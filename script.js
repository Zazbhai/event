// ======================
// Reviews Functionality
// ======================

// Initialize reviews in localStorage if not already present
if (localStorage.getItem('reviews') === null) {
    localStorage.setItem('reviews', JSON.stringify([]));
}

// Load reviews from localStorage
const reviews = JSON.parse(localStorage.getItem('reviews'));
const reviewList = document.getElementById('reviewList');

function loadReviews() {
    reviews.forEach(review => {
        const reviewItem = document.createElement('div');
        reviewItem.classList.add('review-item');
        reviewItem.innerHTML = `
            <h3>${review.name}</h3>
            <p>${review.text}</p>
        `;
        reviewList.appendChild(reviewItem);
    });
}

loadReviews();

// Add new review
if (document.getElementById('reviewForm')) {
    document.getElementById('reviewForm').addEventListener('submit', function (e) {
        e.preventDefault();
        const name = document.getElementById('reviewName').value;
        const text = document.getElementById('reviewText').value;

        if (name && text) {
            const review = { name, text };
            reviews.push(review);
            localStorage.setItem('reviews', JSON.stringify(reviews));

            const reviewItem = document.createElement('div');
            reviewItem.classList.add('review-item');
            reviewItem.innerHTML = `
                <h3>${name}</h3>
                <p>${text}</p>
            `;
            reviewList.appendChild(reviewItem);

            // Clear the form
            document.getElementById('reviewForm').reset();
        }
    });
}

// ======================
// Popup Functionality
// ======================

function showPopup(title) {
    const popup = document.getElementById('popup');
    const popupTitle = document.getElementById('popupTitle');
    const popupDescription = document.getElementById('popupDescription');

    popupTitle.textContent = title;
    popupDescription.textContent = `More details about ${title} will be available soon.`;
    popup.style.display = 'flex';
}

function closePopup() {
    const popup = document.getElementById('popup');
    popup.style.display = 'none';
}

// ======================
// Image Upload & Lightbox Functionality
// ======================

// Load uploaded images from localStorage
const uploadedImages = JSON.parse(localStorage.getItem('uploadedImages')) || [];
const preview = document.getElementById('preview');

function loadUploadedImages() {
    uploadedImages.forEach(image => {
        const img = document.createElement('img');
        img.src = image;
        img.onclick = function () {
            openLightbox(this.src);
        };
        preview.appendChild(img);
    });
}

loadUploadedImages();

// Image Upload Functionality
if (document.getElementById('uploadForm')) {
    document.getElementById('uploadForm').addEventListener('submit', function (e) {
        e.preventDefault();
        const fileInput = document.getElementById('fileInput');

        if (fileInput.files && fileInput.files[0]) {
            const reader = new FileReader();
            reader.onload = function (e) {
                // Add the uploaded image to localStorage
                uploadedImages.push(e.target.result);
                localStorage.setItem('uploadedImages', JSON.stringify(uploadedImages));

                // Display the uploaded image
                const img = document.createElement('img');
                img.src = e.target.result;
                img.onclick = function () {
                    openLightbox(this.src);
                };
                preview.appendChild(img);
            };
            reader.readAsDataURL(fileInput.files[0]);
        }

        // Clear the file input
        fileInput.value = '';
    });
}

// Lightbox Functionality
function openLightbox(imageSrc) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    lightboxImg.src = imageSrc;
    lightbox.style.display = 'flex';
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.style.display = 'none';
}

// Close lightbox when clicking outside the image
document.getElementById('lightbox').addEventListener('click', function (e) {
    if (e.target !== document.getElementById('lightbox-img')) {
        closeLightbox();
    }
});
