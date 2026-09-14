import { useState } from 'react';
import { Search, Filter, X, AlertTriangle, CheckCircle, Clock } from 'lucide-react';
import { requests } from '../data/mockData';
import type { MaintenanceRequest } from '../types';

const NAVY = '#123B66';
const SAFFRON = '#F28C28';
const GREEN = '#138A4B';
const BLUE = '#1769AA';

const deptColors: Record<string, { bg: string; text: string }> = {
  Engineering: { bg: '#EFF6FF', text: BLUE },
  'Signal & Telecom': { bg: '#FFF7ED', text: '#C2410C' },
  Traction: { bg: '#F0FDF4', text: '#166534' },
};

function SeverityBadge({ v }: { v: string }) {
  const map: Record<string, string> = {
    Critical: 'bg-red-100 text-red-700',
    High: 'bg-orange-100 text-orange-700',
    Medium: 'bg-yellow-100 text-yellow-700',
    Low: 'bg-slate-100 text-slate-600',
  };
  return <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${map[v] || ''}`}>{v}</span>;
}

function AIPriorityBadge({ v }: { v: string }) {
  const map: Record<string, string> = {
    CRITICAL: 'bg-red-600 text-white',
    HIGH: 'bg-orange-500 text-white',
    MEDIUM: 'bg-yellow-500 text-white',
    LOW: 'bg-slate-400 text-white',
  };
  return (
    <span className={`text-[10px] px-2 py-0.5 rounded font-bold font-mono tracking-wide ${map[v] || ''}`}>{v}</span>
  );
}

function StatusBadge({ v }: { v: string }) {
  const map: Record<string, string> = {
    Pending: 'bg-amber-100 text-amber-700',
    Approved: 'bg-green-100 text-green-700',
    'In Progress': 'bg-blue-100 text-blue-700',
    Completed: 'bg-slate-100 text-slate-600',
    Rejected: 'bg-red-100 text-red-700',
  };
  return <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${map[v] || ''}`}>{v}</span>;
}

const aiReasons: Record<string, string[]> = {
  'BR-1024': ['Critical asset — track fracture', 'Overdue by 3 days', 'High derailment risk', 'Moderate train impact'],
  'BR-1025': ['Intermittent signal failures detected', 'Safety critical asset', 'Compatible with A–B Engineering block'],
  'BR-1026': ['Routine inspection overdue', 'Can be coordinated with B014', 'Low standalone train impact'],
  'BR-1027': ['Speed restriction active', 'Medium asset criticality', 'Low train impact window available'],
  'BR-1028': ['Cable fault — 5 days overdue', 'Section on degraded working', 'High failure risk if delayed further'],
  'BR-1029': ['Biannual inspection due', 'Medium criticality', 'Low train impact'],
};

