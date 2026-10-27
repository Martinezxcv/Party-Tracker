package com.app.tracker.repository;

import com.app.tracker.model.Game;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface GameRepository extends JpaRepository<Game, Long> {
    List<Game> findByPartyIdOrderByOrderNumAsc(Long partyId);
}