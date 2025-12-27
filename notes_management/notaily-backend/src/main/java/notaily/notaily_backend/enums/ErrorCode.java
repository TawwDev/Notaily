package notaily.notaily_backend.enums;


import lombok.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public enum ErrorCode {
    UNCATEGORIZED_EXCEPTION(9999, "Uncategorized Exception!", HttpStatus.INTERNAL_SERVER_ERROR),

//    Authentication
    USERNAME_EXISTED(409, "Username already exists!", HttpStatus.BAD_REQUEST),
    EMAIL_EXISTED(409, "Email already exists!",  HttpStatus.BAD_REQUEST),
    MISSING_INPUT (400, "Missing Input!", HttpStatus.BAD_REQUEST),
    USER_NOT_FOUND(404, "User not found!", HttpStatus.NOT_FOUND),
    USERNAME_INVALID(400, "Username is invalid!", HttpStatus.BAD_REQUEST),
    PASSWORD_INVALID(400, "Password is invalid!", HttpStatus.BAD_REQUEST),
    ID_INVALID(400, "Id is invalid!", HttpStatus.BAD_REQUEST),
    UNAUTHENTICATED(401, "Unauthenticated!", HttpStatus.UNAUTHORIZED),
    UNAUTHORIZED(403, "You do not have permission!", HttpStatus.FORBIDDEN),
    ROLE_NOT_FOUND(404, "Role not found!", HttpStatus.NOT_FOUND),

    //Notebook
    NOTEBOOK_NOT_FOUND(404, "Notebook not found!", HttpStatus.NOT_FOUND),
    NOTEBOOK_EXISTS(409, "Notebook already exists!", HttpStatus.BAD_REQUEST),

    // Cloudinary
    FILE_SIZE_ERROR(400, "Max file size is 2MB", HttpStatus.BAD_REQUEST),
    FILE_PATTERN_ERROR(400, "Only jpg, png, gif, bmp files are allowed", HttpStatus.BAD_REQUEST),
    FILE_UPLOAD_ERROR(400, "File upload error!", HttpStatus.BAD_REQUEST),
    ;

    private int code;
    private String message;
    private HttpStatusCode statusCode;
}

/*
200 OK → GET, PUT, PATCH thành công
201 Created → POST thành công
204 No Content → DELETE thành công
400 Bad Request → dữ liệu gửi sai, thieu du lieu
401 Unauthorized → chưa đăng nhập
403 Forbidden → không có quyền
404 Not Found → không tìm thấy
409 Conflict → trùng username/email
 */
