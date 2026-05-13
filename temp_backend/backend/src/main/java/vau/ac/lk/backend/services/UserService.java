package vau.ac.lk.backend.services;

import org.springframework.stereotype.Service;
import vau.ac.lk.backend.models.User;
import vau.ac.lk.backend.models.enums.RequestStatus;
import vau.ac.lk.backend.models.support.Business;
import vau.ac.lk.backend.repositories.UserRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepo;

    public UserService(UserRepository userRepo) {
        this.userRepo = userRepo;
    }

    /* Buyer */
    // Apply for seller
    public User applySeller(String id, Business business) {
        User user = userRepo.findById(id).orElseThrow(() -> new RuntimeException("User not found"));

        user.setBusinessDetails(business);
        user.setSellerRequestStatus(RequestStatus.PENDING);

        return userRepo.save(user);
    }

    /* Admin */
    // Get all pending requests
    public List<User> getAllPendingRequests() {
        List<User> users = userRepo.findAll();

        return users;
    }
}
