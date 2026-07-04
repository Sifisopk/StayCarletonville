// =========================================================
// Guide — Stay Carletonville
// All content loads from Supabase. Add/edit via admin.html.
// =========================================================

// start of state
const PREVIEW_COUNT = { events: 3, restaurants: 3, nightlife: 4, attractions: 3, tours: 3 };
const showingAll    = { events: false, restaurants: false, nightlife: false, attractions: false, tours: false };

// guideData is populated from Supabase in initGuide()
const guideData = {
    featuredEvent: null,
    events:        [],
    restaurants:   [],
    nightlife:     [],
    attractions:   [],
    tours:         []
};
// end of state

// ===========================
// Modal
// ===========================
function injectModal() {
    if (document.getElementById("guideModal")) return;
    const modal = document.createElement("div");
    modal.id = "guideModal";
    modal.style.cssText = "display:none;position:fixed;inset:0;z-index:3000;align-items:center;justify-content:center;";
    modal.innerHTML = `
        <div id="guideModalOverlay" style="position:absolute;inset:0;background:rgba(0,0,0,0.6);"></div>
        <div style="position:relative;z-index:1;background:#fff;border-radius:16px;max-width:520px;width:90%;padding:36px 32px;box-shadow:0 20px 60px rgba(0,0,0,0.25);">
            <button id="guideModalClose" style="position:absolute;top:16px;right:20px;background:none;border:none;font-size:28px;cursor:pointer;color:#6b7280;line-height:1;">&times;</button>
            <div id="modalMeta" style="display:flex;gap:14px;font-size:13px;color:#2563eb;font-weight:600;margin-bottom:12px;flex-wrap:wrap;"></div>
            <h2 id="modalTitle" style="font-family:'Archivo Black',sans-serif;font-size:22px;color:#111827;margin-bottom:16px;"></h2>
            <p id="modalDescription" style="font-size:14.5px;color:#4b5563;line-height:1.7;"></p>
            <a id="modalCta" href="#" target="_blank" style="display:none;margin-top:18px;padding:12px 18px;background:#111827;color:#fff;border-radius:12px;text-decoration:none;font-weight:700;">Learn More <i class='fa-solid fa-arrow-right' style='margin-left:8px;'></i></a>
        </div>
    `;
    document.body.appendChild(modal);
    document.getElementById("guideModalClose").addEventListener("click", closeModal);
    document.getElementById("guideModalOverlay").addEventListener("click", closeModal);
    document.addEventListener("keydown", e => { if (e.key === "Escape") closeModal(); });
}

function openModal(title, meta, description, cta) {
    document.getElementById("modalTitle").textContent       = title;
    document.getElementById("modalMeta").innerHTML          = meta;
    document.getElementById("modalDescription").textContent = description;
    const modalCta = document.getElementById("modalCta");
    if (cta && cta.url && cta.url !== "#") {
        modalCta.href        = cta.url;
        modalCta.textContent = cta.text || "Learn More";
        modalCta.innerHTML  += ` <i class='fa-solid fa-arrow-right' style='margin-left:8px;'></i>`;
        modalCta.style.display = "inline-flex";
    } else {
        modalCta.style.display = "none";
    }
    document.getElementById("guideModal").style.display = "flex";
    document.body.style.overflow = "hidden";
}

function closeModal() {
    document.getElementById("guideModal").style.display = "none";
    document.body.style.overflow = "";
}

