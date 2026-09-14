import React from 'react';
import { useApp } from '../context/AppContext';
import { X, AlertTriangle, CheckCircle, Clock, MapPin, Wrench, Shield, Edit3, Trash2, Check, Ban } from 'lucide-react';
import type { Severity, AIPriority, ReqStatus } from '../types';

const NAVY = '#123B66';
const BLUE = '#1769AA';
const GREEN = '#138A4B';
const SAFFRON = '#F28C28';

function SeverityBadge({ v }: { v: Severity }) {
  const map: Record<Severity, string> = {
    Critical: 'bg-red-50 text-red-700 border-red-200',
    High: 'bg-orange-50 text-orange-700 border-orange-200',
    Medium: 'bg-yellow-50 text-yellow-700 border-yellow-200',
    Low: 'bg-slate-50 text-slate-600 border-slate-200',
  };
  return <span className={`text-xs px-2.5 py-0.5 rounded-full font-semibold border ${map[v]}`}>{v}</span>;
}

function AIPriorityBadge({ v }: { v: AIPriority }) {
  const map: Record<AIPriority, string> = {
    CRITICAL: 'bg-red-600 text-white',
    HIGH: 'bg-orange-500 text-white',
    MEDIUM: 'bg-amber-500 text-white',
    LOW: 'bg-slate-500 text-white',
  };
  return (
    <span className={`text-[10px] px-2 py-0.5 rounded font-bold font-mono tracking-wider uppercase ${map[v]}`}>
      {v}
    </span>
  );
}

function StatusBadge({ v }: { v: ReqStatus }) {
  const map: Record<ReqStatus, { bg: string; text: string; border: string }> = {
    Pending: { bg: '#FFFBEB', text: '#B45309', border: '#FDE68A' },
    Approved: { bg: '#F0FDF4', text: '#15803D', border: '#BBF7D0' },
    'In Progress': { bg: '#EFF6FF', text: '#1D4ED8', border: '#BFDBFE' },
    Completed: { bg: '#F8FAFC', text: '#475569', border: '#E2E8F0' },
    Rejected: { bg: '#FEF2F2', text: '#B91C1C', border: '#FECACA' },
  };
  const c = map[v] || map.Pending;
  return (
    <span
      className="text-xs px-2.5 py-0.5 rounded-full font-semibold border"
      style={{ backgroundColor: c.bg, color: c.text, borderColor: c.border }}
    >
      {v}
    </span>
  );
}

