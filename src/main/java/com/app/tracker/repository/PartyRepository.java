package com.app.tracker.repository;

import com.app.tracker.model.Party;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PartyRepository extends JpaRepository<Party, Long> {
    Optional<Party> findByPinCode(String pinCode);
}