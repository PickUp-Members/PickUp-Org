import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../../Context/CartContext';
import { useAuctionTimer } from '../../Hooks/useAuctionTimer';
import { mockProducts } from '../../Utils/mockData';
import { formatLKR, getMinBid } from '../../Utils/formatters';
import Button from '../../Components/Button';
import Input from '../../Components/Input';
import Modal from '../../Components/Modal';
import { ArrowLeft, ShoppingCart, Gavel, Clock, Users } from 'lucide-react';
import { useAuth } from '../../Hooks/useAuth';
import { api } from '../../Services/api';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { addToCart } = useCart();
  
  const [product, setProduct] = useState(null);
  const [bidAmount, setBidAmount] = useState('');
  const [showBidModal, setShowBidModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const { timeLeft, ended } = useAuctionTimer(product?.endTime);

  useEffect(() => {
    const found = mockProducts.find(p => p.id === parseInt(id));
    if (found) {
      setProduct(found);
      const initialMinBid = getMinBid(found.currentBid || found.startPrice);
      setBidAmount(initialMinBid.toString());
    }
  }, [id]);

  if (!product) return (
    <div className="flex h-screen flex-col items-center justify-center gap-4">
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-[#1c74e9] border-t-transparent"></div>
      <p className="text-slate-500 font-medium">Loading Product...</p>
    </div>
  );

  const isAuction = product.type === 'AUCTION';
  const isOwner = user?.id === product.sellerId;
  const minBid = getMinBid(product.currentBid || product.startPrice);

  const handleAddToCart = () => {
    addToCart(product); 
    alert(`${product.title} added to cart!`);
  };

  const handlePlaceBid = async () => {
    const amount = parseFloat(bidAmount);
    if (amount < minBid) {
      alert(`Minimum bid should be LKR ${minBid}`);
      return;
    }

    setLoading(true);
    try {
      const response = await api.placeBid(product.id, amount, user?.id);
      if (response.success) {
        setProduct({ ...product, currentBid: amount, bids: (product.bids || 0) + 1 });
        setShowBidModal(false);
        alert("Success! Your bid has been placed.");
      }
    } catch (error) {
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f6f7f8] pt-4 pb-12">
      <div className="max-w-6xl mx-auto px-4 lg:px-20 py-8">
        <Button variant="ghost" className="mb-8 hover:bg-white" onClick={() => navigate(-1)}>
          <ArrowLeft size={20} className="mr-2" />
          Back to products
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Product Image Section - Updated for better display */}
          <div className="space-y-4">
            <div className="overflow-hidden rounded-3xl shadow-2xl bg-white p-2">
               <img 
                 src={product.img} 
                 alt={product.title} 
                 className="w-full h-[450px] object-cover rounded-2xl hover:scale-[1.02] transition-transform duration-500"
                 onError={(e) => {
                   e.target.src = 'https://via.placeholder.com/600x450?text=Image+Not+Found';
                 }}
               />
            </div>
            <div className="flex gap-3">
              <div className="flex-1 bg-white border border-slate-100 rounded-2xl p-4 text-center shadow-sm">
                <Users size={20} className="mx-auto mb-1 text-[#1c74e9]" />
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Watchers</p>
                <p className="text-lg font-bold text-slate-700">18</p>
              </div>
              <div className="flex-1 bg-white border border-slate-100 rounded-2xl p-4 text-center shadow-sm">
                <Gavel size={20} className="mx-auto mb-1 text-amber-500" />
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Bids</p>
                <p className="text-lg font-bold text-slate-700">{product.bids || 0}</p>
              </div>
            </div>
          </div>

          {/* Product Info Section */}
          <div className="space-y-8">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest border ${
                  isAuction ? 'bg-amber-50 text-amber-600 border-amber-100' : 'bg-green-50 text-green-600 border-green-100'
                }`}>
                  {isAuction ? 'Live Auction' : 'Fixed Price'}
                </span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest bg-slate-100 px-3 py-1 rounded-lg">
                  {product.category}
                </span>
              </div>
              <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">{product.title}</h1>
              <p className="text-slate-500 leading-relaxed text-lg">{product.description}</p>
            </div>

            <div className="p-8 bg-white border border-slate-100 rounded-[2rem] shadow-xl shadow-slate-200/50">
              <div className="space-y-8">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                  <div className="space-y-1">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                      {isAuction ? 'Current Highest Bid' : 'Retail Price'}
                    </span>
                    <div className="flex items-baseline gap-1">
                      <span className="text-5xl font-black text-[#1c74e9]">
                        {isAuction ? formatLKR(product.currentBid || product.startPrice) : formatLKR(product.price)}
                      </span>
                    </div>
                  </div>
                  
                  {isAuction && (
                    <div className="flex items-center gap-3 bg-slate-50 border border-slate-100 p-4 rounded-2xl">
                      <div className={`p-2 rounded-lg ${ended ? 'bg-red-100' : 'bg-amber-100'}`}>
                        <Clock size={20} className={ended ? "text-red-600" : "text-amber-600"} />
                      </div>
                      <div className="flex flex-col">
                         <span className="text-[10px] text-slate-400 uppercase font-black">Ends In</span>
                         <span className={`font-mono text-xl font-bold ${ended ? "text-red-600" : "text-slate-800"}`}>{timeLeft}</span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-3">
                  {isAuction && !ended && !isOwner && (
                    <Button size="lg" className="w-full py-8 text-xl font-black rounded-2xl shadow-lg shadow-blue-200" onClick={() => setShowBidModal(true)}>
                      <Gavel size={24} className="mr-3" />
                      Place Your Bid
                    </Button>
                  )}

                  {!isAuction && !isOwner && (
                    <Button size="lg" className="w-full py-8 text-xl font-black rounded-2xl shadow-lg shadow-blue-200" onClick={handleAddToCart}>
                      <ShoppingCart size={24} className="mr-3" />
                      Add to Cart
                    </Button>
                  )}

                  {isOwner && (
                    <Button variant="secondary" size="lg" className="w-full py-8 text-xl font-bold rounded-2xl border-2 border-dashed border-slate-200">
                      Manage My Listing
                    </Button>
                  )}
                  
                  {ended && isAuction && (
                    <div className="bg-red-50 text-red-600 p-6 rounded-2xl text-center font-black border-2 border-red-100 text-lg uppercase tracking-widest">
                       Auction Closed
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bid Modal */}
      <Modal isOpen={showBidModal} onClose={() => setShowBidModal(false)} title="Place Your Bid">
        <div className="space-y-6 p-2">
          <div className="bg-gradient-to-br from-[#1c74e9] to-[#0d59c1] p-6 rounded-2xl text-white">
            <p className="text-sm opacity-80 mb-1 font-bold uppercase tracking-wider">Current Bid</p>
            <p className="text-4xl font-black">{formatLKR(product.currentBid || product.startPrice)}</p>
          </div>
          
          <Input
            type="number"
            label={`Your Bid Amount (LKR)`}
            placeholder={`Min. ${minBid}`}
            value={bidAmount}
            onChange={(e) => setBidAmount(e.target.value)}
            className="text-2xl font-black text-[#1c74e9] py-4"
          />
          <p className="text-xs text-slate-400 px-1 font-medium italic">* Bid must be at least LKR {minBid.toLocaleString()} or higher.</p>
          
          <div className="flex gap-4 pt-4">
            <Button size="lg" className="flex-[2] py-5 text-lg font-black rounded-xl" onClick={handlePlaceBid} loading={loading}>
              Confirm Bid
            </Button>
            <Button variant="ghost" size="lg" className="flex-1 py-5 text-slate-400 font-bold" onClick={() => setShowBidModal(false)}>
              Cancel
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ProductDetail;