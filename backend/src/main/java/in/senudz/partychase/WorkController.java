package in.senudz.partychase;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDate;
import java.util.*;
@RestController @RequestMapping("/api/work")
public class WorkController {
    private final InvoiceRepository invoices;
    private final PartyRepository parties;
    private final CollectionRepository collections;
    private final TenantRepository tenants;
    public WorkController(InvoiceRepository invoices, PartyRepository parties, CollectionRepository collections, TenantRepository tenants) {
        this.invoices = invoices; this.parties = parties; this.collections = collections; this.tenants = tenants;
    }
    @GetMapping
    public Map<String,Object> today() {
        Long tid = TenantContext.getTenantId();
        Tenant firm = tenants.findById(tid).orElseThrow();
        LocalDate today = LocalDate.now();
        int total = 0, a30=0, a60=0, a90=0, a90p=0;
        List<Map<String,Object>> chase = new ArrayList<>();
        Map<Long, Party> pmap = new HashMap<>();
        parties.findByTenantId(tid).forEach(p -> pmap.put(p.getId(), p));
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
            Party p = pmap.get(inv.getPartyId());
            String party = p==null?"Party":nvl(p.getName());
            String phone = p==null?"":nvl(p.getPhone());
            String fallback = "Namaste " + party + ", invoice " + inv.getInvoiceNo() + " of Rs " + out
                + " is overdue. Pay UPI " + nvl(firm.getUpiVpa()) + " today.";
            String msg = IndiaLinks.applyTemplate(firm.getReminderTemplate(), fallback, party, String.valueOf(out), inv.getInvoiceNo());
            Map<String,Object> row = new LinkedHashMap<>();
            row.put("id", inv.getId());
            row.put("party", party);
            row.put("phone", phone);
            row.put("invoiceNo", inv.getInvoiceNo()==null?"":inv.getInvoiceNo());
            row.put("outstanding", out);
            row.put("dueOn", inv.getDueOn()==null?"":inv.getDueOn());
            row.put("reminder", msg);
            row.put("waLink", IndiaLinks.wa(phone, msg));
            row.put("upiLink", IndiaLinks.upi(firm.getUpiVpa(), out, inv.getInvoiceNo()));
            chase.add(row);
        }
        return Map.of(
            "totalOutstanding", total,
            "ageing", Map.of("d0_30", a30, "d31_60", a60, "d61_90", a90, "d90plus", a90p),
            "chase", chase
        );
    }
    @PostMapping("/collect")
    public Map<String,Object> collect(@RequestBody Map<String,Object> body) {
        Long tid = TenantContext.getTenantId();
        Long invoiceId = Long.valueOf(String.valueOf(body.get("invoiceId")));
        int amount = Integer.parseInt(String.valueOf(body.get("amount")));
        Invoice inv = invoices.findById(invoiceId).orElseThrow();
        if (!tid.equals(inv.getTenantId())) throw new RuntimeException("forbidden");
        Collection c = new Collection();
        c.setTenantId(tid); c.setInvoiceId(invoiceId); c.setAmount(amount);
        c.setMode(String.valueOf(body.getOrDefault("mode","UPI")));
        c.setCreatedAt(java.time.Instant.now().toString());
        collections.save(c);
        int out = (inv.getOutstanding()==null?0:inv.getOutstanding()) - amount;
        inv.setOutstanding(Math.max(out, 0));
        invoices.save(inv);
        return Map.of("ok", true, "outstanding", inv.getOutstanding());
    }
    private String nvl(String s){ return s==null?"":s; }
}
