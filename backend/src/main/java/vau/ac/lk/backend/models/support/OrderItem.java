package vau.ac.lk.backend.models.support;

public class OrderItem {
    private String productId;
    private String productTitle;
    private Integer quantity;
    private Double pricePurchase;

    /* Constructors */
    // No arg Constructors
    public OrderItem() {}
    // All Arg Constructors
    public OrderItem(String productId, String productTitle, Integer quantity, Double pricePurchase) {
        this.productId = productId;
        this.productTitle = productTitle;
        this.quantity = quantity;
        this.pricePurchase = pricePurchase;
    }

    // String - productId
    public String getProductId() {
        return productId;
    }
    public void setProductId(String productId) {
        this.productId = productId;
    }

    // String - productTitle
    public String getProductTitle() {
        return productTitle;
    }
    public void setProductTitle(String productTitle) {
        this.productTitle = productTitle;
    }

    // Integer - quantity
    public Integer getQuantity() {
        return quantity;
    }
    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    // Double - pricePurchase
    public Double getPricePurchase() {
        return pricePurchase;
    }
    public void setPricePurchase(Double pricePurchase) {
        this.pricePurchase = pricePurchase;
    }
}
