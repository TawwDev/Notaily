package notaily.notaily_backend.mapper;


import notaily.notaily_backend.dto.request.auth.PermissionRequest;
import notaily.notaily_backend.dto.response.auth.PermissionResponse;
import notaily.notaily_backend.entity.Permission;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface PermissionMapper {
    Permission toPermission(PermissionRequest request);
    PermissionResponse toPermissionResponse(Permission permission);
}
