package in.senudz.partychase;
import org.springframework.web.bind.annotation.*;
import java.time.Instant;
import java.util.List;
@RestController @RequestMapping("/api/promises")
public class PromiseController {
    private final PromiseRepository repo;
    public PromiseController(PromiseRepository repo){ this.repo = repo; }
    @GetMapping public List<Promise> list(){ return repo.findByTenantId(TenantContext.getTenantId()); }
    @PostMapping public Promise create(@RequestBody Promise body){
        body.setId(null); body.setTenantId(TenantContext.getTenantId()); body.setCreatedAt(Instant.now().toString());
        return repo.save(body);
    }
    @PutMapping("/{id}") public Promise update(@PathVariable Long id, @RequestBody Promise body){
        Promise e = repo.findById(id).orElseThrow();
        if(!e.getTenantId().equals(TenantContext.getTenantId())) throw new RuntimeException("forbidden");
        if(body.getInvoiceId()!=null) e.setInvoiceId(body.getInvoiceId());
        if(body.getPromiseOn()!=null) e.setPromiseOn(body.getPromiseOn());
        if(body.getNote()!=null) e.setNote(body.getNote());
        if(body.getStatus()!=null) e.setStatus(body.getStatus());
        return repo.save(e);
    }
    @DeleteMapping("/{id}") public void delete(@PathVariable Long id){
        Promise e = repo.findById(id).orElseThrow();
        if(!e.getTenantId().equals(TenantContext.getTenantId())) throw new RuntimeException("forbidden");
        repo.delete(e);
    }
}
