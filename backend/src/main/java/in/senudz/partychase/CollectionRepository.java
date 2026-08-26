package in.senudz.partychase;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
public interface CollectionRepository extends JpaRepository<Collection, Long> {
    List<Collection> findByTenantId(Long tenantId);
}
