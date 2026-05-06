import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useWishlist } from '../../Context/WishlistContext';
import { useRecent } from '../../Context/RecentlyViewedContext';
import { Heart, Ghost } from 'lucide-react'; 
import { formatLKR } from '../../Utils/formatters';
// Importing your expanded mock data
import productsData from '../../data/products'; 

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams(); 
  const navigate = useNavigate();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { addToRecent } = useRecent();

  // Get search and category from the URL
  const searchQuery = searchParams.get('search') || '';
  const selectedCategory = searchParams.get('category') || 'All Categories';

  useEffect(() => {
    setLoading(true);
    
    // Filter the products locally based on Search and Category
    const filtered = productsData.filter((item) => {
      const matchesSearch = 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());
        
      // FIX: decodeURIComponent handles special characters like '&' from the URL correctly
      const decodedCategory = decodeURIComponent(selectedCategory);
      
      const matchesCategory = 
        decodedCategory === 'All Categories' || 
        decodedCategory === 'All' ||
        item.category.toLowerCase() === decodedCategory.toLowerCase();

      return matchesSearch && matchesCategory;
    });

    const timer = setTimeout(() => {
      setProducts(filtered);
      setLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery, selectedCategory]);

  return (
    <div className="min-h-screen bg-[#f8fafc] pb-20 pt-10">
      <div className="max-w-7xl mx-auto px-4 lg:px-20">
        
        {/* Header Section */}
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-4xl font-black text-slate-900 mb-2">Marketplace</h1>
            <p className="text-slate-500 font-medium">
              {decodeURIComponent(selectedCategory)} {searchQuery && `• Results for "${searchQuery}"`}
            </p>
          </div>
          <p className="text-sm font-bold text-blue-600 bg-blue-50 px-4 py-2 rounded-full shadow-sm">
            {products.length} Items Found
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {loading ? (
            <div className="col-span-full text-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="font-bold text-slate-400">Updating Marketplace...</p>
            </div>
          ) : products.length > 0 ? (
            products.map(product => {
              const isFavorite = isInWishlist(product.id);
              const isAuction = product.type === "AUCTION";
              // Fixed Image Logic: Prioritize backend images array[cite: 3]
              const productImage = product.images ? product.images[0] : product.img;

              return (
                <div 
                  key={product.id} 
                  className="bg-white rounded-[2.5rem] p-4 shadow-sm border border-slate-100 relative group cursor-pointer hover:shadow-2xl hover:-translate-y-1 transition-all duration-300" 
                  onClick={() => {
                    addToRecent(product);
                    navigate(`/products/${product.id}`);
                  }}
                >
                  {/* Wishlist Button */}
                  <button 
                    onClick={(e) => { 
                      e.stopPropagation(); 
                      isFavorite ? removeFromWishlist(product.id) : addToWishlist(product); 
                    }}
                    className="absolute top-6 right-6 z-10 p-3 bg-white/80 backdrop-blur-md rounded-2xl shadow-sm text-slate-400 hover:text-red-500 transition-all active:scale-90"
                  >
                    <Heart size={20} fill={isFavorite ? "#ef4444" : "none"} className={isFavorite ? "text-red-500" : ""} />
                  </button>
                  
                  {/* Image Container[cite: 3] */}
                  <div className="relative overflow-hidden rounded-[2rem] mb-5 bg-slate-50 aspect-square">
                    <img 
                      src={productImage} 
                      alt={product.title} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                    />
                    {isAuction && (
                      <div className="absolute bottom-4 left-4 bg-red-600 text-white text-[10px] font-black px-3 py-1 rounded-full shadow-lg tracking-widest">
                        AUCTION
                      </div>
                    )}
                  </div>
                  
                  {/* Info Section[cite: 3] */}
                  <div className="px-2 pb-2">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{product.category}</p>
                    <h3 className="font-black text-slate-800 mb-3 truncate text-lg">{product.title}</h3>
                    <div className="flex flex-col">
                        <span className="text-[10px] font-bold text-slate-400 uppercase">
                            {isAuction ? "Current Bid" : "Price"}
                        </span>
                        <p className="text-blue-600 font-black text-xl">
                            {formatLKR(isAuction ? product.currentBid : product.price)}
                        </p>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="col-span-full text-center py-24 bg-white rounded-[3rem] border-2 border-dashed border-slate-200">
              <Ghost size={64} className="mx-auto text-slate-200 mb-4" />
              <h2 className="text-2xl font-black text-slate-400">No items found</h2>
              <p className="text-slate-300 font-bold mt-2">Try adjusting your filters or search terms</p>
              <button 
                onClick={() => navigate('/products')}
                className="mt-6 text-blue-600 font-black text-sm hover:underline"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductList;