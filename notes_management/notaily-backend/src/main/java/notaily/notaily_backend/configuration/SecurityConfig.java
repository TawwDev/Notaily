package notaily.notaily_backend.configuration;

import lombok.RequiredArgsConstructor;
import notaily.notaily_backend.repository.InvalidatedTokenRepository;
import notaily.notaily_backend.service.auth.AuthenticationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.core.*;
import org.springframework.security.oauth2.jose.jws.MacAlgorithm;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.JwtValidators;
import org.springframework.security.oauth2.jwt.NimbusJwtDecoder;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationConverter;
import org.springframework.security.oauth2.server.resource.authentication.JwtGrantedAuthoritiesConverter;
import org.springframework.security.web.SecurityFilterChain;

import javax.crypto.spec.SecretKeySpec;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity // Cho phép sử dụng @PreAuthorize, @Secured trên method
@RequiredArgsConstructor
public class SecurityConfig {

    private final String[] PUBLIC_ENDPOINTS = {
            "/auth/log-in",
            "/auth/sign-up",
            "/auth/log-out"
    };

    @Value("${jwt.signerKey}")
    private String signerKey;

    private final InvalidatedTokenRepository invalidatedTokenRepository;

    /**
     * Cấu hình chuỗi filter bảo mật chính của Spring Security.
     * Quy định:
     * - Các endpoint công khai (login, signup, logout) được phép truy cập mà không cần token.
     * - Tất cả các request còn lại đều phải được xác thực bằng JWT.
     * - Sử dụng OAuth2 Resource Server với JWT làm cơ chế xác thực.
     * - Tắt CSRF vì API sử dụng token (stateless).
     */
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity httpSecurity) throws Exception {
        httpSecurity.authorizeHttpRequests(requests ->
                        requests.requestMatchers(HttpMethod.POST, PUBLIC_ENDPOINTS)
                                .permitAll()
                                .anyRequest()
                                .authenticated()
        );

        httpSecurity.oauth2ResourceServer(oauth2 ->
                oauth2.jwt(jwtConfigurer -> jwtConfigurer
                                .decoder(jwtDecoder())
                                .jwtAuthenticationConverter(jwtAuthenticationConverter())
                        )
                        .authenticationEntryPoint(new JwtAuthenticationEntryPoint())
        );

        httpSecurity.csrf(AbstractHttpConfigurer::disable);
        return httpSecurity.build();
    }

    /**
     * Tạo bean JwtDecoder có khả năng:
     * - Giải mã JWT bằng thuật toán HMAC-SHA512 với secret key từ application.yml
     * - Kiểm tra các validator mặc định (exp, nbf, iat, iss...)
     * - Kiểm tra thêm blacklist: nếu token's JTI (JWT ID) đã bị đưa vào danh sách invalidated → từ chối
     *
     * @return JwtDecoder đã được cấu hình validator tùy chỉnh
     */
    @Bean
    JwtDecoder jwtDecoder() {
        SecretKeySpec secretKeySpec = new SecretKeySpec(signerKey.getBytes(), "HS512");

        NimbusJwtDecoder decoder = NimbusJwtDecoder
                .withSecretKey(secretKeySpec)
                .macAlgorithm(MacAlgorithm.HS512)
                .build();

        OAuth2TokenValidator<Jwt> checkInvalidated = jwt -> {
            String jti = jwt.getId();
            if(jti != null && invalidatedTokenRepository.existsById(jti)) {
                return OAuth2TokenValidatorResult.failure(
                        new OAuth2Error("invalid_token", "Token has been revoked", null)
                );
            }
            return OAuth2TokenValidatorResult.success();
        };

        OAuth2TokenValidator<Jwt> validator = new DelegatingOAuth2TokenValidator<>(
                JwtValidators.createDefault(),      // exp, nbf, iat...
                checkInvalidated                    // + kiểm tra blacklist
        );

        decoder.setJwtValidator(validator);
        return decoder;
    }

    /**
     * Chuyển đổi JWT thành đối tượng Authentication của Spring Security.
     * - Trích xuất các authorities từ claim "scope" hoặc "scp" (mặc định của Spring).
     * - Loại bỏ prefix "SCOPE_" để authority chỉ còn là tên role/scope thực tế (VD: "ROLE_USER" → "USER").
     *
     * @return JwtAuthenticationConverter đã được cấu hình
     */
    @Bean
    JwtAuthenticationConverter jwtAuthenticationConverter() {
        JwtGrantedAuthoritiesConverter jwtGrantedAuthoritiesConverter = new JwtGrantedAuthoritiesConverter();
        jwtGrantedAuthoritiesConverter.setAuthorityPrefix(""); //mac dinh la scope

        JwtAuthenticationConverter jwtAuthenticationConverter = new JwtAuthenticationConverter();
        jwtAuthenticationConverter.setJwtGrantedAuthoritiesConverter(jwtGrantedAuthoritiesConverter);

        return jwtAuthenticationConverter;
    }

}
