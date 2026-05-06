import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../../Context/CartContext';
import { useWishlist } from '../../Context/WishlistContext';
import { useAuctionTimer } from '../../Hooks/useAuctionTimer';
import { useAuth } from '../../Hooks/useAuth';
import productsData from '../../data/products'; // local data source
import { formatLKR, getMinBid } from '../../Utils/formatters';
import Button from '../../Components/Button';
import Input from '../../Components/Input';
import Modal from '../../Components/Modal';
import { ChevronLeft, ShoppingCart, Users, Gavel, Clock, Heart } from 'lucide-react';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  const [product, setProduct] = useState(null);
  const [bidAmount, setBidAmount] = useState('');
  const [showBidModal, setShowBidModal] = useState(false);
  const [bidError, setBidError] = useState('');
  const [bidSuccess, setBidSuccess] = useState('');
  const [isSubmittingBid, setIsSubmittingBid] = useState(false);

  // 1. Load Product Data from Local source
  useEffect(() => {
    const found = productsData.find((p) => p.id === id);
    if (found) {
      setProduct(found);
      const initialBid = getMinBid(found.currentBid || found.startPrice || 0);
      setBidAmount(initialBid.toString());
    }
  }, [id]);

  // 2. Logic for Auction Timer
  const { timeLeft, ended } = useAuctionTimer(product?.endTime);

  if (!product) return <div className="h-screen flex items-center justify-center font-black text-slate-400">Product Not Found</div>;

  const isAuction = product.type === "AUCTION";
  const isFavorite = isInWishlist(product.id);
  const minBidValue = getMinBid(product.currentBid || product.startPrice || 0);

  const handlePlaceBid = async () => {
    setBidError('');
    setIsSubmittingBid(true);

    // Simulation of API bid placement
    setTimeout(() => {
      setBidSuccess('Your bid has been placed successfully!');
      setShowBidModal(false);
      setIsSubmittingBid(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-white font-display">
      <div className="max-w-7xl mx-auto px-4 lg:px-20 py-8">
        
        {/* Navigation & Wishlist Header */}
        <div className="flex justify-between items-center mb-8">
          <button 
            onClick={() => navigate(-1)} 
            className="flex items-center gap-2 text-slate-500 font-bold text-sm hover:text-blue-600 transition-all"
          >
            <ChevronLeft size={20} /> Back to Marketplace
          </button>
          
          <button
            onClick={() => isFavorite ? removeFromWishlist(product.id) : addToWishlist(product)}
            className={`p-4 rounded-2xl shadow-sm border transition-all ${isFavorite ? 'bg-red-50 border-red-100 text-red-500' : 'bg-white text-slate-400'}`}
          >
            <Heart size={24} fill={isFavorite ? 'currentColor' : 'none'} />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          {/* LEFT: Media & Stats Section */}
          <div className="space-y-8">
            <div className="aspect-square rounded-[3rem] overflow-hidden bg-slate-100 shadow-2xl border-8 border-white">
              <img 
                src={product.images ? product.images[0] : product.img} 
                alt={product.title} 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
            
            {/* Stats Cards (Watchers & Bids) */}
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-slate-50 p-8 rounded-[2.5rem] text-center border border-slate-100">
                <Users className="mx-auto text-blue-500 mb-2" size={28} />
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Watchers</p>
                <p className="text-2xl font-black text-slate-800">18</p>
              </div>
              <div className="bg-slate-50 p-8 rounded-[2.5rem] text-center border border-slate-100">
                <Gavel className="mx-auto text-amber-500 mb-2" size={28} />
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Bids</p>
                <p className="text-2xl font-black text-slate-800">{isAuction ? "5" : "0"}</p>
              </div>
            </div>
          </div>

          {/* RIGHT: Content Section */}
          <div className="py-4">
            {isAuction && (
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-50 text-amber-600 rounded-full text-xs font-black tracking-widest mb-6 border border-amber-100">
                <Clock size={14} /> LIVE AUCTION
              </div>
            )}
            
            <h1 className="text-5xl font-black text-slate-900 leading-[1.1] mb-6">{product.title}</h1>
            <p className="text-lg text-slate-500 font-medium leading-relaxed mb-10">
              {product.description || "Premium high-quality item available for immediate purchase or bidding through our verified secure marketplace."}
            </p>

            {/* Pricing Box[cite: 2] */}
            <div className="bg-slate-50 rounded-[3rem] p-10 border border-slate-100 mb-10 shadow-sm relative overflow-hidden">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                <div>
                  <span className="text-xs font-black text-slate-400 uppercase tracking-widest">
                    {isAuction ? "Current Bid" : "Price"}
                  </span>
                  <p className="text-6xl font-black text-blue-600 mt-2">
                    {formatLKR(isAuction ? product.currentBid : product.price)}
                  </p>
                </div>

                {isAuction && (
                  <div className="bg-white px-6 py-4 rounded-3xl shadow-sm border border-slate-100 text-center min-w-[140px]">
                    <p className="text-[10px] font-black text-slate-400 uppercase mb-1">Time Left</p>
                    <p className={`font-mono text-xl font-black ${ended ? 'text-red-600' : 'text-slate-800'}`}>
                      {timeLeft}
                    </p>
                  </div>
                )}
              </div>
              
              {bidSuccess && (
                <div className="mt-8 p-4 bg-green-100 text-green-700 rounded-2xl font-bold text-sm text-center">
                  {bidSuccess}
                </div>
              )}

              <button 
                onClick={() => {
                  if (isAuction) {
                    if (!user) navigate('/login');
                    else setShowBidModal(true);
                  } else {
                    addToCart(product);
                  }
                }}
                disabled={isAuction && ended}
                className={`w-full mt-10 py-6 rounded-3xl font-black flex items-center justify-center gap-3 transition-all shadow-xl active:scale-95 ${
                  isAuction 
                  ? 'bg-slate-900 text-white hover:bg-black shadow-slate-200' 
                  : 'bg-blue-600 text-white hover:bg-blue-700 shadow-blue-200'
                } ${isAuction && ended ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {isAuction ? <Gavel size={24} /> : <ShoppingCart size={24} />}
                {isAuction ? (ended ? "Auction Closed" : "Place a Bid") : "Add to Cart"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Place Bid Modal */}
      <Modal isOpen={showBidModal} onClose={() => setShowBidModal(false)} title="Place Your Bid">
        <div className="space-y-6 p-2">
          {bidError && (
            <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-bold text-red-600 text-center">
              {bidError}
            </div>
          )}
          <Input
            type="number"
            label="Your Bid Amount (LKR)"
            placeholder={`Minimum Bid: LKR ${minBidValue}`}
            value={bidAmount}
            onChange={(e) => setBidAmount(e.target.value)}
          />
          <Button 
            size="lg" 
            className="w-full py-5 text-lg font-black rounded-2xl bg-blue-600 hover:bg-blue-700" 
            onClick={handlePlaceBid} 
            disabled={isSubmittingBid}
          >
            {isSubmittingBid ? 'Validating...' : 'Confirm Bid'}
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default ProductDetail;