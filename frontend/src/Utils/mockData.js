export const mockUsers = [
  {
    id: 1,
    fullName: "Yasas Lasitha",
    email: "yasas@pickup.lk",
    password: "123",
    role: "BUYER",
    sellerRequestStatus: "NONE",
    profilePic: "https://api.dicebear.com/7.x/avataaars/svg?seed=Yasas",
    addresses: ["University of Vavuniya, Vavuniya", "123 Main St, Colombo"],
    createdAt: "2026-01-20"
  },
  {
    id: 2,
    fullName: "Chamara Perera",
    email: "chamara@shop.lk",
    password: "123",
    role: "SELLER",
    sellerRequestStatus: "APPROVED",
    businessDetails: {
      name: "Chamara's Tech Hub",
      description: "Premium electronics and gaming gear in Negombo.",
      contact: "+94 77 123 4567"
    },
    profilePic: "https://api.dicebear.com/7.x/avataaars/svg?seed=Chamara",
    createdAt: "2026-02-15"
  },
  {
    id: 3,
    fullName: "Admin User",
    email: "admin@pickup.lk",
    password: "123",
    role: "ADMIN",
    profilePic: "https://api.dicebear.com/7.x/avataaars/svg?seed=Admin",
    createdAt: "2026-01-01"
  },
  {
    id: 4,
    fullName: "Saman Kumara",
    email: "saman@gmail.com",
    password: "123",
    role: "BUYER",
    sellerRequestStatus: "PENDING",
    businessDetails: {
      name: "Saman's Collectibles",
      description: "Selling rare vintage coins and watches.",
      contact: "+94 71 987 6543"
    },
    profilePic: "https://api.dicebear.com/7.x/avataaars/svg?seed=Saman",
    createdAt: "2026-01-20"
  }
];