// ===========================
// Render Featured Event
// ===========================
function renderFeaturedEvent() {
    const fe = guideData.featuredEvent;
    if (!fe) return;
    const hero = document.getElementById("guideHero");
    if (hero && fe.image) hero.style.backgroundImage = `url('${fe.image}')`;
    const t = document.getElementById("featuredEventTitle");
    const d = document.getElementById("featuredEventDate");
    const l = document.getElementById("featuredEventLocation");
    if (t) t.textContent = fe.title;
    if (d) d.textContent = fe.date;
    if (l) l.textContent = fe.location;

    const featuredBtn = document.getElementById("featuredEventBtn");
    if (featuredBtn) {
        // remove old listeners by cloning
        const fresh = featuredBtn.cloneNode(true);
        featuredBtn.parentNode.replaceChild(fresh, featuredBtn);
        fresh.addEventListener("click", (e) => {
            e.preventDefault();
            const meta = `
                <span><i class="fa-regular fa-calendar"></i> ${fe.date}</span>
                <span><i class="fa-solid fa-location-dot"></i> ${fe.location}</span>
            `;
            openModal(fe.title, meta, fe.fullDescription || fe.description, {
                url: fe.link || "#",
                text: "Get Tickets"
            });
        });
    }
}

// ===========================
// Render Events
// ===========================
function renderEvents(all) {
    all = all !== undefined ? all : showingAll.events;
    const grid = document.getElementById("eventsGrid");
    if (!grid) return;

    if (guideData.events.length === 0) {
        grid.innerHTML = "<p style='color:#9ca3af;padding:1rem;'>No upcoming events right now.</p>";
        return;
    }

    const items = all ? guideData.events : guideData.events.slice(0, PREVIEW_COUNT.events);
    grid.innerHTML = items.map((ev, i) => `
        <div class="event-card">
            <img class="event-card-img" src="${ev.image}" alt="${ev.title}">
            <div class="event-card-body">
                <div class="event-card-meta">
                    <span><i class="fa-regular fa-calendar"></i> ${ev.date}</span>
                    <span><i class="fa-solid fa-location-dot"></i> ${ev.venue}</span>
                </div>
                <h3>${ev.title}</h3>
                <p>${ev.description}</p>
                <button class="event-card-link learn-more-btn" data-index="${i}">
                    Learn More <i class="fa-solid fa-arrow-right"></i>
                </button>
            </div>
        </div>
    `).join("");

    grid.querySelectorAll(".learn-more-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            const ev  = items[parseInt(btn.dataset.index)];
            const meta = `<span><i class="fa-regular fa-calendar"></i> ${ev.date}</span><span><i class="fa-solid fa-location-dot"></i> ${ev.venue}</span>`;
            openModal(ev.title, meta, ev.fullDescription || ev.description, {
                url: ev.link || "#", text: "Get Tickets"
            });
        });
    });
}

// ===========================
// Render Restaurants
// ===========================
function renderRestaurants(all) {
    all = all !== undefined ? all : showingAll.restaurants;
    const grid = document.getElementById("restaurantsGrid");
    if (!grid) return;

    if (guideData.restaurants.length === 0) {
        grid.innerHTML = "<p style='color:#9ca3af;padding:1rem;'>No restaurants listed yet.</p>";
        return;
    }

    const items = all ? guideData.restaurants : guideData.restaurants.slice(0, PREVIEW_COUNT.restaurants);
    grid.innerHTML = items.map(r => `
        <div class="restaurant-card">
            <div class="restaurant-card-img-wrap">
                ${r.image
                    ? `<img class="restaurant-card-img" src="${r.image}" alt="${r.name}" onerror="this.parentElement.innerHTML='<div class=\\'restaurant-img-placeholder\\'><i class=\\'fa-solid fa-utensils\\'></i></div>'">`
                    : `<div class="restaurant-img-placeholder"><i class="fa-solid fa-utensils"></i></div>`
                }
            </div>
            <div class="restaurant-card-body">
                <div class="restaurant-card-title-row">
                    <h3>${r.name}</h3>
                    ${r.rating ? `<span class="restaurant-rating"><i class="fa-solid fa-star"></i> ${r.rating}</span>` : ""}
                </div>
                <p>${r.description}</p>
                <div class="restaurant-card-footer">
                    <div class="restaurant-card-tags">
                        <span><i class="fa-solid fa-utensils"></i> ${r.cuisine}</span>
                        <span><i class="fa-solid fa-tag"></i> ${r.price}</span>
                    </div>
                    <a href="${r.maps || '#'}" target="_blank" class="directions-btn">
                        <i class="fa-solid fa-map-location-dot"></i> Directions
                    </a>
                </div>
            </div>
        </div>
    `).join("");
}

