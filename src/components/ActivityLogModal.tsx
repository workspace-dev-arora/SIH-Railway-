import React from 'react';
import { useApp } from '../context/AppContext';
import { X, History, User, Clock, CheckCircle2 } from 'lucide-react';

const NAVY = '#123B66';

export default function ActivityLogModal() {
  const { isActivityLogOpen, setIsActivityLogOpen, activities } = useApp();

  if (!isActivityLogOpen) return null;

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-2.5 sm:p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-2xl w-full overflow-hidden flex flex-col max-h-[85vh] sm:max-h-[80vh] animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="px-4 sm:px-6 py-3.5 sm:py-4 border-b border-slate-100 flex items-center justify-between" style={{ background: NAVY }}>
          <div className="flex items-center gap-2 text-white">
            <History size={18} className="flex-shrink-0" />
            <div>
              <h3 className="text-sm font-bold">Activity History & Audit Trail</h3>
              <p className="text-[10px] sm:text-[11px] text-white/70">Operational timeline logged across all departments</p>
            </div>
          </div>
          <button
            onClick={() => setIsActivityLogOpen(false)}
            className="text-white/70 hover:text-white w-10 h-10 -mr-1 rounded-lg transition-colors flex items-center justify-center flex-shrink-0"
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 overflow-y-auto divide-y divide-slate-100 flex-1">
          {activities.length === 0 ? (
            <div className="py-16 text-center text-slate-400 text-xs">
              No activity logged yet.
            </div>
          ) : (
            activities.map((act) => (
              <div key={act.id} className="py-3.5 first:pt-0 last:pb-0 flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-700 flex-shrink-0 mt-0.5">
                  <CheckCircle2 size={16} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-bold text-slate-800">{act.action}</span>
                    <span className="text-[10px] text-slate-400 font-mono">{act.timestamp}</span>
                  </div>
                  <div className="flex items-center gap-3 text-[11px] text-slate-500 mt-1">
                    <span className="flex items-center gap-1 font-semibold text-slate-700">
                      <User size={11} />
                      {act.user}
                    </span>
                    <span>•</span>
                    <span className="font-mono text-slate-600 font-semibold">{act.relatedItem}</span>
                  </div>
                  {act.details && (
                    <p className="text-xs text-slate-600 mt-1.5 leading-relaxed bg-slate-50 p-2 rounded-lg border border-slate-100">
                      {act.details}
                    </p>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="px-4 sm:px-6 py-3 border-t border-slate-100 bg-slate-50 flex items-center justify-between text-xs text-slate-500">
          <span>{activities.length} total events recorded</span>
          <button
            onClick={() => setIsActivityLogOpen(false)}
            className="px-5 py-2.5 min-h-[44px] font-semibold text-white rounded-xl flex items-center justify-center"
            style={{ background: NAVY }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
