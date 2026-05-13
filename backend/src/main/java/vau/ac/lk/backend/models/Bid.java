package vau.ac.lk.backend.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document(collection = "bids")
public class Bid {
    @Id
    private String id;

    private String productId;
    private String bidderId;
    private Double bidAmount;
    private LocalDateTime bidTime = LocalDateTime.now();

    // String - id
    public String getId() {
        return id;
    }

    // String - productId
    public String getProductId() {
        return productId;
    }
    public void setProductId(String productId) {
        this.productId = productId;
    }

    // String - bidderId
    public String getBidderId() {
        return bidderId;
    }
    public void setBidderId(String bidderId) {
        this.bidderId = bidderId;
    }

    // Double - bidAmount
    public Double getBidAmount() {
        return bidAmount;
    }
    public void setBidAmount(Double bidAmount) {
        this.bidAmount = bidAmount;
    }

    // LocalDateTime - bidTime
    public LocalDateTime getBidTime() {
        return bidTime;
    }
    public void setBidTime(LocalDateTime bidTime) {
        this.bidTime = bidTime;
    }
}
