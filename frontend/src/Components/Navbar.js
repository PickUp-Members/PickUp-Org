import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../Hooks/useCart';
import { useWishlist } from '../Context/WishlistContext';
import {
  User, LogOut, Settings, LayoutDashboard, ShoppingCart,
  History, Shield, LogIn, UserPlus, Search as SearchIcon, Heart
} from 'lucide-react';
import logo from '../assets/logo.png';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const menuRef = useRef(null);

  const { itemCount } = useCart();
  const { wishlist } = useWishlist();
  const navigate = useNavigate();

  // ✅ Get user from localStorage
  const user = JSON.parse(localStorage.getItem("user"));
  const isLoggedIn = !!user;
  const userRole = user?.role || 'BUYER';
  const wishlistCount = wishlist.length;

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const getInitial = (name) =>
    name ? name.trim().charAt(0).toUpperCase() : '?';

  // ✅ Logout function
  const logout = () => {
    localStorage.removeItem("user");
    setIsMenuOpen(false);
    navigate('/login');
    window.location.reload(); // refresh UI state
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md px-4 lg:px-20 py-3 font-display">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 md:gap-8">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 text-[#1c74e9] shrink-0">
          <img src={logo} alt="PickUp" className="h-8 w-auto object-contain" />
          <h2 className="text-xl font-bold hidden sm:block text-slate-900">PickUp</h2>
        </Link>

        {/* Search */}
        <form onSubmit={handleSearch} className="relative flex-1 max-w-md hidden md:block">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
            <SearchIcon size={18} />
          </div>
          <input
            type="text"
            className="block w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1c74e9]/20"
            placeholder="Search auctions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </form>

        {/* Right Side */}
        <div className="flex items-center gap-4">

          {/* Wishlist */}
          <Link to="/wishlist" className="relative p-2.5 bg-slate-100 rounded-xl">
            <Heart size={20} />
            {wishlistCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] rounded-full h-5 w-5 flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </Link>

          {/* Cart */}
          <Link to="/cart" className="relative p-2.5 bg-slate-100 rounded-xl">
            <ShoppingCart size={20} />
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-[10px] rounded-full h-5 w-5 flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </Link>

          {/* Profile */}
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="h-10 w-10 rounded-full bg-[#1c74e9] flex items-center justify-center text-white font-bold"
            >
              {isLoggedIn ? (
                user.profilePic
                  ? <img src={user.profilePic} className="h-full w-full object-cover" alt="Profile" />
                  : getInitial(user.fullName)
              ) : (
                <User size={20} />
              )}
            </button>

            {isMenuOpen && (
              <div className="absolute right-0 mt-3 w-64 bg-white shadow-xl rounded-xl border z-50">

                {!isLoggedIn ? (
                  <>
                    <Link to="/login" className="flex items-center gap-2 px-4 py-3 hover:bg-slate-50">
                      <LogIn size={16} /> Login
                    </Link>
                    <Link to="/register" className="flex items-center gap-2 px-4 py-3 hover:bg-slate-50">
                      <UserPlus size={16} /> Register
                    </Link>
                  </>
                ) : (
                  <>
                    <div className="px-4 py-3 border-b">
                      <p className="text-xs text-slate-400">Signed in as</p>
                      <p className="font-bold">{user.fullName}</p>
                    </div>

                    {userRole === 'BUYER' && (
                      <Link to="/seller/become-seller" className="flex items-center gap-2 px-4 py-3 hover:bg-slate-50">
                        <LayoutDashboard size={16} /> Become Seller
                      </Link>
                    )}

                    {userRole === 'SELLER' && (
                      <Link to="/seller/dashboard" className="flex items-center gap-2 px-4 py-3 hover:bg-slate-50">
                        <LayoutDashboard size={16} /> Dashboard
                      </Link>
                    )}

                    {userRole === 'ADMIN' && (
                      <Link to="/admin/dashboard" className="flex items-center gap-2 px-4 py-3 hover:bg-slate-50">
                        <Shield size={16} /> Admin Panel
                      </Link>
                    )}

                    <Link to="/profile" className="flex items-center gap-2 px-4 py-3 hover:bg-slate-50">
                      <Settings size={16} /> Profile
                    </Link>

                    <Link to="/orders" className="flex items-center gap-2 px-4 py-3 hover:bg-slate-50">
                      <History size={16} /> Orders
                    </Link>

                    <button
                      onClick={logout}
                      className="w-full flex items-center gap-2 px-4 py-3 text-red-500 hover:bg-red-50 border-t"
                    >
                      <LogOut size={16} /> Logout
                    </button>
                  </>
                )}

              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;