import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../Context/CartContext';
import { api } from '../../Services/api';
import { ArrowLeft, CreditCard, Truck, CheckCircle, Loader2 } from 'lucide-react';

const Checkout = () => {
  const navigate = useNavigate();
  const { cartItems, cartTotal, clearCart } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isOrdered, setIsOrdered] = useState(false);
  const [orderId, setOrderId] = useState('');

  const shipping = cartItems.length > 0 ? 15.00 : 0;
  const total = cartTotal + shipping;

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      const orderPayload = {
        items: cartItems,
        userId: "USER_123",
        totalAmount: total,
        shippingDetails: {
           name: e.target[0].value,
           email: e.target[1].value,
           address: e.target[2].value
        }
      };

      const response = await api.placeOrder(orderPayload);
      
      if (response.success) {
        setOrderId(response.orderId);
        setIsOrdered(true);
        
        setTimeout(() => {
          clearCart();
          navigate('/products');
        }, 3500);
      }
    } catch (error) {
      alert("Order placement failed. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  if (isOrdered) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white p-4">
        <div className="bg-green-50 p-10 rounded-[40px] flex flex-col items-center text-center shadow-xl border border-green-100">
          <CheckCircle size={80} className="text-green-500 mb-4 animate-bounce" />
          <h2 className="text-3xl font-black text-slate-900 mb-2">Order Successful!</h2>
          <div className="bg-white px-4 py-2 rounded-full border border-green-200 text-green-700 font-bold text-sm mb-6">Order ID: {orderId}</div>
          <p className="text-slate-400 text-sm animate-pulse">Redirecting you to the shop...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <button onClick={() => navigate('/cart')} className="flex items-center gap-2 text-slate-500 mb-8 hover:text-blue-600 font-bold transition-all">
          <ArrowLeft size={20} /> Back to Cart
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="bg-white p-8 md:p-10 rounded-[35px] shadow-sm border border-slate-100">
            <h2 className="text-2xl font-black mb-8 flex items-center gap-3">
              <div className="bg-blue-100 p-2 rounded-xl text-blue-600"><Truck size={24} /></div> Shipping Details
            </h2>
            <form onSubmit={handlePlaceOrder} className="space-y-5">
              <input type="text" placeholder="Full Name" required className="w-full p-4 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-blue-600/20 outline-none" />
              <input type="email" placeholder="Email Address" required className="w-full p-4 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-blue-600/20 outline-none" />
              <input type="text" placeholder="Delivery Address" required className="w-full p-4 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-blue-600/20 outline-none" />
              <div className="grid grid-cols-2 gap-4">
                <input type="text" placeholder="City" required className="w-full p-4 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-blue-600/20 outline-none" />
                <input type="text" placeholder="Zip Code" required className="w-full p-4 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-blue-600/20 outline-none" />
              </div>

              <h2 className="text-2xl font-black mt-10 mb-6 flex items-center gap-3">
                <div className="bg-blue-100 p-2 rounded-xl text-blue-600"><CreditCard size={24} /></div> Payment
              </h2>
              <div className="p-5 border-2 border-blue-600 bg-blue-50 rounded-2xl flex items-center gap-4">
                <div className="w-5 h-5 rounded-full border-4 border-blue-600 bg-white"></div>
                <span className="font-bold text-slate-800">Cash on Delivery</span>
              </div>
              
              <button type="submit" disabled={isProcessing || cartItems.length === 0} className="w-full bg-blue-600 text-white py-5 rounded-[22px] font-black text-lg mt-8 hover:bg-blue-700 shadow-xl disabled:opacity-50 flex items-center justify-center gap-3">
                {isProcessing ? <><Loader2 className="animate-spin" /> Processing...</> : `Confirm Order $${total.toLocaleString()}`}
              </button>
            </form>
          </div>

          <div className="bg-white p-8 md:p-10 rounded-[35px] shadow-sm border border-slate-100 h-fit sticky top-10">
            <h2 className="text-2xl font-black mb-8">Order Summary</h2>
            <div className="max-h-[300px] overflow-y-auto pr-2 space-y-4 mb-6">
              {cartItems.map(item => (
                <div key={item.productId} className="flex justify-between items-center gap-4">
                  <div className="flex items-center gap-3">
                    <img src={item.img} alt={item.title} className="w-12 h-12 object-cover rounded-lg" />
                    <div>
                      <p className="font-bold text-slate-800 text-sm line-clamp-1">{item.title}</p>
                      <p className="text-slate-400 text-xs">Qty: {item.quantity}</p>
                    </div>
                  </div>
                  <span className="font-bold text-slate-700 text-sm">${(item.price * item.quantity).toLocaleString()}</span>
                </div>
              ))}
            </div>
            <div className="border-t pt-6 text-2xl font-black text-blue-600 flex justify-between">
              <span>Total</span><span>${total.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;