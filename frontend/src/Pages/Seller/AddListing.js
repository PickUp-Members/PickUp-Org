import React, { useState } from 'react';
import { Plus, Image, Tag, Calendar, DollarSign, Package, CheckCircle } from 'lucide-react';
import Button from '../../Components/Button';
import Input from '../../Components/Input';
import { useAuth } from '../../Hooks/useAuth';
import { api } from '../../Services/api';
import Modal from '../../Components/Modal';

const AddListing = () => {
  const { user } = useAuth();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    type: 'FIXED',
    price: '',
    stock: '',
    startPrice: '',
    reservePrice: '',
    endDate: '',
    increment: '1000',
    images: [],
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!user || user.role !== 'SELLER') {
    return <div className="p-8 text-center">Login as seller to add listings.</div>;
  }

  const handleNext = () => setStep(step + 1);
  const handlePrev = () => setStep(step - 1);

  const handleSubmit = async () => {
    setLoading(true);
    await api.createListing(formData, user.id);
    setShowSuccess(true);
    setLoading(false);
  };

  const steps = ['Basic Info', 'Pricing & Stock', 'Auction Settings', 'Review'];

  return (
    <div className="min-h-screen bg-[#f6f7f8] py-12">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Stepper */}
          <div className="p-6 bg-gradient-to-r from-[#1c74e9] to-blue-600 text-white">
            <div className="flex items-center gap-4">
              {steps.map((label, index) => (
                <div key={index} className={`flex items-center gap-2 ${index < step ? 'text-blue-200' : 'text-white/70'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${index < step ? 'bg-blue-300' : 'bg-white/20'}`}>
                    {index + 1}
                  </div>
                  <span className="font-medium text-sm">{label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-8">
            {/* Step 1: Basic Info */}
            {step === 1 && (
              <div className="space-y-6">
                <Input
                  label="Product Title"
                  icon={Tag}
                  placeholder="e.g. Sony WH-1000XM4 Wireless Headphones"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
                <Input.TextArea
                  label="Description"
                  placeholder="Describe your product in detail..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={5}
                />
                <Input
                  label="Category"
                  placeholder="Electronics, Fashion, Home..."
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                />
                <Button size="lg" className="w-full" onClick={handleNext}>
                  Next - Pricing
                </Button>
              </div>
            )}

            {/* Step 2: Pricing */}
            {step === 2 && (
              <div className="space-y-6">
                <div className="flex gap-4">
                  <Button
                    variant={formData.type === 'FIXED' ? 'primary' : 'secondary'}
                    className="flex-1"
                    onClick={() => setFormData({ ...formData, type: 'FIXED' })}
                  >
                    Fixed Price
                  </Button>
                  <Button
                    variant={formData.type === 'AUCTION' ? 'primary' : 'secondary'}
                    className="flex-1"
                    onClick={() => setFormData({ ...formData, type: 'AUCTION' })}
                  >
                    Auction
                  </Button>
                </div>

                <Input
                  label={formData.type === 'FIXED' ? 'Price (LKR)' : 'Starting Price (LKR)'}
                  type="number"
                  value={formData.price || formData.startPrice}
                  onChange={(e) => {
                    if (formData.type === 'FIXED') {
                      setFormData({ ...formData, price: e.target.value });
                    } else {
                      setFormData({ ...formData, startPrice: e.target.value });
                    }
                  }}
                  icon={DollarSign}
                />

                {formData.type === 'FIXED' && (
                  <Input
                    label="Stock Quantity"
                    type="number"
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                    icon={Package}
                  />
                )}

                <div className="flex gap-4">
                  <Button variant="secondary" onClick={handlePrev} className="flex-1">
                    Previous
                  </Button>
                  <Button className="flex-1" onClick={handleNext}>
                    Next
                  </Button>
                </div>
              </div>
            )}

            {/* Step 3: Auction */}
            {step === 3 && formData.type === 'AUCTION' && (
              <div className="space-y-6">
                <Input
                  label="Reserve Price (optional)"
                  type="number"
                  placeholder="Minimum winning bid"
                  value={formData.reservePrice}
                  onChange={(e) => setFormData({ ...formData, reservePrice: e.target.value })}
                />
                <Input
                  label="Auction End Date"
                  type="datetime-local"
                  value={formData.endDate}
                  onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                />
                <Input
                  label="Bid Increment (LKR)"
                  type="number"
                  value={formData.increment}
                  onChange={(e) => setFormData({ ...formData, increment: e.target.value })}
                  placeholder="1000"
                />
                <div className="flex gap-4">
                  <Button variant="secondary" onClick={handlePrev} className="flex-1">
                    Previous
                  </Button>
                  <Button className="flex-1" onClick={handleNext}>
                    Review
                  </Button>
                </div>
              </div>
            )}

            {/* Step 4: Review */}
            {step === 4 && (
              <div className="space-y-6">
                <div className="bg-slate-50 p-6 rounded-xl">
                  <h3 className="font-bold text-lg mb-4">Listing Summary</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>Title:</div>
                    <div className="font-medium">{formData.title}</div>
                    <div>Type:</div>
                    <div>{formData.type}</div>
                    <div>Category:</div>
                    <div>{formData.category}</div>
                    <div>Price:</div>
                    <div>LKR {formData.price || formData.startPrice}</div>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Button variant="secondary" onClick={handlePrev} className="flex-1">
                    Edit
                  </Button>
                  <Button onClick={handleSubmit} size="lg" className="flex-1" loading={loading}>
                    <Plus size={20} className="mr-2" />
                    Publish Listing
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <Modal isOpen={showSuccess} onClose={() => setShowSuccess(false)} title="Listing Published!">
        <div className="text-center">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
          <h3 className="text-xl font-bold mb-4">Your listing is live!</h3>
          <p className="text-slate-600 mb-8">Buyers can now see and purchase your product.</p>
          <Button className="w-full" to="/seller/manage-listings">
            View My Listings
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default AddListing;