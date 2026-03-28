import React, { useState } from 'react';
import { PackageCheck, Gavel, Clock, Filter } from 'lucide-react';
import { formatLKR, formatDate } from '../../Utils/formatters';
import { mockBuyerOrders, mockBidHistory } from '../../Utils/mockData';
import { getStatusColor } from '../../Utils/formatters';

const OrderHistory = () => {
  const [activeTab, setActiveTab] = useState('orders');
  const [filter, setFilter] = useState('all');

  const orders = mockBuyerOrders.map(order => ({
    ...order,
    date: order.date || '2026-03-01', 
    status: order.status || 'DELIVERED'
  }));

  const bids = mockBidHistory;

  const filteredOrders = orders.filter(order => filter === 'all' || order.status === filter);

  return (
    <div className="min-h-screen bg-[#f6f7f8] py-12">
      <div className="max-w-6xl mx-auto px-4 lg:px-20">
        <h1 className="text-4xl font-black text-slate-900 mb-10 tracking-tight">Order & Bid History</h1>

        {/* Tabs */}
        <div className="flex border-b border-slate-200 mb-10">
          <button 
            className={`pb-4 px-2 border-b-4 font-bold text-lg transition-all ${activeTab === 'orders' ? 'border-[#1c74e9] text-[#1c74e9]' : 'border-transparent text-slate-400 hover:text-slate-600'}`}
            onClick={() => setActiveTab('orders')}
          >
            Purchases ({orders.length})
          </button>
          <button 
            className={`ml-10 pb-4 px-2 border-b-4 font-bold text-lg transition-all ${activeTab === 'bids' ? 'border-[#1c74e9] text-[#1c74e9]' : 'border-transparent text-slate-400 hover:text-slate-600'}`}
            onClick={() => setActiveTab('bids')}
          >
            Bids ({bids.length})
          </button>
        </div>

        {activeTab === 'orders' && (
          <div className="animate-in fade-in duration-500">
            <div className="flex items-center gap-3 mb-8 bg-white w-fit p-2 rounded-2xl shadow-sm border border-slate-100">
              <div className="bg-slate-100 p-2 rounded-xl">
                <Filter size={18} className="text-slate-600" />
              </div>
              <select 
                className="bg-transparent border-none font-bold text-slate-600 focus:ring-0 cursor-pointer pr-8"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              >
                <option value="all">All Orders</option>
                <option value="DELIVERED">Delivered</option>
                <option value="PENDING">Pending</option>
                <option value="CANCELLED">Cancelled</option>
              </select>
            </div>
            
            <div className="space-y-6">
              {filteredOrders.length > 0 ? filteredOrders.map(order => (
                <div key={order.id} className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100 hover:shadow-xl hover:shadow-blue-900/5 transition-all group">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                    <div className="flex items-center gap-4">
                      <div className="bg-green-50 p-4 rounded-2xl group-hover:scale-110 transition-transform">
                        <PackageCheck size={28} className="text-green-500" />
                      </div>
                      <div>
                        <h3 className="font-black text-xl text-slate-900">Order #{order.id}</h3>
                        <p className="text-slate-400 font-bold text-sm uppercase tracking-wide">{formatDate(order.date)}</p>
                      </div>
                    </div>
                    <span className={`w-fit px-5 py-2 rounded-xl text-xs font-black tracking-widest uppercase border ${getStatusColor(order.status).replace('bg-', 'border- bg-')}`}>
                      {order.status}
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-slate-50">
                    <div className="bg-slate-50 p-4 rounded-2xl">
                      <p className="text-xs font-bold text-slate-400 uppercase mb-1">Total Amount</p>
                      <p className="font-black text-lg text-blue-600">{formatLKR(order.total)}</p>
                    </div>
                    <div className="bg-slate-50 p-4 rounded-2xl">
                      <p className="text-xs font-bold text-slate-400 uppercase mb-1">Items Qty</p>
                      <p className="font-black text-lg text-slate-700">01 Item</p>
                    </div>
                    <div className="bg-slate-50 p-4 rounded-2xl">
                      <p className="text-xs font-bold text-slate-400 uppercase mb-1">Payment Method</p>
                      <p className="font-black text-lg text-slate-700">Cash on Delivery</p>
                    </div>
                  </div>
                </div>
              )) : (
                <div className="text-center py-20 bg-white rounded-[3rem] border border-dashed border-slate-200">
                  <p className="text-slate-400 font-bold">No orders found matching this filter.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'bids' && (
          <div className="space-y-6 animate-in fade-in duration-500">
            {bids.map((bid, index) => (
              <div key={index} className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100 hover:shadow-xl transition-all">
                <div className="flex flex-col md:flex-row md:items-start gap-6">
                  <div className="bg-amber-50 p-5 rounded-3xl h-fit">
                    <Gavel size={32} className="text-amber-500" />
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3 mb-3">
                      <h3 className="font-black text-2xl text-slate-900">Omega Watch Auction</h3>
                      <span className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest ${getStatusColor(bid.status)}`}>
                        {bid.status}
                      </span>
                    </div>
                    <p className="text-slate-500 font-bold text-lg mb-5">
                      Your Highest Bid: <span className="text-blue-600">{formatLKR(bid.bidAmount)}</span>
                    </p>
                    <div className="flex items-center gap-2 bg-slate-50 w-fit px-4 py-2 rounded-xl text-slate-500 font-bold text-sm">
                      <Clock size={16} />
                      <span>Auction ends in 2d 14h</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderHistory;