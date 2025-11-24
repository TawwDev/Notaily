package notaily.notaily_backend.mapper;

import notaily.notaily_backend.dto.request.auth.UserCreationRequest;
import notaily.notaily_backend.dto.request.auth.UserUpdatePIRequest;
import notaily.notaily_backend.dto.request.auth.UserUpdateRequest;
import notaily.notaily_backend.dto.response.auth.UserResponse;
import notaily.notaily_backend.entity.User;
import org.mapstruct.*;

@Mapper(componentModel = "spring")
public interface UserMapper {
    User userCreationMapToUser(UserCreationRequest request);
    UserResponse userToUserResponse(User user);

    @Mapping(target = "roles", ignore = true)
    UserResponse toUserResponse(User request);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updatePIRequest(@MappingTarget User user, UserUpdatePIRequest request);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    @Mapping(target = "roles", ignore = true)
    void updateUser (@MappingTarget User user, UserUpdateRequest request);
}
