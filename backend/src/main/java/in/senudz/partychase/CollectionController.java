package in.senudz.partychase;
import org.springframework.web.bind.annotation.*;
import java.time.Instant;
import java.util.List;
@RestController @RequestMapping("/api/collections")
public class CollectionController {
    private final CollectionRepository repo;
    public CollectionController(CollectionRepository repo){ this.repo = repo; }
    @GetMapping public List<Collection> list(){ return repo.findByTenantId(TenantContext.getTenantId()); }
    @PostMapping public Collection create(@RequestBody Collection body){
        body.setId(null); body.setTenantId(TenantContext.getTenantId()); body.setCreatedAt(Instant.now().toString());
        return repo.save(body);
    }
    @PutMapping("/{id}") public Collection update(@PathVariable Long id, @RequestBody Collection body){
        Collection e = repo.findById(id).orElseThrow();
        if(!e.getTenantId().equals(TenantContext.getTenantId())) throw new RuntimeException("forbidden");
        if(body.getInvoiceId()!=null) e.setInvoiceId(body.getInvoiceId());
        if(body.getAmount()!=null) e.setAmount(body.getAmount());
        if(body.getMode()!=null) e.setMode(body.getMode());
        return repo.save(e);
    }
    @DeleteMapping("/{id}") public void delete(@PathVariable Long id){
        Collection e = repo.findById(id).orElseThrow();
        if(!e.getTenantId().equals(TenantContext.getTenantId())) throw new RuntimeException("forbidden");
        repo.delete(e);
    }
}
