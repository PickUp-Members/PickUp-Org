import React from 'react';
import { Users, ShieldCheck, Activity } from 'lucide-react';

const AdminDashboard = () => {
  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin Control Center</h1>

      {/* Global Stats [cite: 97, 98, 99] */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 text-blue-600 mb-2"><Users size={20}/> <span className="font-bold">Total Users</span></div>
          <p className="text-3xl font-black">1,240</p>
          <p className="text-xs text-gray-400 mt-1">840 Buyers | 400 Sellers</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 text-green-600 mb-2"><ShieldCheck size={20}/> <span className="font-bold">Active Auctions</span></div>
          <p className="text-3xl font-black">58</p>
        </div>
      </div>

      {/* Seller Verification Portal [cite: 94, 95] */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 bg-blue-600 text-white font-bold">Pending Seller Requests</div>
        <div className="p-0">
          <table className="w-full text-left">
            <thead className="bg-gray-100 text-gray-500 text-xs uppercase">
              <tr>
                <th className="px-6 py-3">Applicant Name</th>
                <th className="px-6 py-3">Business Name</th>
                <th className="px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              <tr>
                <td className="px-6 py-4 text-sm">Sunil Perera</td>
                <td className="px-6 py-4 text-sm font-medium">Sunil Tech Solutions</td>
                <td className="px-6 py-4 flex gap-3">
                  <button className="bg-green-600 text-white px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-green-700 transition">Approve</button>
                  <button className="bg-red-500 text-white px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-red-600 transition">Deny</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;