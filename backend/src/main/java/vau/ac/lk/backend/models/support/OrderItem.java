package vau.ac.lk.backend.models.support;

import lombok.Data;

@Data
public class OrderItem {
    private String productId;
    private String productTitle;
    private Integer quantity;
    private Double pricePurchase;
}
