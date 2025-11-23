package notaily.notaily_backend.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import notaily.notaily_backend.enums.ErrorCode;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class AppException extends RuntimeException{
    private ErrorCode errorCode;
}
