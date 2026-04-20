package vau.ac.lk.backend.models;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import vau.ac.lk.backend.models.enums.ProductType;

import java.time.LocalDateTime;
import java.util.List;

@Document(collection = "products")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Product {
    @Id
    private String id;

    private String title;
    private String description;
    private String category;
    private String sellerId;
    private ProductType type = ProductType.FIXED;

    // Fixed Price Fields
    private Double price;
    private Integer stock;

    // Auction Fields
    private Double startPrice;
    private Double currentBid;
    private Double reservePrice;
    private LocalDateTime endTime;
    private String winnerId;

    private List<String> images;
    private String status = "ACTIVE"; // ACTIVE, ENDED, DRAFT

    private LocalDateTime createdAt = LocalDateTime.now();
}
