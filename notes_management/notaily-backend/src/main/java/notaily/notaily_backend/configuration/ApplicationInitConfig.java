package notaily.notaily_backend.configuration;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.experimental.NonFinal;
import lombok.extern.slf4j.Slf4j;
import notaily.notaily_backend.entity.Role;
import notaily.notaily_backend.entity.User;
import notaily.notaily_backend.enums.ErrorCode;
import notaily.notaily_backend.enums.RoleEnum;
import notaily.notaily_backend.exception.AppException;
import notaily.notaily_backend.repository.RoleRepository;
import notaily.notaily_backend.repository.UserRepository;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.HashSet;

@Slf4j
@Configuration
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ApplicationInitConfig {

    PasswordEncoder passwordEncoder;

    @NonFinal
    static final String ADMIN_USER_NAME = "admin";

    @NonFinal
    static final String ADMIN_PASSWORD = "admin";

    @Bean
    ApplicationRunner applicationRunner(UserRepository userRepository, RoleRepository roleRepository) {
        return args -> {
            if(userRepository.findByUsername(ADMIN_USER_NAME).isEmpty()){
                roleRepository.save(Role.builder()
                        .name(RoleEnum.USER.name())
                        .description("User role")
                        .build());

                Role adminRole = roleRepository.save(Role.builder()
                        .name(RoleEnum.ADMIN.name())
                        .description("Admin role")
                        .build());
                var roles = new HashSet<Role>();
                roles.add(adminRole);

                User user = User.builder()
                        .username(ADMIN_USER_NAME)
                        .hashedPassword(passwordEncoder.encode(ADMIN_PASSWORD))
                        .email("admin@gmail.com")
                        .roles(roles)
                        .build();
                userRepository.save(user);
            }
        };
    }
}
