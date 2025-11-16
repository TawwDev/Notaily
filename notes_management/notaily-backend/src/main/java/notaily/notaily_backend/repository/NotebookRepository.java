package notaily.notaily_backend.repository;

import notaily.notaily_backend.entity.Notebook;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NotebookRepository extends JpaRepository<Notebook, String> {
}