// ===========================
// Render Nightlife
// ===========================
function renderNightlife(all) {
    all = all !== undefined ? all : showingAll.nightlife;
    const grid = document.getElementById("nightlifeGrid");
    if (!grid) return;

    if (guideData.nightlife.length === 0) {
        grid.innerHTML = "<p style='color:#9ca3af;padding:1rem;'>No nightlife venues listed yet.</p>";
        return;
    }

    const items = all ? guideData.nightlife : guideData.nightlife.slice(0, PREVIEW_COUNT.nightlife);
    grid.innerHTML = items.map(n => `
        <div class="nightlife-card">
            <img class="nightlife-card-img" src="${n.image}" alt="${n.name}" onerror="this.src=''">
            <div class="nightlife-card-body">
                <h3>${n.name}</h3>
                <span class="nightlife-vibe-badge ${n.vibeClass}">${n.vibe}</span>
                <p>${n.description}</p>
            </div>
        </div>
    `).join("");
}

// ===========================
// Render Attractions
// ===========================
function renderAttractions(all) {
    all = all !== undefined ? all : showingAll.attractions;
    const grid = document.getElementById("attractionsGrid");
    if (!grid) return;

    if (guideData.attractions.length === 0) {
        grid.innerHTML = "<p style='color:#9ca3af;padding:1rem;'>No attractions listed yet.</p>";
        return;
    }

    const items = all ? guideData.attractions : guideData.attractions.slice(0, PREVIEW_COUNT.attractions);
    grid.innerHTML = items.map(a => `
        <div class="attraction-card">
            <img class="attraction-card-img" src="${a.image}" alt="${a.name}" onerror="this.src=''">
            <div class="attraction-card-body">
                <h3>${a.name}</h3>
                <p>${a.description}</p>
                <span class="attraction-tag">${a.tag}</span>
                <a href="${a.link || '#'}" target="_blank" class="attraction-link-btn">
                    Visit <i class="fa-solid fa-arrow-right"></i>
                </a>
            </div>
        </div>
    `).join("");
}

// ===========================
// View All Buttons
// ===========================
const renderFns = {
    events:      renderEvents,
    restaurants: renderRestaurants,
    nightlife:   renderNightlife,
    attractions: renderAttractions
};

function initViewAllButtons() {
    document.querySelectorAll(".guide-view-all[data-section]").forEach(btn => {
        const fresh = btn.cloneNode(true);
        btn.parentNode.replaceChild(fresh, btn);

        const section = fresh.dataset.section;
        const total   = guideData[section] ? guideData[section].length : 0;
        const preview = PREVIEW_COUNT[section] || 3;

        if (total <= preview) { fresh.style.visibility = "hidden"; return; }

        fresh.addEventListener("click", (e) => {
            e.preventDefault();
            showingAll[section] = !showingAll[section];
            renderFns[section](showingAll[section]);
            initViewAllButtons();
        });

        fresh.innerHTML = showingAll[section]
            ? `Show Less <i class="fa-solid fa-arrow-up"></i>`
            : `View All <i class="fa-solid fa-arrow-right"></i>`;
    });
}

// ===========================
// Tab Switching + Scroll Spy
// ===========================
function initTabs() {
    const tabs = document.querySelectorAll(".guide-tab");
    tabs.forEach(tab => {
        tab.addEventListener("click", () => {
            const target = tab.dataset.target;
            tabs.forEach(t => t.classList.remove("active"));
            tab.classList.add("active");
            const section = document.getElementById(target);
            if (section) {
                const top = section.getBoundingClientRect().top + window.scrollY - 110;
                window.scrollTo({ top, behavior: "smooth" });
            }
        });
    });

    const sections = document.querySelectorAll(".guide-content-section");
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                tabs.forEach(t => t.classList.toggle("active", t.dataset.target === entry.target.id));
            }
        });
    }, { rootMargin: "-30% 0px -60% 0px" });
    sections.forEach(s => observer.observe(s));
}

