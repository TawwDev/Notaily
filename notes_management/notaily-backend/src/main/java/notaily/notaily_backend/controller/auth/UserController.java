package notaily.notaily_backend.controller.auth;

import lombok.extern.slf4j.Slf4j;
import notaily.notaily_backend.dto.request.auth.UserUpdatePIRequest;
import notaily.notaily_backend.dto.request.auth.UserUpdateRequest;
import notaily.notaily_backend.dto.response.ApiResponse;
import notaily.notaily_backend.dto.response.auth.UserResponse;
import notaily.notaily_backend.mapper.UserMapper;
import notaily.notaily_backend.service.auth.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;

@Slf4j
@RestController
@RequestMapping("/users")
public class UserController {
    @Autowired
    private UserService userService;
    @Autowired
    private UserMapper userMapper;

    @GetMapping
    ApiResponse<List<UserResponse>> getUsers() {
        var authentication = SecurityContextHolder.getContext().getAuthentication();

        log.info("UserName: {}", authentication.getName());
        authentication.getAuthorities().forEach(authority -> {
            log.info(authority.getAuthority());
        });

        ApiResponse<List<UserResponse>> response = new ApiResponse<>();
        response.setCode(200);
        response.setResult(userService.getAllUsers());
        return response;
    }


    @GetMapping("/my-info")
    ApiResponse<UserResponse> getMyInfo() {
        return ApiResponse.<UserResponse>builder()
                .result(userService.getMyInfo())
                .build();
    }

    @GetMapping("{id}")
    ApiResponse<UserResponse> getUserById (@PathVariable("id") String id) {
        ApiResponse<UserResponse> response = new ApiResponse<>();
        response.setCode(200);
        response.setResult(userService.getUserById(id));
        return response;
    }

    @PatchMapping("/{id}")
    ApiResponse<UserResponse> updateUser(@PathVariable("id") String id, @RequestBody UserUpdateRequest request){
        return ApiResponse.<UserResponse>builder()
                .code(200)
                .message("User updated successfully")
                .result(userService.updateUser(id, request))
                .build();
    }

    @DeleteMapping("{id}")
    ApiResponse<String> deleteUser(@PathVariable("id") String id){
        ApiResponse<String> response = new ApiResponse<>();
        UserResponse user = userService.getUserById(id);
        userService.deleteUserById(id);
        response.setCode(204);
        response.setResult("User has been deleted");
        return response;
    }
}
