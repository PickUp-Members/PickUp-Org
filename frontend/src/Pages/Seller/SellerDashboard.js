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
    setListings(mockSellerListings);
    setSales(mockSellerSales);
    setBids(mockSellerBids);
  }, []);

  const totalRevenue = sales.reduce((sum, sale) => sum + (sale.revenue || 0), 0);
  const activeListings = listings.filter(l => l.status === 'ACTIVE').length;

  const markShipped = (orderId) => console.log('Marked shipped:', orderId);
  const endAuctionEarly = (listingId) => console.log('Ended auction:', listingId);
  const rejectOrder = (orderId) => console.log('Rejected order:', orderId);

  return (
    <div className="min-h-screen bg-[#f6f7f8] py-8 px-4 font-display">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-10">
          <div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">Shop Dashboard</h1>
            <p className="text-slate-500 font-bold mt-1 uppercase text-xs tracking-widest">Welcome back, {user?.fullName}</p>
          </div>
          <Button as={Link} to="/seller/add-listing" size="lg" className="rounded-2xl shadow-xl shadow-blue-200">
            <PlusCircle size={20} className="mr-2" /> List New Product
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <StatCard icon={DollarSign} color="emerald" label="Total Revenue" value={formatLKR(totalRevenue)} />
          <StatCard icon={Package} color="blue" label="Active Listings" value={activeListings} />
          <StatCard icon={Gavel} color="amber" label="Pending Bids" value={bids.length} />
          <StatCard icon={Users} color="purple" label="Total Orders" value={sales.length} />
        </div>

        {/* Tabs & Content */}
        <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
          <div className="border-b border-slate-100 bg-slate-50/50">
            <div className="flex overflow-x-auto no-scrollbar">
              {[
                { id: 'listings', label: 'My Listings', icon: Package },
                { id: 'orders', label: 'Incoming Orders', icon: Truck },
                { id: 'bids', label: 'Recent Bids', icon: Gavel },
                { id: 'analytics', label: 'Sales Analytics', icon: BarChart3 }
              ].map(tab => (
                <button
                  key={tab.id}
                  className={`flex items-center gap-2 px-8 py-5 font-bold transition-all whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'bg-white text-[#1c74e9] border-b-4 border-[#1c74e9]'
                      : 'text-slate-400 hover:text-slate-600'
                  }`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  <tab.icon size={18} /> {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="p-8">
            {activeTab === 'listings' && <ListingTable listings={listings} endAuctionEarly={endAuctionEarly} />}
            {activeTab === 'orders' && <OrderTable sales={sales} markShipped={markShipped} rejectOrder={rejectOrder} />}
            {activeTab === 'bids' && <BidsList bids={bids} />}
            {activeTab === 'analytics' && <div className="text-center py-20 font-bold text-slate-400 uppercase tracking-widest text-sm">Analytics Engine Coming Soon</div>}
          </div>
        </div>
      </div>
    </div>
  );
};

// Sub-components to keep code clean
const StatCard = ({ icon: Icon, color, label, value }) => (
  <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group">
    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 bg-${color}-50 text-${color}-600 group-hover:scale-110 transition-transform`}>
      <Icon size={24} />
    </div>
    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{label}</p>
    <h3 className="text-3xl font-black text-slate-900 tracking-tight">{value}</h3>
  </div>
);

const ListingTable = ({ listings, endAuctionEarly }) => (
  <div className="overflow-x-auto">
    <table className="w-full text-left">
      <thead className="text-[10px] font-black uppercase tracking-widest text-slate-400 border-b border-slate-100">
        <tr>
          <th className="pb-4 px-4">Product</th>
          <th className="pb-4 px-4">Type</th>
          <th className="pb-4 px-4">Status</th>
          <th className="pb-4 px-4 text-right">Price</th>
          <th className="pb-4 px-4 text-right">Actions</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-slate-50 font-bold text-sm">
        {listings.map(listing => (
          <tr key={listing.productId} className="hover:bg-slate-50/50 group transition-colors">
            <td className="py-5 px-4 text-slate-900">Product #{listing.productId}</td>
            <td className="py-5 px-4"><span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-lg text-xs">FIXED</span></td>
            <td className="py-5 px-4"><span className="px-3 py-1 bg-green-50 text-green-600 rounded-lg text-xs uppercase">Active</span></td>
            <td className="py-5 px-4 text-right text-slate-900 font-black">LKR 45,000</td>
            <td className="py-5 px-4 text-right flex justify-end gap-2">
              <Button size="sm" variant="ghost" className="rounded-xl">Edit</Button>
              <Button size="sm" variant="danger" className="rounded-xl opacity-0 group-hover:opacity-100" onClick={() => endAuctionEarly(listing.productId)}>Stop</Button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const OrderTable = ({ sales, markShipped, rejectOrder }) => (
  <div className="overflow-x-auto">
    <table className="w-full text-left font-bold text-sm">
      <thead className="text-[10px] font-black uppercase tracking-widest text-slate-400 border-b border-slate-100">
        <tr><th className="pb-4 px-4">Order ID</th><th className="pb-4 px-4">Buyer</th><th className="pb-4 px-4 text-right">Revenue</th><th className="pb-4 px-4 text-right">Status</th><th className="pb-4 px-4 text-right">Actions</th></tr>
      </thead>
      <tbody className="divide-y divide-slate-50">
        {sales.map(sale => (
          <tr key={sale.orderId} className="group">
            <td className="py-5 px-4">#OO{sale.orderId}</td>
            <td className="py-5 px-4 text-slate-500">Customer</td>
            <td className="py-5 px-4 text-right font-black text-emerald-600">{formatLKR(sale.revenue)}</td>
            <td className="py-5 px-4 text-right"><span className="px-3 py-1 bg-orange-50 text-orange-600 rounded-lg text-[10px]">PENDING</span></td>
            <td className="py-5 px-4 text-right flex justify-end gap-2">
              <Button size="sm" className="rounded-xl" onClick={() => markShipped(sale.orderId)}>Ship</Button>
              <Button size="sm" variant="ghost" className="rounded-xl text-red-500" onClick={() => rejectOrder(sale.orderId)}>Reject</Button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const BidsList = ({ bids }) => (
  <div className="grid gap-4">
    {bids.map(bid => (
      <div key={bid.productId} className="p-6 bg-slate-50 rounded-2xl flex justify-between items-center border border-slate-100 hover:border-blue-200 transition-colors">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm text-amber-500"><Gavel size={20}/></div>
          <span className="font-bold">New bid on Auction #{bid.productId}</span>
        </div>
        <span className="font-black text-lg text-blue-600">{formatLKR(bid.amount)}</span>
      </div>
    ))}
  </div>
);

export default SellerDashboard;