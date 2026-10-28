package com.app.tracker.service;

import com.app.tracker.model.Party;
import com.app.tracker.repository.PartyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class PartyService {

    private final PartyRepository partyRepository;

    public boolean validatePartyPin(Long partyId, String pinCode) {
        Party party = partyRepository.findById(partyId)
                .orElseThrow(() -> new RuntimeException("Impreza nie znaleziona"));

        return party.getPinCode() != null && party.getPinCode().equals(pinCode);
    }

    @Transactional
    public Party createParty(String name) {
        Party party = new Party();
        party.setName(name);
        String randomPin = String.valueOf((int) (Math.random() * 9000) + 1000);
        party.setPinCode(randomPin);
        return partyRepository.save(party);
    }

    public Party getPartyByPin(String pinCode) {
        return partyRepository.findByPinCode(pinCode)
                .orElseThrow(() -> new RuntimeException("Nie znaleziono imprezy o podanym kodzie PIN: " + pinCode));
    }
}