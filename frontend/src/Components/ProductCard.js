import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import { useCart } from '../Context/CartContext';
import { useRecent } from '../Context/RecentlyViewedContext';
import { formatLKR } from '../Utils/formatters';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { addToRecent } = useRecent();
  const navigate = useNavigate();
  
  const isAuction = product.type === "AUCTION";

  // FIX: This ensures images show up whether the data uses .img or the .images array
  const productImage = product.images ? product.images[0] : product.img;

  const handleProductClick = () => {
    addToRecent(product);
    navigate(`/products/${product.id}`);
  };

  const handleAction = (e) => {
    e.stopPropagation(); 
    if (isAuction) {
      handleProductClick();
    } else {
      addToCart(product);
    }
  };

  return (
    <div 
      onClick={handleProductClick}
      className="group relative flex flex-col rounded-[2rem] bg-white dark:bg-slate-800 p-4 shadow-sm transition-all hover:shadow-xl border border-slate-100 dark:border-slate-700 cursor-pointer"
    >
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden rounded-[1.5rem] bg-slate-100 dark:bg-slate-700">
        <img 
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" 
          src={productImage} 
          alt={product.title} 
        />
        
        {/* Badge */}
        <div className={`absolute top-3 left-3 flex items-center rounded-lg px-3 py-1 text-[10px] font-black text-white uppercase tracking-widest shadow-lg ${isAuction ? 'bg-amber-500' : 'bg-blue-600'}`}>
          {isAuction ? 'Auction' : 'Fixed Price'}
        </div>
      </div>

      {/* Content Section */}
      <div className="mt-5 flex flex-col gap-1 px-1">
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
            {product.category}
        </p>
        <h3 className="text-base font-black text-slate-900 dark:text-slate-100 truncate">
            {product.title}
        </h3>
        
        <div className="mt-3 flex items-center justify-between">
          <div className="flex flex-col">
            {isAuction && <span className="text-[10px] font-bold text-slate-400 uppercase">Current Bid</span>}
            <span className="text-xl font-black text-blue-600">
              {formatLKR(isAuction ? product.currentBid : product.price)}
            </span>
          </div>
        </div>
      </div>

      {/* Action Button */}
      <button 
        onClick={handleAction}
        className={`mt-5 w-full rounded-2xl py-4 text-xs font-black transition-all shadow-md active:scale-95 ${
          isAuction 
          ? 'bg-slate-900 text-white hover:bg-black' 
          : 'bg-blue-600 text-white hover:bg-blue-700'
        }`}
      >
        {isAuction ? 'Place Bid' : 'Add to Cart'}
      </button>
    </div>
  );
};

export default ProductCard;