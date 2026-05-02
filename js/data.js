const listings = [
  {
    id: 1,
    name: "Suits Guesthouse",
    location: "Historic Center, Carletonville",
    description: "Comfortable guesthouse with breakfast included. Features elegant rooms and beautiful garden views.",
    price: 350,
    image: "Assets/images/Suits Guesthouse_1.webp",
    amenities: ["wifi", "breakfast"],
    phone: "+27118001001",
    maps: "https://maps.google.com/?q=Carletonville,Gauteng,SouthAfrica",
    gallery: [
      "Assets/images/breathtaking-shot-colorful-houses-blue-sky.jpg",
      "Assets/images/listing.svg",
      "Assets/images/listing.svg",
      "Assets/images/listing.svg"
    ],
    rooms: [
      {
        name: "Standard Single",
        beds: 1,
        guests: 1,
        price: 350,
        description: "Cosy single room with garden views and breakfast included.",
        images: ["Assets/images/breathtaking-shot-colorful-houses-blue-sky.jpg", "Assets/images/listing.svg"]
      },
      {
        name: "Double Room",
        beds: 2,
        guests: 2,
        price: 550,
        description: "Spacious double room with en-suite bathroom and breakfast for two.",
        images: ["Assets/images/breathtaking-shot-colorful-houses-blue-sky.jpg", "Assets/images/listing.svg"]
      },
      {
        name: "Family Suite",
        beds: 3,
        guests: 4,
        price: 850,
        description: "Large family suite with 3 beds, private lounge and garden entrance.",
        images: ["Assets/images/breathtaking-shot-colorful-houses-blue-sky.jpg", "Assets/images/listing.svg"]
      }
    ]
  },
  {
    id: 2,
    name: "Greenwood Lodge",
    location: "Central Carletonville",
    description: "Affordable lodge with modern rooms. Perfect for business travelers and tourists.",
    price: 420,
    image: "Assets/images/breathtaking-shot-colorful-houses-blue-sky.jpg",
    amenities: ["wifi", "parking"],
    phone: "+27118001002",
    maps: "https://maps.google.com/?q=Greenwood+Lodge+Carletonville",
    gallery: [
      "Assets/images/breathtaking-shot-colorful-houses-blue-sky.jpg",
      "Assets/images/listing.svg",
      "Assets/images/listing.svg",
      "Assets/images/listing.svg"
    ],
    rooms: [
      {
        name: "Standard Room",
        beds: 1,
        guests: 1,
        price: 420,
        description: "Modern single room with fast WiFi and free parking.",
        images: ["Assets/images/breathtaking-shot-colorful-houses-blue-sky.jpg", "Assets/images/listing.svg"]
      },
      {
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
      }
    ]
  },
  {
    id: 3,
    name: "Sunset Guesthouse",
    location: "West Carletonville",
    description: "Quiet stay with a relaxing atmosphere. Enjoy beautiful sunsets from your room.",
    price: 390,
    image: "Assets/images/breathtaking-shot-colorful-houses-blue-sky.jpg",
    amenities: ["breakfast", "parking"],
    phone: "+27118001003",
    maps: "https://maps.google.com/?q=Sunset+Guesthouse+Carletonville",
    gallery: [
      "Assets/images/breathtaking-shot-colorful-houses-blue-sky.jpg",
      "Assets/images/listing.svg",
      "Assets/images/listing.svg",
      "Assets/images/listing.svg"
    ],
    rooms: [
      {
        name: "Cosy Single",
        beds: 1,
        guests: 1,
        price: 390,
        description: "Quiet room with sunset views and home-cooked breakfast every morning.",
        images: ["Assets/images/breathtaking-shot-colorful-houses-blue-sky.jpg", "Assets/images/listing.svg"]
      },
      {
        name: "Double Room",
        beds: 2,
        guests: 2,
        price: 580,
        description: "Comfortable double room with a private patio facing the western sunset.",
        images: ["Assets/images/breathtaking-shot-colorful-houses-blue-sky.jpg", "Assets/images/listing.svg"]
      },
      {
        name: "Family Room",
        beds: 3,
        guests: 5,
        price: 950,
        description: "Spacious family room with 3 beds, private parking and full breakfast for all.",
        images: ["Assets/images/breathtaking-shot-colorful-houses-blue-sky.jpg", "Assets/images/listing.svg"]
      }
    ]
  },
  {
    id: 4,
    name: "Kloofzicht Lodge",
    location: "North Carletonville",
    description: "Scenic lodge with mountain views. Perfect for nature lovers and photographers.",
    price: 520,
    image: "Assets/images/breathtaking-shot-colorful-houses-blue-sky.jpg",
    amenities: ["wifi", "breakfast", "parking"],
    phone: "+27118001004",
    maps: "https://maps.google.com/?q=Kloofzicht+Lodge+Carletonville",
    gallery: [
      "Assets/images/breathtaking-shot-colorful-houses-blue-sky.jpg",
      "Assets/images/listing.svg",
      "Assets/images/listing.svg",
      "Assets/images/listing.svg"
    ],
    rooms: [
      {
        name: "Mountain View Single",
        beds: 1,
        guests: 1,
        price: 520,
        description: "Single room with floor-to-ceiling windows showcasing the mountain landscape.",
        images: ["Assets/images/breathtaking-shot-colorful-houses-blue-sky.jpg", "Assets/images/listing.svg"]
      },
      {
        name: "Deluxe Double",
        beds: 2,
        guests: 2,
        price: 780,
        description: "King bed, fireplace, and private mountain-view deck.",
        images: ["Assets/images/breathtaking-shot-colorful-houses-blue-sky.jpg", "Assets/images/listing.svg"]
      },
      {
        name: "Lodge Suite",
        beds: 4,
        guests: 4,
        price: 1200,
        description: "Full suite with 4 beds, equipped kitchen, and wraparound mountain views.",
        images: ["Assets/images/breathtaking-shot-colorful-houses-blue-sky.jpg", "Assets/images/listing.svg"]
      }
    ]
  },
  {
    id: 5,
    name: "Golden Gate B&B",
    location: "East Carletonville",
    description: "Warm hospitality and homemade meals. Feel at home with our friendly hosts.",
    price: 290,
    image: "Assets/images/breathtaking-shot-colorful-houses-blue-sky.jpg",
    amenities: ["breakfast"],
    phone: "+27118001005",
    maps: "https://maps.google.com/?q=Golden+Gate+BB+Carletonville",
    gallery: [
      "Assets/images/breathtaking-shot-colorful-houses-blue-sky.jpg",
      "Assets/images/listing.svg",
      "Assets/images/listing.svg",
      "Assets/images/listing.svg"
    ],
    rooms: [
      {
        name: "Budget Single",
        beds: 1,
        guests: 1,
        price: 290,
        description: "Affordable homely single room with homemade breakfast included.",
        images: ["Assets/images/breathtaking-shot-colorful-houses-blue-sky.jpg", "Assets/images/listing.svg"]
      },
      {
        name: "Couple's Room",
        beds: 2,
        guests: 2,
        price: 450,
        description: "Romantic double room with private sitting area and garden access.",
        images: ["Assets/images/breathtaking-shot-colorful-houses-blue-sky.jpg", "Assets/images/listing.svg"]
      }
    ]
  },
  {
    id: 6,
    name: "Willow Creek Inn",
    location: "South Carletonville",
    description: "Peaceful retreat near the nature reserve. Enjoy bird watching and nature walks.",
    price: 610,
    image: "Assets/images/breathtaking-shot-colorful-houses-blue-sky.jpg",
    amenities: ["wifi", "parking"],
    phone: "+27118001006",
    maps: "https://maps.google.com/?q=Willow+Creek+Inn+Carletonville",
    gallery: [
      "Assets/images/breathtaking-shot-colorful-houses-blue-sky.jpg",
      "Assets/images/listing.svg",
      "Assets/images/listing.svg",
      "Assets/images/listing.svg"
    ],
    rooms: [
      {
        name: "Creek View Single",
        beds: 1,
        guests: 1,
        price: 610,
        description: "Tranquil single room overlooking the creek. Perfect for birdwatchers.",
        images: ["Assets/images/breathtaking-shot-colorful-houses-blue-sky.jpg", "Assets/images/listing.svg"]
      },
      {
        name: "Nature Double",
        beds: 2,
        guests: 2,
        price: 850,
        description: "Double room with private nature trail access and outdoor shower.",
        images: ["Assets/images/breathtaking-shot-colorful-houses-blue-sky.jpg", "Assets/images/listing.svg"]
      },
      {
        name: "Family Cabin",
        beds: 3,
        guests: 6,
        price: 1400,
        description: "Full cabin for families with 3 bedrooms, braai area and direct reserve access.",
        images: ["Assets/images/breathtaking-shot-colorful-houses-blue-sky.jpg", "Assets/images/listing.svg"]
      }
    ]
  }
];