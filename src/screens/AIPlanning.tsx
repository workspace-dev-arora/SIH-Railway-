import React, { useState } from 'react';
import {
  CheckCircle,
  Loader,
  Zap,
  Train,
  Users,
  Clock,
  AlertTriangle,
  RotateCcw,
  Sparkles,
  ShieldCheck,
  AlertCircle,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import type { Screen } from '../types';

const NAVY = '#123B66';
const DEEP = '#0B2545';
const SAFFRON = '#F28C28';
const GREEN = '#138A4B';
const BLUE = '#1769AA';

const pipelineSteps = [
  { label: 'Ingesting Requisitions', sub: 'Aggregating active department queues' },
  { label: 'Priority & Risk Weighting', sub: 'Asset criticality × overdue days' },
  { label: 'Section Spatial Alignment', sub: 'Corridor grouping along A–B segment' },
  { label: 'Conflict Detection Matrix', sub: 'Cross-checking train schedules & power feeds' },
  { label: 'Train Flow Impact Analysis', sub: 'Timetable simulation to minimize delay' },
  { label: 'Multi-Department Coordination', sub: 'Bundling Track, Signal & OHE requirements' },
  { label: 'Window Optimization Engine', sub: 'Slotting optimal 150-minute night window' },
  { label: 'Advisory Plan Synthesis', sub: 'Score calculation & decision recommendation' },
];

const alternativeSlots = [
  { label: '17 Sep 2026', time: '21:30–00:00', impact: 'Medium', trains: 5, note: 'Rajdhani Express affected' },
  { label: '18 Sep 2026', time: '22:00–00:30', impact: 'Low', trains: 2, note: 'AI Recommended ★ (Optimal)' },
  { label: '19 Sep 2026', time: '23:00–01:30', impact: 'Low', trains: 3, note: 'Viable secondary alternative' },
  { label: '20 Sep 2026', time: '22:30–01:00', impact: 'Medium', trains: 4, note: 'Safety margin degraded' },
];

export default function AIPlanning() {
  const {
    setScreen,
    blocks,
    approvedBlocks,
    recommendationState,
    analysisStep,
    isAnalyzing,
    generateOptimizedPlan,
    conflicts,
    setSelectedConflict,
    setIsBlockModifyOpen,
    setSelectedBlockId,
  } = useApp();

  const [viewAlts, setViewAlts] = useState(false);

  const b014 = blocks.find((b) => b.id === 'B014');
  const b014Approved = approvedBlocks.has('B014') || b014?.status === 'approved';
  const b014Rejected = b014?.status === 'rejected';

  return (
    <div className="p-3.5 sm:p-6 max-w-[1300px] space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3 sm:gap-4">
        <div>
          <h1 className="text-lg sm:text-xl font-bold" style={{ color: NAVY }}>
            AI Maintenance Block Planning
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5 leading-snug">
            Decision-support intelligence: Corridor optimization, conflict resolution, and joint block synthesis
          </p>
        </div>

        <button
          onClick={generateOptimizedPlan}
          disabled={isAnalyzing}
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white shadow-sm hover:opacity-95 transition-all disabled:opacity-60 cursor-pointer min-h-[44px]"
          style={{ background: `linear-gradient(135deg, ${DEEP}, ${BLUE})` }}
        >
          {isAnalyzing ? (
            <>
              <Loader size={15} className="animate-spin text-amber-300" />
              <span>Analyzing Corridor…</span>
            </>
          ) : (
            <>
              <Sparkles size={15} className="text-amber-300" />
              <span>GENERATE OPTIMIZED PLAN</span>
            </>
          )}
        </button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Left Column: Planning Pipeline */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <h3 className="font-bold text-sm text-slate-800" style={{ color: NAVY }}>
              Optimization Pipeline
            </h3>
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
              Deterministic Engine
            </span>
          </div>

          <div className="space-y-0">
            {pipelineSteps.map((step, i) => {
              const isDone = !isAnalyzing || analysisStep > i;
              const isActive = isAnalyzing && analysisStep === i;

              return (
                <div key={step.label} className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div
                      className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 z-10 transition-colors duration-300"
                      style={{
                        background: isDone ? GREEN : isActive ? SAFFRON : '#E2E8F0',
                      }}
                    >
                      {isDone ? (
                        <CheckCircle size={14} className="text-white" />
                      ) : isActive ? (
                        <Zap size={13} className="text-white animate-pulse" />
                      ) : (
                        <div className="w-2 h-2 rounded-full bg-slate-400" />
                      )}
                    </div>
                    {i < pipelineSteps.length - 1 && (
                      <div
                        className="w-0.5 flex-1 my-0.5 transition-colors duration-300"
                        style={{ background: isDone ? GREEN + '60' : '#E2E8F0', minHeight: '22px' }}
                      />
                    )}
                  </div>
                  <div className="pb-3.5 min-w-0">
                    <p
                      className={`text-xs font-bold leading-tight ${
                        isActive ? 'text-amber-600' : isDone ? 'text-slate-800' : 'text-slate-400'
                      }`}
                    >
                      {step.label}
                    </p>
                    <p className="text-[11px] text-slate-400 mt-0.5 leading-snug">{step.sub}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="pt-2 border-t border-slate-100">
            <div className="rounded-xl p-3 flex items-center gap-2.5 bg-emerald-50 border border-emerald-200">
              <CheckCircle size={16} className="text-emerald-600 flex-shrink-0" />
              <div>
                <p className="text-xs font-bold text-emerald-800">
                  {isAnalyzing ? 'Processing Corridor Telemetry…' : 'AI Optimization Complete'}
                </p>
                <p className="text-[10px] text-emerald-700">
                  {isAnalyzing ? 'Simulating train slots' : 'Ready for Planner authorization'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: AI Results & Recommendation Card */}
        <div className="xl:col-span-2 space-y-5">
          {/* Active Detected Conflicts Card */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 sm:p-5 space-y-3">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <AlertTriangle size={16} className="text-amber-600" />
                <h3 className="font-bold text-sm" style={{ color: NAVY }}>
                  Corridor Conflict Detection & Resolution
                </h3>
              </div>
              <span className="text-xs text-slate-400 font-medium">Click any conflict to inspect mitigation</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {conflicts.map((c) => (
                <div
                  key={c.id}
                  onClick={() => setSelectedConflict(c)}
                  className="p-3 rounded-xl border border-slate-200 hover:border-blue-400 hover:shadow-xs bg-slate-50 hover:bg-white cursor-pointer transition-all space-y-1.5"
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-[9px] font-bold px-1.5 py-0.5 rounded font-mono ${
                        c.severity === 'HIGH'
                          ? 'bg-red-100 text-red-700'
                          : c.severity === 'MEDIUM'
                          ? 'bg-amber-100 text-amber-700'
                          : 'bg-yellow-100 text-yellow-700'
                      }`}
                    >
                      {c.severity}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400 font-bold">{c.section}</span>
                  </div>
                  <p className="text-xs font-bold text-slate-800 line-clamp-1">{c.title}</p>
                  <p className="text-[11px] text-slate-500 line-clamp-2 leading-tight">{c.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Coordination Opportunity Banner */}
          <div
            className="rounded-2xl border-2 p-3.5 sm:p-4 flex flex-col sm:flex-row items-start gap-3 sm:gap-4"
            style={{ borderColor: SAFFRON + '60', background: SAFFRON + '08' }}
          >
            <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: SAFFRON }}>
              <Users size={20} className="text-white" />
            </div>
            <div>
              <h4 className="font-bold text-sm" style={{ color: NAVY }}>
                Cross-Department Coordination Opportunity Identified
              </h4>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                3 maintenance activities in the <span className="font-bold font-mono">A–B</span> section (Track, Signal & Traction) have been aligned within a single common block window, reducing total corridor possession requirement from{' '}
                <span className="font-bold text-red-600">6.0 hours</span> to{' '}
                <span className="font-bold text-emerald-700">2.5 hours</span>.
              </p>
            </div>
          </div>

          {/* MAIN AI RECOMMENDATION CARD: BLOCK B014 */}
          <div
            className="bg-white rounded-2xl border-2 shadow-sm overflow-hidden"
            style={{ borderColor: b014Approved ? GREEN : NAVY }}
          >
            {/* Banner */}
            <div
              className="px-4 sm:px-6 py-3.5 flex items-center justify-between flex-wrap gap-2"
              style={{ background: b014Approved ? GREEN : NAVY }}
            >
              <div className="flex items-center gap-2.5">
                <Zap size={16} className="text-amber-300" />
                <span className="text-white font-bold text-sm tracking-wide">
                  {b014Approved
                    ? 'BLOCK B014 — APPROVED BY PLANNER'
                    : b014Rejected
                    ? 'BLOCK B014 — REJECTED'
                    : 'AI RECOMMENDATION: BLOCK B014 (SCORE: 94/100)'}
                </span>
              </div>
              <span className="text-xs font-bold font-mono text-white/90 bg-white/15 px-3 py-1 rounded-full">
                AI Score: 94 / 100
              </span>
            </div>

            <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left: Metadata */}
                <div>
                  <div className="flex items-baseline gap-3 mb-2">
                    <span className="text-2xl sm:text-3xl font-extrabold font-mono" style={{ color: NAVY }}>
                      B014
                    </span>
                    <span className="text-slate-500 text-xs sm:text-sm font-semibold">Section A–B (Central Division)</span>
                  </div>

                  <div className="space-y-3 mt-4">
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100 min-h-[44px]">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-blue-100 text-blue-800 flex-shrink-0">
                        <Clock size={16} />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-800 font-mono">22:00 – 00:30 (150 minutes)</p>
                        <p className="text-[11px] text-slate-400">Execution Date: 18 September 2026</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100 min-h-[44px]">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-emerald-100 text-emerald-800 flex-shrink-0">
                        <Train size={16} />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-800">Low Train Impact (2 Freight Re-scheduled)</p>
                        <p className="text-[11px] text-slate-400">Zero express passenger disruptions</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100 min-h-[44px]">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-amber-100 text-amber-800 flex-shrink-0">
                        <Users size={16} />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-800">3 Coordinated Departments</p>
                        <p className="text-[11px] text-slate-400">Engineering · Signal & Telecom · Traction</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right: AI Reasoning */}
                <div className="flex flex-col justify-between">
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2.5">
                      Decision-Support Reasoning
                    </p>
                    <div className="space-y-2">
                      {[
                        'Critical maintenance requirement: rail fracture at KM 46.2 resolved',
                        'Multiple compatible maintenance activities unified under one possession',
                        'Same railway corridor section (A–B Down Line)',
                        'Optimal night maintenance window (22:00–00:30)',
                        'Low expected train impact: freight paths regulated safely',
                        'Reduced number of separate traffic blocks (3.5 hours saved)',
                      ].map((reason, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                          <div className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 flex-shrink-0" />
                          <span>{reason}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 p-3 rounded-xl bg-slate-50 border border-slate-200 text-[11px] text-slate-500 italic">
                    AI recommendation is decision-support advisory. The authorized Railway Planner retains final authority to Approve, Modify, or Reject this plan.
                  </div>
                </div>
              </div>

              {/* Card Actions */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between flex-wrap gap-3">
                {b014Approved && (
                  <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-emerald-700">
                    <ShieldCheck size={18} className="flex-shrink-0" />
                    <span>Block B014 is officially approved and active in the schedule.</span>
                  </div>
                )}

                <button
                  onClick={() => setViewAlts(!viewAlts)}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-xl text-xs font-bold border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors sm:ml-auto cursor-pointer min-h-[44px] flex items-center justify-center"
                >
                  {viewAlts ? 'Hide Alternative Windows' : 'View Alternative Windows'}
                </button>
              </div>

              {/* Alternative Slots Dropdown */}
              {viewAlts && (
                <div className="pt-4 border-t border-slate-100 space-y-2 animate-in fade-in duration-150">
                  <h4 className="text-xs font-bold text-slate-700 mb-2">Evaluated Window Slots (Corridor Simulation)</h4>
                  {alternativeSlots.map((slot) => (
                    <div
                      key={slot.label + slot.time}
                      className={`flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded-xl border text-xs gap-2 sm:gap-3 ${
                        slot.note.includes('★') ? 'bg-amber-50/60 border-amber-200' : 'bg-slate-50 border-slate-200'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="font-bold text-slate-800">{slot.label}</span>
                        <span className="text-slate-300">|</span>
                        <span className="font-mono font-bold text-slate-700">{slot.time}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            slot.impact === 'Low' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {slot.impact} Impact
                        </span>
                        <span className="text-slate-500 font-medium text-[11px]">{slot.note}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
