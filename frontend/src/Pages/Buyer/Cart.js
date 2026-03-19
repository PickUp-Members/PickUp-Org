import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../Hooks/useCart';
import { useAuth } from '../../Hooks/useAuth';
import { formatLKR } from '../../Utils/formatters';
import Button from '../../Components/Button';
import { Trash2, Minus, Plus, ShoppingCart } from 'lucide-react';
import { api } from '../../Services/api';
import Modal from '../../Components/Modal';

const Cart = () => {
  const { cartItems, updateQuantity, removeFromCart, clearCart, cartTotal, itemCount } = useCart();
  const { user } = useAuth();
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    if (!user) return;
    setLoading(true);
    // Mock API call
    await api.placeOrder(cartItems, user.id);
    clearCart();
    setLoading(false);
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-[#f6f7f8] py-12">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center py-20">
            <ShoppingCart className="w-24 h-24 text-slate-400 mx-auto mb-8" />
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Your cart is empty</h2>
            <p className="text-slate-500 mb-8 max-w-md mx-auto">
              Add items from the marketplace to get started.
            </p>
            <Button as={Link} to="/products" size="lg">Browse Products</Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f6f7f8] py-12">
      <div className="max-w-4xl mx-auto px-4 lg:px-20">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="p-8 border-b border-slate-200">
            <div className="flex items-center gap-2">
              <ShoppingCart size={24} />
              <h1 className="text-2xl font-bold">Shopping Cart</h1>
              <span className="ml-auto bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-sm font-bold">
                {itemCount} items
              </span>
            </div>
          </div>

          <div className="divide-y divide-slate-100">
            {cartItems.map(item => (
              <div key={item.productId} className="p-6 hover:bg-slate-50">
                <div className="flex gap-4">
                  <div className="w-20 h-20 bg-slate-200 rounded-xl flex-shrink-0 flex items-center justify-center">
                    P{item.productId}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-slate-900 truncate">Product {item.productId}</h3>
                    <p className="text-slate-500 text-sm mb-4">Fixed Price Item</p>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center bg-slate-100 rounded-lg p-2">
                        <button 
                          className="p-1 hover:bg-slate-200 rounded" 
                          onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                        >
                          <Minus size={16} />
                        </button>
                        <span className="mx-4 font-mono text-lg min-w-[3rem] text-center">{item.quantity}</span>
                        <button 
                          className="p-1 hover:bg-slate-200 rounded" 
                          onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                      <div className="text-right flex-1">
                        <div className="text-xl font-bold text-[#1c74e9]">
                          LKR {(item.quantity * 45000).toLocaleString()}
                        </div>
                      </div>
                    </div>
                  </div>
                  <button 
                    onClick={() => removeFromCart(item.productId)}
                    className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors self-start"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="p-8 bg-slate-50 border-t border-slate-200">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center sm:justify-between">
              <Button variant="ghost" onClick={() => setShowConfirm(true)} className="w-full sm:w-auto">
                Clear Cart
              </Button>
              <div className="text-right w-full sm:w-auto">
                <div className="text-2xl font-bold text-slate-900 mb-4">Total: {formatLKR(cartTotal)}</div>
                <Button 
                  size="lg" 
                  className="w-full" 
                  onClick={handleCheckout} 
                  loading={loading} 
                  disabled={!user}
                >
                  {user ? 'Proceed to Checkout' : 'Login to Checkout'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal isOpen={showConfirm} onClose={() => setShowConfirm(false)} title="Clear Cart?">
        <p className="text-slate-600 mb-4">This will remove all items from your cart. This action cannot be undone.</p>
        <div className="flex gap-3">
          <Button variant="danger" onClick={clearCart} className="flex-1">
            Clear All
          </Button>
          <Button variant="secondary" onClick={() => setShowConfirm(false)} className="flex-1">
            Cancel
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default Cart;