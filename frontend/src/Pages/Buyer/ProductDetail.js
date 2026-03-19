import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from '../../Hooks/useCart';
import { useAuctionTimer } from '../../Hooks/useAuctionTimer';
import { mockProducts } from '../../Utils/mockData';
import { formatLKR, timeRemaining, getMinBid } from '../../Utils/formatters';
import Button from '../../Components/Button';
import Input from '../../Components/Input';
import Modal from '../../Components/Modal';
import { ArrowLeft, ShoppingCart, Gavel, Clock, Users } from 'lucide-react';
import { useAuth } from '../../Hooks/useAuth';
import { api } from '../../Services/api';

const ProductDetail = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [bidAmount, setBidAmount] = useState('');
  const [showBidModal, setShowBidModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const { timeLeft, ended } = useAuctionTimer(product?.endTime);

  useEffect(() => {
    const found = mockProducts.find(p => p.id === parseInt(id));
    setProduct(found);
  }, [id]);

  if (!product) return <div>Loading...</div>;

  const isAuction = product.type === 'AUCTION';
  const isOwner = user?.id === product.sellerId;
  const minBid = getMinBid(product.currentBid || product.startPrice);

  const handleAddToCart = async () => {
    addToCart(product.id, 1);
  };

  const handlePlaceBid = async () => {
    if (parseFloat(bidAmount) < minBid) return;
    setLoading(true);
    // Mock API
    await api.placeBid(product.id, parseFloat(bidAmount), user.id);
    product.currentBid = parseFloat(bidAmount);
    setShowBidModal(false);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#f6f7f8] pt-4">
      <div className="max-w-6xl mx-auto px-4 lg:px-20 py-8">
        <Button variant="ghost" className="mb-8">
          <ArrowLeft size={20} className="mr-2" />
          Back to products
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Product Image */}
          <div className="space-y-4">
            <img src={product.img} alt={product.title} className="w-full h-96 object-cover rounded-2xl shadow-xl" />
            <div className="flex gap-2">
              <div className="flex-1 bg-slate-50 rounded-xl p-3 text-center">
                <Users size={16} className="mx-auto mb-1 text-slate-500" />
                <p className="text-xs text-slate-600">18 watchers</p>
              </div>
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
                isAuction ? 'bg-amber-100 text-amber-800' : 'bg-green-100 text-green-800'
              }`}>
                {isAuction ? 'Live Auction' : 'Fixed Price'}
              </span>
              <h1 className="text-3xl font-bold mt-2">{product.title}</h1>
              <p className="text-slate-500">{product.category} • {product.description}</p>
            </div>

            <div className="p-6 bg-slate-50 rounded-2xl">
              <div className="space-y-4">
                <div className="flex items-baseline gap-4">
                  <span className="text-3xl font-black text-[#1c74e9]">
                    {isAuction ? formatLKR(product.currentBid || product.startPrice) : formatLKR(product.price)}
                  </span>
                  {isAuction && (
                    <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg">
                      <Clock size={16} />
                      <span className="font-mono text-sm">{timeLeft}</span>
                    </div>
                  )}
                </div>

                {isAuction && !ended && !isOwner && (
                  <Button size="lg" className="w-full" onClick={() => setShowBidModal(true)}>
                    <Gavel size={20} className="mr-2" />
                    Place Bid
                  </Button>
                )}

                {!isAuction && !isOwner && (
                  <Button size="lg" className="w-full" onClick={handleAddToCart}>
                    <ShoppingCart size={20} className="mr-2" />
                    Add to Cart
                  </Button>
                )}

                {isOwner && (
                  <Button variant="secondary" size="lg" className="w-full">
                    Manage Listing
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bid Modal */}
      <Modal isOpen={showBidModal} onClose={() => setShowBidModal(false)} title="Place Your Bid">
        <div className="space-y-4">
          <p className="text-slate-600">
            Current bid: <span className="font-bold text-[#1c74e9]">{formatLKR(product.currentBid || product.startPrice)}</span>
          </p>
          <Input
            type="number"
            label="Your bid (minimum LKR {minBid.toLocaleString()})"
            value={bidAmount}
            onChange={(e) => setBidAmount(e.target.value)}
            error={parseFloat(bidAmount) < minBid ? 'Bid must be higher than current' : ''}
          />
          <div className="flex gap-3 pt-4">
            <Button size="lg" className="flex-1" onClick={handlePlaceBid} loading={loading}>
              Place Bid Now
            </Button>
            <Button variant="secondary" size="lg" onClick={() => setShowBidModal(false)}>
              Cancel
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ProductDetail;