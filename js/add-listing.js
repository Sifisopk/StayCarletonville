// =========================================================
// Add Listing — Stay Carletonville
// =========================================================

let currentUserId = null;

(async function initAddListing() {
    const session = await requireLogin();
    if (!session) return;
    currentUserId = session.user.id;
})();

// start of image upload helper
async function uploadImage(file, userId) {
    const ext  = file.name.split(".").pop();
    const path = `${userId}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
    const { error } = await supabase.storage.from("listing-images").upload(path, file);
    if (error) throw error;
    const { data } = supabase.storage.from("listing-images").getPublicUrl(path);
    return data.publicUrl;
}
// end of image upload helper

// start of form submit
const addListingForm = document.getElementById("addListingForm");
if (addListingForm) {
    addListingForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const errorEl  = document.getElementById("addListingError");
        const statusEl = document.getElementById("addListingStatus");
        const submitBtn = document.getElementById("submitBtn");
        errorEl.style.display  = "none";
        statusEl.style.display = "none";

        if (!currentUserId) {
            errorEl.textContent   = "You must be logged in to add a listing.";
            errorEl.style.display = "block";
            return;
        }

        const mainImageFile = document.getElementById("mainImage").files[0];
        const galleryFiles  = [...document.getElementById("galleryImages").files];

        if (!mainImageFile) {
            errorEl.textContent   = "Please choose a main image.";
            errorEl.style.display = "block";
            return;
        }

        submitBtn.disabled    = true;
        submitBtn.textContent = "Uploading...";
        statusEl.style.display = "block";
        statusEl.textContent   = "Uploading images, please wait...";

        try {
            const mainImageUrl = await uploadImage(mainImageFile, currentUserId);

            const galleryUrls = [];
            for (const file of galleryFiles) {
                galleryUrls.push(await uploadImage(file, currentUserId));
            }

            const amenities = [
                ...document.querySelectorAll('.checkbox-group input[type="checkbox"]:checked')
            ].map(cb => cb.value);

            const newListing = {
                owner_id:    currentUserId,
                name:        document.getElementById("name").value.trim(),
                location:    document.getElementById("location").value.trim(),
                description: document.getElementById("description").value.trim(),
                price:       parseFloat(document.getElementById("price").value),
                image:       mainImageUrl,
                amenities,
                phone:       document.getElementById("phone").value.trim(),
                maps:        document.getElementById("maps").value.trim(),
                gallery:     galleryUrls,
                status:      "pending"
            };

            statusEl.textContent = "Saving listing...";

            const { data: insertData, error: insertError } = await supabase
                .from("listings")
                .insert(newListing)
                .select()
                .single();

            if (insertError) throw insertError;

            // Redirect to edit page so owner can add rooms immediately
            statusEl.textContent = "✅ Listing created! Taking you to add rooms...";
            setTimeout(() => {
                window.location.href = `edit-listing.html?id=${insertData.id}`;
            }, 1200);

        } catch (err) {
            errorEl.textContent    = "Something went wrong: " + err.message;
            errorEl.style.display  = "block";
            statusEl.style.display = "none";
        } finally {
            submitBtn.disabled    = false;
            submitBtn.textContent = "Submit Listing";
        }
    });
}
// end of form submit
