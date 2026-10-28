import React from 'react';
import { Sparkles } from 'lucide-react';

export default function Navbar({ partyPin, onLogout }) {
    return (
        <header className="bg-slate-900 border-b border-slate-800 px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
                <span className="bg-purple-500/10 border border-purple-500/20 p-2 rounded-xl text-purple-400 flex items-center justify-center">
                    <Sparkles className="w-5 h-5" />
                </span>
                <div>
                    <h1 className="font-black text-lg tracking-wider bg-gradient-to-r from-orange-400 via-purple-400 to-pink-500 bg-clip-text text-transparent">
                        PARTY TRACKER
                    </h1>
                    <p className="text-xs text-slate-400 font-medium tracking-wide">PANEL HOSTA</p>
                </div>
            </div>

            <div className="flex items-center gap-4">
                {partyPin && (
                    <div className="bg-slate-800 border border-purple-500/30 px-3 py-1.5 rounded-xl flex items-center gap-2">
                        <span className="text-xs text-slate-400 uppercase font-bold">PIN:</span>
                        <span className="text-lg font-mono font-black text-purple-400 tracking-wider">{partyPin}</span>
                    </div>
                )}
                <button
                    onClick={onLogout}
                    className="bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-1.5 rounded-lg text-xs font-semibold border border-slate-700 transition cursor-pointer"
                >
                    Wyjdź
                </button>
            </div>
        </header>
    );
}