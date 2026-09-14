import { useState } from 'react';
import { CheckCircle, Loader, Zap, ArrowDown, Train, Users, Clock } from 'lucide-react';
import type { Screen } from '../types';

const NAVY = '#123B66';
const SAFFRON = '#F28C28';
const GREEN = '#138A4B';
const BLUE = '#1769AA';

interface Props {
  setScreen: (s: Screen) => void;
  approvedBlocks: Set<string>;
  onApprove: () => void;
}

const pipelineSteps = [
  { label: 'Maintenance Requests', sub: '6 requests ingested', status: 'done' },
  { label: 'Priority Analysis', sub: 'Severity × overdue × asset criticality', status: 'done' },
  { label: 'Conflict Detection', sub: '2 scheduling conflicts resolved', status: 'done' },
  { label: 'Task Coordination', sub: 'Cross-department grouping', status: 'done' },
  { label: 'Train Impact Analysis', sub: 'Schedule cross-check complete', status: 'done' },
  { label: 'Block Optimization', sub: 'Windows evaluated for minimum disruption', status: 'done' },
  { label: 'Recommended Plan', sub: 'Ready for Planner review', status: 'active' },
];

const priorityTasks = [
  {
    id: 'BR-1024',
    dept: 'Engineering',
    activity: 'Track Repair — Rail Fracture',
    section: 'A–B',
    priority: 'Critical' as const,
    notes: 'Overdue 3 days. Derailment risk.',
    color: '#DC2626',
    deptColor: BLUE,
  },
  {
    id: 'BR-1025',
    dept: 'Signal & Telecom',
    activity: 'Signal Inspection & Testing',
    section: 'A–B',
    priority: 'High' as const,
    notes: 'Intermittent relay failure.',
    color: '#EA580C',
    deptColor: '#C2410C',
  },
  {
    id: 'BR-1026',
    dept: 'Traction',
    activity: 'OHE Inspection',
    section: 'A–B',
    priority: 'High' as const,
    notes: 'Inspection overdue 7 days.',
    color: '#EA580C',
    deptColor: '#166534',
  },
];

