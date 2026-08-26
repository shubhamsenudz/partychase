package in.senudz.partychase;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
public interface PartyRepository extends JpaRepository<Party, Long> {
    List<Party> findByTenantId(Long tenantId);
}
