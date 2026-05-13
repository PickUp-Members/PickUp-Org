package vau.ac.lk.backend.services;

import org.springframework.stereotype.Service;
import vau.ac.lk.backend.models.Product;
import vau.ac.lk.backend.models.Wishlist;
import vau.ac.lk.backend.repositories.ProductRepository;
import vau.ac.lk.backend.repositories.WishlistRepository;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class WishlistService {
    private final WishlistRepository wishlistRepository;
    private final ProductRepository productRepository;

    public WishlistService(WishlistRepository wishlistRepository, ProductRepository productRepository) {
        this.wishlistRepository = wishlistRepository;
        this.productRepository = productRepository;
    }

    public List<Product> getWishlistProducts(String userId) {
        Optional<Wishlist> wishlistOpt = wishlistRepository.findByUserId(userId);
        if (wishlistOpt.isEmpty()) return new ArrayList<>();
        List<Product> products = new ArrayList<>();
        for (String productId : wishlistOpt.get().getProductIds()) {
            productRepository.findById(productId).ifPresent(products::add);
        }
        return products;
    }

    public List<Product> addProductToWishlist(String userId, String productId) {
        Wishlist wishlist = wishlistRepository.findByUserId(userId).orElse(new Wishlist(null, userId, new ArrayList<>()));
        if (!wishlist.getProductIds().contains(productId)) {
            wishlist.getProductIds().add(productId);
            wishlistRepository.save(wishlist);
        }
        return getWishlistProducts(userId);
    }

    public List<Product> removeProductFromWishlist(String userId, String productId) {
        Wishlist wishlist = wishlistRepository.findByUserId(userId).orElse(null);
        if (wishlist != null && wishlist.getProductIds().contains(productId)) {
            wishlist.getProductIds().remove(productId);
            wishlistRepository.save(wishlist);
        }
        return getWishlistProducts(userId);
    }
}
