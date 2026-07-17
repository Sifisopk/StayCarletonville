// =========================================================
// index.js — Featured Accommodations (home page)
// Shows featured listings from Supabase.
// Falls back to first 3 from data.js if Supabase fails.
// =========================================================

const featuredContainer = document.querySelector(".listing-section .card");

// start of render featured cards
function renderFeaturedCards(items) {
    if (!featuredContainer) return;
    featuredContainer.innerHTML = "";

    items.forEach(listing => {
        const card = document.createElement("div");
        card.className = "listing-card";
        card.innerHTML = `
            <div class="img-container">
                <img class="pic-1" src="${listing.image}" alt="${listing.name}">
            </div>
            <h2 class="card-text">${listing.name}</h2>
            <p><i class="fa-solid fa-location-dot"></i> ${listing.location}</p>
            <p>${listing.description}</p>
            <div class="tags">
                ${(listing.amenities || []).map(a => `<span>${a}</span>`).join("")}
            </div>
            <div class="listing-view">
                <p class="price-tag"><strong>R${listing.price}</strong>/night</p>
                <a class="view-btn" href="details.html?id=${listing.id}">
                    View details
                    <i class="fa-solid fa-arrow-up-right-from-square"></i>
                </a>
            </div>
        `;
        featuredContainer.appendChild(card);
    });
}

function setFeaturedEventBackground() {
    const indexGuideContent = document.querySelector('.index-guide-content');
    if (indexGuideContent && typeof guideData !== 'undefined' && guideData.featuredEvent && guideData.featuredEvent.image) {
        indexGuideContent.style.backgroundImage = `url('${guideData.featuredEvent.image}')`;
    }
}
// end of render featured cards

// start of load featured
async function loadFeaturedListings() {
    // Show first 3 from data.js immediately — page never blank
    const localFallback = (typeof listings !== "undefined")
        ? listings.slice(0, 3)
        : [];
    renderFeaturedCards(localFallback);

    // Then try Supabase in background
    if (typeof supabase === "undefined") return;

    try {
        const { data, error } = await supabase
            .from("listings")
            .select("*")
            .eq("status", "approved")
            .eq("featured", true)
            .order("created_at", { ascending: false });

        if (error) throw error;

        // Only update if DB returned featured listings
        if (data && data.length > 0) {
            renderFeaturedCards(data.slice(0, 3));
        }
        // If no featured listings are set yet, local fallback stays visible

    } catch (err) {
        // Supabase failed — local data.js cards already showing
        console.warn("Featured listings: using local fallback.", err.message);
    }
}
// end of load featured

// start of mobile nav
const navToggle = document.querySelector(".nav-toggle");
const navLinks  = document.querySelector(".nav-links");
if (navToggle && navLinks) {
    navToggle.addEventListener("click", () => navLinks.classList.toggle("open"));
    navLinks.querySelectorAll("a").forEach(a =>
        a.addEventListener("click", () => navLinks.classList.remove("open"))
    );
}
// end of mobile nav

loadFeaturedListings();