// Products (fixed + auction)
export const mockProducts = [
  // ===== ELECTRONICS (5 products) =====
  { 
    id: 1, 
    title: "Sony WH-1000XM4 Headphones", 
    sellerId: 2, 
    category: "Electronics", 
    type: "FIXED", 
    price: 34300, 
    stock: 12, 
    img: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=400", 
    description: "Industry-leading noise canceling with Dual Noise Sensor technology", 
    status: "ACTIVE" 
  },
  { 
    id: 2, 
    title: "Vintage Film Camera - Canon AE-1", 
    sellerId: 2, 
    category: "Electronics", 
    type: "AUCTION", 
    startPrice: 8000, 
    reserve: 15000, 
    currentBid: 18500, 
    bids: 23, 
    endTime: "2026-12-20T15:00:00Z", 
    img: "https://images.unsplash.com/photo-1606728035253-49e8a23146de?w=400", 
    status: "ACTIVE",
    description: "Classic 35mm film camera in excellent working condition."
  },
  { 
    id: 3, 
    title: "Wireless Surround Sound System", 
    sellerId: 2, 
    category: "Electronics", 
    type: "FIXED", 
    price: 21000, 
    stock: 8, 
    img: "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=400", 
    description: "5.1 channel wireless home theater system with deep bass",
    status: "ACTIVE" 
  },
  { 
    id: 4, 
    title: "4K Action Camera", 
    sellerId: 2, 
    category: "Electronics", 
    type: "FIXED", 
    price: 15500, 
    stock: 15, 
    img: "https://images.unsplash.com/photo-1523044008490-7ab8e2aa85be?w=400", 
    description: "Waterproof 4K action camera with image stabilization",
    status: "ACTIVE" 
  },
  { 
    id: 5, 
    title: "Smart Wireless Earbuds Pro", 
    sellerId: 2, 
    category: "Electronics", 
    type: "FIXED", 
    price: 12800, 
    stock: 25, 
    img: "https://images.unsplash.com/photo-1606841837239-c5a1a4a07af7?w=400", 
    description: "Active noise cancellation with 24-hour battery life",
    status: "ACTIVE" 
  },

  // ===== FASHION (5 products) =====
  { 
    id: 6, 
    title: "Premium Leather Jacket", 
    sellerId: 4, 
    category: "Fashion", 
    type: "FIXED", 
    price: 28500, 
    stock: 6, 
    img: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400", 
    description: "Genuine leather motorcycle jacket with vintage style",
    status: "ACTIVE" 
  },
  { 
    id: 7, 
    title: "Designer Denim Jacket", 
    sellerId: 4, 
    category: "Fashion", 
    type: "AUCTION", 
    startPrice: 6000, 
    reserve: 12000, 
    currentBid: 14500, 
    bids: 15, 
    endTime: "2026-12-18T20:00:00Z", 
    img: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=400", 
    status: "ACTIVE",
    description: "Limited edition denim jacket with custom embroidery"
  },
  { 
    id: 8, 
    title: "Casual Summer Dress", 
    sellerId: 4, 
    category: "Fashion", 
    type: "FIXED", 
    price: 9500, 
    stock: 18, 
    img: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400", 
    description: "Lightweight cotton dress perfect for tropical weather",
    status: "ACTIVE" 
  },
  { 
    id: 9, 
    title: "Men's Business Suit - Navy", 
    sellerId: 4, 
    category: "Fashion", 
    type: "FIXED", 
    price: 45000, 
    stock: 4, 
    img: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400", 
    description: "Tailored navy suit with modern slim fit",
    status: "ACTIVE" 
  },
  { 
    id: 10, 
    title: "Vintage Band T-Shirt Collection", 
    sellerId: 4, 
    category: "Fashion", 
    type: "AUCTION", 
    startPrice: 3000, 
    reserve: 8000, 
    currentBid: 9200, 
    bids: 28, 
    endTime: "2026-12-16T18:00:00Z", 
    img: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400", 
    status: "ACTIVE",
    description: "Collection of 5 rare vintage rock band t-shirts"
  },

  // ===== HOME & LIVING (10 products) =====
  { 
    id: 11, 
    title: "Ergonomic Office Chair", 
    sellerId: 2, 
    category: "Home & Living", 
    type: "AUCTION", 
    startPrice: 25000,
    reserve: 40000,
    currentBid: 49000, 
    bids: 42, 
    endTime: "2026-12-25T12:00:00Z", 
    img: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400", 
    status: "ACTIVE",
    description: "High-back mesh chair with adjustable armrests and lumbar support"
  },
  { 
    id: 12, 
    title: "Modern Coffee Table Set", 
    sellerId: 2, 
    category: "Home & Living", 
    type: "FIXED", 
    price: 32000, 
    stock: 5, 
    img: "https://images.unsplash.com/photo-1551298370-9d3d53740c72?w=400", 
    description: "Scandinavian style coffee table with storage",
    status: "ACTIVE" 
  },
  { 
    id: 13, 
    title: "Ceramic Dinnerware Set - 24 Pieces", 
    sellerId: 2, 
    category: "Home & Living", 
    type: "FIXED", 
    price: 16500, 
    stock: 10, 
    img: "https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=400", 
    description: "Complete dinnerware set for 6 people, microwave safe",
    status: "ACTIVE" 
  },
  { 
    id: 14, 
    title: "Luxury Bed Sheet Set - Egyptian Cotton", 
    sellerId: 2, 
    category: "Home & Living", 
    type: "FIXED", 
    price: 12400, 
    stock: 20, 
    img: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400", 
    description: "1000 thread count Egyptian cotton sheets, king size",
    status: "ACTIVE" 
  },
  { 
    id: 15, 
    title: "Designer Table Lamp Collection", 
    sellerId: 2, 
    category: "Home & Living", 
    type: "AUCTION", 
    startPrice: 8000, 
    reserve: 18000, 
    currentBid: 22500, 
    bids: 19, 
    endTime: "2026-12-22T16:00:00Z", 
    img: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400", 
    status: "ACTIVE",
    description: "Set of 3 modern designer lamps with adjustable brightness"
  },
  { 
    id: 31, 
    title: "Stainless Steel Kitchen Cookware Set", 
    sellerId: 2, 
    category: "Home & Living", 
    type: "FIXED", 
    price: 28500, 
    stock: 8, 
    img: "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=400", 
    description: "12-piece professional cookware set with non-stick coating",
    status: "ACTIVE" 
  },
  { 
    id: 32, 
    title: "Decorative Wall Art Canvas Set", 
    sellerId: 2, 
    category: "Home & Living", 
    type: "FIXED", 
    price: 15800, 
    stock: 15, 
    img: "https://images.unsplash.com/photo-1513519245088-0e12902e35ca?w=400", 
    description: "3-panel abstract canvas wall art for living room",
    status: "ACTIVE" 
  },
  { 
    id: 33, 
    title: "Velvet Throw Pillows Set of 4", 
    sellerId: 2, 
    category: "Home & Living", 
    type: "FIXED", 
    price: 8200, 
    stock: 25, 
    img: "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=400", 
    description: "Luxury velvet cushion covers in assorted colors",
    status: "ACTIVE" 
  },
  { 
    id: 34, 
    title: "Bamboo Bathroom Storage Organizer", 
    sellerId: 2, 
    category: "Home & Living", 
    type: "FIXED", 
    price: 11400, 
    stock: 12, 
    img: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400", 
    description: "3-tier bamboo storage shelf for bathroom essentials",
    status: "ACTIVE" 
  },
  { 
    id: 35, 
    title: "Smart LED Floor Lamp - RGB", 
    sellerId: 2, 
    category: "Home & Living", 
    type: "FIXED", 
    price: 19800, 
    stock: 10, 
    img: "https://images.unsplash.com/photo-1550581190-9c1c48d21d6c?w=400", 
    description: "App-controlled RGB floor lamp with 16 million colors",
    status: "ACTIVE" 
  },

  // ===== GAMING (5 products) =====
  { 
    id: 16, 
    title: "Portable Gaming Console - Switch Style", 
    sellerId: 2, 
    category: "Gaming", 
    type: "FIXED", 
    price: 98000, 
    stock: 7, 
    img: "https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?w=400", 
    description: "Hybrid gaming console with detachable controllers",
    status: "ACTIVE" 
  },
  { 
    id: 17, 
    title: "RGB Mechanical Gaming Keyboard", 
    sellerId: 2, 
    category: "Gaming", 
    type: "FIXED", 
    price: 18500, 
    stock: 15, 
    img: "https://images.unsplash.com/photo-1595225476474-87563907a212?w=400", 
    description: "Cherry MX switches with customizable RGB backlighting",
    status: "ACTIVE" 
  },
  { 
    id: 18, 
    title: "Pro Gaming Mouse - Wireless", 
    sellerId: 2, 
    category: "Gaming", 
    type: "AUCTION", 
    startPrice: 8000, 
    reserve: 15000, 
    currentBid: 17800, 
    bids: 31, 
    endTime: "2026-12-19T14:00:00Z", 
    img: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400", 
    status: "ACTIVE",
    description: "Ultra-lightweight wireless gaming mouse with 20K DPI"
  },
  { 
    id: 19, 
    title: "Racing Wheel & Pedals Set", 
    sellerId: 2, 
    category: "Gaming", 
    type: "FIXED", 
    price: 54000, 
    stock: 4, 
    img: "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=400", 
    description: "Force feedback steering wheel with realistic pedal set",
    status: "ACTIVE" 
  },
  { 
    id: 20, 
    title: "Ergonomic Gaming Chair - Racing Style", 
    sellerId: 2, 
    category: "Gaming", 
    type: "FIXED", 
    price: 49000, 
    stock: 9, 
    img: "https://images.unsplash.com/photo-1598550476439-6847785fcea6?w=400", 
    description: "Racing-style gaming chair with lumbar support and adjustable armrests",
    status: "ACTIVE" 
  },

  // ===== ACCESSORIES (5 products) =====
  { 
    id: 21, 
    title: "Omega Mechanical Watch", 
    sellerId: 2, 
    category: "Accessories", 
    type: "AUCTION", 
    startPrice: 5000, 
    reserve: 20000, 
    currentBid: 24500, 
    bids: 18, 
    endTime: "2026-12-15T18:00:00Z", 
    img: "https://images.unsplash.com/photo-1524592094714-0f25c5025c32?w=400", 
    status: "ACTIVE",
    description: "Vintage Omega Seamaster in excellent condition"
  },
  { 
    id: 22, 
    title: "Designer Sunglasses - Polarized", 
    sellerId: 4, 
    category: "Accessories", 
    type: "FIXED", 
    price: 14500, 
    stock: 12, 
    img: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400", 
    description: "UV400 protection polarized sunglasses with metal frame",
    status: "ACTIVE" 
  },
  { 
    id: 23, 
    title: "Genuine Leather Wallet - Bifold", 
    sellerId: 4, 
    category: "Accessories", 
    type: "FIXED", 
    price: 6800, 
    stock: 30, 
    img: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=400", 
    description: "Handcrafted leather wallet with RFID protection",
    status: "ACTIVE" 
  },
  { 
    id: 24, 
    title: "Smart Fitness Tracker Watch", 
    sellerId: 2, 
    category: "Accessories", 
    type: "FIXED", 
    price: 19500, 
    stock: 18, 
    img: "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=400", 
    description: "Heart rate monitor, sleep tracker, and 10-day battery life",
    status: "ACTIVE" 
  },
  { 
    id: 25, 
    title: "Luxury Leather Handbag", 
    sellerId: 4, 
    category: "Accessories", 
    type: "AUCTION", 
    startPrice: 15000, 
    reserve: 35000, 
    currentBid: 38000, 
    bids: 45, 
    endTime: "2026-12-21T17:00:00Z", 
    img: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400", 
    status: "ACTIVE",
    description: "Designer leather handbag with adjustable strap"
  },

  // ===== FOOTWEAR (5 products) =====
  { 
    id: 26, 
    title: "Nike Air Pegasus 38", 
    sellerId: 4, 
    category: "Footwear", 
    type: "FIXED", 
    price: 18000, 
    stock: 5, 
    img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400", 
    status: "ACTIVE",
    description: "Responsive training shoe for everyday runners"
  },
  { 
    id: 27, 
    title: "Classic Leather Boots - Brown", 
    sellerId: 4, 
    category: "Footwear", 
    type: "FIXED", 
    price: 24500, 
    stock: 8, 
    img: "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=400", 
    description: "Waterproof leather boots with durable rubber sole",
    status: "ACTIVE" 
  },
  { 
    id: 28, 
    title: "Women's High Heels - Black", 
    sellerId: 4, 
    category: "Footwear", 
    type: "FIXED", 
    price: 16500, 
    stock: 14, 
    img: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400", 
    description: "Elegant 4-inch heels perfect for formal occasions",
    status: "ACTIVE" 
  },
  { 
    id: 29, 
    title: "Limited Edition Basketball Sneakers", 
    sellerId: 4, 
    category: "Footwear", 
    type: "AUCTION", 
    startPrice: 12000, 
    reserve: 25000, 
    currentBid: 35000, 
    bids: 67, 
    endTime: "2026-12-17T19:00:00Z", 
    img: "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=400", 
    status: "ACTIVE",
    description: "Rare limited edition basketball shoes - collector's item"
  },
  { 
    id: 30, 
    title: "Canvas Casual Sneakers - White", 
    sellerId: 4, 
    category: "Footwear", 
    type: "FIXED", 
    price: 8900, 
    stock: 25, 
    img: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=400", 
    description: "Comfortable everyday sneakers with breathable fabric",
    status: "ACTIVE" 
  }
];

