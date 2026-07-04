const listings = [
  {
    id: 1,
    name: "Suits Guesthouse",
    location: "Historic Center, Carletonville",
    description: "Comfortable guesthouse with breakfast included. Features elegant rooms and beautiful garden views.",
    price: 350,
    image: "Assets/images/suites_b&b/suites1.avif",
    amenities: ["wifi", "breakfast"],
    phone: "+27822948354",
    maps: "https://maps.app.goo.gl/s5GDjHs7c4WyG1e6A",
    gallery: [
      "Assets/images/suites_b&b/suites1.avif",
      "Assets/images/suites_b&b/suites0.jpg",
      "Assets/images/suites_b&b/suites2.avif",
      "Assets/images/suites_b&b/suites3.avif",
      "Assets/images/suites_b&b/suites4.avif",
      "Assets/images/suites_b&b/suites5.jpg",
      "Assets/images/suites_b&b/suites6.jpg",
    ],
    rooms: [
      {
        name: "Standard Single",
        beds: 1,
        guests: 1,
        price: 350,
        description: "Cosy single room with garden views and breakfast included.",
        images: ["Assets/images/suites_b&b/suites0.jpg", "Assets/images/suites_b&b/suites1.avif"]
      },
      {
        name: "Double Room",
        beds: 2,
        guests: 2,
        price: 550,
        description: "Spacious double room with en-suite bathroom and breakfast for two.",
        images: ["Assets/images/suites_b&b/suites5.jpg", "Assets/images/suites_b&b/suites6.jpg"]
      },
    /* {
        name: "Family Suite",
        beds: 3,
        guests: 4,
        price: 850,
        description: "Large family suite with 3 beds, private lounge and garden entrance.",
        images: ["Assets/images/breathtaking-shot-colorful-houses-blue-sky.jpg", "Assets/images/listing.svg"]
      }*/
    ]
  },
  {
    id: 2,
    name: "Onze Whonen Guesthouse ",
    location: "Central Carletonville",
    description: "Affordable lodge with modern rooms. Perfect for business travelers and tourists.",
    price: 420,
    image: "Assets/images/Onze_b&b/onze 10.jpg",
    amenities: ["wifi", "parking"],
    phone: "+27829349700",
    maps: "https://maps.app.goo.gl/FEaGT6yeY5VvEbi58",
    gallery: [
      "Assets/images/Onze_b&b/onze 1.jpg",
      "Assets/images/Onze_b&b/onze 3.jpg",
      "Assets/images/Onze_b&b/onze 4.jpg",
      "Assets/images/Onze_b&b/onze 5.jpg",
      "Assets/images/Onze_b&b/onze 5.jpg",
      "Assets/images/Onze_b&b/onze 6.jpg",
      "Assets/images/Onze_b&b/onze 7.jpg",
      "Assets/images/Onze_b&b/onze 8.jpg"
    ],
    rooms: [
      {
        name: "Standard Room",
        beds: 1,
        guests: 2,
        price: 420,
        description: "Modern single room with fast WiFi and free parking.",
        images: ["Assets/images/Onze_b&b/onze 9.jpg", "Assets/images/Onze_b&b/onze 10.jpg"]
      },
     /* {
        name: "Twin Room",
        beds: 2,
        guests: 2,
        price: 620,
        description: "Twin beds, work desk, and en-suite. Ideal for two business travelers.",
        images: ["Assets/images/breathtaking-shot-colorful-houses-blue-sky.jpg", "Assets/images/listing.svg"]
      },
      {
        name: "Executive Suite",
        beds: 2,
        guests: 3,
        price: 900,
        description: "Premium suite with lounge, mini-bar, and panoramic town views.",
        images: ["Assets/images/breathtaking-shot-colorful-houses-blue-sky.jpg", "Assets/images/listing.svg"]
      }*/
    ]
  },
  {
    id: 3,
    name: "Elspeth Guesthouse",
    location: "West Carletonville",
    description: "Quiet stay with a relaxing atmosphere. Enjoy beautiful sunsets from your room.",
    price: 390,
    image: "Assets/images/Elspeth/Elspeth1.webp",
    amenities: ["breakfast", "parking"],
    phone: "+27187872694",
    maps: "https://maps.app.goo.gl/gZTGPmFiFJsop9SH9",
    gallery: [
      "Assets/images/Elspeth/Elspeth1.webp",
      "Assets/images/Elspeth/Elspeth2.webp",
      "Assets/images/Elspeth/Elspeth3.webp",
      "Assets/images/Elspeth/Elspeth4.webp",
      "Assets/images/Elspeth/Elspeth5.webp",
      "Assets/images/Elspeth/Elspeth6.webp",
      "Assets/images/Elspeth/Elspeth7.webp",
      "Assets/images/Elspeth/Elspeth8.webp",
      "Assets/images/Elspeth/Elspeth9.webp",
      "Assets/images/Elspeth/Elspeth10.webp",
      "Assets/images/Elspeth/Elspeth11.webp",
      "Assets/images/Elspeth/Elspeth12.webp",
      "Assets/images/Elspeth/Elspeth13.webp",
      "Assets/images/Elspeth/Elspeth14.webp",
      "Assets/images/Elspeth/Elspeth15.webp",
      "Assets/images/Elspeth/Elspeth11.webp"
    ],
    rooms: [
      {
        name: "Cosy Single",
        beds: 1,
        guests: 1,
        price: 390,
        description: "Quiet room with sunset views and home-cooked breakfast every morning.",
        images: ["Assets/images/Elspeth/Elspeth1.webp", "Assets/images/Elspeth/Elspeth2.webp"]
      },
      {
        name: "Double Room",
        beds: 2,
        guests: 2,
        price: 580,
        description: "Comfortable double room with a private patio facing the western sunset.",
        images: ["Assets/images/Elspeth/Elspeth8.webp"]
      },
     /* {
        name: "Family Room",
        beds: 3,
        guests: 5,
        price: 950,
        description: "Spacious family room with 3 beds, private parking and full breakfast for all.",
        images: ["Assets/images/breathtaking-shot-colorful-houses-blue-sky.jpg", "Assets/images/listing.svg"]
      }*/
    ]
  },
  {
    id: 4,
    name: "Casa Villa Guest House",
    location: "North Carletonville",
    description: "Scenic lodge with mountain views. Perfect for nature lovers and photographers.",
    price: 520,
    image: "Assets/images/casa/casa1.webp",
    amenities: ["wifi", "breakfast", "parking"],
    phone: "+27763425541",
    maps: "https://maps.app.goo.gl/iVUpsGidoHeHfGUd6",
    gallery: [
      "Assets/images/casa/casa1.webp",
      "Assets/images/casa/casa2.webp",
      "Assets/images/casa/casa3.webp",
      "Assets/images/casa/casa4.webp",
      "Assets/images/casa/casa5.webp",
      "Assets/images/casa/casa6.webp",
      "Assets/images/casa/casa7.webp",
      "Assets/images/casa/casa8.webp"
    ],
    rooms: [
      {
        name: "Mountain View Single",
        beds: 1,
        guests: 1,
        price: 520,
        description: "Single room with floor-to-ceiling windows showcasing the mountain landscape.",
        images: ["Assets/images/casa/casa1.webp"]
      },
      {
        name: "Deluxe Double",
        beds: 2,
        guests: 2,
        price: 780,
        description: "King bed, fireplace, and private mountain-view deck.",
        images: ["Assets/images/casa/casa3.jpg", "Assets/images/casa/casa4.jpg"]
      },
      {
        name: "Lodge Suite",
        beds: 3,
        guests: 4,
        price: 1200,
        description: "Full suite with 4 beds, equipped kitchen, and wraparound mountain views.",
        images: ["Assets/images/casa/casa2.jpg", "Assets/images/casa/casa5.jpg"]
      }
    ]
  },
  {
    id: 5,
    name: "Romans Rest Guesthouse",
    location: "East Carletonville",
    description: "Warm hospitality and homemade meals. Feel at home with our friendly hosts.",
    price: 290,
    image: "Assets/images/Romans/romans0.jpg",
    amenities: ["breakfast"],
    phone: "+27824411302",
    maps: "https://maps.app.goo.gl/pRg1ZFrov5db15Bf6",
    gallery: [
      "Assets/images/Romans/romans0.jpg",
      "Assets/images/Romans/romans1.jpg",
      "Assets/images/Romans/romans3.jpg",
      "Assets/images/Romans/romans4.jpg",
      "Assets/images/Romans/romans5.jpg",
      "Assets/images/Romans/romans6.jpg",
      "Assets/images/Romans/romans7.jpg",
      "Assets/images/Romans/romans8.jpg",
      "Assets/images/Romans/romans9.jpg",
      "Assets/images/Romans/romans10.jpg"
    ],
    rooms: [
      {
        name: "Budget Single",
        beds: 1,
        guests: 1,
        price: 290,
        description: "Affordable homely single room with homemade breakfast included.",
        images: ["Assets/images/Romans/romans2.jpg", "Assets/images/Romans/romans3.jpg"]
      },
      {
        name: "Couple's Room",
        beds: 2,
        guests: 2,
        price: 450,
        description: "Romantic double room with private sitting area and garden access.",
        images: ["Assets/images/Romans/romans5.jpg", "Assets/images/Romans/romans6.jpg"]
      }
    ]
  },
  {
    id: 6,
    name: "Casablanca Guest House and Restaurant",
    location: "South Carletonville",
    description: "Peaceful retreat near the nature reserve. Enjoy bird watching and nature walks.",
    price: 610,
    image: "Assets/images/casablanca/casablanca1.webp",
    amenities: ["wifi", "parking"],
    phone: "+27647518604",
    maps: "https://maps.app.goo.gl/wxvoLu75EVranSc67",
    gallery: [
      "Assets/images/casablanca/casablanca1.webp",
      "Assets/images/casablanca/casablanca2.webp",
      "Assets/images/casablanca/casablanca3.webp",
      "Assets/images/casablanca/casablanca4.webp",
      "Assets/images/casablanca/casablanca5.webp",
      "Assets/images/casablanca/casablanca6.webp",
      "Assets/images/casablanca/casablanca7.webp",
      "Assets/images/casablanca/casablanca8.webp",
      "Assets/images/casablanca/casablanca9.webp",
      "Assets/images/casablanca/casablanca10.webp",
      "Assets/images/casablanca/casablanca11.webp",
      "Assets/images/casablanca/casablanca12.webp",
      "Assets/images/casablanca/casablanca13.webp",
      "Assets/images/casablanca/casablanca14.webp"
    ],
    rooms: [
      {
        name: "Creek View Single",
        beds: 1,
        guests: 1,
        price: 610,
        description: "Tranquil single room overlooking the creek. Perfect for birdwatchers.",
        images: ["Assets/images/casablanca/casablanca3.webp", "Assets/images/casablanca/casablanca4.webp"]
      },
      {
        name: "Nature Double",
        beds: 2,
        guests: 2,
        price: 850,
        description: "Double room with private nature trail access and outdoor shower.",
        images: ["Assets/images/casablanca/casablanca6.webp", "Assets/images/casablanca/casablanca7.webp"]
      },
     /* {
        name: "Family Cabin",
        beds: 3,
        guests: 6,
        price: 1400,
        description: "Full cabin for families with 3 bedrooms, braai area and direct reserve access.",
        images: ["Assets/images/breathtaking-shot-colorful-houses-blue-sky.jpg", "Assets/images/listing.svg"]
      }*/
    ]
  }
];