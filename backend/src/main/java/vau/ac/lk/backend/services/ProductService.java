package vau.ac.lk.backend.services;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import vau.ac.lk.backend.models.Product;
import vau.ac.lk.backend.repositories.ProductRepository;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepo;

    public Product createProduct(Product prd) {
        prd.setCreatedAt(LocalDateTime.now());
        return productRepo.save(prd);
    }
}
