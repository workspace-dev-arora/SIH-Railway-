import { useState } from 'react';
import { Info, CheckCircle, X, Train, Users, Clock, Zap } from 'lucide-react';
import type { Screen } from '../types';
import { blocks } from '../data/mockData';

const NAVY = '#123B66';
const SAFFRON = '#F28C28';
const GREEN = '#138A4B';
const BLUE = '#1769AA';

const GANTT_START = 18 * 60; // 18:00
const GANTT_WINDOW = 12 * 60; // 12 hours (18:00 to 06:00)

function timeToMins(h: number, m: number) {
  return h * 60 + m;
}

function ganttPct(mins: number): number {
  return ((mins - GANTT_START) / GANTT_WINDOW) * 100;
}

function ganttWidthPct(durationMins: number): number {
  return (durationMins / GANTT_WINDOW) * 100;
}

// Train movements for the Gantt (simulated)
const trainMovements = [
  { name: '12302 Rajdhani (Up)', startH: 19, startM: 15, durationMins: 45, section: 'A–B' },
  { name: '12301 Rajdhani (Dn)', startH: 20, startM: 30, durationMins: 45, section: 'A–B' },
  { name: '12502 Express (Up)', startH: 21, startM: 10, durationMins: 50, section: 'A–B' },
  { name: '12501 Express (Dn)', startH: 23, startM: 40, durationMins: 50, section: 'A–B' },
  { name: '14312 Passenger (Up)', startH: 1, startM: 20, durationMins: 60, section: 'A–B' },
];

// Fix times that go past midnight by adding 24h offset
function adjustedMins(h: number, m: number) {
  const mins = h * 60 + m;
  return mins < GANTT_START ? mins + 24 * 60 : mins;
}

const blockStatusStyle: Record<string, { bg: string; border: string; text: string; label: string }> = {
  'ai-recommended': { bg: SAFFRON + 'CC', border: SAFFRON, text: '#fff', label: 'AI Recommended' },
  planned: { bg: BLUE + 'CC', border: BLUE, text: '#fff', label: 'Planned' },
  approved: { bg: GREEN + 'CC', border: GREEN, text: '#fff', label: 'Approved' },
  active: { bg: '#7C3AED' + 'CC', border: '#7C3AED', text: '#fff', label: 'Active' },
  completed: { bg: '#94A3B8CC', border: '#94A3B8', text: '#fff', label: 'Completed' },
  conflict: { bg: '#DC2626CC', border: '#DC2626', text: '#fff', label: 'Conflict' },
};

const hourLabels = Array.from({ length: 13 }, (_, i) => {
  const h = (18 + i) % 24;
  return `${String(h).padStart(2, '0')}:00`;
});

interface Props {
  setScreen: (s: Screen) => void;
  approvedBlocks: Set<string>;
  onApprove: () => void;
  onReject: () => void;
}

