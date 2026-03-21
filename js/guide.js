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
      date: "Dec 20",
      venue: "City Hall",
      title: "Live Music Night",
      description: "Experience an unforgettable evening of live performances from local and international artists under the stars.",
      image: "Assets/images/breathtaking-shot-colorful-houses-blue-sky.jpg"
    },
    {
      date: "Dec 22",
      venue: "Art Gallery",
      title: "Local Art Exhibition",
      description: "Showcase of talented local artists featuring paintings, sculptures, and mixed media installations.",
      image: "Assets/images/breathtaking-shot-colorful-houses-blue-sky.jpg"
    },
    {
      date: "Dec 25",
      venue: "Market Square",
      title: "Food & Wine Festival",
      description: "Taste the finest local cuisine and wines from the region's best restaurants and vineyards.",
      image: "Assets/images/breathtaking-shot-colorful-houses-blue-sky.jpg"
    }
  ],

  restaurants: [
    {
      name: "The Golden Fork",
      rating: 4.8,
      cuisine: "Fine Dining",
      price: "$$$",
      description: "Fine dining experience with premium steaks and an extensive wine selection in an elegant atmosphere.",
      image: "Assets/images/breathtaking-shot-colorful-houses-blue-sky.jpg"
    },
    {
      name: "Bella Italia",
      rating: 4.6,
      cuisine: "Italian",
      price: "$$",
      description: "Authentic Italian cuisine with handmade pasta and wood-fired pizzas in a cozy, family-friendly setting.",
      image: "Assets/images/breathtaking-shot-colorful-houses-blue-sky.jpg"
    },
    {
      name: "Sakura Sushi Bar",
      rating: 4.9,
      cuisine: "Japanese",
      price: "$$",
      description: "Fresh sushi and sashimi prepared by master chefs, offering an authentic Japanese dining experience.",
      image: "Assets/images/breathtaking-shot-colorful-houses-blue-sky.jpg"
    }
  ],

  nightlife: [
    {
      name: "The Velvet Lounge",
      vibe: "Chill",
      vibeClass: "vibe-chill",
      description: "Sophisticated cocktail bar with live jazz music",
      image: "Assets/images/breathtaking-shot-colorful-houses-blue-sky.jpg"
    },
    {
      name: "Pulse Nightclub",
      vibe: "Party",
      vibeClass: "vibe-party",
      description: "High-energy dance club with top DJs",
      image: "Assets/images/breathtaking-shot-colorful-houses-blue-sky.jpg"
    },
    {
      name: "Brewmaster's Pub",
      vibe: "Chill",
      vibeClass: "vibe-chill",
      description: "Craft beer haven with local brews",
      image: "Assets/images/breathtaking-shot-colorful-houses-blue-sky.jpg"
    },
    {
      name: "Skyline Rooftop",
      vibe: "Chill",
      vibeClass: "vibe-chill",
      description: "Panoramic views with signature cocktails",
      image: "Assets/images/breathtaking-shot-colorful-houses-blue-sky.jpg"
    }
  ],

  attractions: [
    {
      name: "Carletonville Mine Museum",
      tag: "History",
      description: "Explore the rich gold-mining heritage of the West Rand through interactive exhibits and underground tours.",
      image: "Assets/images/breathtaking-shot-colorful-houses-blue-sky.jpg"
    },
    {
      name: "Boskop Dam Nature Reserve",
      tag: "Nature",
      description: "A tranquil nature reserve perfect for bird watching, fishing, and picnics with the whole family.",
      image: "Assets/images/breathtaking-shot-colorful-houses-blue-sky.jpg"
    },
    {
      name: "West Rand Heritage Trail",
      tag: "Culture",
      description: "Walk the historic trail that tells the story of the communities that shaped Carletonville.",
      image: "Assets/images/breathtaking-shot-colorful-houses-blue-sky.jpg"
    }
  ],

  tours: [
    {
      name: "Gold Mine Heritage Tour",
      description: "Go underground and experience the history of gold mining that built this region. Led by expert local guides.",
      price: "R350/person",
      image: "Assets/images/breathtaking-shot-colorful-houses-blue-sky.jpg"
    },
    {
      name: "Carletonville Foodie Walk",
      description: "Sample the best local eateries and street food on a guided walking tour through the town center.",
      price: "R180/person",
      image: "Assets/images/breathtaking-shot-colorful-houses-blue-sky.jpg"
    },
    {
      name: "Sunset Nature Drive",
      description: "A guided sunset game drive through the surrounding bushveld with a professional nature guide.",
      price: "R450/person",
      image: "Assets/images/breathtaking-shot-colorful-houses-blue-sky.jpg"
    }
  ]
};

