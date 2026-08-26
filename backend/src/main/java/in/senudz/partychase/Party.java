package in.senudz.partychase;
import jakarta.persistence.*;
@Entity @Table(name="parties")
public class Party {
    @Id @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;
    private Long tenantId;
    private String name;
    private String phone;
    private String city;
    private Integer creditDays;
    private String createdAt;
    public Long getId(){return id;} public void setId(Long id){this.id=id;}
    public Long getTenantId(){return tenantId;}
    public void setTenantId(Long tenantId){this.tenantId=tenantId;}
    public String getName(){return name;}
    public void setName(String name){this.name=name;}
    public String getPhone(){return phone;}
    public void setPhone(String phone){this.phone=phone;}
    public String getCity(){return city;}
    public void setCity(String city){this.city=city;}
    public Integer getCreditDays(){return creditDays;}
    public void setCreditDays(Integer creditDays){this.creditDays=creditDays;}
    public String getCreatedAt(){return createdAt;}
    public void setCreatedAt(String createdAt){this.createdAt=createdAt;}
}
