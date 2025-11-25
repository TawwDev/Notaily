package notaily.notaily_backend.service.auth;

import com.nimbusds.jose.*;
import com.nimbusds.jose.crypto.MACSigner;
import com.nimbusds.jose.crypto.MACVerifier;
import com.nimbusds.jwt.JWTClaimsSet;
import com.nimbusds.jwt.SignedJWT;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.experimental.NonFinal;
import lombok.extern.slf4j.Slf4j;
import notaily.notaily_backend.dto.request.auth.LogoutRequest;
import notaily.notaily_backend.entity.InvalidatedToken;
import notaily.notaily_backend.entity.Role;
import notaily.notaily_backend.enums.ErrorCode;
import notaily.notaily_backend.dto.request.auth.AuthenticationRequest;
import notaily.notaily_backend.dto.request.auth.IntrospectRequest;
import notaily.notaily_backend.dto.request.auth.UserCreationRequest;
import notaily.notaily_backend.dto.response.auth.AuthenticationResponse;
import notaily.notaily_backend.dto.response.auth.IntrospectResponse;
import notaily.notaily_backend.entity.User;
import notaily.notaily_backend.enums.RoleEnum;
import notaily.notaily_backend.exception.AppException;
import notaily.notaily_backend.mapper.UserMapper;
import notaily.notaily_backend.repository.InvalidatedTokenRepository;
import notaily.notaily_backend.repository.RoleRepository;
import notaily.notaily_backend.repository.UserRepository;
import org.hibernate.validator.internal.util.logging.Log;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.time.Instant;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import java.util.HashSet;
import java.util.StringJoiner;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AuthenticationService {
    UserRepository userRepository;
    UserMapper userMapper;
    PasswordEncoder passwordEncoder;
    RoleRepository roleRepository;
    InvalidatedTokenRepository invalidatedTokenRepository;

    @NonFinal
    @Value("${jwt.signerKey}")
    protected String SIGNER_KEY;

    @PreAuthorize("hasRole('ADMIN')")
    public IntrospectResponse introspect(IntrospectRequest request) throws ParseException, JOSEException {
        var token = request.getToken();
        boolean isValid = true;

        try {
            verifyToken(token);
        } catch (AppException e) {
            isValid = false;
        }

        return IntrospectResponse.builder()
                .valid(isValid)
                .build();
    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        var user = userRepository.findByUsername(request.getUsername())
                .orElseGet(() -> userRepository.findByEmail(request.getUsername())
                        .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND)));

        boolean authenticated = passwordEncoder.matches(request.getPassword(), user.getHashedPassword());
        if (!authenticated) {
            throw new AppException(ErrorCode.UNAUTHENTICATED);
        }
        var token = generateToken(user);

        return AuthenticationResponse.builder()
                .token(token)
                .authenticated(true)
                .build();
    }

    /**
     * Tạo JWT access token cho user.
     * Token có thời hạn 1 ngày, chứa jti (để blacklist khi logout) và scope (quyền).
     *
     * @param user người dùng đã được xác thực
     * @return chuỗi JWT đã được ký
     */
    private String generateToken(User user) {
        //header
        JWSHeader header = new JWSHeader(JWSAlgorithm.HS512);

        //payload
        JWTClaimsSet jwtClaimsSet = new JWTClaimsSet.Builder()
                .subject(user.getUsername())
                .issuer("notaily.com")
                .issueTime(new Date())
                .expirationTime(new Date(
                        Instant.now().plus(1, ChronoUnit.DAYS).toEpochMilli()
                ))
                .jwtID(UUID.randomUUID().toString())
                .claim("scope", buildScope(user))
                .build();
        Payload payload = new Payload(jwtClaimsSet.toJSONObject());

        JWSObject jwsObject = new JWSObject(header, payload);
        try {
            jwsObject.sign(new MACSigner(SIGNER_KEY.getBytes()));
            return jwsObject.serialize();
        } catch (JOSEException e) {
            log.error("Cannot create token", e);
            throw new RuntimeException(e);
        }
    }

    /**
     * Đăng xuất người dùng: đưa token vào danh sách đen (blacklist).
     * Token vẫn còn hạn nhưng sẽ bị từ chối ở JwtDecoder nhờ validator tùy chỉnh.
     *
     * @param request chứa token cần thu hồi
     */
    public void logout(LogoutRequest request) throws ParseException, JOSEException {
        var signerToken = verifyToken(request.getToken());

        String jit = signerToken.getJWTClaimsSet().getJWTID();
        Date expiryTime = signerToken.getJWTClaimsSet().getExpirationTime();

        InvalidatedToken invalidatedToken = InvalidatedToken.builder()
                .id(jit)
                .expiryTime(expiryTime)
                .build();

        invalidatedTokenRepository.save(invalidatedToken);
    }

    /**
     * Xác minh tính hợp lệ của một JWT token.
     * Kiểm tra:
     * - Chữ ký có đúng không
     * - Token chưa hết hạn
     * - Token chưa bị đưa vào blacklist
     *
     * @param token chuỗi JWT
     * @return SignedJWT nếu hợp lệ
     * @throws AppException nếu token không hợp lệ
     */
    public SignedJWT verifyToken(String token) throws JOSEException, ParseException {
        JWSVerifier verifier = new MACVerifier(SIGNER_KEY.getBytes());

        SignedJWT signedJWT = SignedJWT.parse(token);

        Date expTime = signedJWT.getJWTClaimsSet().getExpirationTime();

        var verified = signedJWT.verify(verifier);

        if (!(verified && expTime.after(new Date()))) {
            throw new AppException(ErrorCode.UNAUTHENTICATED);
        }

        if (invalidatedTokenRepository.existsById(signedJWT.getJWTClaimsSet().getJWTID()))
            throw new AppException(ErrorCode.UNAUTHENTICATED);

        return signedJWT;
    }

    /**
     * Xây dựng chuỗi scope từ roles và permissions của user.
     * Ví dụ: "ROLE_USER READ_PROFILE WRITE_POST"
     *
     * @param user người dùng
     * @return chuỗi scope cách nhau bởi dấu cách
     */
    private String buildScope(User user) {
        StringJoiner stringJoiner = new StringJoiner(" ");
        if (user.getRoles() != null && !user.getRoles().isEmpty()) {
            user.getRoles().forEach(role -> {
                stringJoiner.add("ROLE_" + role.getName());
                if (role.getPermissions() != null && !role.getPermissions().isEmpty()) {
                    role.getPermissions().forEach(permission -> {
                        stringJoiner.add(permission.getName());
                    });
                }
            });
        }
        return stringJoiner.toString();
    }

    public User createUser(UserCreationRequest request) {
        if (userRepository.existsByUsername(request.getUsername())) {
            throw new AppException(ErrorCode.USERNAME_EXISTED);
        }
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new AppException(ErrorCode.EMAIL_EXISTED);
        }
        User user = userMapper.userCreationMapToUser(request);
        user.setHashedPassword(passwordEncoder.encode(request.getPassword()));
        user.setDisplayName(request.getFirstName() + " " + request.getLastName());
        user.setCreatedDate(LocalDate.now());

        Role userRole = roleRepository.findById(RoleEnum.USER.name()).orElseThrow(() -> new AppException(ErrorCode.ROLE_NOT_FOUND));
        HashSet<Role> roles = new HashSet<>();
        roles.add(userRole);
        user.setRoles(roles);

        return userRepository.save(user);
    }
}
