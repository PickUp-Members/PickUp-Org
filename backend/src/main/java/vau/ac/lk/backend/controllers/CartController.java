package vau.ac.lk.backend.controllers;

import org.springframework.web.bind.annotation.*;
import vau.ac.lk.backend.services.CartService;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/cart")
@CrossOrigin(origins = "*")
public class CartController {
    private final CartService cartService;

    public CartController(CartService cartService) {
        this.cartService = cartService;
    }

    @GetMapping
    public List<Map<String, Object>> getCart(@RequestParam String userId) {
        return cartService.getCartProducts(userId);
    }

    @PostMapping("/{productId}")
    public List<Map<String, Object>> addProductToCart(@PathVariable String productId, @RequestParam String userId) {
        return cartService.addProductToCart(userId, productId);
    }

    @PutMapping("/{productId}")
    public List<Map<String, Object>> updateCartQuantity(@PathVariable String productId, @RequestParam String userId, @RequestParam int quantity) {
        return cartService.updateProductQuantity(userId, productId, quantity);
    }

    @DeleteMapping("/{productId}")
    public List<Map<String, Object>> removeProductFromCart(@PathVariable String productId, @RequestParam String userId) {
        return cartService.removeProductFromCart(userId, productId);
    }
}
