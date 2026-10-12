import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import './Toast.css';

export interface ToastProps {
  message: string | null;
  onClose?: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message }) => {
  if (!message) return null;

  return (
    <div className="vizora-toast" role="status" aria-live="polite">
      <CheckCircle2 size={18} className="vizora-toast__icon" />
      <span>{message}</span>
    </div>
  );
};

export default Toast;
