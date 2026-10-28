package com.app.tracker.service;

import com.app.tracker.model.Player;
import com.app.tracker.model.ScoreHistory;
import com.app.tracker.repository.PlayerRepository;
import com.app.tracker.repository.ScoreHistoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PlayerService {

    private final PlayerRepository playerRepository;
    private final ScoreHistoryRepository scoreHistoryRepository;
    private final SimpMessagingTemplate messagingTemplate;

    public List<Player> getPlayersForParty(Long partyId) {
        return playerRepository.findByPartyIdOrderByTotalScoreDesc(partyId);
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

        broadcastPlayers(player.getPartyId());

        return player;
    }

    @Transactional
    public Player joinOrRejoinParty(Long partyId, String nickname, String avatar) {
        Player player = playerRepository.findByPartyIdAndNickname(partyId, nickname)
                .map(existingPlayer -> {
                    if (avatar != null && !avatar.isEmpty()) {
                        existingPlayer.setAvatar(avatar);
                        playerRepository.save(existingPlayer);
                    }
                    return existingPlayer;
                })
                .orElseGet(() -> {
                    Player newPlayer = new Player();
                    newPlayer.setPartyId(partyId);
                    newPlayer.setNickname(nickname);
                    newPlayer.setAvatar(avatar != null ? avatar : "🎃");
                    newPlayer.setTotalScore(0);
                    return playerRepository.save(newPlayer);
                });

        broadcastPlayers(partyId);
        return player;
    }

    @Transactional
    public void deletePlayer(Long id) {
        Player player = playerRepository.findById(id).orElse(null);
        if (player != null) {
            Long partyId = player.getPartyId();
            playerRepository.deleteById(id);
            broadcastPlayers(partyId);
        }
    }

    private void broadcastPlayers(Long partyId) {
        List<Player> updatedList = getPlayersForParty(partyId);
        messagingTemplate.convertAndSend("/topic/party/" + partyId + "/players", updatedList);
    }
}