package vau.ac.lk.backend.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import vau.ac.lk.backend.models.Order;
import vau.ac.lk.backend.models.enums.OrderStatus;
import vau.ac.lk.backend.repositories.OrderRepository;

import java.util.List;
import java.util.Optional;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    public List<Order> getOrdersBySeller(String sellerId) {
        return orderRepository.findBySellerId(sellerId);
    }

    public Optional<Order> getOrderById(String id) {
        return orderRepository.findById(id);
    }

    public Order updateOrderStatus(String id, OrderStatus status) {
        return orderRepository.findById(id).map(order -> {
            order.setStatus(status);
            return orderRepository.save(order);
        }).orElseThrow(() -> new RuntimeException("Order not found"));
    }
    
    public List<Order> getSalesBySeller(String sellerId) {
        // Sales are typically shipped or completed orders
        List<Order> orders = orderRepository.findBySellerId(sellerId);
        return orders.stream()
                .filter(o -> o.getStatus() == OrderStatus.SHIPPED || o.getStatus() == OrderStatus.DELIVERED)
                .toList();
    }
}
