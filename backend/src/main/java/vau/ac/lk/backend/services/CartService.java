package vau.ac.lk.backend.services;

import org.springframework.stereotype.Service;
import vau.ac.lk.backend.models.Cart;
import vau.ac.lk.backend.models.Product;
import vau.ac.lk.backend.models.support.CartItem;
import vau.ac.lk.backend.repositories.CartRepository;
import vau.ac.lk.backend.repositories.ProductRepository;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class CartService {
    private final CartRepository cartRepository;
    private final ProductRepository productRepository;

    public CartService(CartRepository cartRepository, ProductRepository productRepository) {
        this.cartRepository = cartRepository;
        this.productRepository = productRepository;
    }

    public List<Map<String, Object>> getCartProducts(String userId) {
        Cart cart = cartRepository.findByUserId(userId).orElse(new Cart(null, userId, new ArrayList<>()));
        List<Map<String, Object>> response = new ArrayList<>();
        for (CartItem item : cart.getItems()) {
            Product product = productRepository.findById(item.getProductId()).orElse(null);
            if (product != null) {
                Map<String, Object> dto = new HashMap<>();
                dto.put("productId", product.getId());
                dto.put("title", product.getTitle());
                dto.put("price", product.getPrice() != null ? product.getPrice() : product.getCurrentBid());
                dto.put("img", product.getImages() != null && !product.getImages().isEmpty() ? product.getImages().get(0) : "");
                dto.put("quantity", item.getQuantity());
                response.add(dto);
            }
        }
        return response;
    }

    public List<Map<String, Object>> addProductToCart(String userId, String productId) {
        Cart cart = cartRepository.findByUserId(userId).orElse(new Cart(null, userId, new ArrayList<>()));
        boolean found = false;
        for (CartItem item : cart.getItems()) {
            if (item.getProductId().equals(productId)) {
                item.setQuantity(item.getQuantity() + 1);
                found = true;
                break;
            }
        }
        if (!found) cart.getItems().add(new CartItem(productId, 1));
        cartRepository.save(cart);
        return getCartProducts(userId);
    }

    public List<Map<String, Object>> removeProductFromCart(String userId, String productId) {
        Cart cart = cartRepository.findByUserId(userId).orElse(null);
        if (cart != null) {
            cart.getItems().removeIf(item -> item.getProductId().equals(productId));
            cartRepository.save(cart);
        }
        return getCartProducts(userId);
    }

    public List<Map<String, Object>> updateProductQuantity(String userId, String productId, int quantity) {
        Cart cart = cartRepository.findByUserId(userId).orElse(null);
        if (cart != null) {
            if (quantity <= 0) {
                cart.getItems().removeIf(item -> item.getProductId().equals(productId));
            } else {
                for (CartItem item : cart.getItems()) {
                    if (item.getProductId().equals(productId)) {
                        item.setQuantity(quantity);
                        break;
                    }
                }
            }
            cartRepository.save(cart);
        }
        return getCartProducts(userId);
    }
}
