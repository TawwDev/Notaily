package notaily.notaily_backend.service.notebook;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import notaily.notaily_backend.dto.request.notebook.NotebookCreateRequest;
import notaily.notaily_backend.dto.request.notebook.NotebookUpdateRequest;
import notaily.notaily_backend.dto.response.notebook.NotebookResponse;
import notaily.notaily_backend.entity.Notebook;
import notaily.notaily_backend.entity.User;
import notaily.notaily_backend.enums.ErrorCode;
import notaily.notaily_backend.exception.AppException;
import notaily.notaily_backend.mapper.NotebookMapper;
import notaily.notaily_backend.repository.NotebookRepository;
import notaily.notaily_backend.repository.UserRepository;
import notaily.notaily_backend.service.auth.UserService;
import org.mapstruct.MappingTarget;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;


import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class NotebookService {
    NotebookRepository notebookRepository;
    NotebookMapper notebookMapper;
    UserRepository userRepository;

    public NotebookResponse getNotebookById (String id) {
        Notebook notebook = notebookRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.NOTEBOOK_NOT_FOUND));
        return notebookMapper.NotebookToNotebookResponse(notebook);
    }

    public List<NotebookResponse> getAllNotebooks(String search, Pageable pageable) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        String keyword = (search == null || search.trim().isEmpty()) ? null : search.trim();
        List<Notebook> notebooks = notebookRepository.findAllByUsernameCustom(username, keyword, pageable).getContent();
        return notebookMapper.NotebookToNotebookResponseList(notebooks);
    }

    public NotebookResponse createNotebook (NotebookCreateRequest notebookCreateRequest) {
        Notebook notebook = notebookMapper.NotebookCreateRequestToNotebook(notebookCreateRequest);
        LocalDateTime timeCreate = LocalDateTime.now();
        var context = SecurityContextHolder.getContext();
        String name = context.getAuthentication().getName();
        User user = userRepository.findByUsername(name).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));
        notebook.setCreatedAt(timeCreate);
        notebook.setCreatedBy(user);
        notebook = notebookRepository.save(notebook);
        return notebookMapper.NotebookToNotebookResponse(notebook);
    }

    public NotebookResponse updateNotebook(String id, NotebookUpdateRequest notebookUpdateRequest) {
        Notebook notebook = notebookRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.NOTEBOOK_NOT_FOUND));
        notebookMapper.updateNotebook(notebook, notebookUpdateRequest);
        LocalDateTime timeUpdated = LocalDateTime.now();
        notebook.setUpdatedAt(timeUpdated);
        notebookRepository.save(notebook);
        return notebookMapper.NotebookToNotebookResponse(notebook);
    }

    public void deleteNotebook(String id) {
        Notebook notebook = notebookRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.NOTEBOOK_NOT_FOUND));
        if(notebook.isDefault()) {
            throw new AppException(ErrorCode.NOTEBOOK_CAN_NOT_BE_DELETED);
        }
        notebookRepository.deleteById(notebook.getId());
    }

    public long getTotalNotebooks() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        return  notebookRepository.countByUsername(username);
    }
}
