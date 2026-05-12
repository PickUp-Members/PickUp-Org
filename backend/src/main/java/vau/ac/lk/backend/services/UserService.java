package vau.ac.lk.backend.services;

import org.springframework.stereotype.Service;
import vau.ac.lk.backend.models.User;
import vau.ac.lk.backend.repositories.UserRepository;

import java.time.LocalDateTime;

@Service
public class UserService {

    private final UserRepository userRepo;

    public UserService(UserRepository userRepo) {
        this.userRepo = userRepo;
    }

}
