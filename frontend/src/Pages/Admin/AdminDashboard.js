import React, { useEffect, useState } from 'react';
import { Users, Search, AlertTriangle, Hammer, Zap, UserCheck, UserX, BarChart3, DollarSign, Eye, FileText, Calendar, Mail, Phone, Info } from 'lucide-react';
import { formatLKR, formatDate } from '../../Utils/formatters';
import Button from '../../Components/Button';
import Input from '../../Components/Input';
import Modal from '../../Components/Modal';
import { useAuthStore } from '../../store/authStore';

const AdminDashboard = () => {

  const [activeTab, setActiveTab] = useState('stats');
  const [searchTerm, setSearchTerm] = useState('');

  const [requests, setRequests] = useState([]);
  const [disputes, setDisputes] = useState([]);

  const [stats] = useState({
    totalUsers: 0,
    totalRevenue: 0,
    activeAuctions: 0
  });

  const [selectedRequest, setSelectedRequest] = useState(null);

  // ================= FIXED ZUSTAND SELECTORS =================
  const getAllSellerRequests = useAuthStore(
    state => state.getAllSellerRequests
  );

  const approveSeller = useAuthStore(
    state => state.approveSeller
  );

  const rejectSeller = useAuthStore(
    state => state.rejectSeller
  );

  const loading = useAuthStore(
    state => state.loading
  );

  // ================= LOAD SELLER REQUESTS =================
  useEffect(() => {

    if (activeTab !== 'sellers') return;

    const loadSellerRequests = async () => {

      try {

        const result = await getAllSellerRequests();

        if (result.success) {
          setRequests(result.requests || []);
        } 
        else {
          console.error(result.error);
        }

      } 
      catch (err) {
        console.error(err);
      }
    };

    loadSellerRequests();

  }, [activeTab]);

  // ================= APPROVE SELLER =================
  const handleApproveSeller = async (userId) => {

    const result = await approveSeller(userId);

    if (result.success) {

      setRequests((prev) =>
        prev.filter((req) => req.id !== userId)
      );

      setSelectedRequest(null);

    } 
    else {
      console.error(result.error);
    }
  };

  // ================= REJECT SELLER =================
  const handleRejectSeller = async (userId) => {

    const result = await rejectSeller(userId);

    if (result.success) {

      setRequests((prev) =>
        prev.filter((req) => req.id !== userId)
      );

      setSelectedRequest(null);

    } 
    else {
      console.error(result.error);
    }
  };

  // ================= RESOLVE DISPUTE =================
  const resolveDispute = async (disputeId) => {

    setDisputes((prev) =>
      prev.filter((d) => d.id !== disputeId)
    );
  };

  // ================= FILTER REQUESTS =================
  const filteredRequests = requests.filter((req) =>
    (req?.fullName || '')
      .toLowerCase()
      .includes(searchTerm.toLowerCase()) ||

    (req?.businessDetails?.name || '')
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  // ================= FILTER DISPUTES =================
  const filteredDisputes = disputes.filter((d) =>
    (d?.description || '')
      .toLowerCase()
      .includes(searchTerm.toLowerCase()) ||

    (d?.title || '')
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (

    <div className="p-8 bg-gray-50 min-h-screen font-display">

      {/* ================= HEADER ================= */}
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        Admin Control Center
      </h1>

      {/* ================= TAB NAVIGATION ================= */}
      <div className="flex bg-white rounded-xl p-1 mb-6 shadow-sm border border-slate-200">

        {[
          { id: 'stats', label: '📊 Platform Stats', icon: BarChart3 },
          { id: 'sellers', label: '👥 Seller Verification', icon: UserCheck },
          { id: 'disputes', label: '⚠️ Disputes', icon: AlertTriangle },
          { id: 'maintenance', label: '🔧 Maintenance', icon: Hammer }
        ].map((tab) => (

          <button
            key={tab.id}
            type="button"
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all flex-1 justify-center ${
              activeTab === tab.id
                ? 'bg-[#1c74e9] text-white shadow-md'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
            onClick={() => setActiveTab(tab.id)}
          >

            <tab.icon size={16} />

            <span className="hidden md:inline">
              {tab.label}
            </span>

          </button>

        ))}

      </div>

      {/* ================= STATS TAB ================= */}
      {activeTab === 'stats' && (

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

          <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">

            <div className="flex items-center gap-4 text-blue-600">

              <div className="p-3 bg-blue-50 rounded-xl">
                <Users size={24} />
              </div>

              <div>

                <p className="text-sm font-medium text-slate-500">
                  Total Users
                </p>

                <p className="text-4xl font-black text-slate-900">
                  {stats.totalUsers}
                </p>

              </div>

            </div>

          </div>

          <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">

            <div className="flex items-center gap-4 text-emerald-600">

              <div className="p-3 bg-emerald-50 rounded-xl">
                <DollarSign size={24} />
              </div>

              <div>

                <p className="text-sm font-medium text-slate-500">
                  Platform Revenue
                </p>

                <p className="text-4xl font-black text-slate-900">
                  {formatLKR(stats.totalRevenue)}
                </p>

              </div>

            </div>

          </div>

          <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">

            <div className="flex items-center gap-4 text-amber-600">

              <div className="p-3 bg-amber-50 rounded-xl">
                <Zap size={24} />
              </div>

              <div>

                <p className="text-sm font-medium text-slate-500">
                  Active Auctions
                </p>

                <p className="text-4xl font-black text-slate-900">
                  {stats.activeAuctions}
                </p>

              </div>

            </div>

          </div>

        </div>

      )}

      {/* ================= SELLERS TAB ================= */}
      {activeTab === 'sellers' && (

        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">

          <div className="p-6 border-b border-slate-200 flex flex-col md:flex-row gap-4 items-center">

            <h2 className="text-xl font-bold text-slate-900 flex-1">
              Pending Verifications ({filteredRequests.length})
            </h2>

            <div className="relative w-full md:w-64">

              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                size={18}
              />

              <input
                type="text"
                className="w-full pl-10 pr-4 py-2 bg-slate-100 border-none rounded-lg text-sm focus:ring-2 focus:ring-[#1c74e9] outline-none"
                placeholder="Search by name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />

            </div>

          </div>

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead className="bg-slate-50">

                <tr>

                  <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase">
                    Applicant
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase">
                    Business
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase">
                    Applied
                  </th>

                  <th className="px-6 py-4 text-right text-xs font-bold text-slate-500 uppercase">
                    Actions
                  </th>

                </tr>

              </thead>

              <tbody className="divide-y divide-slate-100">

                {loading ? (

                  <tr>

                    <td
                      colSpan="4"
                      className="text-center py-10 text-slate-500"
                    >
                      Loading seller requests...
                    </td>

                  </tr>

                ) : filteredRequests.length === 0 ? (

                  <tr>

                    <td
                      colSpan="4"
                      className="text-center py-10 text-slate-500"
                    >
                      No pending seller requests found.
                    </td>

                  </tr>

                ) : (

                  filteredRequests.map((req) => (

                    <tr
                      key={req.id}
                      className="hover:bg-slate-50 transition-colors"
                    >

                      <td className="px-6 py-4">

                        <div className="font-bold text-slate-900">
                          {req.fullName}
                        </div>

                        <div className="text-xs text-slate-500">
                          {req.email}
                        </div>

                      </td>

                      <td className="px-6 py-4 text-sm text-slate-700 font-medium">
                        {req.businessDetails?.name || 'N/A'}
                      </td>

                      <td className="px-6 py-4 text-sm text-slate-500">
                        {formatDate(req.createdAt)}
                      </td>

                      <td className="px-6 py-4">

                        <div className="flex justify-end">

                          <Button
                            size="sm"
                            variant="secondary"
                            onClick={() => setSelectedRequest(req)}
                          >

                            <Eye size={14} className="mr-1" />

                            View Details

                          </Button>

                        </div>

                      </td>

                    </tr>

                  ))

                )}

              </tbody>

            </table>

          </div>

        </div>

      )}

      {/* ================= MODAL ================= */}
      {selectedRequest && (

        <Modal
          isOpen={!!selectedRequest}
          onClose={() => setSelectedRequest(null)}
          title="Seller Application Details"
          size="lg"
        >

          <div className="space-y-6">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              <div className="space-y-4">

                <div>

                  <label className="text-xs font-bold text-slate-400 uppercase flex items-center gap-2">
                    <UserCheck size={12} />
                    Full Name
                  </label>

                  <p className="text-slate-900 font-medium">
                    {selectedRequest.fullName}
                  </p>

                </div>

                <div>

                  <label className="text-xs font-bold text-slate-400 uppercase flex items-center gap-2">
                    <Mail size={12} />
                    Email Address
                  </label>

                  <p className="text-slate-900 font-medium">
                    {selectedRequest.email}
                  </p>

                </div>

                <div>

                  <label className="text-xs font-bold text-slate-400 uppercase flex items-center gap-2">
                    <Phone size={12} />
                    Mobile Number
                  </label>

                  <p className="text-slate-900 font-medium">
                    {selectedRequest.businessDetails?.contactPhone || 'Not Provided'}
                  </p>

                </div>

              </div>

              <div className="space-y-4">

                <div>

                  <label className="text-xs font-bold text-slate-400 uppercase flex items-center gap-2">
                    <Info size={12} />
                    Business Name
                  </label>

                  <p className="text-slate-900 font-medium">
                    {selectedRequest.businessDetails?.name || 'N/A'}
                  </p>

                </div>

                <div>

                  <label className="text-xs font-bold text-slate-400 uppercase flex items-center gap-2">
                    <FileText size={12} />
                    Business Description
                  </label>

                  <p className="text-slate-600 text-sm leading-relaxed">
                    {selectedRequest.businessDetails?.description || 'No description provided.'}
                  </p>

                </div>

              </div>

            </div>

            <div className="flex gap-3 pt-6 border-t border-slate-100">

              <Button
                className="flex-1"
                onClick={() =>
                  handleApproveSeller(selectedRequest.id)
                }
              >

                <UserCheck size={18} className="mr-2" />

                Approve Application

              </Button>

              <Button
                variant="danger"
                className="flex-1"
                onClick={() =>
                  handleRejectSeller(selectedRequest.id)
                }
              >

                <UserX size={18} className="mr-2" />

                Reject Application

              </Button>

            </div>

          </div>

        </Modal>

      )}

      {/* ================= DISPUTES TAB ================= */}
      {activeTab === 'disputes' && (

        <div className="grid grid-cols-1 gap-4">

          {filteredDisputes.map((dispute) => (

            <div
              key={dispute.id}
              className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
            >

              <div className="flex gap-4">

                <div className="p-3 bg-orange-50 text-orange-500 rounded-full h-fit">
                  <AlertTriangle size={24} />
                </div>

                <div>

                  <h4 className="font-bold text-slate-900">
                    {dispute.title}
                  </h4>

                  <p className="text-sm text-slate-600 max-w-xl">
                    {dispute.description}
                  </p>

                </div>

              </div>

              <Button onClick={() => resolveDispute(dispute.id)}>
                Resolve Dispute
              </Button>

            </div>

          ))}

        </div>

      )}

      {/* ================= MAINTENANCE TAB ================= */}
      {activeTab === 'maintenance' && (

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">

            <h3 className="text-xl font-bold mb-4 flex items-center gap-3">

              <Hammer size={24} className="text-[#1c74e9]" />

              System Controls

            </h3>

            <div className="space-y-4">

              <Button className="w-full bg-amber-500 hover:bg-amber-600 border-none">

                <Zap size={18} className="mr-2" />

                End All Live Auctions

              </Button>

              <Button
                variant="danger"
                className="w-full"
              >
                Suspend All New Listings
              </Button>

            </div>

          </div>

          <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">

            <h3 className="text-xl font-bold mb-4">
              Global Search
            </h3>

            <Input placeholder="Enter ID, Email or Product Code..." />

            <Button
              variant="secondary"
              className="mt-4 w-full"
            >
              Search Database
            </Button>

          </div>

        </div>

      )}

    </div>
  );
};

export default AdminDashboard;