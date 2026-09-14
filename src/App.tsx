import { useState } from 'react';
import {
  LayoutDashboard, Wrench, BrainCircuit, CalendarDays, Calendar,
  Route, BarChart3, Database, Bell, Settings, Search,
  ChevronDown, Train,
} from 'lucide-react';
import type { Screen } from './types';
import WelcomeAnimation from './screens/WelcomeAnimation';
import LandingPage from './screens/LandingPage';
import LoginPage from './screens/LoginPage';
import PostLoginTransition from './screens/PostLoginTransition';
import ControlCenter from './screens/ControlCenter';
import MaintenanceRequests from './screens/MaintenanceRequests';
import AIPlanning from './screens/AIPlanning';
import BlockPlanner from './screens/BlockPlanner';
import CalendarView from './screens/CalendarView';
import CorridorView from './screens/CorridorView';
import Analytics from './screens/Analytics';
import DataSources from './screens/DataSources';

type AppPhase = 'welcome' | 'landing' | 'login' | 'post-login' | 'app';

const NAVY = '#123B66';
const DEEP = '#0B2545';
const BLUE = '#1769AA';
const SAFFRON = '#F28C28';
const GREEN = '#138A4B';

const navItems: { id: Screen; label: string; icon: any; badge?: string }[] = [
  { id: 'control',    label: 'Control Center',       icon: LayoutDashboard },
  { id: 'requests',   label: 'Maintenance Requests',  icon: Wrench,      badge: '6' },
  { id: 'planning',   label: 'AI Planning',           icon: BrainCircuit },
  { id: 'planner',    label: 'Block Planner',         icon: CalendarDays },
  { id: 'calendar',   label: 'Calendar',              icon: Calendar },
  { id: 'corridor',   label: 'Corridor View',         icon: Route },
  { id: 'analytics',  label: 'Analytics',             icon: BarChart3 },
  { id: 'datasources',label: 'Data Sources',          icon: Database },
];

const pageTitles: Record<Screen, string> = {
  control:     'Control Center',
  requests:    'Maintenance Requests',
  planning:    'AI Planning',
  planner:     'Block Planner',
  calendar:    'Calendar',
  corridor:    'Corridor View',
  analytics:   'Analytics',
  datasources: 'Data Sources',
};

