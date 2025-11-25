package notaily.notaily_backend.configuration;

import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import notaily.notaily_backend.dto.response.ApiResponse;
import notaily.notaily_backend.enums.ErrorCode;
import org.springframework.http.MediaType;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;

import java.io.IOException;

public class JwtAuthenticationEntryPoint implements AuthenticationEntryPoint {

    /**
     * Xử lý lỗi khi người dùng truy cập tài nguyên bảo vệ mà:
     * - Chưa đăng nhập (không có token)
     * - Token hết hạn
     * - Token bị thu hồi (blacklist)
     * - Token không hợp lệ (chữ ký sai, định dạng sai,...)
     *
     * Thay vì để Spring trả về response mặc định (401 + HTML hoặc JSON thô),
     * trả về response JSON thống nhất với format ApiResponse của hệ thống.
     *
     * Được đăng ký trong SecurityConfig:
     * {@code .authenticationEntryPoint(new JwtAuthenticationEntryPoint())}
     */
    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException)
            throws IOException, ServletException {
        ErrorCode errorCode = ErrorCode.UNAUTHENTICATED;

        response.setStatus(errorCode.getStatusCode().value());
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);

        ApiResponse<?> apiResponse = ApiResponse.builder()
                .code(errorCode.getCode())
                .message(errorCode.getMessage())
                .build();

        ObjectMapper mapper = new ObjectMapper();

        response.getWriter().print(mapper.writeValueAsString(apiResponse));
        response.flushBuffer();
    }
}
