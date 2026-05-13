const BASE_URL = 'http://localhost:8080/api';

const handleResponse = async (request, defaultValue = null) => {
  try {
    const response = await request;
    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Something went wrong' }));
      throw new Error(error.message || 'API request failed');
    }
    return await response.json();
  } catch (error) {
    console.error("API call failed:", error);
    return defaultValue; 
  }
};

export const api = {
  login: async (email, password) => {
    try {
      const data = await handleResponse(fetch(`${BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      }));
      return data || { success: false, error: 'Connection failed' };
    } catch (err) {
      return { success: false, error: err.message };
    }
  },

  register: async (payload) => {
    try {
      const data = await handleResponse(fetch(`${BASE_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      }));
      return data || { success: false, error: 'Connection failed' };
    } catch (err) {
      return { success: false, error: err.message };
    }
  },

  getProducts: async (filters = {}) => {
    const query = new URLSearchParams(filters).toString();
    return await handleResponse(fetch(`${BASE_URL}/products?${query}`), []) || [];
  },

  getProduct: async (id) => {
    return await handleResponse(fetch(`${BASE_URL}/products/${id}`), null);
  },

  placeBid: async (productId, bidAmount, userId) => {
    return await handleResponse(fetch(`${BASE_URL}/products/${productId}/bid`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ bidAmount, userId })
    }), { success: false, error: 'Connection failed' });
  },

  createListing: async (listingData, sellerId) => {
    return await handleResponse(fetch(`${BASE_URL}/products`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...listingData, sellerId })
    }), { success: false, error: 'Connection failed' });
  },

  getSellerListings: async (sellerId) => {
    return await handleResponse(fetch(`${BASE_URL}/products/seller/${sellerId}`), []) || [];
  },

  deleteListing: async (id) => {
    return await handleResponse(fetch(`${BASE_URL}/products/${id}`, { method: 'DELETE' }), { success: false });
  },

  endAuctionEarly: async (id) => {
    return await handleResponse(fetch(`${BASE_URL}/products/${id}/end-auction`, { method: 'POST' }), { success: false });
  },

  getSellerSales: async (sellerId) => {
    return await handleResponse(fetch(`${BASE_URL}/orders/sales/seller/${sellerId}`), []) || [];
  },

  getSellerBids: async (sellerId) => {
    return await handleResponse(fetch(`${BASE_URL}/bids/seller/${sellerId}`), []) || [];
  },

  updateListing: async (id, updates) => {
    return await handleResponse(fetch(`${BASE_URL}/products/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates)
    }), { success: false });
  },

  getSellerOrders: async (sellerId) => {
    return await handleResponse(fetch(`${BASE_URL}/orders/seller/${sellerId}`), []) || [];
  },

  updateSellerOrder: async (orderId, updates) => {
    return await handleResponse(fetch(`${BASE_URL}/orders/${orderId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates)
    }), { success: false });
  },

  getSellerRequests: async () => {
    return await handleResponse(fetch(`${BASE_URL}/admin/seller-requests`), []) || [];
  },

  approveSeller: async (userId) => {
    return await handleResponse(fetch(`${BASE_URL}/admin/approve-seller/${userId}`, { method: 'POST' }), { success: false });
  },

  denySeller: async (userId) => {
    return await handleResponse(fetch(`${BASE_URL}/admin/deny-seller/${userId}`, { method: 'POST' }), { success: false });
  },

  updateProfile: async (userId, updates) => {
    return await handleResponse(fetch(`${BASE_URL}/users/${userId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates)
    }), { success: false });
  },

  getPlatformStats: async () => {
    return await handleResponse(fetch(`${BASE_URL}/admin/stats`), {}) || {};
  },

  getDisputes: async () => {
    return await handleResponse(fetch(`${BASE_URL}/admin/disputes`), []) || [];
  },

  resolveDispute: async (id, resolution) => {
    return await handleResponse(fetch(`${BASE_URL}/admin/disputes/${id}/resolve`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ resolution })
    }), { success: false });
  },

  syncCart: async (cartItems, userId) => {
    return { success: true, syncedItems: cartItems }; 
  },

  placeOrder: async (orderData) => {
    return await handleResponse(fetch(`${BASE_URL}/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderData)
    }), { success: false });
  },

  getBuyerOrders: async (userId) => {
    return await handleResponse(fetch(`${BASE_URL}/orders/buyer/${userId}`), []) || [];
  }
};
