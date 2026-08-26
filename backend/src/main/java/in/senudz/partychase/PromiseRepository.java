package in.senudz.partychase;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
public interface PromiseRepository extends JpaRepository<Promise, Long> {
    List<Promise> findByTenantId(Long tenantId);
}
