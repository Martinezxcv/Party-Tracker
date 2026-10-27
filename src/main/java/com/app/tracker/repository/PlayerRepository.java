package com.app.tracker.repository;

import com.app.tracker.model.Player;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface PlayerRepository extends JpaRepository<Player, Long> {
    List<Player> findByPartyIdOrderByTotalScoreDesc(Long partyId);
}