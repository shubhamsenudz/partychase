package in.senudz.partychase;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDate;
import java.util.*;
@RestController @RequestMapping("/api/work")
public class WorkController {
    private final InvoiceRepository invoices;
    private final PartyRepository parties;
    public WorkController(InvoiceRepository invoices, PartyRepository parties) {
        this.invoices = invoices; this.parties = parties;
    }
    @GetMapping
    public Map<String,Object> today() {
        Long tid = TenantContext.getTenantId();
        LocalDate today = LocalDate.now();
        int total = 0, a30=0, a60=0, a90=0, a90p=0;
        List<Map<String,Object>> chase = new ArrayList<>();
        Map<Long,String> names = new HashMap<>();
        parties.findByTenantId(tid).forEach(p -> names.put(p.getId(), p.getName()));
        for (Invoice inv : invoices.findByTenantId(tid)) {
            int out = inv.getOutstanding()==null?0:inv.getOutstanding();
            if (out <= 0) continue;
            total += out;
            long days = 0;
            try { days = java.time.temporal.ChronoUnit.DAYS.between(LocalDate.parse(inv.getDueOn()), today); }
            catch (Exception ignored) {}
            if (days <= 30) a30 += out;
            else if (days <= 60) a60 += out;
            else if (days <= 90) a90 += out;
            else a90p += out;
            String party = names.getOrDefault(inv.getPartyId(), "Party");
            chase.add(Map.of(
                "id", inv.getId(),
                "party", party,
                "invoiceNo", inv.getInvoiceNo()==null?"":inv.getInvoiceNo(),
                "outstanding", out,
                "dueOn", inv.getDueOn()==null?"":inv.getDueOn(),
                "reminder", "Namaste " + party + ", invoice " + inv.getInvoiceNo() + " of Rs " + out + " is overdue. Kindly release payment."
            ));
        }
        return Map.of(
            "totalOutstanding", total,
            "ageing", Map.of("d0_30", a30, "d31_60", a60, "d61_90", a90, "d90plus", a90p),
            "chase", chase
        );
    }
}
