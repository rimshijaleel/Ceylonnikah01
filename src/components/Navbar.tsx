import React, { useState } from 'react';
import { NavPage, UserSession } from '../types';
import { Menu, X, UserCheck, LogOut, Lock, ShieldCheck, Heart } from 'lucide-react';

interface NavbarProps {
  currentPage: NavPage;
  onPageChange: (page: NavPage) => void;
  userSession: UserSession;
  onLogout: () => void;
  onOpenAdminClients?: () => void;
  onOpenAddProfile?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onPageChange,
  userSession,
  onLogout,
  onOpenAdminClients,
  onOpenAddProfile,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks: { id: NavPage; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About us' },
    { id: 'packages', label: 'Packages' },
    { id: 'profiles', label: 'Profiles' },
    { id: 'contact', label: 'Contact us' },
  ];

  const handleNavClick = (page: NavPage) => {
    onPageChange(page);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 text-white transition-all shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <div 
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="relative w-10 h-10 flex items-center justify-center bg-teal-600 rounded-xl text-white font-black text-lg italic shadow-lg shadow-teal-600/30 group-hover:bg-teal-500 transition-all">
              CN
            </div>
            <div>
              <div className="font-poppins font-black text-lg tracking-tight text-white flex items-center gap-2">
                <span>CEYLON NIKAH</span>
                <span className="text-[10px] uppercase font-poppins px-1.5 py-0.5 rounded-full bg-teal-500/20 text-teal-400 font-bold border border-teal-500/30">
                  24
                </span>
              </div>
              <div className="text-[11px] text-slate-400 tracking-wide font-poppins">
                Faith-Guided Matrimony
              </div>
            </div>
          </div>

          {/* Desktop Links */}
          <nav className="hidden lg:flex items-center gap-8 bg-slate-800/60 px-6 py-2.5 rounded-full border border-slate-700/60">
            {navLinks.map((link) => {
              const isActive = currentPage === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`text-xs font-poppins font-semibold transition-colors relative py-1 uppercase tracking-wider ${
                    isActive
                      ? 'text-teal-400'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-teal-400 rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Desktop Right Actions */}
          <div className="hidden sm:flex items-center gap-3">
            {userSession.role !== 'guest' ? (
              <div className="flex items-center gap-2 bg-slate-800/80 p-1.5 pl-3 rounded-full border border-slate-700">
                <div className="flex items-center gap-2 text-xs font-poppins font-medium text-slate-200 pr-1">
                  <UserCheck className="w-4 h-4 text-teal-400" />
                  <span>{userSession.role === 'admin' ? '👑 Admin' : `👤 ${userSession.label || 'Client'}`}</span>
                </div>

                {userSession.role === 'admin' && onOpenAdminClients && (
                  <button
                    onClick={onOpenAdminClients}
                    className="px-3 py-1 text-xs bg-slate-700 hover:bg-slate-600 text-white font-semibold rounded-full transition-colors border border-slate-600"
                  >
                    Clients
                  </button>
                )}

                {userSession.role === 'admin' && onOpenAddProfile && (
                  <button
                    onClick={onOpenAddProfile}
                    className="px-3 py-1 text-xs bg-teal-600 hover:bg-teal-500 text-white font-bold rounded-full transition-colors shadow-md shadow-teal-600/20"
                  >
                    + Profile
                  </button>
                )}

                <button
                  onClick={onLogout}
                  title="Logout"
                  className="p-1.5 text-slate-400 hover:text-red-400 hover:bg-slate-700 rounded-full transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <>
                <button
                  onClick={() => handleNavClick('login')}
                  className={`px-4 py-2 text-xs font-poppins font-bold tracking-wider uppercase transition-colors ${
                    currentPage === 'login' ? 'text-teal-400' : 'text-slate-300 hover:text-teal-400'
                  }`}
                >
                  Login
                </button>
                <button
                  onClick={() => handleNavClick('register')}
                  className="px-5 py-2.5 text-xs font-poppins font-bold tracking-wider uppercase bg-teal-600 hover:bg-teal-500 text-white rounded-full shadow-lg shadow-teal-600/20 transition-all transform hover:-translate-y-0.5"
                >
                  Register
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-slate-800 border border-slate-700 text-white hover:bg-slate-700 transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-900 border-b border-slate-800 px-4 pt-3 pb-6 space-y-3">
          <div className="grid grid-cols-2 gap-2">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`text-left px-4 py-2.5 rounded-xl font-poppins text-xs font-bold uppercase tracking-wider transition-all ${
                  currentPage === link.id
                    ? 'bg-teal-600 text-white font-bold'
                    : 'bg-slate-800/80 text-slate-200 hover:bg-slate-800'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="pt-2 border-t border-slate-800 flex flex-col gap-2">
            {userSession.role !== 'guest' ? (
              <div className="bg-slate-800 p-3 rounded-xl border border-slate-700 flex items-center justify-between">
                <div>
                  <div className="text-xs text-slate-400">Logged in as</div>
                  <div className="text-sm font-bold text-white">
                    {userSession.role === 'admin' ? '👑 Admin' : `👤 ${userSession.label || 'Client'}`}
                  </div>
                </div>
                <button
                  onClick={onLogout}
                  className="px-3 py-1.5 text-xs bg-red-500/20 text-red-400 border border-red-500/30 rounded-lg font-bold"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  onClick={() => handleNavClick('login')}
                  className="w-full py-2.5 text-center font-poppins font-bold text-xs uppercase tracking-wider bg-slate-800 text-slate-200 rounded-xl border border-slate-700"
                >
                  Login
                </button>
                <button
                  onClick={() => handleNavClick('register')}
                  className="w-full py-2.5 text-center font-poppins font-bold text-xs uppercase tracking-wider bg-teal-600 text-white rounded-xl shadow-md"
                >
                  Register
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
