// =========================================================
// Auth — Stay Carletonville (handles login.html, signup.html,
// and protecting dashboard.html / add-listing.html)
// =========================================================

// ---------- LOGIN ----------
const loginForm = document.getElementById("loginForm");
if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value;
        const errorEl = document.getElementById("loginError");
        errorEl.style.display = "none";

        const { error } = await supabase.auth.signInWithPassword({ email, password });

        if (error) {
            errorEl.textContent = error.message;
            errorEl.style.display = "block";
            return;
        }
        window.location.href = "dashboard.html";
    });
}

// ---------- SIGN UP ----------
const signupForm = document.getElementById("signupForm");
if (signupForm) {
    signupForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const businessName = document.getElementById("businessName").value.trim();
        const contactPerson = document.getElementById("contactPerson").value.trim();
        const phone = document.getElementById("phone").value.trim();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value;
        const errorEl = document.getElementById("signupError");
        const successEl = document.getElementById("signupSuccess");
        errorEl.style.display = "none";
        successEl.style.display = "none";

        const { error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    business_name: businessName,
                    contact_person: contactPerson,
                    phone: phone
                }
            }
        });

        if (error) {
            errorEl.textContent = error.message;
            errorEl.style.display = "block";
            return;
        }

        successEl.textContent = "Account created! Check your email to confirm, then log in.";
        successEl.style.display = "block";
        signupForm.reset();
    });
}

// ---------- LOGOUT (used on dashboard / add-listing pages) ----------
async function logOut() {
    await supabase.auth.signOut();
    window.location.href = "login.html";
}

// ---------- ROUTE PROTECTION ----------
// Call this at the top of any owner-only page (dashboard.html, add-listing.html)
async function requireLogin() {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
        window.location.href = "login.html";
        return null;
    }
    return session;
}
