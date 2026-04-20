package vau.ac.lk.backend.models;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import vau.ac.lk.backend.models.enums.OrderStatus;
import vau.ac.lk.backend.models.support.OrderItem;

import java.time.LocalDateTime;
import java.util.List;

@Document(collection = "orders")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Order {
    @Id
    private String id;

    private String buyerId;
    private String sellerId;
    private List<OrderItem> items;
    private Double totalAmount;
    private OrderStatus status = OrderStatus.PENDING;
    private String shippingAddress;
    private String paymentStatus;
    private LocalDateTime createdAt = LocalDateTime.now();
}
