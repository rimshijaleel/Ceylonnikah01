import React, { useState, useEffect } from 'react';
import { Profile } from '../types';
import { SL_DISTRICTS } from '../data/initialProfiles';
import { X, Upload, Save, Plus } from 'lucide-react';

interface AddProfileModalProps {
  editingProfile: Profile | null;
  onClose: () => void;
  onSave: (profileData: Profile) => Promise<void>;
}

export const AddProfileModal: React.FC<AddProfileModalProps> = ({
  editingProfile,
  onClose,
  onSave,
}) => {
  const [formData, setFormData] = useState<Partial<Profile>>({
    regid: '',
    name: '',
    gender: 'Female',
    age: 25,
    height: "5' 4\"",
    weight: '55 kg',
    marital: 'Never Married',
    status: 'Available',
    place: 'Colombo',
    district: 'Colombo',
    edu: 'Degree',
    occupation: 'Employed',
    father: '',
    mother: '',
    siblings: '',
    familystatus: 'Middle Class',
    contact: '+94 77 123 4567',
    expage: '26 to 30',
    expectation: '',
    otherdetails: '',
    photos: [],
  });

  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (editingProfile) {
      setFormData(editingProfile);
    } else {
      const randomReg = `USR-${Math.floor(10000 + Math.random() * 90000)}`;
      setFormData({
        regid: randomReg,
        name: '',
        gender: 'Female',
        age: 25,
        height: "5' 4\"",
        weight: '55 kg',
        marital: 'Never Married',
        status: 'Available',
        place: 'Colombo',
        district: 'Colombo',
        edu: 'Degree',
        occupation: 'Employed',
        father: '',
        mother: '',
        siblings: '',
        familystatus: 'Middle Class',
        contact: '+94 70 568 7697',
        expage: '26 to 30',
        expectation: '',
        otherdetails: '',
        photos: [],
      });
    }
  }, [editingProfile]);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files: File[] = Array.from(e.target.files);
    files.forEach((file: File) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setFormData((prev) => ({
            ...prev,
            photos: [...(prev.photos || []), event.target!.result as string].slice(0, 4),
          }));
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const completeProfile: Profile = {
      id: formData.id || `p-${Date.now()}`,
      regid: formData.regid || `USR-${Math.floor(10000 + Math.random() * 90000)}`,
      name: formData.name || '',
      gender: formData.gender || 'Female',
      age: formData.age || 25,
      height: formData.height || "5' 4\"",
      weight: formData.weight || '',
      marital: formData.marital || 'Never Married',
      status: formData.status || 'Available',
      place: formData.place || 'Colombo',
      district: formData.district || 'Colombo',
      edu: formData.edu || '',
      occupation: formData.occupation || '',
      father: formData.father || '',
      mother: formData.mother || '',
      siblings: formData.siblings || '',
      familystatus: formData.familystatus || '',
      contact: formData.contact || '',
      expage: formData.expage || '',
      expectation: formData.expectation || '',
      otherdetails: formData.otherdetails || '',
      photos: formData.photos || [],
      createdAt: formData.createdAt || Date.now(),
    };

    await onSave(completeProfile);
    setSaving(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl overflow-hidden border border-emerald-100 my-8">
        
        {/* Header */}
        <div className="bg-[#11402f] text-white p-5 flex items-center justify-between">
          <h2 className="font-serif-display font-bold text-lg text-white">
            {editingProfile ? 'Edit Profile' : 'Add New Candidate Profile'}
          </h2>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-white/10 text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto font-poppins text-xs">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-gray-700 mb-1">Reg ID *</label>
              <input
                type="text"
                required
                value={formData.regid}
                onChange={(e) => setFormData({ ...formData, regid: e.target.value })}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl font-medium"
              />
            </div>
            <div>
              <label className="block font-semibold text-gray-700 mb-1">Full Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl font-medium"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block font-semibold text-gray-700 mb-1">Gender *</label>
              <select
                value={formData.gender}
                onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl font-semibold"
              >
                <option value="Female">Female</option>
                <option value="Male">Male</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-1">Age *</label>
              <input
                type="number"
                required
                value={formData.age}
                onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl font-medium"
              />
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-1">Status</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as 'Available' | 'Married' })}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl font-semibold"
              >
                <option value="Available">Available</option>
                <option value="Married">Married (Sold Out)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-gray-700 mb-1">District</label>
              <select
                value={formData.district}
                onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl font-semibold"
              >
                {SL_DISTRICTS.map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-1">Place / City</label>
              <input
                type="text"
                value={formData.place}
                onChange={(e) => setFormData({ ...formData, place: e.target.value })}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl font-medium"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-gray-700 mb-1">Education</label>
              <input
                type="text"
                value={formData.edu}
                onChange={(e) => setFormData({ ...formData, edu: e.target.value })}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl font-medium"
              />
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-1">Occupation</label>
              <input
                type="text"
                value={formData.occupation}
                onChange={(e) => setFormData({ ...formData, occupation: e.target.value })}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl font-medium"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-gray-700 mb-1">Contact Number</label>
              <input
                type="text"
                value={formData.contact}
                onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl font-medium"
              />
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-1">Expected Age Range</label>
              <input
                type="text"
                value={formData.expage}
                onChange={(e) => setFormData({ ...formData, expage: e.target.value })}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl font-medium"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-1">Partner Expectations</label>
            <textarea
              rows={2}
              value={formData.expectation}
              onChange={(e) => setFormData({ ...formData, expectation: e.target.value })}
              className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl font-medium"
            />
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-1">Photos (Max 4)</label>
            <div className="flex items-center gap-2">
              <label className="px-3 py-2 bg-gray-100 border border-gray-200 rounded-xl font-semibold cursor-pointer flex items-center gap-1">
                <Upload className="w-3.5 h-3.5" />
                <span>Upload Images</span>
                <input type="file" accept="image/*" multiple onChange={handlePhotoUpload} className="hidden" />
              </label>
              <span className="text-gray-500">{formData.photos?.length || 0} images</span>
            </div>
          </div>

          <div className="pt-4 border-t border-gray-100 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-100 text-gray-700 font-bold rounded-xl"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-5 py-2 bg-[#11402f] text-white font-bold rounded-xl shadow flex items-center gap-1.5"
            >
              <Save className="w-4 h-4" />
              <span>{saving ? 'Saving...' : 'Save Profile'}</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
