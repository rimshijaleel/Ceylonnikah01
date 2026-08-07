import React, { useState } from 'react';
import { NavPage, UserSession } from '../types';
import { Lock, ShieldCheck, CheckCircle2, Heart, Eye, EyeOff, Sparkles, AlertCircle } from 'lucide-react';

interface LoginViewProps {
  onPageChange: (page: NavPage) => void;
  onLoginSubmit: (emailOrUser: string, pass: string) => Promise<boolean>;
  onAdminLoginDemo: () => void;
  userSession: UserSession;
}

export const LoginView: React.FC<LoginViewProps> = ({
  onPageChange,
  onLoginSubmit,
  onAdminLoginDemo,
  userSession,
}) => {
  const [emailOrUser, setEmailOrUser] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    if (!emailOrUser.trim() || !password) {
      setErrorMsg('Please enter your email/username and password.');
      return;
    }

    setLoading(true);
    const success = await onLoginSubmit(emailOrUser.trim(), password);
    setLoading(false);
    if (!success) {
      setErrorMsg('Invalid login credentials. Please check your details or reset your password.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-4xl w-full bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-200/80 grid grid-cols-1 md:grid-cols-12">
        
        {/* Left Branding Panel */}
        <div className="md:col-span-5 bg-sleek-dark text-white p-8 sm:p-10 flex flex-col justify-between relative">
          <div className="space-y-6 relative z-10">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 56 56">
                  <circle cx="28" cy="28" r="24" fill="none" stroke="#2dd4bf" strokeWidth="2.5" />
                  <path d="M33 12a17 17 0 1 0 0 32 14 14 0 1 1 0-32z" fill="#2dd4bf" />
                  <circle cx="37" cy="18" r="2.8" fill="#14b8a6" />
                </svg>
              </div>
              <span className="font-poppins font-black text-lg text-white tracking-tight">Ceylon Nikah</span>
            </div>

            <div>
              <h2 className="font-poppins font-black text-2xl text-teal-400 mb-2">
                Welcome Back
              </h2>
              <p className="text-xs text-slate-300 leading-relaxed font-poppins">
                Sign in to your account to continue finding your meaningful and blessed match.
              </p>
            </div>

            <div className="space-y-3 pt-2 font-poppins text-xs text-slate-200">
              <div className="flex items-center gap-2.5 bg-slate-900/80 p-2.5 rounded-xl border border-slate-800">
                <Lock className="w-4 h-4 text-teal-400" />
                <span>Bank-level encryption</span>
              </div>
              <div className="flex items-center gap-2.5 bg-slate-900/80 p-2.5 rounded-xl border border-slate-800">
                <CheckCircle2 className="w-4 h-4 text-teal-400" />
                <span>Verified profiles only</span>
              </div>
              <div className="flex items-center gap-2.5 bg-slate-900/80 p-2.5 rounded-xl border border-slate-800">
                <Heart className="w-4 h-4 text-teal-400" />
                <span>Faith-guided matchmaking</span>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-800 text-[11px] text-slate-400 font-poppins relative z-10">
            Trusted by 10,000+ families worldwide for halal matchmaking.
          </div>
        </div>

        {/* Right Form Panel */}
        <div className="md:col-span-7 p-8 sm:p-10 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="font-poppins font-bold text-slate-900 text-2xl">Sign in</h2>
                <p className="text-xs text-slate-500 font-poppins mt-1">
                  Don't have an account?{' '}
                  <button
                    onClick={() => onPageChange('register')}
                    className="text-teal-600 font-bold hover:underline"
                  >
                    Register
                  </button>
                </p>
              </div>
            </div>

            {errorMsg && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl text-xs font-poppins flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1 font-poppins">
                  Email Address or Client Username
                </label>
                <input
                  type="text"
                  required
                  placeholder="you@example.com or client username"
                  value={emailOrUser}
                  onChange={(e) => setEmailOrUser(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold focus:bg-white focus:border-teal-600 focus:outline-none transition-colors"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-bold text-slate-700 font-poppins">
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => alert("Please contact admin or check email reset link.")}
                    className="text-[11px] font-bold text-teal-600 hover:underline font-poppins"
                  >
                    Forgot password?
                  </button>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold focus:bg-white focus:border-teal-600 focus:outline-none transition-colors pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-teal-600 hover:bg-teal-500 text-white font-poppins font-bold text-xs uppercase tracking-wider rounded-xl shadow-md shadow-teal-600/20 transition-all flex items-center justify-center gap-2"
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </button>
            </form>

            {/* Quick Demo Login Option */}
            <div className="mt-4 pt-4 border-t border-slate-100 flex flex-col items-center">
              <button
                type="button"
                onClick={onAdminLoginDemo}
                className="text-xs text-teal-700 font-bold bg-teal-50 hover:bg-teal-100 border border-teal-200 px-4 py-2 rounded-xl transition-all"
              >
                ⚡ Quick Demo Login (Admin Mode)
              </button>
            </div>
          </div>

          {/* Bottom Update Notice */}
          <div className="mt-6 p-3.5 bg-slate-50 border border-slate-200/80 rounded-2xl text-[11px] text-slate-600 leading-relaxed font-poppins">
            Ceylon Nikah website has been updated. If your password is not working after the update, please use <strong>Forgot Password</strong> to reset your password.
          </div>
        </div>

      </div>
    </div>
  );
};
