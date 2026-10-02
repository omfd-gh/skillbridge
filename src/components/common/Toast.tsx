import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { useCareer } from '../../context/CareerContext';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useCareer();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 max-w-sm pointer-events-none">
      {toasts.map((toast) => {
        const icons = {
          success: <CheckCircle2 className="w-4 h-4 text-[#27D6A0] flex-shrink-0" />,
          warning: <AlertCircle className="w-4 h-4 text-[#EAB04B] flex-shrink-0" />,
          info: <Info className="w-4 h-4 text-[#8B6CFF] flex-shrink-0" />,
        };

        const borders = {
          success: 'border-[#27D6A0]/30 bg-[#101217]/95 shadow-[0_8px_30px_rgba(0,0,0,0.35)]',
          warning: 'border-[#EAB04B]/30 bg-[#101217]/95 shadow-[0_8px_30px_rgba(0,0,0,0.35)]',
          info: 'border-[#7C5CFF]/30 bg-[#101217]/95 shadow-[0_8px_30px_rgba(0,0,0,0.35)]',
        };

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-xl border backdrop-blur-md transition-all animate-in fade-in slide-in-from-bottom-2 ${
              borders[toast.type || 'info']
            }`}
          >
            {icons[toast.type || 'info']}
            <span className="text-xs text-[#F2F3F5] font-medium flex-1">{toast.message}</span>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-[#687083] hover:text-[#F2F3F5] p-0.5 rounded transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
