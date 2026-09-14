import { useState } from 'react';
import { ChevronLeft, ChevronRight, Clock, Zap, CheckCircle } from 'lucide-react';
import { blocks } from '../data/mockData';

const NAVY = '#123B66';
const SAFFRON = '#F28C28';
const GREEN = '#138A4B';
const BLUE = '#1769AA';

const monthDays = [
  { date: 1, day: 'Tue' }, { date: 2, day: 'Wed' }, { date: 3, day: 'Thu' },
  { date: 4, day: 'Fri' }, { date: 5, day: 'Sat' }, { date: 6, day: 'Sun' },
  { date: 7, day: 'Mon' }, { date: 8, day: 'Tue' }, { date: 9, day: 'Wed' },
  { date: 10, day: 'Thu' }, { date: 11, day: 'Fri' }, { date: 12, day: 'Sat' },
  { date: 13, day: 'Sun' }, { date: 14, day: 'Mon' }, { date: 15, day: 'Tue' },
  { date: 16, day: 'Wed' }, { date: 17, day: 'Thu' }, { date: 18, day: 'Fri' },
  { date: 19, day: 'Sat' }, { date: 20, day: 'Sun' }, { date: 21, day: 'Mon' },
  { date: 22, day: 'Tue' }, { date: 23, day: 'Wed' }, { date: 24, day: 'Thu' },
  { date: 25, day: 'Fri' }, { date: 26, day: 'Sat' }, { date: 27, day: 'Sun' },
  { date: 28, day: 'Mon' }, { date: 29, day: 'Tue' }, { date: 30, day: 'Wed' },
];

// Map blocks to dates (by day of month from "18 Sep 2026" etc.)
const blocksByDate: Record<number, typeof blocks> = {
  16: blocks.filter((b) => b.date.startsWith('16')),
  17: blocks.filter((b) => b.date.startsWith('17')),
  18: blocks.filter((b) => b.date.startsWith('18')),
  19: blocks.filter((b) => b.date.startsWith('19')),
};

const blockStatusColor: Record<string, string> = {
  'ai-recommended': SAFFRON,
  planned: BLUE,
  approved: GREEN,
  completed: '#94A3B8',
  active: '#7C3AED',
  conflict: '#DC2626',
};

const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const weekHours = Array.from({ length: 8 }, (_, i) => `${String(18 + i).padStart(2, '0')}:00`);

interface Props {
  approvedBlocks: Set<string>;
}

