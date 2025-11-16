package notaily.notaily_backend.service.auth;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import notaily.notaily_backend.constant.ErrorCode;
import notaily.notaily_backend.dto.request.auth.UserCreationRequest;
import notaily.notaily_backend.dto.request.auth.UserUpdatePIRequest;
import notaily.notaily_backend.dto.response.auth.UserResponse;
import notaily.notaily_backend.entity.User;
import notaily.notaily_backend.exception.AppException;
import notaily.notaily_backend.mapper.UserMapper;
import notaily.notaily_backend.repository.UserRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class UserService {
    UserRepository userRepository;
    UserMapper userMapper;

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public UserResponse getUserById(String id) {
        return userMapper.userToUserResponse(
                userRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND))
        );
    }

    public UserResponse updateUserAvatarById(String id, String avatarURL) {
        User user = userRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));
        user.setUpdatedDate(LocalDate.now());
        user.setAvatarUrl(avatarURL);
        return userMapper.userToUserResponse(userRepository.save(user));
    }

    public UserResponse updateUserPasswordUserById(String id, String password) {
        User user = userRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));
        user.setUpdatedDate(LocalDate.now());
        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder(10);
        user.setHashedPassword(passwordEncoder.encode(password));
        return userMapper.userToUserResponse(userRepository.save(user));
    }

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

    public void deleteUserById(String id) {
        userRepository.deleteById(id);
    }
}
