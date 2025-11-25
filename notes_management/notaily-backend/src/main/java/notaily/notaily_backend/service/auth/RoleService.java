package notaily.notaily_backend.service.auth;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import notaily.notaily_backend.dto.request.auth.RoleRequest;
import notaily.notaily_backend.dto.response.auth.PermissionResponse;
import notaily.notaily_backend.dto.response.auth.RoleResponse;
import notaily.notaily_backend.entity.User;
import notaily.notaily_backend.enums.ErrorCode;
import notaily.notaily_backend.exception.AppException;
import notaily.notaily_backend.mapper.RoleMapper;
import notaily.notaily_backend.repository.PermissionRepository;
import notaily.notaily_backend.repository.RoleRepository;
import notaily.notaily_backend.repository.UserRepository;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class RoleService {
    RoleRepository roleRepository;
    PermissionRepository permissionRepository;
    RoleMapper roleMapper;

    @PreAuthorize("hasRole('ADMIN')")
    public RoleResponse createRole(RoleRequest request) {
        var role = roleMapper.toRole(request);

        var permissions = permissionRepository.findAllById(request.getPermissions());
        role.setPermissions(new HashSet<>(permissions));

        roleRepository.save(role);
        return roleMapper.toRoleResponse(role);
    }

    @PreAuthorize("hasRole('ADMIN')")
    public List<RoleResponse> getRoles() {
        var roles = roleRepository.findAll();
        return roles
                .stream()
                .map(roleMapper::toRoleResponse)
                .toList();
    }

    @PreAuthorize("hasRole('ADMIN')")
    public void deleteRole(String roleId) {
        roleRepository.deleteById(roleId);
    }
}
