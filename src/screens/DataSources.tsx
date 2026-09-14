import { useState } from 'react';
import { Database, CheckCircle, RefreshCw, AlertCircle, Clock, BarChart3, Activity } from 'lucide-react';
import { dataSources } from '../data/mockData';

const NAVY = '#123B66';
const GREEN = '#138A4B';
const SAFFRON = '#F28C28';
const BLUE = '#1769AA';

export default function DataSources() {
  const [syncing, setSyncing] = useState<string | null>(null);

  const handleSync = (id: string) => {
    setSyncing(id);
    setTimeout(() => setSyncing(null), 2000);
  };

  return (
    <div className="p-6 max-w-[1200px] space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold" style={{ color: NAVY }}>
            Data Sources
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">Conceptual system integrations — simulated data only</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-amber-200 bg-amber-50">
          <AlertCircle size={13} className="text-amber-600" />
          <span className="text-xs font-medium text-amber-700">
            Representative / Simulated Data — Not connected to live Indian Railways systems
          </span>
        </div>
      </div>

      {/* Overview stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Connected Sources', value: '3', color: GREEN, icon: CheckCircle },
          { label: 'Total Records', value: '53,373', color: NAVY, icon: Database },
          { label: 'Avg. Data Health', value: '93.3%', color: BLUE, icon: Activity },
          { label: 'Last Full Sync', value: '8 min ago', color: SAFFRON, icon: Clock },
        ].map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="bg-white rounded-xl border border-slate-200 shadow-sm p-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: s.color + '15' }}>
                  <Icon size={16} style={{ color: s.color }} />
                </div>
                <div>
                  <p className="text-lg font-bold" style={{ color: s.color }}>{s.value}</p>
                  <p className="text-xs text-slate-500">{s.label}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Source Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {dataSources.map((ds) => {
          const isConnected = ds.status === 'connected';
          const isSyncing = syncing === ds.id || ds.status === 'syncing';
          return (
            <div
              key={ds.id}
              className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden"
            >
              <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: NAVY + '12' }}
                  >
                    <Database size={18} style={{ color: NAVY }} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-sm" style={{ color: NAVY }}>
                        {ds.id}
                      </span>
                      <div
                        className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold"
                        style={
                          isSyncing
                            ? { background: SAFFRON + '20', color: SAFFRON }
                            : isConnected
                            ? { background: GREEN + '20', color: GREEN }
                            : { background: '#FEE2E2', color: '#DC2626' }
                        }
                      >
                        {isSyncing ? (
                          <>
                            <RefreshCw size={9} className="animate-spin" />
                            Syncing
                          </>
                        ) : isConnected ? (
                          <>
                            <div className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
                            Connected
                          </>
                        ) : (
                          'Disconnected'
                        )}
                      </div>
                    </div>
                    <p className="text-sm font-semibold text-slate-700 mt-0.5">{ds.name}</p>
                  </div>
                </div>
                <button
                  onClick={() => handleSync(ds.id)}
                  disabled={isSyncing}
                  className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors disabled:opacity-50"
                  style={{ color: NAVY }}
                >
                  <RefreshCw size={12} className={isSyncing ? 'animate-spin' : ''} />
                  {isSyncing ? 'Syncing…' : 'Sync Now'}
                </button>
              </div>

              <div className="p-5 space-y-4">
                <p className="text-sm text-slate-600">{ds.description}</p>

                <div className="grid grid-cols-3 gap-4">
                  {[
                    { label: 'Last Sync', value: ds.lastSync, icon: Clock },
                    { label: 'Records', value: ds.records, icon: Database },
                    { label: 'Data Health', value: `${ds.health}%`, icon: Activity },
                  ].map((m) => {
                    const Icon = m.icon;
                    return (
                      <div key={m.label} className="text-center p-3 rounded-lg bg-slate-50">
                        <Icon size={13} className="mx-auto mb-1 text-slate-400" />
                        <p className="text-sm font-bold" style={{ color: NAVY }}>{m.value}</p>
                        <p className="text-[10px] text-slate-400 mt-0.5">{m.label}</p>
                      </div>
                    );
                  })}
                </div>

                {/* Health Bar */}
                <div>
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="text-slate-500 font-medium">Data Health</span>
                    <span className="font-bold" style={{ color: ds.health >= 90 ? GREEN : ds.health >= 75 ? SAFFRON : '#DC2626' }}>
                      {ds.health}%
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2">
                    <div
                      className="h-2 rounded-full transition-all"
                      style={{
                        width: `${ds.health}%`,
                        background: ds.health >= 90 ? GREEN : ds.health >= 75 ? SAFFRON : '#DC2626',
                      }}
                    />
                  </div>
                </div>

                {/* Data types */}
                <div>
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Data Fields</p>
                  <div className="flex flex-wrap gap-1.5">
                    {(ds.id === 'TMS'
                      ? ['Train Schedules', 'Movement Orders', 'Track Occupancy', 'Speed Restrictions', 'Platform Data']
                      : ds.id === 'SMMS'
                      ? ['Signal Health', 'Maintenance History', 'Fault Reports', 'Inspection Records']
                      : ds.id === 'TDMS'
                      ? ['OHE Data', 'Power Supply', 'Fault Records', 'TSS Status']
                      : ['Block Utilization', 'Performance Metrics', 'Division Reports', 'Asset Register']
                    ).map((f) => (
                      <span key={f} className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-500">
                        {f}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Integration Architecture Note */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
        <h3 className="font-semibold text-sm mb-3" style={{ color: NAVY }}>
          Conceptual Integration Architecture
        </h3>
        <div className="flex items-center gap-3 flex-wrap">
          {['TMS', 'SMMS', 'TDMS', 'COA'].map((s, i) => (
            <div key={s} className="flex items-center gap-3">
              <div
                className="px-4 py-2 rounded-lg border-2 text-sm font-bold font-mono"
                style={{ borderColor: NAVY, color: NAVY, background: NAVY + '08' }}
              >
                {s}
              </div>
              {i < 3 && (
                <div className="flex flex-col items-center gap-0.5">
                  <div className="text-[10px] text-slate-400">API / ETL</div>
                  <div className="w-8 h-0.5 bg-slate-300" />
                </div>
              )}
            </div>
          ))}
          <div className="flex items-center gap-3">
            <div className="flex flex-col items-center gap-0.5">
              <div className="text-[10px] text-slate-400">→</div>
              <div className="w-8 h-0.5 bg-slate-300" />
            </div>
            <div
              className="px-4 py-2 rounded-lg text-sm font-bold text-white"
              style={{ background: NAVY }}
            >
              TrackSync AI Engine
            </div>
          </div>
        </div>
        <p className="text-xs text-slate-400 mt-4 italic">
          This is a conceptual prototype integration diagram. TrackSync does not connect to or access live Indian Railways
          operational systems. All data shown is simulated for demonstration purposes.
        </p>
      </div>
    </div>
  );
}
