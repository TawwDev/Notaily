package notaily.notaily_backend.repository;

import notaily.notaily_backend.entity.Share;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ShareRepository extends JpaRepository<Share, String> {
}