// Buyer carts, orders
export const mockCartItems = [{ productId: 1, quantity: 2 }];
export const mockBuyerOrders = [
  { 
    id: 1, 
    productId: 1, 
    productTitle: "Sony WH-1000XM4 Headphones",
    status: "DELIVERED", 
    total: 34300, 
    date: "2026-03-01",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400"
  },
  { 
    id: 2, 
    productId: 21, 
    productTitle: "Omega Mechanical Watch",
    status: "PENDING", 
    total: 24500, 
    date: "2026-05-05",
    image: "https://images.unsplash.com/photo-1524592094714-0f25c5025c32?w=400"
  },
  { 
    id: 3, 
    productId: 26, 
    productTitle: "Nike Air Pegasus 38",
    status: "DELIVERED", 
    total: 18000, 
    date: "2026-04-15",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400"
  },
  { 
    id: 4, 
    productId: 16, 
    productTitle: "Portable Gaming Console",
    status: "CANCELLED", 
    total: 98000, 
    date: "2026-02-20",
    image: "https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?w=400"
  }
];
export const mockBidHistory = [
  { productId: 2, bidAmount: 18500, status: "ACTIVE" },
  { productId: 21, bidAmount: 24000, status: "WON" },
  { productId: 18, bidAmount: 16500, status: "LOST" }
];

// Seller listings, sales
export const mockSellerListings = [{ productId: 1, sellerId: 2, status: "ACTIVE" }];
export const mockSellerSales = [{ orderId: 1, revenue: 90000, productId: 1 }];
export const mockSellerBids = [{ productId: 2, bidderId: 1, amount: 24500 }];

// Admin data - CRITICAL FIX FOR YOUR ERROR
export const mockSellerRequests = [
  { 
    userId: 4, 
    name: "Saman Kumara", 
    email: "saman@gmail.com", 
    businessName: "Saman's Collectibles", 
    appliedDate: "2026-03-10",
    status: "PENDING" 
  }
];

export const mockDisputes = [
  { 
    id: 1, 
    title: "Item Not as Described", 
    description: "Buyer claims the headphones have a scratch on the left cup.", 
    orderId: "OO123", 
    type: "REJECTED_ORDER", 
    status: "OPEN" 
  }
];

export const mockPlatformStats = { 
  totalUsers: 1240, 
  totalRevenue: 5000000, 
  activeAuctions: 58 
};