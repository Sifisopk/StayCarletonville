const container = document.getElementById("listingsContainer");

const sortPrice = document.getElementById("sortPrice");
const priceRange = document.getElementById("priceRange");
const priceRangeLabel = document.getElementById("priceRangeLabel");
const resetFilters = document.getElementById("resetFilters");
const checkboxes = document.querySelectorAll(".checkbox-group input[type='checkbox']");
const searchInput = document.querySelector(".list-search-container input");



const listingsPerPage = 6;
let currentPage = 1;

// ============
// Filter logic
// ============
function getFilteredListings() {

    const maxPrice = parseInt(priceRange.value);
    const sortValue = sortPrice.value;
    const searchTerm = searchInput.value.toLowerCase().trim();
    const checkedAmenities = [...checkboxes]
        .filter(cb => cb.checked)
        .map(cb => cb.value);

    let filtered = listings.filter(listing => {

        const withinPrice = listing.price <= maxPrice;

        const hasAmenities = checkedAmenities.length === 0 ||
            checkedAmenities.every(a => listing.amenities.includes(a));

        const matchesSearch = searchTerm === "" ||
            listing.name.toLowerCase().includes(searchTerm) ||
            listing.location.toLowerCase().includes(searchTerm) ||
            listing.description.toLowerCase().includes(searchTerm);

        return withinPrice && hasAmenities && matchesSearch;
    });

    if (sortValue === "asc") {
        filtered.sort((a, b) => a.price - b.price);
    } else if (sortValue === "desc") {
        filtered.sort((a, b) => b.price - a.price);
    }

    return filtered;
}

// ================
// Display listings
// ================
function displayListings(page, filteredListings) {

    container.innerHTML = "";

    if (filteredListings.length === 0) {
        container.innerHTML = "<p class='no-results'>No listings match your filters.</p>";
        document.getElementById("pagination").innerHTML = "";
        return;
    }

    const start = (page - 1) * listingsPerPage;
    const end = start + listingsPerPage;
    const paginated = filteredListings.slice(start, end);

    paginated.forEach(listing => {

        const card = document.createElement("div");
        card.classList.add("listing-card");

        card.innerHTML = `
            <div class="img-container">
                <img class="pic-1" src="${listing.image}" alt="${listing.name}">
            </div>
            <h2 class="card-text">${listing.name}</h2>
            <p><i class="fa-solid fa-location-dot"></i> ${listing.location}</p>
            <p>${listing.description}</p>
            <div class="tags">
                ${listing.amenities.map(a => `<span>${a}</span>`).join("")}
            </div>
            <div class="listing-view">
                <p class="price-tag"><strong>R${listing.price}</strong>/night</p>
                <a class="view-btn" href="details.html?id=${listing.id}">
                    View details
                    <i class="fa-solid fa-arrow-up-right-from-square"></i>
                </a>
            </div>
        `;

        container.appendChild(card);
    });

    setupPagination(filteredListings);
}

// ==========
// Pagination
// ==========
function setupPagination(filteredListings) {

    const pageCount = Math.ceil(filteredListings.length / listingsPerPage);
    const pagination = document.getElementById("pagination");
    pagination.innerHTML = "";

    for (let i = 1; i <= pageCount; i++) {
        const btn = document.createElement("button");
        btn.innerText = i;
        if (i === currentPage) btn.classList.add("active");

        btn.addEventListener("click", () => {
            currentPage = i;
            displayListings(currentPage, filteredListings);
        });

        pagination.appendChild(btn);
    }
}

// ================
// Apply filters
// ================
function applyFilters() {
    currentPage = 1;
    const filtered = getFilteredListings();
    displayListings(currentPage, filtered);
}

// ================
// Event listeners
// ================
sortPrice.addEventListener("change", applyFilters);

priceRange.addEventListener("input", () => {
    priceRangeLabel.textContent = `R${priceRange.value}`;
    applyFilters();
});

checkboxes.forEach(cb => cb.addEventListener("change", applyFilters));

searchInput.addEventListener("input", applyFilters);

document.querySelector(".list-search-container button").addEventListener("click", applyFilters);

searchInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") applyFilters();
});


resetFilters.addEventListener("click", () => {
    sortPrice.value = "default";
    priceRange.value = 2000;
    priceRangeLabel.textContent = "R2000";
    checkboxes.forEach(cb => cb.checked = false);
    searchInput.value = "";
    currentPage = 1;
    displayListings(1, listings);
});

// Initial load
displayListings(currentPage, listings);