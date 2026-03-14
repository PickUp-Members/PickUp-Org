import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  User, 
  LogOut, 
  UserPlus, 
  LogIn, 
  Settings, 
  History, 
  LayoutDashboard,
  Search,
  ShoppingCart
} from 'lucide-react';
import logo from '../assets/logo.png';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  const [userRole, setUserRole] = useState('BUYER'); 
  
  // useRef to target the dropdown container
  const menuRef = useRef(null);

  const [userData, setUserData] = useState({
    fullName: "Yasas Lasitha",
    profilePic: null 
  });

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      // If the menu is open and the click is NOT inside the menuRef, close it
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    // Attach listener to the document
    document.addEventListener('mousedown', handleClickOutside);
    
    // Cleanup the listener when the component unmounts
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const getInitial = (name) => {
    return name ? name.trim().charAt(0).toUpperCase() : '?';
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-[#111821]/80 backdrop-blur-md px-4 lg:px-20 py-3 font-display">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
        
        {/* Logo & Brand */}
        <div className="flex items-center gap-8 flex-1">
          <Link to="/" className="flex items-center gap-2 text-[#1c74e9]">
            <img src={logo} alt="PickUp Logo" className="h-8 w-auto object-contain"/>
            <h2 className="text-xl font-bold leading-tight tracking-tight hidden sm:block">PickUp</h2>
          </Link>

          {/* Search Bar */}
          <div className="relative flex-1 max-w-md hidden md:flex">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-400">
              <Search size={16} />
            </div>
            <input 
              className="block w-full rounded-lg border-none bg-slate-100 dark:bg-slate-800 py-2 pl-10 pr-3 text-sm focus:ring-2 focus:ring-[#1c74e9] placeholder-slate-500 outline-none" 
              placeholder="Search for products or auctions..." 
              type="text"
            />
          </div>
        </div>

        {/* Action Icons */}
        <div className="flex items-center gap-3">
          {!isLoggedIn || userRole === 'BUYER' ? (
            <Link to="/become-seller" className="hidden sm:flex items-center justify-center rounded-lg bg-[#1c74e9] px-4 py-2 text-sm font-bold text-white transition-opacity hover:opacity-90 cursor-pointer">
              Become a Seller
            </Link>
          ) : null}

          <Link to="/cart" className="flex items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800 p-2 text-slate-700 dark:text-slate-200 hover:bg-slate-200 cursor-pointer">
            <ShoppingCart size={20} />
          </Link>

          {/* Profile Dropdown Container - Attached menuRef here */}
          <div className="relative" ref={menuRef}>
            <button 
              onClick={toggleMenu}
              className="h-10 w-10 rounded-full bg-[#1c74e9] flex items-center justify-center overflow-hidden border-2 border-[#1c74e9]/30 hover:ring-2 hover:ring-[#1c74e9] transition-all cursor-pointer shadow-sm"
            >
              {isLoggedIn ? (
                userData.profilePic ? (
                  <img alt="User profile" className="h-full w-full object-cover" src={userData.profilePic} />
                ) : (
                  <span className="text-white font-bold text-lg select-none">
                    {getInitial(userData.fullName)}
                  </span>
                )
              ) : (
                <User className="text-white" size={20} />
              )}
            </button>

            {isMenuOpen && (
              <div className="absolute right-0 mt-3 w-56 rounded-xl bg-white dark:bg-slate-800 shadow-xl border border-slate-100 dark:border-slate-700 overflow-hidden z-50">
                <div className="py-2">
                  {!isLoggedIn ? (
                    <>
                      <Link to="/login" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-3 px-4 py-3 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700">
                        <LogIn size={18} className="text-[#1c74e9]" /> Login 
                      </Link>
                      <Link to="/register" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-3 px-4 py-3 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700">
                        <UserPlus size={18} className="text-[#1c74e9]" /> Register
                      </Link>
                    </>
                  ) : (
                    <>
                      <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-700 bg-slate-50/50">
                        <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Signed in as</p>
                        <p className="text-sm font-bold text-slate-800 truncate">{userData.fullName}</p>
                      </div>
                      <Link to="/profile" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-3 px-4 py-3 text-sm text-slate-700 hover:bg-slate-50">
                        <Settings size={18} /> Edit Profile 
                      </Link>
                      <Link to="/history" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-3 px-4 py-3 text-sm text-slate-700 hover:bg-slate-50">
                        <History size={18} /> Order & Bid History 
                      </Link>
                      
                      {userRole === 'SELLER' && (
                        <Link to="/seller/dashboard" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-3 px-4 py-3 text-sm text-[#1c74e9] font-bold hover:bg-blue-50">
                          <LayoutDashboard size={18} /> Shop Dashboard 
                        </Link>
                      )}

                      <button 
                        onClick={() => {
                          setIsLoggedIn(false);
                          setIsMenuOpen(false);
                        }}
                        className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-500 hover:bg-red-50 font-medium border-t border-slate-100"
                      >
                        <LogOut size={18} /> Log out 
                      </button>
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