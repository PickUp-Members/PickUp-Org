import React, { useState } from 'react';
import { Plus, Tag, DollarSign, Package, CheckCircle, ArrowRight, ArrowLeft } from 'lucide-react'; 
import Button from '../../Components/Button';
import Input from '../../Components/Input';
import { useAuth } from '../../Hooks/useAuth';
import { api } from '../../Services/api';
import Modal from '../../Components/Modal';

const AddListing = () => {
  const { user } = useAuth();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    type: 'FIXED', // FIXED or AUCTION
    price: '',
    stock: '1',
    startPrice: '',
    reservePrice: '',
    endDate: '',
    increment: '1000',
  });

  if (!user || user.role !== 'SELLER') {
    return <div className="p-20 text-center font-black text-slate-400 uppercase tracking-widest">Access Denied: Sellers Only</div>;
  }

  const handleNext = () => setStep(prev => prev + 1);
  const handlePrev = () => setStep(prev => prev - 1);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await api.createListing(formData, user.id);
      setShowSuccess(true);
    } catch (error) {
      console.error("Publishing failed", error);
    } finally {
      setLoading(false);
    }
  };

  const steps = ['Details', 'Pricing', 'Settings', 'Review'];

  return (
    <div className="min-h-screen bg-[#f6f7f8] py-12 font-display">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white rounded-[3rem] shadow-2xl shadow-blue-900/10 overflow-hidden border border-slate-100">
          
          {/* Visual Stepper */}
          <div className="p-10 bg-gradient-to-br from-[#1c74e9] to-[#0d56b8] text-white">
            <div className="flex items-center justify-between relative">
              <div className="absolute top-5 left-0 w-full h-[2px] bg-white/10 z-0"></div>
              {steps.map((label, index) => (
                <div key={label} className="relative z-10 flex flex-col items-center gap-3">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black transition-all duration-500 ${index + 1 <= step ? 'bg-white text-[#1c74e9] scale-110 shadow-xl' : 'bg-[#1c74e9] border-2 border-white/20 text-white/40'}`}>
                    {index + 1}
                  </div>
                  <span className={`text-[10px] uppercase tracking-[0.2em] font-black ${index + 1 <= step ? 'text-white' : 'text-white/40'}`}>{label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-12">
            {/* Step 1: Basic Info */}
            {step === 1 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
                <Input label="Product Title" icon={Tag} placeholder="e.g. MacBook Pro M2 2023" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} />
                <div className="space-y-1">
                    <label className="block text-sm font-bold text-slate-700 mb-2">Description</label>
                    <textarea 
                        className="w-full px-4 py-3 border border-slate-200 rounded-2xl text-sm focus:ring-2 focus:ring-[#1c74e9] outline-none min-h-[150px]"
                        value={formData.description}
                        onChange={(e) => setFormData({...formData, description: e.target.value})}
                        placeholder="Tell buyers everything about your item..."
                    />
                </div>
                <Input label="Category" placeholder="Electronics, Home, etc." value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})} />
                <Button size="lg" className="w-full rounded-2xl h-14" onClick={handleNext}>Continue to Pricing <ArrowRight size={18} className="ml-2" /></Button>
              </div>
            )}

            {/* Step 2: Pricing Type */}
            {step === 2 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-right-4">
                <div className="flex gap-4 bg-slate-100 p-2 rounded-[2rem]">
                  <button className={`flex-1 py-4 rounded-[1.5rem] font-black uppercase text-xs tracking-widest transition-all ${formData.type === 'FIXED' ? 'bg-white text-blue-600 shadow-md' : 'text-slate-400'}`} onClick={() => setFormData({...formData, type: 'FIXED'})}>Fixed Price</button>
                  <button className={`flex-1 py-4 rounded-[1.5rem] font-black uppercase text-xs tracking-widest transition-all ${formData.type === 'AUCTION' ? 'bg-white text-blue-600 shadow-md' : 'text-slate-400'}`} onClick={() => setFormData({...formData, type: 'AUCTION'})}>Auction</button>
                </div>
                
                <Input 
                    label={formData.type === 'FIXED' ? "Selling Price (LKR)" : "Starting Bid (LKR)"} 
                    type="number" 
                    icon={DollarSign} 
                    value={formData.type === 'FIXED' ? formData.price : formData.startPrice}
                    onChange={(e) => setFormData({...formData, [formData.type === 'FIXED' ? 'price' : 'startPrice']: e.target.value})}
                />

                {formData.type === 'FIXED' && (
                    <Input label="Stock Quantity" type="number" icon={Package} value={formData.stock} onChange={(e) => setFormData({...formData, stock: e.target.value})} />
                )}

                <div className="flex gap-4">
                  <Button variant="secondary" onClick={handlePrev} className="flex-1 rounded-2xl h-14 font-black"><ArrowLeft size={18} className="mr-2"/> Back</Button>
                  <Button className="flex-1 rounded-2xl h-14 font-black" onClick={handleNext}>Next Step <ArrowRight size={18} className="ml-2"/></Button>
                </div>
              </div>
            )}

            {/* Step 3: Auction Logistics (Conditional) */}
            {step === 3 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
                {formData.type === 'AUCTION' ? (
                  <>
                    <Input label="Reserve Price (Optional)" type="number" value={formData.reservePrice} onChange={(e) => setFormData({...formData, reservePrice: e.target.value})} placeholder="Hidden minimum price" />
                    <Input label="Auction End Date" type="datetime-local" value={formData.endDate} onChange={(e) => setFormData({...formData, endDate: e.target.value})} />
                    <Input label="Bid Increment (LKR)" type="number" value={formData.increment} onChange={(e) => setFormData({...formData, increment: e.target.value})} />
                  </>
                ) : (
                  <div className="py-16 text-center border-4 border-dashed border-slate-100 rounded-[3rem]">
                    <Package className="mx-auto text-slate-200 mb-4" size={48} />
                    <p className="font-black text-slate-300 uppercase tracking-widest">No extra settings for Fixed Price</p>
                  </div>
                )}
                <div className="flex gap-4">
                  <Button variant="secondary" onClick={handlePrev} className="flex-1 rounded-2xl h-14 font-black">Back</Button>
                  <Button className="flex-1 rounded-2xl h-14 font-black" onClick={handleNext}>Review Listing</Button>
                </div>
              </div>
            )}

            {/* Step 4: Final Review */}
            {step === 4 && (
              <div className="space-y-6 animate-in zoom-in-95">
                <div className="bg-slate-50 p-8 rounded-[2.5rem] border border-slate-100">
                  <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-6">Final Confirmation</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center"><span className="text-slate-500 font-bold">Item</span><span className="font-black text-slate-900">{formData.title}</span></div>
                    <div className="flex justify-between items-center"><span className="text-slate-500 font-bold">Type</span><span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-lg text-xs font-black">{formData.type}</span></div>
                    <div className="flex justify-between items-center border-t border-slate-200 pt-4"><span className="text-slate-900 font-black">Total Value</span><span className="text-2xl font-black text-[#1c74e9]">LKR {formData.type === 'FIXED' ? formData.price : formData.startPrice}</span></div>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Button variant="secondary" onClick={handlePrev} className="flex-1 rounded-2xl h-14 font-black">Edit</Button>
                  <Button onClick={handleSubmit} loading={loading} className="flex-1 rounded-2xl h-14 font-black shadow-xl shadow-blue-200">
                    <Plus size={20} className="mr-2" /> Publish Item
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <Modal isOpen={showSuccess} onClose={() => setShowSuccess(false)} title="Success!">
        <div className="text-center py-6">
          <div className="w-24 h-24 bg-green-100 text-green-500 rounded-[2.5rem] flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={48} strokeWidth={3} />
          </div>
          <h2 className="text-3xl font-black text-slate-900 mb-2">Live Now!</h2>
          <p className="text-slate-500 font-bold uppercase text-[10px] tracking-widest mb-10">Your listing is now visible to thousands of buyers</p>
          <Button to="/seller/dashboard" className="w-full h-14 rounded-2xl font-black">Go to Dashboard</Button>
        </div>
      </Modal>
    </div>
  );
};

export default AddListing;