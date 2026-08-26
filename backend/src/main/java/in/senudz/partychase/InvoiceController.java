package in.senudz.partychase;
import org.springframework.web.bind.annotation.*;
import java.time.Instant;
import java.util.List;
@RestController @RequestMapping("/api/invoices")
public class InvoiceController {
    private final InvoiceRepository repo;
    public InvoiceController(InvoiceRepository repo){ this.repo = repo; }
    @GetMapping public List<Invoice> list(){ return repo.findByTenantId(TenantContext.getTenantId()); }
    @PostMapping public Invoice create(@RequestBody Invoice body){
        body.setId(null); body.setTenantId(TenantContext.getTenantId()); body.setCreatedAt(Instant.now().toString());
        return repo.save(body);
    }
    @PutMapping("/{id}") public Invoice update(@PathVariable Long id, @RequestBody Invoice body){
        Invoice e = repo.findById(id).orElseThrow();
        if(!e.getTenantId().equals(TenantContext.getTenantId())) throw new RuntimeException("forbidden");
        if(body.getPartyId()!=null) e.setPartyId(body.getPartyId());
        if(body.getInvoiceNo()!=null) e.setInvoiceNo(body.getInvoiceNo());
        if(body.getAmount()!=null) e.setAmount(body.getAmount());
        if(body.getOutstanding()!=null) e.setOutstanding(body.getOutstanding());
        if(body.getDueOn()!=null) e.setDueOn(body.getDueOn());
        return repo.save(e);
    }
    @DeleteMapping("/{id}") public void delete(@PathVariable Long id){
        Invoice e = repo.findById(id).orElseThrow();
        if(!e.getTenantId().equals(TenantContext.getTenantId())) throw new RuntimeException("forbidden");
        repo.delete(e);
    }
}
