package notaily.notaily_backend.controller.note;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import notaily.notaily_backend.dto.response.ApiResponse;
import notaily.notaily_backend.dto.response.cloudinary.CloudinaryResponse;
import notaily.notaily_backend.service.cloudinary.CloudinaryService;
import notaily.notaily_backend.util.FileUploadUtil;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/note")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class NoteController {
    CloudinaryService cloudinaryService;

    @PostMapping("/upload-image")
    public ApiResponse<CloudinaryResponse> uploadImage(@RequestParam("image") MultipartFile file) {
        FileUploadUtil.assertAllowed(file, FileUploadUtil.IMAGE_PATTERN);

        String fileName = FileUploadUtil.getFileName(file.getOriginalFilename());

        CloudinaryResponse response = cloudinaryService.uploadFile(file, fileName);

        return ApiResponse.<CloudinaryResponse>builder()
                .result(response)
                .build();
    }

}
