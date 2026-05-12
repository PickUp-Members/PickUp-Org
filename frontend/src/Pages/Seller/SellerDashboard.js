import React, { useState, useEffect } from 'react';
import { PlusCircle, Package, DollarSign, Truck, Gavel, Users, Pencil, Trash2, Ban, CheckCircle2, XCircle } from 'lucide-react';
import { formatLKR } from '../../Utils/formatters';
import Button from '../../Components/Button';
import { Link } from 'react-router-dom';
import { api } from '../../Services/api';
import Modal from '../../Components/Modal';
import Input from '../../Components/Input';

const SellerDashboard = () => {

  // 🔥 AUTH REMOVED (mock seller user)
  const user = {
    id: 'demo-seller-id',
    fullName: 'Demo Seller',
    role: 'SELLER'
  };

  const [activeTab, setActiveTab] = useState('listings');
  const [listings, setListings] = useState([]);
  const [sales, setSales] = useState([]);
  const [bids, setBids] = useState([]);
  const [orders, setOrders] = useState([]);
  const [editingListing, setEditingListing] = useState(null);
  const [editForm, setEditForm] = useState({
    title: '',
    description: '',
    price: '',
    stock: '',
    currentBid: ''
  });
  const [rejectingOrder, setRejectingOrder] = useState(null);
  const [rejectionReason, setRejectionReason] = useState('');

  // 🔥 SAFE DATA LOAD
  useEffect(() => {
    const loadDashboard = async () => {
      if (!user) return;

      const [loadedListings, loadedSales, loadedBids, loadedOrders] = await Promise.all([
        api.getSellerListings(user.id),
        api.getSellerSales(user.id),
        api.getSellerBids(user.id),
        api.getSellerOrders(user.id)
      ]);

      setListings(loadedListings || []);
      setSales(loadedSales || []);
      setBids(loadedBids || []);
      setOrders(loadedOrders || []);
    };

    loadDashboard();
  }, []);

  const stats = [
    { label: 'Total Revenue', value: formatLKR(sales.reduce((t, s) => t + (s.revenue || 0), 0)), icon: DollarSign, color: 'text-emerald-500', bg: 'bg-emerald-50' },
    { label: 'Active Listings', value: listings.length, icon: Package, color: 'text-blue-500', bg: 'bg-blue-50' },
    { label: 'Pending Bids', value: bids.length, icon: Gavel, color: 'text-amber-500', bg: 'bg-amber-50' },
    { label: 'Total Orders', value: orders.length, icon: Users, color: 'text-purple-500', bg: 'bg-purple-50' },
  ];

  const openEditModal = (listing) => {
    setEditingListing(listing);
    setEditForm({
      title: listing.title || '',
      description: listing.description || '',
      price: listing.price || '',
      stock: listing.stock || '',
      currentBid: listing.startPrice || listing.currentBid || ''
    });
  };

  const handleSaveListing = async () => {
    if (!editingListing) return;

    const updates = {
      title: editForm.title,
      description: editForm.description,
      ...(editingListing.type === 'FIXED'
        ? { price: Number(editForm.price), stock: Number(editForm.stock) }
        : { startPrice: Number(editForm.currentBid), currentBid: Number(editForm.currentBid) })
    };

    const result = await api.updateListing(editingListing.id, updates);
    if (result.success) {
      setListings(prev =>
        prev.map(item => item.id === editingListing.id ? result.product : item)
      );
      setEditingListing(null);
    }
  };

  const handleDeleteListing = async (listingId) => {
    await api.deleteListing(listingId);
    setListings(prev => prev.filter(item => item.id !== listingId));
  };

  const handleEndAuction = async (listingId) => {
    const result = await api.endAuctionEarly(listingId);
    if (result.success) {
      setListings(prev =>
        prev.map(item => item.id === listingId ? result.product : item)
      );
    }
  };

  const handleShipOrder = async (orderId) => {
    const result = await api.updateSellerOrder(orderId, { status: 'SHIPPED' });
    if (result.success) {
      setOrders(prev =>
        prev.map(order => order.orderId === orderId ? result.order : order)
      );
    }
  };

  const handleRejectOrder = async () => {
    if (!rejectingOrder) return;

    const result = await api.updateSellerOrder(rejectingOrder.orderId, {
      status: 'REJECTED',
      rejectionReason
    });

    if (result.success) {
      setOrders(prev =>
        prev.map(order =>
          order.orderId === rejectingOrder.orderId ? result.order : order
        )
      );
      setRejectingOrder(null);
      setRejectionReason('');
    }
  };

  return (
    <div className="min-h-screen bg-[#f6f7f8] py-12 px-6 font-display">
      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
          <div>
            <h1 className="text-5xl font-black text-slate-900 tracking-tighter">
              Shop Dashboard
            </h1>
            <p className="text-slate-400 font-black mt-2 uppercase text-[10px] tracking-[0.3em]">
              Welcome back, <span className="text-blue-600">{user.fullName}</span>
            </p>
          </div>

          <Button as={Link} to="/seller/add-listing" className="rounded-[1.5rem] px-8 py-4">
            <PlusCircle size={20} className="mr-3" />
            <span className="font-black">List New Product</span>
          </Button>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, i) => (
            <div key={i} className="bg-white p-10 rounded-[2.5rem] shadow-xl border">
              <div className={`w-14 h-14 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center mb-8`}>
                <stat.icon size={28} />
              </div>
              <p className="text-[10px] font-black text-slate-400 uppercase">{stat.label}</p>
              <h3 className="text-4xl font-black">{stat.value}</h3>
            </div>
          ))}
        </div>

        {/* CONTENT */}
        <div className="bg-white rounded-[3rem] border overflow-hidden">

          {/* TABS */}
          <div className="flex border-b p-4 gap-2">
            {['listings', 'orders', 'bids'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 rounded-xl font-black text-xs uppercase
                ${activeTab === tab ? 'bg-blue-50 text-blue-600' : 'text-slate-400'}`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="p-10">

            {/* LISTINGS */}
            {activeTab === 'listings' && (
              <div className="text-slate-500 font-bold">
                Listings loaded: {listings.length}
              </div>
            )}

            {/* ORDERS */}
            {activeTab === 'orders' && (
              <div className="text-slate-500 font-bold">
                Orders loaded: {orders.length}
              </div>
            )}

            {/* BIDS */}
            {activeTab === 'bids' && (
              <div className="text-slate-500 font-bold">
                Bids loaded: {bids.length}
              </div>
            )}

          </div>
        </div>
      </div>

      {/* MODALS (unchanged logic, safe usage) */}
      <Modal isOpen={!!editingListing} onClose={() => setEditingListing(null)} title="Edit Listing">
        <div className="space-y-4">
          <Input label="Title" value={editForm.title}
            onChange={(e) => setEditForm(prev => ({ ...prev, title: e.target.value }))} />

          <Input.TextArea label="Description" value={editForm.description}
            onChange={(e) => setEditForm(prev => ({ ...prev, description: e.target.value }))} />

          <div className="flex gap-3 pt-2">
            <Button variant="secondary" className="flex-1" onClick={() => setEditingListing(null)}>Cancel</Button>
            <Button className="flex-1" onClick={handleSaveListing}>Save</Button>
          </div>
        </div>
      </Modal>

    </div>
  );
};

export default SellerDashboard;