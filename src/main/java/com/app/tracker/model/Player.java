package com.app.tracker.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "players")
@Getter @Setter
public class Player {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "party_id", nullable = false)
    private Long partyId;

    @Column(nullable = false)
    private String nickname;

    private String avatar;

    @Column(name = "total_score")
    private Integer totalScore = 0;
}