package com.app.tracker.repository;

import com.app.tracker.model.ScoreHistory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ScoreHistoryRepository extends JpaRepository<ScoreHistory, Long> {

}