// Mock API service layer using mockData
import { 
  mockUsers, 
  mockProducts, 
  mockSellerRequests, 
  mockPlatformStats, 
  mockDisputes 
} from '../Utils/mockData';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const api = {
  login: async (email, password) => {
    await delay(500);
    const user = mockUsers.find(u => u.email === email && u.password === password);
    return user ? { success: true, user } : { success: false };
  },

  getProducts: async (filters = {}) => {
    await delay(300);
    let filtered = [...mockProducts];

    if (filters.category && filters.category !== 'All') {
      filtered = filtered.filter(p => 
        p.category.toLowerCase() === filters.category.toLowerCase()
      );
    }

    if (filters.type && filters.type !== 'All') {
      filtered = filtered.filter(p => p.type === filters.type);
    }

    if (filters.search) {
      const searchStr = filters.search.toLowerCase().trim();
      filtered = filtered.filter(p => 
        p.title.toLowerCase().includes(searchStr) || 
        p.category.toLowerCase().includes(searchStr) ||
        (p.brand && p.brand.toLowerCase().includes(searchStr))
      );
    }
    return filtered;
  },

  getProduct: async (id) => {
    await delay(200);
    return mockProducts.find(p => p.id === parseInt(id));
  },

  syncCart: async (cartItems, userId) => {
    await delay(400);
    return { success: true, syncedItems: cartItems };
  },

   placeBid: async (productId, bidAmount, userId) => {
    await delay(600);
    console.log(`Bid Placed: User ${userId} on Product ${productId} for LKR ${bidAmount}`);
    return { success: true, newCurrentBid: bidAmount };
  },

  placeOrder: async (orderData) => {
    await delay(1200);
    console.log("Processing Order Data:", orderData);
    return { 
      success: true, 
      orderId: `ORD-${Date.now().toString().slice(-6)}`,
      message: "Order placed successfully!" 
    };
  },

  createListing: async (listingData, sellerId) => {
    await delay(1000);
    return { success: true, listingId: mockProducts.length + 1 };
  },
  getSellerListings: async (sellerId) => {
    await delay(300);
    return mockProducts.filter(p => p.sellerId === sellerId);
  },
  updateListing: async (id, updates) => {
    await delay(300);
    return { success: true };
  },
  getSellerRequests: async () => {
    await delay(400);
    return mockSellerRequests;
  },
  approveSeller: async (userId) => {
    await delay(400);
    return { success: true };
  },
  getPlatformStats: async () => {
    await delay(400);
    return mockPlatformStats;
  },
  getDisputes: async () => {
    await delay(400);
    return mockDisputes;
  },
  resolveDispute: async (id, resolution) => {
    await delay(400);
    return { success: true };
  }
};