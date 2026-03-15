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
  { id: 1, title: "Sony WH-1000XM4 Headphones", sellerId: 2, category: "Electronics", type: "FIXED", price: 45000, stock: 12, img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400", description: "Noise cancelling pro", status: "ACTIVE" },
  { id: 2, title: "Omega Mechanical Watch", sellerId: 2, category: "Accessories", type: "AUCTION", startPrice: 5000, reserve: 20000, currentBid: 24500, bids: 18, endTime: "2024-12-15T18:00:00Z", img: "https://images.unsplash.com/photo-1524592094714-0f25c5025c32?w=400", status: "ACTIVE" },
  { id: 3, title: "Nike Air Pegasus 38", sellerId: 4, category: "Footwear", type: "FIXED", price: 18000, stock: 5, img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400", status: "ACTIVE" },
  { id: 4, title: "Ergonomic Office Chair", sellerId: 2, category: "Furniture", type: "AUCTION", currentBid: 35000, bids: 42, endTime: "2024-12-10T12:00:00Z", img: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400", status: "ENDED", winnerId: 1 },
  // Add 16 more for demo...
  { id: 5, title: "iPhone 15 Pro Max", type: "FIXED", price: 250000, stock: 3 },
  { id: 6, title: "Gaming Laptop RTX 4080", type: "AUCTION", currentBid: 320000 },
  // ... truncated for brevity, full 20+ in actual
];

// Buyer carts, orders
export const mockCartItems = [{ productId: 1, quantity: 2 }];
export const mockBuyerOrders = [{ id: 1, productId: 1, status: "DELIVERED", total: 90000 }];
export const mockBidHistory = [{ productId: 2, bidAmount: 24000, status: "LOST" }];

// Seller listings, sales
export const mockSellerListings = [{ productId: 1, sellerId: 2 }];
export const mockSellerSales = [{ orderId: 1, revenue: 90000 }];
export const mockSellerBids = [{ productId: 2, bidderId: 1, amount: 24500 }];

// Admin data
export const mockSellerRequests = [{ userId: 4, status: "PENDING" }];
export const mockDisputes = [{ id: 1, type: "REJECTED_ORDER", status: "OPEN" }];
export const mockPlatformStats = { totalUsers: 1240, totalRevenue: 5000000, activeAuctions: 58 };