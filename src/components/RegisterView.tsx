import React, { useState } from 'react';
import { NavPage, RegisterFormData, Profile } from '../types';
import { SL_DISTRICTS } from '../data/initialProfiles';
import { Check, ArrowRight, ArrowLeft, Upload, CheckCircle2, User, Phone, MapPin, Users, Heart } from 'lucide-react';

interface RegisterViewProps {
  onPageChange: (page: NavPage) => void;
  onRegisterSubmit: (profileData: Partial<Profile>) => Promise<void>;
}

export const RegisterView: React.FC<RegisterViewProps> = ({
  onPageChange,
  onRegisterSubmit,
}) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [photos, setPhotos] = useState<string[]>([]);

  const [formData, setFormData] = useState<RegisterFormData>({
    email: '',
    phone: '',
    whatsapp: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    gender: '',
    age: '',
    height: '',
    weight: '',
    complexion: '',
    dresscode: '',
    country: 'Sri Lanka',
    district: 'Colombo',
    city: '',
    edu: '',
    occupation: '',
    father: '',
    mother: '',
    siblings: '',
    familystatus: 'Middle Class',
    marital: 'Never Married',
    expage: '',
    expectation: '',
    otherdetails: '',
    contact: '',
  });

  const steps = [
    { num: 1, name: 'Account Details', icon: User },
    { num: 2, name: 'Personal Details', icon: Heart },
    { num: 3, name: 'Location & Education', icon: MapPin },
    { num: 4, name: 'Family Details', icon: Users },
    { num: 5, name: 'Additional Details', icon: CheckCircle2 },
  ];

  const handleNext = () => {
    if (currentStep === 1) {
      if (!formData.email || !formData.phone || !formData.password) {
        alert('Please complete all required fields (*).');
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        alert('Passwords do not match.');
        return;
      }
    }
    if (currentStep === 2) {
      if (!formData.gender || !formData.age) {
        alert('Please select Gender and Age.');
        return;
      }
    }
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files: File[] = Array.from(e.target.files);
    files.forEach((file: File) => {
      if (photos.length >= 4) return;
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setPhotos((prev) => [...prev, event.target!.result as string]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newRegId = `C${Math.floor(1000 + Math.random() * 9000)}`;
    const newProfile: Partial<Profile> = {
      regid: newRegId,
      name: formData.fullName || 'Candidate',
      gender: formData.gender || 'Female',
      age: formData.age || '25',
      height: formData.height || "5' 4\"",
      weight: formData.weight,
      marital: formData.marital,
      status: 'Available',
      place: formData.city || formData.district,
      district: formData.district || 'Colombo',
      country: formData.country,
      city: formData.city,
      edu: formData.edu || 'Qualified',
      occupation: formData.occupation || 'Employed',
      father: formData.father,
      mother: formData.mother,
      siblings: formData.siblings,
      familystatus: formData.familystatus,
      contact: formData.phone || formData.contact,
      expage: formData.expage,
      expectation: formData.expectation,
      otherdetails: formData.otherdetails,
      photos: photos.length > 0 ? photos : undefined,
      createdAt: Date.now(),
    };

    await onRegisterSubmit(newProfile);
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-4xl w-full bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-200/80 grid grid-cols-1 md:grid-cols-12">
        
        {/* Left Steps Sidebar */}
        <div className="md:col-span-4 bg-sleek-dark text-white p-8 flex flex-col justify-between">
          <div className="space-y-6">
            <div>
              <h2 className="font-poppins font-black text-xl text-teal-400">Create Account</h2>
              <p className="text-xs text-slate-300 mt-1 font-poppins">
                Already have an account?{' '}
                <button
                  onClick={() => onPageChange('login')}
                  className="text-white font-bold underline hover:text-teal-400"
                >
                  Log in
                </button>
              </p>
            </div>

            {/* Step Indicators */}
            <div className="space-y-4 pt-2">
              {steps.map((s) => {
                const isActive = currentStep === s.num;
                const isCompleted = currentStep > s.num;
                return (
                  <div
                    key={s.num}
                    onClick={() => {
                      if (s.num < currentStep) setCurrentStep(s.num);
                    }}
                    className={`flex items-center gap-3 cursor-pointer p-2 rounded-xl transition-all ${
                      isActive
                        ? 'bg-slate-800 border border-slate-700'
                        : isCompleted
                        ? 'text-teal-300'
                        : 'opacity-60'
                    }`}
                  >
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs ${
                        isActive
                          ? 'bg-teal-500 text-slate-950'
                          : isCompleted
                          ? 'bg-teal-600 text-white'
                          : 'bg-slate-800 text-white'
                      }`}
                    >
                      {isCompleted ? <Check className="w-4 h-4" /> : s.num}
                    </div>
                    <span className="font-poppins text-xs font-semibold">{s.name}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="pt-6 border-t border-slate-800 text-[11px] text-slate-400 font-poppins">
            Ceylon Nikah Matrimonial Registration
          </div>
        </div>

        {/* Right Form Wizard Body */}
        <div className="md:col-span-8 p-8 flex flex-col justify-between">
          {submitted ? (
            <div className="text-center py-12 space-y-4 my-auto">
              <CheckCircle2 className="w-16 h-16 text-teal-600 mx-auto" />
              <h3 className="font-poppins font-black text-2xl text-slate-900">
                Registration Successful!
              </h3>
              <p className="text-xs text-slate-600 max-w-md mx-auto font-poppins leading-relaxed">
                JazakAllah Khair! Your registration request has been submitted. Our admin team will verify your profile details and notify you.
              </p>
              <div className="pt-4 flex justify-center gap-3">
                <button
                  onClick={() => onPageChange('profiles')}
                  className="px-6 py-2.5 bg-teal-600 text-white text-xs font-bold uppercase tracking-wider rounded-full shadow"
                >
                  View All Profiles
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* STEP 1: Account Details */}
              {currentStep === 1 && (
                <div className="space-y-4">
                  <div>
                    <h3 className="font-poppins font-bold text-gray-900 text-lg">Account Details</h3>
                    <p className="text-xs text-gray-500 font-poppins">Set up your login credentials</p>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1 font-poppins">Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium focus:bg-white focus:border-[#11402f] focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1 font-poppins">Phone Number *</label>
                      <div className="flex gap-2">
                        <span className="px-3 py-2.5 bg-gray-100 border border-gray-200 rounded-xl text-xs font-semibold text-gray-600 flex items-center">
                          LK +94
                        </span>
                        <input
                          type="tel"
                          required
                          placeholder="76 XXXX XXX"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium focus:bg-white focus:border-[#11402f] focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1 font-poppins">WhatsApp Number *</label>
                      <div className="flex gap-2">
                        <span className="px-3 py-2.5 bg-gray-100 border border-gray-200 rounded-xl text-xs font-semibold text-gray-600 flex items-center">
                          LK +94
                        </span>
                        <input
                          type="tel"
                          required
                          placeholder="76 XXXX XXX"
                          value={formData.whatsapp}
                          onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                          className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium focus:bg-white focus:border-[#11402f] focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1 font-poppins">Password *</label>
                      <input
                        type="password"
                        required
                        placeholder="Create a password"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium focus:bg-white focus:border-[#11402f] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1 font-poppins">Confirm Password *</label>
                      <input
                        type="password"
                        required
                        placeholder="Confirm password"
                        value={formData.confirmPassword}
                        onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium focus:bg-white focus:border-[#11402f] focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 2: Personal Details */}
              {currentStep === 2 && (
                <div className="space-y-4">
                  <div>
                    <h3 className="font-poppins font-bold text-gray-900 text-lg">Personal Details</h3>
                    <p className="text-xs text-gray-500 font-poppins">Enter candidate's personal bio</p>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1 font-poppins">Full Name / Initials</label>
                    <input
                      type="text"
                      placeholder="e.g. Fathima Rizna"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium focus:bg-white"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1 font-poppins">Gender *</label>
                      <select
                        required
                        value={formData.gender}
                        onChange={(e) => setFormData({ ...formData, gender: e.target.value as 'Male' | 'Female' })}
                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold text-gray-700"
                      >
                        <option value="">Select Gender</option>
                        <option value="Female">Female Bride</option>
                        <option value="Male">Male Groom</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1 font-poppins">Age *</label>
                      <input
                        type="number"
                        required
                        placeholder="e.g. 25"
                        value={formData.age}
                        onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1 font-poppins">Height</label>
                      <input
                        type="text"
                        placeholder="5' 4&quot;"
                        value={formData.height}
                        onChange={(e) => setFormData({ ...formData, height: e.target.value })}
                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1 font-poppins">Complexion</label>
                      <input
                        type="text"
                        placeholder="Fair / Wheatish"
                        value={formData.complexion}
                        onChange={(e) => setFormData({ ...formData, complexion: e.target.value })}
                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 3: Location & Education */}
              {currentStep === 3 && (
                <div className="space-y-4">
                  <div>
                    <h3 className="font-poppins font-bold text-gray-900 text-lg">Location & Education</h3>
                    <p className="text-xs text-gray-500 font-poppins">Where are you based and qualification</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1 font-poppins">District (Sri Lanka)</label>
                      <select
                        value={formData.district}
                        onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold text-gray-700"
                      >
                        {SL_DISTRICTS.map((d) => (
                          <option key={d} value={d}>{d}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1 font-poppins">City / Town</label>
                      <input
                        type="text"
                        placeholder="e.g. Dehiwala, Wellawatte"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1 font-poppins">Educational Qualification</label>
                      <input
                        type="text"
                        placeholder="e.g. Bachelor in Engineering"
                        value={formData.edu}
                        onChange={(e) => setFormData({ ...formData, edu: e.target.value })}
                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1 font-poppins">Occupation</label>
                      <input
                        type="text"
                        placeholder="e.g. Software Engineer"
                        value={formData.occupation}
                        onChange={(e) => setFormData({ ...formData, occupation: e.target.value })}
                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 4: Family Details */}
              {currentStep === 4 && (
                <div className="space-y-4">
                  <div>
                    <h3 className="font-poppins font-bold text-gray-900 text-lg">Family Details</h3>
                    <p className="text-xs text-gray-500 font-poppins">Family background details</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1 font-poppins">Father's Occupation</label>
                      <input
                        type="text"
                        placeholder="e.g. Businessman"
                        value={formData.father}
                        onChange={(e) => setFormData({ ...formData, father: e.target.value })}
                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1 font-poppins">Mother's Occupation</label>
                      <input
                        type="text"
                        placeholder="e.g. Homemaker"
                        value={formData.mother}
                        onChange={(e) => setFormData({ ...formData, mother: e.target.value })}
                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1 font-poppins">Siblings</label>
                    <input
                      type="text"
                      placeholder="e.g. 1 Brother, 2 Sisters"
                      value={formData.siblings}
                      onChange={(e) => setFormData({ ...formData, siblings: e.target.value })}
                      className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium"
                    />
                  </div>
                </div>
              )}

              {/* STEP 5: Additional Details */}
              {currentStep === 5 && (
                <div className="space-y-4">
                  <div>
                    <h3 className="font-poppins font-bold text-gray-900 text-lg">Additional Details</h3>
                    <p className="text-xs text-gray-500 font-poppins">Marital status & partner expectations</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1 font-poppins">Marital Status</label>
                      <select
                        value={formData.marital}
                        onChange={(e) => setFormData({ ...formData, marital: e.target.value })}
                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold text-gray-700"
                      >
                        <option value="Never Married">Never Married</option>
                        <option value="Divorced">Divorced</option>
                        <option value="Widowed">Widowed</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1 font-poppins">Expected Age Range</label>
                      <input
                        type="text"
                        placeholder="e.g. 26 to 30"
                        value={formData.expage}
                        onChange={(e) => setFormData({ ...formData, expage: e.target.value })}
                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1 font-poppins">Partner Expectations</label>
                    <textarea
                      rows={2}
                      placeholder="Describe what you are looking for in a partner..."
                      value={formData.expectation}
                      onChange={(e) => setFormData({ ...formData, expectation: e.target.value })}
                      className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium resize-y"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1 font-poppins">Upload Photos (Optional, Max 4)</label>
                    <div className="flex items-center gap-2">
                      <label className="px-4 py-2 bg-gray-100 hover:bg-gray-200 border border-gray-200 rounded-xl text-xs font-semibold text-gray-700 cursor-pointer flex items-center gap-1.5">
                        <Upload className="w-3.5 h-3.5" />
                        <span>Choose Images</span>
                        <input type="file" accept="image/*" multiple onChange={handlePhotoUpload} className="hidden" />
                      </label>
                      <span className="text-xs text-gray-500 font-poppins">{photos.length} photos selected</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
                {currentStep > 1 ? (
                  <button
                    type="button"
                    onClick={handleBack}
                    className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-poppins font-bold text-xs uppercase tracking-wider rounded-xl flex items-center gap-1.5"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Back</span>
                  </button>
                ) : (
                  <div />
                )}

                {currentStep < 5 ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="px-6 py-2.5 bg-teal-600 hover:bg-teal-500 text-white font-poppins font-bold text-xs uppercase tracking-wider rounded-xl flex items-center gap-1.5 shadow-md shadow-teal-600/20"
                  >
                    <span>Next</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-teal-600 hover:bg-teal-500 text-white font-poppins font-bold text-xs uppercase tracking-wider rounded-xl flex items-center gap-1.5 shadow-lg shadow-teal-600/30"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Submit Registration</span>
                  </button>
                )}
              </div>

            </form>
          )}
        </div>

      </div>
    </div>
  );
};
