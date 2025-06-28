'use client';
import useToastStore, { Toast } from '../store/toastStore';

const ToastComponent = ({ toast }: { toast: Toast }) => {
  const { removeToast } = useToastStore();

  const getToastStyle = () => {
    switch (toast.type) {
      case 'success':
        return 'bg-green-500 text-white';
      case 'error':
        return 'bg-red-500 text-white';
      case 'warning':
        return 'bg-yellow-500 text-white';
      case 'info':
      default:
        return 'bg-blue-500 text-white';
    }
  };

  const getIcon = () => {
    switch (toast.type) {
      case 'success':
        return '✅';
      case 'error':
        return '❌';
      case 'warning':
        return '⚠️';
      case 'info':
      default:
        return 'ℹ️';
    }
  };

  return (
    <div className={`
      ${getToastStyle()}
      px-6 py-4 rounded-lg shadow-lg mb-2 
      transform transition-all duration-300 ease-in-out
      animate-slide-in-right hover:scale-105
      flex items-center gap-3 min-w-[300px] max-w-[500px]
    `}>
      <span className="text-xl">{getIcon()}</span>
      <span className="flex-1 font-medium">{toast.message}</span>
      <button 
        onClick={() => removeToast(toast.id)}
        className="text-white/80 hover:text-white text-xl font-bold ml-2"
      >
        ×
      </button>
    </div>
  );
};

export default function ToastContainer() {
  const { toasts } = useToastStore();

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {toasts.map((toast) => (
        <ToastComponent key={toast.id} toast={toast} />
      ))}
    </div>
  );
} 