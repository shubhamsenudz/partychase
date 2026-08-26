package in.senudz.partychase;
import jakarta.persistence.*;
@Entity @Table(name="promises")
public class Promise {
    @Id @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;
    private Long tenantId;
    private Long invoiceId;
    private String promiseOn;
    private String note;
    private String status;
    private String createdAt;
    public Long getId(){return id;} public void setId(Long id){this.id=id;}
    public Long getTenantId(){return tenantId;}
    public void setTenantId(Long tenantId){this.tenantId=tenantId;}
    public Long getInvoiceId(){return invoiceId;}
    public void setInvoiceId(Long invoiceId){this.invoiceId=invoiceId;}
    public String getPromiseOn(){return promiseOn;}
    public void setPromiseOn(String promiseOn){this.promiseOn=promiseOn;}
    public String getNote(){return note;}
    public void setNote(String note){this.note=note;}
    public String getStatus(){return status;}
    public void setStatus(String status){this.status=status;}
    public String getCreatedAt(){return createdAt;}
    public void setCreatedAt(String createdAt){this.createdAt=createdAt;}
}
