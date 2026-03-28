import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom'; 
import { api } from '../../Services/api';
import ProductCard from '../../Components/ProductCard';
import { Search, LayoutGrid } from 'lucide-react'; 

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [searchParams, setSearchParams] = useSearchParams();

  const categoryFromUrl = searchParams.get('category') || 'All';
  const typeFromUrl = searchParams.get('type') || 'All';
  const queryFromUrl = searchParams.get('search') || '';

  const [searchQuery, setSearchQuery] = useState(queryFromUrl);
  const [selectedCategory, setSelectedCategory] = useState(categoryFromUrl);
  const [selectedType, setSelectedType] = useState(typeFromUrl);
  const [sortBy, setSortBy] = useState('default');

  const categories = ['All', 'Electronics', 'Fashion', 'Home & Living', 'Accessories', 'Footwear', 'Furniture'];

  useEffect(() => {
    setSelectedCategory(categoryFromUrl);
    setSelectedType(typeFromUrl);
    setSearchQuery(queryFromUrl);
  }, [categoryFromUrl, typeFromUrl, queryFromUrl]);

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      try {
        const filters = {
          category: selectedCategory,
          type: selectedType,
          search: searchQuery
        };

        const data = await api.getProducts(filters);
        let finalData = Array.isArray(data) ? [...data] : [];

        if (sortBy === 'low') {
          finalData.sort((a, b) => (a.price || a.currentBid) - (b.price || b.currentBid));
        } else if (sortBy === 'high') {
          finalData.sort((a, b) => (b.price || b.currentBid) - (a.price || a.currentBid));
        }

        setProducts(finalData);
      } catch (error) {
        console.error("Error loading products:", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(() => {
      loadProducts();
    }, 300);

    return () => clearTimeout(timer);
    
  }, [searchQuery, selectedCategory, selectedType, sortBy]);

  const updateFilters = (newFilters) => {
    const currentParams = Object.fromEntries([...searchParams]);
    setSearchParams({ ...currentParams, ...newFilters });
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 pb-20 pt-6">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white flex items-center gap-3">
              <LayoutGrid className="text-[#1c74e9]" size={32} />
              Marketplace
            </h1>
          </div>

          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input 
              type="text"
              placeholder="Search products..."
              className="w-full pl-10 pr-4 py-3 rounded-2xl bg-white dark:bg-slate-800 border-none shadow-sm focus:ring-2 focus:ring-[#1c74e9] dark:text-white outline-none"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                updateFilters({ search: e.target.value });
              }}
            />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-64 space-y-8">
            <section>
              <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">Categories</h3>
              <div className="flex flex-wrap lg:flex-col gap-2">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => {
                      setSelectedCategory(cat);
                      updateFilters({ category: cat });
                    }}
                    className={`px-4 py-2.5 rounded-xl text-sm font-semibold transition-all text-left border ${
                      selectedCategory === cat 
                      ? 'bg-[#1c74e9] text-white border-[#1c74e9] shadow-md' 
                      : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-transparent hover:border-slate-200'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </section>

            <section>
              <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">Listing Type</h3>
              <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl space-y-3 shadow-sm">
                {['All', 'FIXED', 'AUCTION'].map(type => (
                  <label key={type} className="flex items-center gap-3 cursor-pointer">
                    <input 
                      type="radio" 
                      name="type" 
                      checked={selectedType === type}
                      onChange={() => {
                        setSelectedType(type);
                        updateFilters({ type: type });
                      }}
                      className="accent-[#1c74e9]"
                    />
                    <span className="text-sm dark:text-slate-300">
                      {type === 'FIXED' ? 'Fixed Price' : type === 'AUCTION' ? 'Auctions' : 'All Items'}
                    </span>
                  </label>
                ))}
              </div>
            </section>

            <section>
              <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">Sort By</h3>
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full p-3 rounded-xl bg-white dark:bg-slate-800 border-none shadow-sm text-sm outline-none dark:text-white cursor-pointer"
              >
                <option value="default">Default Sorting</option>
                <option value="low">Price: Low to High</option>
                <option value="high">Price: High to Low</option>
              </select>
            </section>
          </div>

          {/* Product Grid */}
          <div className="flex-1">
            {loading ? (
              <div className="text-center py-20 dark:text-white font-medium italic">Loading marketplace items...</div>
            ) : products.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {products.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="bg-white dark:bg-slate-800 rounded-3xl p-16 text-center shadow-sm border-2 border-dashed border-slate-100 dark:border-slate-700">
                <div className="mb-4 text-slate-300 dark:text-slate-600 flex justify-center">
                  <LayoutGrid size={64} />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">No items found</h2>
                <p className="text-slate-500 mb-8">Try choosing a different category or adjusting your search.</p>
                <button 
                  onClick={() => {
                    setSelectedCategory('All'); 
                    setSearchQuery(''); 
                    setSelectedType('All');
                    setSearchParams({}); 
                  }}
                  className="px-8 py-3 bg-[#1c74e9] text-white rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;