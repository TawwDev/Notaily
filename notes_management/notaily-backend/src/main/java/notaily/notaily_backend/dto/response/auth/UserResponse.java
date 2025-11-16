package notaily.notaily_backend.dto.response.auth;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import notaily.notaily_backend.constant.Gender;

import java.time.LocalDate;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserResponse {
    private String id;
    private String username;
    private String hashedPassword;
    private String displayName;
    private String firstName;
    private String lastName;
    private LocalDate dateOfBirth;
    private Gender gender;
    private String email;
    private String phone;
    private String avatarUrl;
    private LocalDate createdDate;
    private LocalDate updatedDate;
}
