package vau.ac.lk.backend.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;
import vau.ac.lk.backend.models.User;

import java.util.Optional;

public interface UserRepository extends MongoRepository<User, String> {
    Optional<User> findByEmail(String email);
}
