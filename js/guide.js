// ===========================
// Guide Page Data
// ===========================

const guideData = {
  featuredEvent: {
    title: "Carletonville Summer Festival",
    date: "December 15–17, 2024",
    location: "Central Park, Carletonville",
    image: "Assets/images/breathtaking-shot-colorful-houses-blue-sky.jpg"
  },

  events: [
    {
      date: "Dec 20", venue: "City Hall", title: "Live Music Night",
      description: "Experience an unforgettable evening of live performances from local and international artists under the stars.",
      fullDescription: "Join us for an extraordinary night of live music at City Hall. Featuring both local talent and international artists, this event promises a memorable evening. Doors open at 6PM, performances from 7PM–11PM. Tickets available at the door.",
      image: "Assets/images/breathtaking-shot-colorful-houses-blue-sky.jpg"
    },
    {
      date: "Dec 22", venue: "Art Gallery", title: "Local Art Exhibition",
      description: "Showcase of talented local artists featuring paintings, sculptures, and mixed media installations.",
      fullDescription: "A curated showcase of over 30 local artists displaying paintings, sculptures, photography, and mixed media works. The exhibition runs 10AM–6PM daily. Entry is free and open to the public. Meet the artists at the opening night on Dec 22 from 6PM–9PM.",
      image: "Assets/images/breathtaking-shot-colorful-houses-blue-sky.jpg"
    },
    {
      date: "Dec 25", venue: "Market Square", title: "Food & Wine Festival",
      description: "Taste the finest local cuisine and wines from the region's best restaurants and vineyards.",
      fullDescription: "Celebrate the holidays at Carletonville's biggest food event! Over 20 restaurants and 8 local vineyards will be presenting their finest offerings. Live entertainment, cooking demos, and children's activities throughout the day. Event runs 11AM–8PM.",
      image: "Assets/images/breathtaking-shot-colorful-houses-blue-sky.jpg"
    },
    {
      date: "Dec 28", venue: "Community Centre", title: "Heritage Cultural Evening",
      description: "Celebrate the rich cultural heritage of the West Rand with traditional music, dance, and food.",
      fullDescription: "A vibrant evening celebrating the diverse cultures of the West Rand. Featuring traditional dance performances, live music, and a spread of authentic local cuisine. Family-friendly, running from 5PM–10PM. Tickets R80 adults, R40 children.",
      image: "Assets/images/breathtaking-shot-colorful-houses-blue-sky.jpg"
    },
    {
      date: "Jan 3", venue: "Sports Ground", title: "New Year Fun Run",
      description: "Kick off the new year with a 5km and 10km fun run through the scenic streets of Carletonville.",
      fullDescription: "Start 2025 on the right foot! Choose between a 5km or 10km route through Carletonville's most scenic areas. All fitness levels welcome. Registration from 6AM, race starts 7AM. Entry fee R120 includes a t-shirt and medal.",
      image: "Assets/images/breathtaking-shot-colorful-houses-blue-sky.jpg"
    },
    {
      date: "Jan 10", venue: "Town Hall", title: "Business Networking Breakfast",
      description: "Connect with local entrepreneurs and business leaders over a hearty breakfast.",
      fullDescription: "An exclusive networking event for Carletonville's business community. Guest speakers, panel discussions on local economic growth, and open networking. Breakfast provided. Starts 7:30AM–10AM. RSVP required — limited seats available.",
      image: "Assets/images/breathtaking-shot-colorful-houses-blue-sky.jpg"
    }
  ],

  restaurants: [
    {
      name: "Franco's Portuguese Restaurant", rating: 4.8, cuisine: "Fine Dining", price: "$$$",
      description: "Fine dining experience with premium steaks and an extensive wine selection in an elegant atmosphere.",
      image: "Assets/images/Franco-S-Portuguese-Restaurant_1.webp",
      maps: "https://maps.google.com/?q=Franco's+Portuguese+Restaurant+Carletonville"
    },
    {
      name: "Spur YellowStone", rating: 4.6, cuisine: "Italian", price: "$$",
      description: "Authentic Italian cuisine with handmade pasta and wood-fired pizzas in a cozy, family-friendly setting.",
      image: "Assets/images/yellowstone spur.webp",
      maps: "https://maps.google.com/?q=Italian+Restaurant+Carletonville"
    },
    {
      name: "Sakura Sushi Bar", rating: 4.9, cuisine: "Japanese", price: "$$",
      description: "Fresh sushi and sashimi prepared by master chefs, offering an authentic Japanese dining experience.",
      image: "Assets/images/breathtaking-shot-colorful-houses-blue-sky.jpg",
      maps: "https://maps.google.com/?q=Sushi+Bar+Carletonville"
    },
    {
      name: "The Braai House", rating: 4.7, cuisine: "South African", price: "$$",
      description: "Traditional South African braai in a warm outdoor setting. Known for boerewors and perfectly grilled meats.",
      image: "Assets/images/breathtaking-shot-colorful-houses-blue-sky.jpg",
      maps: "https://maps.google.com/?q=Braai+Restaurant+Carletonville"
    },
    {
      name: "Cape Town Fish Market", rating: 4.5, cuisine: "Seafood", price: "$$$",
      description: "Fresh catch of the day, line fish, calamari, and prawns. The best seafood experience inland.",
      image: "Assets/images/breathtaking-shot-colorful-houses-blue-sky.jpg",
      maps: "https://maps.google.com/?q=Fish+Market+Carletonville"
    },
    {
      name: "Mamma's Kitchen", rating: 4.4, cuisine: "Home Cooking", price: "$",
      description: "Hearty home-cooked meals in a welcoming family atmosphere. Daily specials and Sunday roasts.",
      image: "Assets/images/breathtaking-shot-colorful-houses-blue-sky.jpg",
      maps: "https://maps.google.com/?q=Mamma's+Kitchen+Carletonville"
    }
  ],

  nightlife: [
    { name: "The Velvet Lounge", vibe: "Chill", vibeClass: "vibe-chill", description: "Sophisticated cocktail bar with live jazz music", image: "Assets/images/breathtaking-shot-colorful-houses-blue-sky.jpg" },
    { name: "Pulse Nightclub", vibe: "Party", vibeClass: "vibe-party", description: "High-energy dance club with top DJs", image: "Assets/images/breathtaking-shot-colorful-houses-blue-sky.jpg" },
    { name: "Brewmaster's Pub", vibe: "Chill", vibeClass: "vibe-chill", description: "Craft beer haven with local brews", image: "Assets/images/breathtaking-shot-colorful-houses-blue-sky.jpg" },
    { name: "Skyline Rooftop", vibe: "Chill", vibeClass: "vibe-chill", description: "Panoramic views with signature cocktails", image: "Assets/images/breathtaking-shot-colorful-houses-blue-sky.jpg" }
  ],

  attractions: [
    { name: "Carletonville Mine Museum", tag: "History", description: "Explore the rich gold-mining heritage of the West Rand through interactive exhibits and underground tours.", image: "Assets/images/breathtaking-shot-colorful-houses-blue-sky.jpg" },
    { name: "Boskop Dam Nature Reserve", tag: "Nature", description: "A tranquil nature reserve perfect for bird watching, fishing, and picnics with the whole family.", image: "Assets/images/breathtaking-shot-colorful-houses-blue-sky.jpg" },
    { name: "West Rand Heritage Trail", tag: "Culture", description: "Walk the historic trail that tells the story of the communities that shaped Carletonville.", image: "Assets/images/breathtaking-shot-colorful-houses-blue-sky.jpg" }
  ],

  tours: [
    { name: "Gold Mine Heritage Tour", description: "Go underground and experience the history of gold mining that built this region. Led by expert local guides.", price: "R350/person", image: "Assets/images/breathtaking-shot-colorful-houses-blue-sky.jpg" },
    { name: "Carletonville Foodie Walk", description: "Sample the best local eateries and street food on a guided walking tour through the town center.", price: "R180/person", image: "Assets/images/breathtaking-shot-colorful-houses-blue-sky.jpg" },
    { name: "Sunset Nature Drive", description: "A guided sunset game drive through the surrounding bushveld with a professional nature guide.", price: "R450/person", image: "Assets/images/breathtaking-shot-colorful-houses-blue-sky.jpg" }
  ]
};

