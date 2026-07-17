// =========================================================
// Admin Panel — Stay Carletonville
// =========================================================

// start of init
(async function initAdmin() {
    const session = await requireLogin();
    if (!session) return;

    // start of admin check
    const { data: profile, error } = await supabase
        .from("profiles")
        .select("is_admin, business_name")
        .eq("id", session.user.id)
        .single();

    if (error || !profile || !profile.is_admin) {
        document.body.innerHTML = `
            <div style="display:flex;align-items:center;justify-content:center;height:100vh;flex-direction:column;gap:1rem;font-family:sans-serif;">
                <h2>Access Denied</h2>
                <p>You don't have admin permissions.</p>
                <a href="dashboard.html" style="color:#2563eb;">Go to Dashboard</a>
            </div>`;
        return;
    }
    // end of admin check

    document.getElementById("adminWelcome").textContent =
        `Logged in as ${session.user.email} · Admin`;

    initAdminTabs();
    loadAllListings();
    loadEvents();
    loadRestaurants();
    loadNightlife();
    loadAttractions();
})();
// end of init

// =====================
// Tab logic
// =====================
function initAdminTabs() {
    const tabs   = document.querySelectorAll(".admin-tab");
    const panels = document.querySelectorAll(".admin-panel");

    tabs.forEach(tab => {
        tab.addEventListener("click", () => {
            tabs.forEach(t   => t.classList.remove("active"));
            panels.forEach(p => p.classList.remove("active"));
            tab.classList.add("active");
            document.getElementById(tab.dataset.panel).classList.add("active");
        });
    });
}

// =====================
// Helper: feedback
// =====================
function showFeedback(id, msg, type = "success") {
    const el = document.getElementById(id);
    if (!el) return;
    el.textContent   = msg;
    el.style.display = "block";
    el.className     = `admin-feedback admin-feedback-${type}`;
    setTimeout(() => { el.style.display = "none"; }, 3000);
}

// =====================
// Helper: render row
// =====================
function makeAdminRow(item, {
    title, subtitle, badgeText, badgeClass, image, icon, actions
}) {
    const row = document.createElement("div");
    row.className   = "admin-row";
    row.dataset.id  = item.id;

    const imgHtml = image
        ? `<img src="${image}" alt="${title}">`
        : `<div class="admin-row-img-placeholder"><i class="fa-solid ${icon}"></i></div>`;

    const actionsHtml = actions.map(a =>
        `<button class="dashboard-btn ${a.cls}" style="font-size:0.78rem;padding:0.4rem 0.8rem;"
            data-action="${a.action}">${a.label}</button>`
    ).join("");

    row.innerHTML = `
        ${imgHtml}
        <div class="admin-row-info">
            <h4>${title}</h4>
            <p>${subtitle || ""}</p>
            <span class="status-badge ${badgeClass}">${badgeText}</span>
        </div>
        <div class="admin-row-actions">${actionsHtml}</div>
    `;

    actions.forEach(a => {
        row.querySelector(`[data-action="${a.action}"]`).addEventListener("click", a.handler);
    });

    return row;
}

// =========================================================
// LISTINGS
// =========================================================

// start of load all listings
async function loadAllListings() {
    const { data: listings, error } = await supabase
        .from("listings")
        .select("*")
        .order("created_at", { ascending: false });

    if (error) {
        document.getElementById("pendingListings").innerHTML =
            `<p class="admin-empty" style="color:#b91c1c;">${error.message}</p>`;
        return;
    }

    const pending = listings.filter(l => l.status === "pending");
    const all     = listings;

    // pending badge
    const badge = document.getElementById("pendingBadge");
    if (pending.length > 0) {
        badge.textContent   = pending.length;
        badge.style.display = "inline-block";
    }

    renderListingsSection("pendingListings", pending,
        "<p class='admin-empty'>No pending listings — you're all caught up!</p>");

    renderListingsSection("allListings", all,
        "<p class='admin-empty'>No listings in the database yet.</p>");
}
// end of load all listings


// =========================================================
// LISTING PREVIEW MODAL
// =========================================================