export default function BlockPlanner({ setScreen, approvedBlocks, onApprove, onReject }: Props) {
  const [selectedBlock, setSelectedBlock] = useState<string | null>('B014');
  const [date, setDate] = useState('2026-09-18');
  const [section, setSection] = useState('A–B');
  const [division, setDivision] = useState('Central Division');

  const b014 = blocks.find((b) => b.id === 'B014')!;
  const isApproved = approvedBlocks.has('B014');

  const rows = [
    { label: 'Train Movement', dept: null },
    { label: 'Engineering', dept: 'Engineering' as const },
    { label: 'Signal & Telecom', dept: 'Signal & Telecom' as const },
    { label: 'Traction', dept: 'Traction' as const },
    { label: 'Available Window', dept: null },
  ];

  return (
    <div className="flex h-full">
      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Filters */}
        <div className="px-6 pt-6 pb-4 border-b border-slate-200 bg-white flex-shrink-0">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-xl font-bold" style={{ color: NAVY }}>
                Block Planner
              </h1>
              <p className="text-xs text-slate-500 mt-0.5">
                AI-assisted scheduling workspace — Planner retains final authority
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <div className="flex items-center gap-2">
              <label className="text-xs text-slate-500 font-medium">Date</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="text-sm border border-slate-200 rounded-lg px-3 py-1.5 focus:outline-none focus:border-blue-400"
              />
            </div>
            {[
              { label: 'Division', value: division, setter: setDivision, opts: ['Central Division', 'Northern Division'] },
              { label: 'Section', value: section, setter: setSection, opts: ['A–B', 'B–C', 'C–D', 'D–E', 'All'] },
            ].map((f) => (
              <div key={f.label} className="flex items-center gap-2">
                <label className="text-xs text-slate-500 font-medium">{f.label}</label>
                <select
                  value={f.value}
                  onChange={(e) => f.setter(e.target.value)}
                  className="text-sm border border-slate-200 rounded-lg px-3 py-1.5 focus:outline-none focus:border-blue-400"
                >
                  {f.opts.map((o) => (
                    <option key={o}>{o}</option>
                  ))}
                </select>
              </div>
            ))}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs text-slate-500 font-medium">Dept</span>
              {['All', 'Engineering', 'Signal & Telecom', 'Traction'].map((d) => (
                <button
                  key={d}
                  className="text-xs px-3 py-1.5 rounded-lg border transition-colors font-medium"
                  style={
                    d === 'All'
                      ? { background: NAVY, color: '#fff', borderColor: NAVY }
                      : { background: 'white', color: '#64748B', borderColor: '#E2E8F0' }
                  }
                >
                  {d}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="px-6 py-2 bg-slate-50 border-b border-slate-200 flex items-center gap-4 flex-shrink-0 flex-wrap">
          {Object.entries(blockStatusStyle).map(([k, v]) => (
            <div key={k} className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-sm" style={{ background: v.bg, border: `1px solid ${v.border}` }} />
              <span className="text-xs text-slate-500">{v.label}</span>
            </div>
          ))}
        </div>

        {/* Gantt */}
        <div className="flex-1 overflow-auto p-6">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            {/* Hour axis */}
            <div className="flex border-b border-slate-200" style={{ paddingLeft: '140px' }}>
              {hourLabels.map((h) => (
                <div key={h} className="flex-1 text-center text-xs text-slate-400 font-mono py-2 border-l border-slate-100 first:border-l-0">
                  {h}
                </div>
              ))}
            </div>

            {/* Rows */}
            {rows.map((row, ri) => (
              <div
                key={row.label}
                className={`flex border-b border-slate-100 last:border-b-0 ${ri % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}`}
                style={{ minHeight: '56px' }}
              >
                {/* Row label */}
                <div
                  className="flex items-center px-4 text-xs font-semibold text-slate-600 flex-shrink-0 border-r border-slate-200"
                  style={{ width: '140px' }}
                >
                  {row.label}
                </div>

                {/* Timeline area */}
                <div className="flex-1 relative gantt-grid" style={{ minHeight: '56px' }}>
                  {/* Train movements row */}
                  {row.dept === null && row.label === 'Train Movement' &&
                    trainMovements.map((tm) => {
                      const startMins = adjustedMins(tm.startH, tm.startM);
                      const left = ganttPct(startMins);
                      const width = ganttWidthPct(tm.durationMins);
                      if (left < 0 || left > 100) return null;
                      return (
                        <div
                          key={tm.name}
                          className="absolute top-1/2 -translate-y-1/2 h-6 rounded flex items-center px-2 overflow-hidden cursor-pointer"
                          style={{
                            left: `${Math.max(0, left)}%`,
                            width: `${width}%`,
                            background: '#1E293B',
                          }}
                          title={tm.name}
                        >
                          <Train size={10} className="text-white/70 mr-1 flex-shrink-0" />
                          <span className="text-[9px] text-white font-mono truncate">{tm.name}</span>
                        </div>
                      );
                    })}

                  {/* Available window */}
                  {row.label === 'Available Window' && (
                    <div
                      className="absolute top-1/2 -translate-y-1/2 h-8 rounded border-2 border-dashed flex items-center px-3"
                      style={{
                        left: `${ganttPct(adjustedMins(21, 0))}%`,
                        width: `${ganttWidthPct(360)}%`,
                        borderColor: GREEN,
                        background: GREEN + '10',
                      }}
                    >
                      <span className="text-xs font-medium" style={{ color: GREEN }}>
                        Maintenance Window: 21:00 – 03:00
                      </span>
                    </div>
                  )}

                  {/* Blocks for each dept row */}
                  {row.dept &&
                    blocks
                      .filter((b) => b.departments.includes(row.dept!) && (section === 'All' || b.section === section))
                      .map((blk) => {
                        const status = approvedBlocks.has(blk.id) ? 'approved' : blk.status;
                        const style = blockStatusStyle[status] || blockStatusStyle.planned;
                        const startMins = adjustedMins(blk.startHour, blk.startMin);
                        const left = ganttPct(startMins);
                        const width = ganttWidthPct(blk.durationMins);
                        return (
                          <div
                            key={blk.id + row.dept}
                            className="absolute top-1/2 -translate-y-1/2 h-10 rounded-lg flex items-center px-3 cursor-pointer hover:opacity-90 transition-opacity shadow-sm"
                            style={{
                              left: `${Math.max(0, left)}%`,
                              width: `${Math.max(4, width)}%`,
                              background: style.bg,
                              border: `2px solid ${style.border}`,
                            }}
                            onClick={() => setSelectedBlock(blk.id)}
                          >
                            <div className="min-w-0">
                              <p className="text-[10px] font-bold text-white font-mono truncate">{blk.id}</p>
                              {blk.status === 'ai-recommended' && (
                                <div className="flex items-center gap-0.5">
                                  <Zap size={8} className="text-white/80" />
                                  <p className="text-[8px] text-white/80">AI Rec.</p>
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Panel */}
      {selectedBlock && (
        <div className="w-[320px] flex-shrink-0 border-l border-slate-200 bg-white flex flex-col overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between" style={{ background: isApproved ? GREEN : NAVY }}>
            <div>
              <p className="font-mono font-bold text-white text-lg">{selectedBlock}</p>
              <p className="text-white/70 text-xs">A–B Section · 18 Sep 2026</p>
            </div>
            <button onClick={() => setSelectedBlock(null)} className="text-white/60 hover:text-white">
              <X size={18} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            <div
              className="rounded-lg p-3 flex items-center gap-2 text-sm font-medium"
              style={isApproved ? { background: GREEN + '15', color: GREEN } : { background: SAFFRON + '15', color: SAFFRON }}
            >
              {isApproved ? <CheckCircle size={14} /> : <Zap size={14} />}
              {isApproved ? 'Block Approved by Planner' : 'AI Recommended Block'}
            </div>

            <div className="space-y-2">
              {[
                { icon: Clock, label: '22:00 – 00:30', sub: '2h 30m duration' },
                { icon: Users, label: '3 Departments', sub: 'Eng · S&T · Traction' },
                { icon: Train, label: 'Low Train Impact', sub: '2 trains rescheduled' },
              ].map(({ icon: Icon, label, sub }) => (
                <div key={label} className="flex items-center gap-3 p-3 rounded-lg bg-slate-50">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: NAVY + '12' }}>
                    <Icon size={14} style={{ color: NAVY }} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-700">{label}</p>
                    <p className="text-xs text-slate-400">{sub}</p>
                  </div>
                </div>
              ))}
            </div>

            <div>
              <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Why Recommended?</h4>
              <div className="space-y-1.5">
                {[
                  { label: 'Maintenance Priority', value: 'Critical', color: '#DC2626' },
                  { label: 'Asset Criticality', value: 'High', color: '#EA580C' },
                  { label: 'Train Impact', value: 'Low ↓', color: GREEN },
                  { label: 'Window Quality', value: 'Optimal', color: GREEN },
                  { label: 'Dept Coordination', value: '3 Depts', color: NAVY },
                  { label: 'Block Utilization', value: '94%', color: BLUE },
                ].map((m) => (
                  <div key={m.label} className="flex justify-between py-1.5 border-b border-slate-50">
                    <span className="text-xs text-slate-500">{m.label}</span>
                    <span className="text-xs font-bold" style={{ color: m.color }}>
                      {m.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Activities in Block</h4>
              {['Track Repair (Engg)', 'Signal Inspection (S&T)', 'OHE Inspection (Traction)'].map((a) => (
                <div key={a} className="flex items-center gap-2 py-1.5 border-b border-slate-50">
                  <div className="w-1.5 h-1.5 rounded-full" style={{ background: NAVY }} />
                  <span className="text-xs text-slate-600">{a}</span>
                </div>
              ))}
            </div>

            <div className="text-xs text-slate-400 italic p-3 bg-slate-50 rounded-lg">
              AI recommendation is advisory. Planner retains final approval authority.
            </div>
          </div>

          {!isApproved && (
            <div className="p-4 border-t border-slate-100 space-y-2">
              <button
                onClick={onApprove}
                className="w-full py-2.5 rounded-lg text-white font-bold text-sm hover:opacity-90 transition-opacity"
                style={{ background: GREEN }}
              >
                APPROVE
              </button>
              <div className="flex gap-2">
                <button
                  className="flex-1 py-2 rounded-lg text-sm font-semibold border-2 hover:bg-slate-50 transition-colors"
                  style={{ borderColor: NAVY, color: NAVY }}
                >
                  MODIFY
                </button>
                <button
                  onClick={onReject}
                  className="flex-1 py-2 rounded-lg text-sm font-semibold border border-red-200 text-red-600 hover:bg-red-50 transition-colors"
                >
                  REJECT
                </button>
              </div>
            </div>
          )}
          {isApproved && (
            <div className="p-4 border-t border-slate-100">
              <div className="flex items-center gap-2 text-sm font-medium justify-center" style={{ color: GREEN }}>
                <CheckCircle size={16} />
                Approved — reflected in Calendar & Corridor View
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
