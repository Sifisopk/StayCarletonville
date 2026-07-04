// Swaps "List Your B&B" nav link → "My Dashboard" when an owner is logged in.
// Load this on every public page AFTER supabase-client.js.
(async function () {
    const { data: { session } } = await supabase.auth.getSession();
    const listBtn = document.getElementById("list-btn");
    if (session && listBtn) {
        listBtn.innerHTML = '<a href="dashboard.html">My Dashboard</a>';
    }
})();
