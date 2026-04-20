package vau.ac.lk.backend.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import vau.ac.lk.backend.models.Product;
import vau.ac.lk.backend.services.ProductService;

@RestController
@RequestMapping("/api/product")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class ProductController {

    private final ProductService prdService;

    @PostMapping("/add")
    public ResponseEntity<Product> addProduct(@RequestBody Product prd) {
        return ResponseEntity.ok(prdService.createProduct(prd));
    }
}
