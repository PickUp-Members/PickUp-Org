package vau.ac.lk.backend.services;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import vau.ac.lk.backend.models.Product;
import vau.ac.lk.backend.repositories.ProductRepository;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepo;

    public Product createProduct(Product prd) {
        prd.setCreatedAt(LocalDateTime.now());
        return productRepo.save(prd);
    }

    public List<Product> getAllProducts() {
        return productRepo.findAll();
    }

    public List<Product> getProductsByCategory(String category) {
        return productRepo.findByCategory(category);
    }

    public List<Product> getProductsBySeller(String sellerId) {
        return productRepo.findBySellerId(sellerId);
    }

    public void deleteProduct(String id) {
        productRepo.deleteById(id);
    }
}
