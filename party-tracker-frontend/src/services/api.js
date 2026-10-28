const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

export const getPlayers = async (partyId) => {
    const res = await fetch(`${API_URL}/parties/${partyId}/players`);
    if (!res.ok) throw new Error('Błąd pobierania graczy');
    return res.json();
};

export const deletePlayer = async (playerId) => {
    const res = await fetch(`${API_URL}/players/${playerId}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Błąd podczas usuwania gracza');
    const text = await res.text();
    return text ? JSON.parse(text) : { success: true };
};

export const getGames = async () => {
    const res = await fetch(`${API_URL}/games`);
    if (!res.ok) throw new Error('Błąd pobierania gier');
    return res.json();
};

export const getActiveGame = async () => {
    const res = await fetch(`${API_URL}/games/active`);
    if (!res.ok) throw new Error('Błąd pobierania aktywnej gry');
    return res.json();
};

export const activateGame = async (gameId) => {
    const res = await fetch(`${API_URL}/games/${gameId}/activate`, { method: 'POST' });
    if (!res.ok) throw new Error('Nie udało się zmienić aktywnej gry');
};

export const createParty = async (partyName) => {
    const res = await fetch(`${API_URL}/parties`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: partyName })
    });
    if (!res.ok) throw new Error('Nie udało się utworzyć imprezy');
    return res.json();
};

export const getPartyByPin = async (pin) => {
    const res = await fetch(`${API_URL}/parties/pin/${pin}`);
    if (!res.ok) throw new Error('Nie znaleziono imprezy o takim PIN-ie');
    return res.json();
};

export const joinParty = async (partyId, nickname, avatar) => {
    const res = await fetch(`${API_URL}/parties/${partyId}/players`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nickname, avatar })
    });
    if (!res.ok) throw new Error('Nie udało się dołączyć do gry');
    return res.json();
};

export const addPoints = async (playerId, points, gameId = null) => {
    const res = await fetch(`${API_URL}/players/${playerId}/points`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ value: points, gameId })
    });
    if (!res.ok) throw new Error('Błąd dodawania punktów');
    return res.json();
};