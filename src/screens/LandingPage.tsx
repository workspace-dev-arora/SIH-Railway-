import { useState } from 'react';
import { ChevronRight, Shield, Zap, Train, BarChart3, Users, CheckCircle } from 'lucide-react';

const NAVY = '#123B66';
const DEEP = '#0B2545';
const BLUE = '#1769AA';
const SAFFRON = '#F28C28';
const GREEN = '#138A4B';

interface Props {
  onLogin: () => void;
}

const stations = ['Station A', 'Station B', 'Station C', 'Station D'];

const features = [
  {
    icon: Zap,
    title: 'AI-Powered Planning',
    desc: 'Analyses maintenance requests, detects conflicts, and recommends optimized block windows across departments.',
  },
  {
    icon: Users,
    title: 'Cross-Department Coordination',
    desc: 'Unifies Engineering, Signal & Telecom, and Traction Distribution requests into coordinated maintenance blocks.',
  },
  {
    icon: Train,
    title: 'Minimal Train Disruption',
    desc: 'Evaluates train schedules to recommend blocks with the lowest operational impact.',
  },
  {
    icon: BarChart3,
    title: 'Analytics & Reporting',
    desc: 'Tracks block utilization, maintenance completion, and efficiency gains for divisional management.',
  },
  {
    icon: Shield,
    title: 'Human-in-the-Loop',
    desc: 'AI recommends. Authorized Railway Planners retain full authority to Approve, Modify, or Reject.',
  },
  {
    icon: CheckCircle,
    title: 'Asset Criticality Awareness',
    desc: 'Prioritizes overdue and safety-critical maintenance automatically, reducing risk exposure.',
  },
];

