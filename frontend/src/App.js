import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import './App.css';

import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import { AuthProvider } from './Context/AuthContext';
import { CartProvider } from './Context/CartContext';
import { useAuth } from './Hooks/useAuth';

// Buyer Pages
import Home from './Pages/Buyer/Home';
import ProductList from './Pages/Buyer/ProductList';
import ProductDetail from './Pages/Buyer/ProductDetail';
import Cart from './Pages/Buyer/Cart';
import OrderHistory from './Pages/Buyer/OrderHistory';

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

function AppContent() {
  const { user, loading } = useAuth();
  const location = useLocation();

  // Hide Navbar and Footer on Auth Pages
  const hideLayout = ['/login', '/register'].includes(location.pathname);

  const RequireAuth = ({ children, roles = [] }) => {
    if (loading) return null;
    if(!user) return <Navigate to="/login" />;
    if (roles.length && !roles.includes(user.role)) return <Navigate to="/" />;
    return children;
  }

  return (
    <div className="flex flex-col min-h-screen">
      {!hideLayout && <Navbar />}
      <main className="flex-grow">
        <Routes>
          {/* Public */}
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Buyer */}
          <Route path="/profile" element={<RequireAuth><Profile /></RequireAuth>} />
          <Route path="/cart" element={<RequireAuth><Cart /></RequireAuth>} />
          <Route path="/orders" element={<RequireAuth><OrderHistory /></RequireAuth>} />
          
          {/* Seller */}
          <Route path="/seller/become-seller" element={<RequireAuth><BecomeSeller /></RequireAuth>} />
          <Route path="/seller/add-listing" element={<RequireAuth roles={['SELLER', 'ADMIN']}><AddListing /></RequireAuth>} />
          <Route path="/seller/dashboard" element={<RequireAuth roles={['SELLER', 'ADMIN']}><SellerDashboard /></RequireAuth>} />
          
          {/* Admin */}
          <Route path="/admin/dashboard" element={<RequireAuth roles={['ADMIN']}><AdminDashboard /></RequireAuth>} />

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
      <CartProvider>
        <Router>
          <AppContent />
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;