// start of inject listing modal
function injectListingModal() {
    if (document.getElementById("listingPreviewModal")) return;

    const modal = document.createElement("div");
    modal.id = "listingPreviewModal";
    modal.style.cssText = "display:none;position:fixed;inset:0;z-index:4000;align-items:flex-start;justify-content:center;overflow-y:auto;padding:2rem 1rem;";
    modal.innerHTML = `
        <div id="listingModalOverlay" style="position:fixed;inset:0;background:rgba(0,0,0,0.65);z-index:0;"></div>
        <div id="listingModalBox" style="position:relative;z-index:1;background:#fff;border-radius:20px;max-width:680px;width:100%;box-shadow:0 24px 80px rgba(0,0,0,0.3);overflow:hidden;margin:auto;">

            <!-- header bar -->
            <div style="display:flex;justify-content:space-between;align-items:center;padding:1.25rem 1.5rem;border-bottom:1px solid #f1f5f9;">
                <h2 id="lmTitle" style="font-size:1.15rem;color:#111827;"></h2>
                <button id="listingModalClose" style="background:none;border:none;font-size:1.6rem;cursor:pointer;color:#6b7280;line-height:1;padding:0.2rem 0.5rem;">&times;</button>
            </div>

            <!-- main image -->
            <div id="lmImageWrap" style="width:100%;height:260px;overflow:hidden;background:#f1f5f9;display:flex;align-items:center;justify-content:center;">
                <img id="lmImage" src="" alt="" style="width:100%;height:100%;object-fit:cover;display:none;">
                <i id="lmImagePlaceholder" class="fa-solid fa-house" style="font-size:3rem;color:#d1d5db;display:none;"></i>
            </div>

            <!-- body -->
            <div style="padding:1.5rem;">

                <!-- meta row -->
                <div style="display:flex;flex-wrap:wrap;gap:0.75rem;align-items:center;margin-bottom:1.25rem;">
                    <span id="lmBadge" class="status-badge"></span>
                    <span id="lmLocation" style="font-size:0.88rem;color:#6b7280;"></span>
                    <span id="lmPrice" style="font-size:0.95rem;font-weight:700;color:#15803d;margin-left:auto;"></span>
                </div>

                <!-- contact -->
                <div id="lmContact" style="display:flex;gap:0.75rem;flex-wrap:wrap;margin-bottom:1.25rem;"></div>

                <!-- amenities -->
                <div id="lmAmenities" style="display:flex;gap:0.5rem;flex-wrap:wrap;margin-bottom:1.25rem;"></div>

                <!-- description -->
                <p id="lmDesc" style="font-size:0.92rem;color:#374151;line-height:1.7;margin-bottom:1.5rem;"></p>

                <!-- gallery -->
                <div id="lmGallerySection" style="display:none;margin-bottom:1.5rem;">
                    <h4 style="font-size:0.85rem;font-weight:700;text-transform:uppercase;letter-spacing:0.05em;color:#6b7280;margin-bottom:0.75rem;">Gallery</h4>
                    <div id="lmGallery" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(90px,1fr));gap:0.5rem;"></div>
                </div>

                <!-- rooms -->
                <div id="lmRoomsSection" style="display:none;margin-bottom:1.5rem;">
                    <h4 style="font-size:0.85rem;font-weight:700;text-transform:uppercase;letter-spacing:0.05em;color:#6b7280;margin-bottom:0.75rem;">Rooms</h4>
                    <div id="lmRooms"></div>
                </div>

                <!-- action buttons -->
                <div style="display:flex;gap:0.75rem;padding-top:1rem;border-top:1px solid #f1f5f9;flex-wrap:wrap;">
                    <button id="lmApproveBtn" class="submit-btn" style="background:#15803d;flex:1;min-width:120px;">✓ Approve</button>
                    <button id="lmRejectBtn"  class="submit-btn" style="background:#b91c1c;flex:1;min-width:120px;">✕ Reject</button>
                    <button id="lmCloseBtn"   class="submit-btn" style="background:#6b7280;flex:1;min-width:100px;">Close</button>
                </div>
                <p id="lmActionStatus" style="display:none;margin-top:0.75rem;font-size:0.88rem;text-align:center;"></p>
            </div>
        </div>
    `;
    document.body.appendChild(modal);

    document.getElementById("listingModalClose").addEventListener("click", closeListingModal);
    document.getElementById("lmCloseBtn").addEventListener("click", closeListingModal);
    document.getElementById("listingModalOverlay").addEventListener("click", closeListingModal);
    document.addEventListener("keydown", e => { if (e.key === "Escape") closeListingModal(); });
}
// end of inject listing modal

