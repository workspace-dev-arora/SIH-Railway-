import React, { useState } from 'react';
import { Database, CheckCircle, RefreshCw, AlertCircle, Clock, Activity, ShieldAlert, Cpu } from 'lucide-react';
import { useApp } from '../context/AppContext';

const NAVY = '#123B66';
const GREEN = '#138A4B';
const SAFFRON = '#F28C28';
const BLUE = '#1769AA';

export default function DataSources() {
  const { dataSources, syncDataSource, syncingSourceId } = useApp();

  const [syncStage, setSyncStage] = useState<Record<string, string>>({});

  const handleSyncClick = (id: string) => {
    setSyncStage((prev) => ({ ...prev, [id]: 'Connecting...' }));

    setTimeout(() => {
      setSyncStage((prev) => ({ ...prev, [id]: 'Fetching feeds...' }));
    }, 400);

    setTimeout(() => {
      setSyncStage((prev) => ({ ...prev, [id]: 'Processing telemetry...' }));
    }, 900);

    setTimeout(() => {
      setSyncStage((prev) => ({ ...prev, [id]: 'Synchronized' }));
      syncDataSource(id);
      setTimeout(() => {
        setSyncStage((prev) => {
          const next = { ...prev };
          delete next[id];
          return next;
        });
      }, 1500);
    }, 1400);
  };

  return (
    <div className="p-3.5 sm:p-6 max-w-[1300px] space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3 sm:gap-4">
        <div>
          <h1 className="text-lg sm:text-xl font-bold" style={{ color: NAVY }}>
            Railway Data Systems Integration
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5 leading-snug">
            Ingestion & Synchronization with Indian Railways operational subsystems (Simulated Feeds)
          </p>
        </div>

        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-amber-200 bg-amber-50">
          <AlertCircle size={14} className="text-amber-600 flex-shrink-0" />
          <span className="text-xs font-semibold text-amber-800">
            Prototype / Simulated Integration — Not connected to live Indian Railways operational servers
          </span>
        </div>
      </div>

      {/* Overview stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        {[
          { label: 'Integrated Subsystems', value: `${dataSources.length} Feeds`, color: GREEN, icon: CheckCircle },
          { label: 'Total Ingested Records', value: '53,428', color: NAVY, icon: Database },
          { label: 'Mean Data Health', value: '94.8%', color: BLUE, icon: Activity },
          { label: 'Last Cycle Sync', value: 'Live Feed', color: SAFFRON, icon: Clock },
        ].map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="bg-white rounded-2xl border border-slate-200 shadow-xs p-4 flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: s.color + '15' }}>
                <Icon size={18} style={{ color: s.color }} />
              </div>
              <div>
                <p className="text-lg font-bold" style={{ color: s.color }}>{s.value}</p>
                <p className="text-xs text-slate-500 font-medium">{s.label}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Source Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {dataSources.map((ds) => {
          const isSyncing = syncingSourceId === ds.id || !!syncStage[ds.id];
          const stageText = syncStage[ds.id] || 'Synchronizing…';

          return (
            <div
              key={ds.id}
              className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col justify-between"
            >
              <div>
                <div className="px-4 sm:px-6 py-3.5 sm:py-4 border-b border-slate-100 flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: NAVY + '12' }}
                    >
                      <Database size={20} style={{ color: NAVY }} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-sm" style={{ color: NAVY }}>
                          {ds.id}
                        </span>
                        <div
                          className={`flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                            isSyncing
                              ? 'bg-amber-100 text-amber-800'
                              : ds.status === 'connected'
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {isSyncing ? (
                            <>
                              <RefreshCw size={10} className="animate-spin" />
                              <span>{stageText}</span>
                            </>
                          ) : (
                            <>
                              <div className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                              <span>Connected & Active</span>
                            </>
                          )}
                        </div>
                      </div>
                      <p className="text-xs font-semibold text-slate-700 mt-0.5">{ds.name}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => handleSyncClick(ds.id)}
                    disabled={isSyncing}
                    className="flex items-center justify-center gap-1.5 text-xs font-bold px-3.5 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors disabled:opacity-50 cursor-pointer shadow-xs min-h-[44px]"
                    style={{ color: NAVY }}
                  >
                    <RefreshCw size={13} className={isSyncing ? 'animate-spin text-amber-600' : ''} />
                    <span>{isSyncing ? 'Syncing…' : 'Sync Feed'}</span>
                  </button>
                </div>

                <div className="p-4 sm:p-6 space-y-4">
                  <p className="text-xs text-slate-600 leading-relaxed">{ds.description}</p>

                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { label: 'Last Synced', value: ds.lastSync, icon: Clock },
                      { label: 'Synced Records', value: ds.records, icon: Database },
                      { label: 'Telemetry Health', value: `${ds.health}%`, icon: Activity },
                    ].map((m) => {
                      const Icon = m.icon;
                      return (
                        <div key={m.label} className="text-center p-3 rounded-xl bg-slate-50 border border-slate-100">
                          <Icon size={14} className="mx-auto mb-1 text-slate-400" />
                          <p className="text-xs font-bold font-mono text-slate-800">{m.value}</p>
                          <p className="text-[10px] text-slate-400 mt-0.5 font-medium">{m.label}</p>
                        </div>
                      );
                    })}
                  </div>

                  {/* Health Bar */}
                  <div>
                    <div className="flex justify-between text-xs mb-1 font-semibold">
                      <span className="text-slate-500 text-[11px]">Subsystem Reliability Score</span>
                      <span style={{ color: ds.health >= 90 ? GREEN : SAFFRON }}>
                        {ds.health}%
                      </span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                      <div
                        className="h-2 rounded-full transition-all duration-700"
                        style={{
                          width: `${ds.health}%`,
                          background: ds.health >= 90 ? GREEN : SAFFRON,
                        }}
                      />
                    </div>
                  </div>

                  {/* Schema fields */}
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                      Ingested Data Attributes
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {(ds.id === 'TMS'
                        ? ['Train Schedules', 'Movement Timetables', 'Track Block Occupancy', 'Speed Restrictions', 'Loop Lines']
                        : ds.id === 'SMMS'
                        ? ['Signal Relay Status', 'Point Machine Health', 'Interlocking Logs', 'Fault Records']
                        : ds.id === 'TDMS'
                        ? ['OHE Power Feeds', 'TSS Isolation Zones', 'Catenary Stagger', 'Substation Feeds']
                        : ['Division Block KPIs', 'Asset Availability Index', 'Operations Analytics', 'Historical Trends']
                      ).map((f) => (
                        <span key={f} className="text-[10px] font-medium px-2 py-0.5 rounded-lg bg-slate-100 text-slate-600">
                          {f}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="px-6 py-2.5 bg-slate-50 border-t border-slate-100 text-[10px] text-slate-400 font-mono">
                API Protocol: Simulated REST/Websocket Feed · Mock Endpoint: /api/v1/telemetry/{ds.id.toLowerCase()}
              </div>
            </div>
          );
        })}
      </div>

      {/* Architectural Concept Notice */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-3">
        <div className="flex items-center gap-2 text-slate-800">
          <Cpu size={18} style={{ color: NAVY }} />
          <h3 className="font-bold text-sm" style={{ color: NAVY }}>
            Prototype Architectural Blueprint
          </h3>
        </div>
        <p className="text-xs text-slate-600 leading-relaxed">
          In a production deployment, TrackSync consumes secure message queues and RESTful APIs from Indian Railways enterprise systems (CRIS TMS, SMMS, TDMS, and COA). In this SIH demonstration prototype, all telemetry feeds are simulated in-memory to provide realistic operational interaction.
        </p>
      </div>
    </div>
  );
}
