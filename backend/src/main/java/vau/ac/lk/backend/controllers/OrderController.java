package vau.ac.lk.backend.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import vau.ac.lk.backend.models.Order;
import vau.ac.lk.backend.models.enums.OrderStatus;
import vau.ac.lk.backend.services.OrderService;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "*")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @GetMapping("/seller/{sellerId}")
    public ResponseEntity<List<Order>> getSellerOrders(@PathVariable String sellerId) {
        return ResponseEntity.ok(orderService.getOrdersBySeller(sellerId));
    }

    @GetMapping("/sales/seller/{sellerId}")
    public ResponseEntity<List<Order>> getSellerSales(@PathVariable String sellerId) {
        return ResponseEntity.ok(orderService.getSalesBySeller(sellerId));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Map<String, Object>> updateOrder(@PathVariable String id, @RequestBody Map<String, String> updates) {
        String statusStr = updates.get("status");
        if (statusStr == null) {
            Map<String, Object> error = new HashMap<>();
            error.put("success", false);
            error.put("message", "Status is required");
            return ResponseEntity.badRequest().body(error);
        }
        
        try {
            OrderStatus status = OrderStatus.valueOf(statusStr);
            Order updated = orderService.updateOrderStatus(id, status);
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("order", updated);
            return ResponseEntity.ok(response);
        } catch (IllegalArgumentException e) {
            Map<String, Object> error = new HashMap<>();
            error.put("success", false);
            error.put("message", "Invalid status");
            return ResponseEntity.badRequest().body(error);
        }
    }
}
