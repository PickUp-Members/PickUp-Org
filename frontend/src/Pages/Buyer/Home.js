import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import ProductCard from '../../Components/ProductCard';

const Home = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (category) => {
    if (category === 'All Categories') {
      navigate('/products'); 
    } else {
      navigate(`/products?category=${category}`);
    }
  };

  const products = [
    { id: 1, title: "Sony WH-1000XM4 Wireless Headphones", brand: "Sony", category: "Electronics", type: "FIXED", price: 299.99, stock: 12, img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500" },
    { id: 2, title: "Limited Edition Silver Mechanical Watch", brand: "Omega", category: "Fashion", type: "AUCTION", currentBid: 1450.00, bids: 18, timeLeft: "02h 45m 12s", img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500" },
    { id: 3, title: "Nike Air Zoom Pegasus 38 - Crimson Red", brand: "Nike", category: "Fashion", type: "FIXED", price: 120.00, stock: 5, img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500" },
    { id: 4, title: "Designer Ergonomic Office Task Chair", brand: "Aeron", category: "Home & Living", type: "AUCTION", currentBid: 415.00, bids: 42, timeLeft: "14m", endingSoon: true, img: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=500" }
  ];

  return (
    <div className="relative flex min-h-screen flex-col bg-[#f6f7f8] dark:bg-[#111821] font-display text-slate-900 dark:text-slate-100">
      
      <main className="mx-auto w-full max-w-7xl px-4 lg:px-20 py-8">
        {/* Hero Section */}
        <section className="mb-12">
          <div className="relative overflow-hidden rounded-xl bg-slate-900 text-white shadow-xl">
            <div className="absolute inset-0 opacity-40">
              <img className="h-full w-full object-cover" src="https://images.unsplash.com/photo-1498049794561-7780e7231661?w=1000" alt="High tech gadgets" />
            </div>
            <div className="relative z-10 flex flex-col items-start justify-center p-8 md:p-16 lg:w-2/3">
              <span className="mb-4 inline-block rounded-full bg-[#1c74e9] px-3 py-1 text-xs font-bold uppercase tracking-wider">Summer Sale</span>
              <h1 className="mb-6 text-4xl font-extrabold leading-tight md:text-5xl">Upgrade Your Setup with Up to 40% Off</h1>
              <p className="mb-8 text-lg text-slate-200">Discover the latest in tech, fashion, and home essentials.</p>
              <div className="flex gap-4">
                <button 
                  onClick={() => handleCategoryClick('Electronics')}
                  className="rounded-lg bg-white px-6 py-3 text-sm font-bold text-slate-900 transition-transform hover:scale-105 cursor-pointer"
                >
                  Shop Tech
                </button>
                <button 
                  onClick={() => navigate('/products?type=AUCTION')}
                  className="rounded-lg bg-[#1c74e9] px-6 py-3 text-sm font-bold text-white transition-transform hover:scale-105 cursor-pointer"
                >
                  View Auctions
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="mb-10 overflow-x-auto pb-4 no-scrollbar">
          <div className="flex gap-4">
            {['All Categories', 'Electronics', 'Fashion', 'Home & Living', 'Collectibles', 'Gaming'].map((cat, i) => (
              <button 
                key={cat} 
                onClick={() => handleCategoryClick(cat)} 
                className={`flex shrink-0 items-center gap-2 rounded-xl px-6 py-3 text-sm font-medium transition-colors cursor-pointer ${
                  i === 0 
                  ? 'bg-[#1c74e9] text-white' 
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-[#1c74e9]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </section>

        {/* Product Grid */}
        <section>
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold">Recommended for You</h2>
            <div 
              onClick={() => navigate('/products')}
              className="flex items-center gap-2 text-[#1c74e9] font-semibold text-sm cursor-pointer hover:underline"
            >
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