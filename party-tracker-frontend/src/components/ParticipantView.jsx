import React, { useState } from 'react';
import { getAvatarImage } from '../utils/avatars';
import { Gamepad2, Trophy, Target, AlertCircle, LogOut } from 'lucide-react';

export default function ParticipantView({ players, myPlayerName, onLogout, activeGame }) {
    const [activeTab, setActiveTab] = useState('game');

    const currentPlayer = players.find(p => p.nickname === myPlayerName);
    const myAvatarSrc = getAvatarImage(currentPlayer?.avatar);

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between pb-20">

            {/* Nagłówek uczestnika */}
            <div className="bg-slate-900 border-b border-slate-800 p-4 flex justify-between items-center sticky top-0 z-10 shadow-md">
                <div className="flex items-center gap-3">
                    <span className="bg-purple-500/10 border border-purple-500/20 p-2 rounded-xl flex items-center justify-center">
                        <img src={myAvatarSrc} alt="Mój awatar" className="w-5 h-5 object-contain" />
                    </span>
                    <div>
                        <h2 className="font-bold text-xs text-slate-400">Gracz:</h2>
                        <span className="text-emerald-400 font-extrabold text-base tracking-wide">{myPlayerName}</span>
                    </div>
                </div>
                <button
                    onClick={onLogout}
                    className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-1.5 rounded-xl border border-slate-700 transition cursor-pointer flex items-center gap-1.5"
                >
                    <LogOut className="w-3.5 h-3.5" /> Wyjdź
                </button>
            </div>

            {/* Główna zawartość zależna od wybranej zakładki */}
            <main className="p-4 max-w-xl mx-auto w-full flex-1">

                {/* ZAKŁADKA 1: GRA */}
                {activeTab === 'game' && (
                    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4 animate-fadeIn">
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-bold uppercase tracking-wider text-purple-400 bg-purple-500/10 px-3 py-1 rounded-full border border-purple-500/20 flex items-center gap-1.5">
                                <Gamepad2 className="w-3.5 h-3.5" /> Aktywne Wyzwanie
                            </span>
                            <span className="text-xs text-slate-500 font-medium">Na żywo</span>
                        </div>

                        {activeGame ? (
                            <>
                                <h3 className="text-2xl font-black text-white flex items-center gap-2">
                                    {activeGame.title} <Target className="w-6 h-6 text-purple-400" />
                                </h3>

                                <div className="bg-slate-800/60 border border-slate-700/50 rounded-xl p-4 space-y-2">
                                    <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400">Opis zadania</h4>
                                    <p className="text-slate-200 text-sm leading-relaxed">
                                        {activeGame.description || 'Brak opisu dla tej gry.'}
                                    </p>
                                </div>

                                {activeGame.rules && (
                                    <div className="bg-slate-800/60 border border-slate-700/50 rounded-xl p-4 space-y-2">
                                        <h4 className="text-xs font-bold uppercase tracking-wider text-purple-400">Zasady gry</h4>
                                        <p className="text-slate-200 text-sm leading-relaxed">
                                            {activeGame.rules}
                                        </p>
                                    </div>
                                )}
                            </>
                        ) : (
                            <div className="text-center py-12 text-slate-500">
                                <AlertCircle className="w-12 h-12 text-slate-600 mx-auto mb-2" />
                                <p>Brak aktywnej gry. Czekaj na ruch Hosta!</p>
                            </div>
                        )}

                    </div>
                )}

                {/* ZAKŁADKA 2: RANKING */}
                {activeTab === 'scores' && (
                    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4 animate-fadeIn">
                        <div className="text-center pb-2">
                            <h3 className="text-xl font-black text-white flex items-center justify-center gap-2">
                                <Trophy className="w-5 h-5 text-amber-400" /> Ranking na Żywo
                            </h3>
                        </div>

                        <div className="space-y-2">
                            {players.length === 0 ? (
                                <p className="text-center text-slate-500 text-sm py-8">Oczekiwanie na graczy...</p>
                            ) : (
                                players.map((player, index) => {
                                    const isMe = player.nickname === myPlayerName;
                                    const playerAvatarSrc = getAvatarImage(player.avatar);

                                    return (
                                        <div
                                            key={player.id}
                                            className={`flex items-center justify-between p-3.5 rounded-xl border transition ${
                                                isMe
                                                    ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-200 shadow-lg shadow-emerald-500/5'
                                                    : 'bg-slate-800/40 border-slate-800 text-slate-200'
                                            }`}
                                        >
                                            <div className="flex items-center gap-3">
                                                <span className="font-black text-sm w-7 text-center text-slate-400">
                                                    {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `#${index + 1}`}
                                                </span>
                                                <div className="flex items-center gap-3">
                                                    <span className="bg-slate-800 p-2 rounded-xl border border-slate-700/50 flex items-center justify-center">
                                                        <img src={playerAvatarSrc} alt={player.nickname} className="w-5 h-5 object-contain" />
                                                    </span>
                                                    <span className="font-bold text-base tracking-wide">
                                                        {player.nickname} {isMe && <span className="text-xs bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded ml-2 font-normal">Ty</span>}
                                                    </span>
                                                </div>
                                            </div>
                                            <span className="font-black text-lg text-emerald-400">
                                                {player.totalScore} <span className="text-xs font-normal text-slate-400">pkt</span>
                                            </span>
                                        </div>
                                    );
                                })
                            )}
                        </div>
                    </div>
                )}

            </main>

            {/* Dolny panel przełączania zakładek dla uczestnika */}
            <nav className="fixed bottom-0 left-0 right-0 bg-slate-900/95 backdrop-blur-md border-t border-slate-800 py-3 px-6 flex justify-around items-center z-50">
                <button
                    onClick={() => setActiveTab('game')}
                    className={`flex flex-col items-center gap-1 transition cursor-pointer flex-1 py-1 ${
                        activeTab === 'game' ? 'text-purple-400 font-bold scale-105' : 'text-slate-400 hover:text-slate-200'
                    }`}
                >
                    <Gamepad2 className="w-5 h-5" />
                    <span className="text-xs">Gra</span>
                </button>

                <button
                    onClick={() => setActiveTab('scores')}
                    className={`flex flex-col items-center gap-1 transition cursor-pointer flex-1 py-1 ${
                        activeTab === 'scores' ? 'text-purple-400 font-bold scale-105' : 'text-slate-400 hover:text-slate-200'
                    }`}
                >
                    <Trophy className="w-5 h-5" />
                    <span className="text-xs">Wyniki</span>
                </button>
            </nav>

        </div>
    );
}