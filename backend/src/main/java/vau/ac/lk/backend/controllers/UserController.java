package vau.ac.lk.backend.controllers;

import org.springframework.web.bind.annotation.*;
import vau.ac.lk.backend.models.User;
import vau.ac.lk.backend.models.support.Business;
import vau.ac.lk.backend.services.UserService;

@RestController
@RequestMapping("/api/user")
@CrossOrigin(origins = "*")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PatchMapping("/{id}/become-seller")
    public User applySeller(@PathVariable String id, @RequestBody Business business) {
        User updatedUser = userService.applySeller(id, business);

        if (updatedUser != null) {
            return updatedUser;
        }
        else {
            throw new RuntimeException("Failed to apply seller");
        }
    }
}