export default function CalendarView({ approvedBlocks }: Props) {
  const [view, setView] = useState<'weekly' | 'monthly'>('monthly');
  const [selectedDay, setSelectedDay] = useState<number | null>(18);

  const selectedBlocks = selectedDay ? blocksByDate[selectedDay] || [] : [];

  return (
    <div className="p-6 max-w-[1300px]">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h1 className="text-xl font-bold" style={{ color: NAVY }}>
            Block Calendar
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">September 2026 — Central Division</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex rounded-lg border border-slate-200 overflow-hidden">
            {(['weekly', 'monthly'] as const).map((v) => (
              <button
                key={v}
                onClick={() => setView(v)}
                className="px-4 py-2 text-sm font-medium capitalize transition-colors"
                style={view === v ? { background: NAVY, color: '#fff' } : { background: '#fff', color: '#64748B' }}
              >
                {v}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-1">
            <button className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors">
              <ChevronLeft size={16} className="text-slate-500" />
            </button>
            <span className="text-sm font-semibold px-3" style={{ color: NAVY }}>
              September 2026
            </span>
            <button className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors">
              <ChevronRight size={16} className="text-slate-500" />
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        {/* Calendar */}
        <div className="xl:col-span-3">
          {view === 'monthly' ? (
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
              {/* Day headers */}
              <div className="grid grid-cols-7 border-b border-slate-200">
                {weekDays.map((d) => (
                  <div key={d} className="py-3 text-center text-xs font-semibold text-slate-500 bg-slate-50">
                    {d}
                  </div>
                ))}
              </div>
              {/* Empty cells for first week offset (Sep 2026 starts on Tue) */}
              <div className="grid grid-cols-7">
                {/* Pad: Sep 1 is Tuesday = 1 empty Mon cell */}
                <div className="border-r border-b border-slate-100 min-h-[90px] bg-slate-50/50" />
                {monthDays.map(({ date, day }, idx) => {
                  const dayBlocks = blocksByDate[date] || [];
                  const isToday = date === 18;
                  const isSelected = selectedDay === date;
                  return (
                    <div
                      key={date}
                      className={`border-r border-b border-slate-100 min-h-[90px] p-1.5 cursor-pointer transition-colors ${isSelected ? 'bg-blue-50' : 'hover:bg-slate-50'} ${(idx + 1) % 7 === 0 ? 'border-r-0' : ''}`}
                      onClick={() => setSelectedDay(date)}
                    >
                      <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center text-sm font-semibold mb-1 ${isToday ? 'text-white' : 'text-slate-600'}`}
                        style={isToday ? { background: NAVY } : {}}
                      >
                        {date}
                      </div>
                      <div className="space-y-0.5">
                        {dayBlocks.map((blk) => {
                          const status = approvedBlocks.has(blk.id) ? 'approved' : blk.status;
                          return (
                            <div
                              key={blk.id}
                              className="text-[9px] font-bold px-1.5 py-0.5 rounded truncate text-white font-mono"
                              style={{ background: blockStatusColor[status] }}
                            >
                              {blk.id} {blk.section}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            /* Weekly View */
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="grid grid-cols-8 border-b border-slate-200">
                <div className="py-3 px-4 text-xs font-semibold text-slate-400 bg-slate-50" />
                {['Mon 15', 'Tue 16', 'Wed 17', 'Thu 18', 'Fri 19', 'Sat 20', 'Sun 21'].map((d) => (
                  <div key={d} className="py-3 text-center text-xs font-semibold bg-slate-50 border-l border-slate-100">
                    <span className={d.includes('18') ? 'font-bold' : ''} style={d.includes('18') ? { color: NAVY } : { color: '#64748B' }}>
                      {d}
                    </span>
                  </div>
                ))}
              </div>
              {weekHours.map((hour) => (
                <div key={hour} className="grid grid-cols-8 border-b border-slate-100 last:border-b-0" style={{ minHeight: '52px' }}>
                  <div className="px-4 py-2 text-xs font-mono text-slate-400 border-r border-slate-100 bg-slate-50 flex items-start pt-2">
                    {hour}
                  </div>
                  {[15, 16, 17, 18, 19, 20, 21].map((d) => {
                    const dayBlocks = (blocksByDate[d] || []).filter((b) => {
                      const blockHour = b.startHour;
                      const labelHour = parseInt(hour.split(':')[0]);
                      return blockHour === labelHour;
                    });
                    return (
                      <div
                        key={d}
                        className={`border-l border-slate-100 p-1 ${d === 18 ? 'bg-blue-50/30' : ''}`}
                        onClick={() => setSelectedDay(d)}
                      >
                        {dayBlocks.map((blk) => {
                          const status = approvedBlocks.has(blk.id) ? 'approved' : blk.status;
                          return (
                            <div
                              key={blk.id}
                              className="text-[9px] font-bold px-1.5 py-1 rounded text-white font-mono mb-0.5 cursor-pointer"
                              style={{ background: blockStatusColor[status] }}
                            >
                              {blk.id}
                            </div>
                          );
                        })}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          )}

          {/* Legend */}
          <div className="flex gap-4 mt-3 flex-wrap">
            {Object.entries(blockStatusColor).map(([k, v]) => (
              <div key={k} className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-sm" style={{ background: v }} />
                <span className="text-xs text-slate-500 capitalize">{k.replace('-', ' ')}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Day Detail Panel */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
          <div className="px-4 py-3 border-b border-slate-100" style={{ background: NAVY }}>
            <p className="font-semibold text-white text-sm">
              {selectedDay ? `${selectedDay} September 2026` : 'Select a day'}
            </p>
          </div>
          <div className="flex-1 p-4 overflow-y-auto">
            {selectedDay ? (
              <div className="space-y-4">
                {/* Stats */}
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { label: 'Planned Blocks', value: selectedBlocks.length.toString(), color: BLUE },
                    { label: 'Critical', value: selectedDay === 18 ? '2' : '0', color: '#DC2626' },
                    { label: 'Avail. Windows', value: '3', color: GREEN },
                    { label: 'Conflicts', value: selectedDay === 18 ? '0' : '1', color: '#EA580C' },
                  ].map((s) => (
                    <div key={s.label} className="rounded-lg p-3 bg-slate-50 text-center">
                      <p className="text-lg font-bold" style={{ color: s.color }}>{s.value}</p>
                      <p className="text-[10px] text-slate-500">{s.label}</p>
                    </div>
                  ))}
                </div>

                {/* Blocks */}
                {selectedBlocks.length > 0 ? (
                  <div>
                    <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Blocks</h4>
                    <div className="space-y-2">
                      {selectedBlocks.map((blk) => {
                        const status = approvedBlocks.has(blk.id) ? 'approved' : blk.status;
                        const color = blockStatusColor[status];
                        return (
                          <div key={blk.id} className="rounded-lg border p-3" style={{ borderColor: color + '40' }}>
                            <div className="flex items-center justify-between mb-1">
                              <span className="font-mono font-bold text-sm" style={{ color: NAVY }}>
                                {blk.id}
                              </span>
                              <span className="text-[9px] font-bold px-1.5 py-0.5 rounded text-white" style={{ background: color }}>
                                {status.replace('-', ' ').toUpperCase()}
                              </span>
                            </div>
                            <div className="flex items-center gap-1.5 text-xs text-slate-500">
                              <Clock size={10} />
                              <span className="font-mono">
                                {String(blk.startHour).padStart(2, '0')}:{String(blk.startMin).padStart(2, '0')} —{' '}
                                {String((blk.startHour + Math.floor((blk.startMin + blk.durationMins) / 60)) % 24).padStart(2, '0')}:
                                {String((blk.startMin + blk.durationMins) % 60).padStart(2, '0')}
                              </span>
                            </div>
                            <p className="text-xs text-slate-500 mt-0.5">{blk.section} · {blk.departments.join(', ')}</p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-6 text-slate-400 text-sm">No blocks planned</div>
                )}

                {/* Available Windows */}
                <div>
                  <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Available Windows</h4>
                  {['21:00–03:00 (A–B)', '22:30–04:00 (B–C)', '23:00–03:30 (C–D)'].map((w) => (
                    <div key={w} className="flex items-center gap-2 py-1.5 border-b border-slate-50 last:border-0">
                      <div className="w-2 h-2 rounded-full" style={{ background: GREEN }} />
                      <span className="text-xs font-mono text-slate-600">{w}</span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-full text-slate-400 text-sm">
                Click a date to see details
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
