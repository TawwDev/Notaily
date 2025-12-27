package notaily.notaily_backend.controller.notebook;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import notaily.notaily_backend.dto.request.notebook.NotebookCreateRequest;
import notaily.notaily_backend.dto.request.notebook.NotebookUpdateRequest;
import notaily.notaily_backend.dto.response.ApiResponse;
import notaily.notaily_backend.dto.response.notebook.NotebookResponse;
import notaily.notaily_backend.entity.Notebook;
import notaily.notaily_backend.mapper.NotebookMapper;
import notaily.notaily_backend.service.notebook.NotebookService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/notebook")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class NotebookController {
    NotebookService notebookService;

    @GetMapping
    public ApiResponse<List<NotebookResponse>> getAllNotebooks() {
        return ApiResponse.<List<NotebookResponse>>builder()
                .code(200)
                .result(notebookService.getAllNotebooks())
                .build();
    }

    @GetMapping("{id}")
    public ApiResponse<NotebookResponse> getNotebookById(@PathVariable("id") String id) {
        return ApiResponse.<NotebookResponse>builder()
                .code(200)
                .result(notebookService.getNotebookById(id))
                .build();
    }

    @PostMapping
    public ApiResponse<NotebookResponse> createNotebook(@RequestBody NotebookCreateRequest request) {
        return ApiResponse.<NotebookResponse>builder()
                .code(200)
                .result(notebookService.createNotebook(request))
                .build();
    }

    @PatchMapping("/{id}")
    public ApiResponse<NotebookResponse> updateNotebook(@PathVariable("id") String id, @RequestBody NotebookUpdateRequest request) {
        return ApiResponse.<NotebookResponse>builder()
                .code(200)
                .result(notebookService.updateNotebook(id, request))
                .build();
    }

    @DeleteMapping("/{id}")
    public ApiResponse<String> deleteNotebook(@PathVariable("id") String id) {
        notebookService.deleteNotebook(id);
        return ApiResponse.<String>builder()
                .code(200)
                .result("delete notebook successfully")
                .build();
    }
}
