import React, { useState } from 'react';
import { X, AlertTriangle, CheckCircle, Clock, Users, Train, Wrench, ShieldAlert, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';

const NAVY = '#123B66';
const SAFFRON = '#F28C28';
const GREEN = '#138A4B';
const BLUE = '#1769AA';

const stations = ['A', 'B', 'C', 'D', 'E'];

const stationData: Record<string, { name: string; type: string; km: string; loopLines: number; status: string }> = {
  A: { name: 'Station A (Jn)', type: 'Major Junction', km: 'KM 0.0', loopLines: 4, status: 'Active Traffic Flow' },
  B: { name: 'Station B', type: 'Intermediate Station', km: 'KM 52.0', loopLines: 2, status: 'Track Possession Border' },
  C: { name: 'Station C', type: 'Passenger Halt', km: 'KM 88.0', loopLines: 3, status: 'Signal Interlock Active' },
  D: { name: 'Station D', type: 'Crossing Station', km: 'KM 112.0', loopLines: 2, status: 'Clear Track' },
  E: { name: 'Station E (Jn)', type: 'Terminal Junction', km: 'KM 128.0', loopLines: 4, status: 'Clear Track' },
};

export default function CorridorView() {
  const { blocks, approvedBlocks, setSelectedBlockId, setIsBlockModifyOpen } = useApp();

  const [selectedSection, setSelectedSection] = useState<string | null>('A–B');
  const [selectedStation, setSelectedStation] = useState<string | null>(null);

  const b014 = blocks.find((b) => b.id === 'B014');
  const b014Approved = approvedBlocks.has('B014') || b014?.status === 'approved';

  const sectionsData = [
    {
      id: 'A–B',
      from: 'A',
      to: 'B',
      status: b014Approved ? 'approved-block' : 'ai-recommended',
      block: 'B014',
      time: `${String(b014?.startHour || 22).padStart(2, '0')}:${String(b014?.startMin || 0).padStart(2, '0')} – 00:30`,
      duration: `${b014?.durationMins || 150} mins`,
      departments: ['Engineering (Track Repair)', 'Signal & Telecom (Relay Testing)', 'Traction (OHE Inspection)'],
      assets: ['Track KM 46.2 Down Line', 'Signal SM-42 Up Home', 'OHE KM 45–48'],
      trainImpact: 'Low (2 Freight Regulated)',
      approachKm: 'KM 0.0 to KM 52.0',
      reason: 'Urgent rail fracture repair at KM 46.2 + coordinated OHE power shutdown',
    },
    {
      id: 'B–C',
      from: 'B',
      to: 'C',
      status: 'planned',
      block: 'B015',
      time: '23:00–02:00',
      duration: '180 mins',
      departments: ['Engineering (Ballast Tamping)'],
      assets: ['Track Section KM 78–82'],
      trainImpact: 'Low (Night Freight Window)',
      approachKm: 'KM 52.0 to KM 88.0',
      reason: 'Speed restriction restoration at KM 79.5',
    },
    {
      id: 'C–D',
      from: 'C',
      to: 'D',
      status: 'conflict',
      block: 'B013',
      time: '21:00–23:00',
      duration: '120 mins',
      departments: ['Signal & Telecom (Cable Repair)'],
      assets: ['Signal Cable F-12'],
      trainImpact: 'Medium (Degraded block working)',
      approachKm: 'KM 88.0 to KM 112.0',
      reason: 'Underground signal cable fault rectification',
    },
    {
      id: 'D–E',
      from: 'D',
      to: 'E',
      status: 'available',
      approachKm: 'KM 112.0 to KM 128.0',
      departments: ['Clear for normal operations'],
      assets: ['Clear Section'],
      trainImpact: 'None',
      reason: 'Normal train movement without possession',
    },
  ];

  const activeSection = sectionsData.find((s) => s.id === selectedSection);

  return (
    <div className="p-3.5 sm:p-6 max-w-[1350px] space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3 sm:gap-4">
        <div>
          <h1 className="text-lg sm:text-xl font-bold" style={{ color: NAVY }}>
            Railway Corridor Schematic View
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5 leading-snug">
            Central Division: Stations A to E Mainline Corridor · Interactive track status & live train positions
          </p>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 text-xs flex-wrap">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-emerald-600" />
            <span className="text-slate-600 font-medium">Approved Block</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-amber-500" />
            <span className="text-slate-600 font-medium">AI Recommended Block</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-blue-600" />
            <span className="text-slate-600 font-medium">Planned Block</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-600" />
            <span className="text-slate-600 font-medium">Conflict / Hold</span>
          </div>
        </div>
      </div>

      {/* Main Track Schematic Box */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 sm:p-8">
        <div className="mb-4 sm:mb-6 flex items-center justify-between flex-wrap gap-2">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Interactive Track Schematic (Click any Section or Station node)
          </span>
          <span className="text-xs font-mono font-bold text-slate-600 bg-slate-100 px-3 py-1 rounded-full">
            Corridor Distance: 128.0 Track KM
          </span>
        </div>

        {/* Schematic Line */}
        <div className="overflow-x-auto pb-4 -mx-2 px-2">
          <div className="min-w-[660px] relative py-8">
          <div className="flex items-center justify-between relative">
            {/* Base Rails */}
            <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-3 flex">
              {sectionsData.map((sec) => {
                const isSectionSelected = selectedSection === sec.id;
                let trackColor = '#CBD5E1';
                if (sec.id === 'A–B') {
                  trackColor = b014Approved ? GREEN : SAFFRON;
                } else if (sec.status === 'planned') {
                  trackColor = BLUE;
                } else if (sec.status === 'conflict') {
                  trackColor = '#DC2626';
                }

                return (
                  <div
                    key={sec.id}
                    onClick={() => {
                      setSelectedSection(sec.id);
                      setSelectedStation(null);
                    }}
                    className={`flex-1 cursor-pointer transition-all relative group ${
                      isSectionSelected ? 'opacity-100 scale-y-125 z-10' : 'opacity-85 hover:opacity-100'
                    }`}
                  >
                    <div
                      className="w-full h-3 rounded-xs shadow-xs"
                      style={{ background: trackColor }}
                    />
                  </div>
                );
              })}
            </div>

            {/* Station Nodes */}
            {stations.map((s) => {
              const isStationSelected = selectedStation === s;
              return (
                <div
                  key={s}
                  onClick={() => {
                    setSelectedStation(s);
                    setSelectedSection(null);
                  }}
                  className="relative z-20 flex flex-col items-center gap-2 cursor-pointer group"
                >
                  <div
                    className={`w-7 h-7 rounded-full bg-white border-3 flex items-center justify-center transition-all ${
                      isStationSelected ? 'scale-125 ring-4 ring-blue-500/30' : 'group-hover:scale-110'
                    }`}
                    style={{ borderColor: NAVY }}
                  >
                    <div className="w-2.5 h-2.5 rounded-full" style={{ background: NAVY }} />
                  </div>

                  <div className="text-center mt-2">
                    <p className="text-xs font-bold font-mono text-slate-800" style={{ color: NAVY }}>
                      Station {s}
                    </p>
                    <p className="text-[10px] text-slate-400 font-mono">{stationData[s].km}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Section Badges Below Track */}
          <div className="flex mt-14">
            <div className="w-7" />
            {sectionsData.map((sec) => {
              const isSelected = selectedSection === sec.id;
              let badgeColor = '#64748B';
              let badgeBg = '#F1F5F9';
              let statusText = 'Normal Traffic';

              if (sec.id === 'A–B') {
                badgeColor = b014Approved ? GREEN : SAFFRON;
                badgeBg = b014Approved ? '#ECFDF5' : '#FFFBEB';
                statusText = b014Approved ? 'APPROVED BLOCK B014' : 'AI RECOMMENDED B014';
              } else if (sec.status === 'planned') {
                badgeColor = BLUE;
                badgeBg = '#EFF6FF';
                statusText = 'PLANNED BLOCK B015';
              } else if (sec.status === 'conflict') {
                badgeColor = '#DC2626';
                badgeBg = '#FEF2F2';
                statusText = 'CONFLICT FLAGGED';
              }

              return (
                <div
                  key={sec.id}
                  onClick={() => {
                    setSelectedSection(sec.id);
                    setSelectedStation(null);
                  }}
                  className="flex-1 px-2 cursor-pointer"
                >
                  <div
                    className={`p-3 rounded-xl border text-center transition-all ${
                      isSelected ? 'ring-2 ring-blue-500 shadow-md' : 'hover:shadow-xs'
                    }`}
                    style={{ background: badgeBg, borderColor: badgeColor + '50' }}
                  >
                    <p className="text-xs font-black font-mono" style={{ color: badgeColor }}>
                      Section {sec.from}–{sec.to}
                    </p>
                    <p className="text-[10px] font-bold mt-0.5" style={{ color: badgeColor }}>
                      {statusText}
                    </p>
                    {sec.time && (
                      <p className="text-[9px] font-mono text-slate-500 mt-1 font-semibold">
                        {sec.time}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Live Train Positions */}
        <div className="mt-8 pt-6 border-t border-slate-100">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Live Corridor Train Occupancy (TMS Ingestion Feed)
            </h3>
            <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
              Live Simulation Feed
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {[
              { name: '12302 Rajdhani Express (Up)', pos: 'Section C–D (KM 94)', speed: '110 kmph', status: 'On Schedule' },
              { name: '12501 Coromandel Express (Dn)', pos: 'Station B Loop 1', speed: 'Halted (Regulated)', status: 'Window Cleared' },
              { name: '14312 Intercity Express (Up)', pos: 'Section A–B (KM 22)', speed: '95 kmph', status: 'Clearing window before 22:00' },
            ].map((train) => (
              <div key={train.name} className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-800 flex items-center gap-1.5">
                    <Train size={13} className="text-slate-500" />
                    {train.name}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500">Location: <span className="font-semibold text-slate-700">{train.pos}</span></p>
                <div className="flex justify-between items-center pt-1 text-[10px]">
                  <span className="font-mono text-slate-600">{train.speed}</span>
                  <span className="font-bold text-emerald-700">{train.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Detail Inspector Card */}
      {activeSection && (
        <div className="bg-white rounded-2xl border-2 shadow-sm overflow-hidden animate-in fade-in duration-150" style={{ borderColor: activeSection.id === 'A–B' && b014Approved ? GREEN : NAVY }}>
          <div
            className="px-4 sm:px-6 py-4 flex items-center justify-between flex-wrap gap-2"
            style={{ background: activeSection.id === 'A–B' && b014Approved ? GREEN : NAVY }}
          >
            <div className="text-white">
              <h3 className="font-bold text-sm sm:text-base">Corridor Section {activeSection.id} Operational Specifications</h3>
              <p className="text-xs text-white/80">{activeSection.approachKm} · Central Division</p>
            </div>
            {activeSection.id === 'A–B' && b014Approved && (
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-white/20 text-white font-mono uppercase">
                Approved Maintenance Block Active
              </span>
            )}
          </div>

          <div className="p-4 sm:p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-xs">
            <div>
              <p className="text-[10px] uppercase font-bold text-slate-400">Current Possession Status</p>
              <p className="text-sm font-bold text-slate-800 mt-1">
                {activeSection.id === 'A–B' && b014Approved ? 'Approved Block B014' : activeSection.status.toUpperCase()}
              </p>
              <p className="text-slate-500 mt-1">{activeSection.reason}</p>
            </div>

            <div>
              <p className="text-[10px] uppercase font-bold text-slate-400">Scheduled Time Window</p>
              <p className="text-sm font-bold font-mono text-slate-800 mt-1">
                {activeSection.time || 'Open corridor (No block)'}
              </p>
              {activeSection.duration && <p className="text-slate-500 mt-0.5">Duration: {activeSection.duration}</p>}
            </div>

            <div>
              <p className="text-[10px] uppercase font-bold text-slate-400">Target Assets Involved</p>
              <div className="space-y-1 mt-1 font-medium text-slate-700">
                {activeSection.assets?.map((a) => (
                  <p key={a}>• {a}</p>
                ))}
              </div>
            </div>

            <div>
              <p className="text-[10px] uppercase font-bold text-slate-400">Train Flow Interaction</p>
              <p className="text-xs font-bold text-slate-800 mt-1">{activeSection.trainImpact}</p>
              {activeSection.id === 'A–B' && (
                <button
                  onClick={() => {
                    setSelectedBlockId('B014');
                    setIsBlockModifyOpen(true);
                  }}
                  className="mt-3 w-full sm:w-auto px-4 py-2 rounded-xl text-xs font-bold border border-slate-300 hover:bg-slate-50 text-slate-700 min-h-[40px] cursor-pointer"
                >
                  Modify Section Schedule
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {selectedStation && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 animate-in fade-in duration-150">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-sm" style={{ color: NAVY }}>Station {selectedStation} Diagnostic Info</h3>
            <button onClick={() => setSelectedStation(null)} className="text-slate-400 hover:text-slate-600">
              <X size={16} />
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
            <div>
              <p className="text-[10px] uppercase font-bold text-slate-400">Station Name</p>
              <p className="font-bold text-slate-800 mt-0.5">{stationData[selectedStation].name}</p>
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold text-slate-400">Kilometer Marker</p>
              <p className="font-bold font-mono text-slate-800 mt-0.5">{stationData[selectedStation].km}</p>
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold text-slate-400">Loop Lines Available</p>
              <p className="font-bold text-slate-800 mt-0.5">{stationData[selectedStation].loopLines} Loop Lines</p>
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold text-slate-400">Interlocking Status</p>
              <p className="font-bold text-emerald-700 mt-0.5">{stationData[selectedStation].status}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
