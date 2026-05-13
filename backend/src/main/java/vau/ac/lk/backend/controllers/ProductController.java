package vau.ac.lk.backend.controllers;

import org.springframework.web.bind.annotation.*;
import vau.ac.lk.backend.models.Product;
import vau.ac.lk.backend.services.ProductService;

import java.util.List;

@RestController
@RequestMapping("/api/product")
@CrossOrigin(origins = "*")
public class ProductController {
    private final ProductService prdService;

    public ProductController(ProductService prdService) {
        this.prdService = prdService;
    }

    @PostMapping("/addProduct/{id}")
    public Product addProduct(@RequestBody Product product, @PathVariable String id) {
        return prdService.addProduct(product, id);
    }

    @GetMapping("/getAllProducts")
    public List<Product> getAllProducts() {
        return prdService.getAllProducts();
    }
}