// ===========================
// State — how many shown by default
// ===========================
const PREVIEW_COUNT = { events: 3, restaurants: 3, nightlife: 4, attractions: 3, tours: 3 };
const showingAll   = { events: false, restaurants: false, nightlife: false, attractions: false, tours: false };

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
    </div>
  `;
  document.body.appendChild(modal);
  document.getElementById("guideModalClose").addEventListener("click", closeModal);
  document.getElementById("guideModalOverlay").addEventListener("click", closeModal);
  document.addEventListener("keydown", e => { if (e.key === "Escape") closeModal(); });
}

function openModal(title, meta, description) {
  document.getElementById("modalTitle").textContent = title;
  document.getElementById("modalMeta").innerHTML = meta;
  document.getElementById("modalDescription").textContent = description;
  const modal = document.getElementById("guideModal");
  modal.style.display = "flex";
  document.body.style.overflow = "hidden";
}

function closeModal() {
  document.getElementById("guideModal").style.display = "none";
  document.body.style.overflow = "";
}

// ===========================
// Render Events
// ===========================
function renderEvents(all) {
  all = all !== undefined ? all : showingAll.events;
  const grid = document.getElementById("eventsGrid");
  if (!grid) return;
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
      const ev = items[parseInt(btn.dataset.index)];
      const meta = `<span><i class="fa-regular fa-calendar"></i> ${ev.date}</span><span><i class="fa-solid fa-location-dot"></i> ${ev.venue}</span>`;
      openModal(ev.title, meta, ev.fullDescription || ev.description);
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
          <span class="restaurant-rating"><i class="fa-solid fa-star"></i> ${r.rating}</span>
        </div>
        <p>${r.description}</p>
        <div class="restaurant-card-footer">
          <div class="restaurant-card-tags">
            <span><i class="fa-solid fa-utensils"></i> ${r.cuisine}</span>
            <span><i class="fa-solid fa-tag"></i> ${r.price}</span>
          </div>
          <a href="${r.maps}" target="_blank" class="directions-btn">
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
  const items = all ? guideData.nightlife : guideData.nightlife.slice(0, PREVIEW_COUNT.nightlife);
  grid.innerHTML = items.map(n => `
    <div class="nightlife-card">
      <img class="nightlife-card-img" src="${n.image}" alt="${n.name}">
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
  const items = all ? guideData.attractions : guideData.attractions.slice(0, PREVIEW_COUNT.attractions);
  grid.innerHTML = items.map(a => `
    <div class="attraction-card">
      <img class="attraction-card-img" src="${a.image}" alt="${a.name}">
      <div class="attraction-card-body">
        <h3>${a.name}</h3>
        <p>${a.description}</p>
        <span class="attraction-tag">${a.tag}</span>
      </div>
    </div>
  `).join("");
}

