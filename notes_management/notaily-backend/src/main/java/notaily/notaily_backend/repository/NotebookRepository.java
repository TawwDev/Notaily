package notaily.notaily_backend.repository;

import notaily.notaily_backend.entity.Notebook;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface NotebookRepository extends JpaRepository<Notebook, String> {
    @Query("SELECT n FROM Notebook n " +
            "WHERE n.createdBy.username = :username AND " +
            "(:keyword IS NULL OR LOWER(n.name) LIKE LOWER(CONCAT('%',:keyword, '%')))")
    Page<Notebook> findAllByUsernameCustom(@Param("username") String username, @Param("keyword") String keyWord, Pageable pageable);

    @Query("SELECT COUNT(n) FROM Notebook n " +
            "WHERE n.createdBy.username = :username")
    long countByUsername(@Param("username") String username);
}