export default function MaintenanceRequests() {
  const [selected, setSelected] = useState<MaintenanceRequest | null>(null);
  const [search, setSearch] = useState('');
  const [filterDept, setFilterDept] = useState('All');
  const [filterSeverity, setFilterSeverity] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');

  const filtered = requests.filter((r) => {
    const matchSearch =
      !search ||
      r.id.toLowerCase().includes(search.toLowerCase()) ||
      r.activity.toLowerCase().includes(search.toLowerCase());
    const matchDept = filterDept === 'All' || r.department === filterDept;
    const matchSeverity = filterSeverity === 'All' || r.severity === filterSeverity;
    const matchStatus = filterStatus === 'All' || r.status === filterStatus;
    return matchSearch && matchDept && matchSeverity && matchStatus;
  });

  return (
    <div className="flex h-full">
      {/* Main Table */}
      <div className="flex-1 flex flex-col min-w-0 p-6 overflow-auto">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h1 className="text-xl font-bold" style={{ color: NAVY }}>
              Maintenance Requests
            </h1>
            <p className="text-sm text-slate-500 mt-0.5">{filtered.length} requests</p>
          </div>
          <button
            className="text-sm font-semibold px-4 py-2 rounded-lg text-white hover:opacity-90 transition-opacity"
            style={{ background: NAVY }}
          >
            + New Request
          </button>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 mb-4 flex flex-wrap gap-3 shadow-sm">
          <div className="relative flex-1 min-w-[200px]">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              className="w-full pl-9 pr-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-blue-400 bg-slate-50"
              placeholder="Search requests..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          {[
            { label: 'Department', value: filterDept, setter: setFilterDept, options: ['All', 'Engineering', 'Signal & Telecom', 'Traction'] },
            { label: 'Priority', value: filterSeverity, setter: setFilterSeverity, options: ['All', 'Critical', 'High', 'Medium', 'Low'] },
            { label: 'Status', value: filterStatus, setter: setFilterStatus, options: ['All', 'Pending', 'Approved', 'In Progress', 'Completed'] },
          ].map((f) => (
            <div key={f.label} className="flex items-center gap-2">
              <Filter size={13} className="text-slate-400" />
              <select
                className="text-sm border border-slate-200 rounded-lg px-3 py-2 bg-white focus:outline-none focus:border-blue-400"
                value={f.value}
                onChange={(e) => f.setter(e.target.value)}
              >
                {f.options.map((o) => (
                  <option key={o}>{o}</option>
                ))}
              </select>
            </div>
          ))}
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  {['Request ID', 'Department', 'Activity', 'Section', 'Asset', 'Severity', 'Req. Date', 'Duration', 'AI Priority', 'Status'].map(
                    (h) => (
                      <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-slate-500 whitespace-nowrap">
                        {h}
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody>
                {filtered.map((req) => (
                  <tr
                    key={req.id}
                    className={`border-t border-slate-50 cursor-pointer transition-colors hover:bg-blue-50/50 ${selected?.id === req.id ? 'bg-blue-50' : ''}`}
                    onClick={() => setSelected(req)}
                  >
                    <td className="px-4 py-3 font-mono font-semibold text-xs" style={{ color: NAVY }}>
                      {req.id}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className="text-xs font-medium px-2 py-0.5 rounded-full"
                        style={{ backgroundColor: (deptColors[req.department] || { bg: '#f1f5f9' }).bg, color: (deptColors[req.department] || { text: '#64748B' }).text }}
                      >
                        {req.department}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-xs text-slate-700 max-w-[180px] truncate">{req.activity}</td>
                    <td className="px-4 py-3 text-xs font-mono text-slate-600">{req.section}</td>
                    <td className="px-4 py-3 text-xs text-slate-600 max-w-[140px] truncate">{req.asset}</td>
                    <td className="px-4 py-3">
                      <SeverityBadge v={req.severity} />
                    </td>
                    <td className="px-4 py-3 text-xs text-slate-600 whitespace-nowrap">{req.requestedDate}</td>
                    <td className="px-4 py-3 text-xs font-mono text-slate-600">{req.duration}</td>
                    <td className="px-4 py-3">
                      <AIPriorityBadge v={req.aiPriority} />
                    </td>
                    <td className="px-4 py-3">
                      <StatusBadge v={req.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filtered.length === 0 && (
            <div className="py-16 text-center text-slate-400 text-sm">No requests match your filters</div>
          )}
        </div>
      </div>

      {/* Side Panel */}
      {selected && (
        <div className="w-[360px] flex-shrink-0 border-l border-slate-200 bg-white flex flex-col overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between" style={{ background: NAVY }}>
            <div>
              <p className="font-mono font-bold text-white">{selected.id}</p>
              <p className="text-white/70 text-xs mt-0.5">{selected.department}</p>
            </div>
            <button onClick={() => setSelected(null)} className="text-white/60 hover:text-white p-1">
              <X size={18} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-5 space-y-5">
            {/* AI Priority Banner */}
            <div
              className="rounded-xl p-4"
              style={{
                background:
                  selected.aiPriority === 'CRITICAL' || selected.aiPriority === 'HIGH' ? '#FEF2F2' : '#F0FDF4',
                borderLeft: `4px solid ${selected.aiPriority === 'CRITICAL' ? '#DC2626' : selected.aiPriority === 'HIGH' ? '#EA580C' : GREEN}`,
              }}
            >
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle
                  size={14}
                  style={{ color: selected.aiPriority === 'CRITICAL' ? '#DC2626' : '#EA580C' }}
                />
                <span className="text-xs font-bold uppercase tracking-wider text-slate-600">AI Priority</span>
                <AIPriorityBadge v={selected.aiPriority} />
              </div>
              <p className="text-xs font-semibold text-slate-600 mb-1.5">AI Analysis:</p>
              <ul className="space-y-1">
                {(aiReasons[selected.id] || []).map((r) => (
                  <li key={r} className="flex items-start gap-1.5 text-xs text-slate-600">
                    <div className="w-1 h-1 rounded-full bg-slate-400 mt-1.5 flex-shrink-0" />
                    {r}
                  </li>
                ))}
              </ul>
            </div>

            {/* Details */}
            <div className="space-y-3">
              <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Request Details</h3>
              {[
                { label: 'Activity', value: selected.activity },
                { label: 'Section', value: selected.section },
                { label: 'Location', value: selected.location },
                { label: 'Asset', value: selected.asset },
                { label: 'Severity', value: selected.severity },
                { label: 'Safety Critical', value: selected.safetyCritical ? 'Yes' : 'No' },
                { label: 'Overdue', value: selected.overdueDays ? `${selected.overdueDays} days` : 'Not overdue' },
                { label: 'Requested Date', value: selected.requestedDate },
                { label: 'Preferred Time', value: selected.preferredTime },
                { label: 'Duration', value: selected.duration },
              ].map((f) => (
                <div key={f.label} className="flex justify-between py-1.5 border-b border-slate-50">
                  <span className="text-xs text-slate-500">{f.label}</span>
                  <span
                    className={`text-xs font-medium text-right max-w-[200px] ${f.label === 'Safety Critical' && selected.safetyCritical ? 'text-red-600' : 'text-slate-700'}`}
                  >
                    {f.value}
                  </span>
                </div>
              ))}
            </div>

            {/* Resources */}
            <div>
              <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Resources Required</h3>
              <div className="flex flex-wrap gap-1.5">
                {selected.resources.map((r) => (
                  <span key={r} className="text-xs px-2.5 py-1 rounded-full bg-slate-100 text-slate-600">
                    {r}
                  </span>
                ))}
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Description</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{selected.description}</p>
            </div>

            {/* Coordination */}
            {selected.section === 'A–B' && (
              <div className="rounded-lg p-3" style={{ background: SAFFRON + '15', border: `1px solid ${SAFFRON}40` }}>
                <div className="flex items-center gap-2 mb-1">
                  <CheckCircle size={13} style={{ color: SAFFRON }} />
                  <span className="text-xs font-semibold" style={{ color: SAFFRON }}>
                    Coordination Opportunity
                  </span>
                </div>
                <p className="text-xs text-slate-600">
                  This request can be coordinated with Block B014. AI recommends combining with{' '}
                  {selected.department === 'Engineering' ? 'Signal & Telecom and Traction' : 'Engineering and other departments'}{' '}
                  for A–B section on 18 Sep.
                </p>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="p-4 border-t border-slate-100 flex gap-2">
            <button
              className="flex-1 py-2 text-sm font-semibold rounded-lg text-white hover:opacity-90 transition-opacity"
              style={{ background: GREEN }}
            >
              Approve
            </button>
            <button
              className="flex-1 py-2 text-sm font-semibold rounded-lg border hover:bg-slate-50 transition-colors"
              style={{ borderColor: NAVY, color: NAVY }}
            >
              Assign
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
