export type NavPage = 'home' | 'about' | 'packages' | 'profiles' | 'contact' | 'login' | 'register';

export type ProfileStatus = 'Available' | 'Married';

export interface Profile {
  id: string;
  regid: string; // e.g. USR-13193 or C1169
  name?: string;
  gender: 'Male' | 'Female' | string;
  age: number | string;
  height: string;
  weight?: string;
  marital: string; // e.g., 'Never Married', 'Divorced', 'Widowed'
  status: ProfileStatus;
  place: string;
  district: string;
  country?: string;
  city?: string;
  ethnicity?: string;
  edu: string;
  occupation: string;
  father?: string;
  mother?: string;
  siblings?: string;
  familystatus?: string;
  contact?: string;
  expage?: string;
  expectation?: string;
  otherdetails?: string;
  photos?: string[];
  joinedAgo?: string;
  verified?: boolean;
  createdAt?: number;
}

export interface Client {
  id: string;
  username: string;
  label: string;
  gender?: string;
  districts?: string[];
  showContact?: boolean;
  email?: string;
  createdAt?: number;
}

export interface UserSession {
  role: 'admin' | 'client' | 'guest';
  email?: string;
  uid?: string;
  username?: string;
  label?: string;
  perms?: {
    gender?: string;
    districts?: string[];
    showContact?: boolean;
  };
}

export interface RegisterFormData {
  // Step 1: Account Details
  email: string;
  phone: string;
  whatsapp: string;
  password: string;
  confirmPassword: string;
  
  // Step 2: Personal Details
  fullName: string;
  gender: 'Male' | 'Female' | '';
  age: string;
  height: string;
  weight: string;
  complexion: string;
  dresscode: string;

  // Step 3: Location & Education
  country: string;
  district: string;
  city: string;
  edu: string;
  occupation: string;

  // Step 4: Family Details
  father: string;
  mother: string;
  siblings: string;
  familystatus: string;

  // Step 5: Additional Details
  marital: string;
  expage: string;
  expectation: string;
  otherdetails: string;
  contact: string;
}

export interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
}
