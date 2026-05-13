package vau.ac.lk.backend.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import vau.ac.lk.backend.models.Product;
import vau.ac.lk.backend.repositories.ProductRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    public List<Product> getProductsBySeller(String sellerId) {
        return productRepository.findBySellerId(sellerId);
    }

    public Product createProduct(Product product) {
        return productRepository.save(product);
    }

    public Optional<Product> getProductById(String id) {
        return productRepository.findById(id);
    }

    public Product updateProduct(String id, Product productUpdates) {
        return productRepository.findById(id).map(product -> {
            if (productUpdates.getTitle() != null) product.setTitle(productUpdates.getTitle());
            if (productUpdates.getDescription() != null) product.setDescription(productUpdates.getDescription());
            if (productUpdates.getCategory() != null) product.setCategory(productUpdates.getCategory());
            if (productUpdates.getPrice() != null) product.setPrice(productUpdates.getPrice());
            if (productUpdates.getStock() != null) product.setStock(productUpdates.getStock());
            if (productUpdates.getStartPrice() != null) product.setStartPrice(productUpdates.getStartPrice());
            if (productUpdates.getCurrentBid() != null) product.setCurrentBid(productUpdates.getCurrentBid());
            if (productUpdates.getStatus() != null) product.setStatus(productUpdates.getStatus());
            return productRepository.save(product);
        }).orElseThrow(() -> new RuntimeException("Product not found"));
    }

    public void deleteProduct(String id) {
        productRepository.deleteById(id);
    }

    public Product endAuctionEarly(String id) {
        return productRepository.findById(id).map(product -> {
            product.setStatus("ENDED");
            product.setEndTime(LocalDateTime.now());
            return productRepository.save(product);
        }).orElseThrow(() -> new RuntimeException("Product not found"));
    }
}
