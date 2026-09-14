import React from 'react';
import { useApp } from '../context/AppContext';
import { X, Bell, CheckCheck, Trash2, ExternalLink } from 'lucide-react';

const NAVY = '#123B66';

export default function NotificationsDrawer() {
  const {
    isNotificationsOpen,
    setIsNotificationsOpen,
    notifications,
    markNotificationRead,
    markAllNotificationsRead,
    clearNotifications,
    setScreen,
  } = useApp();

  if (!isNotificationsOpen) return null;

  return (
    <div className="fixed inset-0 z-[120] flex justify-end bg-slate-900/40 backdrop-blur-xs">
      <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-200">
        {/* Header */}
        <div className="px-4 sm:px-5 py-3.5 sm:py-4 border-b border-slate-200 flex items-center justify-between" style={{ background: NAVY }}>
          <div className="flex items-center gap-2 text-white">
            <Bell size={18} />
            <h3 className="font-bold text-sm">Notifications</h3>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/20 text-white">
              {notifications.filter((n) => !n.read).length} unread
            </span>
          </div>
          <button
            onClick={() => setIsNotificationsOpen(false)}
            className="text-white/70 hover:text-white w-10 h-10 -mr-1 rounded-lg transition-colors flex items-center justify-center flex-shrink-0"
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        {/* Toolbar */}
        <div className="px-4 sm:px-5 py-2 bg-slate-50 border-b border-slate-200 flex items-center justify-between text-xs">
          <button
            onClick={markAllNotificationsRead}
            className="text-slate-600 hover:text-blue-600 font-medium flex items-center gap-1.5 transition-colors min-h-[40px] px-2 -ml-2 rounded-lg"
          >
            <CheckCheck size={14} />
            Mark all read
          </button>
          <button
            onClick={clearNotifications}
            className="text-slate-500 hover:text-red-600 font-medium flex items-center gap-1.5 transition-colors min-h-[40px] px-2 -mr-2 rounded-lg"
          >
            <Trash2 size={13} />
            Clear all
          </button>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
          {notifications.length === 0 ? (
            <div className="py-20 text-center text-slate-400 text-xs">
              No notifications at present.
            </div>
          ) : (
            notifications.map((notif) => (
              <div
                key={notif.id}
                onClick={() => {
                  markNotificationRead(notif.id);
                  if (notif.linkScreen) {
                    setScreen(notif.linkScreen);
                    setIsNotificationsOpen(false);
                  }
                }}
                className={`p-4 hover:bg-slate-50 cursor-pointer transition-colors flex items-start gap-3 ${
                  !notif.read ? 'bg-blue-50/40' : ''
                }`}
              >
                <div
                  className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${
                    !notif.read ? 'bg-blue-600' : 'bg-transparent'
                  }`}
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <h4 className={`text-xs ${!notif.read ? 'font-bold text-slate-900' : 'font-semibold text-slate-700'}`}>
                      {notif.title}
                    </h4>
                    <span className="text-[10px] text-slate-400 whitespace-nowrap">{notif.timestamp}</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">{notif.message}</p>
                  {notif.linkScreen && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-blue-600 mt-1.5">
                      Open in {notif.linkScreen} <ExternalLink size={10} />
                    </span>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
