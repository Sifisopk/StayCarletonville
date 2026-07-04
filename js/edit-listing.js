// =========================================================
// Edit Listing — Stay Carletonville
// =========================================================

const params      = new URLSearchParams(window.location.search);
const listingId   = params.get("id");
let currentUserId = null;
let existingImageUrl = null;

// start of gallery state
let galleryUrls = [];
// end of gallery state

// start of init
(async function init() {
    const session = await requireLogin();
    if (!session) return;
    currentUserId = session.user.id;

    if (!listingId) {
        window.location.href = "dashboard.html";
        return;
    }

    await loadListingForEdit();
    await loadRooms();
})();
// end of init

// =====================
// Load listing details
// =====================
async function loadListingForEdit() {
    const { data: listing, error } = await supabase
        .from("listings")
        .select("*")
        .eq("id", listingId)
        .eq("owner_id", currentUserId)
        .single();

    if (error || !listing) {
        document.getElementById("editError").textContent =
            "Listing not found or you don't have permission to edit it.";
        document.getElementById("editError").style.display = "block";
        document.getElementById("saveBtn").disabled = true;
        return;
    }

    document.getElementById("name").value        = listing.name        || "";
    document.getElementById("location").value    = listing.location    || "";
    document.getElementById("price").value       = listing.price       || "";
    document.getElementById("phone").value       = listing.phone       || "";
    document.getElementById("maps").value        = listing.maps        || "";
    document.getElementById("description").value = listing.description || "";

    if (listing.amenities) {
        document.querySelectorAll('.checkbox-group input[type="checkbox"]').forEach(cb => {
            cb.checked = listing.amenities.includes(cb.value);
        });
    }

    existingImageUrl = listing.image;
    if (existingImageUrl) {
        document.getElementById("currentImageNote").textContent =
            `Current main image: ${existingImageUrl.split("/").pop()}`;
    }

    galleryUrls = Array.isArray(listing.gallery) ? [...listing.gallery] : [];
    renderGalleryPreview();
}

// =====================
// Gallery preview
// =====================
function renderGalleryPreview() {
    const grid  = document.getElementById("galleryPreview");
    const empty = document.getElementById("galleryEmpty");
    grid.innerHTML = "";

    if (galleryUrls.length === 0) {
        empty.style.display = "block";
        return;
    }

    empty.style.display = "none";
    galleryUrls.forEach((url, index) => {
        const thumb = document.createElement("div");
        thumb.className = "gallery-thumb";
        thumb.innerHTML = `
            <img src="${url}" alt="Gallery ${index + 1}">
            <button type="button" class="remove-img" data-index="${index}" title="Remove">✕</button>
        `;
        grid.appendChild(thumb);
    });

    grid.querySelectorAll(".remove-img").forEach(btn => {
        btn.addEventListener("click", () => {
            galleryUrls.splice(parseInt(btn.dataset.index), 1);
            renderGalleryPreview();
        });
    });
}

