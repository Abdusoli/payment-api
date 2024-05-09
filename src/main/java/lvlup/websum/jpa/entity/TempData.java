package lvlup.websum.jpa.entity;

import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@EntityListeners(AuditingEntityListener.class)
@Table(name = "temp")
public class TempData implements Serializable {

    @Id
    @GeneratedValue(generator = "temp_data_generator")
    @SequenceGenerator(
            name = "temp_data_generator",
            sequenceName = "temp_data_sequence",
            allocationSize = 1,
            initialValue = 1000
    )
    private Long id;

    @Column(name = "msisdn", length = 12)
    private String msisdn;

    @Column(name = "operator")
    private String operator;

    @Column(name = "amount")
    private Double amount;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getMsisdn() {
        return msisdn;
    }

    public void setMsisdn(String msisdn) {
        this.msisdn = msisdn;
    }

    public String getOperator() {
        return operator;
    }

    public void setOperator(String operator) {
        this.operator = operator;
    }

    public Double getAmount() {
        return amount;
    }

    public void setAmount(Double amount) {
        this.amount = amount;
    }
}
