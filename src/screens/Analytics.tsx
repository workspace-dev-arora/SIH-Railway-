import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  LineChart, Line, PieChart, Pie, Cell, AreaChart, Area, ResponsiveContainer,
} from 'recharts';
import { analyticsData, blockHoursTrend, departmentWorkload, conflictTrend } from '../data/mockData';
import { TrendingDown, CheckCircle, BarChart3, Clock, AlertTriangle, Users, Zap } from 'lucide-react';

const NAVY = '#123B66';
const SAFFRON = '#F28C28';
const GREEN = '#138A4B';
const BLUE = '#1769AA';
const RED = '#DC2626';

const kpis = [
  { label: 'Asset Availability', value: '94.2%', delta: '+1.8%', positive: true, icon: CheckCircle },
  { label: 'Block Utilization', value: '78%', delta: '+12%', positive: true, icon: BarChart3 },
  { label: 'Total Block Hours', value: '17 hrs', delta: '−11 hrs', positive: true, icon: Clock },
  { label: 'Maintenance Completion', value: '87%', delta: '+9%', positive: true, icon: CheckCircle },
  { label: 'Critical Task Completion', value: '91%', delta: '+14%', positive: true, icon: AlertTriangle },
  { label: 'Train Conflicts', value: '3', delta: '−6', positive: true, icon: TrendingDown },
  { label: 'Coordinated Tasks', value: '8', delta: '+8', positive: true, icon: Users },
];

const beforeAfterData = [
  { name: 'Blocks', before: 12, after: 7 },
  { name: 'Block Hours', before: 28, after: 17 },
  { name: 'Conflicts', before: 9, after: 3 },
];

const DEPT_COLORS = [BLUE, SAFFRON, GREEN];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white rounded-lg border border-slate-200 shadow-lg p-3 text-xs">
      <p className="font-semibold text-slate-700 mb-1">{label}</p>
      {payload.map((p: any) => (
        <div key={p.dataKey} className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full" style={{ background: p.color }} />
          <span className="text-slate-500">{p.name || p.dataKey}:</span>
          <span className="font-bold" style={{ color: p.color }}>{p.value}</span>
        </div>
      ))}
    </div>
  );
};