// ===========================
// Render Functions
// ===========================

function renderFeaturedEvent() {
  const fe = guideData.featuredEvent;
  const hero = document.getElementById("guideHero");
  if (hero) {
    hero.style.backgroundImage = `url('${fe.image}')`;
  }
  const titleEl = document.getElementById("featuredEventTitle");
  const dateEl = document.getElementById("featuredEventDate");
  const locEl = document.getElementById("featuredEventLocation");
  if (titleEl) titleEl.textContent = fe.title;
  if (dateEl) dateEl.textContent = fe.date;
  if (locEl) locEl.textContent = fe.location;
}

function renderEvents() {
  const grid = document.getElementById("eventsGrid");
  if (!grid) return;
  grid.innerHTML = guideData.events.map(ev => `
    <div class="event-card">
      <img class="event-card-img" src="${ev.image}" alt="${ev.title}">
      <div class="event-card-body">
        <div class="event-card-meta">
          <span><i class="fa-regular fa-calendar"></i> ${ev.date}</span>
          <span><i class="fa-solid fa-location-dot"></i> ${ev.venue}</span>
        </div>
        <h3>${ev.title}</h3>
        <p>${ev.description}</p>
        <a href="#" class="event-card-link">Learn More <i class="fa-solid fa-arrow-right"></i></a>
      </div>
    </div>
  `).join("");
}

function renderRestaurants() {
  const grid = document.getElementById("restaurantsGrid");
  if (!grid) return;
  grid.innerHTML = guideData.restaurants.map(r => `
    <div class="restaurant-card">
      <img class="restaurant-card-img" src="${r.image}" alt="${r.name}">
      <div class="restaurant-card-body">
        <div class="restaurant-card-title-row">
          <h3>${r.name}</h3>
          <span class="restaurant-rating"><i class="fa-solid fa-star"></i> ${r.rating}</span>
        </div>
        <p>${r.description}</p>
        <div class="restaurant-card-tags">
          <span><i class="fa-solid fa-utensils"></i> ${r.cuisine}</span>
          <span><i class="fa-solid fa-dollar-sign"></i> ${r.price}</span>
        </div>
      </div>
    </div>
  `).join("");
}

function renderNightlife() {
  const grid = document.getElementById("nightlifeGrid");
  if (!grid) return;
  grid.innerHTML = guideData.nightlife.map(n => `
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

function renderAttractions() {
  const grid = document.getElementById("attractionsGrid");
  if (!grid) return;
  grid.innerHTML = guideData.attractions.map(a => `
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

function renderTours() {
  const grid = document.getElementById("toursGrid");
  if (!grid) return;
  grid.innerHTML = guideData.tours.map(t => `
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
// Tab Switching
// ===========================

function initTabs() {
  const tabs = document.querySelectorAll(".guide-tab");
  const sections = document.querySelectorAll(".guide-content-section");

  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      const target = tab.dataset.target;

      // Update active tab
      tabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");

      // Show correct section
      sections.forEach(s => {
        if (s.id === target) {
          s.classList.add("active");
        } else {
          s.classList.remove("active");
        }
      });

      // Scroll to the section smoothly
      const section = document.getElementById(target);
      if (section) {
        section.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });
}

// ===========================
// Init
// ===========================

document.addEventListener("DOMContentLoaded", function () {
  renderFeaturedEvent();
  renderEvents();
  renderRestaurants();
  renderNightlife();
  renderAttractions();
  renderTours();
  initTabs();
});