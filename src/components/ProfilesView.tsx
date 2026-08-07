import React, { useState } from 'react';
import { NavPage, Profile, UserSession } from '../types';
import { SL_DISTRICTS } from '../data/initialProfiles';
import { Search, Filter, MessageCircle, RotateCcw, CheckCircle2, Shield } from 'lucide-react';

interface ProfilesViewProps {
  profiles: Profile[];
  userSession: UserSession;
  onPageChange: (page: NavPage) => void;
  onSelectProfile: (profile: Profile) => void;
  onShareWhatsApp: (profile: Profile) => void;
  onOpenAddProfile?: () => void;
}

export const ProfilesView: React.FC<ProfilesViewProps> = ({
  profiles,
  userSession,
  onPageChange,
  onSelectProfile,
  onShareWhatsApp,
  onOpenAddProfile,
}) => {
  // Filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [minAge, setMinAge] = useState('');
  const [maxAge, setMaxAge] = useState('');
  const [genderFilter, setGenderFilter] = useState('');
  const [districtFilter, setDistrictFilter] = useState('');
  const [maritalFilter, setMaritalFilter] = useState('');
  const [eduFilter, setEduFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('Available');
  const [sortBy, setSortBy] = useState<'newest' | 'age'>('newest');

  // Filter logic respecting UserSession permissions
  const allowedProfiles = profiles.filter((p) => {
    if (userSession.role === 'client' && userSession.perms) {
      if (userSession.perms.gender && p.gender !== userSession.perms.gender) return false;
      if (
        userSession.perms.districts &&
        userSession.perms.districts.length > 0 &&
        !userSession.perms.districts.includes(p.district)
      ) {
        return false;
      }
    }
    return true;
  });

  const filteredProfiles = allowedProfiles.filter((p) => {
    // Reg ID / Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      const combined = `${p.regid} ${p.name || ''} ${p.place} ${p.district} ${p.occupation} ${p.edu}`.toLowerCase();
      if (!combined.includes(q)) return false;
    }

    // Gender
    if (genderFilter && p.gender !== genderFilter) return false;

    // District
    if (districtFilter && p.district !== districtFilter) return false;

    // Marital Status
    if (maritalFilter && p.marital !== maritalFilter) return false;

    // Education
    if (eduFilter && !p.edu.toLowerCase().includes(eduFilter.toLowerCase())) return false;

    // Status
    if (statusFilter && p.status !== statusFilter) return false;

    // Age
    const ageNum = Number(p.age);
    if (minAge && ageNum < Number(minAge)) return false;
    if (maxAge && ageNum > Number(maxAge)) return false;

    return true;
  });

  // Sorting
  const sortedProfiles = [...filteredProfiles].sort((a, b) => {
    if (sortBy === 'age') return Number(a.age) - Number(b.age);
    return (b.createdAt || 0) - (a.createdAt || 0);
  });

  const resetFilters = () => {
    setSearchQuery('');
    setMinAge('');
    setMaxAge('');
    setGenderFilter('');
    setDistrictFilter('');
    setMaritalFilter('');
    setEduFilter('');
    setStatusFilter('Available');
  };

  return (
    <div className="min-h-screen bg-slate-50">
      
      {/* Top Banner Header */}
      <section className="relative max-w-7xl mx-auto my-6 px-4 sm:px-6 lg:px-8">
        <div className="bg-sleek-dark text-white rounded-[2.5rem] border border-slate-800 shadow-2xl py-12 px-6 sm:px-12 text-center relative overflow-hidden">
          <div className="max-w-4xl mx-auto space-y-3 relative z-10">
            <div className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] px-3.5 py-1 rounded-full bg-teal-500/10 text-teal-400 border border-teal-500/20 font-poppins">
              Follow a trusted path built on faith, privacy, and family values.
            </div>
            <h1 className="font-poppins font-black text-3xl sm:text-5xl text-white tracking-tight">
              Your Journey Towards <span className="text-teal-400">Blessed Match</span>
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-2xl mx-auto font-poppins">
              Begin a meaningful journey guided by faith, trust, and sincere intentions. Our platform is designed to help you find a compatible life partner while honoring values, family involvement, and spiritual connection.
            </p>

            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={() => onPageChange('register')}
                className="px-6 py-2.5 bg-teal-600 hover:bg-teal-500 text-white font-poppins font-bold text-xs uppercase tracking-wider rounded-full shadow-lg shadow-teal-600/30"
              >
                Register Now
              </button>
              <button
                onClick={() => onPageChange('login')}
                className="px-6 py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-poppins font-bold text-xs uppercase tracking-wider rounded-full border border-slate-700"
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Search & Grid Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Sidebar Filter Column */}
          <div className="lg:col-span-3 bg-white p-6 rounded-3xl shadow-sm border border-slate-200/80 space-y-5 h-fit">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-poppins font-bold text-slate-900 text-base flex items-center gap-2">
                <Filter className="w-4 h-4 text-teal-600" />
                <span>Search Filters</span>
              </h3>
              <button
                onClick={resetFilters}
                className="text-xs text-slate-500 hover:text-teal-600 flex items-center gap-1 font-poppins font-semibold"
                title="Reset"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            </div>

            {/* Reg ID / Search input */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1 font-poppins">Search by Member ID / Keywords</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="e.g. USR-13193, Dehiwala..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-8 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:bg-white focus:border-teal-600 focus:outline-none"
                />
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
              </div>
            </div>

            {/* Gender */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1 font-poppins">Gender</label>
              <select
                value={genderFilter}
                onChange={(e) => setGenderFilter(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 focus:bg-white focus:border-teal-600 focus:outline-none"
              >
                <option value="">Any Gender</option>
                <option value="Male">Male Groom</option>
                <option value="Female">Female Bride</option>
              </select>
            </div>

            {/* District */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1 font-poppins">District (Sri Lanka)</label>
              <select
                value={districtFilter}
                onChange={(e) => setDistrictFilter(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 focus:bg-white focus:border-teal-600 focus:outline-none"
              >
                <option value="">All Districts</option>
                {SL_DISTRICTS.map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>

            {/* Age Range */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1 font-poppins">Age Range</label>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="number"
                  placeholder="Min (18)"
                  value={minAge}
                  onChange={(e) => setMinAge(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700"
                />
                <input
                  type="number"
                  placeholder="Max (60)"
                  value={maxAge}
                  onChange={(e) => setMaxAge(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700"
                />
              </div>
            </div>

            {/* Marital Status */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1 font-poppins">Marital Status</label>
              <select
                value={maritalFilter}
                onChange={(e) => setMaritalFilter(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 focus:bg-white focus:border-teal-600 focus:outline-none"
              >
                <option value="">Any Status</option>
                <option value="Never Married">Never Married</option>
                <option value="Divorced">Divorced</option>
                <option value="Widowed">Widowed</option>
              </select>
            </div>

            {/* Status (Available / Married) */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1 font-poppins">Availability Status</label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 focus:bg-white focus:border-teal-600 focus:outline-none"
              >
                <option value="">All Profiles</option>
                <option value="Available">Available Only</option>
                <option value="Married">Sold Out (Married)</option>
              </select>
            </div>

            <button
              onClick={() => {}}
              className="w-full py-2.5 bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow transition-colors font-poppins"
            >
              Apply Filters
            </button>
          </div>

          {/* Right Column Profile Grid */}
          <div className="lg:col-span-9 space-y-6">
            
            {/* Results Header Bar */}
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200/80 flex flex-wrap items-center justify-between gap-4">
              <div className="text-xs font-poppins font-semibold text-slate-700">
                Found <span className="text-teal-600 font-black text-sm">{sortedProfiles.length}</span> profiles
                {userSession.role === 'client' && userSession.perms?.districts?.length ? (
                  <span className="text-teal-600 font-semibold ml-2">
                    (Restricted to assigned districts)
                  </span>
                ) : null}
              </div>

              <div className="flex items-center gap-3">
                {userSession.role === 'admin' && onOpenAddProfile && (
                  <button
                    onClick={onOpenAddProfile}
                    className="px-3.5 py-1.5 bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow"
                  >
                    + Add New Profile
                  </button>
                )}

                <div className="flex items-center gap-2 text-xs font-poppins">
                  <span className="text-slate-500 font-semibold">Sort:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as 'newest' | 'age')}
                    className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700"
                  >
                    <option value="newest">Newest First</option>
                    <option value="age">Age: Low to High</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Grid Cards */}
            {sortedProfiles.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-slate-200/80 space-y-3">
                <Search className="w-12 h-12 text-slate-300 mx-auto" />
                <h3 className="font-poppins font-bold text-slate-800 text-base">No Profiles Found</h3>
                <p className="text-xs text-slate-500 max-w-md mx-auto">
                  Try broadening your search filters or resetting the filter options.
                </p>
                <button
                  onClick={resetFilters}
                  className="px-4 py-2 bg-teal-600 text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {sortedProfiles.map((p) => {
                  const isMarried = p.status === 'Married';
                  return (
                    <div
                      key={p.id}
                      onClick={() => onSelectProfile(p)}
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
                        {/* Top ID & Age Header */}
                        <div className="flex items-center justify-between text-xs font-bold font-poppins mb-3">
                          <span className="text-slate-900 bg-slate-100 px-2.5 py-1 rounded-full border border-slate-200 font-mono text-[11px]">
                            {p.regid}
                          </span>
                          <span className="text-slate-500 bg-slate-50 px-2.5 py-1 rounded-full text-[11px] font-semibold">
                            {p.gender} · {p.age} yrs
                          </span>
                        </div>

                        {/* Avatar */}
                        <div className="flex justify-center my-3">
                          <div className="w-16 h-16 rounded-2xl bg-slate-900 text-teal-400 font-poppins font-black text-2xl flex items-center justify-center border border-slate-800 shadow-md">
                            {p.gender === 'Female' ? '♀' : '♂'}
                          </div>
                        </div>

                        {/* Title */}
                        <div className="text-center space-y-1 mb-3">
                          <h4 className="font-poppins font-bold text-slate-900 text-base truncate">
                            {p.name || 'Verified Candidate'}
                          </h4>
                          <p className="text-xs text-slate-500 font-poppins">
                            Live in <strong className="text-slate-800 font-bold">{p.place || p.district}</strong>
                          </p>
                        </div>

                        {/* Details Table */}
                        <div className="text-xs text-slate-600 space-y-1.5 bg-slate-50 p-3.5 rounded-2xl border border-slate-100 mb-4 font-poppins">
                          <div className="flex justify-between">
                            <span className="text-slate-400 font-medium">Height:</span>
                            <span className="font-bold text-slate-800">{p.height}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-400 font-medium">Marital:</span>
                            <span className="font-bold text-slate-800">{p.marital}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-400 font-medium">Education:</span>
                            <span className="font-bold text-slate-800 truncate max-w-[130px]">{p.edu}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-400 font-medium">Job:</span>
                            <span className="font-bold text-slate-800 truncate max-w-[130px]">{p.occupation}</span>
                          </div>
                        </div>
                      </div>

                      {/* Card Action Buttons */}
                      <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onSelectProfile(p);
                          }}
                          className="py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl text-center transition-colors font-poppins"
                        >
                          View Profile
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onShareWhatsApp(p);
                          }}
                          className="py-2 bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1 shadow-sm transition-colors font-poppins"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                          <span>Chat</span>
                        </button>
                      </div>

                    </div>
                  );
                })}
              </div>
            )}

          </div>

        </div>
      </section>

    </div>
  );
};
