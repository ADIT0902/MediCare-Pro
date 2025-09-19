export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'doctor' | 'patient';
  avatar?: string;
  specialization?: string; // for doctors
  department?: string; // for doctors
  patientId?: string; // for patients
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}