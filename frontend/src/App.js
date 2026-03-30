import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import './App.css';

import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import { AuthProvider } from './Context/AuthContext';
import { CartProvider } from './Context/CartContext';
import { WishlistProvider } from './Context/WishlistContext'; 
import { useAuth } from './Hooks/useAuth';

// Buyer Pages
import Home from './Pages/Buyer/Home';
import ProductList from './Pages/Buyer/ProductList';
import ProductDetail from './Pages/Buyer/ProductDetail';
import Cart from './Pages/Buyer/Cart';
import Checkout from './Pages/Buyer/Checkout'; 
import OrderHistory from './Pages/Buyer/OrderHistory';
import Success from './Pages/Buyer/Success';
import Wishlist from './Pages/Buyer/Wishlist'; 
// Seller Pages
import SellerDashboard from './Pages/Seller/SellerDashboard';
import BecomeSeller from './Pages/Seller/BecomeSeller';
import AddListing from './Pages/Seller/AddListing';

// Auth Pages
import Login from './Pages/Auth/Login';
import Register from './Pages/Auth/Register';
import Profile from './Pages/Auth/Profile';

// Admin Pages
import AdminDashboard from './Pages/Admin/AdminDashboard';

// 🛡️ Authentication Wrapper Component
const RequireAuth = ({ children, roles = [] }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (roles.length > 0 && !roles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

function AppContent() {
  const { user } = useAuth();
  const location = useLocation();
  const hideLayout = ['/login', '/register'].includes(location.pathname);
  return (
    <div className="flex flex-col min-h-screen">
      {!hideLayout && <Navbar />}
      
      <main className="flex-grow">
        <Routes>
          {/* --- Public Routes --- */}
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
          <Route path="/register" element={user ? <Navigate to="/" /> : <Register />} />

          {/* --- Buyer Protected Routes --- */}
          <Route path="/profile" element={<RequireAuth><Profile /></RequireAuth>} />
          <Route path="/cart" element={<RequireAuth><Cart /></RequireAuth>} />
          <Route path="/wishlist" element={<RequireAuth><Wishlist /></RequireAuth>} /> 
          <Route path="/checkout" element={<RequireAuth><Checkout /></RequireAuth>} />
          <Route path="/success" element={<RequireAuth><Success /></RequireAuth>} />
          <Route path="/orders" element={<RequireAuth><OrderHistory /></RequireAuth>} />
          
          {/* --- Seller Protected Routes --- */}
          <Route path="/seller/become-seller" element={<RequireAuth><BecomeSeller /></RequireAuth>} />
          <Route path="/seller/add-listing" element={
            <RequireAuth roles={['SELLER', 'ADMIN']}>
              <AddListing />
            </RequireAuth>
          } />
          <Route path="/seller/dashboard" element={
            <RequireAuth roles={['SELLER', 'ADMIN']}>
              <SellerDashboard />
            </RequireAuth>
          } />
          
          {/* --- Admin Protected Routes --- */}
          <Route path="/admin/dashboard" element={
            <RequireAuth roles={['ADMIN']}>
              <AdminDashboard />
            </RequireAuth>
          } />

          {/* 404 Redirect */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>

      {!hideLayout && <Footer />}
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <WishlistProvider> 
        <CartProvider>
          <Router>
            <AppContent />
          </Router>
        </CartProvider>
      </WishlistProvider>
    </AuthProvider>
  );
}

export default App;