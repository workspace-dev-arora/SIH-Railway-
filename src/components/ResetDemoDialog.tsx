import React from 'react';
import { useApp } from '../context/AppContext';
import { X, RotateCcw, AlertTriangle } from 'lucide-react';

const NAVY = '#123B66';

export default function ResetDemoDialog() {
  const { isResetDialogOpen, setIsResetDialogOpen, resetDemoData } = useApp();

  if (!isResetDialogOpen) return null;

  return (
    <div className="fixed inset-0 z-[130] flex items-center justify-center p-2.5 sm:p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-md w-full overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        <div className="p-5 sm:p-6">
          <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center mb-4">
            <RotateCcw size={24} />
          </div>
          <h3 className="text-sm sm:text-base font-bold text-slate-900">Reset Demo Data to Initial State?</h3>
          <p className="text-xs text-slate-500 mt-2 leading-relaxed">
            This will restore the prototype back to the original SIH demonstration state:
          </p>
          <ul className="text-xs text-slate-600 mt-2 space-y-1 list-disc list-inside">
            <li>Block B014 returns to <span className="font-semibold text-amber-700">AI-Recommended</span> state</li>
            <li>Requests BR-1024, BR-1025, BR-1026 return to <span className="font-semibold text-amber-700">Pending</span></li>
            <li>All newly created requests or modified blocks will be reset</li>
            <li>Standard presentation seed timeline restored</li>
          </ul>

          <div className="mt-6 flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-end gap-2.5 sm:gap-3">
            <button
              onClick={() => setIsResetDialogOpen(false)}
              className="px-4 py-2.5 min-h-[44px] text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors flex items-center justify-center"
            >
              Cancel
            </button>
            <button
              onClick={resetDemoData}
              className="px-5 py-2.5 min-h-[44px] text-xs font-bold text-white bg-amber-600 hover:bg-amber-700 rounded-xl transition-colors shadow-sm flex items-center justify-center gap-1.5"
            >
              <RotateCcw size={13} />
              Reset Demo State
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
