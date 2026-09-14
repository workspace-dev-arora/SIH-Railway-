import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  LineChart, Line, PieChart, Pie, Cell, AreaChart, Area, ResponsiveContainer,
} from 'recharts';
import { useApp } from '../context/AppContext';
import { TrendingDown, CheckCircle, BarChart3, Clock, AlertTriangle, Users, Zap } from 'lucide-react';

const NAVY = '#123B66';
const SAFFRON = '#F28C28';
const GREEN = '#138A4B';
const BLUE = '#1769AA';
const RED = '#DC2626';

const DEPT_COLORS = [BLUE, SAFFRON, GREEN];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-xl p-3 text-xs">
      <p className="font-bold text-slate-800 mb-1.5">{label}</p>
      {payload.map((p: any) => (
        <div key={p.dataKey || p.name} className="flex items-center gap-2 py-0.5">
          <div className="w-2 h-2 rounded-full" style={{ background: p.color }} />
          <span className="text-slate-500">{p.name || p.dataKey}:</span>
          <span className="font-bold font-mono" style={{ color: p.color }}>{p.value}</span>
        </div>
      ))}
    </div>
  );
};

export default function Analytics() {
  const { requests, blocks, approvedBlocks, metrics } = useApp();

  const isB014Approved = approvedBlocks.has('B014');

  // Dynamic KPI calculations
  const totalRequests = requests.length;
  const completedRequests = requests.filter((r) => r.status === 'Completed').length;
  const approvedRequests = requests.filter((r) => r.status === 'Approved').length;
  const pendingRequests = requests.filter((r) => r.status === 'Pending').length;

  const totalBlocks = blocks.length;
  const approvedBlocksCount = blocks.filter((b) => b.status === 'approved').length;

  // Dynamic chart data derived from state
  const beforeAfterData = [
    { name: 'Blocks Req.', before: 12, after: isB014Approved ? 7 : 9 },
    { name: 'Possession (hrs)', before: 28, after: isB014Approved ? 17 : 21 },
    { name: 'Conflicts', before: 9, after: metrics.trainConflicts },
    { name: 'Coordinated', before: 0, after: isB014Approved ? 8 : 5 },
  ];

  const blockHoursTrend = [
    { month: 'Apr', before: 32, after: 21 },
    { month: 'May', before: 28, after: 18 },
    { month: 'Jun', before: 35, after: 22 },
    { month: 'Jul', before: 30, after: 19 },
    { month: 'Aug', before: 27, after: 16 },
    { month: 'Sep', before: 28, after: isB014Approved ? 17 : 21 },
  ];

  const engRequests = requests.filter((r) => r.department === 'Engineering').length;
  const stRequests = requests.filter((r) => r.department === 'Signal & Telecom').length;
  const trdRequests = requests.filter((r) => r.department === 'Traction').length;

  const engDone = requests.filter((r) => r.department === 'Engineering' && r.status !== 'Pending').length;
  const stDone = requests.filter((r) => r.department === 'Signal & Telecom' && r.status !== 'Pending').length;
  const trdDone = requests.filter((r) => r.department === 'Traction' && r.status !== 'Pending').length;

  const departmentWorkload = [
    { name: 'Engineering', tasks: engRequests, completed: engDone },
    { name: 'Signal & Telecom', tasks: stRequests, completed: stDone },
    { name: 'Traction', tasks: trdRequests, completed: trdDone },
  ];

  const conflictTrend = [
    { month: 'Apr', conflicts: 11 },
    { month: 'May', conflicts: 9 },
    { month: 'Jun', conflicts: 13 },
    { month: 'Jul', conflicts: 8 },
    { month: 'Aug', conflicts: 7 },
    { month: 'Sep', conflicts: metrics.trainConflicts },
  ];

  const kpis = [
    { label: 'Total Requisitions', value: totalRequests.toString(), delta: `${pendingRequests} pending`, positive: true, icon: BarChart3 },
    { label: 'Approved Blocks', value: approvedBlocksCount.toString(), delta: isB014Approved ? 'B014 Active' : 'Pending planner', positive: isB014Approved, icon: CheckCircle },
    { label: 'Block Utilization', value: `${isB014Approved ? 78 : 66}%`, delta: isB014Approved ? '+17%' : '+5%', positive: true, icon: BarChart3 },
    { label: 'Block Hours Saved', value: `${metrics.blockHoursSaved} hrs`, delta: '−11 hrs vs manual', positive: true, icon: Clock },
    { label: 'Asset Availability', value: `${metrics.assetAvailability}%`, delta: '+1.8% baseline', positive: true, icon: CheckCircle },
    { label: 'Train Conflicts', value: metrics.trainConflicts.toString(), delta: '−6 reduction', positive: true, icon: TrendingDown },
    { label: 'Coordinated Tasks', value: `${isB014Approved ? 8 : 5}`, delta: 'Cross-dept bundling', positive: true, icon: Users },
  ];

  return (
    <div className="p-3.5 sm:p-6 max-w-[1350px] space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3 sm:gap-4">
        <div>
          <h1 className="text-lg sm:text-xl font-bold" style={{ color: NAVY }}>
            Operational Analytics & Efficiency Insights
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5 leading-snug">
            Central Division performance metrics derived from real-time maintenance and corridor state
          </p>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-amber-200 bg-amber-50">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
          <span className="text-xs font-semibold text-amber-800">
            Illustrative prototype scenario · Demonstration telemetry
          </span>
        </div>
      </div>

      {/* Dynamic KPI Row */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-7 gap-2.5 sm:gap-3">
        {kpis.map((k) => {
          const Icon = k.icon;
          return (
            <div key={k.label} className="bg-white rounded-2xl border border-slate-200 p-3 sm:p-4 shadow-xs text-center flex flex-col justify-between">
              <div>
                <Icon size={16} className="mx-auto mb-1.5 text-blue-700" />
                <p className="text-xl sm:text-2xl font-black" style={{ color: NAVY }}>
                  {k.value}
                </p>
                <p className="text-[10px] sm:text-[11px] font-semibold text-slate-500 mt-1 leading-tight">{k.label}</p>
              </div>
              <div>
                <span
                  className="text-[9px] sm:text-[10px] font-bold mt-1.5 inline-block px-1.5 py-0.5 rounded-md"
                  style={{
                    background: k.positive ? GREEN + '15' : RED + '15',
                    color: k.positive ? GREEN : RED,
                  }}
                >
                  {k.delta}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6">
        {/* Before vs AI Optimization */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 sm:p-6 space-y-4 overflow-hidden">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div>
              <h3 className="font-bold text-sm" style={{ color: NAVY }}>
                Conventional vs AI Planning Impact
              </h3>
              <p className="text-xs text-slate-400">Comparing separate departmental blocks vs TrackSync coordination</p>
            </div>
            <div className="flex gap-3 text-xs">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-sm bg-slate-300" />
                <span className="text-slate-500">Manual</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-sm" style={{ background: NAVY }} />
                <span className="text-slate-700 font-bold">TrackSync AI</span>
              </div>
            </div>
          </div>

          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={beforeAfterData} barCategoryGap="30%">
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
              <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#64748B' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="before" name="Manual Baseline" fill="#CBD5E1" radius={[4, 4, 0, 0]} />
              <Bar dataKey="after" name="TrackSync AI" fill={NAVY} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Block Hours Trend */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 sm:p-6 space-y-4 overflow-hidden">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div>
              <h3 className="font-bold text-sm" style={{ color: NAVY }}>
                Corridor Possession Hours — 6 Month Trend
              </h3>
              <p className="text-xs text-slate-400">Total track occupation hours required per division cycle</p>
            </div>
          </div>

          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={blockHoursTrend}>
              <defs>
                <linearGradient id="gradBefore" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#CBD5E1" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#CBD5E1" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gradAfter" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={NAVY} stopOpacity={0.3} />
                  <stop offset="95%" stopColor={NAVY} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#64748B' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="before" name="Conventional (hrs)" stroke="#94A3B8" strokeWidth={2} fill="url(#gradBefore)" />
              <Area type="monotone" dataKey="after" name="AI Coordinated (hrs)" stroke={NAVY} strokeWidth={2.5} fill="url(#gradAfter)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Train Conflicts Trend */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 sm:p-6 space-y-4 overflow-hidden">
          <div>
            <h3 className="font-bold text-sm" style={{ color: NAVY }}>
              Train Schedule Conflicts Resolved
            </h3>
            <p className="text-xs text-slate-400">Reduction in freight and passenger train path interference</p>
          </div>

          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={conflictTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#64748B' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="conflicts"
                name="Conflicts"
                stroke={RED}
                strokeWidth={2.5}
                dot={{ fill: RED, r: 4 }}
                activeDot={{ r: 6, fill: RED }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Department Workload Distribution */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
          <div>
            <h3 className="font-bold text-sm" style={{ color: NAVY }}>
              Department Maintenance Load & Fulfillment
            </h3>
            <p className="text-xs text-slate-400">Live counts across Engineering, S&T, and Traction queues</p>
          </div>

          <div className="flex gap-6 items-center flex-wrap">
            <ResponsiveContainer width={160} height={160}>
              <PieChart>
                <Pie
                  data={departmentWorkload}
                  cx="50%"
                  cy="50%"
                  innerRadius={45}
                  outerRadius={75}
                  dataKey="tasks"
                  paddingAngle={4}
                >
                  {departmentWorkload.map((_, index) => (
                    <Cell key={index} fill={DEPT_COLORS[index]} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>

            <div className="flex-1 min-w-[200px] space-y-3">
              {departmentWorkload.map((dept, i) => {
                const pct = dept.tasks > 0 ? Math.round((dept.completed / dept.tasks) * 100) : 0;
                return (
                  <div key={dept.name} className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 rounded-full" style={{ background: DEPT_COLORS[i] }} />
                        <span className="font-bold text-slate-700">{dept.name}</span>
                      </div>
                      <span className="font-bold font-mono" style={{ color: NAVY }}>
                        {dept.completed}/{dept.tasks} handled
                      </span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2">
                      <div
                        className="h-2 rounded-full transition-all duration-500"
                        style={{ width: `${pct}%`, background: DEPT_COLORS[i] }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
