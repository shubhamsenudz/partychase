package in.senudz.partychase;
import org.springframework.web.bind.annotation.*;
import java.util.Map;
@RestController @RequestMapping("/api/dashboard")
public class DashboardController {
    private final TenantRepository tenants;
    public DashboardController(TenantRepository tenants){ this.tenants=tenants; }
    @GetMapping public Map<String,Object> stats(){
        Tenant t = tenants.findById(TenantContext.getTenantId()).orElseThrow();
        return Map.of("product", "PartyChase", "tenant", t.getName(), "tag", "Outstanding chase when Tally lives at the CA. Import, promise, collect.");
    }
}
