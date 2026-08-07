import React from 'react';
import { Profile, UserSession } from '../types';
import { X, Printer, MessageCircle, Heart, Edit3, Trash2, CheckCircle2, AlertCircle } from 'lucide-react';

interface ProfileDetailModalProps {
  profile: Profile | null;
  userSession: UserSession;
  onClose: () => void;
  onShareWhatsApp: (profile: Profile) => void;
  onToggleMarried: (profileId: string) => void;
  onEdit: (profile: Profile) => void;
  onDelete: (profileId: string) => void;
}

export const ProfileDetailModal: React.FC<ProfileDetailModalProps> = ({
  profile,
  userSession,
  onClose,
  onShareWhatsApp,
  onToggleMarried,
  onEdit,
  onDelete,
}) => {
  if (!profile) return null;

  const showContact =
    userSession.role === 'admin' ||
    (userSession.role === 'client' && userSession.perms?.showContact);

  const isMarried = profile.status === 'Married';

  const detailsList = [
    { label: 'Place', value: profile.place },
    { label: 'District', value: profile.district },
    { label: 'Gender', value: profile.gender },
    { label: 'Marital Status', value: profile.marital },
    { label: 'Age', value: `${profile.age} years` },
    { label: 'Height', value: profile.height },
    { label: 'Weight', value: profile.weight },
    { label: 'Complexion', value: profile.complexion },
    { label: 'Dress Code', value: profile.dresscode },
    { label: 'Educational Qualification', value: profile.edu },
    { label: 'Occupation', value: profile.occupation },
    { label: "Father's Occupation", value: profile.father },
    { label: "Mother's Occupation", value: profile.mother },
    { label: 'Siblings', value: profile.siblings },
    { label: 'Family Status', value: profile.familystatus },
    { label: 'Expected Age Range', value: profile.expage },
    ...(showContact ? [{ label: 'Contact Number', value: profile.contact }] : []),
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl overflow-hidden border border-emerald-100 my-8 animate-in fade-in zoom-in-95 duration-150">
        
        {/* Modal Header */}
        <div className="bg-sleek-dark text-white p-6 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-teal-400 font-bold font-poppins text-lg">
              {profile.gender === 'Female' ? '♀' : '♂'}
            </div>
            <div>
              <h2 className="font-poppins font-bold text-xl text-white">
                {profile.regid} {profile.name ? `— ${profile.name}` : ''}
              </h2>
              <p className="text-xs text-slate-400 font-poppins">
                Verified Candidate Profile · {profile.place || profile.district}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          
          {/* Married Ribbon */}
          {isMarried && (
            <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-2xl text-xs font-poppins font-bold flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
              <span>💍 THIS PROFILE IS MARKED AS MARRIED / SOLD OUT</span>
            </div>
          )}

          {/* Photo Gallery */}
          {profile.photos && profile.photos.length > 0 && (
            <div className="flex items-center gap-3 overflow-x-auto pb-2">
              {profile.photos.map((src, idx) => (
                <img
                  key={idx}
                  src={src}
                  alt={`Profile photo ${idx + 1}`}
                  className="w-24 h-24 object-cover rounded-2xl border-2 border-[#e0973a] shadow-sm shrink-0"
                />
              ))}
            </div>
          )}

          {/* Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-poppins">
            {detailsList.map((item, idx) => {
              if (!item.value) return null;
              return (
                <div key={idx} className="bg-gray-50/80 p-3 rounded-xl border border-gray-100">
                  <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">
                    {item.label}
                  </div>
                  <div className="font-semibold text-gray-900 text-sm">{item.value}</div>
                </div>
              );
            })}
          </div>

          {/* Partner Expectation */}
          {profile.expectation && (
            <div className="bg-emerald-50/60 p-4 rounded-2xl border border-emerald-100 space-y-1 text-xs font-poppins">
              <div className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider">
                Life Partner Expectations
              </div>
              <p className="text-gray-800 leading-relaxed">{profile.expectation}</p>
            </div>
          )}

          {/* Other Details */}
          {profile.otherdetails && (
            <div className="bg-gray-50 p-4 rounded-2xl border border-gray-200 space-y-1 text-xs font-poppins">
              <div className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                Other Details
              </div>
              <p className="text-gray-700 leading-relaxed">{profile.otherdetails}</p>
            </div>
          )}

        </div>

        {/* Modal Footer Actions */}
        <div className="p-4 bg-gray-50 border-t border-gray-100 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => onShareWhatsApp(profile)}
              className="px-4 py-2 bg-[#25D366] hover:bg-[#20bd5a] text-white font-poppins font-bold text-xs rounded-xl shadow flex items-center gap-1.5"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Share</span>
            </button>
            <button
              onClick={() => window.print()}
              className="px-3.5 py-2 bg-white border border-gray-200 text-gray-700 hover:bg-gray-100 font-poppins font-bold text-xs rounded-xl flex items-center gap-1.5"
            >
              <Printer className="w-4 h-4" />
              <span>Print</span>
            </button>
          </div>

          {/* Admin Specific Actions */}
          {userSession.role === 'admin' && (
            <div className="flex items-center gap-2">
              <button
                onClick={() => onToggleMarried(profile.id)}
                className={`px-3 py-2 text-xs font-bold font-poppins rounded-xl border transition-colors ${
                  isMarried
                    ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                    : 'bg-amber-50 text-amber-900 border-amber-200'
                }`}
              >
                {isMarried ? 'Mark Available' : '💍 Mark Married'}
              </button>
              <button
                onClick={() => onEdit(profile)}
                className="px-3 py-2 bg-[#11402f] text-white text-xs font-bold font-poppins rounded-xl shadow flex items-center gap-1"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Edit</span>
              </button>
              <button
                onClick={() => {
                  if (confirm('Are you sure you want to delete this profile?')) {
                    onDelete(profile.id);
                  }
                }}
                className="px-3 py-2 bg-red-50 text-red-600 border border-red-200 hover:bg-red-100 text-xs font-bold font-poppins rounded-xl"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
