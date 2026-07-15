// =========================================================
// Auth — Stay Carletonville
// Handles: login, signup (with phone validation),
//          forgot password, reset password, logout, route guard
// =========================================================

// =====================
// Phone validation helper
// Accepts SA local format  (0712345678 — 10 digits)
// or international format  (+27712345678 — +27 + 9 digits)
// =====================
function validatePhone(phone) {
    const cleaned = phone.replace(/\s+/g, "");
    const saRegex = /^(\+27|0)[0-9]{9}$/;
    return saRegex.test(cleaned);
}

function showError(id, msg) {
    const el = document.getElementById(id);
    if (!el) return;
    el.textContent   = msg;
    el.style.display = "block";
}

function clearMsg(id) {
    const el = document.getElementById(id);
    if (!el) return;
    el.textContent   = "";
    el.style.display = "none";
}

// =====================
// LOGIN
// =====================
const loginForm = document.getElementById("loginForm");
if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        clearMsg("loginError");

        const email    = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value;
        const btn      = loginForm.querySelector("button[type=submit]");

        btn.disabled    = true;
        btn.textContent = "Logging in...";

        const { error } = await supabase.auth.signInWithPassword({ email, password });

        if (error) {
            showError("loginError", error.message);
            btn.disabled    = false;
            btn.textContent = "Log In";
            return;
        }

        window.location.href = "dashboard.html";
    });
}

// =====================
// SIGN UP
// =====================
const signupForm = document.getElementById("signupForm");
if (signupForm) {

    // start of live phone hint
    const phoneInput = document.getElementById("phone");
    const phoneHint  = document.getElementById("phoneHint");
    if (phoneInput && phoneHint) {
        phoneInput.addEventListener("input", () => {
            const val = phoneInput.value.trim();
            if (!val) { phoneHint.textContent = ""; return; }
            if (validatePhone(val)) {
                phoneHint.textContent = "✓ Valid number";
                phoneHint.style.color = "#15803d";
            } else {
                phoneHint.textContent = "Must be 10 digits starting with 0 (e.g. 0712345678)";
                phoneHint.style.color = "#b91c1c";
            }
        });
    }
    // end of live phone hint

    signupForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        clearMsg("signupError");
        clearMsg("signupSuccess");

        const businessName  = document.getElementById("businessName").value.trim();
        const contactPerson = document.getElementById("contactPerson").value.trim();
        const phone         = document.getElementById("phone").value.trim();
        const email         = document.getElementById("email").value.trim();
        const password      = document.getElementById("password").value;
        const btn           = signupForm.querySelector("button[type=submit]");

        // start of phone validation
        if (!validatePhone(phone)) {
            showError("signupError",
                "Please enter a valid South African phone number (e.g. 0712345678 or +27712345678).");
            phoneInput && phoneInput.focus();
            return;
        }
        // end of phone validation

        btn.disabled    = true;
        btn.textContent = "Creating account...";

        const { error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    business_name:  businessName,
                    contact_person: contactPerson,
                    phone:          phone
                }
            }
        });

        btn.disabled    = false;
        btn.textContent = "Sign Up";

        if (error) {
            showError("signupError", error.message);
            return;
        }

        const successEl = document.getElementById("signupSuccess");
        if (successEl) {
            successEl.textContent  = "Account created! Check your email to confirm, then log in.";
            successEl.style.display = "block";
        }
        signupForm.reset();
        if (phoneHint) phoneHint.textContent = "";
    });
}

// =====================
// FORGOT PASSWORD
// =====================
const forgotForm = document.getElementById("forgotForm");
if (forgotForm) {
    forgotForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        clearMsg("forgotError");
        clearMsg("forgotSuccess");

        const email = document.getElementById("email").value.trim();
        const btn   = forgotForm.querySelector("button[type=submit]");

        btn.disabled    = true;
        btn.textContent = "Sending...";

        // start of reset email
        // Note: reset-password.html must be whitelisted in
        // Supabase → Authentication → URL Configuration → Redirect URLs
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: window.location.origin + "/reset-password.html"
        });
        // end of reset email

        btn.disabled    = false;
        btn.textContent = "Send Reset Link";

        if (error) {
            showError("forgotError", error.message);
            return;
        }

        const successEl = document.getElementById("forgotSuccess");
        if (successEl) {
            successEl.textContent  = "Reset link sent! Check your inbox (and spam folder).";
            successEl.style.display = "block";
        }
        forgotForm.reset();
    });
}

// =====================
// RESET PASSWORD
// Handles the link Supabase emails.
// Supabase fires PASSWORD_RECOVERY when the user
// arrives from the reset email link.
// =====================
const resetForm = document.getElementById("resetForm");
if (resetForm) {

    // start of recovery listener
    supabase.auth.onAuthStateChange(async (event) => {
        if (event === "PASSWORD_RECOVERY") {
            const waiting = document.getElementById("resetWaiting");
            const wrap    = document.getElementById("resetFormWrap");
            if (waiting) waiting.style.display = "none";
            if (wrap)    wrap.style.display    = "block";
        }
    });
    // end of recovery listener

    resetForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        clearMsg("resetError");

        const newPass     = document.getElementById("newPassword").value;
        const confirmPass = document.getElementById("confirmPassword").value;
        const btn         = resetForm.querySelector("button[type=submit]");

        // start of password checks
        if (newPass.length < 6) {
            showError("resetError", "Password must be at least 6 characters.");
            return;
        }
        if (newPass !== confirmPass) {
            showError("resetError", "Passwords do not match.");
            return;
        }
        // end of password checks

        btn.disabled    = true;
        btn.textContent = "Updating...";

        const { error } = await supabase.auth.updateUser({ password: newPass });

        btn.disabled    = false;
        btn.textContent = "Update Password";

        if (error) {
            showError("resetError", error.message);
            return;
        }

        const successEl = document.getElementById("resetSuccess");
        if (successEl) {
            successEl.textContent  = "✅ Password updated! Redirecting to login...";
            successEl.style.display = "block";
        }
        setTimeout(() => { window.location.href = "login.html"; }, 2000);
    });
}

// =====================
// LOGOUT
// =====================
async function logOut() {
    await supabase.auth.signOut();
    window.location.href = "login.html";
}

// =====================
// ROUTE PROTECTION
// Call on any owner-only page
// =====================
async function requireLogin() {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
        window.location.href = "login.html";
        return null;
    }
    return session;
}
