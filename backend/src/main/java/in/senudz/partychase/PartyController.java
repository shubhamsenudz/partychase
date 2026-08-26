package in.senudz.partychase;
import org.springframework.web.bind.annotation.*;
import java.time.Instant;
import java.util.List;
@RestController @RequestMapping("/api/parties")
public class PartyController {
    private final PartyRepository repo;
    public PartyController(PartyRepository repo){ this.repo = repo; }
    @GetMapping public List<Party> list(){ return repo.findByTenantId(TenantContext.getTenantId()); }
    @PostMapping public Party create(@RequestBody Party body){
        body.setId(null); body.setTenantId(TenantContext.getTenantId()); body.setCreatedAt(Instant.now().toString());
        return repo.save(body);
    }
    @PutMapping("/{id}") public Party update(@PathVariable Long id, @RequestBody Party body){
        Party e = repo.findById(id).orElseThrow();
        if(!e.getTenantId().equals(TenantContext.getTenantId())) throw new RuntimeException("forbidden");
        if(body.getName()!=null) e.setName(body.getName());
        if(body.getPhone()!=null) e.setPhone(body.getPhone());
        if(body.getCity()!=null) e.setCity(body.getCity());
        if(body.getCreditDays()!=null) e.setCreditDays(body.getCreditDays());
        return repo.save(e);
    }
    @DeleteMapping("/{id}") public void delete(@PathVariable Long id){
        Party e = repo.findById(id).orElseThrow();
        if(!e.getTenantId().equals(TenantContext.getTenantId())) throw new RuntimeException("forbidden");
        repo.delete(e);
    }
}
