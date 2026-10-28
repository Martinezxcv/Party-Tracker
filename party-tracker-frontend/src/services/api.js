const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

export const getPlayers = async (partyId) => {
    const response = await fetch(`${API_URL}/parties/${partyId}/players`);
    if (!response.ok) throw new Error('Błąd pobierania graczy');
    return response.json();
};

export const addPoints = async (playerId, points, gameId = null) => {
    const response = await fetch(`${API_URL}/players/${playerId}/points`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ points, gameId }),
    });

    if (!response.ok) throw new Error('Błąd dodawania punktów');
    return response.json();
};