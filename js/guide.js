// ===========================
// Guide Page Data
// ===========================
// Wire up the featured event hero button
const featuredBtn = document.getElementById("featuredEventBtn");
if (featuredBtn) {
  featuredBtn.addEventListener("click", (e) => {
    e.preventDefault(); // stop the href="#" from jumping
    const ev = guideData.featuredEvent;
    const meta = `
      <span><i class="fa-regular fa-calendar"></i> ${ev.date}</span>
      <span><i class="fa-solid fa-location-dot"></i> ${ev.location}</span>
    `;
    openModal(ev.title, meta, ev.fullDescription || ev.description, {
      url: ev.link || '#',
      text: 'Get Tickets'
    });
  });
}

const guideData = {
featuredEvent: {
  title: "Mojolo o healthy In Marquee Experience 2nd",
  date: "August 1–2, 2026",
  location: "Carletonville Mall",
  image: "Assets/images/mjolo_event_august_2026.png",
  description: "The biggest annual celebration in Carletonville.",
  fullDescription: "Get ready for an unforgettable weekend at Mojolo o Healthy In Marquee Experience, the ultimate Soul & RnB event of 2026! Taking place in the vibrant city of Carletonville, South Africa, this exclusive gathering promises a perfect blend of soulful rhythms, uplifting vibes, and an atmosphere filled with beautiful people who know how to enjoy life. Tickets start at R 150.00",
  link: "https://computicket-boxoffice.com/e/mojolo-o-healthy-in-marquee-experience-2nd-WfOHg3"
},
// ===========================
// Events
// ===========================
  events: [
    {
      date: "Sep 05", venue: "Wedela Community Park", title: "Wedela Spring Family Fun Day",
      description: "Celebrate the arrival of spring with the entire family at the Wedela Spring Family Fun Day.",
      fullDescription: "Celebrate the arrival of spring with the entire family at the Wedela Spring Family Fun Day, happening on September 5, 2026, at the beautiful Wedela Community Park Madala. From 10:00 AM to 6:00 PM, join us for a day packed with joyful activities, delicious food, and unforgettable memories in a vibrant community setting. Tickets start at R 30.00",
      image: "Assets/images/wedela_sep_2026.jpg",
      link: "https://computicket-boxoffice.com/e/wedela-spring-family-fun-day-aK9LFK"
    },
    {
      date: "Dec 22", venue: "Art Gallery", title: "Local Art Exhibition",
      description: "While the temperature drops , They turning up the heat. DON ENTERTAINMENT PRESENTS DUO NIGHT ",
      fullDescription: "📍 Vintage Car Wash, Khutsong South : 04 July 2026 : 🎟 R100 General | R150 At The Gate | R250 VIP : 🍾 R100 Coolerbox (Food & drinks sold inside) :  Secure your tickets early. Let’s make it an unforgettable winter night",
      image: "Assets/images/duo_night.jpg",
     link: "https://web.facebook.com/groups/478355076736131/?_rdc=1&_rdr#"
    },
   /* {
      date: "Dec 25", venue: "Market Square", title: "Food & Wine Festival",
      description: "Taste the finest local cuisine and wines from the region's best restaurants and vineyards.",
      fullDescription: "Celebrate the holidays at Carletonville's biggest food event! Over 20 restaurants and 8 local vineyards will be presenting their finest offerings. Live entertainment, cooking demos, and children's activities throughout the day. Event runs 11AM to 8PM.",
      image: "Assets/images/breathtaking-shot-colorful-houses-blue-sky.jpg",
      link: "https://www.google.com/search?q=Food+%26+Wine+Festival+Carletonville"
    }
   {
      date: "Dec 28", venue: "Community Centre", title: "Heritage Cultural Evening",
      description: "Celebrate the rich cultural heritage of the West Rand with traditional music, dance, and food.",
      fullDescription: "A vibrant evening celebrating the diverse cultures of the West Rand. Featuring traditional dance performances, live music, and a spread of authentic local cuisine. Family-friendly, running from 5PM to 10PM. Tickets R80 adults, R40 children.",
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
      fullDescription: "An exclusive networking event for Carletonville's business community. Guest speakers, panel discussions on local economic growth, and open networking. Breakfast provided. Starts 7:30AM to 10AM. RSVP required — limited seats available.",
      image: "Assets/images/breathtaking-shot-colorful-houses-blue-sky.jpg"
    }*/
  ],

// ===========================
// resturaants
// ===========================
  restaurants: [
    {
      name: "Franco's Portuguese Restaurant", rating: 4.8, cuisine: "Fine Dining", price: "$$$",
      description: "Indulge in a mouthwatering culinary journey at Franco's Portuguese Restaurant in Carletonville, a local favorite celebrated for its authentic, hearty flavours and generous portions.",
      image: "Assets/images/Franco-S-Portuguese-Restaurant_1.webp",
      maps: "https://maps.app.goo.gl/CMb1kZK8h3WHwPtj7"
    },
    {
      name: "Spur YellowStone", rating: 4.6, cuisine: "Italian", price: "$$",
      description: "Treat the whole family to a classic South African dining experience at the Yellowstone Spur Steak Ranch, Famed for its sizzling steaks, legendary ribs, and kid-friendly play area.",
      image: "Assets/images/yellowstone spur 2.webp",
      maps: "https://maps.app.goo.gl/a7QSDDPymKjFAjtb9"
    },
    {
      name: "Carletonville Wimpy", rating: 4.9, cuisine: "Japanese", price: "$$",
      description: "Start your morning right at Wimpy Carletonville, Known for its iconic all-day breakfasts, legendary coffees, and classic burgers.",
      image: "Assets/images/wimpy.webp",
      maps: "https://maps.app.goo.gl/WtQBL5AsgTnt3s9Q9"
    },
    {
      name: "Timez Cafe", rating: 4.7, cuisine: "South African", price: "$$",
      description: "Experience the ultimate social hotspot at Suits Timez Café, an all-in-one restaurant, bar, cocktail, and sports lounge, it delivers a trendy and energetic atmosphere perfect for a night out with friends or catching live sport on the screens",
      image: "Assets/images/timez_cafe.jpg",
      maps: "https://maps.app.goo.gl/rNMraUjXn2Am26hJ9"
    },
    {
      name: "Snowy Lane", rating: 4.5, cuisine: "Seafood", price: "$$$",
      description: "Take a nostalgic trip down memory lane at Snowy Lane, Renowned for its comforting, home-cooked feel, this hidden gem serves up delicious made-from-scratch pizzas, hearty burgers, and comforting lasagnas crafted from closely guarded family recipes.",
      image: "Assets/images/snowy_lane.jpg",
      maps: "https://maps.app.goo.gl/6s8pUKEWb2U9SCE99"
    },
    {
      name: "Fishaways Carletonville", rating: 4.4, cuisine: "Home Cooking", price: "$",
      description: " This popular fast-casual spot serves up everything from classic, golden-fried hake and chips to freshly prepared sushi, grilled platters.",
      image: "Assets/images/fishaways.jpg",
      maps: "https://maps.app.goo.gl/ui3GSfKYaaNePZa2A"
    }
  ],

  // ===========================
// night life
// ===========================

  nightlife: [
    { name: "Suits Bar", vibe: "Party", vibeClass: "vibe-chill", 
      description: "High-energy dance club to let loose and enjoy", 
      image: "Assets/images/suites_bar.webp" },

    { name: "Peru Lifestyle Lounge", vibe: "Chill", vibeClass: "vibe-party", 
      description: "Step into our vibrant lounge, pour a drink, and vibe to the best local DJs in town.", 
      image: "Assets/images/peru.jpg" },

    { name: "The Workshop Pub & Grill", vibe: "Chill", vibeClass: "vibe-chill", 
      description: "grab a beer and enjoy some local food", 
      image: "Assets/images/Workshop_Pub.jpg" }
  ],

  attractions: [
    { name: "Johannesburg Skydiving Club", tag: "Skydiving", 
      description: "Experience the ultimate thrill at the Johannesburg Skydiving Club, South Africa's premier drop zone offering unforgettable tandem jumps from 11,000 feet.", 
      image: "Assets/images/Skydiving_Club.jpg",
      link: "https://jsc.co.za/"
    },

    { name: "Goldfields west golf club", tag: "Nature", 
      description: "Escape to the serene bushveld at Goldfields West Private Golf Club, a stunning 18-hole parklands course where players share fairways with roaming zebra, springbok, and impala.", 
      image: "Assets/images/golf_club.jpg",
      link: "https://goldfieldswest.co.za/"
    },

    { name: "Abe Bailey Nature Reserve", tag: "Nature", 
      description: "Over 280 species of birds have been recorded in the reserve, including common sightings of the African fish eagle and the summer-visiting osprey. ", 
      image: "Assets/images/abe_bailey.webp",
      link: "https://maps.app.goo.gl/Ctb2XBaGpHZGLDKt5"
    }
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
      <a id="modalCta" href="#" target="_blank" style="display:none;margin-top:18px;padding:12px 18px;background:#111827;color:#fff;border-radius:12px;text-decoration:none;font-weight:700;">Learn More <i class='fa-solid fa-arrow-right' style='margin-left:8px;'></i></a>
    </div>
  `;
  document.body.appendChild(modal);
  document.getElementById("guideModalClose").addEventListener("click", closeModal);
  document.getElementById("guideModalOverlay").addEventListener("click", closeModal);
  document.addEventListener("keydown", e => { if (e.key === "Escape") closeModal(); });
}

function openModal(title, meta, description, cta) {
  document.getElementById("modalTitle").textContent = title;
  document.getElementById("modalMeta").innerHTML = meta;
  document.getElementById("modalDescription").textContent = description;

  const modalCta = document.getElementById("modalCta");
  if (cta && cta.url) {
    modalCta.href = cta.url;
    modalCta.textContent = cta.text || "Learn More";
    modalCta.innerHTML += ` <i class='fa-solid fa-arrow-right' style='margin-left:8px;'></i>`;
    modalCta.style.display = "inline-flex";
  } else {
    modalCta.style.display = "none";
  }

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
      openModal(ev.title, meta, ev.fullDescription || ev.description, {
        url: ev.link || '#',
        text: 'Get Tickets'
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
        <a href="${a.link || '#'}" target="_blank" class="attraction-link-btn">
          Visit <i class="fa-solid fa-arrow-right"></i>
        </a>
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