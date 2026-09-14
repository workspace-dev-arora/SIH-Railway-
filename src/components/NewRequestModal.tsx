import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, Wrench, AlertTriangle, Clock, MapPin, Check } from 'lucide-react';
import type { Department, Severity } from '../types';

const NAVY = '#123B66';
const BLUE = '#1769AA';

export default function NewRequestModal() {
  const { isNewRequestOpen, setIsNewRequestOpen, addRequest } = useApp();

  const [department, setDepartment] = useState<Department>('Engineering');
  const [activity, setActivity] = useState('');
  const [section, setSection] = useState('A–B');
  const [asset, setAsset] = useState('');
  const [severity, setSeverity] = useState<Severity>('Medium');
  const [requestedDate, setRequestedDate] = useState('18 Sep 2026');
  const [duration, setDuration] = useState('2h 00m');
  const [durationMins, setDurationMins] = useState(120);
  const [preferredTime, setPreferredTime] = useState('22:00–00:30');
  const [location, setLocation] = useState('');
  const [safetyCritical, setSafetyCritical] = useState(false);
  const [reason, setReason] = useState('');
  const [resourcesInput, setResourcesInput] = useState('15 Gang Staff, Diagnostic Equipment');
  const [description, setDescription] = useState('');

  const [error, setError] = useState('');

  if (!isNewRequestOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!activity.trim()) {
      setError('Please specify the maintenance activity name.');
      return;
    }
    if (!asset.trim()) {
      setError('Please specify the railway asset / track identifier.');
      return;
    }
    if (!location.trim()) {
      setError('Please specify the physical location (e.g. KM 45.2).');
      return;
    }
    if (!reason.trim()) {
      setError('Please provide the operational justification/reason.');
      return;
    }

    const resources = resourcesInput
      .split(',')
      .map((r) => r.trim())
      .filter(Boolean);

    addRequest({
      department,
      activity: activity.trim(),
      section,
      asset: asset.trim(),
      severity,
      requestedDate,
      duration,
      durationMins: Number(durationMins) || 120,
      preferredTime,
      location: location.trim(),
      safetyCritical,
      reason: reason.trim(),
      resources: resources.length > 0 ? resources : ['Standard Maintenance Team'],
      description: description.trim() || reason.trim(),
    });

    // Reset & close
    setActivity('');
    setAsset('');
    setLocation('');
    setReason('');
    setDescription('');
    setError('');
    setIsNewRequestOpen(false);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-2.5 sm:p-4 bg-slate-900/50 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-2xl w-full overflow-hidden my-4 sm:my-8 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-4 sm:px-6 py-3.5 sm:py-4 border-b border-slate-100 flex items-center justify-between" style={{ background: NAVY }}>
          <div className="flex items-center gap-2.5 text-white">
            <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
              <Wrench size={16} />
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-bold">New Maintenance Request</h2>
              <p className="text-[11px] sm:text-xs text-white/70">Submit maintenance requisition to TrackSync Central Planning</p>
            </div>
          </div>
          <button
            onClick={() => setIsNewRequestOpen(false)}
            className="text-white/70 hover:text-white w-10 h-10 -mr-1 rounded-lg transition-colors flex items-center justify-center flex-shrink-0"
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-3.5 sm:space-y-4 max-h-[75vh] sm:max-h-[80vh] overflow-y-auto">
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-600 font-medium flex items-center gap-2">
              <AlertTriangle size={14} className="flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Department & Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Department <span className="text-red-500">*</span>
              </label>
              <select
                value={department}
                onChange={(e) => setDepartment(e.target.value as Department)}
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:outline-none focus:border-blue-400"
              >
                <option value="Engineering">Engineering (Track & Bridges)</option>
                <option value="Signal & Telecom">Signal & Telecom (S&T)</option>
                <option value="Traction">Traction (TRD / OHE)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Railway Section <span className="text-red-500">*</span>
              </label>
              <select
                value={section}
                onChange={(e) => setSection(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:outline-none focus:border-blue-400 font-mono"
              >
                <option value="A–B">A–B Section (KM 0–52)</option>
                <option value="B–C">B–C Section (KM 52–88)</option>
                <option value="C–D">C–D Section (KM 88–112)</option>
                <option value="D–E">D–E Section (KM 112–128)</option>
              </select>
            </div>
          </div>

          {/* Activity Name & Asset */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Activity Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={activity}
                onChange={(e) => setActivity(e.target.value)}
                placeholder="e.g. Rail Joint Thermit Welding"
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:outline-none focus:border-blue-400"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Asset Identifier <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={asset}
                onChange={(e) => setAsset(e.target.value)}
                placeholder="e.g. Track KM 46.2 Down Line"
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:outline-none focus:border-blue-400"
              />
            </div>
          </div>

          {/* Severity & Safety Critical */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Urgency Severity <span className="text-red-500">*</span>
              </label>
              <select
                value={severity}
                onChange={(e) => setSeverity(e.target.value as Severity)}
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:outline-none focus:border-blue-400"
              >
                <option value="Critical">Critical (Immediate Derailment / Failure Risk)</option>
                <option value="High">High (Impending Speed Restriction)</option>
                <option value="Medium">Medium (Routine Periodic Maintenance)</option>
                <option value="Low">Low (Preventive Inspection)</option>
              </select>
            </div>

            <div className="pt-4">
              <label className="flex items-center gap-3 p-3 rounded-xl border border-slate-200 bg-slate-50 cursor-pointer hover:bg-slate-100 transition-colors">
                <input
                  type="checkbox"
                  checked={safetyCritical}
                  onChange={(e) => setSafetyCritical(e.target.checked)}
                  className="rounded border-slate-300 text-red-600 focus:ring-red-500 w-4 h-4"
                />
                <div>
                  <p className="text-xs font-bold text-slate-800">Safety Critical Activity</p>
                  <p className="text-[10px] text-slate-500">Flags priority escalation in AI Planning queue</p>
                </div>
              </label>
            </div>
          </div>

          {/* Timing: Date, Duration, Preferred Window */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Requested Date <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={requestedDate}
                onChange={(e) => setRequestedDate(e.target.value)}
                placeholder="18 Sep 2026"
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:outline-none focus:border-blue-400 font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Duration <span className="text-red-500">*</span>
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  placeholder="2h 30m"
                  className="w-2/3 px-3 py-2 text-sm border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:outline-none focus:border-blue-400 font-mono"
                />
                <input
                  type="number"
                  value={durationMins}
                  onChange={(e) => {
                    setDurationMins(Number(e.target.value));
                    const h = Math.floor(Number(e.target.value) / 60);
                    const m = Number(e.target.value) % 60;
                    setDuration(`${h}h ${m ? m + 'm' : '00m'}`);
                  }}
                  title="Minutes"
                  placeholder="Mins"
                  className="w-1/3 px-2 py-2 text-xs border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:outline-none font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Preferred Window <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={preferredTime}
                onChange={(e) => setPreferredTime(e.target.value)}
                placeholder="22:00–00:30"
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:outline-none focus:border-blue-400 font-mono"
              />
            </div>
          </div>

          {/* Location & Resources */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Specific Location <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. KM 45.2 to KM 46.8, Up Line"
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:outline-none focus:border-blue-400"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Resources Required (comma-separated)
              </label>
              <input
                type="text"
                value={resourcesInput}
                onChange={(e) => setResourcesInput(e.target.value)}
                placeholder="Track Machine TMC-7, 20 Gang Staff"
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:outline-none focus:border-blue-400"
              />
            </div>
          </div>

          {/* Reason */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Operational Justification / Reason <span className="text-red-500">*</span>
            </label>
            <textarea
              rows={2}
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="e.g. Ultra-sonic rail testing revealed micro-fracture exceeding tolerance limits..."
              className="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:outline-none focus:border-blue-400"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Technical Description & Work Scope
            </label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Detailed scope, equipment staging, gang mobilization details..."
              className="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:outline-none focus:border-blue-400"
            />
          </div>

          {/* Modal Actions */}
          <div className="pt-4 border-t border-slate-100 flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-end gap-2.5 sm:gap-3">
            <button
              type="button"
              onClick={() => setIsNewRequestOpen(false)}
              className="px-5 py-2.5 min-h-[44px] rounded-xl border border-slate-200 text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-colors flex items-center justify-center"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 min-h-[44px] rounded-xl text-sm font-bold text-white hover:opacity-90 transition-opacity shadow-sm flex items-center justify-center gap-2"
              style={{ background: `linear-gradient(135deg, ${NAVY}, ${BLUE})` }}
            >
              <Check size={16} />
              Submit Maintenance Request
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
