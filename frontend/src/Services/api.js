// Mock API service layer using mockData
import { mockUsers, mockProducts, mockBuyerOrders, mockSellerListings, mockSellerRequests, mockPlatformStats, mockDisputes } from '../Utils/mockData';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const api = {
  // Auth
  login: async (email, password) => {
    await delay(500);
    const user = mockUsers.find(u => u.email === email && u.password === password);
    return user ? { success: true, user } : { success: false };
  },

  // Products
  getProducts: async (filters = {}) => {
    await delay(300);
    return mockProducts.filter(p => {
      if (filters.type && p.type !== filters.type) return false;
      if (filters.category && p.category !== filters.category) return false;
      if (filters.search) {
        const search = filters.search.toLowerCase();
        return p.title.toLowerCase().includes(search) || p.category.toLowerCase().includes(search);
      }
      return true;
    });
  },

  getProduct: async (id) => {
    await delay(200);
    return mockProducts.find(p => p.id === parseInt(id));
  },

  // Cart (buyer)
  syncCart: async (cartItems, userId) => {
    await delay(400);
    return { success: true, syncedItems: cartItems };
  },

  placeBid: async (productId, bidAmount, userId) => {
    await delay(600);
    return { success: true, newCurrentBid: bidAmount };
  },

  placeOrder: async (cartItems, userId) => {
    await delay(800);
    return { success: true, orderId: Date.now() };
  },

  // Seller
  createListing: async (listingData, sellerId) => {
    await delay(1000);
    return { success: true, listingId: mockProducts.length + 1 };
  },

  getSellerListings: async (sellerId) => mockSellerListings.filter(l => l.sellerId === sellerId),

  updateListing: async (id, updates) => ({ success: true }),

  // Admin
  getSellerRequests: async () => mockSellerRequests,

  approveSeller: async (userId) => ({ success: true }),

  getPlatformStats: async () => mockPlatformStats,

  getDisputes: async () => mockDisputes,

  resolveDispute: async (id, resolution) => ({ success: true })
};