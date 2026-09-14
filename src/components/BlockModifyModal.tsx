import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { X, Clock, Check, AlertCircle } from 'lucide-react';

const NAVY = '#123B66';

export default function BlockModifyModal() {
  const { isBlockModifyOpen, setIsBlockModifyOpen, blocks, selectedBlockId, updateBlock } = useApp();

  const block = blocks.find((b) => b.id === selectedBlockId);

  const [date, setDate] = useState('18 Sep 2026');
  const [startHour, setStartHour] = useState(22);
  const [startMin, setStartMin] = useState(0);
  const [durationMins, setDurationMins] = useState(150);
  const [section, setSection] = useState('A–B');

  useEffect(() => {
    if (block) {
      setDate(block.date);
      setStartHour(block.startHour);
      setStartMin(block.startMin);
      setDurationMins(block.durationMins);
      setSection(block.section);
    }
  }, [block]);

  if (!isBlockModifyOpen || !block) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateBlock(block.id, {
      date,
      startHour: Number(startHour),
      startMin: Number(startMin),
      durationMins: Number(durationMins),
      section,
    });
    setIsBlockModifyOpen(false);
  };

  const endH = (Number(startHour) + Math.floor((Number(startMin) + Number(durationMins)) / 60)) % 24;
  const endM = (Number(startMin) + Number(durationMins)) % 60;
  const timeWindowStr = `${String(startHour).padStart(2, '0')}:${String(startMin).padStart(2, '0')} – ${String(endH).padStart(2, '0')}:${String(endM).padStart(2, '0')}`;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-2.5 sm:p-4 bg-slate-900/50 backdrop-blur-xs">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-md w-full overflow-hidden">
        <div className="px-4 sm:px-6 py-3.5 sm:py-4 border-b border-slate-100 flex items-center justify-between" style={{ background: NAVY }}>
          <div className="flex items-center gap-2 text-white">
            <Clock size={16} />
            <h3 className="text-sm font-bold">Modify Schedule: Block {block.id}</h3>
          </div>
          <button
            onClick={() => setIsBlockModifyOpen(false)}
            className="text-white/70 hover:text-white w-10 h-10 -mr-1 rounded-lg transition-colors flex items-center justify-center flex-shrink-0"
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSave} className="p-4 sm:p-6 space-y-3.5 sm:space-y-4">
          <div className="p-3 rounded-xl bg-blue-50 border border-blue-100 text-xs text-blue-800 flex items-start gap-2">
            <AlertCircle size={14} className="flex-shrink-0 mt-0.5 text-blue-600" />
            <span>
              Adjusting the schedule window will dynamically update the Gantt chart and Corridor View.
            </span>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Section</label>
            <select
              value={section}
              onChange={(e) => setSection(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:outline-none font-mono"
            >
              <option value="A–B">A–B Section</option>
              <option value="B–C">B–C Section</option>
              <option value="C–D">C–D Section</option>
              <option value="D–E">D–E Section</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Execution Date</label>
            <input
              type="text"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:outline-none font-mono"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Start Time (24h)</label>
              <div className="flex gap-1.5 items-center">
                <input
                  type="number"
                  min={0}
                  max={23}
                  value={startHour}
                  onChange={(e) => setStartHour(Number(e.target.value))}
                  className="w-full px-2 py-2 text-sm border border-slate-200 rounded-xl bg-slate-50 text-center font-mono focus:bg-white focus:outline-none"
                />
                <span className="font-bold text-slate-400">:</span>
                <input
                  type="number"
                  min={0}
                  max={59}
                  step={5}
                  value={startMin}
                  onChange={(e) => setStartMin(Number(e.target.value))}
                  className="w-full px-2 py-2 text-sm border border-slate-200 rounded-xl bg-slate-50 text-center font-mono focus:bg-white focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Duration (Minutes)</label>
              <input
                type="number"
                min={30}
                max={480}
                step={15}
                value={durationMins}
                onChange={(e) => setDurationMins(Number(e.target.value))}
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl bg-slate-50 font-mono text-center focus:bg-white focus:outline-none"
              />
            </div>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-center">
            <p className="text-[10px] uppercase font-bold text-slate-400">Calculated Window</p>
            <p className="text-sm font-bold font-mono text-slate-800 mt-0.5">{timeWindowStr}</p>
            <p className="text-[11px] text-slate-500 mt-0.5">Duration: {Math.floor(durationMins / 60)}h {durationMins % 60 ? (durationMins % 60) + 'm' : '00m'}</p>
          </div>

          <div className="pt-3 border-t border-slate-100 flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-end gap-2 sm:gap-2.5">
            <button
              type="button"
              onClick={() => setIsBlockModifyOpen(false)}
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
              Save Schedule
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
