package vau.ac.lk.backend.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;
import vau.ac.lk.backend.models.Order;

public interface OrderRepository extends MongoRepository<Order, String> {

}
