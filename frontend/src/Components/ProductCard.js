import React from 'react';
import { useCart } from '../Context/CartContext'; 
const ProductCard = ({ product }) => {
  const { addToCart } = useCart(); 
  const isAuction = product.type === "AUCTION";

  const handleAction = (e) => {
    e.preventDefault(); 
    if (isAuction) { 
      console.log("Placing bid for:", product.id);
    } else { 
      addToCart(product);
      alert(`${product.title} added to cart!`); 
    }
  };

  return (
    <div className="group relative flex flex-col rounded-xl bg-white dark:bg-slate-800 p-3 shadow-sm transition-all hover:shadow-md border border-slate-100 dark:border-slate-700">
      <div className="relative aspect-square overflow-hidden rounded-lg bg-slate-100 dark:bg-slate-700">
        <img className="h-full w-full object-cover transition-transform group-hover:scale-105" src={product.img} alt={product.title} />
        
        {/* Badge */}
        <div className={`absolute top-2 left-2 flex items-center rounded-md px-2 py-1 text-[10px] font-bold text-white uppercase tracking-wider ${isAuction ? 'bg-amber-500' : 'bg-green-500'}`}>
          {isAuction ? 'Auction' : 'Fixed Price'}
        </div>

        {isAuction && (
          <div className={`absolute bottom-2 left-2 flex items-center gap-1 rounded-md px-2 py-1 text-[10px] font-bold text-white backdrop-blur-sm ${product.endingSoon ? 'bg-red-500' : 'bg-black/60'}`}>
            <span className="material-symbols-outlined text-xs">{product.endingSoon ? 'bolt' : 'schedule'}</span> 
            {product.endingSoon ? `Ending Soon: ${product.timeLeft}` : product.timeLeft}
          </div>
        )}

        <button className="absolute top-2 right-2 flex h-8 w-8 items-center justify-center rounded-full bg-white/80 dark:bg-slate-900/80 text-slate-900 dark:text-white backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
          <span className="material-symbols-outlined text-lg">favorite</span>
        </button>
      </div>

      <div className="mt-4 flex flex-col gap-1">
        <p className="text-xs text-slate-500 dark:text-slate-400">{product.brand} • {product.category}</p>
        <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 truncate">{product.title}</h3>
        
        <div className="mt-2 flex items-center justify-between">
          <div className="flex flex-col">
            {isAuction && <span className="text-xs text-slate-400">Current Bid</span>}
            <span className="text-lg font-bold text-[#1c74e9]">${isAuction ? product.currentBid : product.price}</span>
          </div>
          <span className="text-[10px] text-slate-400">
            {isAuction ? `${product.bids} Bids` : `Stock: ${product.stock} left`}
          </span>
        </div>
      </div>

      <button 
        onClick={handleAction}
        className={`mt-4 w-full rounded-lg py-2 text-xs font-bold transition-all cursor-pointer ${
          isAuction 
          ? 'bg-[#1c74e9] text-white hover:opacity-90' 
          : 'bg-slate-100 dark:bg-slate-700 hover:bg-[#1c74e9] hover:text-white'
        }`}
      >
        {isAuction ? 'Place Bid' : 'Add to Cart'}
      </button>
    </div>
  );
};

export default ProductCard;