import React from 'react';
import { useApp } from '../context/AppContext';
import { CheckCircle2, AlertTriangle, Info, AlertCircle, X } from 'lucide-react';

const icons = {
  success: <CheckCircle2 size={16} className="text-emerald-600 flex-shrink-0" />,
  warning: <AlertTriangle size={16} className="text-amber-600 flex-shrink-0" />,
  info: <Info size={16} className="text-blue-600 flex-shrink-0" />,
  error: <AlertCircle size={16} className="text-red-600 flex-shrink-0" />,
};

const borderColors = {
  success: 'border-emerald-200 bg-white text-slate-800 shadow-emerald-500/10',
  warning: 'border-amber-200 bg-white text-slate-800 shadow-amber-500/10',
  info: 'border-blue-200 bg-white text-slate-800 shadow-blue-500/10',
  error: 'border-red-200 bg-white text-slate-800 shadow-red-500/10',
};

export default function ToastContainer() {
  const { toasts, dismissToast } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-[9999] flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`pointer-events-auto flex items-center justify-between gap-3 px-4 py-3 rounded-xl border shadow-lg transition-all duration-300 transform translate-y-0 ${
            borderColors[toast.type]
          }`}
        >
          <div className="flex items-center gap-3 min-w-0">
            {icons[toast.type]}
            <p className="text-xs font-semibold leading-snug truncate">{toast.message}</p>
          </div>
          <button
            onClick={() => dismissToast(toast.id)}
            className="text-slate-400 hover:text-slate-700 p-1 rounded-lg transition-colors flex-shrink-0"
          >
            <X size={14} />
          </button>
        </div>
      ))}
    </div>
  );
}
