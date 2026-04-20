package vau.ac.lk.backend.services;

import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import vau.ac.lk.backend.models.User;
import vau.ac.lk.backend.repositories.UserRepository;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepo;
    private final PasswordEncoder passEncoder;

    // Logic to register new user
    public User registerUser(User user) {
        user.setPassword(passEncoder.encode(user.getPassword()));
        return userRepo.save(user);
    }

    // Logic to find a user by email
    public Optional<User> findByEmail (String email) {
        return userRepo.findByEmail(email);
    }
}
