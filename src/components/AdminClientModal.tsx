import React, { useState } from 'react';
import { Client } from '../types';
import { SL_DISTRICTS } from '../data/initialProfiles';
import { X, UserPlus, Trash2, Shield, Share2, Save, Key, Check } from 'lucide-react';

interface AdminClientModalProps {
  clients: Client[];
  onClose: () => void;
  onSaveClient: (client: Client) => Promise<void>;
  onDeleteClient: (id: string) => Promise<void>;
}

export const AdminClientModal: React.FC<AdminClientModalProps> = ({
  clients,
  onClose,
  onSaveClient,
  onDeleteClient,
}) => {
  const [username, setUsername] = useState('');
  const [label, setLabel] = useState('');
  const [gender, setGender] = useState('');
  const [showContact, setShowContact] = useState(false);
  const [selectedDistricts, setSelectedDistricts] = useState<string[]>([]);
  const [createdCreds, setCreatedCreds] = useState<{ u: string; p: string } | null>(null);

  const toggleDistrict = (d: string) => {
    setSelectedDistricts((prev) =>
      prev.includes(d) ? prev.filter((item) => item !== d) : [...prev, d]
    );
  };

  const handleCreateClient = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim()) return;

    const generatedPass = `cn${Math.floor(100000 + Math.random() * 900000)}`;
    const newClient: Client = {
      id: `c-${Date.now()}`,
      username: username.trim().toLowerCase(),
      label: label.trim() || username.trim(),
      gender: gender || undefined,
      districts: selectedDistricts,
      showContact,
      createdAt: Date.now(),
    };

    await onSaveClient(newClient);
    setCreatedCreds({ u: newClient.username, p: generatedPass });
    setUsername('');
    setLabel('');
    setSelectedDistricts([]);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto font-poppins">
      <div className="bg-white rounded-3xl max-w-xl w-full shadow-2xl overflow-hidden border border-emerald-100 my-8">
        
        {/* Header */}
        <div className="bg-[#11402f] text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-[#f5cf89]" />
            <h2 className="font-serif-display font-bold text-lg text-white">Client Access Management</h2>
          </div>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-white/10 text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto text-xs">
          
          {/* Created Credential Box */}
          {createdCreds && (
            <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-2xl space-y-2">
              <div className="font-bold text-emerald-900 text-sm flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>Client Credentials Created!</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs bg-white p-2.5 rounded-xl border border-emerald-100">
                <div><strong>Username:</strong> {createdCreds.u}</div>
                <div><strong>Password:</strong> {createdCreds.p}</div>
              </div>
              <button
                onClick={() => {
                  const text = `*Ceylon Nikah Client Login*\nUsername: ${createdCreds.u}\nPassword: ${createdCreds.p}\nURL: ${window.location.origin}`;
                  window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
                }}
                className="w-full py-2 bg-[#25D366] text-white font-bold rounded-xl text-center shadow flex items-center justify-center gap-1.5"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Share Credentials on WhatsApp</span>
              </button>
            </div>
          )}

          {/* Existing Clients List */}
          <div>
            <h3 className="font-bold text-gray-900 text-sm mb-3">Active Client Accounts</h3>
            {clients.length === 0 ? (
              <p className="text-gray-400 italic">No client accounts created yet.</p>
            ) : (
              <div className="space-y-2">
                {clients.map((c) => (
                  <div key={c.id} className="p-3 bg-gray-50 border border-gray-200 rounded-2xl flex items-center justify-between">
                    <div>
                      <div className="font-bold text-gray-900 text-sm">{c.label}</div>
                      <div className="text-gray-500 text-[11px]">User: {c.username}</div>
                      <div className="text-emerald-700 text-[10px] mt-0.5">
                        {c.districts?.length ? `Districts: ${c.districts.join(', ')}` : 'All Districts'} · {c.showContact ? 'Can view contacts' : 'Contacts hidden'}
                      </div>
                    </div>
                    <button
                      onClick={() => onDeleteClient(c.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-xl"
                      title="Delete Client"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Add Client Form */}
          <form onSubmit={handleCreateClient} className="space-y-4 pt-4 border-t border-gray-100">
            <h3 className="font-bold text-gray-900 text-sm">Add New Client Account</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-gray-700 mb-1">Client Username *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. kekirawabureau"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl font-medium"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">Display Label</label>
                <input
                  type="text"
                  placeholder="e.g. Kekirawa Marriage Bureau"
                  value={label}
                  onChange={(e) => setLabel(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl font-medium"
                />
              </div>
            </div>

            <div className="flex items-center gap-2 pt-1">
              <input
                type="checkbox"
                id="showContactCb"
                checked={showContact}
                onChange={(e) => setShowContact(e.target.checked)}
                className="w-4 h-4 text-[#11402f] rounded"
              />
              <label htmlFor="showContactCb" className="font-semibold text-gray-800">
                Allow client to view candidate phone numbers
              </label>
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-1.5">
                Restrict District Access (Leave empty for All Districts)
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-1.5 max-h-32 overflow-y-auto p-2 bg-gray-50 border border-gray-200 rounded-xl">
                {SL_DISTRICTS.map((d) => {
                  const isChecked = selectedDistricts.includes(d);
                  return (
                    <button
                      type="button"
                      key={d}
                      onClick={() => toggleDistrict(d)}
                      className={`px-2 py-1 rounded-lg text-[10px] font-semibold text-left transition-colors ${
                        isChecked ? 'bg-[#11402f] text-white' : 'bg-white text-gray-700 border border-gray-200'
                      }`}
                    >
                      {d}
                    </button>
                  );
                })}
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#11402f] hover:bg-[#0c3327] text-white font-bold rounded-xl shadow flex items-center justify-center gap-1.5"
            >
              <UserPlus className="w-4 h-4" />
              <span>Create Client Account</span>
            </button>
          </form>

        </div>

      </div>
    </div>
  );
};
