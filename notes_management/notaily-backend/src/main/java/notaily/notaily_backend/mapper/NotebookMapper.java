package notaily.notaily_backend.mapper;

import notaily.notaily_backend.dto.request.auth.UserUpdateRequest;
import notaily.notaily_backend.dto.request.notebook.NotebookCreateRequest;
import notaily.notaily_backend.dto.request.notebook.NotebookUpdateRequest;
import notaily.notaily_backend.dto.response.notebook.NotebookResponse;
import notaily.notaily_backend.entity.Notebook;
import notaily.notaily_backend.entity.User;
import org.mapstruct.*;

import java.util.List;

@Mapper(componentModel = "spring")
public interface NotebookMapper {
    Notebook NotebookCreateRequestToNotebook(NotebookCreateRequest request);

    NotebookResponse NotebookToNotebookResponse(Notebook notebook);

    List<NotebookResponse> NotebookToNotebookResponseList(List<Notebook> notebooks);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    @Mapping(target = "createdBy", ignore = true)
    @Mapping(target = "notes", ignore = true)
    void updateNotebook (@MappingTarget Notebook notebook, NotebookUpdateRequest request);
}
