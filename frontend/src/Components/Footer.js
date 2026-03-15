import React from 'react';
import logo from '../assets/logo.png';
import { Facebook, Twitter, Instagram, Phone, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white mt-20">
      <div className="max-w-7xl mx-auto px-4 lg:px-20 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <img src={logo} alt="PickUp" className="h-8" />
            <p className="text-slate-400 text-sm max-w-md">
              Sri Lanka's premier online marketplace for fixed price items and exciting live auctions.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-4">Buyer</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>Browse Auctions</li>
              <li>Shopping Cart</li>
              <li>Order History</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Seller</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>List Items</li>
              <li>Manage Shop</li>
              <li>Sales Analytics</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Support</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>Help Center</li>
              <li>Contact Us</li>
              <li>Dispute Resolution</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-slate-400">
          <p>&copy; 2024 PickUp. All rights reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <a href="#" className="p-2 hover:bg-slate-800 rounded-lg"><Facebook size={18} /></a>
            <a href="#" className="p-2 hover:bg-slate-800 rounded-lg"><Twitter size={18} /></a>
            <a href="#" className="p-2 hover:bg-slate-800 rounded-lg"><Instagram size={18} /></a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;