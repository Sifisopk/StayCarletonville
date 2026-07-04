// =========================================================
// Dashboard — Stay Carletonville
// =========================================================

(async function initDashboard() {
    const session = await requireLogin();
    if (!session) return;

    document.getElementById("welcomeText").textContent =
        `Logged in as ${session.user.email}`;

    await loadOwnerListings(session.user.id);
})();

async function loadOwnerListings(ownerId) {
    const container = document.getElementById("ownerListings");

    const { data: listings, error } = await supabase
        .from("listings")
        .select("*")
        .eq("owner_id", ownerId)
        .order("created_at", { ascending: false });

    if (error) {
        container.innerHTML = `<p style="color:#c0392b;">Error loading listings: ${error.message}</p>`;
        return;
    }

    if (!listings || listings.length === 0) {
        container.innerHTML = `<p>You haven't added any listings yet. Click "+ Add New Listing" to get started.</p>`;
        return;
    }

    container.innerHTML = "";
    listings.forEach(listing => {
        const row = document.createElement("div");
        row.className = "dash-listing";
        row.innerHTML = `
            <img src="${listing.image || 'Assets/images/listing.svg'}" alt="${listing.name}">
            <div class="info">
                <h3>${listing.name}</h3>
                <p><i class="fa-solid fa-location-dot"></i> ${listing.location} &nbsp;|&nbsp; R${listing.price}/night</p>
                <span class="status-badge status-${listing.status}">${listing.status}</span>
            </div>
            <div class="dash-actions">
                <button class="btn-edit" data-id="${listing.id}">Edit</button>
                <button class="btn-delete" data-id="${listing.id}">Delete</button>
            </div>
        `;
        container.appendChild(row);
    });

    // Edit buttons
    container.querySelectorAll(".btn-edit").forEach(btn => {
        btn.addEventListener("click", () => {
            window.location.href = `edit-listing.html?id=${btn.dataset.id}`;
        });
    });

    // Delete buttons
    container.querySelectorAll(".btn-delete").forEach(btn => {
        btn.addEventListener("click", async () => {
            if (!confirm("Delete this listing? This cannot be undone.")) return;
            const id = btn.dataset.id;
            const { error } = await supabase.from("listings").delete().eq("id", id);
            if (error) {
                alert("Could not delete listing: " + error.message);
                return;
            }
            const { data: { session } } = await supabase.auth.getSession();
            loadOwnerListings(session.user.id);
        });
    });
}
