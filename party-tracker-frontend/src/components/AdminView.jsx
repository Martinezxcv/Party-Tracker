import React from 'react';
import { getAvatarImage } from '../utils/avatars';

export default function AdminView({
                                      partyId,
                                      players = [],
                                      games = [],
                                      activeGameId,
                                      onSelectActiveGame
                                  }) {

    const handleDeletePlayer = async (playerId, nickname) => {
        if (!window.confirm(`Czy na pewno chcesz usunąć gracza "${nickname}"?`)) return;

        try {
            const res = await fetch(`http://localhost:8080/api/players/${playerId}`, {
                method: 'DELETE'
            });

            if (!res.ok) {
                alert('Błąd podczas usuwania gracza.');
            }
        } catch (err) {
            console.error(err);
            alert('Błąd połączenia z serwerem.');
        }
    };

    return (
        <div className="max-w-xl mx-auto p-4 space-y-6 pb-24">
            <div className="text-center">
                <h2 className="text-2xl font-black text-white">⚙️ Panel Admina (Hosta)</h2>
                <p className="text-slate-400 text-sm">Kontroluj dołączonych graczy i aktywne gry</p>
            </div>

            {/* SEKCJA 1: ZARZĄDZANIE GRACZAMI */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
                <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                        👥 Gracze w pokoju
                        <span className="text-xs bg-purple-500/20 text-purple-300 px-2.5 py-0.5 rounded-full font-semibold">
                            {players.length}
                        </span>
                    </h3>
                </div>

                {players.length === 0 ? (
                    <p className="text-center text-slate-500 text-sm py-4">Brak dołączonych graczy.</p>
                ) : (
                    <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                        {players.map((player) => {
                            const avatarSrc = getAvatarImage(player.avatar);

                            return (
                                <div
                                    key={player.id}
                                    className="flex items-center justify-between bg-slate-800/60 border border-slate-700/50 p-3 rounded-xl"
                                >
                                    <div className="flex items-center gap-3">
                                        <span className="bg-slate-900 p-2 rounded-xl border border-slate-700/40 flex items-center justify-center">
                                            <img src={avatarSrc} alt={player.avatar || 'avatar'} className="w-6 h-6 object-contain" />
                                        </span>
                                        <span className="font-bold text-slate-200 text-sm">{player.nickname}</span>
                                    </div>
                                    <button
                                        onClick={() => handleDeletePlayer(player.id, player.nickname)}
                                        className="bg-red-500/10 hover:bg-red-600 text-red-400 hover:text-white border border-red-500/20 px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer active:scale-95"
                                    >
                                        Usuń 🗑️
                                    </button>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>

            {/* SEKCJA 2: ZARZĄDZANIE WYBOREM AKTYWNEJ GRY */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    🎮 Wybór Aktywnej Gry
                </h3>
                <p className="text-xs text-slate-400">
                    Wybierz grę, która natychmiast uaktywni się na ekranach wszystkich uczestników.
                </p>

                {games.length === 0 ? (
                    <p className="text-center text-slate-500 text-sm py-4">Brak gier w bazie danych.</p>
                ) : (
                    <div className="space-y-2.5 mt-2">
                        {games.map((game) => {
                            const isActive = game.id === activeGameId;
                            return (
                                <div
                                    key={game.id}
                                    className={`flex items-center justify-between p-3.5 rounded-xl border transition ${
                                        isActive
                                            ? 'bg-purple-950/30 border-purple-500/50 text-purple-200 shadow-md shadow-purple-500/5'
                                            : 'bg-slate-800/30 border-slate-800 text-slate-400'
                                    }`}
                                >
                                    <div className="flex flex-col">
                                        <span className="font-bold text-sm text-white">{game.title}</span>
                                        {game.description && (
                                            <span className="text-xs text-slate-400 line-clamp-1">{game.description}</span>
                                        )}
                                    </div>

                                    <button
                                        onClick={() => onSelectActiveGame(game.id)}
                                        disabled={isActive}
                                        className={`px-4 py-1.5 rounded-xl font-bold text-xs transition cursor-pointer shadow-sm ${
                                            isActive
                                                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 cursor-default'
                                                : 'bg-purple-600 text-white hover:bg-purple-500 active:scale-95'
                                        }`}
                                    >
                                        {isActive ? 'Aktywna 🎯' : 'Uruchom 🚀'}
                                    </button>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}