export default function App() {
  const [phase, setPhase]               = useState<AppPhase>('welcome');
  const [loginRole, setLoginRole]       = useState('Block Planner');
  const [screen, setScreen]             = useState<Screen>('control');
  const [approvedBlocks, setApprovedBlocks] = useState<Set<string>>(new Set());
  const [rejectedBlocks, setRejectedBlocks] = useState<Set<string>>(new Set());
  const [notifications, setNotifications]   = useState(3);

  /* ── Entry flow ─────────────────────────────────────────────── */
  if (phase === 'welcome')
    return <WelcomeAnimation onComplete={() => setPhase('landing')} />;
  if (phase === 'landing')
    return <LandingPage onLogin={() => setPhase('login')} />;
  if (phase === 'login')
    return (
      <LoginPage
        onSuccess={(role) => { setLoginRole(role); setPhase('post-login'); }}
        onBack={() => setPhase('landing')}
      />
    );
  if (phase === 'post-login')
    return <PostLoginTransition role={loginRole} onComplete={() => setPhase('app')} />;

  /* ── Authenticated handlers ──────────────────────────────────── */
  const handleApprove = () => {
    setApprovedBlocks((prev) => new Set([...prev, 'B014']));
    setNotifications((n) => n + 1);
  };
  const handleReject = () => setRejectedBlocks((prev) => new Set([...prev, 'B014']));
  const screenProps  = { setScreen, approvedBlocks, onApprove: handleApprove, onReject: handleReject };

  /* ── Authenticated shell ─────────────────────────────────────── */
  return (
    <div className="flex h-screen overflow-hidden" style={{ background: '#F7F9FC' }}>

      {/* ── Sidebar ── */}
      <aside
        className="flex flex-col w-60 flex-shrink-0 overflow-hidden"
        style={{ background: '#FFFFFF', borderRight: '1px solid #E2E8F0' }}
      >
        {/* Brand */}
        <div className="px-5 pt-5 pb-4">
          <div className="flex items-center gap-2.5">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ background: `linear-gradient(135deg, ${DEEP}, ${BLUE})` }}
            >
              <Train size={15} className="text-white" />
            </div>
            <div>
              <p className="font-black text-sm tracking-wider leading-none" style={{ color: NAVY }}>
                TRACKSYNC
              </p>
              <p className="text-[9px] font-deva mt-0.5" style={{ color: '#94A3B8' }}>ट्रैकसिंक</p>
            </div>
          </div>
          {/* Tricolor */}
          <div className="flex mt-3 rounded-full overflow-hidden" style={{ height: '2px' }}>
            <div className="flex-1" style={{ background: SAFFRON }} />
            <div className="flex-1" style={{ background: '#E2E8F0' }} />
            <div className="flex-1" style={{ background: GREEN }} />
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-2 space-y-0.5 overflow-y-auto">
          {navItems.map(({ id, label, icon: Icon, badge }) => {
            const active = screen === id;
            return (
              <button
                key={id}
                onClick={() => setScreen(id)}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left text-sm font-medium transition-colors relative group"
                style={
                  active
                    ? { background: '#EFF6FF', color: NAVY }
                    : { color: '#64748B' }
                }
                onMouseEnter={(e) => { if (!active) (e.currentTarget as HTMLElement).style.backgroundColor = '#F8FAFC'; }}
                onMouseLeave={(e) => { if (!active) (e.currentTarget as HTMLElement).style.backgroundColor = ''; }}
              >
                {/* Active indicator */}
                {active && (
                  <span
                    className="absolute left-0 top-2 bottom-2 w-0.5 rounded-r-full"
                    style={{ background: BLUE }}
                  />
                )}
                <Icon size={15} style={{ color: active ? BLUE : '#94A3B8' }} strokeWidth={active ? 2.2 : 1.8} />
                <span className="flex-1">{label}</span>
                {badge && (
                  <span
                    className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full"
                    style={
                      active
                        ? { background: BLUE + '20', color: BLUE }
                        : { background: '#F1F5F9', color: '#94A3B8' }
                    }
                  >
                    {badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Bottom */}
        <div
          className="px-3 pb-4 pt-3 space-y-0.5"
          style={{ borderTop: '1px solid #E2E8F0' }}
        >
          {[
            { label: 'Notifications', icon: Bell, badge: notifications > 0 ? notifications.toString() : undefined },
            { label: 'Settings',      icon: Settings },
          ].map(({ label, icon: Icon, badge }) => (
            <button
              key={label}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-500 hover:bg-slate-50 transition-colors"
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = '#F8FAFC'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = ''; }}
            >
              <Icon size={15} className="text-slate-400" strokeWidth={1.8} />
              <span className="flex-1 text-left">{label}</span>
              {badge && (
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-red-500 text-white">
                  {badge}
                </span>
              )}
            </button>
          ))}

          {/* Profile */}
          <div
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg mt-1 cursor-pointer hover:bg-slate-50 transition-colors"
          >
            <div
              className="w-7 h-7 rounded-full flex items-center justify-center text-white font-bold text-xs flex-shrink-0"
              style={{ background: `linear-gradient(135deg, ${DEEP}, ${BLUE})` }}
            >
              RK
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold truncate" style={{ color: NAVY }}>R. K. Sharma</p>
              <p className="text-[10px] text-slate-400 truncate">Block Planner</p>
            </div>
          </div>
        </div>
      </aside>

      {/* ── Main area ── */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">

        {/* Top bar */}
        <header
          className="flex-shrink-0 h-14 flex items-center px-6 gap-4 bg-white"
          style={{ borderBottom: '1px solid #E2E8F0' }}
        >
          <div className="flex-1 min-w-0">
            <h2 className="text-sm font-semibold truncate" style={{ color: NAVY }}>
              {pageTitles[screen]}
            </h2>
          </div>

          <button
            className="hidden sm:flex items-center gap-1.5 text-xs font-medium border rounded-lg px-3 py-1.5 transition-colors hover:bg-slate-50"
            style={{ borderColor: '#E2E8F0', color: NAVY }}
          >
            Central Division <ChevronDown size={12} />
          </button>

          <span className="hidden md:block text-xs text-slate-400 font-medium whitespace-nowrap">
            18 Sep 2026
          </span>

          <div className="relative hidden lg:block">
            <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              className="pl-8 pr-4 py-1.5 text-xs border rounded-lg bg-slate-50 focus:outline-none focus:border-blue-300 w-44 transition-colors"
              style={{ borderColor: '#E2E8F0' }}
              placeholder="Search requests, blocks…"
            />
          </div>

          <button className="relative p-1.5 rounded-lg hover:bg-slate-50 transition-colors">
            <Bell size={15} className="text-slate-500" strokeWidth={1.8} />
            {notifications > 0 && (
              <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-red-500" />
            )}
          </button>

          <div
            className="w-7 h-7 rounded-full flex items-center justify-center text-white font-bold text-xs cursor-pointer flex-shrink-0"
            style={{ background: `linear-gradient(135deg, ${DEEP}, ${BLUE})` }}
          >
            RK
          </div>
        </header>

        {/* Screen */}
        <main className="flex-1 overflow-auto" style={{ background: '#F7F9FC' }}>
          {screen === 'control'     && <ControlCenter      {...screenProps} />}
          {screen === 'requests'    && <MaintenanceRequests />}
          {screen === 'planning'    && <AIPlanning          {...screenProps} />}
          {screen === 'planner'     && <BlockPlanner        {...screenProps} />}
          {screen === 'calendar'    && <CalendarView        approvedBlocks={approvedBlocks} />}
          {screen === 'corridor'    && <CorridorView        approvedBlocks={approvedBlocks} />}
          {screen === 'analytics'   && <Analytics />}
          {screen === 'datasources' && <DataSources />}
        </main>
      </div>
    </div>
  );
}
