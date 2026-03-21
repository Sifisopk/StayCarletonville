const params = new URLSearchParams(window.location.search);
const listingId = params.get("id");
const listing = listings.find(item => item.id == listingId);

// ✅ UNCOMMENT THIS SECTION - Populate the property information
if (listing) {
    // Update main image
    const mainImage = document.querySelector(".property-image img");
    if (mainImage) mainImage.src = listing.image;
    
    // Update title
    const title = document.querySelector(".property-title");
    if (title) title.textContent = listing.name;
    
    // Update location
    const location = document.querySelector(".property-location");
    if (location) location.textContent = listing.location;
    
    // Update price
    const price = document.querySelector(".property-price");
    if (price) price.textContent = `R${listing.price} per night`;
    
    // Update description
    const description = document.querySelector(".about-section p");
    if (description) description.textContent = listing.description;
    
    // Update stats (if you have this data)
    const ratingSpan = document.querySelector(".property-stats span:first-child");
    if (ratingSpan && listing.rating) {
        ratingSpan.textContent = `⭐ ${listing.rating}`;
    }
    
    // Update amenities based on the listing data
    const amenitiesContainer = document.querySelector(".Amenities-section .tags");
    if (amenitiesContainer && listing.amenities) {
        // Clear existing amenities
        amenitiesContainer.innerHTML = "";
        
        // Map amenity names to icons
        const amenityIcons = {
            wifi: { name: "WiFi", icon: "fa-wifi" },
            breakfast: { name: "Breakfast", icon: "fa-mug-saucer" },
            parking: { name: "Free Parking", icon: "fa-car" }
        };
        
        // Add amenities from the listing data
        listing.amenities.forEach(amenity => {
            if (amenityIcons[amenity]) {
                const span = document.createElement("span");
                span.innerHTML = `${amenityIcons[amenity].name} <i class="fa-solid ${amenityIcons[amenity].icon}"></i>`;
                amenitiesContainer.appendChild(span);
            }
        });
    }
    
    // Update contact buttons
    const contactButtons = document.querySelectorAll(".contact-btn");
    
    if (contactButtons.length >= 3) {
        // Call button
        if (listing.phone) {
            contactButtons[0].href = `tel:${listing.phone}`;
        }
        
        // WhatsApp button
        if (listing.phone) {
            const waNumber = listing.phone.replace(/\D/g, '');
            contactButtons[1].href = `https://wa.me/${waNumber}`;
            contactButtons[1].target = "_blank";
        }
        
        // Maps button
        if (listing.maps) {
            contactButtons[2].href = listing.maps;
            contactButtons[2].target = "_blank";
        }
    }
    
    // Update gallery images (if you want to use multiple images)
    const galleryContainer = document.querySelector(".bnb-gallery div");
    if (galleryContainer) {
        // Clear existing gallery
        galleryContainer.innerHTML = "";
        
        // If listing has a gallery array, use it; otherwise, use the main image for all
        const galleryImages = listing.gallery || [
            listing.image, 
            listing.image, 
            listing.image, 
            listing.image
        ];
        
        galleryImages.forEach(src => {
            const img = document.createElement("img");
            img.className = "bnb-pic";
            img.src = src;
            img.alt = listing.name;
            img.style.cursor = "pointer";
            galleryContainer.appendChild(img);
        });
    }
} else {
    console.log("No listing found with ID:", listingId);
}

// Lightbox functionality
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxClose = document.getElementById("lightboxClose");

// Event delegation for gallery images
const gallery = document.querySelector(".bnb-gallery");
if (gallery && lightbox && lightboxImage) {
    gallery.addEventListener("click", (e) => {
        if (e.target.classList.contains("bnb-pic")) {
            lightbox.style.display = "flex";
            lightboxImage.src = e.target.src;
        }
    });
}

// Lightbox close handlers
if (lightboxClose && lightbox) {
    lightboxClose.addEventListener("click", () => {
        lightbox.style.display = "none";
    });

    lightbox.addEventListener("click", (e) => {
        if (e.target === lightbox) {
            lightbox.style.display = "none";
        }
    });
}

// Close with Escape key
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && lightbox && lightbox.style.display === "flex") {
        lightbox.style.display = "none";
    }
});