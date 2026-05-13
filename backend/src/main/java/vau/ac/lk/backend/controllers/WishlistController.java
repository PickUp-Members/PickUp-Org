package vau.ac.lk.backend.controllers;

import org.springframework.web.bind.annotation.*;
import vau.ac.lk.backend.models.Product;
import vau.ac.lk.backend.services.WishlistService;
import java.util.List;

@RestController
@RequestMapping("/api/wishlist")
@CrossOrigin(origins = "*")
public class WishlistController {
    private final WishlistService wishlistService;

    public WishlistController(WishlistService wishlistService) {
        this.wishlistService = wishlistService;
    }

    @GetMapping
    public List<Product> getWishlist(@RequestParam String userId) {
        return wishlistService.getWishlistProducts(userId);
    }

    @PostMapping("/{productId}")
    public List<Product> addProductToWishlist(@PathVariable String productId, @RequestParam String userId) {
        return wishlistService.addProductToWishlist(userId, productId);
    }

    @DeleteMapping("/{productId}")
    public List<Product> removeProductFromWishlist(@PathVariable String productId, @RequestParam String userId) {
        return wishlistService.removeProductFromWishlist(userId, productId);
    }
}
