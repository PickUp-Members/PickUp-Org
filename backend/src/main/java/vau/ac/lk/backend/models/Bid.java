package vau.ac.lk.backend.models;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document(collection = "bids")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Bid {
    @Id
    private String id;

    private String productId;
    private String bidderId;
    private Double bidAmount;
    private LocalDateTime bidTime = LocalDateTime.now();
}
