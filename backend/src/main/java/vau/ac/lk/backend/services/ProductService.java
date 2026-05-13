package vau.ac.lk.backend.services;

import org.springframework.stereotype.Service;
import vau.ac.lk.backend.models.Product;
import vau.ac.lk.backend.repositories.ProductRepository;
import vau.ac.lk.backend.repositories.UserRepository;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ProductService {
    private final ProductRepository prdRepo;

    public ProductService(ProductRepository prdRepo) {
        this.prdRepo = prdRepo;
    }

    public Product addProduct(Product product, String id) {
        if (product.getPrice() != null && product.getPrice() < 0) {
            throw new RuntimeException("Product price cannot be negative");
        }
        if (product.getStock() != null && product.getStock() < 0) {
            throw new RuntimeException("Product stock cannot be negative");
        }
        if (id == null) {
            throw new RuntimeException("Seller id cannot be null");
        }
        if (product.getType().name().equals("AUCTION")) {
            if (product.getStartPrice() == null || product.getStartPrice() < 0) {
                throw new RuntimeException("Invalid auction start price");
            }
        }

        product.setSellerId(id);
        product.setCreatedAt(LocalDateTime.now());

        return prdRepo.save(product);
    }

    public List<Product> getAllProducts() {
        return prdRepo.findAll();
    }
}
