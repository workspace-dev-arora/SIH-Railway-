import React, { useState } from 'react';
import { Search, Filter, Plus, ArrowUpDown, Clock, AlertTriangle, CheckCircle2, X } from 'lucide-react';
import { useApp } from '../context/AppContext';
import type { MaintenanceRequest, Severity, AIPriority, ReqStatus } from '../types';

const NAVY = '#123B66';
const BLUE = '#1769AA';
const GREEN = '#138A4B';

const deptColors: Record<string, { bg: string; text: string }> = {
  Engineering: { bg: '#EFF6FF', text: BLUE },
  'Signal & Telecom': { bg: '#FFF7ED', text: '#C2410C' },
  Traction: { bg: '#F0FDF4', text: '#166534' },
};

function SeverityBadge({ v }: { v: Severity }) {
  const map: Record<Severity, string> = {
    Critical: 'bg-red-50 text-red-700 border border-red-200',
    High: 'bg-orange-50 text-orange-700 border border-orange-200',
    Medium: 'bg-yellow-50 text-yellow-700 border border-yellow-200',
    Low: 'bg-slate-50 text-slate-600 border border-slate-200',
  };
  return <span className={`text-[11px] px-2.5 py-0.5 rounded-full font-semibold ${map[v]}`}>{v}</span>;
}

function AIPriorityBadge({ v }: { v: AIPriority }) {
  const map: Record<AIPriority, string> = {
    CRITICAL: 'bg-red-600 text-white',
    HIGH: 'bg-orange-500 text-white',
    MEDIUM: 'bg-amber-500 text-white',
    LOW: 'bg-slate-400 text-white',
  };
  return (
    <span className={`text-[10px] px-2 py-0.5 rounded font-bold font-mono tracking-wide ${map[v]}`}>
      {v}
    </span>
  );
}

function StatusBadge({ v }: { v: ReqStatus }) {
  const map: Record<ReqStatus, string> = {
    Pending: 'bg-amber-50 text-amber-700 border border-amber-200',
    Approved: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
    'In Progress': 'bg-blue-50 text-blue-700 border border-blue-200',
    Completed: 'bg-slate-100 text-slate-600 border border-slate-200',
    Rejected: 'bg-red-50 text-red-700 border border-red-200',
  };
  return <span className={`text-[11px] px-2.5 py-0.5 rounded-full font-semibold ${map[v]}`}>{v}</span>;
}

