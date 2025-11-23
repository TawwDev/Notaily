package notaily.notaily_backend.service.auth;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import notaily.notaily_backend.enums.ErrorCode;
import notaily.notaily_backend.dto.request.auth.UserUpdatePIRequest;
import notaily.notaily_backend.dto.response.auth.UserResponse;
import notaily.notaily_backend.entity.User;
import notaily.notaily_backend.exception.AppException;
import notaily.notaily_backend.mapper.UserMapper;
import notaily.notaily_backend.repository.UserRepository;
import org.springframework.security.access.prepost.PostAuthorize;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class UserService {
    UserRepository userRepository;
    UserMapper userMapper;
    PasswordEncoder passwordEncoder;

    @PreAuthorize("hasRole('ADMIN')")
    public List<UserResponse> getAllUsers() {
        return userRepository.findAll().stream().map(userMapper::userToUserResponse).toList();
    }

    @PostAuthorize("hasRole('ADMIN') or returnObject.username == authentication.name")
    public UserResponse getUserById(String id) {
        return userMapper.userToUserResponse(
                userRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND))
        );
    }

    public UserResponse getMyInfo() {
        var context = SecurityContextHolder.getContext();
        String name = context.getAuthentication().getName();

        User user = userRepository.findByUsername(name).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));
        return userMapper.userToUserResponse(user);
    }

    @PostAuthorize("returnObject.username == authentication.name")
    public UserResponse updateUserAvatarById(String id, String avatarURL) {
        User user = userRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));
        user.setUpdatedDate(LocalDate.now());
        user.setAvatarUrl(avatarURL);
        return userMapper.userToUserResponse(userRepository.save(user));
    }

    @PostAuthorize("returnObject.username == authentication.name")
    public UserResponse updateUserPasswordUserById(String id, String password) {
        User user = userRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));
        user.setUpdatedDate(LocalDate.now());
        user.setHashedPassword(passwordEncoder.encode(password));
        return userMapper.userToUserResponse(userRepository.save(user));
    }

    @PostAuthorize("returnObject.username == authentication.name")
    public UserResponse updateUserPIById(String id, UserUpdatePIRequest request) {
        User user = userRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));
        user.setUpdatedDate(LocalDate.now());

        if (!user.getEmail().equals(request.getEmail())) {
            if (userRepository.existsByEmail(request.getEmail())) {
                throw new AppException(ErrorCode.EMAIL_EXISTED);
            }
        }
        userMapper.updatePIRequest(user, request);
        return userMapper.userToUserResponse(userRepository.save(user));
    }

    @PreAuthorize("hasRole('ADMIN')")
    public void deleteUserById(String id) {
        userRepository.deleteById(id);
    }
}
