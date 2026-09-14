import { useState } from 'react';
import { X, AlertTriangle, CheckCircle, Clock, Users, Train, Wrench } from 'lucide-react';

const NAVY = '#123B66';
const SAFFRON = '#F28C28';
const GREEN = '#138A4B';
const BLUE = '#1769AA';

const stations = ['A', 'B', 'C', 'D', 'E'];

interface SectionData {
  from: string;
  to: string;
  status: 'available' | 'maintenance-planned' | 'active' | 'conflict' | 'completed';
  block?: string;
  time?: string;
  departments?: string[];
  assets?: string[];
  trainImpact?: string;
  approachKm?: string;
}

const sections: SectionData[] = [
  {
    from: 'A',
    to: 'B',
    status: 'maintenance-planned',
    block: 'B014',
    time: '22:00–00:30',
    departments: ['Engineering', 'Signal & Telecom', 'Traction'],
    assets: ['Track KM 45–48', 'Signal SM-42', 'OHE KM 45–48'],
    trainImpact: 'Low',
    approachKm: 'KM 42.0 – KM 51.0',
  },
  {
    from: 'B',
    to: 'C',
    status: 'maintenance-planned',
    block: 'B015',
    time: '23:00–02:00',
    departments: ['Engineering'],
    assets: ['Track KM 78–82'],
    trainImpact: 'Low',
    approachKm: 'KM 72.0 – KM 88.0',
  },
  {
    from: 'C',
    to: 'D',
    status: 'conflict',
    block: 'B013',
    time: '21:00–23:00',
    departments: ['Signal & Telecom'],
    assets: ['Signal Cable F-12'],
    trainImpact: 'Medium',
    approachKm: 'KM 95.0 – KM 108.0',
  },
  {
    from: 'D',
    to: 'E',
    status: 'available',
    approachKm: 'KM 108.0 – KM 122.0',
  },
];

const statusStyle: Record<string, { color: string; label: string; bg: string }> = {
  available: { color: GREEN, label: 'Available', bg: GREEN + '15' },
  'maintenance-planned': { color: SAFFRON, label: 'Maintenance Planned', bg: SAFFRON + '15' },
  active: { color: '#7C3AED', label: 'Active Block', bg: '#7C3AED15' },
  conflict: { color: '#DC2626', label: 'Conflict Detected', bg: '#DC262615' },
  completed: { color: '#94A3B8', label: 'Completed', bg: '#94A3B815' },
};

const stationData: Record<string, { name: string; type: string; km: string; loopLines: number }> = {
  A: { name: 'Station A', type: 'Junction', km: 'KM 0.0', loopLines: 4 },
  B: { name: 'Station B', type: 'Halt', km: 'KM 52.0', loopLines: 2 },
  C: { name: 'Station C', type: 'Station', km: 'KM 88.0', loopLines: 3 },
  D: { name: 'Station D', type: 'Station', km: 'KM 112.0', loopLines: 2 },
  E: { name: 'Station E', type: 'Junction', km: 'KM 128.0', loopLines: 4 },
};

interface Props {
  approvedBlocks: Set<string>;
}

