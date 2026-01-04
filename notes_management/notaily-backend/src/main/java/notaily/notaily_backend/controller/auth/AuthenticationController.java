package notaily.notaily_backend.controller.auth;

import com.nimbusds.jose.JOSEException;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import notaily.notaily_backend.dto.request.auth.AuthenticationRequest;
import notaily.notaily_backend.dto.request.auth.IntrospectRequest;
import notaily.notaily_backend.dto.request.auth.LogoutRequest;
import notaily.notaily_backend.dto.request.auth.UserCreationRequest;
import notaily.notaily_backend.dto.response.ApiResponse;
import notaily.notaily_backend.dto.response.auth.AuthenticationResponse;
import notaily.notaily_backend.dto.response.auth.IntrospectResponse;
import notaily.notaily_backend.dto.response.auth.UserResponse;
import notaily.notaily_backend.entity.User;
import notaily.notaily_backend.service.auth.AuthenticationService;
import notaily.notaily_backend.service.auth.UserService;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AuthenticationController {
    AuthenticationService authenticationService;

    @PostMapping("/log-in")
    ResponseEntity<ApiResponse<AuthenticationResponse>> authenticateUser(@RequestBody AuthenticationRequest request) {
        var result = authenticationService.authenticate(request);

        ResponseCookie jwtCookie = ResponseCookie.from("accessToken", result.getToken())
                .httpOnly(true)
                .secure(true)
                .path("/")
                .maxAge(24 * 60 * 60)
                .sameSite("Lax")
                .build();

        result.setToken(null);

        return ResponseEntity.status(201)
                .header(HttpHeaders.SET_COOKIE, jwtCookie.toString())
                .body(ApiResponse.<AuthenticationResponse>builder()
                        .code(201)
                        .result(result)
                        .build()
                );
    }

    @PostMapping("/introspect")
    ApiResponse<IntrospectResponse> authenticateUser(@CookieValue(name = "accessToken", required = false) String token) throws ParseException, JOSEException {
        var result = authenticationService.introspect(IntrospectRequest.builder().token(token).build());
        return ApiResponse.<IntrospectResponse>builder()
                .code(201)
                .result(result)
                .build();
    }

    @PostMapping("/sign-up")
    ApiResponse<UserResponse> createUser(@RequestBody UserCreationRequest request) {
        return ApiResponse.<UserResponse>builder()
                .code(201)
                .result(authenticationService.createUser(request))
                .build();
    }

    @PostMapping("/log-out")
    ResponseEntity<ApiResponse<Void>> logoutUser(@CookieValue(name = "accessToken", required = false) String token) throws ParseException, JOSEException {
        ResponseCookie cleanCookie = ResponseCookie.from("accessToken", "")
                .httpOnly(true)
                .secure(true)
                .path("/")
                .maxAge(0)
                .sameSite("Lax")
                .build();

        authenticationService.logout(LogoutRequest.builder().token(token).build());

        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, cleanCookie.toString())
                .body(ApiResponse.<Void>builder()
                        .code(201)
                        .message("Successfully logged out!")
                        .build());
    }

}
