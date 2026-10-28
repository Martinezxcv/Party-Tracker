import React, { useEffect, useState } from 'react';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { getPlayers, addPoints } from './services/api';
import RoleSelect from './components/RoleSelect';
import ParticipantView from './components/ParticipantView';
import Navbar from './components/Navbar';
import GameView from './components/GameView';
import ScoresView from './components/ScoresView';
import PastView from './components/PastView';
import AdminView from './components/AdminView';
import BottomNav from './components/BottomNav';

export default function App() {
  const [role, setRole] = useState(() => localStorage.getItem('party_role') || 'none');
  const [partyId, setPartyId] = useState(() => Number(localStorage.getItem('party_id')) || 1);
  const [partyPin, setPartyPin] = useState(() => localStorage.getItem('party_pin') || '1234');
  const [myPlayerName, setMyPlayerName] = useState(() => localStorage.getItem('party_player_name') || '');
  const [activeTab, setActiveTab] = useState('game');

  // Stany dla graczy i gier
  const [players, setPlayers] = useState([]);
  const [games, setGames] = useState([]);
  const [activeGame, setActiveGame] = useState(null);

  const loadInitialData = async () => {
    if (!partyId) return;
    try {
      // 1. Gracze
      const playersData = await getPlayers(partyId);
      setPlayers(playersData.sort((a, b) => b.totalScore - a.totalScore));

      // 2. Wszystkie gry do panelu Admina
      const gamesRes = await fetch('http://localhost:8080/api/games');
      if (gamesRes.ok) {
        const gamesData = await gamesRes.json();
        setGames(gamesData);
      }

      // 3. Aktualnie aktywna gra
      const activeRes = await fetch('http://localhost:8080/api/games/active');
      if (activeRes.ok) {
        const activeData = await activeRes.json();
        setActiveGame(activeData);
      }
    } catch (err) {
      console.error('Błąd podczas ładowania danych:', err);
    }
  };

  // Konfiguracja WebSocket
  useEffect(() => {
    if (role === 'none' || !partyId) return;

    loadInitialData();

    // Połączenie WebSocket przez SockJS i STOMP
    const socket = new SockJS('http://localhost:8080/ws-party');
    const stompClient = new Client({
      webSocketFactory: () => socket,
      debug: () => {},
      onConnect: () => {
        console.log('Połączono z serwerem WebSocket 🎉');

        // Subskrypcja zmian graczy w pokoju
        stompClient.subscribe(`/topic/party/${partyId}/players`, (message) => {
          const updatedPlayers = JSON.parse(message.body);
          setPlayers(updatedPlayers.sort((a, b) => b.totalScore - a.totalScore));
        });

        // Subskrypcja zmiany aktywnej gry
        stompClient.subscribe('/topic/game/active', (message) => {
          const updatedGame = JSON.parse(message.body);
          setActiveGame(updatedGame);
        });
      },
    });

    stompClient.activate();

    // Czyszczenie połączenia przy wylogowaniu lub zmianie komponentu
    return () => {
      stompClient.deactivate();
    };
  }, [role, partyId]);

  // Funkcja aktywowania gry przez Hosta w panelu admina
  const handleSelectActiveGame = async (gameId) => {
    try {
      const res = await fetch(`http://localhost:8080/api/games/${gameId}/activate`, {
        method: 'POST'
      });
      if (!res.ok) {
        alert('Nie udało się zmienić aktywnej gry.');
      }
    } catch (err) {
      console.error(err);
    }
  };

  // TWORZENIE NOWEJ IMPREZY PRZEZ HOSTA
  const handleHostStart = async (partyName) => {
    try {
      const res = await fetch('http://localhost:8080/api/parties', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: partyName })
      });

      if (res.ok) {
        const newParty = await res.json();
        setPartyId(newParty.id);
        setPartyPin(newParty.pinCode);
        setRole('host');

        localStorage.setItem('party_role', 'host');
        localStorage.setItem('party_id', newParty.id);
        localStorage.setItem('party_pin', newParty.pinCode);
      } else {
        alert('Nie udało się utworzyć imprezy.');
      }
    } catch (err) {
      console.error(err);
      alert('Błąd połączenia z serwerem podczas tworzenia imprezy');
    }
  };

  // Wznawianie istniejącej imprezy jako Host za pomocą PIN-u
  const handleResumeHost = async (pin) => {
    try {
      const res = await fetch(`http://localhost:8080/api/parties/pin/${pin}`);

      if (res.ok) {
        const partyData = await res.json();
        setPartyId(partyData.id);
        setPartyPin(partyData.pinCode);
        setRole('host');

        localStorage.setItem('party_role', 'host');
        localStorage.setItem('party_id', partyData.id);
        localStorage.setItem('party_pin', partyData.pinCode);
      } else {
        alert('Nie znaleziono imprezy o takim PIN-ie!');
      }
    } catch (err) {
      console.error(err);
      alert('Błąd połączenia z serwerem');
    }
  };

  //  Dołączenie jako Player
  const handleJoinParty = async (pin, nickname, avatar) => {
    try {
      const partyRes = await fetch(`http://localhost:8080/api/parties/pin/${pin}`);

      if (!partyRes.ok) {
        alert('Nie znaleziono imprezy o takim PIN-ie!');
        return;
      }

      const partyData = await partyRes.json();
      const targetPartyId = partyData.id;

      const res = await fetch(`http://localhost:8080/api/parties/${targetPartyId}/players`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nickname: nickname, avatar: avatar })
      });

      if (res.ok) {
        const playerdata = await res.json();
        setPartyId(targetPartyId);
        setPartyPin(pin);
        setMyPlayerName(playerdata.nickname);
        setRole('participant');

        localStorage.setItem('party_role', 'participant');
        localStorage.setItem('party_id', targetPartyId);
        localStorage.setItem('party_pin', pin);
        localStorage.setItem('party_player_name', playerdata.nickname);
      } else {
        alert('Nie udało się dołączyć do gry.');
      }
    } catch (err) {
      console.error(err);
      alert('Błąd połączenia z serwerem');
    }
  };

  // Wylogowanie / Wyjście z gry
  const handleLogout = () => {
    setRole('none');
    setPartyId(1);
    setPartyPin('1234');
    setMyPlayerName('');
    localStorage.clear();
  };

  if (role === 'none') {
    return (
        <RoleSelect
            onHostStart={handleHostStart}
            onResumeHost={handleResumeHost}
            onJoinParty={handleJoinParty}
        />
    );
  }

  if (role === 'participant') {
    return (
        <ParticipantView
            players={players}
            myPlayerName={myPlayerName}
            onLogout={handleLogout}
            activeGame={activeGame}
        />
    );
  }

  return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between">
        <div>
          <Navbar partyPin={partyPin} onLogout={handleLogout} />
          <main className="py-6">
            {activeTab === 'game' && <GameView activeGame={activeGame} />}
            {activeTab === 'scores' && (
                <ScoresView
                    players={players}
                    onAddPoints={async (pId, pts) => {
                      await addPoints(pId, pts);
                    }}
                />
            )}
            {activeTab === 'past' && <PastView />}
            {activeTab === 'admin' && (
                <AdminView
                    partyId={partyId}
                    players={players}
                    onRefreshPlayers={loadInitialData}
                    games={games}
                    activeGameId={activeGame?.id}
                    onSelectActiveGame={handleSelectActiveGame}
                />
            )}
          </main>
        </div>
        <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
  );
}