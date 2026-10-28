package com.app.tracker.controller;

import com.app.tracker.model.Game;
import com.app.tracker.service.GameService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/games")
public class GameController {

    private final GameService gameService;

    public GameController(GameService gameService) {
        this.gameService = gameService;
    }

    @GetMapping
    public ResponseEntity<List<Game>> getAllGames() {
        return ResponseEntity.ok(gameService.getAllGames());
    }

    @GetMapping("/active")
    public ResponseEntity<Game> getActiveGame() {
        return ResponseEntity.ok(gameService.getActiveGame());
    }

    @PostMapping("/{gameId}/activate")
    public ResponseEntity<Void> setActiveGame(@PathVariable Long gameId) {
        gameService.setActiveGame(gameId);
        return ResponseEntity.ok().build();
    }
}