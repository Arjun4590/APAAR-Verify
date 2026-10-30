import React from 'react';
import { useDemoSession } from '../../context/DemoSessionContext';
import { CheckCheck, X, AlertTriangle, AlertCircle, Info, CheckCircle2 } from 'lucide-react';

export const NotificationPanel: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { notifications, markNotificationsAsRead } = useDemoSession();

  return (
    <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in zoom-in-95 duration-100">
      <div className="px-4 py-2.5 border-b border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h4 className="text-sm font-semibold text-slate-900">Notifications</h4>
          <span className="text-xs px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 font-medium">
            {notifications.filter(n => !n.read).length} new
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={markNotificationsAsRead}
            className="text-xs text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1"
          >
            <CheckCheck className="w-3.5 h-3.5" /> Mark read
          </button>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="max-h-80 overflow-y-auto divide-y divide-slate-100">
        {notifications.map(notif => {
          const icon = {
            danger: <AlertCircle className="w-4 h-4 text-red-600" />,
            warning: <AlertTriangle className="w-4 h-4 text-amber-600" />,
            info: <Info className="w-4 h-4 text-blue-600" />,
            success: <CheckCircle2 className="w-4 h-4 text-teal-600" />
          }[notif.type];

          return (
            <div
              key={notif.id}
              className={`p-3.5 flex gap-3 hover:bg-slate-50 transition-colors ${
                notif.read ? 'opacity-70' : 'bg-blue-50/20'
              }`}
            >
              <div className="shrink-0 mt-0.5">{icon}</div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-slate-900">{notif.title}</p>
                <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">{notif.message}</p>
                <p className="text-[10px] text-slate-400 mt-1">{notif.timestamp}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

