'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const Toaster: React.FC = () => {
  const { toasts, removeToast } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => {
        const isSuccess = toast.type === 'success';
        const isWarning = toast.type === 'warning';
        const isError = toast.type === 'error';

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto p-3.5 rounded-xl border shadow-xl flex items-start gap-3 transition-all duration-300 animate-in slide-in-from-bottom-3 ${
              isSuccess
                ? 'bg-emerald-950/95 border-emerald-700 text-white'
                : isWarning
                ? 'bg-amber-950/95 border-amber-700 text-white'
                : isError
                ? 'bg-red-950/95 border-red-700 text-white'
                : 'bg-indigo-950/95 border-indigo-700 text-white'
            }`}
          >
            <div className="flex-shrink-0 mt-0.5">
              {isSuccess && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
              {isWarning && <AlertCircle className="w-4 h-4 text-amber-400" />}
              {isError && <AlertCircle className="w-4 h-4 text-red-400" />}
              {!isSuccess && !isWarning && !isError && <Info className="w-4 h-4 text-saffron-400" />}
            </div>

            <div className="flex-1 text-xs">
              <h5 className="font-bold text-white">{toast.title}</h5>
              {toast.message && (
                <p className="text-sand-300 text-[11px] mt-0.5 leading-snug">{toast.message}</p>
              )}
            </div>

            <button
              onClick={() => removeToast(toast.id)}
              className="text-sand-400 hover:text-white p-1 rounded-md transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
