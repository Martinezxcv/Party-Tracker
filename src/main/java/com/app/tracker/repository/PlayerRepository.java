package com.app.tracker.repository;

import com.app.tracker.model.Player;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface PlayerRepository extends JpaRepository<Player, Long> {
    List<Player> findByPartyIdOrderByTotalScoreDesc(Long partyId);

    Optional<Player> findByPartyIdAndNickname(Long partyId, String nickname);
}