// =========================================================
// details.js — loads the listing from Supabase (by id), falling
// back to the static `listings` array (data.js) if needed.
// =========================================================

const params = new URLSearchParams(window.location.search);
const listingId = params.get("id");

async function loadListing() {
    let listing = null;

    try {
        const { data, error } = await supabase
            .from("listings")
            .select("*, rooms(*)")
            .eq("id", listingId)
            .single();

        if (error) throw error;
        listing = data;
    } catch (err) {
        console.warn("Could not load listing from Supabase, using local data.js fallback:", err.message);
        listing = (typeof listings !== "undefined")
            ? listings.find(item => item.id == listingId)
            : null;
    }

    renderListing(listing);
}

function renderListing(listing) {
if (listing) {

    // Main image
    const mainImage = document.querySelector(".property-image img");
    if (mainImage) mainImage.src = listing.image;

    // Title
    const title = document.querySelector(".property-title");
    if (title) title.textContent = listing.name;

    // Location
    const location = document.querySelector(".property-location");
    if (location) location.textContent = listing.location;

    // Price — show lowest room price if rooms exist
    const priceEl = document.querySelector(".property-price");
    if (priceEl) {
        if (listing.rooms && listing.rooms.length > 0) {
            const lowest = Math.min(...listing.rooms.map(r => r.price));
            priceEl.textContent = `From R${lowest} per night`;
        } else {
            priceEl.textContent = `R${listing.price} per night`;
        }
    }

    // Description
    const description = document.querySelector(".about-section p");
    if (description) description.textContent = listing.description;

    // Rating
    const ratingSpan = document.querySelector(".property-stats span:first-child");
    if (ratingSpan && listing.rating) {
        ratingSpan.textContent = `⭐ ${listing.rating}`;
    }

    // Amenities
    const amenitiesContainer = document.querySelector(".Amenities-section .tags");
    if (amenitiesContainer && listing.amenities) {
        amenitiesContainer.innerHTML = "";
        const amenityIcons = {
            wifi:      { name: "WiFi",         icon: "fa-wifi" },
            breakfast: { name: "Breakfast",    icon: "fa-mug-saucer" },
            parking:   { name: "Free Parking", icon: "fa-car" }
        };
        listing.amenities.forEach(amenity => {
            const key = amenity.trim().toLowerCase();
            if (amenityIcons[key]) {
                const span = document.createElement("span");
                span.innerHTML = `${amenityIcons[key].name} <i class="fa-solid ${amenityIcons[key].icon}"></i>`;
                amenitiesContainer.appendChild(span);
            }
        });
    }

    // Contact buttons
    const contactButtons = document.querySelectorAll(".contact-btn");
    if (contactButtons.length >= 3) {
        if (listing.phone) {
            contactButtons[0].href = `tel:${listing.phone}`;
            const waNumber = listing.phone.replace(/\D/g, '');
            contactButtons[1].href = `https://wa.me/${waNumber}`;
            contactButtons[1].target = "_blank";
        }
        if (listing.maps) {
            contactButtons[2].href = listing.maps;
            contactButtons[2].target = "_blank";
        }
    }

    // Gallery
    const galleryContainer = document.querySelector(".bnb-gallery div");
    if (galleryContainer) {
        galleryContainer.innerHTML = "";
        const galleryImages = listing.gallery || [listing.image, listing.image, listing.image, listing.image];
        galleryImages.forEach(src => {
            const img = document.createElement("img");
            img.className = "bnb-pic";
            img.src = src;
            img.alt = listing.name;
            img.style.cursor = "pointer";
            galleryContainer.appendChild(img);
        });
    }

    // Rooms
    renderRooms(listing);

    // SEO — unique title, description, canonical & schema per listing
    updateListingSEO(listing);

} else {
    console.log("No listing found with ID:", listingId);
}
}

// =====================
// SEO — per-listing title, meta description, canonical URL,
// and LodgingBusiness structured data.
// Requires the placeholder tags in details.html:
//   <title id="pageTitle">
//   <meta id="metaDescription">
//   <link id="canonicalLink">
//   <script id="ldJsonListing" type="application/ld+json">
// =====================
function updateListingSEO(listing) {
    const canonicalUrl = `https://overnightstays.co.za/details.html?id=${listing.id}`;

    const lowestPrice = (listing.rooms && listing.rooms.length > 0)
        ? Math.min(...listing.rooms.map(r => r.price))
        : listing.price;

    // Title
    const titleEl = document.getElementById("pageTitle");
    if (titleEl) {
        titleEl.textContent = `${listing.name} | B&B in ${listing.location} - OverNightStays`;
    }

    // Meta description
    const descEl = document.getElementById("metaDescription");
    if (descEl) {
        const rawDesc = `${listing.name} in ${listing.location}, Carletonville. From R${lowestPrice} per night. ${listing.description || ""}`;
        descEl.setAttribute("content", rawDesc.slice(0, 160));
    }

    // Canonical
    const canonicalEl = document.getElementById("canonicalLink");
    if (canonicalEl) {
        canonicalEl.setAttribute("href", canonicalUrl);
    }

    // Open Graph (added dynamically since they weren't in the static template)
    setOgTag("og:title", `${listing.name} | OverNightStays`);
    setOgTag("og:description", `From R${lowestPrice} per night in ${listing.location}, Carletonville.`);
    setOgTag("og:url", canonicalUrl);
    setOgTag("og:type", "website");
    if (listing.image) setOgTag("og:image", listing.image.startsWith("http") ? listing.image : `https://overnightstays.co.za/${listing.image}`);

    // LodgingBusiness structured data
    const schema = {
        "@context": "https://schema.org",
        "@type": "LodgingBusiness",
        "name": listing.name,
        "description": listing.description || undefined,
        "image": listing.image ? (listing.image.startsWith("http") ? listing.image : `https://overnightstays.co.za/${listing.image}`) : undefined,
        "priceRange": `R${lowestPrice}`,
        "telephone": listing.phone || undefined,
        "url": canonicalUrl,
        "address": {
            "@type": "PostalAddress",
            "addressLocality": listing.location || "Carletonville",
            "addressRegion": "Gauteng",
            "addressCountry": "ZA"
        }
    };
    if (listing.rating) {
        schema.aggregateRating = {
            "@type": "AggregateRating",
            "ratingValue": listing.rating,
            "bestRating": "5"
        };
    }

    const ldJsonEl = document.getElementById("ldJsonListing");
    if (ldJsonEl) {
        ldJsonEl.textContent = JSON.stringify(schema);
    }
}