function closeListingModal() {
    const modal = document.getElementById("listingPreviewModal");
    if (modal) { modal.style.display = "none"; document.body.style.overflow = ""; }
}

// start of open listing preview
async function openListingPreview(listing, row) {
    injectListingModal();
    const modal = document.getElementById("listingPreviewModal");
    modal.style.display = "flex";
    document.body.style.overflow = "hidden";

    // -- populate fields --

    document.getElementById("lmTitle").textContent    = listing.name;
    document.getElementById("lmLocation").textContent = listing.location || "";
    document.getElementById("lmPrice").textContent    = `R${listing.price}/night`;

    // status badge
    const badge = document.getElementById("lmBadge");
    badge.textContent = listing.status;
    badge.className   = `status-badge status-${listing.status}`;

    // main image
    const img  = document.getElementById("lmImage");
    const icon = document.getElementById("lmImagePlaceholder");
    if (listing.image) {
        img.src          = listing.image;
        img.style.display = "block";
        icon.style.display = "none";
    } else {
        img.style.display  = "none";
        icon.style.display = "block";
    }

    // contact links
    const contactEl = document.getElementById("lmContact");
    contactEl.innerHTML = "";
    if (listing.phone) {
        contactEl.innerHTML += `
            <a href="tel:${listing.phone}" style="display:inline-flex;align-items:center;gap:0.4rem;font-size:0.85rem;color:#2563eb;text-decoration:none;background:#eff6ff;padding:0.35rem 0.8rem;border-radius:20px;">
                <i class="fa-solid fa-phone"></i> ${listing.phone}
            </a>`;
        const wa = listing.phone.replace(/\D/g, "");
        contactEl.innerHTML += `
            <a href="https://wa.me/${wa}" target="_blank" style="display:inline-flex;align-items:center;gap:0.4rem;font-size:0.85rem;color:#15803d;text-decoration:none;background:#f0fdf4;padding:0.35rem 0.8rem;border-radius:20px;">
                <i class="fa-brands fa-whatsapp"></i> WhatsApp
            </a>`;
    }
    if (listing.maps) {
        contactEl.innerHTML += `
            <a href="${listing.maps}" target="_blank" style="display:inline-flex;align-items:center;gap:0.4rem;font-size:0.85rem;color:#7c3aed;text-decoration:none;background:#f5f3ff;padding:0.35rem 0.8rem;border-radius:20px;">
                <i class="fa-solid fa-map-location-dot"></i> View on Map
            </a>`;
    }

    // amenities
    const amenityIcons = { wifi: "fa-wifi", breakfast: "fa-mug-saucer", parking: "fa-car" };
    const amenityEl    = document.getElementById("lmAmenities");
    amenityEl.innerHTML = "";
    (listing.amenities || []).forEach(a => {
        const key = a.trim().toLowerCase();
        amenityEl.innerHTML += `
            <span style="display:inline-flex;align-items:center;gap:0.4rem;background:#f1f5f9;border:1px solid #e2e8f0;border-radius:20px;padding:4px 12px;font-size:0.82rem;font-weight:600;">
                <i class="fa-solid ${amenityIcons[key] || "fa-check"}"></i> ${a}
            </span>`;
    });

    // description
    document.getElementById("lmDesc").textContent = listing.description || "No description provided.";

    // gallery
    const gallerySection = document.getElementById("lmGallerySection");
    const galleryEl      = document.getElementById("lmGallery");
    const gallery = (listing.gallery || []).filter(Boolean);
    if (gallery.length > 0) {
        galleryEl.innerHTML = gallery.map(src =>
            `<img src="${src}" alt="Gallery" style="width:100%;aspect-ratio:1;object-fit:cover;border-radius:8px;border:1px solid #e2e8f0;">`
        ).join("");
        gallerySection.style.display = "block";
    } else {
        gallerySection.style.display = "none";
    }

    // rooms — fetch from DB
    const roomsSection = document.getElementById("lmRoomsSection");
    const roomsEl      = document.getElementById("lmRooms");
    roomsEl.innerHTML  = "<p style='color:#9ca3af;font-size:0.88rem;'>Loading rooms...</p>";
    roomsSection.style.display = "block";

    const { data: rooms } = await supabase
        .from("rooms")
        .select("*")
        .eq("listing_id", listing.id)
        .order("price");

    if (!rooms || rooms.length === 0) {
        roomsEl.innerHTML = "<p style='color:#9ca3af;font-size:0.88rem;'>No rooms added yet.</p>";
    } else {
        roomsEl.innerHTML = rooms.map(r => `
            <div style="display:flex;justify-content:space-between;align-items:center;padding:0.75rem;border:1px solid #e7edf6;border-radius:10px;margin-bottom:0.5rem;gap:1rem;flex-wrap:wrap;">
                <div>
                    <strong style="font-size:0.9rem;">${r.name}</strong>
                    <p style="font-size:0.8rem;color:#6b7280;margin:0.2rem 0 0;">${r.description || ""}</p>
                    <span style="font-size:0.78rem;color:#374151;">
                        <i class="fa-solid fa-bed"></i> ${r.beds} Bed${r.beds > 1 ? "s" : ""} &nbsp;
                        <i class="fa-solid fa-user-group"></i> ${r.guests} Guest${r.guests > 1 ? "s" : ""}
                    </span>
                </div>
                <span style="font-weight:700;color:#15803d;white-space:nowrap;">R${r.price}/night</span>
            </div>
        `).join("");
    }

    // wire up approve/reject buttons inside modal
    const approveBtn = document.getElementById("lmApproveBtn");
    const rejectBtn  = document.getElementById("lmRejectBtn");
    const statusEl   = document.getElementById("lmActionStatus");

    // clone to remove old listeners
    const freshApprove = approveBtn.cloneNode(true);
    const freshReject  = rejectBtn.cloneNode(true);
    approveBtn.replaceWith(freshApprove);
    rejectBtn.replaceWith(freshReject);

    async function handleModalAction(status) {
        const { error } = await supabase.from("listings").update({ status }).eq("id", listing.id);
        if (error) { statusEl.textContent = "Error: " + error.message; statusEl.style.display = "block"; return; }
        badge.textContent = status;
        badge.className   = `status-badge status-${status}`;
        statusEl.textContent   = status === "approved" ? "✅ Listing approved!" : "❌ Listing rejected.";
        statusEl.style.display = "block";
        statusEl.style.color   = status === "approved" ? "#15803d" : "#b91c1c";
        // update the row badge outside the modal
        if (row) {
            const rowBadge = row.querySelector(".status-badge");
            if (rowBadge) { rowBadge.textContent = status; rowBadge.className = `status-badge status-${status}`; }
        }
        loadAllListings();
        setTimeout(closeListingModal, 1500);
    }

    freshApprove.addEventListener("click", () => handleModalAction("approved"));
    freshReject.addEventListener("click",  () => handleModalAction("rejected"));
}
// end of open listing preview


