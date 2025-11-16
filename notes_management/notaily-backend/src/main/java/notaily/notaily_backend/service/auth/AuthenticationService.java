package notaily.notaily_backend.service.auth;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import notaily.notaily_backend.constant.ErrorCode;
import notaily.notaily_backend.dto.request.auth.AuthenticationRequest;
import notaily.notaily_backend.dto.request.auth.UserCreationRequest;
import notaily.notaily_backend.entity.User;
import notaily.notaily_backend.exception.AppException;
import notaily.notaily_backend.mapper.UserMapper;
import notaily.notaily_backend.repository.UserRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AuthenticationService {
    UserRepository userRepository;
    UserMapper userMapper;

    public boolean authenticate(AuthenticationRequest request) {
        var user = userRepository.findByUsername(request.getUsername())
                .orElseGet(() -> userRepository.findByEmail(request.getUsername())
                        .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND)));

        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder(10);
        return passwordEncoder.matches(request.getPassword(), user.getHashedPassword());
    }

    public User createUser(UserCreationRequest request) {
        if (userRepository.existsByUsername(request.getUsername())) {
            throw new AppException(ErrorCode.USERNAME_EXISTED);
        }
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new AppException(ErrorCode.EMAIL_EXISTED);
        }
        User user = userMapper.userCreationMapToUser(request);
        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder(10);
        user.setHashedPassword(passwordEncoder.encode(user.getHashedPassword()));
        user.setDisplayName(request.getFirstName() + " " + request.getLastName());
        user.setCreatedDate(LocalDate.now());
        return userRepository.save(user);
    }
}
