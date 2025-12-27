package notaily.notaily_backend.dto.request.notebook;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class NotebookUpdateRequest {
    private String name;
    private String image;
}
