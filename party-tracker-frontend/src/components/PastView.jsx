import React from 'react';

export default function PastView() {
    return (
        <div className="max-w-xl mx-auto p-4 space-y-4 pb-24 text-center">
            <h2 className="text-2xl font-black text-white mb-2">📜 Past Games</h2>
            <p className="text-slate-400 text-sm mb-6">Historia rozegranych mini-gier i rund</p>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-slate-400">
                Brak historycznych gier w tej sesji. Rozpocznij zabawę!
            </div>
        </div>
    );
}