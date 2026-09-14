import { useState } from 'react';
import { Shield, Eye, EyeOff, ChevronLeft, Train, Lock } from 'lucide-react';

const NAVY = '#123B66';
const DEEP = '#0B2545';
const BLUE = '#1769AA';
const SAFFRON = '#F28C28';
const GREEN = '#138A4B';

const roles = [
  { id: 'planner', label: 'Block Planner', initial: 'RK', name: 'R. K. Sharma' },
  { id: 'supervisor', label: 'Maintenance Supervisor', initial: 'AK', name: 'A. Kumar' },
  { id: 'engineer', label: 'Field Engineer', initial: 'PS', name: 'P. Singh' },
];

interface Props {
  onSuccess: (role: string) => void;
  onBack: () => void;
}

export default function LoginPage({ onSuccess, onBack }: Props) {
  const [employeeId, setEmployeeId] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [remember, setRemember] = useState(false);
  const [selectedRole, setSelectedRole] = useState('planner');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleRoleSelect = (roleId: string) => {
    setSelectedRole(roleId);
    if (!employeeId) setEmployeeId('IR-2024-8841');
    if (!password) setPassword('••••••••');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const empId = employeeId.trim() || 'IR-2024-8841';
    setError('');
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      const role = roles.find((r) => r.id === selectedRole);
      onSuccess(role?.label || 'Block Planner');
    }, 1200);
  };

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: '#F7F9FC' }}
    >
      {/* Header */}
      <header className="border-b border-slate-200 bg-white px-6 h-14 flex items-center gap-4">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-800 transition-colors"
        >
          <ChevronLeft size={16} />
          Back
        </button>
        <div className="flex items-center gap-2 ml-2">
          <div
            className="w-6 h-6 rounded flex items-center justify-center"
            style={{ background: NAVY }}
          >
            <Train size={12} className="text-white" />
          </div>
          <span className="font-black text-sm tracking-wider" style={{ color: NAVY }}>
            TRACKSYNC
          </span>
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-sm">
          {/* Card */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            {/* Top stripe */}
            <div className="h-1 flex">
              <div className="flex-1" style={{ background: SAFFRON }} />
              <div className="flex-1 bg-white border-y border-slate-200" />
              <div className="flex-1" style={{ background: GREEN }} />
            </div>

            <div className="p-8">
              {/* Brand */}
              <div className="text-center mb-7">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-sm"
                  style={{ background: `linear-gradient(135deg, ${DEEP}, ${BLUE})` }}
                >
                  <Train size={22} className="text-white" />
                </div>
                <p className="font-black text-xl tracking-widest" style={{ color: NAVY }}>
                  TRACKSYNC
                </p>
                <p className="text-slate-700 font-semibold text-base mt-1">Welcome back</p>
                <p className="text-slate-400 text-xs mt-1">
                  Sign in to continue to your railway operations workspace.
                </p>
              </div>

              {/* Demo role switcher */}
              <div className="mb-6">
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  Demo Account
                </p>
                <div className="space-y-1.5">
                  {roles.map((r) => (
                    <button
                      key={r.id}
                      type="button"
                      onClick={() => handleRoleSelect(r.id)}
                      className="w-full flex items-center gap-3 p-2.5 rounded-xl border transition-all text-left"
                      style={
                        selectedRole === r.id
                          ? { borderColor: BLUE, background: BLUE + '08' }
                          : { borderColor: '#E2E8F0', background: '#FAFAFA' }
                      }
                    >
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                        style={{ background: selectedRole === r.id ? NAVY : '#94A3B8' }}
                      >
                        {r.initial}
                      </div>
                      <div>
                        <p className="text-sm font-semibold" style={{ color: selectedRole === r.id ? NAVY : '#374151' }}>
                          {r.name}
                        </p>
                        <p className="text-[10px] text-slate-400">{r.label}</p>
                      </div>
                      {selectedRole === r.id && (
                        <div
                          className="ml-auto w-4 h-4 rounded-full flex items-center justify-center"
                          style={{ background: BLUE }}
                        >
                          <div className="w-1.5 h-1.5 rounded-full bg-white" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                    Employee ID
                  </label>
                  <input
                    type="text"
                    value={employeeId}
                    onChange={(e) => setEmployeeId(e.target.value)}
                    placeholder="e.g. IR-2024-8841"
                    className="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-xl bg-slate-50 focus:outline-none focus:border-blue-400 focus:bg-white transition-colors"
                    autoComplete="username"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPass ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full px-4 py-2.5 pr-10 text-sm border border-slate-200 rounded-xl bg-slate-50 focus:outline-none focus:border-blue-400 focus:bg-white transition-colors"
                      autoComplete="current-password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPass(!showPass)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                    >
                      {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={remember}
                      onChange={(e) => setRemember(e.target.checked)}
                      className="rounded border-slate-300"
                    />
                    <span className="text-xs text-slate-500">Remember this device</span>
                  </label>
                  <button type="button" className="text-xs hover:underline" style={{ color: BLUE }}>
                    Need help signing in?
                  </button>
                </div>

                {error && (
                  <p className="text-xs text-red-600 text-center bg-red-50 py-2 rounded-lg border border-red-100">
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 rounded-xl font-bold text-sm text-white hover:opacity-90 transition-opacity disabled:opacity-70 shadow-sm"
                  style={{ background: `linear-gradient(135deg, ${DEEP}, ${BLUE})` }}
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Signing in…
                    </span>
                  ) : (
                    'Sign In'
                  )}
                </button>
              </form>
            </div>

            {/* Security footer */}
            <div
              className="border-t border-slate-100 px-6 py-3 flex items-center justify-center gap-2"
              style={{ background: '#FAFBFC' }}
            >
              <Lock size={11} className="text-slate-400" />
              <span className="text-[10px] text-slate-400 font-medium">
                Authorized railway personnel only
              </span>
            </div>
          </div>

          <p className="text-center text-[10px] text-slate-400 mt-4">
            Prototype — Illustrative scenario. Not connected to IR systems.
          </p>
        </div>
      </div>
    </div>
  );
}