function renderListingsSection(containerId, listings, emptyHtml) {
    const container = document.getElementById(containerId);
    if (!listings || listings.length === 0) { container.innerHTML = emptyHtml; return; }
    container.innerHTML = "";
    listings.forEach(listing => {
        const row = makeAdminRow(listing, {
            title:      listing.name,
            subtitle:   `${listing.location} · R${listing.price}/night`,
            badgeText:  listing.status,
            badgeClass: `status-${listing.status}`,
            image:      listing.image,
            icon:       "fa-house",
            actions: [
                {
                    action:  "view",
                    cls:     "dashboard-btn-secondary",
                    label:   "👁 View",
                    handler: () => openListingPreview(listing, row)
                },
                {
                    action:  "feature",
                    cls:     listing.featured ? "dashboard-btn-feature active" : "dashboard-btn-feature",
                    label:   listing.featured ? "★ Unfeature" : "☆ Feature",
                    handler: () => toggleFeatured(listing, row)
                },
                {
                    action:  "approve",
                    cls:     "dashboard-btn-primary",
                    label:   "✓ Approve",
                    handler: () => updateListingStatus(listing.id, "approved", row)
                },
                {
                    action:  "reject",
                    cls:     "dashboard-btn-danger",
                    label:   "✕ Reject",
                    handler: () => updateListingStatus(listing.id, "rejected", row)
                }
            ]
        });
        container.appendChild(row);
    });
}


