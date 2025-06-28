import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
  duration?: number;
}

interface ToastState {
  toasts: Toast[];
  addToast: (toast: Omit<Toast, 'id'>) => void;
  removeToast: (id: string) => void;
  clearToasts: () => void;
}

const useToastStore = create<ToastState>()(
  devtools((set, get) => ({
    toasts: [],
    addToast: (toast) => {
      const id = Date.now().toString() + Math.random().toString(36).substr(2, 9);
      const newToast = { ...toast, id };
      
      set({ toasts: [...get().toasts, newToast] });
      
      // 자동 제거 (기본 3초, 설정한 duration으로 변경 가능)
      setTimeout(() => {
        get().removeToast(id);
      }, toast.duration || 3000);
    },
    removeToast: (id) => {
      set({ toasts: get().toasts.filter(toast => toast.id !== id) });
    },
    clearToasts: () => {
      set({ toasts: [] });
    },
  }))
);

export default useToastStore; 