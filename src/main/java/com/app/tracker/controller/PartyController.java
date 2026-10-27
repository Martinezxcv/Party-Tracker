package com.app.tracker.controller;

import com.app.tracker.model.Game;
import com.app.tracker.model.Player;
import com.app.tracker.service.PartyService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
public class PartyController {

    private final PartyService partyService;

    @GetMapping("/parties/{partyId}/players")
    public List<Player> getPlayers(@PathVariable Long partyId) {
        return partyService.getPlayersForParty(partyId);
    }

    @GetMapping("/parties/{partyId}/games")
    public List<Game> getGames(@PathVariable Long partyId) {
        return partyService.getGamesForParty(partyId);
    }

    @PostMapping("/players/{playerId}/add-points")
    public Player addPoints(
            @PathVariable Long playerId,
            @RequestParam int points,
            @RequestParam(required = false) Long gameId) {
        return partyService.addPointsToPlayer(playerId, points, gameId);
    }
}