package notaily.notaily_backend.repository;

import notaily.notaily_backend.entity.Note;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NoteRepository extends JpaRepository<Note, String> {
}
