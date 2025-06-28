import { create } from 'zustand';
import { ReportData } from '../(router)/notifications/data';

interface ModalState {
  isOpen: boolean;
  reportId: string | null;
  reportData: ReportData | null;
  isLoading: boolean;
  error: string | null;
  openModal: (reportId: string, reportData?: ReportData) => void;
  closeModal: () => void;
  setReportData: (data: ReportData) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

const useModalStore = create<ModalState>((set) => ({
  isOpen: false,
  reportId: null,
  reportData: null,
  isLoading: false,
  error: null,
  openModal: (reportId: string, reportData?: ReportData) => 
    set({ 
      isOpen: true, 
      reportId, 
      reportData: reportData || null, 
      error: null,
      isLoading: reportData ? false : true // reportData가 있으면 로딩하지 않음
    }),
  closeModal: () => 
    set({ isOpen: false, reportId: null, reportData: null, error: null, isLoading: false }),
  setReportData: (data) => set({ reportData: data, isLoading: false }),
  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error, isLoading: false }),
}));

export default useModalStore; 