import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, onSnapshot, doc, setDoc, deleteDoc, getDoc } from 'firebase/firestore';
import { Profile, Client } from '../types';
import { INITIAL_PROFILES } from '../data/initialProfiles';

export const firebaseConfig = {
  apiKey: "AIzaSyBx3df6z9VaUJK6oEoGncqoYJnJlx0VxdA",
  authDomain: "ceylonnikah-505fe.firebaseapp.com",
  projectId: "ceylonnikah-505fe",
  storageBucket: "ceylonnikah-505fe.firebasestorage.app",
  messagingSenderId: "266163538569",
  appId: "1:266163538569:web:41bfb2fa58d1b9fbbd9458"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);
export const db = getFirestore(app);

const LOCAL_PROFILES_KEY = 'ceylon_nikah_profiles_v2';
const LOCAL_CLIENTS_KEY = 'ceylon_nikah_clients_v2';

export function getStoredProfiles(): Profile[] {
  try {
    const raw = localStorage.getItem(LOCAL_PROFILES_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (e) {
    console.warn('Failed to load local profiles', e);
  }
  localStorage.setItem(LOCAL_PROFILES_KEY, JSON.stringify(INITIAL_PROFILES));
  return INITIAL_PROFILES;
}

export function saveStoredProfiles(profiles: Profile[]): void {
  try {
    localStorage.setItem(LOCAL_PROFILES_KEY, JSON.stringify(profiles));
  } catch (e) {
    console.warn('Failed to save local profiles', e);
  }
}

export function getStoredClients(): Client[] {
  try {
    const raw = localStorage.getItem(LOCAL_CLIENTS_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch (e) {
    console.warn('Failed to load local clients', e);
  }
  return [];
}

export function saveStoredClients(clients: Client[]): void {
  try {
    localStorage.setItem(LOCAL_CLIENTS_KEY, JSON.stringify(clients));
  } catch (e) {
    console.warn('Failed to save local clients', e);
  }
}

// Subscribe to Firestore profiles with local storage fallback
export function subscribeProfiles(onUpdate: (profiles: Profile[]) => void): () => void {
  try {
    const profilesCol = collection(db, 'profiles');
    const unsub = onSnapshot(profilesCol, (snapshot) => {
      if (!snapshot.empty) {
        const firestoreList: Profile[] = snapshot.docs.map(d => ({ id: d.id, ...d.data() } as Profile));
        saveStoredProfiles(firestoreList);
        onUpdate(firestoreList);
      } else {
        // Seed Firestore if empty
        const initial = getStoredProfiles();
        initial.forEach(p => {
          setDoc(doc(db, 'profiles', p.id), p).catch(console.warn);
        });
        onUpdate(initial);
      }
    }, (error) => {
      console.warn('Firestore offline or restricted, fallback to local', error);
      onUpdate(getStoredProfiles());
    });
    return unsub;
  } catch (e) {
    console.warn('Firestore initialization error, using local state', e);
    onUpdate(getStoredProfiles());
    return () => {};
  }
}

// Sync single profile to Firestore and local
export async function syncProfile(profile: Profile): Promise<void> {
  // Update local
  const current = getStoredProfiles();
  const idx = current.findIndex(p => p.id === profile.id);
  if (idx >= 0) current[idx] = profile;
  else current.unshift(profile);
  saveStoredProfiles(current);

  // Sync to Firestore
  try {
    await setDoc(doc(db, 'profiles', profile.id), profile);
  } catch (e) {
    console.warn('Firestore write failed, saved locally', e);
  }
}

export async function deleteProfileFromDb(id: string): Promise<void> {
  const current = getStoredProfiles().filter(p => p.id !== id);
  saveStoredProfiles(current);
  try {
    await deleteDoc(doc(db, 'profiles', id));
  } catch (e) {
    console.warn('Firestore delete failed', e);
  }
}