export default function LandingPage({ onLogin }: Props) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#FFFFFF' }}>
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-slate-100 bg-white/95 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4 sm:gap-6">
          {/* Logo */}
          <div className="flex items-center gap-2.5 flex-shrink-0">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background: NAVY }}
            >
              <Train size={15} className="text-white" />
            </div>
            <div>
              <span className="font-black text-base tracking-wider" style={{ color: NAVY }}>
                TRACKSYNC
              </span>
              {/* Tricolor */}
              <div className="flex h-0.5 rounded-full overflow-hidden mt-0.5">
                <div className="flex-1" style={{ background: SAFFRON }} />
                <div className="flex-1 bg-slate-200" />
                <div className="flex-1" style={{ background: GREEN }} />
              </div>
            </div>
          </div>

          {/* Nav */}
          <nav className="hidden md:flex items-center gap-6 flex-1 ml-6">
            {['About', 'How It Works', 'Help'].map((item) => (
              <a
                key={item}
                href="#"
                className="text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors"
              >
                {item}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3 ml-auto">
            <span className="hidden sm:flex items-center gap-1.5 text-xs text-slate-400">
              <Shield size={12} />
              Authorized Personnel Only
            </span>
            <button
              onClick={onLogin}
              className="px-5 py-2.5 min-h-[44px] rounded-lg text-sm font-bold text-white hover:opacity-90 transition-opacity shadow-sm flex items-center justify-center"
              style={{ background: `linear-gradient(135deg, ${DEEP}, ${BLUE})` }}
            >
              Login
            </button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="flex-shrink-0 pt-10 pb-10 sm:pt-16 sm:pb-12 md:pt-24 md:pb-16 px-4 sm:px-6" style={{ background: '#FAFBFD' }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
            <div>
              {/* Badge */}
              <div
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-semibold mb-4 sm:mb-6"
                style={{ borderColor: BLUE + '40', color: BLUE, background: BLUE + '08' }}
              >
                <Zap size={11} />
                AI-Powered Maintenance Block Planning
              </div>

              <h1 className="text-2xl sm:text-3xl md:text-5xl font-black leading-tight mb-4 sm:mb-6" style={{ color: NAVY }}>
                Smarter Blocks.{' '}
                <span style={{ color: BLUE }}>Safer Maintenance.</span>{' '}
                Better Rail Operations.
              </h1>

              <p className="text-sm sm:text-base md:text-lg text-slate-600 leading-relaxed mb-6 sm:mb-8 max-w-xl">
                TrackSync brings maintenance requests, train operations and block planning together in one
                intelligent platform for Indian Railways.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                <button
                  onClick={onLogin}
                  className="flex items-center justify-center gap-2 px-6 py-3 min-h-[44px] rounded-xl text-sm font-bold text-white hover:opacity-90 transition-opacity shadow-md"
                  style={{ background: `linear-gradient(135deg, ${DEEP}, ${BLUE})` }}
                >
                  Login to TrackSync
                  <ChevronRight size={16} />
                </button>
                <a
                  href="#how-it-works"
                  className="flex items-center justify-center gap-2 px-6 py-3 min-h-[44px] rounded-xl text-sm font-bold border-2 hover:bg-slate-50 transition-colors"
                  style={{ borderColor: NAVY, color: NAVY }}
                >
                  Explore How It Works
                </a>
              </div>

              {/* Trust indicators */}
              <div className="flex flex-wrap gap-4 mt-8">
                {[
                  { icon: Shield, label: 'Secure Access' },
                  { icon: Users, label: 'Multi-Department' },
                  { icon: BarChart3, label: 'Analytics-Driven' },
                ].map(({ icon: Icon, label }) => (
                  <div key={label} className="flex items-center gap-1.5 text-xs text-slate-500">
                    <Icon size={13} style={{ color: BLUE }} />
                    {label}
                  </div>
                ))}
              </div>
            </div>

            {/* Railway Schematic Hero Visual */}
            <div
              className="rounded-2xl border border-slate-200 p-4 sm:p-8 shadow-sm overflow-hidden"
              style={{ background: '#FDFEFF' }}
            >
              <div className="mb-4 flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Central Division Corridor
                </span>
                <span
                  className="text-xs font-bold px-2 py-0.5 rounded-full"
                  style={{ background: GREEN + '15', color: GREEN }}
                >
                  Live View
                </span>
              </div>

              {/* Track schematic */}
              <div className="overflow-x-auto pb-2 -mx-1 px-1">
                <div className="relative py-4 min-w-[280px]">
                  <div className="flex items-center">
                    {stations.map((s, i) => (
                      <div key={s} className="flex items-center flex-1 last:flex-none">
                        <div className="flex flex-col items-center gap-1">
                          <div
                            className="w-3 h-3 rounded-full bg-white border-2"
                            style={{ borderColor: NAVY }}
                          />
                          <span className="text-[10px] font-bold font-mono" style={{ color: NAVY }}>
                            {s.replace('Station ', '')}
                          </span>
                        </div>
                        {i < stations.length - 1 && (
                          <div className="flex-1 flex flex-col items-center mx-1 gap-1">
                            <div
                              className="w-full h-0.5"
                              style={{
                                background:
                                  i === 0 ? SAFFRON : i === 1 ? BLUE : '#CBD5E1',
                              }}
                            />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Block indicator */}
                  <div
                    className="mt-4 rounded-lg p-3 border text-center"
                    style={{ borderColor: SAFFRON + '60', background: SAFFRON + '08', maxWidth: '220px', marginLeft: '0' }}
                  >
                    <div className="flex items-center gap-1.5 mb-1">
                      <Zap size={11} style={{ color: SAFFRON }} />
                      <span className="text-[10px] font-bold" style={{ color: SAFFRON }}>
                        AI RECOMMENDED
                      </span>
                    </div>
                    <p className="font-mono font-bold text-sm" style={{ color: NAVY }}>
                      Block B014
                    </p>
                    <p className="text-[10px] text-slate-500 font-mono mt-0.5">
                      A–B Section · 22:00–00:30
                    </p>
                    <div className="flex gap-1 mt-2 justify-center">
                      {['Engg', 'S&T', 'TRD'].map((d) => (
                        <span
                          key={d}
                          className="text-[9px] font-medium px-1.5 py-0.5 rounded"
                          style={{ background: NAVY + '12', color: NAVY }}
                        >
                          {d}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Mini stats */}
              <div className="grid grid-cols-3 gap-2 sm:gap-3 mt-4 pt-4 border-t border-slate-100">
                {[
                  { label: 'Block Hours Saved', value: '11 hrs', color: GREEN },
                  { label: 'Train Conflicts', value: '3 ↓', color: NAVY },
                  { label: 'Depts Coordinated', value: '3', color: BLUE },
                ].map((s) => (
                  <div key={s.label} className="text-center">
                    <p className="font-bold text-base sm:text-lg" style={{ color: s.color }}>
                      {s.value}
                    </p>
                    <p className="text-[9px] sm:text-[10px] text-slate-400 leading-tight">{s.label}</p>
                  </div>
                ))}
              </div>
              <p className="text-[9px] text-center text-slate-300 mt-2">
                Illustrative prototype data
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-12 sm:py-16 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-black mb-3" style={{ color: NAVY }}>
              How TrackSync Works
            </h2>
            <p className="text-sm sm:text-base text-slate-500 max-w-xl mx-auto">
              A structured AI-assisted workflow that keeps Railway Planners in control at every step.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {[
              {
                num: '01',
                title: 'Requests Submitted',
                desc: 'Engineering, S&T, and Traction departments submit maintenance requests with urgency, asset, and location details.',
                color: BLUE,
              },
              {
                num: '02',
                title: 'AI Analyses & Plans',
                desc: 'TrackSync analyses priority, detects conflicts, identifies coordination opportunities, and recommends optimized blocks.',
                color: SAFFRON,
              },
              {
                num: '03',
                title: 'Planner Decides',
                desc: 'The authorized Railway Planner reviews AI recommendations and Approves, Modifies, or Rejects — retaining full control.',
                color: GREEN,
              },
            ].map((step) => (
              <div
                key={step.num}
                className="rounded-xl border border-slate-200 p-5 sm:p-6 bg-white hover:shadow-md transition-shadow"
              >
                <div
                  className="text-3xl font-black mb-4 opacity-20"
                  style={{ color: step.color }}
                >
                  {step.num}
                </div>
                <h3 className="font-bold text-lg mb-2" style={{ color: NAVY }}>
                  {step.title}
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-12 sm:py-16 px-4 sm:px-6" style={{ background: '#F7F9FC' }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 sm:mb-10">
            <h2 className="text-xl sm:text-2xl font-black mb-2" style={{ color: NAVY }}>
              Built for Railway Operations
            </h2>
            <p className="text-slate-500 text-xs sm:text-sm">Every feature designed for the real workflow of railway maintenance planning.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3.5 sm:gap-4">
            {features.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-white rounded-xl border border-slate-200 p-4 sm:p-5 hover:shadow-md transition-shadow">
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center mb-3"
                  style={{ background: NAVY + '10' }}
                >
                  <Icon size={16} style={{ color: NAVY }} />
                </div>
                <h3 className="font-semibold text-sm mb-1.5" style={{ color: NAVY }}>{title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-12 sm:py-16 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div
            className="rounded-2xl p-6 sm:p-10 text-white"
            style={{ background: `linear-gradient(135deg, ${DEEP} 0%, ${BLUE} 100%)` }}
          >
            <p className="text-2xl sm:text-3xl font-black mb-3">Ready to plan smarter?</p>
            <p className="text-white/70 mb-6 sm:mb-7 text-xs sm:text-sm max-w-md mx-auto">
              Sign in with your authorized Railway credentials to access TrackSync.
            </p>
            <button
              onClick={onLogin}
              className="w-full sm:w-auto px-8 py-3 min-h-[44px] rounded-xl font-bold text-sm bg-white hover:bg-slate-100 transition-colors shadow-md inline-flex items-center justify-center"
              style={{ color: NAVY }}
            >
              Login to TrackSync
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 py-6 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between text-center sm:text-left gap-4">
          <div className="flex items-center gap-2">
            <span className="font-black text-sm tracking-wider" style={{ color: NAVY }}>
              TRACKSYNC
            </span>
            <div className="flex h-0.5 rounded-full overflow-hidden" style={{ width: '30px' }}>
              <div className="flex-1" style={{ background: SAFFRON }} />
              <div className="flex-1 bg-slate-200" />
              <div className="flex-1" style={{ background: GREEN }} />
            </div>
          </div>
          <p className="text-xs text-slate-400">
            Prototype — Illustrative scenario only. Not connected to Indian Railways systems.
          </p>
          <div className="flex items-center gap-1.5 text-xs text-slate-400">
            <Shield size={11} />
            Authorized railway personnel only
          </div>
        </div>
      </footer>
    </div>
  );
}
