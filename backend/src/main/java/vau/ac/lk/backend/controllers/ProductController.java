package vau.ac.lk.backend.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import vau.ac.lk.backend.models.Product;
import vau.ac.lk.backend.services.ProductService;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "*")
public class ProductController {

    @Autowired
    private ProductService productService;

    @GetMapping("/seller/{sellerId}")
    public ResponseEntity<List<Product>> getSellerListings(@PathVariable String sellerId) {
        return ResponseEntity.ok(productService.getProductsBySeller(sellerId));
    }

    @PostMapping
    public ResponseEntity<Map<String, Object>> createListing(@RequestBody Product product) {
        Product saved = productService.createProduct(product);
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("listing", saved);
        return ResponseEntity.ok(response);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Map<String, Object>> updateListing(@PathVariable String id, @RequestBody Product product) {
        Product updated = productService.updateProduct(id, product);
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("listing", updated);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, Object>> deleteListing(@PathVariable String id) {
        productService.deleteProduct(id);
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/{id}/end-auction")
    public ResponseEntity<Map<String, Object>> endAuctionEarly(@PathVariable String id) {
        Product updated = productService.endAuctionEarly(id);
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("listing", updated);
        return ResponseEntity.ok(response);
    }
}
