import { create } from 'zustand';
import { DailyReportResponse } from '../services/types';

interface ModalState {
  isOpen: boolean;
  reportId: string | null;
  reportData: DailyReportResponse['data'] | null;
  isLoading: boolean;
  error: string | null;
  openModal: (reportId: string) => void;
  closeModal: () => void;
  setReportData: (data: DailyReportResponse['data']) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

const useModalStore = create<ModalState>((set) => ({
  isOpen: false,
  reportId: null,
  reportData: null,
  isLoading: false,
  error: null,
  openModal: (reportId: string) => 
    set({ isOpen: true, reportId, reportData: null, error: null }),
  closeModal: () => 
    set({ isOpen: false, reportId: null, reportData: null, error: null, isLoading: false }),
  setReportData: (data) => set({ reportData: data, isLoading: false }),
  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error, isLoading: false }),
}));

export default useModalStore; 