import React, { useState } from 'react';
import { NavPage } from '../types';
import { CheckCircle2, ChevronDown, ChevronUp, Sparkles, Building2, HelpCircle } from 'lucide-react';

interface PackagesViewProps {
  onPageChange: (page: NavPage) => void;
}

export const PackagesView: React.FC<PackagesViewProps> = ({ onPageChange }) => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: "How do I create an account?",
      a: "You can click on the 'Register' button in the menu bar. Fill in basic details such as email, phone, and profile information. Our admin team verifies each account before approval."
    },
    {
      q: "Is my personal information kept private?",
      a: "Yes! We follow strict privacy-first guidelines. Names, exact addresses, and full photos are protected and only shown with your permission or based on your client account settings."
    },
    {
      q: "Can family members manage my profile?",
      a: "Absolutely. Most of our profiles are managed directly by parents, siblings, or guardians to ensure a dignified, halal process."
    },
    {
      q: "How do I find a suitable match?",
      a: "Use our comprehensive filter tool on the 'Profiles' page. You can filter candidates by age, height, district, marital status, education level, and profession."
    },
    {
      q: "Is this platform only for Muslims?",
      a: "Yes, Ceylon Nikah is specialized specifically for the Sri Lankan Muslim community, honoring Islamic traditions and family values."
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      
      {/* Hero Header */}
      <section className="relative max-w-7xl mx-auto my-6 px-4 sm:px-6 lg:px-8">
        <div className="bg-sleek-dark text-white rounded-[2.5rem] border border-slate-800 shadow-2xl py-14 px-6 sm:px-12 text-center relative overflow-hidden">
          <div className="max-w-4xl mx-auto space-y-4 relative z-10">
            <div className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] px-3.5 py-1.5 rounded-full bg-teal-500/10 text-teal-400 border border-teal-500/20 font-poppins">
              Find the Right Plan for Your Journey and Commitment
            </div>

            <h1 className="font-poppins font-black text-3xl sm:text-5xl tracking-tight text-white">
              Choose a plan that fits <span className="text-teal-400">Your Journey</span>
            </h1>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto font-poppins">
              Explore our carefully designed packages that offer the right balance of privacy, support, and visibility to help you find your ideal life partner with confidence.
            </p>
          </div>
        </div>
      </section>

      {/* PRICING CARDS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Plan 1: 6 Months */}
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200/80 relative flex flex-col justify-between hover:border-teal-500 transition-all">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="bg-teal-500/10 text-teal-600 border border-teal-500/20 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider font-poppins">
                  Most Popular
                </span>
                <span className="bg-red-50 text-red-600 border border-red-100 text-xs font-black px-2.5 py-0.5 rounded-full">
                  -46.7% OFF
                </span>
              </div>

              <h3 className="font-poppins font-bold text-slate-900 text-xl mb-1">
                6 Months Membership
              </h3>
              
              <div className="my-4">
                <span className="text-3xl font-black text-slate-900 font-poppins">12,500</span>
                <span className="text-xs font-bold text-slate-500 ml-1">LKR / 180 days</span>
                <div className="text-xs text-slate-400 line-through mt-0.5 font-mono">Rs 14,000.00</div>
                <div className="text-xs text-teal-600 font-bold mt-0.5">You save Rs 2,400.00!</div>
              </div>

              <div className="border-t border-slate-100 pt-4 space-y-3 text-xs text-slate-600 font-poppins">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                  <span>Unlimited Profiles Access</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                  <span>Send Unlimited Requests</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                  <span>Send Unlimited Messages</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                  <span>View Verified Mobile Numbers</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                  <span>View Verified WhatsApp Contact</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => onPageChange('register')}
              className="mt-8 w-full py-3 bg-teal-600 hover:bg-teal-500 text-white font-poppins font-bold text-xs uppercase tracking-wider rounded-xl shadow-md shadow-teal-600/20 transition-colors"
            >
              Get Started Now
            </button>
          </div>

          {/* Plan 2: 3 Months (Featured Dark Card) */}
          <div className="bg-slate-900 rounded-3xl p-8 shadow-2xl border-2 border-teal-500 relative flex flex-col justify-between text-white transform md:-translate-y-2">
            <div className="absolute -top-3.5 left-1/2 transform -translate-x-1/2 bg-teal-600 text-white text-[10px] font-black px-4 py-1 rounded-full uppercase tracking-wider font-poppins shadow">
              Best Value Plan
            </div>

            <div>
              <div className="flex items-center justify-between mb-4 pt-2">
                <span className="text-[10px] font-black uppercase tracking-widest text-teal-400 font-poppins">
                  ✦ Fast Matchmaking
                </span>
                <span className="bg-red-500/20 text-red-400 border border-red-500/30 text-xs font-black px-2.5 py-0.5 rounded-full">
                  -48% OFF
                </span>
              </div>

              <h3 className="font-poppins font-bold text-white text-xl mb-1">
                3 Months Membership
              </h3>
              
              <div className="my-4">
                <span className="text-3xl font-black text-teal-400 font-poppins">8,499</span>
                <span className="text-xs font-bold text-slate-300 ml-1">LKR / 90 days</span>
                <div className="text-xs text-slate-400 line-through mt-0.5 font-mono">Rs 9,999.00</div>
                <div className="text-xs text-teal-300 font-bold mt-0.5">You save Rs 1,500.00!</div>
              </div>

              <div className="border-t border-slate-800 pt-4 space-y-3 text-xs text-slate-300 font-poppins">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
                  <span>View Unlimited Profiles</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
                  <span>Send Unlimited Requests</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
                  <span>Send Unlimited Messages</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
                  <span>View Verified Mobile Numbers</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
                  <span>View Verified WhatsApp Contact</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => onPageChange('register')}
              className="mt-8 w-full py-3.5 bg-teal-600 hover:bg-teal-500 text-white font-poppins font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg shadow-teal-600/30 transition-colors"
            >
              Choose 3 Months Plan
            </button>
          </div>

          {/* Plan 3: 9 Months */}
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200/80 relative flex flex-col justify-between hover:border-teal-500 transition-all">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="bg-slate-100 text-slate-800 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider font-poppins border border-slate-200">
                  Extended Plan
                </span>
                <span className="bg-red-50 text-red-600 border border-red-100 text-xs font-black px-2.5 py-0.5 rounded-full">
                  -21.8% OFF
                </span>
              </div>

              <h3 className="font-poppins font-bold text-slate-900 text-xl mb-1">
                9 Months Membership
              </h3>
              
              <div className="my-4">
                <span className="text-3xl font-black text-slate-900 font-poppins">16,499</span>
                <span className="text-xs font-bold text-slate-500 ml-1">LKR / 270 days</span>
                <div className="text-xs text-slate-400 line-through mt-0.5 font-mono">Rs 18,000.00</div>
                <div className="text-xs text-teal-600 font-bold mt-0.5">You save Rs 2,500.00!</div>
              </div>

              <div className="border-t border-slate-100 pt-4 space-y-3 text-xs text-slate-600 font-poppins">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                  <span>View Unlimited Profiles</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                  <span>Send Unlimited Messages</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                  <span>Send Unlimited Requests</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                  <span>View Mobile & WhatsApp Numbers</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                  <span>Post Your Profile 6 Times (Featured)</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => onPageChange('register')}
              className="mt-8 w-full py-3 bg-teal-600 hover:bg-teal-500 text-white font-poppins font-bold text-xs uppercase tracking-wider rounded-xl shadow-md shadow-teal-600/20 transition-colors"
            >
              Get Started Now
            </button>
          </div>

        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center max-w-3xl mx-auto space-y-2 mb-12">
          <div className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded-full bg-teal-500/10 text-teal-600 border border-teal-500/20">
            ✦ Clear Answers ✦
          </div>
          <h2 className="font-poppins font-black text-2xl sm:text-4xl text-slate-900 tracking-tight">
            Frequently Asked <span className="text-teal-600">Questions</span>
          </h2>
          <p className="text-slate-600 text-sm font-poppins">
            Find clear answers to common questions about creating your profile and finding the right match.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Support Box */}
          <div className="lg:col-span-5 bg-white p-8 rounded-3xl shadow-sm border border-slate-200/80 flex flex-col items-center text-center space-y-4">
            <div className="w-20 h-20 rounded-2xl bg-slate-900 text-teal-400 flex items-center justify-center border border-slate-800 shadow-md">
              <Building2 className="w-10 h-10" />
            </div>
            <h4 className="font-poppins font-bold text-slate-900 text-xl">
              Ceylon Nikah Support
            </h4>
            <p className="text-xs text-slate-500 leading-relaxed font-poppins">
              Have a specific question not listed here? Our support team is always available via WhatsApp or email.
            </p>
            <button
              onClick={() => onPageChange('contact')}
              className="px-6 py-2.5 bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow"
            >
              Contact Support
            </button>
          </div>

          {/* Accordion Questions */}
          <div className="lg:col-span-7 space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 font-poppins font-bold text-slate-900 text-sm hover:text-teal-600"
                  >
                    <span>{faq.q}</span>
                    {isOpen ? (
                      <ChevronUp className="w-5 h-5 text-teal-600 shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />
                    )}
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 pt-0 text-xs text-slate-600 leading-relaxed font-poppins border-t border-slate-100 mt-1">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="bg-slate-900 text-white py-16 text-center border-t border-slate-800 my-8 max-w-7xl mx-auto rounded-[2.5rem]">
        <div className="max-w-3xl mx-auto px-4 space-y-4">
          <h2 className="font-poppins font-black text-3xl sm:text-4xl text-white tracking-tight">
            Choose the Right Plan for Your <span className="text-teal-400">Journey</span>
          </h2>
          <p className="text-slate-300 text-sm font-poppins">
            Select a plan that suits your needs and begin your journey towards finding a meaningful and blessed life partner.
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