function setOgTag(property, content) {
    if (!content) return;
    let tag = document.querySelector(`meta[property="${property}"]`);
    if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute("property", property);
        document.head.appendChild(tag);
    }
    tag.setAttribute("content", content);
}

loadListing();

// =====================
// Render Rooms
// =====================
function renderRooms(listing) {
    const tabsContainer   = document.getElementById("roomTabs");
    const panelsContainer = document.getElementById("roomPanels");
    if (!tabsContainer || !panelsContainer) return;

    const rooms = listing.rooms;

    // Hide the section if no rooms defined
    if (!rooms || rooms.length === 0) {
        const section = document.querySelector(".rooms-section");
        if (section) section.style.display = "none";
        return;
    }

    rooms.forEach((room, index) => {

        // --- TAB BUTTON ---
        const btn = document.createElement("button");
        btn.className = "room-tab-btn" + (index === 0 ? " active" : "");
        btn.dataset.roomIndex = index;
        btn.innerHTML = `
            <span class="tab-beds">🛏 ${room.beds} Bed${room.beds > 1 ? "s" : ""}</span>
            <span class="tab-price">R${room.price}/night</span>
        `;
        btn.addEventListener("click", () => switchRoom(index));
        tabsContainer.appendChild(btn);

        // --- PANEL ---
        const panel = document.createElement("div");
        panel.className = "room-panel" + (index === 0 ? " active" : "");
        panel.id = `room-panel-${index}`;

        const galleryHTML = room.images.map(src =>
            `<img src="${src}" alt="${room.name}" onclick="openRoomLightbox('${src}')">`
        ).join("");

        panel.innerHTML = `
            <div class="room-panel-header">
                <div>
                    <h4>${room.name}</h4>
                    <p>${room.description}</p>
                </div>
                <span class="room-price-badge">R${room.price}<small>/night</small></span>
            </div>
            <div class="room-meta">
                <span><i class="fa-solid fa-bed"></i> ${room.beds} Bed${room.beds > 1 ? "s" : ""}</span>
                <span><i class="fa-solid fa-user-group"></i> Up to ${room.guests} guest${room.guests > 1 ? "s" : ""}</span>
            </div>
            <div class="room-gallery">${galleryHTML}</div>
        `;
        panelsContainer.appendChild(panel);
    });
}

function switchRoom(index) {
    document.querySelectorAll(".room-tab-btn").forEach((btn, i) => {
        btn.classList.toggle("active", i === index);
    });
    document.querySelectorAll(".room-panel").forEach((panel, i) => {
        panel.classList.toggle("active", i === index);
    });
}

function openRoomLightbox(src) {
    const lightbox = document.getElementById("lightbox");
    const lightboxImage = document.getElementById("lightboxImage");
    if (lightbox && lightboxImage) {
        lightboxImage.src = src;
        lightbox.style.display = "flex";
        document.body.style.overflow = "hidden";
    }
}

// =====================
// Gallery Lightbox
// =====================
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxClose = document.getElementById("lightboxClose");

const gallery = document.querySelector(".bnb-gallery");
if (gallery && lightbox && lightboxImage) {
    gallery.addEventListener("click", (e) => {
        if (e.target.classList.contains("bnb-pic")) {
            lightbox.style.display = "flex";
            lightboxImage.src = e.target.src;
            document.body.style.overflow = "hidden";
        }
    });
}

if (lightboxClose && lightbox) {
    lightboxClose.addEventListener("click", () => {
        lightbox.style.display = "none";
        document.body.style.overflow = "";
    });
    lightbox.addEventListener("click", (e) => {
        if (e.target === lightbox) {
            lightbox.style.display = "none";
            document.body.style.overflow = "";
        }
    });
}

document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && lightbox && lightbox.style.display === "flex") {
        lightbox.style.display = "none";
        document.body.style.overflow = "";
    }
});

// =====================
// Mobile Nav
// =====================
const navToggle = document.querySelector(".nav-toggle");
const navLinks  = document.querySelector(".nav-links");
if (navToggle && navLinks) {
    navToggle.addEventListener("click", () => navLinks.classList.toggle("open"));
    navLinks.querySelectorAll("a").forEach(a => {
        a.addEventListener("click", () => navLinks.classList.remove("open"));
    });
}