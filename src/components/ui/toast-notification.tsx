import React, { useEffect } from 'react';
import { Toast } from '@/hooks/useToast';
import { CheckCircle, X, AlertCircle, Info, AlertTriangle } from 'lucide-react';

interface ToastNotificationProps {
  toast: Toast;
  onRemove: (id: string) => void;
}

const ToastNotification: React.FC<ToastNotificationProps> = ({ toast, onRemove }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onRemove(toast.id);
    }, toast.duration || 5000);

    return () => clearTimeout(timer);
  }, [toast.id, toast.duration, onRemove]);

  const getIcon = () => {
    switch (toast.type) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'error':
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      case 'info':
        return <Info className="w-5 h-5 text-blue-500" />;
      default:
        return <Info className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStyles = () => {
    const baseStyles = "flex items-center gap-3 p-4 rounded-lg shadow-lg border max-w-md w-full transition-all duration-300 ease-in-out transform";
    
    switch (toast.type) {
      case 'success':
        return `${baseStyles} bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 text-green-800 dark:text-green-200`;
      case 'error':
        return `${baseStyles} bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 text-red-800 dark:text-red-200`;
      case 'warning':
        return `${baseStyles} bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800 text-yellow-800 dark:text-yellow-200`;
      case 'info':
        return `${baseStyles} bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-200`;
      default:
        return `${baseStyles} bg-gray-50 dark:bg-gray-900/20 border-gray-200 dark:border-gray-800 text-gray-800 dark:text-gray-200`;
    }
  };

  return (
    <div className={getStyles()}>
      {getIcon()}
      <p className="flex-1 text-sm font-medium">{toast.message}</p>
      <button
        onClick={() => onRemove(toast.id)}
        className="p-1 hover:bg-black/10 dark:hover:bg-white/10 rounded-full transition-colors"
        aria-label="Fechar notificação"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

interface ToastContainerProps {
  toasts: Toast[];
  onRemove: (id: string) => void;
}

export const ToastContainer: React.FC<ToastContainerProps> = ({ toasts, onRemove }) => {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 pointer-events-none">
      {toasts.map((toast) => (
        <div key={toast.id} className="pointer-events-auto animate-fade-in">
          <ToastNotification toast={toast} onRemove={onRemove} />
        </div>
      ))}
    </div>
  );
};
