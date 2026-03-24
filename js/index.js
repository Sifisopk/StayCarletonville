// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    displayFeaturedListings();
});

function displayFeaturedListings() {
    // Get the container where listings should go
    // Based on your HTML, the cards are inside a div with class "card"
    const cardContainer = document.querySelector('.listing-section .card');
    
    if (!cardContainer) {
        console.log('Card container not found');
        return;
    }
    
    // Clear the existing hardcoded listings
    cardContainer.innerHTML = '';
    
    // Get first 6 listings for featured section (or all if you want)
    const featuredListings = listings.slice(0, 3);
    
    // Generate HTML for each listing
    featuredListings.forEach(listing => {
        const listingCard = createListingCard(listing);
        cardContainer.appendChild(listingCard);
    });
}

function createListingCard(listing) {
    const card = document.createElement('div');
    card.className = 'listing-card';
    
    // Create amenities HTML
    const amenitiesHTML = listing.amenities.map(amenity => {
        const amenityIcons = {
            wifi: { name: 'WiFi', icon: 'fa-wifi' },
            breakfast: { name: 'Breakfast', icon: 'fa-bread-slice' },
            parking: { name: 'Parking', icon: 'fa-car' }
        };
        
        if (amenityIcons[amenity]) {
            return `<span>${amenityIcons[amenity].name} <i class="fa-solid ${amenityIcons[amenity].icon}"></i></span>`;
        }
        return '';
    }).join('');
    
    card.innerHTML = `
        <div class="img-container">
            <img class="pic-1" src="${listing.image}" alt="${listing.name}">
        </div>
        <h2 class="card-text">${listing.name}</h2>
        <p><i class="fa-solid fa-location-dot"></i> ${listing.location}</p>
        <p>${listing.description.substring(0, 60)}${listing.description.length > 60 ? '...' : ''}</p>
        <div class="tags">
            ${amenitiesHTML}
        </div>
        <div class="listing-view">
            <p class="price-tag"><strong>R${listing.price}</strong>/night</p>
            <a class="view-btn" href="details.html?id=${listing.id}">
                View details
                <i class="fa-solid fa-arrow-up-right-from-square"></i>
            </a>
        </div>
    `;
    
    return card;
}