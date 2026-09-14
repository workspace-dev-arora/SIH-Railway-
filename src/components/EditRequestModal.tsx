import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { X, Edit3, Check } from 'lucide-react';
import type { Severity, ReqStatus, Department } from '../types';

const NAVY = '#123B66';

export default function EditRequestModal() {
  const { isEditRequestOpen, setIsEditRequestOpen, selectedRequest, updateRequest } = useApp();

  const [activity, setActivity] = useState('');
  const [department, setDepartment] = useState<Department>('Engineering');
  const [section, setSection] = useState('A–B');
  const [asset, setAsset] = useState('');
  const [severity, setSeverity] = useState<Severity>('Medium');
  const [status, setStatus] = useState<ReqStatus>('Pending');
  const [duration, setDuration] = useState('');
  const [preferredTime, setPreferredTime] = useState('');
  const [location, setLocation] = useState('');
  const [safetyCritical, setSafetyCritical] = useState(false);
  const [reason, setReason] = useState('');

  useEffect(() => {
    if (selectedRequest) {
      setActivity(selectedRequest.activity);
      setDepartment(selectedRequest.department);
      setSection(selectedRequest.section);
      setAsset(selectedRequest.asset);
      setSeverity(selectedRequest.severity);
      setStatus(selectedRequest.status);
      setDuration(selectedRequest.duration);
      setPreferredTime(selectedRequest.preferredTime);
      setLocation(selectedRequest.location);
      setSafetyCritical(selectedRequest.safetyCritical);
      setReason(selectedRequest.reason);
    }
  }, [selectedRequest]);

  if (!isEditRequestOpen || !selectedRequest) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateRequest(selectedRequest.id, {
      activity,
      department,
      section,
      asset,
      severity,
      status,
      duration,
      preferredTime,
      location,
      safetyCritical,
      reason,
    });
    setIsEditRequestOpen(false);
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-2.5 sm:p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-lg w-full overflow-hidden my-4 sm:my-6">
        <div className="px-4 sm:px-6 py-3.5 sm:py-4 border-b border-slate-100 flex items-center justify-between" style={{ background: NAVY }}>
          <div className="flex items-center gap-2 text-white">
            <Edit3 size={16} />
            <h3 className="text-sm font-bold">Edit Request {selectedRequest.id}</h3>
          </div>
          <button
            onClick={() => setIsEditRequestOpen(false)}
            className="text-white/70 hover:text-white w-10 h-10 -mr-1 rounded-lg transition-colors flex items-center justify-center flex-shrink-0"
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSave} className="p-4 sm:p-6 space-y-3.5 sm:space-y-4 max-h-[75vh] overflow-y-auto">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as ReqStatus)}
              className="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:outline-none focus:border-blue-400"
            >
              <option value="Pending">Pending</option>
              <option value="Approved">Approved</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Activity Title</label>
            <input
              type="text"
              value={activity}
              onChange={(e) => setActivity(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Severity</label>
              <select
                value={severity}
                onChange={(e) => setSeverity(e.target.value as Severity)}
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:outline-none"
              >
                <option value="Critical">Critical</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Section</label>
              <select
                value={section}
                onChange={(e) => setSection(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:outline-none"
              >
                <option value="A–B">A–B</option>
                <option value="B–C">B–C</option>
                <option value="C–D">C–D</option>
                <option value="D–E">D–E</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Duration</label>
              <input
                type="text"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Preferred Window</label>
              <input
                type="text"
                value={preferredTime}
                onChange={(e) => setPreferredTime(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Location</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Reason</label>
            <textarea
              rows={2}
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:outline-none"
            />
          </div>

          <div className="pt-3 border-t border-slate-100 flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-end gap-2 sm:gap-2.5">
            <button
              type="button"
              onClick={() => setIsEditRequestOpen(false)}
              className="px-4 py-2.5 min-h-[44px] text-xs font-semibold border border-slate-200 rounded-xl hover:bg-slate-50 flex items-center justify-center"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 min-h-[44px] text-xs font-bold text-white rounded-xl shadow-sm flex items-center justify-center gap-1.5"
              style={{ background: NAVY }}
            >
              <Check size={14} />
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
