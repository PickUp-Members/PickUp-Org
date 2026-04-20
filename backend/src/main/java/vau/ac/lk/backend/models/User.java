package vau.ac.lk.backend.models;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.index.Indexed;
import vau.ac.lk.backend.models.enums.RequestStatus;
import vau.ac.lk.backend.models.enums.UserRole;
import vau.ac.lk.backend.models.support.Address;
import vau.ac.lk.backend.models.support.Business;

import java.time.LocalDateTime;
import java.util.List;

@Document(collection = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {
    @Id
    private String id;

    @Indexed(unique = true)
    private String email;

    private String password;
    private String fullName;
    private UserRole role = UserRole.BUYER;
    private String profilePic;
    private List<Address> addresses;
    private RequestStatus sellerRequestStatus = RequestStatus.NONE;
    private Business businessDetails;
    private LocalDateTime createdAt = LocalDateTime.now();
}