// start of toggleFeatured
async function toggleFeatured(listing, row) {
    const newVal = !listing.featured;

    if (newVal) {
        const { count, error: countError } = await supabase
            .from("listings")
            .select("id", { count: "exact", head: true })
            .eq("featured", true);

        if (countError) {
            alert("Could not verify featured listings: " + countError.message);
            return;
        }

        if (count >= 3) {
            alert("Only 3 listings may be featured at a time. Unfeature one listing before featuring another.");
            return;
        }
    }

    const { error } = await supabase
        .from("listings")
        .update({ featured: newVal })
        .eq("id", listing.id);

    if (error) { alert("Could not update: " + error.message); return; }

    // update the local listing object so re-renders reflect the new state
    listing.featured = newVal;

    // update the button in the row without a full reload
    const featureBtn = row.querySelector("[data-action='feature']");
    if (featureBtn) {
        featureBtn.textContent = newVal ? "★ Unfeature" : "☆ Feature";
        featureBtn.className   = newVal
            ? "dashboard-btn dashboard-btn-feature active"
            : "dashboard-btn dashboard-btn-feature";
    }

    // also update the featured badge on the row subtitle if present
    const subtitle = row.querySelector(".admin-row-info p");
    if (subtitle) {
        const base = subtitle.textContent.replace(" · ⭐ Featured", "");
        subtitle.textContent = newVal ? base + " · ⭐ Featured" : base;
    }
}
// end of toggleFeatured

// start of update listing status
async function updateListingStatus(id, status, row) {
    const { error } = await supabase.from("listings").update({ status }).eq("id", id);
    if (error) { alert("Could not update: " + error.message); return; }
    // update badge in row
    const badge     = row.querySelector(".status-badge");
    badge.textContent = status;
    badge.className   = `status-badge status-${status}`;
    // update pending badge count
    loadAllListings();
}
// end of update listing status

// =========================================================
// EVENTS
// =========================================================

// start of load events
async function loadEvents() {
    const { data: events, error } = await supabase
        .from("events")
        .select("*")
        .order("date", { ascending: true });

    const container = document.getElementById("eventsList");
    if (error) { container.innerHTML = `<p class="admin-empty" style="color:#b91c1c;">${error.message}</p>`; return; }
    if (!events || events.length === 0) { container.innerHTML = "<p class='admin-empty'>No events yet. Add one below.</p>"; return; }

    container.innerHTML = "";
    events.forEach(event => {
        const row = makeAdminRow(event, {
            title:      event.title,
            subtitle:   `${event.location || "No location"} · ${event.date || "Date TBC"}${event.featured ? " · ⭐ Featured" : ""}`,
            badgeText:  event.status,
            badgeClass: `status-${event.status}`,
            image:      event.image,
            icon:       "fa-calendar-days",
            actions: [
                {
                    action:  "edit",
                    cls:     "dashboard-btn-primary",
                    label:   "Edit",
                    handler: () => populateEventForm(event)
                },
                {
                    action:  "delete",
                    cls:     "dashboard-btn-danger",
                    label:   "Delete",
                    handler: async () => {
                        if (!confirm(`Delete "${event.title}"?`)) return;
                        await supabase.from("events").delete().eq("id", event.id);
                        row.remove();
                    }
                }
            ]
        });
        container.appendChild(row);
    });
}
// end of load events

function populateEventForm(event) {
    document.getElementById("eventEditId").value     = event.id;
    document.getElementById("eventTitle").value      = event.title            || "";
    document.getElementById("eventLocation").value   = event.location         || "";
    document.getElementById("eventDate").value       = event.date             || "";
    document.getElementById("eventEndDate").value    = event.end_date         || "";
    document.getElementById("eventImage").value      = event.image            || "";
    document.getElementById("eventLink").value       = event.link             || "";
    document.getElementById("eventDesc").value       = event.description      || "";
    document.getElementById("eventFullDesc").value   = event.full_description || "";
    document.getElementById("eventStatus").value     = event.status           || "active";
    document.getElementById("eventFeatured").checked = event.featured         || false;
    document.getElementById("addEventForm").scrollIntoView({ behavior: "smooth", block: "start" });
    document.getElementById("saveEventBtn").textContent = "Update Event";
}

