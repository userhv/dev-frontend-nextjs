import { useState, useCallback } from 'react';

export interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
}

export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback((toast: Omit<Toast, 'id'>) => {
    const id = Date.now().toString() + Math.random().toString(36).substring(7);
    const newToast = { ...toast, id };
    
    setToasts(prev => [...prev, newToast]);
    
    const duration = toast.duration || 5000;
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, duration);
    
    return id;
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  const removeAllToasts = useCallback(() => {
    setToasts([]);
  }, []);

  return { 
    toasts, 
    addToast, 
    removeToast, 
    removeAllToasts,
    success: (message: string, duration?: number) => addToast({ message, type: 'success', duration }),
    error: (message: string, duration?: number) => addToast({ message, type: 'error', duration }),
    warning: (message: string, duration?: number) => addToast({ message, type: 'warning', duration }),
    info: (message: string, duration?: number) => addToast({ message, type: 'info', duration }),
  };
}
