import React, { useState } from 'react';
import { avatarMap, getAvatarImage } from '../utils/avatars';
import { Users, Shield, RotateCcw, ArrowLeft, Rocket } from 'lucide-react';

export default function RoleSelect({ onHostStart, onResumeHost, onJoinParty }) {
    const [pin, setPin] = useState('');
    const [nickname, setNickname] = useState('');
    const [selectedAvatar, setSelectedAvatar] = useState('pumpkin');
    const [mode, setMode] = useState('menu');
    const [partyName, setPartyName] = useState('Halloween Party');
    const [hostPin, setHostPin] = useState('');

    const avatarKeys = Object.keys(avatarMap);

    const handleJoin = (e) => {
        e.preventDefault();
        if (!pin.trim() || !nickname.trim()) {
            alert('Wpisz PIN oraz Twój pseudonim!');
            return;
        }
        onJoinParty(pin, nickname, selectedAvatar);
    };

    const handleResume = (e) => {
        e.preventDefault();
        if (!hostPin.trim()) {
            alert('Wpisz PIN imprezy!');
            return;
        }
        onResumeHost(hostPin.trim());
    };

    const mainHeaderAvatarSrc = getAvatarImage(mode === 'join' ? selectedAvatar : 'pumpkin');

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl text-center space-y-6">
                <div>
                    <span className="inline-flex bg-purple-500/10 border border-purple-500/20 p-4 rounded-2xl text-purple-400 mb-2">
                        <img src={mainHeaderAvatarSrc} alt="Awatar nagłówka" className="w-10 h-10 object-contain" />
                    </span>
                    <h1 className="text-3xl font-black mt-3 bg-gradient-to-r from-orange-400 via-purple-400 to-pink-500 bg-clip-text text-transparent">
                        PARTY TRACKER
                    </h1>
                    <p className="text-slate-400 text-sm mt-1">
                        {mode === 'join' && 'Wybierz swój awatar i dołącz!'}
                        {mode === 'create_host' && 'Stwórz nowy pokój gry!'}
                        {mode === 'resume_host' && 'Wpisz PIN, aby wrócić do swojej gry!'}
                        {mode === 'menu' && 'Graj ze znajomymi na żywo!'}
                    </p>
                </div>

                {/* MENU GŁÓWNE */}
                {mode === 'menu' && (
                    <div className="space-y-3">
                        <button
                            onClick={() => setMode('join')}
                            className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold py-3.5 px-4 rounded-xl shadow-lg shadow-emerald-600/25 transition cursor-pointer text-lg flex items-center justify-center gap-2"
                        >
                            <Users className="w-5 h-5" /> Dołącz do gry (Uczestnik)
                        </button>
                        <button
                            onClick={() => setMode('create_host')}
                            className="w-full bg-purple-600 hover:bg-purple-500 text-white font-extrabold py-3.5 px-4 rounded-xl shadow-lg shadow-purple-600/25 transition cursor-pointer text-lg flex items-center justify-center gap-2"
                        >
                            <Shield className="w-5 h-5" /> Stwórz imprezę (Host)
                        </button>
                        <button
                            onClick={() => setMode('resume_host')}
                            className="w-full bg-slate-800 hover:bg-slate-700 text-purple-400 font-bold py-3 px-4 rounded-xl border border-purple-500/30 transition cursor-pointer text-sm flex items-center justify-center gap-2"
                        >
                            <RotateCcw className="w-4 h-4" /> Wznów imprezę jako Host
                        </button>
                    </div>
                )}

                {/* FORMULARZ DOŁĄCZANIA UCZESTNIKA */}
                {mode === 'join' && (
                    <form onSubmit={handleJoin} className="space-y-4 text-left">
                        <div>
                            <label className="text-xs font-bold text-slate-400 mb-1 block">Wybierz Awatar</label>
                            <div className="grid grid-cols-4 gap-2 bg-slate-800/60 p-2.5 rounded-xl border border-slate-700/50">
                                {avatarKeys.map((key) => {
                                    const avatarSrc = avatarMap[key];
                                    const isSelected = selectedAvatar === key;
                                    return (
                                        <button
                                            type="button"
                                            key={key}
                                            onClick={() => setSelectedAvatar(key)}
                                            className={`p-2.5 rounded-lg transition cursor-pointer flex items-center justify-center ${
                                                isSelected
                                                    ? 'bg-emerald-500/20 border border-emerald-500 scale-105 shadow-md'
                                                    : 'hover:bg-slate-700/50'
                                            }`}
                                        >
                                            <img src={avatarSrc} alt={key} className="w-7 h-7 object-contain" />
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        <div>
                            <label className="text-xs font-bold text-slate-400 mb-1 block">PIN Imprezy</label>
                            <input
                                type="text"
                                placeholder="np. 1234"
                                value={pin}
                                onChange={(e) => setPin(e.target.value)}
                                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-white text-center text-xl font-mono tracking-widest focus:outline-none focus:border-emerald-500"
                            />
                        </div>

                        <div>
                            <label className="text-xs font-bold text-slate-400 mb-1 block">Twój Pseudonim</label>
                            <input
                                type="text"
                                placeholder="np. MistrzGry"
                                value={nickname}
                                onChange={(e) => setNickname(e.target.value)}
                                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-emerald-500 font-semibold"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3.5 px-4 rounded-xl shadow-lg shadow-emerald-600/25 transition cursor-pointer flex items-center justify-center gap-2"
                        >
                            <Rocket className="w-5 h-5" /> Wejdź do gry!
                        </button>
                        <button
                            type="button"
                            onClick={() => setMode('menu')}
                            className="w-full text-xs text-slate-500 hover:text-slate-300 py-1 text-center flex items-center justify-center gap-1"
                        >
                            <ArrowLeft className="w-3.5 h-3.5" /> Wróć do menu
                        </button>
                    </form>
                )}

                {/* FORMULARZ TWORZENIA NOWEJ IMPREZY */}
                {mode === 'create_host' && (
                    <form onSubmit={(e) => { e.preventDefault(); onHostStart(partyName); }} className="space-y-4 text-left">
                        <div>
                            <label className="text-xs font-bold text-slate-400 mb-1 block">Nazwa Imprezy / Pokoju</label>
                            <input
                                type="text"
                                placeholder="np. Halloween 2026"
                                value={partyName}
                                onChange={(e) => setPartyName(e.target.value)}
                                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 font-semibold"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-purple-600 hover:bg-purple-500 text-white font-bold py-3.5 px-4 rounded-xl shadow-lg shadow-purple-600/25 transition cursor-pointer flex items-center justify-center gap-2"
                        >
                            <Shield className="w-5 h-5" /> Uruchom Panel Hosta
                        </button>
                        <button
                            type="button"
                            onClick={() => setMode('menu')}
                            className="w-full text-xs text-slate-500 hover:text-slate-300 py-1 text-center flex items-center justify-center gap-1"
                        >
                            <ArrowLeft className="w-3.5 h-3.5" /> Wróć do menu
                        </button>
                    </form>
                )}

                {/* FORMULARZ WZNAWIANIA IMPREZY PRZEZ HOSTA */}
                {mode === 'resume_host' && (
                    <form onSubmit={handleResume} className="space-y-4 text-left">
                        <div>
                            <label className="text-xs font-bold text-slate-400 mb-1 block">PIN Istniejącej Imprezy</label>
                            <input
                                type="text"
                                placeholder="np. 4821"
                                value={hostPin}
                                onChange={(e) => setHostPin(e.target.value)}
                                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white text-center text-xl font-mono tracking-widest focus:outline-none focus:border-purple-500 font-semibold"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-purple-600 hover:bg-purple-500 text-white font-bold py-3.5 px-4 rounded-xl shadow-lg shadow-purple-600/25 transition cursor-pointer flex items-center justify-center gap-2"
                        >
                            <RotateCcw className="w-5 h-5" /> Wznów Pokój Hosta
                        </button>
                        <button
                            type="button"
                            onClick={() => setMode('menu')}
                            className="w-full text-xs text-slate-500 hover:text-slate-300 py-1 text-center flex items-center justify-center gap-1"
                        >
                            <ArrowLeft className="w-3.5 h-3.5" /> Wróć do menu
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
}