async function saveEvent() {
    const editId = document.getElementById("eventEditId").value;
    const payload = {
        title:            document.getElementById("eventTitle").value.trim(),
        location:         document.getElementById("eventLocation").value.trim(),
        date:             document.getElementById("eventDate").value       || null,
        end_date:         document.getElementById("eventEndDate").value    || null,
        image:            document.getElementById("eventImage").value.trim()    || null,
        link:             document.getElementById("eventLink").value.trim()     || null,
        description:      document.getElementById("eventDesc").value.trim(),
        full_description: document.getElementById("eventFullDesc").value.trim() || null,
        status:           document.getElementById("eventStatus").value,
        featured:         document.getElementById("eventFeatured").checked
    };

    if (!payload.title) { showFeedback("eventError", "Title is required.", "error"); return; }

    const { error } = editId
        ? await supabase.from("events").update(payload).eq("id", editId)
        : await supabase.from("events").insert(payload);

    if (error) { showFeedback("eventError", error.message, "error"); return; }

    showFeedback("eventSuccess", editId ? "Event updated!" : "Event added!");
    resetEventForm();
    loadEvents();
}

function resetEventForm() {
    ["eventEditId","eventTitle","eventLocation","eventDate","eventEndDate",
     "eventImage","eventLink","eventDesc","eventFullDesc"].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.value = "";
    });
    document.getElementById("eventStatus").value     = "active";
    document.getElementById("eventFeatured").checked = false;
    document.getElementById("saveEventBtn").textContent = "Save Event";
}

// =========================================================
// RESTAURANTS
// =========================================================

// start of load restaurants
async function loadRestaurants() {
    const { data, error } = await supabase
        .from("restaurants")
        .select("*")
        .order("name");

    const container = document.getElementById("restaurantsList");
    if (error) { container.innerHTML = `<p class="admin-empty" style="color:#b91c1c;">${error.message}</p>`; return; }
    if (!data || data.length === 0) { container.innerHTML = "<p class='admin-empty'>No restaurants yet. Add one below.</p>"; return; }

    container.innerHTML = "";
    data.forEach(r => {
        const row = makeAdminRow(r, {
            title:      r.name,
            subtitle:   `${r.cuisine || "Cuisine not set"} · ${r.location || "No location"}`,
            badgeText:  r.status,
            badgeClass: `status-${r.status}`,
            image:      r.image,
            icon:       "fa-utensils",
            actions: [
                {
                    action:  "edit",
                    cls:     "dashboard-btn-primary",
                    label:   "Edit",
                    handler: () => populateRestaurantForm(r)
                },
                {
                    action:  "delete",
                    cls:     "dashboard-btn-danger",
                    label:   "Delete",
                    handler: async () => {
                        if (!confirm(`Delete "${r.name}"?`)) return;
                        await supabase.from("restaurants").delete().eq("id", r.id);
                        row.remove();
                    }
                }
            ]
        });
        container.appendChild(row);
    });
}
// end of load restaurants

function populateRestaurantForm(r) {
    document.getElementById("restaurantEditId").value   = r.id;
    document.getElementById("restaurantName").value     = r.name        || "";
    document.getElementById("restaurantCuisine").value  = r.cuisine     || "";
    document.getElementById("restaurantLocation").value = r.location    || "";
    document.getElementById("restaurantPhone").value    = r.phone       || "";
    document.getElementById("restaurantPrice").value    = r.price_range || "";
    document.getElementById("restaurantMaps").value     = r.maps        || "";
    document.getElementById("restaurantImage").value    = r.image       || "";
    document.getElementById("restaurantDesc").value     = r.description || "";
    document.getElementById("restaurantStatus").value   = r.status      || "active";
}

