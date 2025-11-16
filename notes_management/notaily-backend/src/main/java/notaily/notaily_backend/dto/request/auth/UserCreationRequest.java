package notaily.notaily_backend.dto.request.auth;

import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserCreationRequest {
    private String username;
    private String password;
    private String email;
    private String firstName;
    private String lastName;
}
