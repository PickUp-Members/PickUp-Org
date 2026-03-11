import React from 'react';

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-[#111821]/80 backdrop-blur-md px-4 lg:px-20 py-3">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
        <div className="flex items-center gap-8 flex-1">
          <div className="flex items-center gap-2 text-[#1c74e9]">
            <span className="material-symbols-outlined text-3xl font-bold">storefront</span>
            <h2 className="text-xl font-bold leading-tight tracking-tight hidden sm:block">PickUp</h2>
          </div>
          <div className="relative flex-1 max-w-md hidden md:flex">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-400">
              <span className="material-symbols-outlined text-sm">search</span>
            </div>
            <input className="block w-full rounded-lg border-none bg-slate-100 dark:bg-slate-800 py-2 pl-10 pr-3 text-sm focus:ring-2 focus:ring-[#1c74e9] placeholder-slate-500" placeholder="Search for products..." type="text"/>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="hidden sm:flex items-center justify-center rounded-lg bg-[#1c74e9] px-4 py-2 text-sm font-bold text-white transition-opacity hover:opacity-90 cursor-pointer">Become a Seller</button>
          <button className="flex items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800 p-2 text-slate-700 dark:text-slate-200 hover:bg-slate-200 cursor-pointer">
            <span className="material-symbols-outlined">shopping_cart</span>
          </button>
          <div className="h-8 w-8 rounded-full bg-[#1c74e9]/20 flex items-center justify-center overflow-hidden border border-[#1c74e9]/30">
            <img alt="User avatar" className="h-full w-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDEggcSY6lKJc6_Q1qP_YI7oAtI-KhhQS4uZsVEBnBAXce4pX6v511mnGjRe-V8uxeW0ERuqBXgg_gIURq5drr1Ie84IDi9-QBT4-GEl3BBZ3mb1f4qlC0DRpsQUQ1hk9mkWk5RpM-Jxh9Hl0PFs_JcOYbySTDQLNSaCQ811QeUUc9k3R1k0ZIsC0TF8a70WyNMIb6A--Lk1p_D7t0yD0oTL4SAC2ogEIiuufffGG3q7iCrolxXR_mAjsPOLge0LWp1v2Yfum6Ze9E"/>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;