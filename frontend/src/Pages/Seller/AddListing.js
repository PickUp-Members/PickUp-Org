import React, { useState } from 'react';
import { Plus, Tag, DollarSign, Package, CheckCircle } from 'lucide-react'; 
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
    return <div className="p-8 text-center font-bold text-slate-600">Please login as a seller to add listings.</div>;
  }

  const handleNext = () => setStep(step + 1);
  const handlePrev = () => setStep(step - 1);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await api.createListing(formData, user.id);
      setShowSuccess(true);
    } catch (error) {
      console.error("Error publishing listing:", error);
    } finally {
      setLoading(false);
    }
  };

  const steps = ['Basic Info', 'Pricing & Stock', 'Auction Settings', 'Review'];

  return (
    <div className="min-h-screen bg-[#f6f7f8] py-12 font-display">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white rounded-[2.5rem] shadow-xl shadow-blue-900/5 overflow-hidden border border-slate-100">
          {/* Stepper */}
          <div className="p-8 bg-gradient-to-br from-[#1c74e9] to-[#0d56b8] text-white">
            <div className="flex items-center justify-between">
              {steps.map((label, index) => (
                <div key={index} className="flex flex-col items-center gap-2">
                  <div className={`w-10 h-10 rounded-2xl flex items-center justify-center font-black transition-all ${index + 1 <= step ? 'bg-white text-[#1c74e9] scale-110 shadow-lg' : 'bg-white/20 text-white/60'}`}>
                    {index + 1}
                  </div>
                  <span className={`text-[10px] uppercase tracking-widest font-black ${index + 1 <= step ? 'text-white' : 'text-white/40'}`}>{label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-10">
            {step === 1 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
                <Input label="Product Title" icon={Tag} placeholder="e.g. Sony WH-1000XM4 Wireless Headphones" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
                <Input.TextArea label="Description" placeholder="Describe your product in detail..." value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} rows={5} />
                <Input label="Category" placeholder="Electronics, Fashion, Home..." value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} />
                <Button size="lg" className="w-full rounded-2xl h-14 font-bold" onClick={handleNext}>Next - Pricing</Button>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
                <div className="flex gap-4 bg-slate-100 p-2 rounded-2xl">
                  <button className={`flex-1 py-3 rounded-xl font-bold transition-all ${formData.type === 'FIXED' ? 'bg-white text-[#1c74e9] shadow-sm' : 'text-slate-500'}`} onClick={() => setFormData({ ...formData, type: 'FIXED' })}>Fixed Price</button>
                  <button className={`flex-1 py-3 rounded-xl font-bold transition-all ${formData.type === 'AUCTION' ? 'bg-white text-[#1c74e9] shadow-sm' : 'text-slate-500'}`} onClick={() => setFormData({ ...formData, type: 'AUCTION' })}>Auction</button>
                </div>
                <Input label={formData.type === 'FIXED' ? 'Price (LKR)' : 'Starting Price (LKR)'} type="number" value={formData.type === 'FIXED' ? formData.price : formData.startPrice} onChange={(e) => formData.type === 'FIXED' ? setFormData({ ...formData, price: e.target.value }) : setFormData({ ...formData, startPrice: e.target.value })} icon={DollarSign} />
                {formData.type === 'FIXED' && <Input label="Stock Quantity" type="number" value={formData.stock} onChange={(e) => setFormData({ ...formData, stock: e.target.value })} icon={Package} />}
                <div className="flex gap-4 pt-4">
                  <Button variant="secondary" onClick={handlePrev} className="flex-1 rounded-2xl">Back</Button>
                  <Button className="flex-1 rounded-2xl" onClick={handleNext}>Next</Button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
                {formData.type === 'AUCTION' ? (
                  <>
                    <Input label="Reserve Price (optional)" type="number" placeholder="Minimum winning bid" value={formData.reservePrice} onChange={(e) => setFormData({ ...formData, reservePrice: e.target.value })} />
                    <Input label="Auction End Date" type="datetime-local" value={formData.endDate} onChange={(e) => setFormData({ ...formData, endDate: e.target.value })} />
                    <Input label="Bid Increment (LKR)" type="number" value={formData.increment} onChange={(e) => setFormData({ ...formData, increment: e.target.value })} />
                  </>
                ) : (
                  <div className="p-10 text-center bg-slate-50 rounded-3xl border border-dashed border-slate-200">
                    <p className="font-bold text-slate-400 text-lg">Fixed price items skip auction settings.</p>
                  </div>
                )}
                <div className="flex gap-4 pt-4">
                  <Button variant="secondary" onClick={handlePrev} className="flex-1 rounded-2xl">Back</Button>
                  <Button className="flex-1 rounded-2xl" onClick={handleNext}>Review Listing</Button>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-6 animate-in fade-in zoom-in-95">
                <div className="bg-slate-50 p-8 rounded-[2rem] border border-slate-100">
                  <h3 className="font-black text-xl mb-6 text-slate-900 uppercase tracking-tight">Review Details</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between border-b border-slate-200 pb-2"><span className="text-slate-400 font-bold uppercase text-[10px]">Title</span><span className="font-bold">{formData.title}</span></div>
                    <div className="flex justify-between border-b border-slate-200 pb-2"><span className="text-slate-400 font-bold uppercase text-[10px]">Type</span><span className="font-black text-blue-600 uppercase">{formData.type}</span></div>
                    <div className="flex justify-between border-b border-slate-200 pb-2"><span className="text-slate-400 font-bold uppercase text-[10px]">Price</span><span className="font-black">LKR {formData.type === 'FIXED' ? formData.price : formData.startPrice}</span></div>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Button variant="secondary" onClick={handlePrev} className="flex-1 rounded-2xl">Edit</Button>
                  <Button onClick={handleSubmit} size="lg" className="flex-1 rounded-2xl font-bold shadow-lg shadow-blue-200" loading={loading}>
                    <Plus size={20} className="mr-2" /> Publish Now
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <Modal isOpen={showSuccess} onClose={() => setShowSuccess(false)} title="Success!">
        <div className="text-center p-4">
          <div className="bg-green-100 w-20 h-20 rounded-[2rem] flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-500" />
          </div>
          <h3 className="text-2xl font-black mb-2">Listing Published!</h3>
          <p className="text-slate-500 font-bold mb-8 uppercase text-xs tracking-widest">Your product is now live in the marketplace</p>
          <Button className="w-full rounded-2xl h-14 font-bold" to="/seller/dashboard">Go to Dashboard</Button>
        </div>
      </Modal>
    </div>
  );
};

export default AddListing;