import React, { useState } from 'react';
import { X, Send, CheckCircle2, ShieldCheck, Building2, Phone, Mail, FileText } from 'lucide-react';
import { PRODUCT_CATEGORIES } from '../data/healthcareData';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultCategory?: string;
}

export const QuoteModal: React.FC<QuoteModalProps> = ({ isOpen, onClose, defaultCategory = '' }) => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    hospitalOrCompany: '',
    phone: '',
    email: '',
    department: defaultCategory || 'surgical-disposables',
    estimatedQuantity: 'Bulk / Hospital Tender',
    message: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      // Auto reset after showing success message
    }, 4000);
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[9990] flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-[#072B58]/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl rounded-3xl bg-white shadow-2xl border border-[#E4E8EE] overflow-hidden my-auto">
        
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-[#0B3D78] via-[#1565C0] to-[#072B58] p-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 h-9 w-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
            aria-label="Close dialog"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-blue-200">
            <ShieldCheck className="h-4 w-4 text-[#269653]" />
            Institutional Procurement Desk
          </div>
          <h3 className="font-heading text-xl sm:text-2xl font-bold mt-1 text-white">
            Request Hospital Quotation
          </h3>
          <p className="text-xs text-blue-100/90 mt-1">
            Nafisa Traders • Densohall Wholesale Medicine Market, Karachi
          </p>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8">
          {submitted ? (
            <div className="py-8 text-center space-y-4">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-[#269653]">
                <CheckCircle2 className="h-10 w-10" />
              </div>
              <h4 className="font-heading text-2xl font-bold text-[#0B3D78]">
                Quotation Request Received!
              </h4>
              <p className="text-sm text-[#5F6368] max-w-md mx-auto leading-relaxed">
                Thank you, <span className="font-semibold text-[#202124]">{formData.fullName}</span>. Our institutional procurement desk will review your enquiry for <span className="font-semibold text-[#0B3D78]">{formData.hospitalOrCompany || 'your hospital'}</span> and contact you shortly with formal pricing and batch details.
              </p>

              <div className="pt-4">
                <button
                  onClick={handleReset}
                  className="rounded-xl bg-[#0B3D78] px-6 py-2.5 text-xs font-bold text-white hover:bg-[#1A73E8] transition-colors"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#202124] uppercase tracking-wider mb-1">
                    Your Name *
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="e.g. Dr. Ahmed Khan / Procurement Mgr"
                      className="w-full rounded-xl border border-[#E4E8EE] bg-[#F8F9FA] px-3.5 py-2.5 text-xs text-[#202124] focus:border-[#1A73E8] focus:bg-white focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#202124] uppercase tracking-wider mb-1">
                    Hospital / Institution *
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      value={formData.hospitalOrCompany}
                      onChange={(e) => setFormData({ ...formData, hospitalOrCompany: e.target.value })}
                      placeholder="e.g. Civil Hospital / Private Clinic"
                      className="w-full rounded-xl border border-[#E4E8EE] bg-[#F8F9FA] px-3.5 py-2.5 text-xs text-[#202124] focus:border-[#1A73E8] focus:bg-white focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#202124] uppercase tracking-wider mb-1">
                    Phone / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+92 300 1234567"
                    className="w-full rounded-xl border border-[#E4E8EE] bg-[#F8F9FA] px-3.5 py-2.5 text-xs text-[#202124] focus:border-[#1A73E8] focus:bg-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#202124] uppercase tracking-wider mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="procurement@hospital.com"
                    className="w-full rounded-xl border border-[#E4E8EE] bg-[#F8F9FA] px-3.5 py-2.5 text-xs text-[#202124] focus:border-[#1A73E8] focus:bg-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#202124] uppercase tracking-wider mb-1">
                    Product Division *
                  </label>
                  <select
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    className="w-full rounded-xl border border-[#E4E8EE] bg-[#F8F9FA] px-3.5 py-2.5 text-xs text-[#202124] focus:border-[#1A73E8] focus:bg-white focus:outline-none"
                  >
                    {PRODUCT_CATEGORIES.map((cat) => (
                      <option key={cat.id} value={cat.slug}>
                        {cat.title} ({cat.departmentCode})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#202124] uppercase tracking-wider mb-1">
                    Requirement Type
                  </label>
                  <select
                    value={formData.estimatedQuantity}
                    onChange={(e) => setFormData({ ...formData, estimatedQuantity: e.target.value })}
                    className="w-full rounded-xl border border-[#E4E8EE] bg-[#F8F9FA] px-3.5 py-2.5 text-xs text-[#202124] focus:border-[#1A73E8] focus:bg-white focus:outline-none"
                  >
                    <option value="Bulk / Hospital Tender">Bulk / Hospital Tender</option>
                    <option value="Monthly Routine Supply">Monthly Routine Supply</option>
                    <option value="Emergency ICU Dispatch">Emergency ICU Dispatch</option>
                    <option value="Distributor / Wholesale Inquiry">Distributor / Wholesale Inquiry</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#202124] uppercase tracking-wider mb-1">
                  Specific Products or Tender Notes
                </label>
                <textarea
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Please list required medicines, disposable specs, or batch documentation requests..."
                  className="w-full rounded-xl border border-[#E4E8EE] bg-[#F8F9FA] p-3 text-xs text-[#202124] focus:border-[#1A73E8] focus:bg-white focus:outline-none resize-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-between border-t border-[#E4E8EE]">
                <span className="text-[11px] text-[#5F6368] flex items-center gap-1.5">
                  <ShieldCheck className="h-4 w-4 text-[#269653]" /> DRAP Verification Available
                </span>

                <button
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-xl bg-[#0B3D78] px-6 py-2.5 text-xs font-bold text-white shadow-md hover:bg-[#1A73E8] transition-all"
                >
                  <Send className="h-3.5 w-3.5" /> Submit Request
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
