import React, { useState } from 'react';
import { NavPage, ContactFormData } from '../types';
import { Mail, Phone, MapPin, CheckCircle2, MessageSquare, Instagram, Facebook, Send } from 'lucide-react';

interface ContactViewProps {
  onPageChange: (page: NavPage) => void;
}

export const ContactView: React.FC<ContactViewProps> = ({ onPageChange }) => {
  const [formData, setFormData] = useState<ContactFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ firstName: '', lastName: '', email: '', phone: '', message: '' });
    }, 5000);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      
      {/* Hero Header Section */}
      <section className="relative max-w-7xl mx-auto my-6 px-4 sm:px-6 lg:px-8">
        <div className="bg-sleek-dark text-white rounded-[2.5rem] border border-slate-800 shadow-2xl py-16 px-6 sm:px-12 text-center relative overflow-hidden">
          <div className="max-w-4xl mx-auto relative z-10 space-y-4">
            <div className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] px-3.5 py-1.5 rounded-full bg-teal-500/10 text-teal-400 border border-teal-500/20 font-poppins">
              Guided by faith, rooted in family values.
            </div>
            <h1 className="font-poppins font-black text-3xl sm:text-5xl tracking-tight text-white">
              Get in Touch for Support and <span className="text-teal-400 font-serif-display italic">Guidance</span>
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto font-poppins">
              Reach out to us for support, guidance, or any questions you may have. Our team is here to assist you with care and professionalism, ensuring a smooth and reassuring experience throughout your journey.
            </p>
          </div>
        </div>
      </section>

      {/* 3 Main Contact Info Cards */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Email Card */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200/80 text-center flex flex-col items-center hover:border-teal-500 transition-all transform hover:-translate-y-1">
            <div className="w-14 h-14 rounded-2xl bg-slate-900 text-teal-400 flex items-center justify-center mb-4 border border-slate-800 shadow-md">
              <Mail className="w-6 h-6" />
            </div>
            <h3 className="font-poppins font-bold text-slate-900 text-lg mb-1">Email Address</h3>
            <a href="mailto:ceylonnikah24@gmail.com" className="text-teal-600 hover:text-teal-700 font-bold text-sm transition-colors">
              ceylonnikah24@gmail.com
            </a>
          </div>

          {/* Contact Info Card */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200/80 text-center flex flex-col items-center hover:border-teal-500 transition-all transform hover:-translate-y-1">
            <div className="w-14 h-14 rounded-2xl bg-slate-900 text-teal-400 flex items-center justify-center mb-4 border border-slate-800 shadow-md">
              <Phone className="w-6 h-6" />
            </div>
            <h3 className="font-poppins font-bold text-slate-900 text-lg mb-1">Contact Info</h3>
            <div className="space-y-1 text-sm font-bold text-teal-600">
              <p><a href="tel:+94705687697" className="hover:text-teal-700">+94 70 568 7697</a></p>
              <p><a href="tel:+94756682323" className="hover:text-teal-700">+94 75 668 2323</a></p>
            </div>
          </div>

          {/* Address Card */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200/80 text-center flex flex-col items-center hover:border-teal-500 transition-all transform hover:-translate-y-1">
            <div className="w-14 h-14 rounded-2xl bg-slate-900 text-teal-400 flex items-center justify-center mb-4 border border-slate-800 shadow-md">
              <MapPin className="w-6 h-6" />
            </div>
            <h3 className="font-poppins font-bold text-slate-900 text-lg mb-1">Our Address</h3>
            <p className="text-slate-700 font-medium text-sm">
              No - 120/3 Colombo, Srilanka
            </p>
          </div>

        </div>
      </section>

      {/* Main Form & Support Info Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column - Support Details */}
          <div className="lg:col-span-5 space-y-6">
            <h2 className="font-poppins font-black text-2xl sm:text-3xl text-slate-900 tracking-tight leading-tight">
              Talk to Our Support Team Today
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              Get in touch with our team for any questions or support throughout your journey. We're here to guide you with care, privacy, and professionalism.
            </p>

            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-poppins font-bold text-slate-900 text-sm">Personalized Guidance</h4>
                  <p className="text-xs text-slate-500">Receive support tailored to your matchmaking journey.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-poppins font-bold text-slate-900 text-sm">Private & Secure Communication</h4>
                  <p className="text-xs text-slate-500">Your information and conversations are handled with complete confidentiality.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-poppins font-bold text-slate-900 text-sm">Faith-Centered Support</h4>
                  <p className="text-xs text-slate-500">Our team understands your values and is here to help you every step of the way.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-poppins font-bold text-slate-900 text-sm">Quick Response Time</h4>
                  <p className="text-xs text-slate-500">We aim to respond to all enquiries within 24 hours.</p>
                </div>
              </div>
            </div>

            {/* Social Icons */}
            <div className="pt-4 flex items-center gap-3">
              <a
                href="https://wa.me/94756682323"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-[#25D366] text-white flex items-center justify-center hover:opacity-90 shadow transition-all"
                title="WhatsApp Us"
              >
                <MessageSquare className="w-5 h-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-[#e1306c] text-white flex items-center justify-center hover:opacity-90 shadow transition-all"
                title="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-[#1877f2] text-white flex items-center justify-center hover:opacity-90 shadow transition-all"
                title="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Right Column - Form */}
          <div className="lg:col-span-7 bg-white p-8 rounded-3xl shadow-sm border border-slate-200/80">
            <h3 className="font-poppins font-bold text-slate-900 text-xl mb-6">
              Please enter your information
            </h3>

            {submitted ? (
              <div className="bg-teal-50 border border-teal-200 text-teal-900 p-6 rounded-2xl text-center space-y-2">
                <CheckCircle2 className="w-12 h-12 text-teal-600 mx-auto" />
                <h4 className="font-poppins font-bold text-lg">Message Sent Successfully!</h4>
                <p className="text-sm text-teal-700">
                  JazakAllah Khair for reaching out. Our support team at Ceylon Nikah will respond to you shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1 font-poppins">First Name</label>
                    <input
                      type="text"
                      required
                      placeholder="John"
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold focus:bg-white focus:border-teal-600 focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1 font-poppins">Last Name</label>
                    <input
                      type="text"
                      required
                      placeholder="Doe"
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold focus:bg-white focus:border-teal-600 focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1 font-poppins">Email</label>
                    <input
                      type="email"
                      required
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold focus:bg-white focus:border-teal-600 focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1 font-poppins">Phone (optional)</label>
                    <input
                      type="tel"
                      placeholder="+94 77 123 4567"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold focus:bg-white focus:border-teal-600 focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1 font-poppins">Message</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Enter your message..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold focus:bg-white focus:border-teal-600 focus:outline-none transition-colors resize-y"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-teal-600 hover:bg-teal-500 text-white font-poppins font-bold text-xs uppercase tracking-wider rounded-xl shadow-md shadow-teal-600/20 transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Message</span>
                </button>
              </form>
            )}
          </div>

        </div>
      </section>

      {/* Ready to Begin Your Journey Banner */}
      <section className="bg-slate-900 text-white py-16 text-center border-t border-slate-800 my-8 max-w-7xl mx-auto rounded-[2.5rem]">
        <div className="max-w-3xl mx-auto px-4 space-y-4">
          <h2 className="font-poppins font-black text-3xl sm:text-4xl text-white tracking-tight">
            Ready to Begin Your <span className="text-teal-400">Journey</span>?
          </h2>
          <p className="text-slate-300 text-sm sm:text-base font-poppins">
            Join thousands of families who have found meaningful connections through our platform
          </p>
          <div className="flex items-center justify-center gap-4 pt-2">
            <button
              onClick={() => onPageChange('register')}
              className="px-6 py-3 bg-teal-600 hover:bg-teal-500 text-white font-poppins font-bold text-xs uppercase tracking-wider rounded-full shadow-lg shadow-teal-600/30 transition-all"
            >
              Register Now
            </button>
            <button
              onClick={() => onPageChange('login')}
              className="px-6 py-3 border border-slate-700 bg-slate-800 text-white hover:bg-slate-700 font-poppins font-bold text-xs uppercase tracking-wider rounded-full transition-all"
            >
              Login
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
