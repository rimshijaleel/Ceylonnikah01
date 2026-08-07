import React, { useState } from 'react';
import { NavPage, Profile } from '../types';
import { 
  ShieldCheck, Lock, HeartHandshake, Search, Users, Shield, 
  MessageCircle, Sparkles, CheckCircle, ArrowRight 
} from 'lucide-react';

interface HomeViewProps {
  profiles: Profile[];
  onPageChange: (page: NavPage) => void;
  onSelectProfile: (profile: Profile) => void;
  onShareWhatsApp: (profile: Profile) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  profiles,
  onPageChange,
  onSelectProfile,
  onShareWhatsApp,
}) => {
  const [filterGender, setFilterGender] = useState('');
  const [filterDistrict, setFilterDistrict] = useState('');

  // Filter top 8 profiles for homepage showcase
  const featuredProfiles = profiles.filter((p) => {
    if (filterGender && p.gender !== filterGender) return false;
    if (filterDistrict && p.district !== filterDistrict) return false;
    return true;
  }).slice(0, 8);

  return (
    <div className="min-h-screen bg-slate-50">
      
      {/* HERO SECTION */}
      <section className="relative max-w-7xl mx-auto my-6 px-4 sm:px-6 lg:px-8">
        <div className="bg-sleek-dark text-white rounded-[2.5rem] border border-slate-800 shadow-2xl overflow-hidden py-16 sm:py-20 px-6 sm:px-12 relative">
          
          {/* Decorative Grid Light Pattern */}
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <svg width="100%" height="100%">
              <pattern id="sleekGrid" width="32" height="32" patternUnits="userSpaceOnUse">
                <path d="M 32 0 L 0 0 0 32" fill="none" stroke="#2dd4bf" strokeWidth="0.8" />
              </pattern>
              <rect width="100%" height="100%" fill="url(#sleekGrid)" />
            </svg>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
            
            {/* Hero Text */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] px-3.5 py-1.5 rounded-full bg-teal-500/10 text-teal-400 border border-teal-500/20 shadow-sm">
                <ShieldCheck className="w-3.5 h-3.5 text-teal-400" />
                <span>Privacy-First Matrimonial Platform</span>
              </div>

              <h1 className="font-poppins font-black text-3xl sm:text-5xl lg:text-6xl tracking-tight leading-tight text-white">
                Find a Meaningful Match with <span className="text-teal-400">Trust</span>, <span className="text-white">Privacy</span> & <span className="text-teal-400 font-serif-display italic">Faith</span>
              </h1>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl font-poppins">
                Built on trust, privacy, and values, our system helps families connect with the right matches through a refined and secure digital experience.
              </p>

              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
                <button
                  onClick={() => onPageChange('register')}
                  className="px-7 py-3.5 bg-teal-600 hover:bg-teal-500 text-white font-poppins font-bold text-xs uppercase tracking-wider rounded-full shadow-lg shadow-teal-600/30 transition-all transform hover:-translate-y-0.5"
                >
                  Register Now
                </button>
                <button
                  onClick={() => onPageChange('login')}
                  className="px-7 py-3.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-poppins font-bold text-xs uppercase tracking-wider rounded-full transition-all"
                >
                  Login
                </button>
              </div>

              {/* Trust Pills */}
              <div className="pt-6 flex flex-wrap items-center justify-center lg:justify-start gap-3 text-xs font-poppins text-slate-300">
                <div className="flex items-center gap-1.5 bg-slate-800/80 px-3.5 py-1.5 rounded-full border border-slate-700">
                  <Lock className="w-3.5 h-3.5 text-teal-400" />
                  <span>Privacy-First</span>
                </div>
                <div className="flex items-center gap-1.5 bg-slate-800/80 px-3.5 py-1.5 rounded-full border border-slate-700">
                  <CheckCircle className="w-3.5 h-3.5 text-teal-400" />
                  <span>Verified Profiles</span>
                </div>
                <div className="flex items-center gap-1.5 bg-slate-800/80 px-3.5 py-1.5 rounded-full border border-slate-700">
                  <Users className="w-3.5 h-3.5 text-teal-400" />
                  <span>Parent-Managed</span>
                </div>
              </div>
            </div>

            {/* Hero Illustration Badge */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-72 h-72 sm:w-80 sm:h-80 rounded-3xl border border-teal-500/30 p-4 bg-slate-800/90 shadow-2xl flex items-center justify-center">
                <div className="w-full h-full rounded-2xl bg-gradient-to-br from-slate-900 to-teal-950 border border-teal-500/20 flex flex-col items-center justify-center p-6 text-center space-y-3">
                  <div className="w-20 h-20 rounded-2xl bg-teal-600/20 border border-teal-500 flex items-center justify-center text-teal-400 shadow-lg shadow-teal-500/10">
                    <HeartHandshake className="w-10 h-10" />
                  </div>
                  <h3 className="font-poppins font-black text-xl text-white tracking-tight">CEYLON NIKAH</h3>
                  <p className="text-xs text-slate-300 font-poppins">
                    Guided by Islamic values for genuine halal connections in Sri Lanka
                  </p>
                  <div className="text-[10px] font-black uppercase tracking-widest text-teal-300 bg-teal-950/80 px-3 py-1 rounded-full border border-teal-500/30">
                    100% Halal Matchmaking
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 2: GENUINE PROFILES SHOWCASE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center max-w-3xl mx-auto space-y-2 mb-10">
          <div className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-[0.2em] px-3.5 py-1.5 rounded-full bg-teal-500/10 text-teal-600 border border-teal-500/20">
            ✦ Genuine Profiles ✦
          </div>
          <h2 className="font-poppins font-black text-2xl sm:text-4xl text-slate-900 tracking-tight">
            Genuine Profiles for Meaningful <span className="text-teal-600">Matches</span>
          </h2>
          <p className="text-slate-600 text-sm font-poppins">
            Each profile is verified to maintain trust, privacy, and meaningful connections.
          </p>
        </div>

        {/* Quick Filter Toolbar */}
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200/80 flex flex-wrap items-center justify-between gap-4 mb-8">
          <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
            <select
              value={filterGender}
              onChange={(e) => setFilterGender(e.target.value)}
              className="px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 focus:outline-none focus:border-teal-600"
            >
              <option value="">All Genders</option>
              <option value="Male">Male Groom</option>
              <option value="Female">Female Bride</option>
            </select>

            <select
              value={filterDistrict}
              onChange={(e) => setFilterDistrict(e.target.value)}
              className="px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 focus:outline-none focus:border-teal-600"
            >
              <option value="">All Districts</option>
              <option value="Colombo">Colombo</option>
              <option value="Kandy">Kandy</option>
              <option value="Kalutara">Kalutara</option>
              <option value="Galle">Galle</option>
            </select>
          </div>

          <button
            onClick={() => onPageChange('profiles')}
            className="flex items-center gap-2 px-5 py-2.5 bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-md shadow-teal-600/20 transition-all"
          >
            <Search className="w-3.5 h-3.5 text-white" />
            <span>Search All Profiles</span>
          </button>
        </div>

        {/* Profiles Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProfiles.map((profile) => {
            const isMarried = profile.status === 'Married';
            return (
              <div
                key={profile.id}
                onClick={() => onSelectProfile(profile)}
                className={`bg-white rounded-3xl p-5 shadow-sm hover:shadow-xl border border-slate-200/80 hover:border-teal-500 transition-all cursor-pointer relative flex flex-col justify-between ${
                  isMarried ? 'opacity-70' : ''
                }`}
              >
                {isMarried && (
                  <div className="absolute top-3 right-3 bg-red-600 text-white text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full shadow">
                    SOLD OUT
                  </div>
                )}

                <div>
                  {/* Top Badge Row */}
                  <div className="flex items-center justify-between text-xs font-bold font-poppins mb-3">
                    <span className="text-slate-900 bg-slate-100 px-2.5 py-1 rounded-full border border-slate-200 font-mono text-[11px]">
                      {profile.regid}
                    </span>
                    <span className="text-slate-500 bg-slate-50 px-2.5 py-1 rounded-full text-[11px] font-semibold">
                      {profile.gender} · {profile.age} yrs
                    </span>
                  </div>

                  {/* Avatar Icon */}
                  <div className="flex justify-center my-3">
                    <div className="w-16 h-16 rounded-2xl bg-slate-900 text-teal-400 font-poppins font-black text-2xl flex items-center justify-center border border-slate-800 shadow-md">
                      {profile.gender === 'Female' ? '♀' : '♂'}
                    </div>
                  </div>

                  {/* Info */}
                  <div className="text-center space-y-1 mb-3">
                    <h4 className="font-poppins font-bold text-slate-900 text-base truncate">
                      {profile.name || 'Verified Member'}
                    </h4>
                    <p className="text-xs text-slate-500">
                      Live in <strong className="text-slate-800 font-bold">{profile.place || profile.district}</strong>
                    </p>
                  </div>

                  {/* Detail List */}
                  <div className="text-xs text-slate-600 space-y-1.5 bg-slate-50 p-3.5 rounded-2xl border border-slate-100 mb-4 font-poppins">
                    <div className="flex justify-between">
                      <span className="text-slate-400 font-medium">Height:</span>
                      <span className="font-bold text-slate-800">{profile.height}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400 font-medium">Marital:</span>
                      <span className="font-bold text-slate-800">{profile.marital}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400 font-medium">Education:</span>
                      <span className="font-bold text-slate-800 truncate max-w-[130px]">{profile.edu}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400 font-medium">Job:</span>
                      <span className="font-bold text-slate-800 truncate max-w-[130px]">{profile.occupation}</span>
                    </div>
                  </div>
                </div>

                {/* Card Action Buttons */}
                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectProfile(profile);
                    }}
                    className="py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl text-center transition-colors font-poppins"
                  >
                    View
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onShareWhatsApp(profile);
                    }}
                    className="py-2 bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1 shadow-sm transition-colors font-poppins"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* More Profiles Button */}
        <div className="text-center mt-12">
          <button
            onClick={() => onPageChange('profiles')}
            className="px-8 py-3.5 bg-teal-600 hover:bg-teal-500 text-white font-poppins font-bold text-xs uppercase tracking-wider rounded-full shadow-lg shadow-teal-600/20 transition-all inline-flex items-center gap-2"
          >
            <span>More Profiles</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* SECTION 3: YOUR JOURNEY TOWARDS A BLESSED MATCH */}
      <section className="bg-white py-16 border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-2 mb-12">
            <div className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded-full bg-teal-500/10 text-teal-600 border border-teal-500/20">
              ✦ Simple & Safe ✦
            </div>
            <h2 className="font-poppins font-black text-2xl sm:text-4xl text-slate-900 tracking-tight">
              Your Journey Towards a <span className="text-teal-600">Blessed Match</span>
            </h2>
            <p className="text-slate-600 text-sm font-poppins">
              Follow a trusted path built on faith, privacy, and family values.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Step 1 */}
            <div className="bg-slate-900 text-white p-6 rounded-3xl text-center relative flex flex-col items-center space-y-3 shadow-xl border border-slate-800">
              <div className="w-8 h-8 rounded-full bg-teal-600 text-white font-black font-poppins text-xs flex items-center justify-center">
                1
              </div>
              <h3 className="font-poppins font-bold text-lg text-white">Create Account</h3>
              <p className="text-xs text-slate-300 leading-relaxed font-poppins">
                Sign up as a parent or guardian with secure credentials.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-slate-900 text-white p-6 rounded-3xl text-center relative flex flex-col items-center space-y-3 shadow-xl border border-slate-800">
              <div className="w-8 h-8 rounded-full bg-teal-600 text-white font-black font-poppins text-xs flex items-center justify-center">
                2
              </div>
              <h3 className="font-poppins font-bold text-lg text-white">Add Basic Details</h3>
              <p className="text-xs text-slate-300 leading-relaxed font-poppins">
                Share essential information while keeping names private.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-slate-900 text-white p-6 rounded-3xl text-center relative flex flex-col items-center space-y-3 shadow-xl border border-slate-800">
              <div className="w-8 h-8 rounded-full bg-teal-600 text-white font-black font-poppins text-xs flex items-center justify-center">
                3
              </div>
              <h3 className="font-poppins font-bold text-lg text-white">Choose Subscription</h3>
              <p className="text-xs text-slate-300 leading-relaxed font-poppins">
                Select a plan that fits your timeline and needs.
              </p>
            </div>

            {/* Step 4 */}
            <div className="bg-slate-900 text-white p-6 rounded-3xl text-center relative flex flex-col items-center space-y-3 shadow-xl border border-slate-800">
              <div className="w-8 h-8 rounded-full bg-teal-600 text-white font-black font-poppins text-xs flex items-center justify-center">
                4
              </div>
              <h3 className="font-poppins font-bold text-lg text-white">Activate Profile</h3>
              <p className="text-xs text-slate-300 leading-relaxed font-poppins">
                Go live and start connecting with compatible matches.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 4: YOUR SAFETY IS OUR PRIORITY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center max-w-3xl mx-auto space-y-2 mb-12">
          <div className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded-full bg-teal-500/10 text-teal-600 border border-teal-500/20">
            ✦ Bank-Grade Security ✦
          </div>
          <h2 className="font-poppins font-black text-2xl sm:text-4xl text-slate-900 tracking-tight">
            Your Safety is Our <span className="text-teal-600">Priority</span>
          </h2>
          <p className="text-slate-600 text-sm font-poppins">
            Multiple layers of protection ensure your family's privacy and security at every interaction
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-slate-900 text-teal-400 flex items-center justify-center mx-auto mb-3">
              <Shield className="w-6 h-6" />
            </div>
            <h4 className="font-poppins font-bold text-slate-900 text-base">Secure Data</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Bank-level encryption protects all your information.
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-slate-900 text-teal-400 flex items-center justify-center mx-auto mb-3">
              <CheckCircle className="w-6 h-6" />
            </div>
            <h4 className="font-poppins font-bold text-slate-900 text-base">Admin Verification</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Every profile is manually reviewed for authenticity.
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-slate-900 text-teal-400 flex items-center justify-center mx-auto mb-3">
              <Lock className="w-6 h-6" />
            </div>
            <h4 className="font-poppins font-bold text-slate-900 text-base">Controlled Visibility</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              You decide what others can see at every step.
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-slate-900 text-teal-400 flex items-center justify-center mx-auto mb-3">
              <MessageCircle className="w-6 h-6" />
            </div>
            <h4 className="font-poppins font-bold text-slate-900 text-base">Safe Messaging</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              In-app messaging keeps your contact info private.
            </p>
          </div>
        </div>

        <div className="mt-8 text-center">
          <div className="inline-flex items-center gap-2 px-6 py-2.5 bg-teal-50 border border-teal-200 rounded-full text-xs font-bold text-teal-900">
            <ShieldCheck className="w-4 h-4 text-teal-600" />
            <span>Trusted by over 10,000+ families worldwide</span>
          </div>
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="bg-slate-900 text-white py-16 text-center border-t border-slate-800 my-8 max-w-7xl mx-auto rounded-[2.5rem]">
        <div className="max-w-3xl mx-auto px-4 space-y-4">
          <h2 className="font-poppins font-black text-3xl sm:text-4xl text-white tracking-tight">
            Ready to Begin Your <span className="text-teal-400">Journey</span>?
          </h2>
          <p className="text-slate-300 text-sm font-poppins">
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
