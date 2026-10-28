import React, { useState } from 'react';
import { getAvatarImage } from '../utils/avatars';
import { Trophy, Award, PlusCircle, Users } from 'lucide-react';

export default function ScoresView({ players, onAddPoints }) {
    const [inputValues, setInputValues] = useState({});

    const handleInputChange = (playerId, value) => {
        setInputValues(prev => ({
            ...prev,
            [playerId]: value
        }));
    };

    const handleSubmitPoints = (playerId) => {
        const points = parseInt(inputValues[playerId], 10);
        if (isNaN(points)) {
            alert('Wpisz poprawną liczbę punktów!');
            return;
        }

        onAddPoints(playerId, points);

        setInputValues(prev => ({
            ...prev,
            [playerId]: ''
        }));
    };

    const handleKeyDown = (e, playerId) => {
        if (e.key === 'Enter') {
            handleSubmitPoints(playerId);
        }
    };

    return (
        <div className="max-w-xl mx-auto p-4 space-y-4 pb-24">
            <div className="text-center mb-6">
                <h2 className="text-2xl font-black text-white flex items-center justify-center gap-2">
                    <Trophy className="w-7 h-7 text-amber-400" /> Leaderboard & Zarządzanie
                </h2>
                <p className="text-slate-400 text-sm">Wpisz punkty dla graczy (zmiany widoczne natychmiast u wszystkich)</p>
            </div>

            <div className="space-y-3">
                {players.length === 0 ? (
                    <div className="text-center py-12 border border-dashed border-slate-800 rounded-2xl">
                        <Users className="w-10 h-10 text-slate-600 mx-auto mb-2" />
                        <p className="text-slate-400 font-medium">Brak graczy na imprezie.</p>
                        <p className="text-slate-600 text-sm mt-1">Dodaj graczy w zakładce Admin!</p>
                    </div>
                ) : (
                    players.map((player, index) => {
                        const avatarSrc = getAvatarImage(player.avatar);

                        const rankStyle =
                            index === 0 ? "border-amber-500/40 bg-amber-500/10 text-amber-400" :
                                index === 1 ? "border-slate-400/40 bg-slate-400/10 text-slate-200" :
                                    index === 2 ? "border-amber-700/40 bg-amber-700/10 text-amber-600" :
                                        "border-slate-800 bg-slate-900/60 text-slate-400";

                        return (
                            <div key={player.id} className={`flex items-center justify-between p-4 rounded-xl border transition ${rankStyle}`}>
                                <div className="flex items-center gap-3">
                                    <span className="font-black text-lg w-8 text-center flex justify-center">
                                        {index === 0 ? (
                                            <Award className="w-6 h-6 text-amber-400" />
                                        ) : index === 1 ? (
                                            <Award className="w-6 h-6 text-slate-300" />
                                        ) : index === 2 ? (
                                            <Award className="w-6 h-6 text-amber-700" />
                                        ) : (
                                            `#${index + 1}`
                                        )}
                                    </span>
                                    <span className="bg-slate-800 p-2 rounded-xl border border-slate-700/50 flex items-center justify-center">
                                        <img src={avatarSrc} alt={player.nickname} className="w-5 h-5 object-contain" />
                                    </span>
                                    <div>
                                        <span className="font-bold text-lg text-white block">{player.nickname}</span>
                                        <span className="text-xs font-black text-emerald-400">
                                            {player.totalScore} <span className="font-normal text-slate-400">pkt</span>
                                        </span>
                                    </div>
                                </div>

                                {/* Custom Input do wpisywania punktów */}
                                <div className="flex items-center gap-2">
                                    <input
                                        type="number"
                                        placeholder="0"
                                        value={inputValues[player.id] || ''}
                                        onChange={(e) => handleInputChange(player.id, e.target.value)}
                                        onKeyDown={(e) => handleKeyDown(e, player.id)}
                                        className="w-20 bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1.5 text-white text-center font-bold focus:outline-none focus:border-purple-500 text-sm"
                                    />
                                    <button
                                        onClick={() => handleSubmitPoints(player.id)}
                                        className="bg-purple-600 hover:bg-purple-500 text-white font-bold px-3 py-1.5 rounded-lg text-sm transition cursor-pointer shadow-md shadow-purple-600/20 active:scale-95 flex items-center gap-1"
                                    >
                                        <PlusCircle className="w-4 h-4" /> Dodaj
                                    </button>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
}