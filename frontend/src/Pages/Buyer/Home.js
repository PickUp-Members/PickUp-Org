import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductCard from '../../Components/ProductCard';
import { useRecent } from '../../Context/RecentlyViewedContext';
import { Laptop, Shirt, Home as HomeIcon, Ghost, Gamepad2, TrendingUp, Sparkles } from 'lucide-react';
import { formatLKR } from '../../Utils/formatters';
import productsData from '../../data/products';

const Home = () => {
  const navigate = useNavigate();
  const { recentItems } = useRecent();
  const [displayProducts, setDisplayProducts] = useState([]);

  useEffect(() => {
    // Show a preview of 8 items on the home page
    setDisplayProducts(productsData.slice(0, 8));
  }, []);

  const handleCategoryClick = (category) => {
    category === 'All Categories' 
      ? navigate('/products') 
      : navigate(`/products?category=${encodeURIComponent(category)}`);
  };

  const categories = [
    { name: 'All Categories', icon: <Ghost size={20} /> },
    { name: 'Electronics', icon: <Laptop size={20} /> },
    { name: 'Fashion', icon: <Shirt size={20} /> },
    { name: 'Home & Living', icon: <HomeIcon size={20} /> },
    { name: 'Gaming', icon: <Gamepad2 size={20} /> }
  ];

  return (
    // Updated background to deep slate for a consistent dark theme
    <div className="relative flex min-h-screen flex-col bg-[#0f172a] font-display overflow-x-hidden">
      <main className="mx-auto w-full max-w-7xl px-4 lg:px-20 py-10">
        
        {/* Banner Section */}
        <section className="mb-16">
          <div className="relative overflow-hidden rounded-[3.5rem] bg-slate-800 text-white shadow-2xl h-[450px] border border-slate-700">
            <img 
              className="absolute inset-0 h-full w-full object-cover opacity-40 scale-105" 
              src="https://images.unsplash.com/photo-1498049794561-7780e7231661?w=1200" 
              alt="Banner" 
            />
            <div className="relative z-10 flex flex-col items-start justify-center h-full p-10 md:p-20 lg:w-3/4">
              <div className="mb-6 flex items-center gap-2 rounded-full bg-blue-600/90 backdrop-blur-md px-5 py-2 text-[11px] font-black uppercase tracking-[0.2em]">
                <Sparkles size={14} /> Limited Offer
              </div>
              <h1 className="mb-8 text-5xl font-black leading-[1.1] md:text-7xl tracking-tight">
                Upgrade Your Setup <br/> <span className="text-blue-400">with 40% Off</span>
              </h1>
              <button 
                onClick={() => navigate('/products')} 
                className="group relative flex items-center gap-3 rounded-2xl bg-white px-10 py-5 text-sm font-black text-slate-900 hover:bg-blue-50 transition-all shadow-xl active:scale-95"
              >
                Shop the Collection
                <TrendingUp size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="mb-16">
          <div className="flex gap-5 overflow-x-auto pb-6 no-scrollbar snap-x">
            {categories.map((cat) => (
              <button 
                key={cat.name} 
                onClick={() => handleCategoryClick(cat.name)} 
                className="flex shrink-0 items-center gap-4 rounded-3xl px-8 py-5 text-sm font-bold bg-slate-800 text-slate-200 border-2 border-slate-700 hover:border-blue-500 hover:text-blue-400 transition-all shadow-sm snap-start"
              >
                <span className="p-2 bg-slate-700 rounded-xl">{cat.icon}</span> 
                {cat.name}
              </button>
            ))}
          </div>
        </section>

        {/* Recommended Grid */}
        <section>
          <div className="mb-10 flex items-center gap-3">
             <div className="h-8 w-1.5 bg-blue-600 rounded-full"></div>
             <h2 className="text-3xl font-black text-white">Recommended for You</h2>
          </div>
          
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {displayProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

      </main>
    </div>
  );
};

export default Home;