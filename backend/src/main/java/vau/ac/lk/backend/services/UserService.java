package vau.ac.lk.backend.services;

import org.springframework.stereotype.Service;
import vau.ac.lk.backend.models.User;
import vau.ac.lk.backend.models.enums.RequestStatus;
import vau.ac.lk.backend.models.enums.UserRole;
import vau.ac.lk.backend.models.support.Business;
import vau.ac.lk.backend.repositories.UserRepository;

import java.util.List;

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
        List<User> users = userRepo.findBySellerRequestStatus(RequestStatus.PENDING);
        return users;
    }

    // Approve Seller
    public User approveSellerRequest(String id) {
        User user = userRepo.findById(id).orElseThrow(() -> new RuntimeException("User not found"));

        if (user != null) {
            user.setSellerRequestStatus(RequestStatus.APPROVED);
            user.setRole(UserRole.SELLER);
            userRepo.save(user);
        }

        return user;
    }

    // Reject Seller
    public User rejectSellerRequest(String id) {
        User user = userRepo.findById(id).orElseThrow(() -> new RuntimeException("User not found"));

        if (user != null) {
            user.setSellerRequestStatus(RequestStatus.REJECTED);
            userRepo.save(user);
        }

        return user;
    }
}
