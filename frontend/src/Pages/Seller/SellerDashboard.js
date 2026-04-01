import React, { useState, useEffect } from 'react';
import { useAuth } from '../../Hooks/useAuth';
import { PlusCircle, Package, DollarSign, Truck, Gavel, BarChart3, Users } from 'lucide-react'; 
import { mockSellerListings, mockSellerSales, mockSellerBids } from '../../Utils/mockData';
import { formatLKR } from '../../Utils/formatters';
import Button from '../../Components/Button';
import { Link } from 'react-router-dom';

const SellerDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('listings');
  const [listings, setListings] = useState([]);
  const [sales, setSales] = useState([]);
  const [bids, setBids] = useState([]);

  useEffect(() => {
    // Mimicking API load
    setListings(mockSellerListings);
    setSales(mockSellerSales);
    setBids(mockSellerBids);
  }, []);

  const stats = [
    { label: 'Total Revenue', value: formatLKR(90000), icon: DollarSign, color: 'text-emerald-500', bg: 'bg-emerald-50' },
    { label: 'Active Listings', value: listings.length, icon: Package, color: 'text-blue-500', bg: 'bg-blue-50' },
    { label: 'Pending Bids', value: bids.length, icon: Gavel, color: 'text-amber-500', bg: 'bg-amber-50' },
    { label: 'Total Orders', value: sales.length, icon: Users, color: 'text-purple-500', bg: 'bg-purple-50' },
  ];

  return (
    <div className="min-h-screen bg-[#f6f7f8] py-12 px-6 font-display">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
          <div>
            <h1 className="text-5xl font-black text-slate-900 tracking-tighter">Shop Dashboard</h1>
            <p className="text-slate-400 font-black mt-2 uppercase text-[10px] tracking-[0.3em]">
              Welcome back, <span className="text-blue-600">{user?.fullName || 'Chamara Perera'}</span>
            </p>
          </div>
          <Button as={Link} to="/seller/add-listing" className="rounded-[1.5rem] px-8 py-4 shadow-2xl shadow-blue-300 transition-transform hover:scale-105 active:scale-95">
            <PlusCircle size={20} className="mr-3" /> <span className="font-black">List New Product</span>
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, i) => (
            <div key={i} className="bg-white p-10 rounded-[2.5rem] shadow-xl shadow-blue-900/5 border border-slate-50 transition-all hover:shadow-2xl group">
              <div className={`w-14 h-14 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform`}>
                <stat.icon size={28} />
              </div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">{stat.label}</p>
              <h3 className="text-4xl font-black text-slate-900">{stat.value}</h3>
            </div>
          ))}
        </div>

        {/* Content Tabs */}
        <div className="bg-white rounded-[3rem] shadow-sm border border-slate-100 overflow-hidden">
          <div className="flex border-b border-slate-50 p-4 gap-2">
            {[
              { id: 'listings', label: 'My Listings', icon: Package },
              { id: 'orders', label: 'Incoming Orders', icon: Truck },
              { id: 'bids', label: 'Recent Bids', icon: Gavel }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-3 px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all ${activeTab === tab.id ? 'bg-blue-50 text-blue-600' : 'text-slate-400 hover:bg-slate-50'}`}
              >
                <tab.icon size={16} /> {tab.label}
              </button>
            ))}
          </div>

          <div className="p-10">
            {activeTab === 'listings' && (
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-300">
                      <th className="pb-6 px-4">Product</th>
                      <th className="pb-6 px-4">Type</th>
                      <th className="pb-6 px-4">Status</th>
                      <th className="pb-6 px-4 text-right">Price</th>
                      <th className="pb-6 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {listings.map(item => (
                      <tr key={item.id} className="group hover:bg-slate-50/50 transition-colors">
                        <td className="py-6 px-4 font-black text-slate-900">Product #{item.productId || item.id}</td>
                        <td className="py-6 px-4">
                          <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-lg text-[10px] font-black">{item.type || 'FIXED'}</span>
                        </td>
                        <td className="py-6 px-4">
                          <span className="px-3 py-1 bg-green-50 text-green-600 rounded-lg text-[10px] font-black uppercase">Active</span>
                        </td>
                        <td className="py-6 px-4 text-right font-black text-slate-900">LKR 45,000</td>
                        <td className="py-6 px-4 text-right">
                          <button className="text-slate-400 font-black text-xs hover:text-blue-600 transition-colors">Edit</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === 'bids' && (
               <div className="space-y-4">
               {bids.map((bid, i) => (
                 <div key={i} className="flex items-center justify-between p-6 bg-slate-50 rounded-3xl border border-slate-100 hover:border-blue-200 transition-all">
                    <div className="flex items-center gap-5">
                        <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-amber-500 shadow-sm">
                            <Gavel size={20} />
                        </div>
                        <div>
                            <p className="font-black text-slate-900 text-sm">New bid on Auction #{bid.productId}</p>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">2 minutes ago</p>
                        </div>
                    </div>
                    <span className="text-xl font-black text-blue-600">{formatLKR(bid.amount)}</span>
                 </div>
               ))}
             </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerDashboard;