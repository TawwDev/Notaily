package notaily.notaily_backend.service.cloudinary;

import com.cloudinary.Cloudinary;
import jakarta.transaction.Transactional;
import notaily.notaily_backend.dto.response.cloudinary.CloudinaryResponse;
import notaily.notaily_backend.enums.ErrorCode;
import notaily.notaily_backend.exception.AppException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.Map;

@Service
public class CloudinaryService {
    @Autowired
    private Cloudinary cloudinary;

    @Transactional
    public CloudinaryResponse uploadFile(final MultipartFile file, final String fileName) {
        try {
            final Map result = this.cloudinary.uploader()
                    .upload(file.getBytes(),
                            Map.of("public_id",
                                    "notaily/note/"
                                            + fileName));
            final String url = (String) result.get("secure_url");
            final String publicId = (String) result.get("public_id");
            return CloudinaryResponse.builder().publicId(publicId).url(url)
                    .build();
        } catch (final Exception e) {
            throw new AppException(ErrorCode.FILE_UPLOAD_ERROR);
        }
    }
}
