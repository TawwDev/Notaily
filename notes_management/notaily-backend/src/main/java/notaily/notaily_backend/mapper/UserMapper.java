package notaily.notaily_backend.mapper;

import notaily.notaily_backend.dto.request.auth.UserCreationRequest;
import notaily.notaily_backend.dto.request.auth.UserUpdatePIRequest;
import notaily.notaily_backend.dto.response.auth.UserResponse;
import notaily.notaily_backend.entity.User;
import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

@Mapper(componentModel = "spring")
public interface UserMapper {
    User userCreationMapToUser(UserCreationRequest request);
    UserResponse userToUserResponse(User user);
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updatePIRequest(@MappingTarget User user, UserUpdatePIRequest request);
}
