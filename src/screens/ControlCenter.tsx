import { CheckCircle, AlertTriangle, Clock, Train, TrendingDown, BarChart3, ChevronRight, Zap, ArrowRight } from 'lucide-react';
import type { Screen } from '../types';
import { requests } from '../data/mockData';

const NAVY  = '#123B66';
const DEEP  = '#0B2545';
const SAFFRON = '#F28C28';
const GREEN   = '#138A4B';
const BLUE    = '#1769AA';

interface Props {
  setScreen: (s: Screen) => void;
  approvedBlocks: Set<string>;
  onApprove: () => void;
  onReject: () => void;
}

const primaryKpis = [
  { label: 'Pending Requests', value: '6',     sub: '2 critical',             icon: Clock,          color: BLUE  },
  { label: 'Critical Tasks',   value: '2',     sub: 'BR-1024, BR-1028',       icon: AlertTriangle,  color: '#DC2626' },
  { label: 'Blocks Planned',   value: '5',     sub: 'This week',              icon: BarChart3,      color: NAVY  },
  { label: 'Asset Availability', value: '94.2%', sub: '+1.8% vs last week',   icon: CheckCircle,    color: GREEN },
];

const secondaryKpis = [
  { label: 'Block Hours Saved', value: '11 hrs', sub: 'vs manual planning', color: SAFFRON },
  { label: 'Train Conflicts',   value: '3',      sub: '↓ from 9 (manual)',  color: '#64748B' },
];

const corridorSections = [
  { from: 'A', to: 'B', status: 'maintenance-planned' as const },
  { from: 'B', to: 'C', status: 'planned' as const },
  { from: 'C', to: 'D', status: 'conflict' as const },
  { from: 'D', to: 'E', status: 'available' as const },
];

const statusColor: Record<string, string> = {
  available:            GREEN,
  'maintenance-planned': SAFFRON,
  planned:              BLUE,
  conflict:             '#DC2626',
};

const statusLabel: Record<string, string> = {
  available:            'Available',
  'maintenance-planned': 'Maintenance Planned',
  planned:              'Planned',
  conflict:             'Conflict',
};

