package com.app.tracker.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.time.LocalDateTime;

@Entity
@Table(name = "parties")
@Getter @Setter
public class Party {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(name = "pin_code", nullable = false)
    private String pinCode;

    private String theme;

    @Column(name = "created_at", insertable = false, updatable = false)
    private LocalDateTime createdAt;
}