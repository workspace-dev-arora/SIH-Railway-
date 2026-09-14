import { useState } from 'react';
import { Shield, Eye, EyeOff, ChevronLeft, Train, Lock, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';

const NAVY = '#123B66';
const DEEP = '#0B2545';
const BLUE = '#1769AA';
const SAFFRON = '#F28C28';
const GREEN = '#138A4B';

const suggestionChips = [
  { id: 'PLN001', role: 'Block Planner' },
  { id: 'ABC123', role: 'Chief Controller' },
  { id: 'Rahul', role: 'Maintenance Supervisor' },
  { id: 'IR-2026-9', role: 'Field Engineer' },
];

interface Props {
  onSuccess: (role: string, employeeId: string) => void;
  onBack: () => void;
}

export default function LoginPage({ onSuccess, onBack }: Props) {
  const { login } = useApp();
  const [employeeId, setEmployeeId] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [remember, setRemember] = useState(true);
  const [selectedRole, setSelectedRole] = useState('Block Planner');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!employeeId.trim()) {
      setError('Please enter your Employee ID (any value accepted).');
      return;
    }
    if (!password.trim()) {
      setError('Please enter your password (any value accepted).');
      return;
    }

    setError('');
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      const trimmedId = employeeId.trim();
      login(trimmedId, password, selectedRole);
      onSuccess(selectedRole, trimmedId);
    }, 700);
  };

  const handleChipClick = (id: string, role: string) => {
    setEmployeeId(id);
    setPassword('demo123');
    setSelectedRole(role);
    setError('');
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#F7F9FC' }}>
      {/* Header */}
      <header className="border-b border-slate-200 bg-white px-4 sm:px-6 h-14 flex items-center gap-4">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-800 transition-colors p-2 -ml-2 min-h-[44px]"
        >
          <ChevronLeft size={18} />
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
      <div className="flex-1 flex items-center justify-center px-3.5 sm:px-4 py-6 sm:py-8">
        <div className="w-full max-w-sm">
          {/* Card */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-md overflow-hidden">
            {/* Top stripe */}
            <div className="h-1 flex">
              <div className="flex-1" style={{ background: SAFFRON }} />
              <div className="flex-1 bg-white border-y border-slate-200" />
              <div className="flex-1" style={{ background: GREEN }} />
            </div>

            <div className="p-5 sm:p-7">
              {/* Brand */}
              <div className="text-center mb-6">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-sm"
                  style={{ background: `linear-gradient(135deg, ${DEEP}, ${BLUE})` }}
                >
                  <Train size={22} className="text-white" />
                </div>
                <p className="font-black text-xl tracking-widest" style={{ color: NAVY }}>
                  TRACKSYNC
                </p>
                <p className="text-slate-700 font-semibold text-base mt-1">Simulated Portal Sign-In</p>
                <p className="text-slate-400 text-xs mt-1">
                  Type <span className="font-semibold text-slate-600">any Employee ID</span> & password to log in.
                </p>
              </div>

              {/* Quick suggestions chips */}
              <div className="mb-5">
                <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1">
                  <Sparkles size={11} className="text-blue-500" /> Quick fill suggestions:
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {suggestionChips.map((chip) => (
                    <button
                      key={chip.id}
                      type="button"
                      onClick={() => handleChipClick(chip.id, chip.role)}
                      className="text-[11px] px-2.5 py-1 rounded-lg border border-slate-200 bg-slate-50 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700 text-slate-600 font-mono transition-colors"
                    >
                      {chip.id}
                    </button>
                  ))}
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                    Employee ID / Name
                  </label>
                  <input
                    type="text"
                    value={employeeId}
                    onChange={(e) => setEmployeeId(e.target.value)}
                    placeholder="e.g. PLN001, ABC123, Rahul"
                    className="w-full px-3.5 py-2.5 text-sm border border-slate-200 rounded-xl bg-slate-50 focus:outline-none focus:border-blue-400 focus:bg-white transition-colors font-medium"
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
                      placeholder="Any password"
                      className="w-full px-3.5 py-2.5 pr-10 text-sm border border-slate-200 rounded-xl bg-slate-50 focus:outline-none focus:border-blue-400 focus:bg-white transition-colors"
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

                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                    Operational Role
                  </label>
                  <select
                    value={selectedRole}
                    onChange={(e) => setSelectedRole(e.target.value)}
                    className="w-full px-3.5 py-2.5 sm:py-2 text-sm sm:text-xs border border-slate-200 rounded-xl bg-slate-50 focus:outline-none focus:border-blue-400 text-slate-700 font-medium"
                  >
                    <option value="Block Planner">Block Planner (Central Division)</option>
                    <option value="Maintenance Supervisor">Maintenance Supervisor (S&T / Engg)</option>
                    <option value="Field Engineer">Field Engineer (Permanent Way)</option>
                    <option value="Traction Controller">Traction Power Controller (TRD)</option>
                  </select>
                </div>

                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={remember}
                      onChange={(e) => setRemember(e.target.checked)}
                      className="rounded border-slate-300 text-blue-600"
                    />
                    <span className="text-xs text-slate-500">Remember session</span>
                  </label>
                  <span className="text-xs text-blue-600 cursor-default">
                    Simulated auth
                  </span>
                </div>

                {error && (
                  <p className="text-xs text-red-600 text-center bg-red-50 py-2 px-3 rounded-lg border border-red-100">
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 rounded-xl font-bold text-sm text-white hover:opacity-95 transition-all disabled:opacity-70 shadow-sm cursor-pointer"
                  style={{ background: `linear-gradient(135deg, ${DEEP}, ${BLUE})` }}
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Initializing TrackSync Session…
                    </span>
                  ) : (
                    'Enter TrackSync'
                  )}
                </button>
              </form>
            </div>

            {/* Security footer */}
            <div
              className="border-t border-slate-100 px-6 py-2.5 flex items-center justify-center gap-2"
              style={{ background: '#FAFBFC' }}
            >
              <Lock size={11} className="text-slate-400" />
              <span className="text-[10px] text-slate-400 font-medium">
                Prototype demonstration · No backend credentials required
              </span>
            </div>
          </div>

          <p className="text-center text-[10px] text-slate-400 mt-3">
            Smart India Hackathon Prototype · TrackSync Railway Coordination
          </p>
        </div>
      </div>
    </div>
  );
}
