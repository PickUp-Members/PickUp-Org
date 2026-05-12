package vau.ac.lk.backend.services;

import org.springframework.stereotype.Service;
import vau.ac.lk.backend.models.User;
import vau.ac.lk.backend.repositories.UserRepository;

import java.time.LocalDateTime;

@Service
public class AuthService {

    private final UserRepository userRepo;

    public AuthService(UserRepository userRepo) {
        this.userRepo = userRepo;
    }

    public User register(User user) {
        User exist = userRepo.findByEmail(user.getEmail()).orElse(null);

        if (exist != null) {
            throw new RuntimeException("Email already exist.");
        }

        user.setCreatedAt(LocalDateTime.now());
        return userRepo.save(user);
    }

    public User login(String email, String password) {
        User exist = userRepo.findByEmail(email).orElse(null);

        if (exist == null) {
            throw new RuntimeException("User not found.");
        }

        if (!exist.getPassword().equals(password)) {
            throw new RuntimeException("Password not match.");
        }

        return exist;
    }
}
