import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import './App.css';

import Navbar from './Components/Navbar';
import Footer from './Components/Footer';

import { CartProvider } from './Context/CartContext';
import { WishlistProvider } from './Context/WishlistContext'; 
import { RecentlyViewedProvider } from './Context/RecentlyViewedContext';

import Home from './Pages/Buyer/Home';
import ProductList from './Pages/Buyer/ProductList';
import ProductDetail from './Pages/Buyer/ProductDetail';
import Cart from './Pages/Buyer/Cart';
import Checkout from './Pages/Buyer/Checkout'; 
import OrderHistory from './Pages/Buyer/OrderHistory';
import Success from './Pages/Buyer/Success';
import Wishlist from './Pages/Buyer/Wishlist'; 

import SellerDashboard from './Pages/Seller/SellerDashboard';
import BecomeSeller from './Pages/Seller/BecomeSeller';
import AddListing from './Pages/Seller/AddListing';
import Login from './Pages/Auth/Login';
import Register from './Pages/Auth/Register';
import Profile from './Pages/Auth/Profile';
import AdminDashboard from './Pages/Admin/AdminDashboard';

function AppContent() {
  const location = useLocation();

  const hideLayout = ['/login', '/register'].includes(location.pathname);

  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="flex flex-col min-h-screen">

      {!hideLayout && <Navbar />}

      <main className="flex-grow">
        <Routes>

          {/* Public routes */}
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
          <Route path="/register" element={user ? <Navigate to="/" /> : <Register />} />

          {/* No protection (all accessible) */}
          <Route path="/profile" element={<Profile />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/success" element={<Success />} />
          <Route path="/orders" element={<OrderHistory />} />

          {/* Seller routes */}
          <Route path="/seller/become-seller" element={<BecomeSeller />} />
          <Route path="/seller/add-listing" element={<AddListing />} />
          <Route path="/seller/dashboard" element={<SellerDashboard />} />

          {/* Admin route */}
          <Route path="/admin/dashboard" element={<AdminDashboard />} />

          {/* fallback */}
          <Route path="*" element={<Navigate to="/" />} />

        </Routes>
      </main>

      {!hideLayout && <Footer />}

    </div>
  );
}

function App() {
  return (
    <RecentlyViewedProvider>
      <WishlistProvider> 
        <CartProvider>
          <Router>
            <AppContent />
          </Router>
        </CartProvider>
      </WishlistProvider>
    </RecentlyViewedProvider>
  );
}

export default App;