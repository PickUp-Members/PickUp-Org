import React, { useState } from 'react';
import { useAuth } from '../../Hooks/useAuth';
import Button from '../../Components/Button';
import Input from '../../Components/Input';
import { User, Mail, MapPin, Phone, Save } from 'lucide-react';

const Profile = () => {
  const { user, updateProfile } = useAuth();
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: user?.fullName || '',
    email: user?.email || '',
    addresses: (user?.addresses || ['']).join(', '),
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProfile(formData);
    setEditing(false);
  };

  if (!user) return <div className="p-8 text-center">Please log in to view profile.</div>;

  return (
    <div className="min-h-screen bg-[#f6f7f8] py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex items-center gap-6 mb-8">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#1c74e9] to-blue-600 flex items-center justify-center">
              <span className="text-3xl font-bold text-white">{user.fullName.charAt(0)}</span>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-900">{user.fullName}</h1>
              <p className="text-slate-500 mt-1 capitalize">{user.role}</p>
            </div>
          </div>

          <div className={!editing ? 'space-y-6' : 'space-y-4'}>
            <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl">
              <User size={20} className="text-slate-500" />
              <div>
                <p className="font-medium text-slate-900">Full Name</p>
                <p className={!editing ? formData.fullName : ''}>{formData.fullName}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl">
              <Mail size={20} className="text-slate-500" />
              <div>
                <p className="font-medium text-slate-900">Email</p>
                <p>{formData.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl">
              <MapPin size={20} className="text-slate-500" />
              <div>
                <p className="font-medium text-slate-900">Addresses</p>
                <p className="text-slate-600">{formData.addresses || 'No addresses saved'}</p>
              </div>
            </div>

            {!editing ? (
              <div className="flex gap-3 pt-4">
                <Button onClick={() => setEditing(true)} size="lg">Edit Profile</Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  label="Full Name"
                  value={formData.fullName}
                  onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                />
                <Input
                  label="Addresses (comma separated)"
                  value={formData.addresses}
                  onChange={(e) => setFormData({...formData, addresses: e.target.value})}
                />
                <div className="flex gap-3">
                  <Button type="submit" size="lg">
                    <Save size={18} className="mr-2" />
                    Save Changes
                  </Button>
                  <Button type="button" variant="secondary" size="lg" onClick={() => setEditing(false)}>
                    Cancel
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;