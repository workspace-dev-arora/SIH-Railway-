import React from 'react';
import { useApp } from '../context/AppContext';
import { X, AlertTriangle, Train, CheckCircle2, ShieldAlert } from 'lucide-react';
import type { ConflictItem } from '../types';

const NAVY = '#123B66';

export default function ConflictModal() {
  const { selectedConflict, setSelectedConflict } = useApp();

  if (!selectedConflict) return null;

  const severityColors = {
    HIGH: { bg: '#FEE2E2', text: '#DC2626', border: '#FCA5A5' },
    MEDIUM: { bg: '#FED7AA', text: '#EA580C', border: '#FDBA74' },
    LOW: { bg: '#FEF9C3', text: '#CA8A04', border: '#FDE047' },
  };

  const style = severityColors[selectedConflict.severity];

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-2.5 sm:p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-lg w-full overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        <div className="px-4 sm:px-6 py-3.5 sm:py-4 border-b border-slate-100 flex items-center justify-between" style={{ background: NAVY }}>
          <div className="flex items-center gap-2 text-white">
            <ShieldAlert size={18} className="text-amber-400 flex-shrink-0" />
            <h3 className="text-sm font-bold">Conflict Analysis: {selectedConflict.id}</h3>
          </div>
          <button
            onClick={() => setSelectedConflict(null)}
            className="text-white/70 hover:text-white w-10 h-10 -mr-1 rounded-lg transition-colors flex items-center justify-center flex-shrink-0"
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        <div className="p-4 sm:p-6 space-y-3.5 sm:space-y-4">
          {/* Severity & Section Banner */}
          <div className="flex items-center justify-between">
            <span
              className="text-xs font-bold px-2.5 py-1 rounded-full border uppercase tracking-wider"
              style={{ background: style.bg, color: style.text, borderColor: style.border }}
            >
              {selectedConflict.severity} SEVERITY CONFLICT
            </span>
            <span className="text-xs font-mono font-bold text-slate-500">
              Section {selectedConflict.section}
            </span>
          </div>

          <div>
            <h4 className="text-sm sm:text-base font-bold text-slate-800">{selectedConflict.title}</h4>
            <p className="text-xs text-slate-600 leading-relaxed mt-2 p-3 bg-slate-50 border border-slate-200 rounded-xl">
              {selectedConflict.description}
            </p>
          </div>

          {selectedConflict.trainAffected && selectedConflict.trainAffected !== 'N/A (Departmental Conflict)' && (
            <div className="flex items-center gap-3 p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900">
              <Train size={16} className="text-amber-700 flex-shrink-0" />
              <div>
                <p className="font-bold">Affected Train Schedule</p>
                <p className="text-amber-700">{selectedConflict.trainAffected}</p>
              </div>
            </div>
          )}

          {selectedConflict.resolution && (
            <div className="p-3.5 sm:p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-emerald-800">
                <CheckCircle2 size={15} className="text-emerald-600" />
                TrackSync AI Mitigation Strategy
              </div>
              <p className="text-emerald-700 leading-relaxed pl-5">
                {selectedConflict.resolution}
              </p>
            </div>
          )}

          <div className="pt-3 border-t border-slate-100 flex justify-end">
            <button
              onClick={() => setSelectedConflict(null)}
              className="w-full sm:w-auto px-5 py-2.5 min-h-[44px] text-xs font-bold text-white rounded-xl shadow-sm hover:opacity-90 flex items-center justify-center"
              style={{ background: NAVY }}
            >
              Acknowledge & Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
