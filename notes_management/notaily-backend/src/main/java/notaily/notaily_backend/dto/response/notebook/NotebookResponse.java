package notaily.notaily_backend.dto.response.notebook;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import notaily.notaily_backend.dto.response.auth.UserResponse;
import notaily.notaily_backend.entity.Note;
import notaily.notaily_backend.entity.User;

import java.time.LocalDate;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class NotebookResponse {
    private String id;
    private String name;
    private String image;
    private UserResponse createdBy;
    private LocalDate createdAt;
    private LocalDate updatedAt;
    private boolean deleted;
    private List<Note> notes;
}
