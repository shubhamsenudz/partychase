package in.senudz.partychase;
import org.springframework.web.bind.annotation.*;
import java.time.Instant;
import java.util.Map;
@RestController @RequestMapping("/api/import")
public class ImportController {
    private final PartyRepository parties;
    public ImportController(PartyRepository parties) { this.parties = parties; }
    @PostMapping("/parties")
    public Map<String,Integer> parties(@RequestBody Map<String,String> body) {
        int n = 0; Long tid = TenantContext.getTenantId();
        for (Map<String,String> row : Csv.parse(body.get("csv"))) {
            Party p = new Party();
            p.setTenantId(tid);
            p.setName(row.getOrDefault("name", row.get("Name")));
            p.setPhone(row.getOrDefault("phone", row.get("Phone")));
            p.setCity(row.getOrDefault("city", row.get("City")));
            p.setCreatedAt(Instant.now().toString());
            parties.save(p); n++;
        }
        return Map.of("imported", n);
    }
}
