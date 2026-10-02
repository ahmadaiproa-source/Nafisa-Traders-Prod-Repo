import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { EnquiryFormData } from '../types';

interface ContactFormProps {
  defaultDepartment?: string;
  className?: string;
}

export const ContactForm: React.FC<ContactFormProps> = ({ defaultDepartment = 'General Enquiry', className = '' }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<EnquiryFormData>({
    fullName: '',
    companyOrHospital: '',
    phone: '',
    email: '',
    enquiryType: 'Hospital Supply',
    productDepartment: defaultDepartment,
    message: ''
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.phone) {
      return;
    }
    setStatus('submitting');
    setTimeout(() => {
      setStatus('success');
      setFormData({
        fullName: '',
        companyOrHospital: '',
        phone: '',
        email: '',
        enquiryType: 'Hospital Supply',
        productDepartment: 'General Enquiry',
        message: ''
      });

      // Redirect to website main page after submission
      setTimeout(() => {
        navigate('/');
      }, 1500);
    }, 600);
  };

  return (
    <div className={`rounded-2xl bg-white p-6 sm:p-8 border border-[#E4E8EE] shadow-sm ${className}`}>
      {status === 'success' ? (
        <div className="py-8 text-center flex flex-col items-center justify-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-[#269653] mb-4 animate-bounce">
            <CheckCircle2 className="h-8 w-8" />
          </div>
          <h3 className="font-heading text-xl font-bold text-[#0B3D78]">
            Quotation Submitted
          </h3>
          <p className="mt-2 text-sm text-[#5F6368] max-w-md">
            Thank you for your quotation request. Your details have been received successfully. Redirecting to the home page...
          </p>
          <button
            onClick={() => navigate('/')}
            className="mt-6 rounded-xl bg-[#1A73E8] px-5 py-2.5 text-xs font-semibold text-white hover:bg-[#1565C0] transition-colors"
          >
            Return to Home Page Now
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="fullName" className="block text-xs font-semibold uppercase tracking-wider text-[#202124] mb-1.5">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                required
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Dr. Ahmed Khan / Procurement Director"
                className="w-full rounded-xl border border-[#E4E8EE] bg-[#F8F9FA] px-4 py-3 text-sm text-[#202124] placeholder-slate-400 focus:border-[#1A73E8] focus:bg-white focus:outline-none transition-all"
              />
            </div>

            <div>
              <label htmlFor="companyOrHospital" className="block text-xs font-semibold uppercase tracking-wider text-[#202124] mb-1.5">
                Company / Hospital <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="companyOrHospital"
                name="companyOrHospital"
                required
                value={formData.companyOrHospital}
                onChange={handleChange}
                placeholder="Hospital / Institution Name"
                className="w-full rounded-xl border border-[#E4E8EE] bg-[#F8F9FA] px-4 py-3 text-sm text-[#202124] placeholder-slate-400 focus:border-[#1A73E8] focus:bg-white focus:outline-none transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="phone" className="block text-xs font-semibold uppercase tracking-wider text-[#202124] mb-1.5">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                required
                value={formData.phone}
                onChange={handleChange}
                placeholder="+92 300 1234567"
                className="w-full rounded-xl border border-[#E4E8EE] bg-[#F8F9FA] px-4 py-3 text-sm text-[#202124] placeholder-slate-400 focus:border-[#1A73E8] focus:bg-white focus:outline-none transition-all"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-wider text-[#202124] mb-1.5">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="name@hospital.org.pk"
                className="w-full rounded-xl border border-[#E4E8EE] bg-[#F8F9FA] px-4 py-3 text-sm text-[#202124] placeholder-slate-400 focus:border-[#1A73E8] focus:bg-white focus:outline-none transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="enquiryType" className="block text-xs font-semibold uppercase tracking-wider text-[#202124] mb-1.5">
                Enquiry Type
              </label>
              <select
                id="enquiryType"
                name="enquiryType"
                value={formData.enquiryType}
                onChange={handleChange}
                className="w-full rounded-xl border border-[#E4E8EE] bg-[#F8F9FA] px-4 py-3 text-sm text-[#202124] focus:border-[#1A73E8] focus:bg-white focus:outline-none transition-all"
              >
                <option value="Hospital Supply">Hospital Supply</option>
                <option value="General Enquiry">General Enquiry</option>
                <option value="Product Enquiry">Product Enquiry</option>
                <option value="Distribution Partnership">Distribution Partnership</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label htmlFor="productDepartment" className="block text-xs font-semibold uppercase tracking-wider text-[#202124] mb-1.5">
                Product / Department
              </label>
              <select
                id="productDepartment"
                name="productDepartment"
                value={formData.productDepartment}
                onChange={handleChange}
                className="w-full rounded-xl border border-[#E4E8EE] bg-[#F8F9FA] px-4 py-3 text-sm text-[#202124] focus:border-[#1A73E8] focus:bg-white focus:outline-none transition-all"
              >
                <option value="General Enquiry">General / Multi-Department</option>
                <option value="Oncology">Oncology</option>
                <option value="Cardiology">Cardiology</option>
                <option value="Urology">Urology</option>
                <option value="Surgical Disposables">Surgical Disposables</option>
                <option value="Psychiatric & Hypertension">Psychiatric & Hypertension</option>
                <option value="Gastroenterology & General">Gastroenterology & General</option>
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="message" className="block text-xs font-semibold uppercase tracking-wider text-[#202124] mb-1.5">
              Message / Requirements Details
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              value={formData.message}
              onChange={handleChange}
              placeholder="Please describe the medicines or surgical disposables required, quantity, and preferred supply timeline..."
              className="w-full rounded-xl border border-[#E4E8EE] bg-[#F8F9FA] px-4 py-3 text-sm text-[#202124] placeholder-slate-400 focus:border-[#1A73E8] focus:bg-white focus:outline-none transition-all resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={status === 'submitting'}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-[#1A73E8] px-8 py-3.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-[#1565C0] hover:shadow-md active:scale-95 disabled:opacity-70"
          >
            {status === 'submitting' ? (
              <span>Sending Enquiry...</span>
            ) : (
              <>
                <Send className="h-4 w-4" />
                <span>Send Enquiry</span>
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
};
