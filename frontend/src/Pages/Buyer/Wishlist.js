import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useWishlist } from '../../Context/WishlistContext';
import { useCart } from '../../Context/CartContext';
import { Heart, Trash2, ShoppingCart, ArrowLeft } from 'lucide-react';
import { formatLKR } from '../../Utils/formatters';

const Wishlist = () => {
  const navigate = useNavigate();
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <button 
            onClick={() => navigate(-1)} 
            className="p-2 hover:bg-white rounded-full transition shadow-sm bg-white/50"
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-3xl font-black text-slate-900 flex items-center gap-3">
            My Wishlist <Heart className="text-red-500 fill-red-500" size={28} />
          </h1>
        </div>

        {wishlist.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {wishlist.map((item) => (
              <div 
                key={item.id} 
                className="bg-white rounded-[2rem] p-5 shadow-sm border border-slate-100 flex items-center gap-5 hover:shadow-md transition group relative"
              >
                <img 
                  src={item.img} 
                  alt={item.title} 
                  className="w-24 h-24 object-cover rounded-2xl" 
                />
                
                <div className="flex-1">
                  <h3 className="font-bold text-slate-800 text-lg leading-tight mb-1">
                    {item.title}
                  </h3>
                  <p className="text-blue-600 font-black mb-3">
                    {formatLKR(item.price || item.currentBid)}
                  </p>
                  
                  <div className="flex gap-2">
                    <button 
                      onClick={() => {
                        addToCart(item);
                        removeFromWishlist(item.id);
                      }}
                      className="flex-[2] bg-slate-900 text-white py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-2 hover:bg-blue-600 transition"
                    >
                      <ShoppingCart size={14} /> Add to Cart
                    </button>
                    <button 
                      onClick={() => removeFromWishlist(item.id)}
                      className="flex-1 p-2 bg-red-50 text-red-500 rounded-xl hover:bg-red-100 transition flex items-center justify-center"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-[3rem] shadow-sm border border-dashed border-slate-200">
             <Heart size={64} className="mx-auto text-slate-200 mb-4" />
             <h2 className="text-xl font-bold text-slate-900 mb-2">Your wishlist is empty</h2>
             <p className="text-slate-400 mb-6">Save items you like to buy them later!</p>
             <button 
               onClick={() => navigate('/products')} 
               className="px-8 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition"
             >
               Explore Products
             </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;