async function saveRestaurant() {
    const editId  = document.getElementById("restaurantEditId").value;
    const payload = {
        name:        document.getElementById("restaurantName").value.trim(),
        cuisine:     document.getElementById("restaurantCuisine").value.trim(),
        location:    document.getElementById("restaurantLocation").value.trim(),
        phone:       document.getElementById("restaurantPhone").value.trim()    || null,
        price_range: document.getElementById("restaurantPrice").value.trim()    || null,
        maps:        document.getElementById("restaurantMaps").value.trim()     || null,
        image:       document.getElementById("restaurantImage").value.trim()    || null,
        description: document.getElementById("restaurantDesc").value.trim(),
        status:      document.getElementById("restaurantStatus").value
    };

    if (!payload.name) { showFeedback("restaurantError", "Name is required.", "error"); return; }

    const { error } = editId
        ? await supabase.from("restaurants").update(payload).eq("id", editId)
        : await supabase.from("restaurants").insert(payload);

    if (error) { showFeedback("restaurantError", error.message, "error"); return; }

    showFeedback("restaurantSuccess", editId ? "Restaurant updated!" : "Restaurant added!");
    resetRestaurantForm();
    loadRestaurants();
}

function resetRestaurantForm() {
    ["restaurantEditId","restaurantName","restaurantCuisine","restaurantLocation",
     "restaurantPhone","restaurantPrice","restaurantMaps","restaurantImage","restaurantDesc"]
    .forEach(id => { const el = document.getElementById(id); if (el) el.value = ""; });
    document.getElementById("restaurantStatus").value = "active";
}

// =========================================================
// NIGHTLIFE
// =========================================================

async function loadNightlife() {
    const { data, error } = await supabase.from("nightlife").select("*").order("name");
    const container = document.getElementById("nightlifeList");
    if (error) { container.innerHTML = `<p class="admin-empty" style="color:#b91c1c;">${error.message}</p>`; return; }
    if (!data || data.length === 0) { container.innerHTML = "<p class='admin-empty'>No nightlife venues yet. Add one below.</p>"; return; }

    container.innerHTML = "";
    data.forEach(n => {
        const row = makeAdminRow(n, {
            title:      n.name,
            subtitle:   `${n.type || "Venue"} · ${n.location || "No location"}`,
            badgeText:  n.status,
            badgeClass: `status-${n.status}`,
            image:      n.image,
            icon:       "fa-music",
            actions: [
                { action: "edit",   cls: "dashboard-btn-primary", label: "Edit",
                  handler: () => populateNightlifeForm(n) },
                { action: "delete", cls: "dashboard-btn-danger",  label: "Delete",
                  handler: async () => {
                    if (!confirm(`Delete "${n.name}"?`)) return;
                    await supabase.from("nightlife").delete().eq("id", n.id);
                    row.remove();
                  }
                }
            ]
        });
        container.appendChild(row);
    });
}

function populateNightlifeForm(n) {
    document.getElementById("nightlifeEditId").value   = n.id;
    document.getElementById("nightlifeName").value     = n.name        || "";
    document.getElementById("nightlifeType").value     = n.type        || "";
    document.getElementById("nightlifeLocation").value = n.location    || "";
    document.getElementById("nightlifePhone").value    = n.phone       || "";
    document.getElementById("nightlifeMaps").value     = n.maps        || "";
    document.getElementById("nightlifeImage").value    = n.image       || "";
    document.getElementById("nightlifeDesc").value     = n.description || "";
    document.getElementById("nightlifeStatus").value   = n.status      || "active";
}

async function saveNightlife() {
    const editId  = document.getElementById("nightlifeEditId").value;
    const payload = {
        name:        document.getElementById("nightlifeName").value.trim(),
        type:        document.getElementById("nightlifeType").value.trim()     || null,
        location:    document.getElementById("nightlifeLocation").value.trim() || null,
        phone:       document.getElementById("nightlifePhone").value.trim()    || null,
        maps:        document.getElementById("nightlifeMaps").value.trim()     || null,
        image:       document.getElementById("nightlifeImage").value.trim()    || null,
        description: document.getElementById("nightlifeDesc").value.trim(),
        status:      document.getElementById("nightlifeStatus").value
    };

    if (!payload.name) { showFeedback("nightlifeError", "Name is required.", "error"); return; }

    const { error } = editId
        ? await supabase.from("nightlife").update(payload).eq("id", editId)
        : await supabase.from("nightlife").insert(payload);

    if (error) { showFeedback("nightlifeError", error.message, "error"); return; }

    showFeedback("nightlifeSuccess", editId ? "Venue updated!" : "Venue added!");
    resetNightlifeForm();
    loadNightlife();
}