export default function RequestDetailsModal() {
  const {
    selectedRequest,
    setSelectedRequest,
    updateRequest,
    deleteRequest,
    setIsEditRequestOpen,
  } = useApp();

  if (!selectedRequest) return null;

  const handleApprove = () => {
    updateRequest(selectedRequest.id, { status: 'Approved' });
  };

  const handleReject = () => {
    updateRequest(selectedRequest.id, { status: 'Rejected' });
  };

  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center p-2.5 sm:p-4 bg-slate-900/50 backdrop-blur-xs">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-2xl w-full overflow-hidden my-4 sm:my-6 flex flex-col max-h-[90vh] sm:max-h-[85vh] animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-4 sm:px-6 py-3.5 sm:py-4 border-b border-slate-100 flex items-center justify-between" style={{ background: NAVY }}>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono font-bold text-base sm:text-lg text-white">{selectedRequest.id}</span>
              <StatusBadge v={selectedRequest.status} />
            </div>
            <p className="text-[11px] sm:text-xs text-white/70 mt-0.5">{selectedRequest.department} · {selectedRequest.section} Section</p>
          </div>
          <button
            onClick={() => setSelectedRequest(null)}
            className="text-white/70 hover:text-white w-10 h-10 -mr-1 rounded-lg transition-colors flex items-center justify-center flex-shrink-0"
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4 sm:space-y-5 flex-1">
          {/* AI Banner */}
          <div
            className="rounded-xl p-4 flex items-start gap-3.5"
            style={{
              background:
                selectedRequest.aiPriority === 'CRITICAL' || selectedRequest.aiPriority === 'HIGH'
                  ? '#FEF2F2'
                  : '#F0FDF4',
              borderLeft: `4px solid ${
                selectedRequest.aiPriority === 'CRITICAL' ? '#DC2626' : selectedRequest.aiPriority === 'HIGH' ? '#EA580C' : GREEN
              }`,
            }}
          >
            <AlertTriangle
              size={18}
              className="flex-shrink-0 mt-0.5"
              style={{ color: selectedRequest.aiPriority === 'CRITICAL' ? '#DC2626' : '#EA580C' }}
            />
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-2 flex-wrap mb-1">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-700">TrackSync AI Advisory</span>
                <AIPriorityBadge v={selectedRequest.aiPriority} />
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                {selectedRequest.safetyCritical ? 'Safety-Critical Asset: ' : ''}
                {selectedRequest.reason}
              </p>
            </div>
          </div>

          {/* Core Info Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-slate-50 p-4 rounded-xl border border-slate-200">
            <div>
              <p className="text-[10px] uppercase font-bold text-slate-400">Activity Title</p>
              <p className="text-sm font-semibold text-slate-800 mt-0.5">{selectedRequest.activity}</p>
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold text-slate-400">Target Asset</p>
              <p className="text-sm font-semibold text-slate-800 mt-0.5">{selectedRequest.asset}</p>
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold text-slate-400">Location</p>
              <p className="text-xs font-medium text-slate-700 mt-0.5">{selectedRequest.location}</p>
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold text-slate-400">Severity</p>
              <div className="mt-1">
                <SeverityBadge v={selectedRequest.severity} />
              </div>
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold text-slate-400">Requested Schedule</p>
              <p className="text-xs font-medium text-slate-700 mt-0.5 font-mono">
                {selectedRequest.requestedDate} ({selectedRequest.preferredTime})
              </p>
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold text-slate-400">Required Duration</p>
              <p className="text-xs font-medium text-slate-700 mt-0.5 font-mono">
                {selectedRequest.duration} ({selectedRequest.durationMins} mins)
              </p>
            </div>
          </div>

          {/* Description */}
          <div>
            <h4 className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">Scope Description</h4>
            <p className="text-xs text-slate-700 leading-relaxed bg-white border border-slate-200 p-3 rounded-xl">
              {selectedRequest.description || selectedRequest.reason}
            </p>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">Mobilized Resources</h4>
            <div className="flex flex-wrap gap-1.5">
              {selectedRequest.resources.map((res) => (
                <span key={res} className="text-xs px-2.5 py-1 rounded-lg bg-slate-100 border border-slate-200 text-slate-700">
                  {res}
                </span>
              ))}
            </div>
          </div>

          {/* Provenance & History */}
          <div className="pt-3 border-t border-slate-100">
            <h4 className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">Audit & Origin</h4>
            <div className="text-xs text-slate-500 space-y-1">
              <p><span className="font-semibold text-slate-700">Originator:</span> {selectedRequest.createdBy || 'Field Supervisor'}</p>
              <p><span className="font-semibold text-slate-700">Submitted At:</span> {selectedRequest.createdAt || selectedRequest.requestedDate}</p>
            </div>

            {selectedRequest.history && selectedRequest.history.length > 0 && (
              <div className="mt-3 space-y-1">
                <p className="text-[10px] font-bold uppercase text-slate-400">Activity Trail</p>
                <div className="space-y-1 pl-2 border-l-2 border-slate-200">
                  {selectedRequest.history.map((h, i) => (
                    <p key={i} className="text-[11px] text-slate-600">
                      • {h}
                    </p>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-3 sm:p-4 border-t border-slate-100 bg-slate-50 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 sm:gap-3">
          <button
            onClick={() => {
              if (window.confirm(`Delete request ${selectedRequest.id}?`)) {
                deleteRequest(selectedRequest.id);
              }
            }}
            className="flex items-center justify-center gap-1.5 px-3 py-2.5 min-h-[44px] text-xs font-semibold text-red-600 hover:bg-red-50 rounded-xl transition-colors border border-red-200 sm:border-transparent"
          >
            <Trash2 size={14} />
            Delete Request
          </button>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => {
                setIsEditRequestOpen(true);
              }}
              className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-4 py-2.5 min-h-[44px] text-xs font-semibold border border-slate-300 hover:bg-slate-100 rounded-xl transition-colors text-slate-700"
            >
              <Edit3 size={14} />
              Edit Request
            </button>

            {selectedRequest.status !== 'Approved' && (
              <button
                onClick={handleApprove}
                className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-5 py-2.5 min-h-[44px] text-xs font-bold text-white rounded-xl hover:opacity-90 transition-opacity shadow-sm"
                style={{ background: GREEN }}
              >
                <Check size={14} />
                Approve
              </button>
            )}

            {selectedRequest.status !== 'Rejected' && (
              <button
                onClick={handleReject}
                className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-4 py-2.5 min-h-[44px] text-xs font-semibold border border-red-300 text-red-600 hover:bg-red-50 rounded-xl transition-colors"
              >
                <Ban size={14} />
                Reject
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
