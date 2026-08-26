package in.senudz.partychase;
import jakarta.persistence.*;
@Entity @Table(name="invoices")
public class Invoice {
    @Id @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;
    private Long tenantId;
    private Long partyId;
    private String invoiceNo;
    private Integer amount;
    private Integer outstanding;
    private String dueOn;
    private String createdAt;
    public Long getId(){return id;} public void setId(Long id){this.id=id;}
    public Long getTenantId(){return tenantId;}
    public void setTenantId(Long tenantId){this.tenantId=tenantId;}
    public Long getPartyId(){return partyId;}
    public void setPartyId(Long partyId){this.partyId=partyId;}
    public String getInvoiceNo(){return invoiceNo;}
    public void setInvoiceNo(String invoiceNo){this.invoiceNo=invoiceNo;}
    public Integer getAmount(){return amount;}
    public void setAmount(Integer amount){this.amount=amount;}
    public Integer getOutstanding(){return outstanding;}
    public void setOutstanding(Integer outstanding){this.outstanding=outstanding;}
    public String getDueOn(){return dueOn;}
    public void setDueOn(String dueOn){this.dueOn=dueOn;}
    public String getCreatedAt(){return createdAt;}
    public void setCreatedAt(String createdAt){this.createdAt=createdAt;}
}
