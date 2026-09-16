import { useState, useEffect } from 'react';
import {
  LayoutDashboard,
  BrainCircuit,
  CalendarDays,
  Route,
  BarChart3,
  Database,
  Bell,
  Settings,
  Search,
  ChevronDown,
  Train,
  History,
  RotateCcw,
  LogOut,
  User,
  ExternalLink,
  Menu,
  X,
} from 'lucide-react';
import type { Screen, RailwayDivision } from './types';
import { AppProvider, useApp } from './context/AppContext';
import { loadFromStorage, saveToStorage, STORAGE_KEYS } from './utils/storage';

import WelcomeAnimation from './screens/WelcomeAnimation';
import LandingPage from './screens/LandingPage';
import LoginPage from './screens/LoginPage';
import PostLoginTransition from './screens/PostLoginTransition';
import ControlCenter from './screens/ControlCenter';
import MaintenanceRequests from './screens/MaintenanceRequests';
import AIPlanning from './screens/AIPlanning';
import BlockPlanner from './screens/BlockPlanner';
import CorridorView from './screens/CorridorView';
import Analytics from './screens/Analytics';
import DataSources from './screens/DataSources';

import ToastContainer from './components/ToastContainer';
import NewRequestModal from './components/NewRequestModal';
import RequestDetailsModal from './components/RequestDetailsModal';
import EditRequestModal from './components/EditRequestModal';
import BlockModifyModal from './components/BlockModifyModal';
import ConflictModal from './components/ConflictModal';
import NotificationsDrawer from './components/NotificationsDrawer';
import ActivityLogModal from './components/ActivityLogModal';
import ResetDemoDialog from './components/ResetDemoDialog';

type AppPhase = 'welcome' | 'landing' | 'login' | 'post-login' | 'app';

const NAVY = '#123B66';
const DEEP = '#0B2545';
const BLUE = '#1769AA';
const SAFFRON = '#F28C28';
const GREEN = '#138A4B';

const pageTitles: Record<Screen, string> = {
  control: 'Control Center & Dashboard',
  requests: 'Maintenance Requisitions',
  planning: 'AI Maintenance Planning Console',
  planner: 'Corridor Block Planner (Gantt)',
  corridor: 'Railway Corridor Schematic',
  analytics: 'Operational Performance Analytics',
  datasources: 'Railway Data Subsystems',
};