// =====================
// Image upload helper
// =====================
async function uploadImage(file, userId) {
    const ext  = file.name.split(".").pop();
    const path = `${userId}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
    const { error } = await supabase.storage.from("listing-images").upload(path, file);
    if (error) throw error;
    const { data } = supabase.storage.from("listing-images").getPublicUrl(path);
    return data.publicUrl;
}

// =====================
// Save listing changes
// =====================
const editForm = document.getElementById("editListingForm");
if (editForm) {
    editForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const errorEl  = document.getElementById("editError");
        const statusEl = document.getElementById("editStatus");
        const saveBtn  = document.getElementById("saveBtn");
        errorEl.style.display  = "none";
        statusEl.style.display = "block";
        saveBtn.disabled       = true;
        saveBtn.textContent    = "Saving...";

        try {
            let imageUrl      = existingImageUrl;
            const newMainFile = document.getElementById("newMainImage").files[0];
            if (newMainFile) {
                statusEl.textContent = "Uploading main image...";
                imageUrl = await uploadImage(newMainFile, currentUserId);
            }

            const newGalleryFiles = [...document.getElementById("newGalleryImages").files];
            if (newGalleryFiles.length > 0) {
                statusEl.textContent = `Uploading ${newGalleryFiles.length} gallery image(s)...`;
                for (const file of newGalleryFiles) {
                    galleryUrls.push(await uploadImage(file, currentUserId));
                }
            }

            const amenities = [
                ...document.querySelectorAll('.checkbox-group input[type="checkbox"]:checked')
            ].map(cb => cb.value);

            statusEl.textContent = "Saving changes...";

            const { error } = await supabase
                .from("listings")
                .update({
                    name:        document.getElementById("name").value.trim(),
                    location:    document.getElementById("location").value.trim(),
                    description: document.getElementById("description").value.trim(),
                    price:       parseFloat(document.getElementById("price").value),
                    phone:       document.getElementById("phone").value.trim(),
                    maps:        document.getElementById("maps").value.trim(),
                    amenities,
                    image:       imageUrl,
                    gallery:     galleryUrls
                })
                .eq("id", listingId)
                .eq("owner_id", currentUserId);

            if (error) throw error;

            statusEl.textContent = "✅ Changes saved!";
            document.getElementById("newGalleryImages").value = "";

        } catch (err) {
            errorEl.textContent    = "Could not save: " + err.message;
            errorEl.style.display  = "block";
            statusEl.style.display = "none";
        } finally {
            saveBtn.disabled    = false;
            saveBtn.textContent = "Save Changes";
        }
    });
}

// =========================================================
// ROOMS
// =========================================================

// start of load rooms
async function loadRooms() {
    const container = document.getElementById("roomsList");

    const { data: rooms, error } = await supabase
        .from("rooms")
        .select("*")
        .eq("listing_id", listingId)
        .order("created_at", { ascending: true });

    if (error) {
        container.innerHTML = `<p class="form-feedback form-feedback-error" style="display:block;">Could not load rooms: ${error.message}</p>`;
        return;
    }

    container.innerHTML = "";

    if (!rooms || rooms.length === 0) {
        container.innerHTML = `<p class="gallery-empty">No rooms yet. Add your first room below.</p>`;
        return;
    }

    rooms.forEach(room => renderRoomRow(room, container));
}
// end of load rooms

// =====================
// Render room row (view mode)
// =====================
function renderRoomRow(room, container) {
    const row = document.createElement("div");
    row.className = "room-row";
    row.dataset.id = room.id;

    const thumb = (room.images && room.images.length > 0)
        ? `<img src="${room.images[0]}" alt="${room.name}">`
        : `<div class="room-thumb-placeholder"><i class="fa-solid fa-door-open"></i></div>`;

    row.innerHTML = `
        ${thumb}
        <div class="room-info">
            <h4>${room.name}</h4>
            <p>${room.description || "No description"}</p>
            <div class="room-badges">
                <span class="room-badge"><i class="fa-solid fa-bed"></i> ${room.beds} Bed${room.beds > 1 ? "s" : ""}</span>
                <span class="room-badge"><i class="fa-solid fa-user-group"></i> ${room.guests} Guest${room.guests > 1 ? "s" : ""}</span>
                <span class="room-badge room-badge-price">R${room.price}/night</span>
            </div>
        </div>
        <div class="room-actions">
            <button class="dashboard-btn dashboard-btn-primary btn-edit-room" data-id="${room.id}">
                <i class="fa-solid fa-pen"></i> Edit
            </button>
            <button class="dashboard-btn dashboard-btn-danger btn-delete-room" data-id="${room.id}">
                <i class="fa-solid fa-trash"></i> Delete
            </button>
        </div>
    `;

    // start of edit room handler — swaps to inline edit form
    row.querySelector(".btn-edit-room").addEventListener("click", () => {
        switchToEditMode(row, room);
    });
    // end of edit room handler

    // start of delete room handler
    row.querySelector(".btn-delete-room").addEventListener("click", async () => {
        if (!confirm(`Delete "${room.name}"? This cannot be undone.`)) return;
        const { error } = await supabase.from("rooms").delete().eq("id", room.id);
        if (error) { alert("Could not delete room: " + error.message); return; }
        row.remove();
        if (document.getElementById("roomsList").children.length === 0) {
            document.getElementById("roomsList").innerHTML =
                `<p class="gallery-empty">No rooms yet. Add your first room below.</p>`;
        }
    });
    // end of delete room handler

    container.appendChild(row);
}

// =====================
// Inline edit mode
// =====================
function switchToEditMode(row, room) {
    const currentImages = Array.isArray(room.images) ? [...room.images] : [];

    // start of build inline edit HTML
    row.innerHTML = `
        <div class="room-edit-form" style="grid-column: 1 / -1;">

            <div class="room-edit-grid">
                <div class="form-group">
                    <label>Room Name</label>
                    <input type="text" class="re-name" value="${room.name || ""}" placeholder="e.g. Double Room">
                </div>
                <div class="form-group">
                    <label>Price / Night (R)</label>
                    <input type="number" class="re-price" value="${room.price || ""}" min="0" placeholder="550">
                </div>
                <div class="form-group">
                    <label>Number of Beds</label>
                    <input type="number" class="re-beds" value="${room.beds || 1}" min="1">
                </div>
                <div class="form-group">
                    <label>Max Guests</label>
                    <input type="number" class="re-guests" value="${room.guests || 1}" min="1">
                </div>
                <div class="form-group room-edit-full">
                    <label>Description</label>
                    <textarea class="re-desc" rows="3" placeholder="Describe this room...">${room.description || ""}</textarea>
                </div>
            </div>

            <div class="room-edit-images">
                <label style="font-weight:600; font-size:0.88rem; display:block; margin-bottom:0.5rem;">
                    Current Images
                    <span style="font-weight:400; color:#6b7280;">(click ✕ to remove)</span>
                </label>
                <div class="room-images-preview re-existing-images"></div>
                <p class="gallery-empty re-no-images" style="${currentImages.length === 0 ? "" : "display:none"}">No images yet.</p>

                <label style="font-weight:600; font-size:0.88rem; display:block; margin-top:1rem; margin-bottom:0.4rem;">
                    Upload New Images
                </label>
                <input type="file" class="re-new-images" accept="image/*" multiple>
                <div class="room-images-preview re-new-preview" style="margin-top:0.5rem;"></div>
            </div>

            <p class="re-error  form-feedback form-feedback-error"></p>
            <p class="re-status form-feedback"></p>

            <div class="room-edit-actions">
                <button type="button" class="submit-btn re-save" style="padding: 0.6rem 1.4rem; font-size:0.9rem;">
                    <i class="fa-solid fa-check"></i> Save Room
                </button>
                <button type="button" class="submit-btn re-cancel" style="background:#6b7280; padding: 0.6rem 1.2rem; font-size:0.9rem;">
                    Cancel
                </button>
            </div>
        </div>
    `;
    // end of build inline edit HTML

    // start of populate existing image thumbs with remove buttons
    const existingGrid = row.querySelector(".re-existing-images");
    const noImagesMsg  = row.querySelector(".re-no-images");

    function renderExistingThumbs() {
        existingGrid.innerHTML = "";
        if (currentImages.length === 0) {
            noImagesMsg.style.display = "block";
            return;
        }
        noImagesMsg.style.display = "none";
        currentImages.forEach((url, i) => {
            const wrap = document.createElement("div");
            wrap.style.position = "relative";
            wrap.innerHTML = `
                <img src="${url}" alt="Room image ${i + 1}" style="width:100%;aspect-ratio:1;object-fit:cover;border-radius:8px;border:1px solid #e2e8f0;">
                <button type="button" class="remove-img" data-index="${i}" title="Remove">✕</button>
            `;
            wrap.querySelector(".remove-img").addEventListener("click", () => {
                currentImages.splice(i, 1);
                renderExistingThumbs();
            });
            existingGrid.appendChild(wrap);
        });
    }
    renderExistingThumbs();
    // end of populate existing image thumbs

    // start of new image preview
    row.querySelector(".re-new-images").addEventListener("change", function () {
        const preview = row.querySelector(".re-new-preview");
        preview.innerHTML = "";
        [...this.files].forEach(file => {
            const img = document.createElement("img");
            img.src   = URL.createObjectURL(file);
            img.style.cssText = "width:100%;aspect-ratio:1;object-fit:cover;border-radius:8px;border:1px solid #e2e8f0;";
            preview.appendChild(img);
        });
    });
    // end of new image preview

    // start of cancel handler — reload original row
    row.querySelector(".re-cancel").addEventListener("click", () => {
        row.remove();
        // reload rooms to restore original state cleanly
        loadRooms();
    });
    // end of cancel handler

    // start of save room handler
    row.querySelector(".re-save").addEventListener("click", async () => {
        const errorEl  = row.querySelector(".re-error");
        const statusEl = row.querySelector(".re-status");
        const saveBtn  = row.querySelector(".re-save");
        errorEl.style.display  = "none";
        statusEl.style.display = "block";

        const name        = row.querySelector(".re-name").value.trim();
        const price       = parseFloat(row.querySelector(".re-price").value);
        const beds        = parseInt(row.querySelector(".re-beds").value);
        const guests      = parseInt(row.querySelector(".re-guests").value);
        const description = row.querySelector(".re-desc").value.trim();

        if (!name)              { showInlineError(errorEl, statusEl, "Room name is required.");    return; }
        if (!price || price < 1){ showInlineError(errorEl, statusEl, "Enter a valid price.");      return; }
        if (!beds  || beds  < 1){ showInlineError(errorEl, statusEl, "Beds must be at least 1."); return; }

        saveBtn.disabled    = true;
        saveBtn.textContent = "Saving...";
        statusEl.textContent = "Uploading images...";

        try {
            // Upload any new images and append to kept existing ones
            const newImageFiles = [...row.querySelector(".re-new-images").files];
            for (const file of newImageFiles) {
                const url = await uploadImage(file, currentUserId);
                currentImages.push(url);
            }

            statusEl.textContent = "Saving changes...";

            const { data: updated, error } = await supabase
                .from("rooms")
                .update({ name, price, beds, guests, description, images: currentImages })
                .eq("id", room.id)
                .select()
                .single();

            if (error) throw error;

            // Replace inline form with updated view row
            const container = document.getElementById("roomsList");
            const newRow    = document.createElement("div");
            container.insertBefore(newRow, row);
            row.remove();
            renderRoomRow(updated, { appendChild: (el) => { newRow.replaceWith(el); } });

        } catch (err) {
            showInlineError(errorEl, statusEl, "Could not save: " + err.message);
        } finally {
            saveBtn.disabled    = false;
            saveBtn.textContent = "Save Room";
        }
    });
    // end of save room handler
}

function showInlineError(errorEl, statusEl, msg) {
    errorEl.textContent    = msg;
    errorEl.style.display  = "block";
    statusEl.style.display = "none";
}

// =====================
// Room image preview (add form)
// =====================
document.getElementById("roomImages").addEventListener("change", function () {
    const preview = document.getElementById("roomImagesPreview");
    preview.innerHTML = "";
    [...this.files].forEach(file => {
        const img = document.createElement("img");
        img.src   = URL.createObjectURL(file);
        preview.appendChild(img);
    });
});

// =====================
// Add Room
// =====================
document.getElementById("addRoomBtn").addEventListener("click", async () => {
    const roomErrorEl  = document.getElementById("roomError");
    const roomStatusEl = document.getElementById("roomStatus");
    const addBtn       = document.getElementById("addRoomBtn");
    roomErrorEl.style.display  = "none";
    roomStatusEl.style.display = "none";

    const name        = document.getElementById("roomName").value.trim();
    const price       = parseFloat(document.getElementById("roomPrice").value);
    const beds        = parseInt(document.getElementById("roomBeds").value);
    const guests      = parseInt(document.getElementById("roomGuests").value);
    const description = document.getElementById("roomDescription").value.trim();

    // start of add room validation
    if (!name)               { showRoomError("Please enter a room name.");        return; }
    if (!price || price < 1) { showRoomError("Please enter a valid price.");      return; }
    if (!beds  || beds  < 1) { showRoomError("Beds must be at least 1.");        return; }
    if (!guests || guests < 1){ showRoomError("Max guests must be at least 1."); return; }
    // end of add room validation

    addBtn.disabled      = true;
    addBtn.textContent   = "Adding...";
    roomStatusEl.style.display = "block";
    roomStatusEl.textContent   = "Uploading room images...";

    try {
        const imageFiles = [...document.getElementById("roomImages").files];
        const imageUrls  = [];
        for (const file of imageFiles) {
            imageUrls.push(await uploadImage(file, currentUserId));
        }

        roomStatusEl.textContent = "Saving room...";

        const { data: newRoom, error } = await supabase
            .from("rooms")
            .insert({
                listing_id: parseInt(listingId),
                name, price, beds, guests, description,
                images: imageUrls
            })
            .select()
            .single();

        if (error) throw error;

        // start of add new room to UI
        const container = document.getElementById("roomsList");
        if (container.querySelector(".gallery-empty")) container.innerHTML = "";
        renderRoomRow(newRoom, container);
        // end of add new room to UI

        // Reset add form
        document.getElementById("roomName").value        = "";
        document.getElementById("roomPrice").value       = "";
        document.getElementById("roomBeds").value        = "1";
        document.getElementById("roomGuests").value      = "2";
        document.getElementById("roomDescription").value = "";
        document.getElementById("roomImages").value      = "";
        document.getElementById("roomImagesPreview").innerHTML = "";

        roomStatusEl.textContent = "✅ Room added!";
        setTimeout(() => { roomStatusEl.style.display = "none"; }, 2500);

    } catch (err) {
        showRoomError("Could not add room: " + err.message);
    } finally {
        addBtn.disabled    = false;
        addBtn.textContent = "Add Room";
    }
});

function showRoomError(msg) {
    const el = document.getElementById("roomError");
    el.textContent   = msg;
    el.style.display = "block";
}
