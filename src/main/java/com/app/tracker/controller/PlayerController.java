package com.app.tracker.controller;

import com.app.tracker.model.Player;
import com.app.tracker.service.PlayerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class PlayerController {

    private final PlayerService playerService;

    @GetMapping("/parties/{partyId}/players")
    public ResponseEntity<List<Player>> getPlayers(@PathVariable Long partyId) {
        return ResponseEntity.ok(playerService.getPlayersForParty(partyId));
    }

    @PostMapping("/parties/{partyId}/players")
    public ResponseEntity<Player> joinParty(@PathVariable Long partyId, @RequestBody Player request) {
        Player player = playerService.joinOrRejoinParty(partyId, request.getNickname(), request.getAvatar());
        return ResponseEntity.ok(player);
    }

    @PostMapping("/players/{playerId}/points")
    public ResponseEntity<Player> addPoints(
            @PathVariable Long playerId,
            @RequestBody Map<String, Object> body
    ) {
        int points = (int) body.get("points");
        Long gameId = body.get("gameId") != null ? Long.valueOf(body.get("gameId").toString()) : null;

        Player updatedPlayer = playerService.addPointsToPlayer(playerId, points, gameId);
        return ResponseEntity.ok(updatedPlayer);
    }

    @DeleteMapping("/players/{id}")
    public ResponseEntity<Void> deletePlayer(@PathVariable Long id) {
        playerService.deletePlayer(id);
        return ResponseEntity.noContent().build();
    }
}