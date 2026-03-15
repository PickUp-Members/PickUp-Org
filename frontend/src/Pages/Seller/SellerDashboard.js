import React, { useState, useEffect } from 'react';
import { useAuth } from '../../Hooks/useAuth';
import { PlusCircle, Package, DollarSign, ListFilter, Truck, Gavel, BarChart3, Users } from 'lucide-react';
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

  const totalRevenue = sales.reduce((sum, sale) => sum + sale.revenue, 0);
  const activeListings = listings.filter(l => l.status === 'ACTIVE').length;

  const markShipped = (orderId) => {
    // Mock API
    console.log('Marked shipped:', orderId);
  };

  const endAuctionEarly = (listingId) => {
    // Mock API
    console.log('Ended auction:', listingId);
  };

  const rejectOrder = (orderId) => {
    // Mock API
    console.log('Rejected order:', orderId);
  };

  return (
    <div className="min-h-screen bg-[#f6f7f8] py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Shop Dashboard</h1>
            <p className="text-slate-500">Manage listings, orders and track your performance, {user?.fullName}</p>
          </div>
          <Button as={Link} to="/seller/add-listing" size="lg">
            <PlusCircle size={20} className="mr-2" />
            List New Product
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-emerald-100 text-emerald-600 rounded-xl">
                <DollarSign size={20} />
              </div>
            </div>
            <p className="text-sm text-slate-500 mb-2">Total Revenue</p>
            <h3 className="text-3xl font-bold text-slate-900">{formatLKR(totalRevenue)}</h3>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-blue-100 text-blue-600 rounded-xl">
                <Package size={20} />
              </div>
            </div>
            <p className="text-sm text-slate-500 mb-2">Active Listings</p>
            <h3 className="text-3xl font-bold text-slate-900">{activeListings}</h3>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-amber-100 text-amber-600 rounded-xl">
                <Gavel size={20} />
              </div>
            </div>
            <p className="text-sm text-slate-500 mb-2">Pending Bids</p>
            <h3 className="text-3xl font-bold text-slate-900">{bids.length}</h3>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-purple-100 text-purple-600 rounded-xl">
                <Users size={20} />
              </div>
            </div>
            <p className="text-sm text-slate-500 mb-2">Total Orders</p>
            <h3 className="text-3xl font-bold text-slate-900">{sales.length}</h3>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="border-b border-slate-200">
            <div className="flex">
              {[
                { id: 'listings', label: 'Active Listings', icon: Package },
                { id: 'orders', label: 'Orders', icon: Truck },
                { id: 'bids', label: 'Bids', icon: Gavel },
                { id: 'analytics', label: 'Analytics', icon: BarChart3 }
              ].map(tab => (
                <button
                  key={tab.id}
                  className={`flex items-center gap-2 px-6 py-4 font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'border-b-2 border-[#1c74e9] text-[#1c74e9]'
                      : 'text-slate-500 hover:text-slate-700 hover:border-b-2 hover:border-slate-200'
                  }`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  <tab.icon size={18} />
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Listings Tab */}
          {activeTab === 'listings' && (
            <div className="p-6">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-slate-50 text-slate-600 uppercase">
                    <tr>
                      <th className="px-4 py-3 text-left">Product</th>
                      <th className="px-4 py-3 text-left">Type</th>
                      <th className="px-4 py-3 text-left">Status</th>
                      <th className="px-4 py-3 text-right">Price/Bid</th>
                      <th className="px-4 py-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {listings.map(listing => (
                      <tr key={listing.productId} className="hover:bg-slate-50">
                        <td className="px-4 py-4 font-medium">Product #{listing.productId}</td>
                        <td className="px-4 py-4">
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">Fixed</span>
                        </td>
                        <td className="px-4 py-4">
                          <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Active</span>
                        </td>
                        <td className="px-4 py-4 text-right font-bold text-[#1c74e9]">LKR 45,000</td>
                        <td className="px-4 py-4 text-right">
                          <Button size="sm" variant="ghost">Edit</Button>
                          <Button size="sm" variant="danger" onClick={() => endAuctionEarly(listing.productId)}>End Early</Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Orders Tab */}
          {activeTab === 'orders' && (
            <div className="p-6">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="px-4 py-3 text-left">Order</th>
                      <th className="px-4 py-3 text-left">Buyer</th>
                      <th className="px-4 py-3 text-left">Product</th>
                      <th className="px-4 py-3 text-right">Amount</th>
                      <th className="px-4 py-3 text-right">Status</th>
                      <th className="px-4 py-3 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {sales.map(sale => (
                      <tr key={sale.orderId} className="hover:bg-slate-50">
                        <td className="px-4 py-4">#OO{sale.orderId}</td>
                        <td className="px-4 py-4">Buyer Name</td>
                        <td className="px-4 py-4">Headphones</td>
                        <td className="px-4 py-4 text-right font-bold">{formatLKR(sale.revenue)}</td>
                        <td className="px-4 py-4">
                          <span className="px-2 py-1 bg-orange-100 text-orange-800 text-xs rounded-full">Pending</span>
                        </td>
                        <td className="px-4 py-4 space-x-2">
                          <Button size="sm" variant="ghost" onClick={() => markShipped(sale.orderId)}>Ship</Button>
                          <Button size="sm" variant="danger" onClick={() => rejectOrder(sale.orderId)}>Reject</Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Other tabs placeholder */}
          {activeTab === 'bids' && (
            <div className="p-6">
              <h3 className="text-xl font-bold mb-4">Recent Bids on Your Auctions</h3>
              <div className="grid gap-4">
                {bids.map(bid => (
                  <div key={bid.productId} className="p-4 bg-slate-50 rounded-xl">
                    <div className="flex justify-between items-center">
                      <span>Auction #{bid.productId}</span>
                      <span className="font-bold text-[#1c74e9]">{formatLKR(bid.amount)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'analytics' && (
            <div className="p-6">
              <h3 className="text-xl font-bold mb-4">Performance Analytics</h3>
              <p>Chart placeholder - Revenue trend, views, conversion.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SellerDashboard;