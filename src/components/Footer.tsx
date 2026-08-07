import React from 'react';
import { NavPage } from '../types';
import { Linkedin, Facebook, Twitter, Instagram, Shield, Heart } from 'lucide-react';

interface FooterProps {
  onPageChange: (page: NavPage) => void;
}

export const Footer: React.FC<FooterProps> = ({ onPageChange }) => {
  return (
    <footer className="bg-slate-950 text-slate-400 relative overflow-hidden pt-16 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
          
          {/* Brand Column */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 56 56">
                  <circle cx="28" cy="28" r="24" fill="none" stroke="#2dd4bf" strokeWidth="2.5" />
                  <path d="M33 12a17 17 0 1 0 0 32 14 14 0 1 1 0-32z" fill="#2dd4bf" />
                  <circle cx="37" cy="18" r="2.8" fill="#14b8a6" />
                </svg>
              </div>
              <span className="font-poppins font-black text-2xl text-white tracking-tight">Ceylon Nikah</span>
            </div>
            <p className="text-sm text-slate-400 max-w-md leading-relaxed font-poppins">
              A trusted matrimonial platform dedicated to helping families find meaningful and halal connections with complete privacy, modesty, and mutual respect.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-xl bg-slate-900 hover:bg-teal-600 hover:text-white border border-slate-800 flex items-center justify-center text-slate-300 transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-xl bg-slate-900 hover:bg-teal-600 hover:text-white border border-slate-800 flex items-center justify-center text-slate-300 transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-xl bg-slate-900 hover:bg-teal-600 hover:text-white border border-slate-800 flex items-center justify-center text-slate-300 transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-xl bg-slate-900 hover:bg-teal-600 hover:text-white border border-slate-800 flex items-center justify-center text-slate-300 transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-poppins font-bold text-teal-400 text-xs tracking-widest uppercase mb-4">
              Quick Navigation
            </h4>
            <ul className="space-y-2.5 text-sm font-poppins">
              <li>
                <button onClick={() => onPageChange('home')} className="hover:text-teal-400 transition-colors">Home</button>
              </li>
              <li>
                <button onClick={() => onPageChange('about')} className="hover:text-teal-400 transition-colors">About us</button>
              </li>
              <li>
                <button onClick={() => onPageChange('packages')} className="hover:text-teal-400 transition-colors">Packages & Pricing</button>
              </li>
              <li>
                <button onClick={() => onPageChange('profiles')} className="hover:text-teal-400 transition-colors">Verified Profiles</button>
              </li>
              <li>
                <button onClick={() => onPageChange('contact')} className="hover:text-teal-400 transition-colors">Contact Support</button>
              </li>
            </ul>
          </div>

          {/* Contact Summary */}
          <div>
            <h4 className="font-poppins font-bold text-teal-400 text-xs tracking-widest uppercase mb-4">
              Support Info
            </h4>
            <div className="space-y-3 text-sm text-slate-400 font-poppins">
              <p><strong className="text-white font-semibold">Email:</strong> ceylonnikah24@gmail.com</p>
              <p><strong className="text-white font-semibold">Hotline:</strong> +94 70 568 7697</p>
              <p><strong className="text-white font-semibold">WhatsApp:</strong> +94 75 668 2323</p>
              <p><strong className="text-white font-semibold">Address:</strong> 120/3 Colombo, Srilanka</p>
            </div>
          </div>

        </div>

        {/* Large Decorative Watermark */}
        <div className="text-center py-6 select-none pointer-events-none opacity-5 font-poppins font-black text-4xl sm:text-7xl md:text-8xl tracking-widest text-white">
          CEYLON NIKAH
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 font-poppins gap-4">
          <p>© {new Date().getFullYear()} Ceylon Nikah. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <button onClick={() => onPageChange('contact')} className="hover:text-slate-300 transition-colors">
              Terms & Privacy Policy
            </button>
            <span>Developed for Sri Lankan Muslim Families</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
