package com.app.tracker.service;

import com.app.tracker.model.Game;
import com.app.tracker.repository.GameRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class GameService {

    private final GameRepository gameRepository;
    private final SimpMessagingTemplate messagingTemplate;

    public List<Game> getAllGames() {
        return gameRepository.findAll();
    }

    @Transactional
    public void setActiveGame(Long gameId) {
        List<Game> games = gameRepository.findAll();
        for (Game g : games) {
            g.setIsActive(false);
        }

        Game target = gameRepository.findById(gameId)
                .orElseThrow(() -> new RuntimeException("Gra nie znaleziona"));
        target.setIsActive(true);

        gameRepository.saveAll(games);

        messagingTemplate.convertAndSend("/topic/game/active", target);
    }

    public Game getActiveGame() {
        return gameRepository.findByIsActiveTrue().orElse(null);
    }
}