// ===========================
// Render Tours
// ===========================
function renderTours(all) {
  all = all !== undefined ? all : showingAll.tours;
  const grid = document.getElementById("toursGrid");
  if (!grid) return;
  const items = all ? guideData.tours : guideData.tours.slice(0, PREVIEW_COUNT.tours);
  grid.innerHTML = items.map(t => `
    <div class="tour-card">
      <img class="tour-card-img" src="${t.image}" alt="${t.name}">
      <div class="tour-card-body">
        <h3>${t.name}</h3>
        <p>${t.description}</p>
        <div class="tour-card-footer">
          <span class="tour-price">${t.price}</span>
          <a href="#" class="tour-book-btn">Book Now</a>
        </div>
      </div>
    </div>
  `).join("");
}

// ===========================
// View All Buttons
// ===========================
const renderFns = { events: renderEvents, restaurants: renderRestaurants, nightlife: renderNightlife, attractions: renderAttractions, tours: renderTours };

function initViewAllButtons() {
  document.querySelectorAll(".guide-view-all[data-section]").forEach(btn => {
    // Remove old listeners by replacing with clone
    const fresh = btn.cloneNode(true);
    btn.parentNode.replaceChild(fresh, btn);

    const section = fresh.dataset.section;
    const total = guideData[section] ? guideData[section].length : 0;
    const preview = PREVIEW_COUNT[section] || 3;

    if (total <= preview) { fresh.style.visibility = "hidden"; return; }

    fresh.addEventListener("click", (e) => {
      e.preventDefault();
      showingAll[section] = !showingAll[section];
      renderFns[section](showingAll[section]);
      // Re-init after re-render
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
  const toggle = document.querySelector(".nav-toggle");
  const navLinks = document.querySelector(".nav-links");
  if (!toggle || !navLinks) return;
  toggle.addEventListener("click", () => navLinks.classList.toggle("open"));
  navLinks.querySelectorAll("a").forEach(link => link.addEventListener("click", () => navLinks.classList.remove("open")));
}

// ===========================
// Init
// ===========================
document.addEventListener("DOMContentLoaded", function () {
  injectModal();
  renderFeaturedEvent();
  renderEvents();
  renderRestaurants();
  renderNightlife();
  renderAttractions();
  renderTours();
  initTabs();
  initViewAllButtons();
  initMobileNav();
});

function renderFeaturedEvent() {
  const fe = guideData.featuredEvent;
  const hero = document.getElementById("guideHero");
  if (hero) hero.style.backgroundImage = `url('${fe.image}')`;
  const t = document.getElementById("featuredEventTitle");
  const d = document.getElementById("featuredEventDate");
  const l = document.getElementById("featuredEventLocation");
  if (t) t.textContent = fe.title;
  if (d) d.textContent = fe.date;
  if (l) l.textContent = fe.location;
}