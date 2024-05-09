package lvlup.websum.jpa.repository;

import lvlup.websum.jpa.entity.Paylist;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PaylistRepository extends JpaRepository<Paylist, Long> {

    @Query(value = "SELECT * FROM paylist ORDER BY id ASC LIMIT ?1", nativeQuery = true)
    List<Paylist> getPaylistsLimit(final int limit);
}
