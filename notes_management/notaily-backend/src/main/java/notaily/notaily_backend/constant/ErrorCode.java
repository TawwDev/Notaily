package notaily.notaily_backend.constant;


import jakarta.persistence.Entity;
import lombok.*;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public enum ErrorCode {
    UNCATEGORIZED_EXCEPTION(9999, "Uncategorized Exception!"),

//    Authentication
    USERNAME_EXISTED(409, "Username already exists!"),
    EMAIL_EXISTED(409, "Email already exists!"),
    MISSING_INPUT (400, "Missing Input!"),
    USER_NOT_FOUND(404, "User not found!"),
    USERNAME_INVALID(400, "Username is invalid!"),
    PASSWORD_INVALID(400, "Password is invalid!"),
    ID_INVALID(400, "Id is invalid!"),
    UNAUTHENTICATED(401, "Unauthenticated!");
    private int code;
    private String message;
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
