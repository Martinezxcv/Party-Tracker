package com.app.tracker.controller;

import com.app.tracker.model.Party;
import com.app.tracker.service.PartyService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/parties")
@RequiredArgsConstructor
public class PartyController {

    private final PartyService partyService;

    @PostMapping
    public ResponseEntity<Party> createParty(@RequestBody Party request) {
        return ResponseEntity.ok(partyService.createParty(request.getName()));
    }

    @GetMapping("/pin/{pinCode}")
    public ResponseEntity<Party> getPartyByPin(@PathVariable("pinCode") String pinCode) {
        return ResponseEntity.ok(partyService.getPartyByPin(pinCode));
    }

    @PostMapping("/{partyId}/validate")
    public ResponseEntity<Boolean> validatePin(@PathVariable Long partyId, @RequestBody String pinCode) {
        return ResponseEntity.ok(partyService.validatePartyPin(partyId, pinCode));
    }
}