export default function ControlCenter({ setScreen, approvedBlocks, onApprove, onReject }: Props) {
  const b014Approved = approvedBlocks.has('B014');

  return (
    <div className="p-6 space-y-5 max-w-[1400px]">

      {/* ── Greeting ── */}
      <div>
        <h1 className="text-xl font-bold" style={{ color: NAVY }}>
          Good Morning, Planner
        </h1>
        <p className="text-sm text-slate-500 mt-0.5">
          Maintenance and block planning overview — Thursday, 18 September 2026
        </p>
      </div>

      {/* ── Primary KPI row ── */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {primaryKpis.map((kpi) => {
          const Icon = kpi.icon;
          return (
            <div
              key={kpi.label}
              className="bg-white rounded-xl p-4 hover:shadow-md transition-shadow"
              style={{ border: '1px solid #E2E8F0', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}
            >
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs font-medium text-slate-500">{kpi.label}</p>
                <div
                  className="w-7 h-7 rounded-lg flex items-center justify-center"
                  style={{ background: kpi.color + '12' }}
                >
                  <Icon size={14} style={{ color: kpi.color }} strokeWidth={2} />
                </div>
              </div>
              <p className="text-2xl font-bold leading-none" style={{ color: kpi.color }}>{kpi.value}</p>
              <p className="text-xs text-slate-400 mt-1.5">{kpi.sub}</p>
            </div>
          );
        })}
      </div>

      {/* ── Secondary metrics row ── */}
      <div className="flex gap-4 flex-wrap">
        {secondaryKpis.map((m) => (
          <div
            key={m.label}
            className="flex items-center gap-3 bg-white rounded-xl px-4 py-3"
            style={{ border: '1px solid #E2E8F0' }}
          >
            <span className="text-lg font-bold" style={{ color: m.color }}>{m.value}</span>
            <div>
              <p className="text-xs font-medium text-slate-700">{m.label}</p>
              <p className="text-[10px] text-slate-400">{m.sub}</p>
            </div>
          </div>
        ))}
        <span className="text-[10px] text-slate-300 self-center ml-1 italic">
          Illustrative prototype scenario
        </span>
      </div>

      {/* ── AI Recommendation + Ops ── */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">

        {/* AI Rec card */}
        <div
          className="xl:col-span-2 bg-white rounded-xl overflow-hidden"
          style={{ border: '1px solid #E2E8F0', boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}
        >
          {/* Top accent */}
          <div
            className="h-0.5 w-full"
            style={{ background: b014Approved ? GREEN : SAFFRON }}
          />
          <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Zap size={13} style={{ color: b014Approved ? GREEN : SAFFRON }} />
              <span className="text-xs font-bold tracking-widest uppercase" style={{ color: b014Approved ? GREEN : '#64748B' }}>
                {b014Approved ? 'Block Approved' : 'AI Recommendation'}
              </span>
            </div>
          </div>

          <div className="p-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Block details */}
              <div>
                <div className="flex items-baseline gap-3 mb-1">
                  <span className="text-3xl font-bold font-mono" style={{ color: NAVY }}>B014</span>
                  <span className="text-sm text-slate-400">A–B Section</span>
                </div>
                <p className="text-sm text-slate-600 mb-4">
                  <span className="font-semibold">18 Sep 2026</span>
                  <span className="mx-2 text-slate-300">·</span>
                  <span className="font-mono text-sm" style={{ color: NAVY }}>22:00 – 00:30</span>
                </p>

                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  3 coordinated maintenance activities
                </p>
                <div className="space-y-2">
                  {[
                    { dept: 'Engineering',      activity: 'Track Repair — Rail Fracture' },
                    { dept: 'Signal & Telecom', activity: 'Signal Inspection & Testing' },
                    { dept: 'Traction',          activity: 'OHE Inspection' },
                  ].map((item) => (
                    <div key={item.dept} className="flex items-center gap-2.5">
                      <div className="w-1 h-4 rounded-full flex-shrink-0" style={{ background: BLUE + '40' }} />
                      <div>
                        <span className="text-xs font-semibold" style={{ color: NAVY }}>{item.dept}</span>
                        <span className="text-xs text-slate-400 ml-1.5">{item.activity}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* AI reasoning */}
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                  AI Reasoning
                </p>
                <div className="space-y-1.5">
                  {[
                    'Critical maintenance requirement',
                    'Compatible departmental work',
                    'Low train impact window',
                    'Optimal available window',
                    'Reduced total block hours',
                  ].map((r) => (
                    <div key={r} className="flex items-center gap-2 text-sm text-slate-600">
                      <div className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: GREEN }} />
                      {r}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Actions */}
            {!b014Approved ? (
              <div className="flex items-center gap-3 mt-5 pt-4 border-t border-slate-100">
                <button
                  onClick={onApprove}
                  className="flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-bold text-white hover:opacity-90 transition-opacity shadow-sm"
                  style={{ background: `linear-gradient(135deg, ${DEEP}, ${BLUE})` }}
                >
                  Approve Block
                  <CheckCircle size={14} />
                </button>
                <button
                  onClick={() => setScreen('planner')}
                  className="px-5 py-2 rounded-lg text-sm font-semibold border-2 hover:bg-slate-50 transition-colors"
                  style={{ borderColor: NAVY, color: NAVY }}
                >
                  Modify
                </button>
                <button
                  onClick={onReject}
                  className="px-4 py-2 text-sm font-medium text-red-500 hover:text-red-700 transition-colors"
                >
                  Reject
                </button>
                <span className="ml-auto text-[10px] text-slate-300 italic">
                  AI advisory — Planner retains final authority
                </span>
              </div>
            ) : (
              <div className="mt-5 pt-4 border-t border-slate-100 flex items-center gap-2 text-sm font-medium" style={{ color: GREEN }}>
                <CheckCircle size={15} />
                Block B014 approved — reflected in Block Planner and Calendar
              </div>
            )}
          </div>
        </div>

        {/* Today's Operations */}
        <div className="space-y-3">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Today's Operations</p>
          {[
            { label: 'Active Blocks',  value: '1', note: 'B012 — C–D Section',        color: BLUE },
            { label: 'Upcoming Blocks',value: '2', note: 'Next 6 hours',               color: NAVY },
            { label: 'Delayed Work',   value: '1', note: 'BR-1028 (5 days overdue)',   color: '#DC2626' },
            { label: 'Completed Today',value: '3', note: 'On schedule',                color: GREEN },
          ].map((item) => (
            <div
              key={item.label}
              className="bg-white rounded-xl px-4 py-3 flex items-center justify-between hover:shadow-sm transition-shadow"
              style={{ border: '1px solid #E2E8F0' }}
            >
              <div>
                <p className="text-sm font-medium text-slate-700">{item.label}</p>
                <p className="text-xs text-slate-400 mt-0.5">{item.note}</p>
              </div>
              <span className="text-xl font-bold ml-4" style={{ color: item.color }}>{item.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Corridor Status ── */}
      <div
        className="bg-white rounded-xl p-5"
        style={{ border: '1px solid #E2E8F0', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}
      >
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-sm font-semibold" style={{ color: NAVY }}>Corridor Status — Central Division</h3>
          <button
            className="text-xs font-medium flex items-center gap-1 hover:underline"
            style={{ color: BLUE }}
            onClick={() => setScreen('corridor')}
          >
            Full view <ChevronRight size={12} />
          </button>
        </div>
        <div className="flex items-center">
          {['A', 'B', 'C', 'D', 'E'].map((station, i) => (
            <div key={station} className="flex items-center flex-1 last:flex-none">
              <div className="flex flex-col items-center gap-1.5 z-10">
                <div
                  className="w-3.5 h-3.5 rounded-full bg-white border-2"
                  style={{ borderColor: NAVY }}
                />
                <span className="text-xs font-bold font-mono" style={{ color: NAVY }}>{station}</span>
              </div>
              {i < 4 && (
                <div className="flex-1 flex flex-col items-center gap-1 mx-1">
                  <div className="w-full h-1 rounded" style={{ background: statusColor[corridorSections[i].status] }} />
                  <span
                    className="text-[9px] font-medium px-1.5 py-0.5 rounded-full"
                    style={{
                      background: statusColor[corridorSections[i].status] + '18',
                      color: statusColor[corridorSections[i].status],
                    }}
                  >
                    {statusLabel[corridorSections[i].status]}
                  </span>
                  {corridorSections[i].status === 'maintenance-planned' && (
                    <span className="text-[9px] font-mono text-slate-400">B014 · 22:00–00:30</span>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="flex gap-5 mt-4 flex-wrap">
          {Object.entries(statusLabel).map(([k, v]) => (
            <div key={k} className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full" style={{ background: statusColor[k] }} />
              <span className="text-[10px] text-slate-500">{v}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Critical Maintenance + Before/After ── */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">

        {/* Table */}
        <div
          className="xl:col-span-2 bg-white rounded-xl overflow-hidden"
          style={{ border: '1px solid #E2E8F0', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}
        >
          <div className="px-5 py-3.5 border-b border-slate-100 flex items-center justify-between">
            <h3 className="text-sm font-semibold" style={{ color: NAVY }}>Critical Maintenance</h3>
            <button
              className="text-xs font-medium flex items-center gap-1 hover:underline"
              style={{ color: BLUE }}
              onClick={() => setScreen('requests')}
            >
              View all <ChevronRight size={12} />
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr style={{ background: '#F8FAFC' }}>
                  {['ID', 'Dept', 'Activity', 'Section', 'Severity', 'Overdue', 'Priority', 'Status'].map((h) => (
                    <th key={h} className="px-4 py-2.5 text-left text-[10px] font-semibold text-slate-400 uppercase tracking-wider whitespace-nowrap">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {requests.slice(0, 5).map((req) => (
                  <tr
                    key={req.id}
                    className="border-t border-slate-50 hover:bg-blue-50/30 cursor-pointer transition-colors"
                    onClick={() => setScreen('requests')}
                  >
                    <td className="px-4 py-3 font-mono font-semibold text-xs" style={{ color: NAVY }}>{req.id}</td>
                    <td className="px-4 py-3 text-xs text-slate-600 whitespace-nowrap">{req.department.replace('Signal & Telecom', 'S&T')}</td>
                    <td className="px-4 py-3 text-xs text-slate-700 max-w-[150px] truncate">{req.activity}</td>
                    <td className="px-4 py-3 text-xs font-mono text-slate-500">{req.section}</td>
                    <td className="px-4 py-3"><SeverityBadge v={req.severity} /></td>
                    <td className="px-4 py-3 text-xs font-medium text-red-500">{req.overdueDays ? `${req.overdueDays}d` : '—'}</td>
                    <td className="px-4 py-3"><AIPriorityBadge v={req.aiPriority} /></td>
                    <td className="px-4 py-3">
                      <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-amber-50 text-amber-600 border border-amber-100">
                        {req.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Before vs AI */}
        <div
          className="bg-white rounded-xl p-5"
          style={{ border: '1px solid #E2E8F0', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold" style={{ color: NAVY }}>Before vs AI Planning</h3>
          </div>
          <div className="space-y-3">
            {/* Conventional */}
            <div className="rounded-lg p-3.5" style={{ background: '#F8FAFC', border: '1px solid #E2E8F0' }}>
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">Conventional</p>
              {[['Blocks', '12'], ['Block Hours', '28 hrs'], ['Train Conflicts', '9']].map(([l, v]) => (
                <div key={l} className="flex justify-between py-1.5 border-b border-slate-100 last:border-0">
                  <span className="text-xs text-slate-500">{l}</span>
                  <span className="text-xs font-bold text-slate-600">{v}</span>
                </div>
              ))}
            </div>
            {/* AI */}
            <div className="rounded-lg p-3.5" style={{ background: GREEN + '08', border: `1px solid ${GREEN}30` }}>
              <div className="flex items-center gap-1.5 mb-2">
                <Zap size={11} style={{ color: GREEN }} />
                <p className="text-[10px] font-bold uppercase tracking-widest" style={{ color: GREEN }}>TrackSync AI</p>
              </div>
              {[['Blocks', '7', '−5'], ['Block Hours', '17 hrs', '−11 hrs'], ['Train Conflicts', '3', '−6']].map(([l, v, d]) => (
                <div key={l} className="flex justify-between items-center py-1.5 border-b last:border-0" style={{ borderColor: GREEN + '20' }}>
                  <span className="text-xs text-slate-500">{l}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold" style={{ color: NAVY }}>{v}</span>
                    <span className="text-[10px] font-semibold" style={{ color: GREEN }}>{d}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <button
            onClick={() => setScreen('analytics')}
            className="w-full mt-4 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-semibold border-2 hover:bg-slate-50 transition-colors"
            style={{ borderColor: NAVY, color: NAVY }}
          >
            View Full Analytics <ArrowRight size={12} />
          </button>
          <p className="text-[9px] text-slate-300 text-center mt-2 italic">Illustrative prototype scenario</p>
        </div>
      </div>
    </div>
  );
}

function SeverityBadge({ v }: { v: string }) {
  const map: Record<string, string> = {
    Critical: 'bg-red-50 text-red-600 border-red-100',
    High:     'bg-orange-50 text-orange-600 border-orange-100',
    Medium:   'bg-yellow-50 text-yellow-600 border-yellow-100',
    Low:      'bg-slate-50 text-slate-500 border-slate-100',
  };
  return (
    <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full border ${map[v] || map.Low}`}>{v}</span>
  );
}

function AIPriorityBadge({ v }: { v: string }) {
  const map: Record<string, [string, string]> = {
    CRITICAL: ['#FEE2E2', '#DC2626'],
    HIGH:     ['#FED7AA', '#C2410C'],
    MEDIUM:   ['#FEF9C3', '#854D0E'],
    LOW:      ['#F1F5F9', '#64748B'],
  };
  const [bg, color] = map[v] || map.LOW;
  return (
    <span
      className="text-[10px] font-bold px-2 py-0.5 rounded font-mono"
      style={{ background: bg, color }}
    >
      {v}
    </span>
  );
}
