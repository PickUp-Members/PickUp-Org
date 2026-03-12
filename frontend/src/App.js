import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import './App.css';

// Buyer Pages
import Home from './Pages/Buyer/Home';

// Seller Pages
import SellerDashboard from './Pages/Seller/SellerDashboard';

// Admin Pages
import AdminDashboard from './Pages/Admin/AdminDashboard';

// Auth Pages
import Login from './Pages/Auth/Login';
import Register from './Pages/Auth/Register';

function App() {
  return (
    <Router>
      <Routes>
        {/* Buyer Routes */}
        <Route path="/" element={<Home />} />
        
        {/* Seller Routes */}
        <Route path="/seller-dashboard" element={<SellerDashboard />} />
        
        {/* Admin Routes */}
        <Route path="/admin-dashboard" element={<AdminDashboard />} />

        {/* Auth Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />


        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

// This line is essential to fix your "export 'default' was not found" error
export default App;