export default function AIPlanning({ setScreen, approvedBlocks, onApprove }: Props) {
  const [viewAlts, setViewAlts] = useState(false);
  const b014Approved = approvedBlocks.has('B014');

  const alternativeSlots = [
    { label: '17 Sep 2026', time: '21:30–00:00', impact: 'Medium', trains: 5, note: 'Rajdhani Express affected' },
    { label: '18 Sep 2026', time: '22:00–00:30', impact: 'Low', trains: 2, note: 'AI Recommended ★' },
    { label: '19 Sep 2026', time: '23:00–01:30', impact: 'Low', trains: 3, note: 'Viable alternative' },
    { label: '20 Sep 2026', time: '22:30–01:00', impact: 'Medium', trains: 4, note: 'Maintenance further delayed' },
  ];

  return (
    <div className="p-6 max-w-[1200px] space-y-6">
      <div>
        <h1 className="text-xl font-bold" style={{ color: NAVY }}>
          AI Planning
        </h1>
        <p className="text-sm text-slate-500 mt-0.5">
          AI analyses requests, detects conflicts, and recommends an optimized maintenance block plan
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Pipeline */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
          <h3 className="font-semibold text-sm mb-4" style={{ color: NAVY }}>
            Planning Pipeline
          </h3>
          <div className="space-y-0">
            {pipelineSteps.map((step, i) => (
              <div key={step.label} className="flex gap-3">
                <div className="flex flex-col items-center">
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 z-10"
                    style={{
                      background:
                        step.status === 'done' ? GREEN : step.status === 'active' ? SAFFRON : '#E2E8F0',
                    }}
                  >
                    {step.status === 'done' ? (
                      <CheckCircle size={14} className="text-white" />
                    ) : step.status === 'active' ? (
                      <Zap size={13} className="text-white" />
                    ) : (
                      <Loader size={13} className="text-slate-400" />
                    )}
                  </div>
                  {i < pipelineSteps.length - 1 && (
                    <div
                      className="w-0.5 flex-1 my-1"
                      style={{ background: step.status === 'done' ? GREEN + '60' : '#E2E8F0' }}
                    />
                  )}
                </div>
                <div className="pb-4">
                  <p
                    className="text-sm font-semibold"
                    style={{ color: step.status === 'active' ? SAFFRON : step.status === 'done' ? NAVY : '#94A3B8' }}
                  >
                    {step.label}
                  </p>
                  <p className="text-xs text-slate-400 mt-0.5">{step.sub}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-2 rounded-lg p-3 flex items-center gap-2" style={{ background: GREEN + '15' }}>
            <CheckCircle size={14} style={{ color: GREEN }} />
            <span className="text-sm font-semibold" style={{ color: GREEN }}>
              AI Planning Complete
            </span>
          </div>
        </div>

        {/* Results */}
        <div className="xl:col-span-2 space-y-4">
          {/* Top Priority Tasks */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
            <h3 className="font-semibold text-sm mb-4" style={{ color: NAVY }}>
              Top Priority Tasks
            </h3>
            <div className="space-y-3">
              {priorityTasks.map((task, idx) => (
                <div
                  key={task.id}
                  className="rounded-lg border p-3 flex items-center gap-4"
                  style={{ borderColor: task.color + '40', background: task.color + '05' }}
                >
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
                    style={{ background: task.color }}
                  >
                    {idx + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span
                        className="text-xs font-bold px-2 py-0.5 rounded-full"
                        style={{ background: task.deptColor + '15', color: task.deptColor }}
                      >
                        {task.dept}
                      </span>
                      <span className="font-mono text-xs text-slate-400">{task.id}</span>
                    </div>
                    <p className="text-sm font-semibold text-slate-700 mt-1">{task.activity}</p>
                    <p className="text-xs text-slate-400">{task.notes}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <span className="text-xs font-mono text-slate-500">{task.section}</span>
                    <div
                      className="mt-1 text-xs font-bold px-2 py-0.5 rounded"
                      style={{
                        background: task.priority === 'Critical' ? '#FEE2E2' : '#FED7AA',
                        color: task.priority === 'Critical' ? '#DC2626' : '#C2410C',
                      }}
                    >
                      {task.priority}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Coordination Opportunity */}
          <div
            className="rounded-xl border-2 p-4 flex items-start gap-4"
            style={{ borderColor: SAFFRON + '80', background: SAFFRON + '08' }}
          >
            <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: SAFFRON }}>
              <Users size={18} className="text-white" />
            </div>
            <div>
              <h4 className="font-semibold" style={{ color: NAVY }}>
                Coordination Opportunity Detected
              </h4>
              <p className="text-sm text-slate-600 mt-1">
                3 maintenance activities in the A–B section can potentially be performed within one common block,
                reducing total block requirement from{' '}
                <span className="font-semibold text-red-600">7.5 hrs</span> to{' '}
                <span className="font-semibold" style={{ color: GREEN }}>
                  2.5 hrs
                </span>
                .
              </p>
            </div>
          </div>

          {/* Recommended Block */}
          <div
            className="bg-white rounded-xl border-2 shadow-sm overflow-hidden"
            style={{ borderColor: b014Approved ? GREEN : NAVY }}
          >
            <div className="px-5 py-3" style={{ background: b014Approved ? GREEN : NAVY }}>
              <div className="flex items-center gap-2">
                <Zap size={15} className="text-white" />
                <span className="text-white font-semibold text-sm">
                  {b014Approved ? 'BLOCK B014 APPROVED' : 'AI RECOMMENDED BLOCK'}
                </span>
              </div>
            </div>
            <div className="p-5">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <div className="flex items-baseline gap-3 mb-3">
                    <span className="text-3xl font-bold font-mono" style={{ color: NAVY }}>
                      B014
                    </span>
                    <span className="text-slate-400 text-sm">A–B Section</span>
                  </div>
                  {[
                    { icon: Clock, label: '22:00 – 00:30', sub: '18 September 2026' },
                    { icon: Train, label: 'Low Train Impact', sub: '2 trains rescheduled' },
                    { icon: Users, label: '3 Departments', sub: 'Eng · S&T · Traction' },
                  ].map(({ icon: Icon, label, sub }) => (
                    <div key={label} className="flex items-center gap-3 mb-2">
                      <div
                        className="w-7 h-7 rounded-lg flex items-center justify-center"
                        style={{ background: NAVY + '12' }}
                      >
                        <Icon size={13} style={{ color: NAVY }} />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-700">{label}</p>
                        <p className="text-xs text-slate-400">{sub}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                    AI Reasoning
                  </p>
                  {[
                    { label: 'Maintenance Priority', value: 'Critical' },
                    { label: 'Asset Criticality', value: 'High' },
                    { label: 'Train Impact', value: 'Low' },
                    { label: 'Window Quality', value: 'Optimal' },
                    { label: 'Dept Coordination', value: '3 Departments' },
                  ].map((m) => (
                    <div key={m.label} className="flex justify-between py-1 border-b border-slate-50 text-xs">
                      <span className="text-slate-500">{m.label}</span>
                      <span className="font-semibold" style={{ color: NAVY }}>
                        {m.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Advisory note */}
              <div className="mt-4 p-3 rounded-lg bg-slate-50 border border-slate-100 text-xs text-slate-500 italic">
                AI recommendation is advisory. The authorized Railway Planner retains final authority to Approve,
                Modify, or Reject this plan.
              </div>

              {!b014Approved && (
                <div className="flex gap-3 mt-4">
                  <button
                    onClick={onApprove}
                    className="flex-1 py-2.5 rounded-lg text-white font-semibold text-sm hover:opacity-90 transition-opacity"
                    style={{ background: GREEN }}
                  >
                    Approve Plan
                  </button>
                  <button
                    onClick={() => setScreen('planner')}
                    className="flex-1 py-2.5 rounded-lg font-semibold text-sm border-2 hover:bg-slate-50 transition-colors"
                    style={{ borderColor: NAVY, color: NAVY }}
                  >
                    Modify Plan
                  </button>
                  <button
                    onClick={() => setViewAlts(!viewAlts)}
                    className="flex-1 py-2.5 rounded-lg font-semibold text-sm border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors"
                  >
                    View Alternatives
                  </button>
                </div>
              )}
            </div>

            {/* Alternative Slots */}
            {viewAlts && (
              <div className="border-t border-slate-100 p-5">
                <h4 className="text-sm font-semibold mb-3" style={{ color: NAVY }}>
                  Alternative Block Windows
                </h4>
                <div className="space-y-2">
                  {alternativeSlots.map((slot) => (
                    <div
                      key={slot.label + slot.time}
                      className={`flex items-center justify-between rounded-lg p-3 border text-sm ${slot.note.includes('★') ? 'border-saffron-300' : 'border-slate-100'}`}
                      style={{
                        background: slot.note.includes('★') ? SAFFRON + '10' : '#F8FAFC',
                        borderColor: slot.note.includes('★') ? SAFFRON : '#E2E8F0',
                      }}
                    >
                      <div>
                        <span className="font-medium text-slate-700">{slot.label}</span>
                        <span className="mx-2 text-slate-300">|</span>
                        <span className="font-mono text-xs" style={{ color: NAVY }}>
                          {slot.time}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span
                          className="text-xs font-medium px-2 py-0.5 rounded-full"
                          style={{
                            background: slot.impact === 'Low' ? GREEN + '15' : '#FED7AA',
                            color: slot.impact === 'Low' ? GREEN : '#C2410C',
                          }}
                        >
                          {slot.impact} Impact
                        </span>
                        <span className="text-xs text-slate-400">{slot.note}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
