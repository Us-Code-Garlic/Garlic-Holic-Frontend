import { create } from 'zustand';

interface ModalState {
  isOpen: boolean;
  reportId: string | null;
  openModal: (reportId: string) => void;
  closeModal: () => void;
}

const useModalStore = create<ModalState>((set) => ({
  isOpen: false,
  reportId: null,
  openModal: (reportId: string) => set({ isOpen: true, reportId }),
  closeModal: () => set({ isOpen: false, reportId: null }),
}));

export default useModalStore; 