function MainAppShell() {
  const {
    user,
    logout,
    screen,
    setScreen,
    unreadNotificationsCount,
    setIsNotificationsOpen,
    setIsActivityLogOpen,
    setIsResetDialogOpen,
    division,
    setDivision,
  } = useApp();

  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const navItems: { id: Screen; label: string; icon: any; badge?: string }[] = [
    { id: 'control', label: 'Control Center', icon: LayoutDashboard },
    { id: 'planning', label: 'AI Planning', icon: BrainCircuit },
    { id: 'planner', label: 'Block Planner', icon: CalendarDays },
    { id: 'corridor', label: 'Corridor View', icon: Route },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'datasources', label: 'Data Sources', icon: Database },
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setScreen('requests');
    }
  };

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: '#F7F9FC' }}>
      {/* ── Desktop Sidebar ── */}
      <aside
        className="hidden lg:flex flex-col w-64 flex-shrink-0 overflow-hidden bg-white"
        style={{ borderRight: '1px solid #E2E8F0' }}
      >
        {/* Brand */}
        <div className="px-6 pt-5 pb-4">
          <div className="flex items-center gap-2.5">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm"
              style={{ background: `linear-gradient(135deg, ${DEEP}, ${BLUE})` }}
            >
              <Train size={18} className="text-white" />
            </div>
            <div>
              <p className="font-black text-base tracking-wider leading-none" style={{ color: NAVY }}>
                TRACKSYNC
              </p>
              <p className="text-[10px] font-deva mt-1 text-slate-400">ट्रैकसिंक · Smart Railways</p>
            </div>
          </div>
          {/* Tricolor line */}
          <div className="flex mt-3.5 rounded-full overflow-hidden" style={{ height: '3px' }}>
            <div className="flex-1" style={{ background: SAFFRON }} />
            <div className="flex-1" style={{ background: '#E2E8F0' }} />
            <div className="flex-1" style={{ background: GREEN }} />
          </div>
        </div>

        {/* Navigation links */}
        <nav className="flex-1 px-3 py-2 space-y-1 overflow-y-auto">
          {navItems.map(({ id, label, icon: Icon, badge }) => {
            const active = screen === id;
            return (
              <button
                key={id}
                onClick={() => setScreen(id)}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-left text-xs font-semibold transition-all relative cursor-pointer ${
                  active ? 'bg-blue-50/80 shadow-xs' : 'text-slate-600 hover:bg-slate-50'
                }`}
                style={active ? { color: NAVY } : {}}
              >
                {active && (
                  <span
                    className="absolute left-0 top-2 bottom-2 w-1 rounded-r-full"
                    style={{ background: BLUE }}
                  />
                )}
                <Icon
                  size={16}
                  style={{ color: active ? BLUE : '#94A3B8' }}
                  strokeWidth={active ? 2.2 : 1.8}
                />
                <span className="flex-1 truncate">{label}</span>
                {badge && (
                  <span
                    className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                    style={
                      active
                        ? { background: BLUE + '20', color: BLUE }
                        : { background: '#F1F5F9', color: '#64748B' }
                    }
                  >
                    {badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Bottom Actions */}
        <div
          className="px-3 pb-4 pt-3 space-y-1"
          style={{ borderTop: '1px solid #E2E8F0' }}
        >
          <button
            onClick={() => setIsNotificationsOpen(true)}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer"
          >
            <Bell size={15} className="text-slate-400" />
            <span className="flex-1 text-left">Notifications</span>
            {unreadNotificationsCount > 0 && (
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-500 text-white">
                {unreadNotificationsCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setIsActivityLogOpen(true)}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer"
          >
            <History size={15} className="text-slate-400" />
            <span className="flex-1 text-left">Audit Timeline</span>
          </button>

          <button
            onClick={() => setIsResetDialogOpen(true)}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold text-amber-700 hover:bg-amber-50 transition-colors cursor-pointer"
          >
            <RotateCcw size={15} className="text-amber-600" />
            <span className="flex-1 text-left">Reset Demo Data</span>
          </button>

          {/* User Profile Card */}
          <div className="pt-2">
            <div
              onClick={() => setUserDropdownOpen(!userDropdownOpen)}
              className="flex items-center gap-3 p-2 rounded-xl bg-slate-50 border border-slate-200 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-xs flex-shrink-0"
                style={{ background: `linear-gradient(135deg, ${DEEP}, ${BLUE})` }}
              >
                {user?.initial || 'RK'}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-bold truncate text-slate-800">{user?.name || 'Officer'}</p>
                <p className="text-[10px] text-slate-500 truncate font-medium">{user?.role || 'Block Planner'}</p>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  logout();
                }}
                title="Logout"
                className="p-1 text-slate-400 hover:text-red-600 rounded-md transition-colors"
              >
                <LogOut size={14} />
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* ── Mobile Navigation Drawer ── */}
      {mobileNavOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileNavOpen(false)}
          />
          {/* Drawer Panel */}
          <aside className="fixed inset-y-0 left-0 w-72 max-w-[85vw] bg-white shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-left duration-200">
            {/* Brand & Close */}
            <div className="px-5 pt-4 pb-3 flex items-center justify-between border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm"
                  style={{ background: `linear-gradient(135deg, ${DEEP}, ${BLUE})` }}
                >
                  <Train size={18} className="text-white" />
                </div>
                <div>
                  <p className="font-black text-base tracking-wider leading-none" style={{ color: NAVY }}>
                    TRACKSYNC
                  </p>
                  <p className="text-[10px] font-deva mt-0.5 text-slate-400">ट्रैकसिंक · Smart Railways</p>
                </div>
              </div>
              <button
                onClick={() => setMobileNavOpen(false)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center cursor-pointer"
                aria-label="Close navigation"
              >
                <X size={20} />
              </button>
            </div>

            {/* Tricolor line */}
            <div className="flex h-1 overflow-hidden">
              <div className="flex-1" style={{ background: SAFFRON }} />
              <div className="flex-1" style={{ background: '#E2E8F0' }} />
              <div className="flex-1" style={{ background: GREEN }} />
            </div>

            {/* Navigation links */}
            <nav className="flex-1 px-3 py-3 space-y-1.5 overflow-y-auto">
              {navItems.map(({ id, label, icon: Icon, badge }) => {
                const active = screen === id;
                return (
                  <button
                    key={id}
                    onClick={() => {
                      setScreen(id);
                      setMobileNavOpen(false);
                    }}
                    className={`w-full flex items-center gap-3.5 px-3.5 py-3 rounded-xl text-left text-sm font-semibold transition-all relative cursor-pointer min-h-[44px] ${
                      active ? 'bg-blue-50/90 shadow-xs' : 'text-slate-600 hover:bg-slate-50'
                    }`}
                    style={active ? { color: NAVY } : {}}
                  >
                    {active && (
                      <span
                        className="absolute left-0 top-2 bottom-2 w-1.5 rounded-r-full"
                        style={{ background: BLUE }}
                      />
                    )}
                    <Icon
                      size={18}
                      style={{ color: active ? BLUE : '#94A3B8' }}
                      strokeWidth={active ? 2.2 : 1.8}
                    />
                    <span className="flex-1 truncate">{label}</span>
                    {badge && (
                      <span
                        className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                        style={
                          active
                            ? { background: BLUE + '20', color: BLUE }
                            : { background: '#F1F5F9', color: '#64748B' }
                        }
                      >
                        {badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Bottom Actions */}
            <div className="px-3 pb-5 pt-3 space-y-1.5 border-t border-slate-100 bg-slate-50/50">
              <button
                onClick={() => {
                  setIsNotificationsOpen(true);
                  setMobileNavOpen(false);
                }}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors min-h-[44px] cursor-pointer"
              >
                <Bell size={16} className="text-slate-400" />
                <span className="flex-1 text-left">Notifications</span>
                {unreadNotificationsCount > 0 && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-500 text-white">
                    {unreadNotificationsCount}
                  </span>
                )}
              </button>

              <button
                onClick={() => {
                  setIsActivityLogOpen(true);
                  setMobileNavOpen(false);
                }}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors min-h-[44px] cursor-pointer"
              >
                <History size={16} className="text-slate-400" />
                <span className="flex-1 text-left">Audit Timeline</span>
              </button>

              <button
                onClick={() => {
                  setIsResetDialogOpen(true);
                  setMobileNavOpen(false);
                }}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold text-amber-700 hover:bg-amber-50 transition-colors min-h-[44px] cursor-pointer"
              >
                <RotateCcw size={16} className="text-amber-600" />
                <span className="flex-1 text-left">Reset Demo Data</span>
              </button>

              {/* User Profile */}
              <div className="pt-2">
                <div
                  onClick={() => {
                    setUserDropdownOpen(!userDropdownOpen);
                    setMobileNavOpen(false);
                  }}
                  className="flex items-center gap-3 p-2.5 rounded-xl bg-white border border-slate-200 cursor-pointer hover:bg-slate-50"
                >
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-xs flex-shrink-0"
                    style={{ background: `linear-gradient(135deg, ${DEEP}, ${BLUE})` }}
                  >
                    {user?.initial || 'RK'}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-bold truncate text-slate-800">{user?.name || 'Officer'}</p>
                    <p className="text-[10px] text-slate-500 truncate font-medium">{user?.role || 'Block Planner'}</p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      logout();
                    }}
                    title="Logout"
                    className="p-2 text-slate-400 hover:text-red-600 rounded-md transition-colors"
                  >
                    <LogOut size={16} />
                  </button>
                </div>
              </div>
            </div>
          </aside>
        </div>
      )}

      {/* ── Main Workspace Area ── */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header Bar */}
        <header
          className="flex-shrink-0 h-14 sm:h-16 flex items-center px-3 sm:px-6 gap-2 sm:gap-4 bg-white"
          style={{ borderBottom: '1px solid #E2E8F0' }}
        >
          {/* Mobile menu button */}
          <button
            onClick={() => setMobileNavOpen(true)}
            className="lg:hidden p-2 -ml-1 text-slate-600 hover:text-slate-900 rounded-xl hover:bg-slate-100 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center cursor-pointer"
            aria-label="Open Navigation Menu"
          >
            <Menu size={20} />
          </button>

          <div className="flex-1 min-w-0">
            <h2 className="text-sm sm:text-base font-bold truncate" style={{ color: NAVY }}>
              {pageTitles[screen]}
            </h2>
          </div>

          <div className="hidden sm:relative sm:block">
            <select
              value={division}
              onChange={(e) => setDivision(e.target.value as RailwayDivision)}
              className="appearance-none bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-semibold border border-slate-200 rounded-xl pl-3 pr-8 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500/20 cursor-pointer transition-all shadow-xs"
            >
              <option value="Central Division">Central Division</option>
              <option value="Northern Division">Northern Division</option>
              <option value="Western Division">Western Division</option>
              <option value="Southern Division">Southern Division</option>
              <option value="Eastern Division">Eastern Division</option>
            </select>
            <ChevronDown size={13} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          </div>

          <span className="hidden md:block text-xs font-mono font-medium text-slate-500 whitespace-nowrap bg-slate-100 px-3 py-1.5 rounded-xl">
            18 Sep 2026 · Cycle Active
          </span>

          {/* Quick Search */}
          <form onSubmit={handleSearchSubmit} className="relative hidden lg:block">
            <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-4 py-1.5 text-xs border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:outline-none focus:border-blue-400 w-52 transition-all font-medium"
              placeholder="Search requests, blocks…"
            />
          </form>

          {/* Notifications Button */}
          <button
            onClick={() => setIsNotificationsOpen(true)}
            className="relative p-2 rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors cursor-pointer text-slate-600"
            title="Notifications"
          >
            <Bell size={16} strokeWidth={2} />
            {unreadNotificationsCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-600 text-white text-[9px] font-black flex items-center justify-center">
                {unreadNotificationsCount}
              </span>
            )}
          </button>

          {/* User Menu */}
          <div className="relative">
            <div
              onClick={() => setUserDropdownOpen(!userDropdownOpen)}
              className="w-8 h-8 rounded-xl flex items-center justify-center text-white font-bold text-xs cursor-pointer shadow-xs"
              style={{ background: `linear-gradient(135deg, ${DEEP}, ${BLUE})` }}
            >
              {user?.initial || 'RK'}
            </div>

            {userDropdownOpen && (
              <div className="absolute right-0 top-11 w-56 bg-white rounded-2xl border border-slate-200 shadow-xl py-2 z-50 animate-in fade-in duration-100">
                <div className="px-4 py-2 border-b border-slate-100">
                  <p className="text-xs font-bold text-slate-800 truncate">{user?.name}</p>
                  <p className="text-[10px] text-slate-400 truncate">{user?.role} · ID: {user?.employeeId}</p>
                </div>
                <button
                  onClick={() => {
                    setUserDropdownOpen(false);
                    setIsActivityLogOpen(true);
                  }}
                  className="w-full px-4 py-2 text-left text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                >
                  <History size={14} className="text-slate-400" />
                  Audit Timeline
                </button>
                <button
                  onClick={() => {
                    setUserDropdownOpen(false);
                    setIsResetDialogOpen(true);
                  }}
                  className="w-full px-4 py-2 text-left text-xs text-amber-700 hover:bg-amber-50 flex items-center gap-2"
                >
                  <RotateCcw size={14} className="text-amber-600" />
                  Reset Demo Data
                </button>
                <div className="my-1 border-t border-slate-100" />
                <button
                  onClick={() => {
                    setUserDropdownOpen(false);
                    logout();
                  }}
                  className="w-full px-4 py-2 text-left text-xs text-red-600 hover:bg-red-50 flex items-center gap-2 font-semibold"
                >
                  <LogOut size={14} />
                  Sign Out Session
                </button>
              </div>
            )}
          </div>
        </header>

        {/* Dynamic Screen View */}
        <main className="flex-1 overflow-auto pb-16 lg:pb-0" style={{ background: '#F7F9FC' }}>
          {screen === 'control' && <ControlCenter />}
          {screen === 'requests' && <MaintenanceRequests />}
          {screen === 'planning' && <AIPlanning />}
          {screen === 'planner' && <BlockPlanner />}
          {screen === 'corridor' && <CorridorView />}
          {screen === 'analytics' && <Analytics />}
          {screen === 'datasources' && <DataSources />}
        </main>

        {/* ── Mobile Bottom Quick-Navigation Bar ── */}
        <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/90 px-2 py-1 flex items-center justify-around shadow-lg">
          {[
            { id: 'control' as Screen, label: 'Control', icon: LayoutDashboard },
            { id: 'planning' as Screen, label: 'AI Plan', icon: BrainCircuit },
            { id: 'planner' as Screen, label: 'Planner', icon: CalendarDays },
            { id: 'corridor' as Screen, label: 'Corridor', icon: Route },
          ].map(({ id, label, icon: Icon }) => {
            const active = screen === id;
            return (
              <button
                key={id}
                onClick={() => setScreen(id)}
                className={`flex flex-col items-center justify-center min-w-[56px] min-h-[48px] py-1 px-2 rounded-xl transition-all cursor-pointer ${
                  active ? 'text-blue-700 font-bold' : 'text-slate-400 hover:text-slate-600 font-medium'
                }`}
              >
                <Icon size={18} strokeWidth={active ? 2.3 : 1.8} />
                <span className="text-[10px] mt-0.5 leading-none">{label}</span>
              </button>
            );
          })}
          <button
            onClick={() => setMobileNavOpen(true)}
            className="flex flex-col items-center justify-center min-w-[56px] min-h-[48px] py-1 px-2 rounded-xl text-slate-400 hover:text-slate-600 font-medium transition-all cursor-pointer"
          >
            <Menu size={18} strokeWidth={1.8} />
            <span className="text-[10px] mt-0.5 leading-none">More</span>
          </button>
        </nav>
      </div>

      {/* Global Modals and Notifications Drawer */}
      <ToastContainer />
      <NewRequestModal />
      <RequestDetailsModal />
      <EditRequestModal />
      <BlockModifyModal />
      <ConflictModal />
      <NotificationsDrawer />
      <ActivityLogModal />
      <ResetDemoDialog />
    </div>
  );
}

function AppWithPhase() {
  const { user } = useApp();

  const [phase, setPhase] = useState<AppPhase>(() => {
    const savedPhase = loadFromStorage<AppPhase>(STORAGE_KEYS.APP_PHASE, 'welcome');
    // If user is already stored from previous session, jump directly to app
    const savedUser = loadFromStorage(STORAGE_KEYS.USER, null);
    if (savedUser) return 'app';
    return savedPhase;
  });

  const [loginRole, setLoginRole] = useState('Block Planner');

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.APP_PHASE, phase);
  }, [phase]);

  // If user logs out, go to landing or login
  useEffect(() => {
    if (!user && phase === 'app') {
      setPhase('login');
    }
  }, [user, phase]);

  if (phase === 'welcome') {
    return <WelcomeAnimation onComplete={() => setPhase('landing')} />;
  }

  if (phase === 'landing') {
    return <LandingPage onLogin={() => setPhase('login')} />;
  }

  if (phase === 'login') {
    return (
      <LoginPage
        onSuccess={(role) => {
          setLoginRole(role);
          setPhase('post-login');
        }}
        onBack={() => setPhase('landing')}
      />
    );
  }

  if (phase === 'post-login') {
    return (
      <PostLoginTransition
        role={loginRole}
        onComplete={() => setPhase('app')}
      />
    );
  }

  return <MainAppShell />;
}

export default function App() {
  return (
    <AppProvider>
      <AppWithPhase />
    </AppProvider>
  );
}
