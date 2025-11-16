package notaily.notaily_backend.controller.auth;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import notaily.notaily_backend.dto.request.auth.AuthenticationRequest;
import notaily.notaily_backend.dto.request.auth.UserCreationRequest;
import notaily.notaily_backend.dto.response.ApiResponse;
import notaily.notaily_backend.dto.response.auth.AuthenticationResponse;
import notaily.notaily_backend.entity.User;
import notaily.notaily_backend.service.auth.AuthenticationService;
import notaily.notaily_backend.service.auth.UserService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AuthenticationController {
    AuthenticationService authenticationService;

    @PostMapping("/log-in")
    ApiResponse<AuthenticationResponse> AuthenticateUser(@RequestBody AuthenticationRequest request) {
        boolean result = authenticationService.authenticate(request);
        return ApiResponse.<AuthenticationResponse>builder()
                .result(AuthenticationResponse.builder()
                        .authenticated(result)
                        .build())
                .build();
    }

    @PostMapping("/sign-in")
    ApiResponse<User> createUser(@RequestBody UserCreationRequest request) {
        return ApiResponse.<User>builder()
                .code(201)
                .result(authenticationService.createUser(request))
                .build();
    }

}
