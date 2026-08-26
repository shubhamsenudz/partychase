package in.senudz.partychase;
import jakarta.persistence.*;
@Entity @Table(name="collections")
public class Collection {
    @Id @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;
    private Long tenantId;
    private Long invoiceId;
    private Integer amount;
    private String mode;
    private String createdAt;
    public Long getId(){return id;} public void setId(Long id){this.id=id;}
    public Long getTenantId(){return tenantId;}
    public void setTenantId(Long tenantId){this.tenantId=tenantId;}
    public Long getInvoiceId(){return invoiceId;}
    public void setInvoiceId(Long invoiceId){this.invoiceId=invoiceId;}
    public Integer getAmount(){return amount;}
    public void setAmount(Integer amount){this.amount=amount;}
    public String getMode(){return mode;}
    public void setMode(String mode){this.mode=mode;}
    public String getCreatedAt(){return createdAt;}
    public void setCreatedAt(String createdAt){this.createdAt=createdAt;}
}
