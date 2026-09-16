import React, { useState } from 'react';
import { Train, Zap, Edit3 } from 'lucide-react';
import { useApp } from '../context/AppContext';
import type { Screen, Department } from '../types';

const NAVY = '#123B66';
const SAFFRON = '#F28C28';
const GREEN = '#138A4B';
const BLUE = '#1769AA';

const GANTT_START = 18 * 60; // 18:00
const GANTT_WINDOW = 12 * 60; // 12 hours (18:00 to 06:00)

function ganttPct(mins: number): number {
  return ((mins - GANTT_START) / GANTT_WINDOW) * 100;
}

function ganttWidthPct(durationMins: number): number {
  return (durationMins / GANTT_WINDOW) * 100;
}

const trainMovements = [
  { name: '12302 Rajdhani (Up)', startH: 19, startM: 15, durationMins: 45, section: 'A–B' },
  { name: '12301 Rajdhani (Dn)', startH: 20, startM: 30, durationMins: 45, section: 'A–B' },
  { name: '12502 Express (Up)', startH: 21, startM: 10, durationMins: 50, section: 'A–B' },
  { name: '12501 Express (Dn)', startH: 23, startM: 40, durationMins: 50, section: 'A–B' },
  { name: '14312 Passenger (Up)', startH: 1, startM: 20, durationMins: 60, section: 'A–B' },
];

function adjustedMins(h: number, m: number) {
  const mins = h * 60 + m;
  return mins < GANTT_START ? mins + 24 * 60 : mins;
}

const blockStatusStyle: Record<string, { bg: string; border: string; text: string; label: string }> = {
  'ai-recommended': { bg: SAFFRON + 'E6', border: SAFFRON, text: '#fff', label: 'AI Recommended' },
  planned: { bg: BLUE + 'E6', border: BLUE, text: '#fff', label: 'Planned' },
  approved: { bg: GREEN + 'E6', border: GREEN, text: '#fff', label: 'Approved' },
  active: { bg: '#7C3AEDE6', border: '#7C3AED', text: '#fff', label: 'Active' },
  completed: { bg: '#94A3B8E6', border: '#94A3B8', text: '#fff', label: 'Completed' },
  conflict: { bg: '#DC2626E6', border: '#DC2626', text: '#fff', label: 'Conflict' },
  rejected: { bg: '#991B1BE6', border: '#991B1B', text: '#fff', label: 'Rejected' },
};

const hourLabels = Array.from({ length: 13 }, (_, i) => {
  const h = (18 + i) % 24;
  return `${String(h).padStart(2, '0')}:00`;
});

