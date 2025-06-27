export interface PatientInfo {
  name: string;
  age: number;
  height: number;
  weight: number;
  bloodType: string;
  avatar?: string;
}

export interface Caregiver {
  id: string;
  name: string;
  phone: string;
  relationship?: string;
} 