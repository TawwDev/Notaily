package notaily.notaily_backend.mapper;

import notaily.notaily_backend.dto.request.auth.RoleRequest;
import notaily.notaily_backend.dto.response.auth.RoleResponse;
import notaily.notaily_backend.entity.Role;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface RoleMapper {
    @Mapping(target = "permissions", ignore = true)
    Role toRole(RoleRequest roleRequest);

    RoleResponse toRoleResponse(Role role);
}
