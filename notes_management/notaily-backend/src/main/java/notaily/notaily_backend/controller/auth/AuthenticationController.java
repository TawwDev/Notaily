package notaily.notaily_backend.controller.auth;

import com.nimbusds.jose.JOSEException;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import notaily.notaily_backend.dto.request.auth.AuthenticationRequest;
import notaily.notaily_backend.dto.request.auth.IntrospectRequest;
import notaily.notaily_backend.dto.request.auth.UserCreationRequest;
import notaily.notaily_backend.dto.response.ApiResponse;
import notaily.notaily_backend.dto.response.auth.AuthenticationResponse;
import notaily.notaily_backend.dto.response.auth.IntrospectResponse;
import notaily.notaily_backend.entity.User;
import notaily.notaily_backend.service.auth.AuthenticationService;
import notaily.notaily_backend.service.auth.UserService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.text.ParseException;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AuthenticationController {
    AuthenticationService authenticationService;

    @PostMapping("/log-in")
    ApiResponse<AuthenticationResponse> authenticateUser(@RequestBody AuthenticationRequest request) {
        var result = authenticationService.authenticate(request);
        return ApiResponse.<AuthenticationResponse>builder()
                .code(201)
                .result(result)
                .build();
    }

    @PostMapping("/introspect")
    ApiResponse<IntrospectResponse> authenticateUser(@RequestBody IntrospectRequest request) throws ParseException, JOSEException {
        var result = authenticationService.introspect(request);
        return ApiResponse.<IntrospectResponse>builder()
                .code(201)
                .result(result)
                .build();
    }

    @PostMapping("/sign-up")
    ApiResponse<User> createUser(@RequestBody UserCreationRequest request) {
        return ApiResponse.<User>builder()
                .code(201)
                .result(authenticationService.createUser(request))
                .build();
    }

}