export default function CorridorView({ approvedBlocks }: Props) {
  const [selectedSection, setSelectedSection] = useState<SectionData | null>(null);
  const [selectedStation, setSelectedStation] = useState<string | null>(null);

  return (
    <div className="p-6 max-w-[1300px] space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold" style={{ color: NAVY }}>
            Corridor View
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">Central Division — A to E Corridor · Click a section or station for details</p>
        </div>
        <div className="flex gap-3">
          {Object.entries(statusStyle).map(([k, v]) => (
            <div key={k} className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full" style={{ background: v.color }} />
              <span className="text-xs text-slate-500">{v.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Main Schematic */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-8">
        {/* Track schematic */}
        <div className="relative">
          <div className="flex items-center justify-between relative">
            {/* Track line behind everything */}
            <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-2 flex">
              {sections.map((sec) => {
                const status = approvedBlocks.has(sec.block || '') ? 'maintenance-planned' : sec.status;
                return (
                  <div
                    key={sec.from + sec.to}
                    className="flex-1 cursor-pointer hover:opacity-80 transition-opacity relative"
                    onClick={() => { setSelectedSection(sec); setSelectedStation(null); }}
                  >
                    {/* Track ties pattern */}
                    <div
                      className="w-full h-2 relative"
                      style={{ background: statusStyle[status]?.color || NAVY }}
                    >
                      {/* Rail ties */}
                      {Array.from({ length: 8 }).map((_, i) => (
                        <div
                          key={i}
                          className="absolute top-1/2 -translate-y-1/2 w-0.5 h-4 opacity-30"
                          style={{ left: `${(i / 8) * 100 + 6}%`, background: '#000' }}
                        />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Stations */}
            {stations.map((s, i) => (
              <div
                key={s}
                className="relative z-10 flex flex-col items-center gap-2 cursor-pointer group"
                onClick={() => { setSelectedStation(s); setSelectedSection(null); }}
              >
                <div
                  className="w-6 h-6 rounded-full border-3 bg-white z-10 group-hover:scale-110 transition-transform"
                  style={{ border: `3px solid ${NAVY}`, boxShadow: `0 0 0 3px ${NAVY}20` }}
                />
                <div className="text-center mt-2">
                  <p className="text-sm font-bold font-mono" style={{ color: NAVY }}>
                    {s}
                  </p>
                  <p className="text-[10px] text-slate-400">{stationData[s].km}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Section labels below track */}
          <div className="flex mt-12">
            <div className="w-6" /> {/* offset for first station */}
            {sections.map((sec) => {
              const status = approvedBlocks.has(sec.block || '') ? 'maintenance-planned' : sec.status;
              const st = statusStyle[status] || statusStyle.available;
              return (
                <div
                  key={sec.from + sec.to}
                  className="flex-1 text-center cursor-pointer"
                  onClick={() => { setSelectedSection(sec); setSelectedStation(null); }}
                >
                  <div
                    className="mx-2 rounded-lg p-2 border transition-all hover:shadow-md"
                    style={{ borderColor: st.color + '60', background: st.bg }}
                  >
                    <p className="text-xs font-bold font-mono" style={{ color: st.color }}>
                      {sec.from}–{sec.to}
                    </p>
                    <p className="text-[10px] text-slate-500 mt-0.5">{st.label}</p>
                    {sec.block && (
                      <p className="text-[9px] font-mono font-bold mt-1" style={{ color: st.color }}>
                        {sec.block} · {sec.time}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Train Movement Indicators */}
        <div className="mt-8 border-t border-slate-100 pt-5">
          <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Live Train Position (Simulated)</h3>
          <div className="space-y-2">
            {[
              { name: '12302 Rajdhani Express (Up)', position: 'Between C–D', status: 'Moving', delay: 'On time' },
              { name: '12501 Mail Express (Down)', position: 'Station B', status: 'Halted', delay: '+5 min' },
              { name: '14312 Passenger (Up)', position: 'Between A–B', status: 'Moving', delay: 'On time' },
            ].map((t) => (
              <div
                key={t.name}
                className="flex items-center gap-4 p-3 rounded-lg border border-slate-100 bg-slate-50"
              >
                <Train size={14} className="text-slate-500 flex-shrink-0" />
                <span className="text-sm font-medium text-slate-700 flex-1">{t.name}</span>
                <span className="text-xs text-slate-500">{t.position}</span>
                <span
                  className="text-xs font-medium px-2 py-0.5 rounded-full"
                  style={t.status === 'Moving' ? { background: GREEN + '20', color: GREEN } : { background: SAFFRON + '20', color: SAFFRON }}
                >
                  {t.status}
                </span>
                <span className={`text-xs font-medium ${t.delay === 'On time' ? 'text-green-600' : 'text-orange-600'}`}>
                  {t.delay}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Detail Panels */}
      {selectedSection && (
        <div className="bg-white rounded-xl border-2 shadow-sm overflow-hidden" style={{ borderColor: statusStyle[selectedSection.status]?.color || NAVY }}>
          <div
            className="px-5 py-3 flex items-center justify-between"
            style={{ background: statusStyle[selectedSection.status]?.color || NAVY }}
          >
            <h3 className="font-bold text-white">
              Section {selectedSection.from}–{selectedSection.to}
            </h3>
            <button onClick={() => setSelectedSection(null)} className="text-white/70 hover:text-white">
              <X size={16} />
            </button>
          </div>
          <div className="p-5 grid grid-cols-2 md:grid-cols-4 gap-6">
            <div>
              <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider mb-2">Status</p>
              <span
                className="text-sm font-bold px-3 py-1 rounded-full"
                style={{ background: statusStyle[selectedSection.status]?.bg, color: statusStyle[selectedSection.status]?.color }}
              >
                {statusStyle[selectedSection.status]?.label}
              </span>
              {selectedSection.approachKm && (
                <p className="text-xs text-slate-400 font-mono mt-2">{selectedSection.approachKm}</p>
              )}
            </div>
            {selectedSection.block && (
              <div>
                <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider mb-2">Upcoming Block</p>
                <p className="font-mono font-bold text-lg" style={{ color: NAVY }}>{selectedSection.block}</p>
                <div className="flex items-center gap-1 mt-1">
                  <Clock size={11} className="text-slate-400" />
                  <span className="text-xs font-mono text-slate-500">{selectedSection.time}</span>
                </div>
              </div>
            )}
            {selectedSection.departments && (
              <div>
                <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider mb-2">Departments</p>
                <div className="space-y-1">
                  {selectedSection.departments.map((d) => (
                    <div key={d} className="flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 rounded-full" style={{ background: NAVY }} />
                      <span className="text-xs text-slate-600">{d}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {selectedSection.assets && (
              <div>
                <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider mb-2">Assets</p>
                <div className="space-y-1">
                  {selectedSection.assets.map((a) => (
                    <div key={a} className="flex items-center gap-1.5">
                      <Wrench size={10} className="text-slate-400" />
                      <span className="text-xs text-slate-600">{a}</span>
                    </div>
                  ))}
                </div>
                {selectedSection.trainImpact && (
                  <div className="mt-2">
                    <span className="text-xs font-medium px-2 py-0.5 rounded-full" style={{ background: GREEN + '20', color: GREEN }}>
                      Train Impact: {selectedSection.trainImpact}
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {selectedStation && (
        <div className="bg-white rounded-xl border-2 shadow-sm overflow-hidden" style={{ borderColor: NAVY }}>
          <div className="px-5 py-3 flex items-center justify-between" style={{ background: NAVY }}>
            <h3 className="font-bold text-white">{stationData[selectedStation].name}</h3>
            <button onClick={() => setSelectedStation(null)} className="text-white/70 hover:text-white">
              <X size={16} />
            </button>
          </div>
          <div className="p-5 grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Station Type', value: stationData[selectedStation].type },
              { label: 'Location', value: stationData[selectedStation].km },
              { label: 'Loop Lines', value: stationData[selectedStation].loopLines.toString() },
              { label: 'Block Status', value: selectedStation === 'A' || selectedStation === 'B' ? 'Maintenance Adjacent' : 'Clear' },
            ].map((f) => (
              <div key={f.label}>
                <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider mb-1">{f.label}</p>
                <p className="text-sm font-semibold text-slate-700">{f.value}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
