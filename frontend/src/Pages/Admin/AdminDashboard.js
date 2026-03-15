import React, { useState } from 'react';
import { Users, ShieldCheck, Activity, Search, AlertTriangle, Hammer, Zap, UserCheck, UserX, Filter, BarChart3, DollarSign } from 'lucide-react';
import { mockSellerRequests, mockPlatformStats, mockDisputes } from '../../Utils/mockData';
import { formatLKR } from '../../Utils/formatters';
import Button from '../../Components/Button';
import Input from '../../Components/Input';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('stats');
  const [searchTerm, setSearchTerm] = useState('');

  const approveSeller = (userId) => {
    // Mock API
    console.log('Approved seller:', userId);
  };

  const denySeller = (userId) => {
    console.log('Denied seller:', userId);
  };

  const resolveDispute = (disputeId) => {
    console.log('Resolved dispute:', disputeId);
  };

  const filteredRequests = mockSellerRequests.filter(req => 
    req.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredDisputes = mockDisputes.filter(d => 
    d.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin Control Center</h1>

      {/* Tab Navigation */}
      <div className="flex bg-white rounded-xl p-1 mb-6 shadow-sm border border-slate-200">
        {[
          { id: 'stats', label: '📊 Platform Stats', icon: BarChart3 },
          { id: 'sellers', label: '👥 Seller Verification', icon: UserCheck },
          { id: 'disputes', label: '⚠️ Disputes', icon: AlertTriangle },
          { id: 'maintenance', label: '🔧 Maintenance', icon: Hammer }
        ].map(tab => (
          <button
            key={tab.id}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all flex-1 ${
              activeTab === tab.id ? 'bg-[#1c74e9] text-white shadow-md' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
            onClick={() => setActiveTab(tab.id)}
          >
            <tab.icon size={16} />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Stats Tab */}
      {activeTab === 'stats' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl transition-all">
            <div className="flex items-center gap-3 text-blue-600 mb-4">
              <Users size={24} />
              <div>
                <p className="text-sm font-medium text-slate-600">Total Users</p>
                <p className="text-4xl font-black">{mockPlatformStats.totalUsers}</p>
                <p className="text-xs text-slate-500">📈 +12% from last month</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl transition-all">
            <div className="flex items-center gap-3 text-emerald-600 mb-4">
              <DollarSign size={24} />
              <div>
                <p className="text-sm font-medium text-slate-600">Platform Revenue</p>
                <p className="text-4xl font-black">{formatLKR(mockPlatformStats.totalRevenue)}</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl transition-all">
            <div className="flex items-center gap-3 text-amber-600 mb-4">
              <Zap size={24} />
              <div>
                <p className="text-sm font-medium text-slate-600">Active Auctions</p>
                <p className="text-4xl font-black">{mockPlatformStats.activeAuctions}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Sellers Tab */}
      {activeTab === 'sellers' && (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="p-6 border-b border-slate-200 flex gap-4 items-center">
            <h2 className="text-2xl font-bold text-slate-900 flex-1">Seller Verification ({mockSellerRequests.length})</h2>
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5" />
              <Input 
                placeholder="Search applicants..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-bold text-slate-700">Applicant</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-slate-700">Business</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-slate-700">Applied</th>
                  <th className="px-6 py-4 text-right text-sm font-bold text-slate-700">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredRequests.map(req => (
                  <tr key={req.userId} className="hover:bg-slate-50">
                    <td className="px-6 py-4">
                      <div className="font-medium">{req.name}</div>
                      <div className="text-sm text-slate-500">{req.email}</div>
                    </td>
                    <td className="px-6 py-4 font-semibold">{req.businessName}</td>
                    <td className="px-6 py-4 text-sm text-slate-600">{req.appliedDate}</td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <Button size="sm" onClick={() => approveSeller(req.userId)}>
                          <UserCheck size={16} className="mr-1" /> Approve
                        </Button>
                        <Button size="sm" variant="danger" onClick={() => denySeller(req.userId)}>
                          <UserX size={16} className="mr-1" /> Deny
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}


      {/* Disputes Tab */}
      {activeTab === 'disputes' && (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="p-6 border-b border-slate-200">
            <h2 className="text-2xl font-bold text-slate-900">Dispute Management ({filteredDisputes.length})</h2>
          </div>
          <div className="divide-y divide-slate-100">
            {filteredDisputes.map(dispute => (
              <div key={dispute.id} className="p-6 hover:bg-slate-50">
                <div className="flex items-start gap-4 mb-4">
                  <AlertTriangle className="text-orange-500 mt-1 flex-shrink-0" size={24} />
                  <div className="flex-1">
                    <h4 className="font-bold text-slate-900 mb-1">{dispute.title}</h4>
                    <p className="text-slate-600 mb-2">{dispute.description}</p>
                    <div className="flex gap-2 text-xs">
                      <span className="px-2 py-1 bg-orange-100 text-orange-800 rounded-full">Order #{dispute.orderId}</span>
                      <span className="px-2 py-1 bg-slate-100 text-slate-700 rounded-full">{dispute.type}</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-3 pt-2">
                  <Button size="sm" variant="ghost">View Details</Button>
                  <Button size="sm" onClick={() => resolveDispute(dispute.id)}>Resolve</Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Maintenance Tab */}
      {activeTab === 'maintenance' && (
        <div className="space-y-6">
          <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-3">
              <Hammer size={24} className="text-slate-500" />
              Auction Controls
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button size="lg" className="bg-amber-500 hover:bg-amber-600" block>
                <Zap size={18} className="mr-2" /> End All Auctions
              </Button>
              <Button size="lg" variant="danger" block>
                Hide Listings
              </Button>
            </div>
          </div>
          <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
            <h3 className="text-xl font-bold mb-4">User & Listing Search</h3>
            <div className="max-w-md">
              <Input placeholder="Search users or listings..." prefix={<Search size={18} />} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;