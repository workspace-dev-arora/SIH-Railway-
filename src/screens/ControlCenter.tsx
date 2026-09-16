import React from 'react';
import {
  CheckCircle,
  AlertTriangle,
  Clock,
  Train,
  BarChart3,
  ChevronRight,
  Zap,
  ArrowRight,
  Users,
  ShieldCheck,
  TrendingDown,
  GitMerge,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import type { Severity, AIPriority } from '../types';

const NAVY = '#123B66';
const DEEP = '#0B2545';
const SAFFRON = '#F28C28';
const GREEN = '#138A4B';
const BLUE = '#1769AA';

export default function ControlCenter() {
  const {
    user,
    setScreen,
    metrics,
    requests,
    blocks,
    approvedBlocks,
    approveBlock,
    rejectBlock,
    setSelectedRequest,
    setIsBlockModifyOpen,
    setSelectedBlockId,
    division,
  } = useApp();

  const b014 = blocks.find((b) => b.id === 'B014');
  const b014Approved = approvedBlocks.has('B014') || b014?.status === 'approved';

  const primaryKpis = [
    {
      label: 'Pending Requests',
      value: metrics.pendingRequests.toString(),
      sub: `${metrics.criticalRequests} critical`,
      icon: Clock,
      color: BLUE,
      onClick: () => setScreen('requests'),
    },
    {
      label: 'Critical Tasks',
      value: metrics.criticalRequests.toString(),
      sub: metrics.criticalRequests > 0 ? 'Requires immediate window' : 'All critical cleared',
      icon: AlertTriangle,
      color: '#DC2626',
      onClick: () => setScreen('requests'),
    },
    {
      label: 'Blocks Planned',
      value: metrics.plannedBlocks.toString(),
      sub: b014Approved ? 'B014 coordinated' : 'Pending planner approval',
      icon: BarChart3,
      color: NAVY,
      onClick: () => setScreen('planner'),
    },
    {
      label: 'Asset Availability',
      value: `${metrics.assetAvailability}%`,
      sub: '+1.8% vs manual planning',
      icon: CheckCircle,
      color: GREEN,
      onClick: () => setScreen('analytics'),
    },
    {
      label: 'Block Hours Saved',
      value: `${metrics.blockHoursSaved} hrs`,
      sub: 'vs manual isolated windows',
      icon: TrendingDown,
      color: SAFFRON,
      onClick: () => setScreen('analytics'),
    },
    {
      label: 'Train Conflicts',
      value: metrics.trainConflicts.toString(),
      sub: '↓ from 9 (conventional)',
      icon: GitMerge,
      color: '#64748B',
      onClick: () => setScreen('planning'),
    },
  ];

  const corridorSections = [
    {
      from: 'A',
      to: 'B',
      status: b014Approved ? 'maintenance-approved' : 'maintenance-planned',
      label: b014Approved ? 'Block B014 Approved' : 'B014 AI-Recommended',
      color: b014Approved ? GREEN : SAFFRON,
    },
    {
      from: 'B',
      to: 'C',
      status: 'planned',
      label: 'Block B015 Planned',
      color: BLUE,
    },
    {
      from: 'C',
      to: 'D',
      status: 'conflict',
      label: 'Conflict Flagged',
      color: '#DC2626',
    },
    {
      from: 'D',
      to: 'E',
      status: 'available',
      label: 'Clear Track',
      color: GREEN,
    },
  ];

  const criticalList = requests
    .filter((r) => r.severity === 'Critical' || r.aiPriority === 'CRITICAL' || r.status === 'Pending')
    .slice(0, 5);

  return (
    <div className="p-3.5 sm:p-6 space-y-4 sm:space-y-6 max-w-[1400px]">
      {/* ── Greeting ── */}
      <div className="flex items-center justify-between flex-wrap gap-3 sm:gap-4">
        <div>
          <h1 className="text-lg sm:text-xl font-bold" style={{ color: NAVY }}>
            Good Day, {user?.name || user?.employeeId || 'Planner'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5 leading-snug">
            Maintenance & Corridor Operations Overview — {division} · Thursday, 18 September 2026
          </p>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            onClick={() => setScreen('planning')}
            className="w-full sm:w-auto flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold text-white shadow-sm hover:opacity-95 transition-opacity min-h-[44px] cursor-pointer"
            style={{ background: `linear-gradient(135deg, ${DEEP}, ${BLUE})` }}
          >
            <Zap size={14} className="text-amber-300" />
            AI Planning Console
          </button>
        </div>
      </div>

      {/* ── AI Recommendation + Operations Status ── */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* AI Rec card */}
        <div className="xl:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col justify-between">
          <div>
            {/* Top accent */}
            <div
              className="h-1.5 w-full"
              style={{ background: b014Approved ? GREEN : SAFFRON }}
            />
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Zap size={15} style={{ color: b014Approved ? GREEN : SAFFRON }} />
                <span
                  className="text-xs font-bold tracking-widest uppercase"
                  style={{ color: b014Approved ? GREEN : '#64748B' }}
                >
                  {b014Approved ? 'COORDINATED BLOCK APPROVED' : 'AI RECOMMENDED MAINTENANCE BLOCK'}
                </span>
              </div>
              <span
                className="text-xs font-bold px-2.5 py-1 rounded-full font-mono"
                style={
                  b014Approved
                    ? { background: GREEN + '20', color: GREEN }
                    : { background: SAFFRON + '20', color: SAFFRON }
                }
              >
                AI Score: 94 / 100
              </span>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Block details */}
                <div>
                  <div className="flex items-baseline gap-3 mb-1">
                    <span className="text-3xl font-extrabold font-mono" style={{ color: NAVY }}>B014</span>
                    <span className="text-sm font-semibold text-slate-500">Section A–B (KM 45.0 to 48.0)</span>
                  </div>
                  <p className="text-sm text-slate-700 mb-4 font-medium">
                    <span>18 Sep 2026</span>
                    <span className="mx-2 text-slate-300">·</span>
                    <span className="font-mono font-bold" style={{ color: NAVY }}>22:00 – 00:30 (150 mins)</span>
                  </p>

                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2.5">
                    3 Coordinated Cross-Department Activities
                  </p>
                  <div className="space-y-2.5">
                    {[
                      { dept: 'Engineering', activity: 'Track Repair — Rail Fracture (BR-1024)', color: BLUE },
                      { dept: 'Signal & Telecom', activity: 'Signal Inspection & Testing (BR-1025)', color: '#C2410C' },
                      { dept: 'Traction', activity: 'OHE Inspection (BR-1026)', color: GREEN },
                    ].map((item) => (
                      <div key={item.dept} className="flex items-center gap-2.5 bg-slate-50 p-2 rounded-lg border border-slate-100">
                        <div className="w-1.5 h-6 rounded-full flex-shrink-0" style={{ background: item.color }} />
                        <div className="min-w-0">
                          <p className="text-xs font-bold text-slate-800">{item.dept}</p>
                          <p className="text-[11px] text-slate-500 truncate">{item.activity}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* AI reasoning */}
                <div className="flex flex-col justify-between">
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                      AI Optimization Rationale
                    </p>
                    <div className="space-y-2">
                      {[
                        'Critical maintenance requirement (BR-1024 fracture risk)',
                        'Multiple compatible maintenance activities identified',
                        'Unified under single section power & traffic block',
                        'Optimal low-density night traffic window (22:00–00:30)',
                        'Minimal train impact (only 2 freight paths regulated)',
                        'Reduced total block time from 6.0h to 2.5h (saved 3.5h)',
                      ].map((r, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs text-slate-700">
                          <CheckCircle size={13} className="text-emerald-600 flex-shrink-0 mt-0.5" />
                          <span>{r}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 p-2.5 rounded-lg bg-amber-50/70 border border-amber-200 text-[11px] text-amber-800">
                    Decision-Support Advisory: The Railway Block Planner holds complete authority to approve, adjust, or decline.
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Actions Bar */}
          <div className="px-4 sm:px-6 py-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between flex-wrap gap-3">
            {!b014Approved ? (
              <>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 w-full sm:w-auto">
                  <button
                    onClick={() => approveBlock('B014')}
                    className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white hover:opacity-90 transition-opacity shadow-sm cursor-pointer min-h-[44px]"
                    style={{ background: GREEN }}
                  >
                    <CheckCircle size={16} />
                    Approve Block B014
                  </button>

                  <button
                    onClick={() => {
                      setSelectedBlockId('B014');
                      setIsBlockModifyOpen(true);
                    }}
                    className="px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold border-2 hover:bg-white transition-colors cursor-pointer min-h-[44px] text-center"
                    style={{ borderColor: NAVY, color: NAVY }}
                  >
                    Modify Schedule
                  </button>

                  <button
                    onClick={() => rejectBlock('B014')}
                    className="px-4 py-2.5 text-xs sm:text-sm font-semibold text-red-600 hover:bg-red-50 rounded-xl transition-colors cursor-pointer min-h-[44px] text-center"
                  >
                    Reject Block
                  </button>
                </div>

                <button
                  onClick={() => setScreen('planning')}
                  className="text-xs font-bold text-blue-700 hover:underline flex items-center justify-center sm:justify-start gap-1 w-full sm:w-auto mt-1 sm:mt-0 sm:ml-auto cursor-pointer min-h-[36px]"
                >
                  Full AI Pipeline Details <ChevronRight size={13} />
                </button>
              </>
            ) : (
              <div className="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-xs sm:text-sm font-bold" style={{ color: GREEN }}>
                  <ShieldCheck size={18} className="flex-shrink-0" />
                  <span>Block B014 is officially Approved — reflected across Corridor & Analytics.</span>
                </div>
                <button
                  onClick={() => setScreen('corridor')}
                  className="w-full sm:w-auto px-4 py-2.5 text-xs font-bold text-white rounded-xl hover:opacity-90 cursor-pointer min-h-[44px] flex items-center justify-center"
                  style={{ background: NAVY }}
                >
                  View in Corridor
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Today's Operations Card */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold" style={{ color: NAVY }}>Today's Operations</h3>
            <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
              Live Telemetry
            </span>
          </div>

          <div className="space-y-3">
            {[
              { label: 'Delayed Work Orders', value: '1', note: 'BR-1028 (5 days overdue)', color: '#DC2626' },
              { label: 'Upcoming Blocks', value: metrics.plannedBlocks.toString(), note: 'Next 12 hours window', color: NAVY },
              { label: 'Active Blocks', value: metrics.activeBlocks.toString(), note: 'B012 — C–D Section', color: BLUE },
              { label: 'Completed Today', value: metrics.completedBlocks.toString(), note: 'All safety clearances logged', color: GREEN },
            ].map((item) => (
              <div
                key={item.label}
                className="bg-slate-50 rounded-xl px-4 py-3 flex items-center justify-between border border-slate-100"
              >
                <div>
                  <p className="text-xs font-semibold text-slate-700">{item.label}</p>
                  <p className="text-[11px] text-slate-400 mt-0.5 font-medium">{item.note}</p>
                </div>
                <span className="text-2xl font-extrabold" style={{ color: item.color }}>{item.value}</span>
              </div>
            ))}
          </div>

          <div className="pt-2">
            <button
              onClick={() => setScreen('datasources')}
              className="w-full py-2.5 text-xs font-bold rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 transition-colors flex items-center justify-center gap-1.5 cursor-pointer min-h-[44px]"
            >
              Verify Live Feeds (TMS / SMMS / TDMS) <ChevronRight size={13} />
            </button>
          </div>
        </div>
      </div>

      {/* ── KPI Overview (Unified 6 Cards) ── */}
      <div className="space-y-2">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Operational KPI Metrics</h3>
          <span className="text-[11px] text-slate-400 italic">
            Illustrative prototype scenario · Indian Railways Smart Maintenance
          </span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3 sm:gap-4">
          {primaryKpis.map((kpi) => {
            const Icon = kpi.icon;
            return (
              <div
                key={kpi.label}
                onClick={kpi.onClick}
                className="bg-white rounded-2xl p-3.5 sm:p-4.5 border border-slate-200 hover:shadow-md hover:border-slate-300 transition-all cursor-pointer flex flex-col justify-between"
              >
                <div className="flex items-center justify-between mb-2 sm:mb-3">
                  <p className="text-xs font-semibold text-slate-500">{kpi.label}</p>
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: kpi.color + '15' }}
                  >
                    <Icon size={16} style={{ color: kpi.color }} strokeWidth={2.2} />
                  </div>
                </div>
                <div>
                  <p className="text-2xl sm:text-3xl font-extrabold leading-none" style={{ color: kpi.color }}>
                    {kpi.value}
                  </p>
                  <p className="text-[11px] sm:text-xs text-slate-400 mt-1.5 sm:mt-2 font-medium">{kpi.sub}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Corridor Status ── */}
      <div className="bg-white rounded-2xl p-4 sm:p-6 border border-slate-200 shadow-sm">
        <div className="flex items-center justify-between flex-wrap gap-2 mb-4 sm:mb-5">
          <div>
            <h3 className="text-sm font-bold" style={{ color: NAVY }}>Corridor Track Status — {division}</h3>
            <p className="text-xs text-slate-400 mt-0.5">Real-time track block occupancy across stations A to E</p>
          </div>
          <button
            className="text-xs font-bold flex items-center gap-1 text-blue-600 hover:underline min-h-[36px]"
            onClick={() => setScreen('corridor')}
          >
            Open Interactive Corridor View <ChevronRight size={13} />
          </button>
        </div>

        <div className="overflow-x-auto pb-2 -mx-2 px-2">
          <div className="min-w-[620px] flex items-center py-4">
            {['A', 'B', 'C', 'D', 'E'].map((station, i) => (
              <div key={station} className="flex items-center flex-1 last:flex-none">
                <div className="flex flex-col items-center gap-1.5 z-10">
                  <div
                    className="w-4 h-4 rounded-full bg-white border-3 shadow-xs"
                    style={{ borderColor: NAVY }}
                  />
                  <span className="text-xs font-bold font-mono" style={{ color: NAVY }}>Station {station}</span>
                </div>
                {i < 4 && (
                  <div className="flex-1 flex flex-col items-center gap-1 mx-2">
                    <div className="w-full h-1.5 rounded-full" style={{ background: corridorSections[i].color }} />
                    <span
                      className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                      style={{
                        background: corridorSections[i].color + '15',
                        color: corridorSections[i].color,
                      }}
                    >
                      {corridorSections[i].label}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Critical Maintenance Table + Before/After Impact ── */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6">
        {/* Table */}
        <div className="xl:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-4 sm:px-6 py-3.5 sm:py-4 border-b border-slate-100 flex items-center justify-between flex-wrap gap-2">
            <div>
              <h3 className="text-sm font-bold" style={{ color: NAVY }}>Critical & Pending Maintenance Tasks</h3>
              <p className="text-xs text-slate-400 mt-0.5">Click any row to review details or approve directly</p>
            </div>
            <button
              className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1 min-h-[36px]"
              onClick={() => setScreen('requests')}
            >
              View all ({requests.length}) <ChevronRight size={13} />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left min-w-[680px]">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100">
                  {['ID', 'Department', 'Activity', 'Section', 'Severity', 'AI Priority', 'Status'].map((h) => (
                    <th key={h} className="px-4 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {criticalList.map((req) => (
                  <tr
                    key={req.id}
                    onClick={() => setSelectedRequest(req)}
                    className="hover:bg-blue-50/50 cursor-pointer transition-colors"
                  >
                    <td className="px-4 py-3 font-mono font-bold" style={{ color: NAVY }}>{req.id}</td>
                    <td className="px-4 py-3 font-medium text-slate-600 whitespace-nowrap">{req.department}</td>
                    <td className="px-4 py-3 font-semibold text-slate-800 max-w-[180px] truncate">{req.activity}</td>
                    <td className="px-4 py-3 font-mono text-slate-500">{req.section}</td>
                    <td className="px-4 py-3">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-50 text-red-700 border border-red-200">
                        {req.severity}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-amber-500 text-white font-mono">
                        {req.aiPriority}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          req.status === 'Approved'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : 'bg-amber-50 text-amber-700 border border-amber-200'
                        }`}
                      >
                        {req.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Before vs AI Planning card */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold mb-1" style={{ color: NAVY }}>Conventional vs AI Planning Impact</h3>
            <p className="text-xs text-slate-400 mb-4">Central Division corridor simulation efficiency</p>

            <div className="space-y-3">
              {/* Conventional */}
              <div className="rounded-xl p-3.5 bg-slate-50 border border-slate-200">
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">Conventional Manual Planning</p>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Required Separate Blocks:</span>
                    <span className="font-bold text-slate-700">12 blocks</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Total Track Occupation:</span>
                    <span className="font-bold text-slate-700">28 hrs</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Train Schedule Conflicts:</span>
                    <span className="font-bold text-red-600">9 conflicts</span>
                  </div>
                </div>
              </div>

              {/* AI */}
              <div className="rounded-xl p-3.5 bg-emerald-50/70 border border-emerald-200">
                <div className="flex items-center gap-1.5 mb-2">
                  <Zap size={12} className="text-emerald-700" />
                  <p className="text-[10px] font-bold uppercase tracking-widest text-emerald-800">TrackSync AI Coordinated</p>
                </div>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-600">Optimized Coordinated Blocks:</span>
                    <span className="font-bold text-emerald-800">{b014Approved ? '7 blocks (−5)' : '8 blocks (−4)'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Total Block Time Required:</span>
                    <span className="font-bold text-emerald-800">{b014Approved ? '17 hrs (−11 hrs)' : '21 hrs (−7 hrs)'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Train Schedule Conflicts:</span>
                    <span className="font-bold text-emerald-800">{metrics.trainConflicts} conflicts (−6)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-slate-100">
            <button
              onClick={() => setScreen('analytics')}
              className="w-full flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-bold border-2 hover:bg-slate-50 transition-colors min-h-[44px] cursor-pointer"
              style={{ borderColor: NAVY, color: NAVY }}
            >
              Open Full Division Analytics <ArrowRight size={13} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
