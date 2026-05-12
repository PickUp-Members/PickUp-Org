package vau.ac.lk.backend.services;

import org.springframework.stereotype.Service;
import vau.ac.lk.backend.models.User;
import vau.ac.lk.backend.models.enums.RequestStatus;
import vau.ac.lk.backend.models.support.Business;
import vau.ac.lk.backend.repositories.UserRepository;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepo;

    public UserService(UserRepository userRepo) {
        this.userRepo = userRepo;
    }

    public User applySeller(String id, Business business) {
        User user = userRepo.findById(id).orElseThrow(() -> new RuntimeException("User not found"));

        user.setBusinessDetails(business);
        user.setSellerRequestStatus(RequestStatus.PENDING);

        return userRepo.save(user);
    }
}