export default function BlockPlanner() {
  const {
    blocks,
    selectedBlockId,
    setSelectedBlockId,
    setIsBlockModifyOpen,
    division,
    setDivision,
  } = useApp();

  const [date, setDate] = useState('2026-09-18');
  const [section, setSection] = useState('All');
  const [selectedDept, setSelectedDept] = useState('All');

  const selectedBlock = blocks.find((b) => b.id === selectedBlockId) || blocks[0];

  const rows = [
    { label: 'Train Movements', dept: null },
    { label: 'Engineering (Track)', dept: 'Engineering' as Department },
    { label: 'Signal & Telecom', dept: 'Signal & Telecom' as Department },
    { label: 'Traction Power', dept: 'Traction' as Department },
    { label: 'Corridor Slot Windows', dept: null },
  ];

  return (
    <div className="flex h-full overflow-hidden">
      {/* Main Gantt Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Controls Toolbar */}
        <div className="px-4 sm:px-6 pt-4 sm:pt-5 pb-3 sm:pb-4 border-b border-slate-200 bg-white flex-shrink-0 space-y-3">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div>
              <h1 className="text-lg sm:text-xl font-bold" style={{ color: NAVY }}>
                Corridor Block Planner & Gantt Workspace
              </h1>
              <p className="text-xs text-slate-500 mt-0.5 leading-snug">
                Inspect cross-department maintenance windows, train schedules, and spatial possessions
              </p>
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                onClick={() => setIsBlockModifyOpen(true)}
                className="w-full sm:w-auto flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold border-2 hover:bg-slate-50 transition-colors min-h-[44px] cursor-pointer"
                style={{ borderColor: NAVY, color: NAVY }}
              >
                <Edit3 size={13} />
                Modify Selected Block ({selectedBlock?.id})
              </button>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-1">
            <div className="flex items-center gap-2 border border-slate-200 rounded-xl px-3 py-1.5 bg-slate-50 text-xs">
              <label className="text-slate-400 font-semibold text-[11px]">Date:</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="bg-transparent focus:outline-none font-mono text-slate-700 font-medium"
              />
            </div>

            <div className="flex items-center gap-2 border border-slate-200 rounded-xl px-3 py-1.5 bg-slate-50 text-xs">
              <label className="text-slate-400 font-semibold text-[11px]">Division:</label>
              <select
                value={division}
                onChange={(e) => setDivision(e.target.value as any)}
                className="bg-transparent focus:outline-none text-slate-700 font-medium"
              >
                <option value="Central Division">Central Division</option>
                <option value="Northern Division">Northern Division</option>
                <option value="Western Division">Western Division</option>
                <option value="Southern Division">Southern Division</option>
                <option value="Eastern Division">Eastern Division</option>
              </select>
            </div>

            <div className="flex items-center gap-2 border border-slate-200 rounded-xl px-3 py-1.5 bg-slate-50 text-xs">
              <label className="text-slate-400 font-semibold text-[11px]">Section:</label>
              <select
                value={section}
                onChange={(e) => setSection(e.target.value)}
                className="bg-transparent focus:outline-none font-mono text-slate-700 font-medium"
              >
                <option value="All">All Sections (A to E)</option>
                <option value="A–B">A–B Section</option>
                <option value="B–C">B–C Section</option>
                <option value="C–D">C–D Section</option>
                <option value="D–E">D–E Section</option>
              </select>
            </div>

            <div className="flex items-center gap-1.5 ml-auto">
              <span className="text-[11px] text-slate-400 font-semibold mr-1">Dept Filter:</span>
              {['All', 'Engineering', 'Signal & Telecom', 'Traction'].map((d) => (
                <button
                  key={d}
                  onClick={() => setSelectedDept(d)}
                  className="text-xs px-3 py-1 rounded-lg border transition-colors font-medium cursor-pointer"
                  style={
                    selectedDept === d
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
              <span className="text-[11px] text-slate-600 font-medium capitalize">{v.label}</span>
            </div>
          ))}
        </div>

        {/* Gantt Timeline */}
        <div className="flex-1 overflow-auto p-3.5 sm:p-6">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden min-w-[760px]">
            {/* Axis */}
            <div className="flex border-b border-slate-200" style={{ paddingLeft: '160px' }}>
              {hourLabels.map((h) => (
                <div key={h} className="flex-1 text-center text-xs text-slate-400 font-mono py-2.5 border-l border-slate-100 first:border-l-0">
                  {h}
                </div>
              ))}
            </div>

            {/* Rows */}
            {rows.map((row, ri) => (
              <div
                key={row.label}
                className={`flex border-b border-slate-100 last:border-b-0 ${ri % 2 === 0 ? 'bg-white' : 'bg-slate-50/40'}`}
                style={{ minHeight: '60px' }}
              >
                {/* Row Header */}
                <div
                  className="flex items-center px-4 text-xs font-bold text-slate-700 flex-shrink-0 border-r border-slate-200 bg-slate-50/50"
                  style={{ width: '160px' }}
                >
                  {row.label}
                </div>

                {/* Timeline Grid */}
                <div className="flex-1 relative gantt-grid" style={{ minHeight: '60px' }}>
                  {/* Train movements */}
                  {row.dept === null && row.label === 'Train Movements' &&
                    trainMovements.map((tm) => {
                      const startMins = adjustedMins(tm.startH, tm.startM);
                      const left = ganttPct(startMins);
                      const width = ganttWidthPct(tm.durationMins);
                      if (left < 0 || left > 100) return null;
                      return (
                        <div
                          key={tm.name}
                          className="absolute top-1/2 -translate-y-1/2 h-7 rounded-lg flex items-center px-2.5 overflow-hidden shadow-xs cursor-pointer hover:opacity-90 transition-opacity"
                          style={{
                            left: `${Math.max(0, left)}%`,
                            width: `${width}%`,
                            background: '#1E293B',
                          }}
                          title={`${tm.name} (${tm.section})`}
                        >
                          <Train size={12} className="text-white/80 mr-1.5 flex-shrink-0" />
                          <span className="text-[10px] text-white font-mono truncate">{tm.name}</span>
                        </div>
                      );
                    })}

                  {/* Available window */}
                  {row.label === 'Corridor Slot Windows' && (
                    <div
                      className="absolute top-1/2 -translate-y-1/2 h-9 rounded-xl border-2 border-dashed flex items-center px-3"
                      style={{
                        left: `${ganttPct(adjustedMins(21, 0))}%`,
                        width: `${ganttWidthPct(360)}%`,
                        borderColor: GREEN,
                        background: GREEN + '10',
                      }}
                    >
                      <span className="text-xs font-bold font-mono" style={{ color: GREEN }}>
                        Optimized Window: 21:00 – 03:00 (A–B Corridor Segment)
                      </span>
                    </div>
                  )}

                  {/* Department Blocks */}
                  {row.dept &&
                    (selectedDept === 'All' || selectedDept === row.dept) &&
                    blocks
                      .filter((b) => b.departments.includes(row.dept!) && (section === 'All' || b.section === section))
                      .map((blk) => {
                        const isSelected = selectedBlock?.id === blk.id;
                        const status = blk.status;
                        const style = blockStatusStyle[status] || blockStatusStyle.planned;
                        const startMins = adjustedMins(blk.startHour, blk.startMin);
                        const left = ganttPct(startMins);
                        const width = ganttWidthPct(blk.durationMins);

                        return (
                          <div
                            key={blk.id + row.dept}
                            className={`absolute top-1/2 -translate-y-1/2 h-11 rounded-xl flex items-center px-3 cursor-pointer hover:opacity-95 transition-all shadow-sm ${
                              isSelected ? 'ring-3 ring-blue-500 ring-offset-1' : ''
                            }`}
                            style={{
                              left: `${Math.max(0, left)}%`,
                              width: `${Math.max(4, width)}%`,
                              background: style.bg,
                              border: `2px solid ${style.border}`,
                            }}
                            onClick={() => setSelectedBlockId(blk.id)}
                          >
                            <div className="min-w-0">
                              <p className="text-[10px] font-bold text-white font-mono truncate">{blk.id} ({blk.section})</p>
                              <div className="flex items-center gap-1">
                                {blk.status === 'ai-recommended' && <Zap size={8} className="text-white" />}
                                <p className="text-[9px] text-white/90 truncate">{style.label}</p>
                              </div>
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

    </div>
  );
}
