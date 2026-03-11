import React from 'react';
import Navbar from '../../Components/Navbar';
import ProductCard from '../../Components/ProductCard';

const Home = () => {
  // Mock data representing your database entities
  const products = [
    { id: 1, title: "Sony WH-1000XM4 Wireless Headphones", brand: "Sony", category: "Audio", type: "FIXED", price: 299.99, stock: 12, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuA2oJJxfCXGFb2hNGsyNoFU3ljI9Bin18PBYBoZxK2APy08BF6QKui2Up7uJlUbsesbEMeABX_2ln24i8rqpzE1vEAOZczsNGx7PB9HvJkuQqopxTvjDo8kZ0K5spIqe2I9gqn_y9h_x6m4F6cSFfz7HQbI0tM-cEvcE86mBmXeT7HTNwj7-UBvpHXzcngcHidiTf9vXUuEvswGmLoyAx_G0Cz07zRUpYvZI-gT3p6141AZkSitJfiMqVdX3SZI4GHCwp2E6yuBgSA" },
    { id: 2, title: "Limited Edition Silver Mechanical Watch", brand: "Omega", category: "Accessories", type: "AUCTION", currentBid: 1450.00, bids: 18, timeLeft: "02h 45m 12s", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBji-3Xo5uIs0DNdL4QEJdopMTkscUGH_MkDB0L9LYqjX51qZmzbwLYuC-kOH_IDEqytnyiSxlOxX0UpuRtsdZOj2hORR-B9BkKENhbYHTs0Yk47zzWPjn1GurDXMPnF_IEMRW1LRHnuQ7G2FMPRi5WBfMWaWn00VGBWr3zPhbo3Y-rycQXMt3yftDDg7kE71KF7Rg6OrIPuJoT9cXb5-5feDU76q_sY3vTF7zfDvbLYjUbKebPJm0lo2Vp7R7FuSeANjAmKnYNA-0" },
    { id: 3, title: "Nike Air Zoom Pegasus 38 - Crimson Red", brand: "Nike", category: "Footwear", type: "FIXED", price: 120.00, stock: 5, img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500" },
    { id: 4, title: "Designer Ergonomic Office Task Chair", brand: "Aeron", category: "Furniture", type: "AUCTION", currentBid: 415.00, bids: 42, timeLeft: "14m", endingSoon: true, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCjNBL2-5TFmDgqmNXPhBA_sSkJvi9xW_6ePeFz4yMfLQHxZoPhqoO9zQJysooVkhkVPcSfNwF0Ps9l9UgtDlGgFVo4nVO6uUvMQR3UT5yUlMPw2zW3sREcsibNTgS-4Oj0pOp7TLirOqs7Kdw6-LqFDVo2VjeMKZhHuErPCPbYCCdK4v1LynZSL069W6prg0I7h8RzxbPJvnwwB_9eSkLbOZLLI5o3WxJdDg21AWBwKCSjP2DYyW3c0IBq42N_B7DcsY8AgKQ4L8E" }
  ];

  return (
    <div className="relative flex min-h-screen flex-col bg-[#f6f7f8] dark:bg-[#111821] font-display text-slate-900 dark:text-slate-100">
      <Navbar />
      
      <main className="mx-auto w-full max-w-7xl px-4 lg:px-20 py-8">
        {/* Hero Section */}
        <section className="mb-12">
          <div className="relative overflow-hidden rounded-xl bg-slate-900 text-white shadow-xl">
            <div className="absolute inset-0 opacity-40">
              <img className="h-full w-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCtmnFubDiLRVnhLFYt96_cQiS63QAhpO76xZtc76ir3qmZgBuZfBaTrzBffsBPc8yB_E4clce_Yk59X75oiu1_SXtveTnkBphcQO-iV--EZYc3GcZLVk6jow4DnIlkoaiu52zAigkPqRd8tE8wANt0b2X_Ax9ZCYS762UhNQkiPMNd_yonqLT6mILDVKQlTJcCNGUSDVr6ydYC8UQOyRizpZoNk9Cpj_vpTT_3rBkmcsYbynwIaJq8nK17Phqk5BTINZOHudPZhJA" alt="High tech gadgets" />
            </div>
            <div className="relative z-10 flex flex-col items-start justify-center p-8 md:p-16 lg:w-2/3">
              <span className="mb-4 inline-block rounded-full bg-[#1c74e9] px-3 py-1 text-xs font-bold uppercase tracking-wider">Summer Sale</span>
              <h1 className="mb-6 text-4xl font-extrabold leading-tight md:text-5xl">Upgrade Your Setup with Up to 40% Off</h1>
              <p className="mb-8 text-lg text-slate-200">Discover the latest in tech, fashion, and home essentials.</p>
              <div className="flex gap-4">
                <button className="rounded-lg bg-white px-6 py-3 text-sm font-bold text-slate-900 transition-transform hover:scale-105 cursor-pointer">Shop Tech</button>
                <button className="rounded-lg bg-[#1c74e9] px-6 py-3 text-sm font-bold text-white transition-transform hover:scale-105 cursor-pointer">View Auctions</button>
              </div>
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="mb-10 overflow-x-auto pb-4 no-scrollbar">
          <div className="flex gap-4">
            {['All Categories', 'Electronics', 'Fashion', 'Home & Living', 'Collectibles', 'Gaming'].map((cat, i) => (
              <button key={cat} className={`flex shrink-0 items-center gap-2 rounded-xl px-6 py-3 text-sm font-medium transition-colors cursor-pointer ${i === 0 ? 'bg-[#1c74e9] text-white' : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-[#1c74e9]'}`}>
                {cat}
              </button>
            ))}
          </div>
        </section>

        {/* Product Grid */}
        <section>
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold">Recommended for You</h2>
            <div className="flex items-center gap-2 text-[#1c74e9] font-semibold text-sm cursor-pointer hover:underline">
              See All <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;