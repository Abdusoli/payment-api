package lvlup.websum.jpa.repository;

import lvlup.websum.jpa.entity.SuccessPays;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SuccessPaysRepository extends JpaRepository<SuccessPays, Long> {
}
