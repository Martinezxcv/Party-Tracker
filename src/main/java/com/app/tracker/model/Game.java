package com.app.tracker.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "games")
@Getter @Setter
public class Game {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "party_id", nullable = false)
    private Long partyId;

    @Column(nullable = false)
    private String title;

    private String description;
    private String rules;

    @Column(name = "is_revealed")
    private Boolean isRevealed = false;

    @Column(name = "is_active")
    private Boolean isActive = false;

    @Column(name = "order_num")
    private Integer orderNum = 0;
}