import React, { useState } from 'react';
import Button from '../../Components/Button';
import Input from '../../Components/Input';
import { useAuth } from '../../Hooks/useAuth';
import Modal from '../../Components/Modal';
import { CheckCircle, AlertCircle } from 'lucide-react';
import { api } from '../../Services/api';

const BecomeSeller = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    businessName: '',
    description: '',
    contact: '',
  });
  const [showModal, setShowModal] = useState(false);
  const [isApproved, setIsApproved] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Mock API call
    await api.createSellerRequest(formData, user.id);
    setShowModal(true);
    setIsApproved(user.sellerRequestStatus === 'PENDING'); // Mock
    setLoading(false);
  };

  if (user?.role === 'SELLER') {
    return (
      <div className="min-h-screen bg-[#f6f7f8] py-12">
        <div className="max-w-md mx-auto p-8 bg-white rounded-2xl shadow-xl">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-center mb-4">Already a Seller!</h2>
          <p className="text-slate-600 text-center mb-8">
            Your shop <strong>{user.businessDetails?.name}</strong> is approved and ready.
          </p>
          <Button to="/seller/dashboard" size="lg" className="w-full">
            Go to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f6f7f8] py-12 px-4">
      <div className="max-w-lg mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-slate-900 mb-4">Become a Seller</h1>
            <p className="text-slate-600">
              Start selling your products on PickUp. Get approved by admin within 24 hours.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="Business Name"
              placeholder="e.g. Chamara's Tech Hub"
              value={formData.businessName}
              onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
              required
            />
            <Input.TextArea
              label="Business Description"
              placeholder="Tell buyers about your business..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={4}
              required
            />
            <Input
              label="Contact Phone"
              type="tel"
              placeholder="+94 77 123 4567"
              value={formData.contact}
              onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
              required
            />
            <Button type="submit" size="lg" className="w-full" loading={loading} disabled={!user}>
              Submit Seller Request
            </Button>
          </form>
        </div>
      </div>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title={isApproved ? 'Request Submitted!' : 'Pending Approval'}>
        {isApproved ? (
          <>
            <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
            <p className="text-slate-600 text-center">
              Your seller request has been submitted and is pending admin approval.
            </p>
            <p className="text-sm text-slate-500 text-center mt-2">
              You will be notified via email once approved.
            </p>
          </>
        ) : (
          <>
            <AlertCircle className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
            <p className="text-slate-600 text-center">
              Your business details have been recorded. Admin will review within 24 hours.
            </p>
          </>
        )}
        <div className="flex gap-3 pt-6">
          <Button to="/seller/become-seller" className="flex-1" variant="secondary">
            Edit Request
          </Button>
          <Button className="flex-1">Continue Browsing</Button>
        </div>
      </Modal>
    </div>
  );
};

export default BecomeSeller;