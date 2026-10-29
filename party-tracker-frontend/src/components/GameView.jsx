import React from 'react';
import { Gamepad2, AlertCircle, Target, Info } from 'lucide-react';

export default function GameView({ activeGame }) {
    if (!activeGame) {
        return (
            <div className="max-w-xl mx-auto p-4 text-center py-16 border border-dashed border-slate-800 rounded-2xl">
                <AlertCircle className="w-12 h-12 text-slate-600 mx-auto mb-2" />
                <p className="text-slate-400 font-medium">Brak aktywnej gry w tym momencie.</p>
                <p className="text-slate-600 text-sm mt-1">Czekaj, aż Host wybierze grę w panelu Admina!</p>
            </div>
        );
    }

    return (
        <div className="max-w-xl mx-auto p-4 space-y-6 pb-24">
            <div className="text-center">
                <span className="text-xs font-bold uppercase tracking-widest text-purple-400 bg-purple-500/10 px-3 py-1 rounded-full border border-purple-500/20 inline-flex items-center gap-1.5">
                    <Gamepad2 className="w-3.5 h-3.5" /> Current Party Game
                </span>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
                <div className="absolute top-4 right-4 bg-amber-500/10 text-amber-400 text-xs font-bold px-3 py-1 rounded-lg border border-amber-500/20 uppercase">
                    AKTYWNA
                </div>

                <div className="flex items-center gap-3 mb-4">
                    <span className="text-purple-400 bg-purple-500/10 p-2.5 rounded-xl border border-purple-500/20 flex items-center justify-center">
                        <Target className="w-6 h-6" />
                    </span>
                    <h2 className="text-2xl font-bold text-white">{activeGame.title}</h2>
                </div>

                <p className="text-slate-300 text-sm leading-relaxed mb-6">
                    {activeGame.description || 'Brak opisu dla tej gry.'}
                </p>

                {activeGame.rules && (
                    <div className="space-y-4">
                        <div className="bg-slate-800/60 border border-slate-700/50 rounded-xl p-4">
                            <h3 className="text-xs font-bold uppercase tracking-wider text-purple-400 mb-1 flex items-center gap-1.5">
                                <Info className="w-4 h-4" /> Game Rules
                            </h3>
                            <p className="text-slate-200 text-sm whitespace-pre-line">{activeGame.rules}</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}