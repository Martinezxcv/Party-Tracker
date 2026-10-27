package com.app.tracker.service;

import com.app.tracker.model.Game;
import com.app.tracker.model.Player;
import com.app.tracker.model.ScoreHistory;
import com.app.tracker.repository.GameRepository;
import com.app.tracker.repository.PlayerRepository;
import com.app.tracker.repository.ScoreHistoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PartyService {

    private final PlayerRepository playerRepository;
    private final GameRepository gameRepository;
    private final ScoreHistoryRepository scoreHistoryRepository;

    public List<Player> getPlayersForParty(Long partyId) {
        return playerRepository.findByPartyIdOrderByTotalScoreDesc(partyId);
    }

    public List<Game> getGamesForParty(Long partyId) {
        return gameRepository.findByPartyIdOrderByOrderNumAsc(partyId);
    }

    @Transactional
    public Player addPointsToPlayer(Long playerId, int points, Long gameId) {
        Player player = playerRepository.findById(playerId)
                .orElseThrow(() -> new RuntimeException("Gracz nie został znaleziony"));

        player.setTotalScore(player.getTotalScore() + points);
        playerRepository.save(player);

        ScoreHistory history = new ScoreHistory();
        history.setPlayerId(playerId);
        history.setGameId(gameId);
        history.setPointsChanged(points);
        scoreHistoryRepository.save(history);

        return player;
    }
}