export default function Analytics() {
  return (
    <div className="p-6 max-w-[1300px] space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold" style={{ color: NAVY }}>
            Analytics
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">September 2026 — Central Division</p>
        </div>
        <div className="flex gap-2">
          <span className="text-xs bg-amber-50 border border-amber-200 text-amber-700 px-3 py-1.5 rounded-full font-medium">
            Illustrative prototype scenario — not real IR statistics
          </span>
        </div>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-7 gap-3">
        {kpis.map((k) => {
          const Icon = k.icon;
          return (
            <div key={k.label} className="bg-white rounded-xl border border-slate-200 p-3 shadow-sm text-center">
              <Icon size={14} className="mx-auto mb-1.5" style={{ color: k.positive ? GREEN : RED }} />
              <p className="text-xl font-bold" style={{ color: NAVY }}>
                {k.value}
              </p>
              <p className="text-[10px] text-slate-500 mt-0.5 leading-tight">{k.label}</p>
              <span
                className="text-[10px] font-bold mt-1 inline-block"
                style={{ color: k.positive ? GREEN : RED }}
              >
                {k.delta} vs manual
              </span>
            </div>
          );
        })}
      </div>

      {/* Charts grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Before vs After */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold" style={{ color: NAVY }}>
              Before vs AI Planning Comparison
            </h3>
            <div className="flex gap-3">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-sm" style={{ background: '#CBD5E1' }} />
                <span className="text-xs text-slate-500">Manual</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-sm" style={{ background: NAVY }} />
                <span className="text-xs text-slate-500">AI Optimized</span>
              </div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={beforeAfterData} barCategoryGap="35%">
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
              <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#64748B' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="before" name="Manual" fill="#CBD5E1" radius={[4, 4, 0, 0]} />
              <Bar dataKey="after" name="AI Optimized" fill={NAVY} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Block Hours Trend */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold" style={{ color: NAVY }}>
              Block Hours — 6 Month Trend
            </h3>
            <div className="flex gap-3">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-0.5 bg-slate-300" />
                <span className="text-xs text-slate-500">Manual</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-0.5" style={{ background: NAVY }} />
                <span className="text-xs text-slate-500">AI Optimized</span>
              </div>
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
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#64748B' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="before" name="Manual" stroke="#CBD5E1" strokeWidth={2} fill="url(#gradBefore)" />
              <Area type="monotone" dataKey="after" name="AI Optimized" stroke={NAVY} strokeWidth={2.5} fill="url(#gradAfter)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Conflict Trend */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
          <h3 className="font-semibold mb-4" style={{ color: NAVY }}>
            Train Conflicts — Trend (AI Planning)
          </h3>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={conflictTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#64748B' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="conflicts"
                stroke={RED}
                strokeWidth={2.5}
                dot={{ fill: RED, r: 4 }}
                activeDot={{ r: 6, fill: RED }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Department Workload */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
          <h3 className="font-semibold mb-4" style={{ color: NAVY }}>
            Department Workload
          </h3>
          <div className="flex gap-6 items-center">
            <ResponsiveContainer width={180} height={180}>
              <PieChart>
                <Pie
                  data={departmentWorkload}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  dataKey="tasks"
                  paddingAngle={3}
                >
                  {departmentWorkload.map((_, index) => (
                    <Cell key={index} fill={DEPT_COLORS[index]} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex-1 space-y-3">
              {departmentWorkload.map((dept, i) => (
                <div key={dept.name}>
                  <div className="flex justify-between text-sm mb-1">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full" style={{ background: DEPT_COLORS[i] }} />
                      <span className="text-slate-600 text-xs">{dept.name}</span>
                    </div>
                    <span className="text-xs font-semibold" style={{ color: NAVY }}>
                      {dept.completed}/{dept.tasks}
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2">
                    <div
                      className="h-2 rounded-full transition-all"
                      style={{ width: `${(dept.completed / dept.tasks) * 100}%`, background: DEPT_COLORS[i] }}
                    />
                  </div>
                  <p className="text-[10px] text-slate-400 mt-0.5">
                    {Math.round((dept.completed / dept.tasks) * 100)}% completion rate
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Summary Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-100" style={{ background: NAVY }}>
          <h3 className="font-semibold text-white text-sm">Planning Efficiency Summary — September 2026</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50">
                {['Metric', 'Manual Planning', 'AI-Optimized', 'Improvement', 'Trend'].map((h) => (
                  <th key={h} className="px-5 py-3 text-left text-xs font-semibold text-slate-500">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { metric: 'Total Blocks', manual: '12', ai: '7', improvement: '−5 blocks', positive: true },
                { metric: 'Total Block Hours', manual: '28 hrs', ai: '17 hrs', improvement: '−11 hrs', positive: true },
                { metric: 'Train Conflicts', manual: '9', ai: '3', improvement: '−6 conflicts', positive: true },
                { metric: 'Block Utilization', manual: '61%', ai: '78%', improvement: '+17%', positive: true },
                { metric: 'Coordinated Tasks', manual: '0', ai: '8', improvement: '+8 tasks', positive: true },
                { metric: 'Critical Completions', manual: '65%', ai: '91%', improvement: '+26%', positive: true },
              ].map((row, i) => (
                <tr key={row.metric} className={`border-t border-slate-50 ${i % 2 ? 'bg-slate-50/40' : ''}`}>
                  <td className="px-5 py-3 text-sm font-medium text-slate-700">{row.metric}</td>
                  <td className="px-5 py-3 text-sm text-slate-500 font-mono">{row.manual}</td>
                  <td className="px-5 py-3 text-sm font-semibold font-mono" style={{ color: NAVY }}>{row.ai}</td>
                  <td className="px-5 py-3">
                    <span className="text-sm font-bold" style={{ color: row.positive ? GREEN : RED }}>
                      {row.improvement}
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-1">
                      <TrendingDown size={13} style={{ color: GREEN }} />
                      <span className="text-xs text-slate-400">Improving</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
