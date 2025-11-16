package notaily.notaily_backend.controller.auth;

import notaily.notaily_backend.dto.request.auth.UserCreationRequest;
import notaily.notaily_backend.dto.request.auth.UserUpdatePIRequest;
import notaily.notaily_backend.dto.response.ApiResponse;
import notaily.notaily_backend.dto.response.auth.UserResponse;
import notaily.notaily_backend.entity.User;
import notaily.notaily_backend.mapper.UserMapper;
import notaily.notaily_backend.service.auth.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
public class UserController {
    @Autowired
    private UserService userService;
    @Autowired
    private UserMapper userMapper;

    @GetMapping
    ApiResponse<List<User>> getUsers() {
        ApiResponse<List<User>> response = new ApiResponse<>();
        response.setCode(200);
        response.setResult(userService.getAllUsers());
        return response;
    }

    @GetMapping("{id}")
    ApiResponse<UserResponse> getUserById (@PathVariable("id") String id) {
        ApiResponse<UserResponse> response = new ApiResponse<>();
        response.setCode(200);
        response.setResult(userService.getUserById(id));
        return response;
    }

    @PatchMapping("/update-avatar/{id}")
    ApiResponse<UserResponse> updateAvatar(@PathVariable("id") String id, @RequestBody String request){
        ApiResponse<UserResponse> response = new ApiResponse<>();
        response.setCode(200);
        response.setResult(userService.updateUserAvatarById(id, request));
        return response;
    }

    @PatchMapping("/update-password/{id}")
    ApiResponse<UserResponse> updatePassword(@PathVariable("id") String id, @RequestBody String request){
        ApiResponse<UserResponse> response = new ApiResponse<>();
        response.setCode(200);
        response.setResult(userService.updateUserPasswordUserById(id, request));
        return response;
    }

    @PatchMapping("/update-pi/{id}")
    ApiResponse<UserResponse> updatePersonalInformation(@PathVariable("id") String id, @RequestBody UserUpdatePIRequest request){
        ApiResponse<UserResponse> response = new ApiResponse<>();
        response.setCode(200);
        response.setResult(userService.updateUserPIById(id, request));
        return response;
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