function resetNightlifeForm() {
    ["nightlifeEditId","nightlifeName","nightlifeType","nightlifeLocation",
     "nightlifePhone","nightlifeMaps","nightlifeImage","nightlifeDesc"]
    .forEach(id => { const el = document.getElementById(id); if (el) el.value = ""; });
    document.getElementById("nightlifeStatus").value = "active";
}

// =========================================================
// ATTRACTIONS
// =========================================================

async function loadAttractions() {
    const { data, error } = await supabase.from("attractions").select("*").order("name");
    const container = document.getElementById("attractionsList");
    if (error) { container.innerHTML = `<p class="admin-empty" style="color:#b91c1c;">${error.message}</p>`; return; }
    if (!data || data.length === 0) { container.innerHTML = "<p class='admin-empty'>No attractions yet. Add one below.</p>"; return; }

    container.innerHTML = "";
    data.forEach(a => {
        const row = makeAdminRow(a, {
            title:      a.name,
            subtitle:   `${a.entry_fee ? "Entry: " + a.entry_fee : "Free"} · ${a.location || "No location"}`,
            badgeText:  a.status,
            badgeClass: `status-${a.status}`,
            image:      a.image,
            icon:       "fa-landmark",
            actions: [
                { action: "edit",   cls: "dashboard-btn-primary", label: "Edit",
                  handler: () => populateAttractionForm(a) },
                { action: "delete", cls: "dashboard-btn-danger",  label: "Delete",
                  handler: async () => {
                    if (!confirm(`Delete "${a.name}"?`)) return;
                    await supabase.from("attractions").delete().eq("id", a.id);
                    row.remove();
                  }
                }
            ]
        });
        container.appendChild(row);
    });
}

function populateAttractionForm(a) {
    document.getElementById("attractionEditId").value   = a.id;
    document.getElementById("attractionName").value     = a.name        || "";
    document.getElementById("attractionFee").value      = a.entry_fee   || "";
    document.getElementById("attractionLocation").value = a.location    || "";
    document.getElementById("attractionPhone").value    = a.phone       || "";
    document.getElementById("attractionMaps").value     = a.maps        || "";
    document.getElementById("attractionImage").value    = a.image       || "";
    document.getElementById("attractionDesc").value     = a.description || "";
    document.getElementById("attractionStatus").value   = a.status      || "active";
}

async function saveAttraction() {
    const editId  = document.getElementById("attractionEditId").value;
    const payload = {
        name:        document.getElementById("attractionName").value.trim(),
        entry_fee:   document.getElementById("attractionFee").value.trim()      || null,
        location:    document.getElementById("attractionLocation").value.trim() || null,
        phone:       document.getElementById("attractionPhone").value.trim()    || null,
        maps:        document.getElementById("attractionMaps").value.trim()     || null,
        image:       document.getElementById("attractionImage").value.trim()    || null,
        description: document.getElementById("attractionDesc").value.trim(),
        status:      document.getElementById("attractionStatus").value
    };

    if (!payload.name) { showFeedback("attractionError", "Name is required.", "error"); return; }

    const { error } = editId
        ? await supabase.from("attractions").update(payload).eq("id", editId)
        : await supabase.from("attractions").insert(payload);

    if (error) { showFeedback("attractionError", error.message, "error"); return; }

    showFeedback("attractionSuccess", editId ? "Attraction updated!" : "Attraction added!");
    resetAttractionForm();
    loadAttractions();
}

function resetAttractionForm() {
    ["attractionEditId","attractionName","attractionFee","attractionLocation",
     "attractionPhone","attractionMaps","attractionImage","attractionDesc"]
    .forEach(id => { const el = document.getElementById(id); if (el) el.value = ""; });
    document.getElementById("attractionStatus").value = "active";
}