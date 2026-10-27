package com.app.tracker.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.time.LocalDateTime;

@Entity
@Table(name = "score_history")
@Getter @Setter
public class ScoreHistory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "player_id", nullable = false)
    private Long playerId;

    @Column(name = "game_id")
    private Long gameId;

    @Column(name = "points_changed", nullable = false)
    private Integer pointsChanged;

    @Column(name = "created_at", insertable = false, updatable = false)
    private LocalDateTime createdAt;
}