export default function MaintenanceRequests() {
  const {
    requests,
    setSelectedRequest,
    setIsNewRequestOpen,
  } = useApp();

  const [search, setSearch] = useState('');
  const [filterDept, setFilterDept] = useState('All');
  const [filterSeverity, setFilterSeverity] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');
  const [sortBy, setSortBy] = useState<'id' | 'severity' | 'date'>('id');

  const filtered = requests
    .filter((r) => {
      const matchSearch =
        !search ||
        r.id.toLowerCase().includes(search.toLowerCase()) ||
        r.activity.toLowerCase().includes(search.toLowerCase()) ||
        r.asset.toLowerCase().includes(search.toLowerCase()) ||
        r.section.toLowerCase().includes(search.toLowerCase());
      const matchDept = filterDept === 'All' || r.department === filterDept;
      const matchSeverity = filterSeverity === 'All' || r.severity === filterSeverity;
      const matchStatus = filterStatus === 'All' || r.status === filterStatus;
      return matchSearch && matchDept && matchSeverity && matchStatus;
    })
    .sort((a, b) => {
      if (sortBy === 'severity') {
        const order: Record<Severity, number> = { Critical: 0, High: 1, Medium: 2, Low: 3 };
        return order[a.severity] - order[b.severity];
      }
      if (sortBy === 'date') {
        return b.requestedDate.localeCompare(a.requestedDate);
      }
      return a.id.localeCompare(b.id);
    });

  return (
    <div className="p-3.5 sm:p-6 max-w-[1400px] space-y-4 sm:space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3 sm:gap-4">
        <div>
          <h1 className="text-lg sm:text-xl font-bold" style={{ color: NAVY }}>
            Maintenance Requisitions
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5 leading-snug">
            Cross-departmental requisitions queue across Central Division corridor ({filtered.length} visible)
          </p>
        </div>

        <button
          onClick={() => setIsNewRequestOpen(true)}
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white hover:opacity-90 transition-opacity shadow-sm cursor-pointer min-h-[44px]"
          style={{ background: NAVY }}
        >
          <Plus size={16} />
          New Maintenance Request
        </button>
      </div>

      {/* Filters Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-3.5 sm:p-4 shadow-sm flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[220px]">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            className="w-full pl-10 pr-4 py-2.5 sm:py-2 text-sm sm:text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-blue-400 bg-slate-50 focus:bg-white transition-colors"
            placeholder="Search by ID, activity, asset, or section..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <X size={13} />
            </button>
          )}
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center gap-1.5 border border-slate-200 rounded-xl px-2.5 py-1.5 bg-slate-50 text-xs">
            <span className="text-slate-400 text-[11px] font-semibold">Dept:</span>
            <select
              className="bg-transparent focus:outline-none font-medium text-slate-700 cursor-pointer"
              value={filterDept}
              onChange={(e) => setFilterDept(e.target.value)}
            >
              <option value="All">All Departments</option>
              <option value="Engineering">Engineering</option>
              <option value="Signal & Telecom">Signal & Telecom</option>
              <option value="Traction">Traction</option>
            </select>
          </div>

          <div className="flex items-center gap-1.5 border border-slate-200 rounded-xl px-2.5 py-1.5 bg-slate-50 text-xs">
            <span className="text-slate-400 text-[11px] font-semibold">Severity:</span>
            <select
              className="bg-transparent focus:outline-none font-medium text-slate-700 cursor-pointer"
              value={filterSeverity}
              onChange={(e) => setFilterSeverity(e.target.value)}
            >
              <option value="All">All Severities</option>
              <option value="Critical">Critical</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>

          <div className="flex items-center gap-1.5 border border-slate-200 rounded-xl px-2.5 py-1.5 bg-slate-50 text-xs">
            <span className="text-slate-400 text-[11px] font-semibold">Status:</span>
            <select
              className="bg-transparent focus:outline-none font-medium text-slate-700 cursor-pointer"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="All">All Statuses</option>
              <option value="Pending">Pending</option>
              <option value="Approved">Approved</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>

          <div className="flex items-center gap-1.5 border border-slate-200 rounded-xl px-2.5 py-1.5 bg-slate-50 text-xs">
            <ArrowUpDown size={12} className="text-slate-400" />
            <span className="text-slate-400 text-[11px] font-semibold">Sort:</span>
            <select
              className="bg-transparent focus:outline-none font-medium text-slate-700 cursor-pointer"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
            >
              <option value="id">Request ID</option>
              <option value="severity">Severity (High to Low)</option>
              <option value="date">Requested Date</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs min-w-[780px]">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200">
                {['Request ID', 'Department', 'Activity Scope', 'Section', 'Target Asset', 'Severity', 'Requested Date', 'Duration', 'AI Priority', 'Status'].map(
                  (h) => (
                    <th key={h} className="px-4 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">
                      {h}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((req) => (
                <tr
                  key={req.id}
                  onClick={() => setSelectedRequest(req)}
                  className="hover:bg-blue-50/50 cursor-pointer transition-colors"
                >
                  <td className="px-4 py-3.5 font-mono font-bold whitespace-nowrap" style={{ color: NAVY }}>
                    {req.id}
                  </td>
                  <td className="px-4 py-3.5 whitespace-nowrap">
                    <span
                      className="px-2.5 py-1 rounded-full font-medium text-[11px]"
                      style={{
                        backgroundColor: (deptColors[req.department] || { bg: '#f1f5f9' }).bg,
                        color: (deptColors[req.department] || { text: '#64748B' }).text,
                      }}
                    >
                      {req.department}
                    </span>
                  </td>
                  <td className="px-4 py-3.5 font-semibold text-slate-800 max-w-[200px] truncate">
                    {req.activity}
                  </td>
                  <td className="px-4 py-3.5 font-mono text-slate-600 whitespace-nowrap font-medium">
                    {req.section}
                  </td>
                  <td className="px-4 py-3.5 text-slate-600 max-w-[150px] truncate font-medium">
                    {req.asset}
                  </td>
                  <td className="px-4 py-3.5 whitespace-nowrap">
                    <SeverityBadge v={req.severity} />
                  </td>
                  <td className="px-4 py-3.5 text-slate-600 whitespace-nowrap font-mono">
                    {req.requestedDate}
                  </td>
                  <td className="px-4 py-3.5 text-slate-600 whitespace-nowrap font-mono">
                    {req.duration}
                  </td>
                  <td className="px-4 py-3.5 whitespace-nowrap">
                    <AIPriorityBadge v={req.aiPriority} />
                  </td>
                  <td className="px-4 py-3.5 whitespace-nowrap">
                    <StatusBadge v={req.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filtered.length === 0 && (
          <div className="py-16 text-center text-slate-400 text-xs">
            No maintenance requests match the selected query or filters.
          </div>
        )}
      </div>
    </div>
  );
}
