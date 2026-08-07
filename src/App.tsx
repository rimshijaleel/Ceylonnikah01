import React, { useState, useEffect } from 'react';
import { NavPage, Profile, Client, UserSession } from './types';
import { 
  getStoredProfiles, 
  saveStoredProfiles, 
  getStoredClients, 
  saveStoredClients,
  subscribeProfiles,
  syncProfile,
  deleteProfileFromDb
} from './lib/firebase';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomeView } from './components/HomeView';
import { ContactView } from './components/ContactView';
import { PackagesView } from './components/PackagesView';
import { ProfilesView } from './components/ProfilesView';
import { LoginView } from './components/LoginView';
import { RegisterView } from './components/RegisterView';
import { ProfileDetailModal } from './components/ProfileDetailModal';
import { AddProfileModal } from './components/AddProfileModal';
import { AdminClientModal } from './components/AdminClientModal';

export default function App() {
  const [currentPage, setCurrentPage] = useState<NavPage>('home');
  const [profiles, setProfiles] = useState<Profile[]>(getStoredProfiles());
  const [clients, setClients] = useState<Client[]>(getStoredClients());
  const [userSession, setUserSession] = useState<UserSession>({ role: 'guest' });

  // Modal states
  const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingProfile, setEditingProfile] = useState<Profile | null>(null);
  const [isAdminClientModalOpen, setIsAdminClientModalOpen] = useState(false);

  // Subscribe to live Firestore profiles updates
  useEffect(() => {
    const unsub = subscribeProfiles((updatedList) => {
      setProfiles(updatedList);
    });
    return () => unsub();
  }, []);

  const handlePageChange = (page: NavPage) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // WhatsApp Share Helper
  const handleShareWhatsApp = (p: Profile) => {
    const text = `*Ceylon Nikah Candidate Profile — ${p.regid}*\nName: ${p.name || 'Candidate'}\nGender: ${p.gender}\nAge: ${p.age} years\nHeight: ${p.height}\nMarital Status: ${p.marital}\nLocation: ${p.place || p.district}\nEducation: ${p.edu}\nOccupation: ${p.occupation}\nExpectation: ${p.expectation || 'N/A'}\n\nFor full details, visit Ceylon Nikah platform.`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  // Admin login handler
  const handleLoginSubmit = async (emailOrUser: string, pass: string): Promise<boolean> => {
    const query = emailOrUser.toLowerCase().trim();
    
    // Check Admin
    if (query.includes('admin') || query === 'ceylonnikah24@gmail.com') {
      setUserSession({
        role: 'admin',
        email: 'ceylonnikah24@gmail.com',
        label: 'Admin Administrator',
      });
      handlePageChange('profiles');
      return true;
    }

    // Check Client
    const matchedClient = clients.find((c) => c.username.toLowerCase() === query);
    if (matchedClient) {
      setUserSession({
        role: 'client',
        username: matchedClient.username,
        label: matchedClient.label,
        perms: {
          gender: matchedClient.gender,
          districts: matchedClient.districts,
          showContact: matchedClient.showContact,
        },
      });
      handlePageChange('profiles');
      return true;
    }

    return false;
  };

  const handleAdminLoginDemo = () => {
    setUserSession({
      role: 'admin',
      email: 'ceylonnikah24@gmail.com',
      label: 'Admin Administrator',
    });
    handlePageChange('profiles');
  };

  const handleLogout = () => {
    setUserSession({ role: 'guest' });
    handlePageChange('home');
  };

  // Save/Update Profile
  const handleSaveProfile = async (profileData: Profile) => {
    await syncProfile(profileData);
    setProfiles(getStoredProfiles());
  };

  // Toggle Married status
  const handleToggleMarried = async (profileId: string) => {
    const target = profiles.find((p) => p.id === profileId);
    if (!target) return;
    const updated: Profile = {
      ...target,
      status: target.status === 'Married' ? 'Available' : 'Married',
    };
    await syncProfile(updated);
    setSelectedProfile(updated);
    setProfiles(getStoredProfiles());
  };

  // Delete Profile
  const handleDeleteProfile = async (profileId: string) => {
    await deleteProfileFromDb(profileId);
    setSelectedProfile(null);
    setProfiles(getStoredProfiles());
  };

  // Save Client
  const handleSaveClient = async (newClient: Client) => {
    const updated = [newClient, ...clients];
    setClients(updated);
    saveStoredClients(updated);
  };

  // Delete Client
  const handleDeleteClient = async (id: string) => {
    const updated = clients.filter((c) => c.id !== id);
    setClients(updated);
    saveStoredClients(updated);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f4f8f5] text-[#1c2e26] font-['Plus_Jakarta_Sans',sans-serif]">
      
      {/* Top Navbar */}
      <Navbar
        currentPage={currentPage}
        onPageChange={handlePageChange}
        userSession={userSession}
        onLogout={handleLogout}
        onOpenAdminClients={() => setIsAdminClientModalOpen(true)}
        onOpenAddProfile={() => {
          setEditingProfile(null);
          setIsAddModalOpen(true);
        }}
      />

      {/* Main Page Routing */}
      <main className="flex-1">
        {currentPage === 'home' && (
          <HomeView
            profiles={profiles}
            onPageChange={handlePageChange}
            onSelectProfile={(p) => setSelectedProfile(p)}
            onShareWhatsApp={handleShareWhatsApp}
          />
        )}

        {currentPage === 'about' && (
          <HomeView
            profiles={profiles}
            onPageChange={handlePageChange}
            onSelectProfile={(p) => setSelectedProfile(p)}
            onShareWhatsApp={handleShareWhatsApp}
          />
        )}

        {currentPage === 'contact' && (
          <ContactView onPageChange={handlePageChange} />
        )}

        {currentPage === 'packages' && (
          <PackagesView onPageChange={handlePageChange} />
        )}

        {currentPage === 'profiles' && (
          <ProfilesView
            profiles={profiles}
            userSession={userSession}
            onPageChange={handlePageChange}
            onSelectProfile={(p) => setSelectedProfile(p)}
            onShareWhatsApp={handleShareWhatsApp}
            onOpenAddProfile={() => {
              setEditingProfile(null);
              setIsAddModalOpen(true);
            }}
          />
        )}

        {currentPage === 'login' && (
          <LoginView
            onPageChange={handlePageChange}
            onLoginSubmit={handleLoginSubmit}
            onAdminLoginDemo={handleAdminLoginDemo}
            userSession={userSession}
          />
        )}

        {currentPage === 'register' && (
          <RegisterView
            onPageChange={handlePageChange}
            onRegisterSubmit={async (newProfile) => {
              const fullProf: Profile = {
                id: `p-${Date.now()}`,
                regid: newProfile.regid || `USR-${Math.floor(10000 + Math.random() * 90000)}`,
                gender: newProfile.gender || 'Female',
                age: newProfile.age || 25,
                height: newProfile.height || "5' 4\"",
                marital: newProfile.marital || 'Never Married',
                status: 'Available',
                place: newProfile.place || 'Colombo',
                district: newProfile.district || 'Colombo',
                edu: newProfile.edu || 'Higher Education',
                occupation: newProfile.occupation || 'Employed',
                contact: newProfile.contact || '',
                createdAt: Date.now(),
                ...newProfile,
              } as Profile;
              await handleSaveProfile(fullProf);
            }}
          />
        )}
      </main>

      {/* Footer */}
      <Footer onPageChange={handlePageChange} />

      {/* Profile Detail Modal */}
      {selectedProfile && (
        <ProfileDetailModal
          profile={selectedProfile}
          userSession={userSession}
          onClose={() => setSelectedProfile(null)}
          onShareWhatsApp={handleShareWhatsApp}
          onToggleMarried={handleToggleMarried}
          onEdit={(p) => {
            setSelectedProfile(null);
            setEditingProfile(p);
            setIsAddModalOpen(true);
          }}
          onDelete={handleDeleteProfile}
        />
      )}

      {/* Add / Edit Profile Modal */}
      {isAddModalOpen && (
        <AddProfileModal
          editingProfile={editingProfile}
          onClose={() => {
            setIsAddModalOpen(false);
            setEditingProfile(null);
          }}
          onSave={handleSaveProfile}
        />
      )}

      {/* Admin Client Accounts Management Modal */}
      {isAdminClientModalOpen && (
        <AdminClientModal
          clients={clients}
          onClose={() => setIsAdminClientModalOpen(false)}
          onSaveClient={handleSaveClient}
          onDeleteClient={handleDeleteClient}
        />
      )}

    </div>
  );
}
