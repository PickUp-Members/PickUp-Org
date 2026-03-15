import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../Hooks/useAuth';
import { useCart } from '../Hooks/useCart';
import { User, LogOut, Settings, LayoutDashboard, ShoppingCart, History, Shield, LogIn, UserPlus, Search } from 'lucide-react';
import logo from '../assets/logo.png';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const { user, logout } = useAuth();
  const { itemCount } = useCart();
  const navigate = useNavigate();

  const isLoggedIn = !!user;
  const userRole = user?.role || 'BUYER';

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) setIsMenuOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getInitial = (name) => name ? name.trim().charAt(0).toUpperCase() : '?';

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md px-4 lg:px-20 py-3 font-display">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2 text-[#1c74e9]">
          <img src={logo} alt="PickUp" className="h-8 w-auto object-contain"/>
          <h2 className="text-xl font-bold hidden sm:block">PickUp</h2>
        </Link>

        <div className="flex items-center gap-3">
          <Link to="/cart" className="relative p-2 text-slate-700 bg-slate-100 rounded-lg hover:bg-slate-200 transition-all">
            <ShoppingCart size={20} />
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] rounded-full h-5 w-5 flex items-center justify-center font-bold ring-2 ring-white">
                {itemCount}
              </span>
            )}
          </Link>

          <div className="relative" ref={menuRef}>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="h-10 w-10 rounded-full bg-[#1c74e9] flex items-center justify-center overflow-hidden border-2 border-[#1c74e9]/30 hover:ring-2 hover:ring-[#1c74e9] transition-all cursor-pointer">
              {isLoggedIn ? (
                user.profilePic ? <img src={user.profilePic} className="h-full w-full object-cover" alt="Profile" /> 
                : <span className="text-white font-bold text-lg">{getInitial(user.fullName)}</span>
              ) : <User className="text-white" size={20} />}
            </button>

            {isMenuOpen && (
              <div className="absolute right-0 mt-3 w-64 rounded-xl bg-white shadow-xl border border-slate-100 overflow-hidden z-50">
                <div className="py-2">
                  {!isLoggedIn ? (
                    <>
                      <Link to="/login" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-3 px-4 py-3 text-sm hover:bg-slate-50 transition-colors"><LogIn size={18} className="text-[#1c74e9]" /> Login</Link>
                      <Link to="/register" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-3 px-4 py-3 text-sm hover:bg-slate-50 transition-colors"><UserPlus size={18} className="text-[#1c74e9]" /> Register</Link>
                    </>
                  ) : (
                    <>
                      <div className="px-4 py-3 border-b border-slate-100 bg-slate-50/50">
                        <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Signed in as</p>
                        <p className="text-sm font-bold truncate text-slate-900">{user.fullName}</p>
                      </div>
                      <Link to="/profile" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-3 px-4 py-3 text-sm text-slate-700 hover:bg-slate-50"><Settings size={18} /> Edit Profile</Link>
                      {userRole === 'SELLER' && <Link to="/seller/dashboard" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-3 px-4 py-3 text-sm text-[#1c74e9] font-bold hover:bg-blue-50"><LayoutDashboard size={18} /> Shop Dashboard</Link>}
                      {userRole === 'ADMIN' && <Link to="/admin/dashboard" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-3 px-4 py-3 text-sm text-red-600 font-bold hover:bg-red-50"><Shield size={18} /> Admin Panel</Link>}
                      <Link to="/orders" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-3 px-4 py-3 text-sm text-slate-700 hover:bg-slate-50"><History size={18} /> Orders & Bids</Link>
                      <button onClick={() => { logout(); setIsMenuOpen(false); navigate('/'); }} className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-500 hover:bg-red-50 font-medium border-t border-slate-100 transition-colors"><LogOut size={18} /> Log out</button>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;