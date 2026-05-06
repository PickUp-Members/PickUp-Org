const productsData = [
  // --- ELECTRONICS (5 Products) ---
  {
    id: "e1",
    title: "Sony WH-1000XM4 Headphones", // Basic fields
    description: "Industry-leading noise canceling wireless headphones",
    category: "Electronics",
    type: "FIXED", // ProductType.FIXED
    price: 34500.0,
    stock: 12,
    images: ["https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500"], //images[0]
    status: "ACTIVE"
  },
  {
    id: "e2",
    title: "Vintage Film Camera - Canon AE-1",
    description: "Authentic 1970s film camera, perfect for enthusiasts.",
    category: "Electronics",
    type: "AUCTION", // ProductType.AUCTION
    startPrice: 15000.0,
    currentBid: 18500.0, // Auction specific
    endTime: "2026-05-15T20:00:00",
    images: ["https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500"],
    status: "ACTIVE"
  },
  {
    id: "e3",
    title: "4K Ultra HD Monitor - 27\"",
    description: "144Hz refresh rate, IPS panel for stunning colors.",
    category: "Electronics",
    type: "RETAIL",
    price: 55000.0,
    stock: 8,
    images: ["https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500"],
    status: "ACTIVE"
  },
  {
    id: "e4",
    title: "Retro Mechanical Watch (Fixing Image!)", //Missing image fixed here[cite: 2]
    description: "Automatic self-winding stainless steel mechanical watch.",
    category: "Electronics", // You classified this here originally
    type: "FIXED",
    price: 24500.0,
    stock: 2,
    // Add a real image URL for the watch to replace the broken one
    images: ["https://images.unsplash.com/photo-1619229666799-b1d5a71df542?w=500"], 
    status: "ACTIVE"
  },
  {
    id: "e5",
    title: "Smart Wi-Fi Router - AX3000",
    description: "Next-gen mesh Wi-Fi speed up to 3Gbps.",
    category: "Electronics",
    type: "FIXED",
    price: 18900.0,
    stock: 20,
    images: ["https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=500"],
    status: "ACTIVE"
  },

  // --- FASHION (5 Products) ---
  {
    id: "f1",
    title: "Classic Black Leather Jacket",
    description: "Handcrafted cowhide leather jacket, timeless style.",
    category: "Fashion",
    type: "FIXED",
    price: 12000.0,
    stock: 5,
    images: ["https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500"],
    status: "ACTIVE"
  },
  {
    id: "f2",
    title: "Nike Air Pegasus '38 Running Shoes",
    description: "Breathable mesh upper with Zoom Air cushioning.",
    category: "Fashion",
    type: "RETAIL",
    price: 18000.0,
    stock: 15,
    images: ["https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=500"],
    status: "ACTIVE"
  },
  {
    id: "f3",
    title: "Luxury Gold Plated Chronograph",
    description: "18k gold plated watch with sapphire crystal face.",
    category: "Fashion",
    type: "AUCTION",
    startPrice: 50000.0,
    currentBid: 62400.0,
    endTime: "2026-05-20T10:00:00",
    images: ["https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500"],
    status: "ACTIVE"
  },
  {
    id: "f4",
    title: "Slim Fit Indigo Jeans",
    description: "Stretch denim for comfort, sustainable cotton.",
    category: "Fashion",
    type: "FIXED",
    price: 6500.0,
    stock: 30,
    images: ["https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=500"],
    status: "ACTIVE"
  },
  {
    id: "f5",
    title: "Handmade Suede Tote Bag",
    description: "Spacious interior, genuine Italian suede.",
    category: "Fashion",
    type: "FIXED",
    price: 22000.0,
    stock: 7,
    images: ["https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=500"],
    status: "ACTIVE"
  },

  // --- HOME & LIVING (5 Products) ---
  {
    id: "h1",
    title: "Modern Velvet Armchair - Emerald",
    description: "Ergonomic design with soft velvet upholstery.",
    category: "Home & Living",
    type: "FIXED",
    price: 28500.0,
    stock: 3,
    images: ["https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=500"],
    status: "ACTIVE"
  },
  {
    id: "h2",
    title: "Minimalist Ceramic Vase",
    description: "Hand-thrown matte white ceramic vase.",
    category: "Home & Living",
    type: "FIXED",
    price: 4500.0,
    stock: 25,
    images: ["https://images.unsplash.com/photo-1533090161767-e6ffed986c88?w=500"],
    status: "ACTIVE"
  },
  {
    id: "h3",
    title: "Abstract Art Print - Golden Hour",
    description: "Large format framed abstract canvas art.",
    category: "Home & Living",
    type: "AUCTION",
    startPrice: 8000.0,
    currentBid: 11200.0,
    endTime: "2026-05-18T16:30:00",
    images: ["https://images.unsplash.com/photo-1549887552-cb1071d3e5ca?w=500"],
    status: "ACTIVE"
  },
  {
    id: "h4",
    title: "Weighted Blanket - 15 lbs",
    description: "Deep touch pressure therapy for better sleep.",
    category: "Home & Living",
    type: "FIXED",
    price: 15900.0,
    stock: 10,
    images: ["https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=500"],
    status: "ACTIVE"
  },
  {
    id: "h5",
    title: "Live Edge Walnut Coffee Table",
    description: "Handcrafted table with a unique natural edge.",
    category: "Home & Living",
    type: "FIXED",
    price: 75000.0,
    stock: 1,
    images: ["https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?w=500"],
    status: "ACTIVE"
  },

  // --- GAMING (5 Products) ---
  {
    id: "g1",
    title: "Mechanical RGB Gaming Keyboard",
    description: "Tactile mechanical switches, fully customizable lighting.",
    category: "Gaming",
    type: "AUCTION",
    startPrice: 5000.0,
    currentBid: 7500.0,
    endTime: "2026-05-21T21:00:00",
    images: ["https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=500"],
    status: "ACTIVE"
  },
  {
    id: "g2",
    title: "Precision Optical Gaming Mouse",
    description: "25k DPI optical sensor for competitive play.",
    category: "Gaming",
    type: "FIXED",
    price: 9500.0,
    stock: 18,
    images: ["https://images.unsplash.com/photo-1527814050087-3793815479db?w=500"],
    status: "ACTIVE"
  },
  {
    id: "g3",
    title: "Wireless Surround Sound Headset",
    description: "7.1 surround sound with low-latency connection.",
    category: "Gaming",
    type: "FIXED",
    price: 21000.0,
    stock: 9,
    images: ["https://images.unsplash.com/photo-1612480111162-4aa498e826b7?w=500"],
    status: "ACTIVE"
  },
  {
    id: "g4",
    title: "Ergonomic Gaming Chair - Pro Racer",
    description: "Adjustable 4D armrests, memory foam support.",
    category: "Gaming",
    type: "FIXED",
    price: 49000.0,
    stock: 4,
    images: ["https://images.unsplash.com/photo-1598520106830-8c45c2f33391?w=500"],
    status: "ACTIVE"
  },
  {
    id: "g5",
    title: "Portable Gaming Console - 512GB",
    description: "Handheld console with stunning OLED display.",
    category: "Gaming",
    type: "RETAIL",
    price: 98000.0,
    stock: 3,
    images: ["https://images.unsplash.com/photo-1612036781124-847f8939b154?w=500"],
    status: "ACTIVE"
  }
];

export default productsData;