// ===========================
// Mobile Nav
// ===========================
function initMobileNav() {
    const toggle   = document.querySelector(".nav-toggle");
    const navLinks = document.querySelector(".nav-links");
    if (!toggle || !navLinks) return;
    toggle.addEventListener("click", () => navLinks.classList.toggle("open"));
    navLinks.querySelectorAll("a").forEach(link =>
        link.addEventListener("click", () => navLinks.classList.remove("open"))
    );
}

// ===========================
// Format date from DB
// e.g. "2026-08-01" → "Aug 01"
// ===========================
function formatShortDate(dateStr) {
    if (!dateStr) return "TBC";
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-ZA", { day: "2-digit", month: "short" });
}

// ===========================
// Load from Supabase
// ===========================
async function loadGuideData() {
    try {
        const [eventsRes, restaurantsRes, nightlifeRes, attractionsRes] = await Promise.all([
            supabase.from("events").select("*").eq("status", "active").order("date", { ascending: true }),
            supabase.from("restaurants").select("*").eq("status", "active").order("name"),
            supabase.from("nightlife").select("*").eq("status", "active").order("name"),
            supabase.from("attractions").select("*").eq("status", "active").order("name")
        ]);

        // start of map events
        if (eventsRes.data) {
            guideData.events = eventsRes.data.map(e => ({
                date:            formatShortDate(e.date),
                venue:           e.location         || "",
                title:           e.title,
                description:     e.description      || "",
                fullDescription: e.full_description || e.description || "",
                image:           e.image            || "",
                link:            e.link             || "#",
                featured:        e.featured         || false
            }));

            // pick featured event for the hero
            const featured = eventsRes.data.find(e => e.featured) || eventsRes.data[0];
            if (featured) {
                guideData.featuredEvent = {
                    title:           featured.title,
                    date:            formatShortDate(featured.date),
                    location:        featured.location         || "",
                    image:           featured.image            || "",
                    description:     featured.description      || "",
                    fullDescription: featured.full_description || featured.description || "",
                    link:            featured.link             || "#"
                };
            }
        }
        // end of map events

        // start of map restaurants
        if (restaurantsRes.data) {
            guideData.restaurants = restaurantsRes.data.map(r => ({
                name:        r.name,
                rating:      r.rating       || null,
                cuisine:     r.cuisine      || "Restaurant",
                price:       r.price_range  || "",
                description: r.description  || "",
                image:       r.image        || "",
                maps:        r.maps         || "#"
            }));
        }
        // end of map restaurants

        // start of map nightlife
        if (nightlifeRes.data) {
            guideData.nightlife = nightlifeRes.data.map(n => ({
                name:       n.name,
                vibe:       n.vibe      || n.type || "Venue",
                vibeClass:  (n.vibe || "").toLowerCase() === "party" ? "vibe-party" : "vibe-chill",
                description:n.description || "",
                image:      n.image       || ""
            }));
        }
        // end of map nightlife

        // start of map attractions
        if (attractionsRes.data) {
            guideData.attractions = attractionsRes.data.map(a => ({
                name:        a.name,
                tag:         a.category   || a.entry_fee || "Attraction",
                description: a.description || "",
                image:       a.image       || "",
                link:        a.maps        || "#"
            }));
        }
        // end of map attractions

    } catch (err) {
        console.error("Guide: failed to load from Supabase.", err.message);
    }
}

// ===========================
// Init
// ===========================
document.addEventListener("DOMContentLoaded", async function () {
    injectModal();
    initMobileNav();

    // show loading skeleton while fetching
    ["eventsGrid", "restaurantsGrid", "nightlifeGrid", "attractionsGrid"].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.innerHTML = "<p style='color:#9ca3af;padding:1rem;'>Loading...</p>";
    });

    await loadGuideData();

    renderFeaturedEvent();
    renderEvents();
    renderRestaurants();
    renderNightlife();
    renderAttractions();
    initTabs();
    initViewAllButtons();
});
