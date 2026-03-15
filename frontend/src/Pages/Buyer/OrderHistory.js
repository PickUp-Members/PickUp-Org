import React, { useState } from 'react';
import { Calendar, PackageCheck, Gavel, Clock, Filter } from 'lucide-react';
import Button from '../../Components/Button';
import { formatLKR, formatDate } from '../../Utils/formatters';
import { mockBuyerOrders, mockBidHistory } from '../../Utils/mockData';
import { getStatusColor } from '../../Utils/formatters';

const OrderHistory = () => {
  const [activeTab, setActiveTab] = useState('orders');
  const [filter, setFilter] = useState('all');

  const orders = mockBuyerOrders.map(order => ({
    ...order,
    date: '2024-12-01',
    status: 'DELIVERED'
  }));

  const bids = mockBidHistory;

  const filteredOrders = orders.filter(order => filter === 'all' || order.status === filter);

  return (
    <div className="min-h-screen bg-[#f6f7f8] py-12">
      <div className="max-w-6xl mx-auto px-4 lg:px-20">
        <h1 className="text-3xl font-bold text-slate-900 mb-8">Order & Bid History</h1>

        {/* Tabs */}
        <div className="flex border-b border-slate-200 mb-8">
          <button 
            className={`pb-4 px-1 border-b-2 font-medium ${activeTab === 'orders' ? 'border-[#1c74e9] text-[#1c74e9]' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
            onClick={() => setActiveTab('orders')}
          >
            Purchases ({orders.length})
          </button>
          <button 
            className={`ml-8 pb-4 px-1 border-b-2 font-medium ${activeTab === 'bids' ? 'border-[#1c74e9] text-[#1c74e9]' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
            onClick={() => setActiveTab('bids')}
          >
            Bids ({bids.length})
          </button>
        </div>

        {activeTab === 'orders' && (
          <div>
            <div className="flex items-center gap-2 mb-6">
              <Filter size={20} />
              <select 
                className="border border-slate-200 rounded-xl px-4 py-2 focus:ring-2 focus:ring-[#1c74e9]"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="DELIVERED">Delivered</option>
                <option value="PENDING">Pending</option>
                <option value="CANCELLED">Cancelled</option>
              </select>
            </div>
            
            <div className="space-y-4">
              {filteredOrders.map(order => (
                <div key={order.id} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-all">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <PackageCheck size={24} className="text-green-500" />
                      <div>
                        <h3 className="font-bold text-lg">Order #{order.id}</h3>
                        <p className="text-slate-500">{formatDate(order.date)}</p>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(order.status).replace('bg-', 'border- bg-')}`}>
                      {order.status}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                    <div>Product: Sony Headphones</div>
                    <div>Total: {formatLKR(order.total)}</div>
                    <div>Qty: 1</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'bids' && (
          <div className="space-y-4">
            {bids.map((bid, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                <div className="flex items-start gap-4">
                  <Gavel size={24} className="text-slate-500 mt-1 flex-shrink-0" />
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-bold text-lg">Omega Watch Auction</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-bold ${getStatusColor(bid.status)}`}>
                        {bid.status}
                      </span>
                    </div>
                    <p className="text-slate-500 mb-3">Your bid: {formatLKR(bid.bidAmount)}</p>
                    <div className="flex gap-4 text-sm text-slate-500">
                      <div className="flex items-center gap-1">
                        <Clock size={14} />
                        <span>2d 14h left</span>
                      </div>
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