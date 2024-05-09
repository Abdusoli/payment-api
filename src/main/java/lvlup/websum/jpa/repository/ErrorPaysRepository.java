package lvlup.websum.jpa.repository;

import lvlup.websum.jpa.entity.ErrorPays;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ErrorPaysRepository extends JpaRepository<ErrorPays, Long> {
}
