import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../../Context/CartContext';
import { useWishlist } from '../../Context/WishlistContext';
import { getAllProducts } from '../../Services/productService';
import { formatLKR, getMinBid } from '../../Utils/formatters';
import Button from '../../Components/Button';
import Input from '../../Components/Input';
import Modal from '../../Components/Modal';
import { ArrowLeft, Gavel, Clock, Users, Heart, ShoppingCart } from 'lucide-react';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const storedUser = JSON.parse(localStorage.getItem('user'));

  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const [bidAmount, setBidAmount] = useState('');
  const [showBidModal, setShowBidModal] = useState(false);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const results = await getAllProducts();

      if (results) {
        setProduct(results.slice(0, 8));
      }
      else {
        console.error("Failed to load products");
      }
    }
    catch (error) {
      console.error("Error loading products:", error);
    }
    finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadProducts();
  }, []);

  if (loading) return <div className="p-10">Loading...</div>;
  if (!product) return <div className="p-10">Not found</div>;

  const isAuction = product.type === 'AUCTION';
  const isOwner = storedUser?.id === product.sellerId;
  const isFavorite = isInWishlist(product.id);

  const toggleWishlist = () => {
    isFavorite ? removeFromWishlist(product.id) : addToWishlist(product);
  };

  return (
    <div className="p-6">
      <Button onClick={() => navigate(-1)}>
        <ArrowLeft /> Back
      </Button>

      <img src={product.img} alt="" className="w-full h-96 object-cover mt-4" />

      <h1 className="text-3xl font-bold mt-4">{product.title}</h1>
      <p>{product.description}</p>

      <h2 className="text-2xl font-black text-blue-600 mt-4">
        {isAuction
          ? formatLKR(product.currentBid || product.startPrice)
          : formatLKR(product.price)}
      </h2>

      {!isOwner && (
        isAuction ? (
          <Button onClick={() => setShowBidModal(true)}>
            <Gavel /> Bid
          </Button>
        ) : (
          <Button onClick={() => addToCart(product)}>
            <ShoppingCart /> Add to Cart
          </Button>
        )
      )}

      <Modal isOpen={showBidModal} onClose={() => setShowBidModal(false)} title="Bid">
        <Input
          type="number"
          value={bidAmount}
          onChange={(e) => setBidAmount(e.target.value)}
        />
        <Button>Place Bid</Button>
      </Modal>
    </div>
  );
};

export default ProductDetail;
