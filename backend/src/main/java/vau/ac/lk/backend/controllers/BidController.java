package vau.ac.lk.backend.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import vau.ac.lk.backend.models.Bid;
import vau.ac.lk.backend.services.BidService;

import java.util.List;

@RestController
@RequestMapping("/api/bids")
@CrossOrigin(origins = "*")
public class BidController {

    @Autowired
    private BidService bidService;

    @GetMapping("/seller/{sellerId}")
    public ResponseEntity<List<Bid>> getSellerBids(@PathVariable String sellerId) {
        return ResponseEntity.ok(bidService.getBidsBySeller(sellerId));
    }
}
