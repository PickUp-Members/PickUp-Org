import React from 'react';
import { PlusCircle, Package, DollarSign, ListFilter } from 'lucide-react';

const SellerDashboard = () => {
  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Shop Dashboard</h1>
          <p className="text-gray-500">Manage your listings and track performance.</p>
        </div>
        <button className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700">
          <PlusCircle size={20} /> List New Product
        </button>
      </div>

      {/* Stats Cards [cite: 90] */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-100 text-green-600 rounded-lg"><DollarSign /></div>
            <div>
              <p className="text-sm text-gray-500">Total Revenue</p>
              <h3 className="text-2xl font-bold">LKR 850,400</h3>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-100 text-blue-600 rounded-lg"><Package /></div>
            <div>
              <p className="text-sm text-gray-500">Active Listings</p>
              <h3 className="text-2xl font-bold">14</h3>
            </div>
          </div>
        </div>
      </div>

      {/* Order Management [cite: 91] */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <h2 className="text-xl font-bold">Recent Orders</h2>
          <ListFilter size={20} className="text-gray-400 cursor-pointer" />
        </div>
        <table className="w-full text-left">
          <thead className="bg-gray-50 text-gray-600 text-sm uppercase">
            <tr>
              <th className="px-6 py-4">Product</th>
              <th className="px-6 py-4">Buyer</th>
              <th className="px-6 py-4">Amount</th>
              <th className="px-6 py-4">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-sm">
            <tr>
              <td className="px-6 py-4 font-medium">Gaming Mouse</td>
              <td className="px-6 py-4 text-gray-500">Nimal Silva</td>
              <td className="px-6 py-4">LKR 4,500</td>
              <td className="px-6 py-4 space-x-2">
                <button className="text-blue-600 font-bold hover:underline">Mark Shipped</button>
                <button className="text-red-500 font-bold hover:underline">Reject</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SellerDashboard;