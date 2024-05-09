package lvlup.websum.jpa.entity;

import lvlup.websum.abstracts.AbstractForDB;

import javax.persistence.*;

@Entity
@Table(name = "error_pays")
public class ErrorPays extends AbstractForDB {
    @Id
    @GeneratedValue(generator = "error_generator")
    @SequenceGenerator(
            name = "error_generator",
            sequenceName = "error_sequence",
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

    @Column(name = "json_obj")
    private String json_obj;

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

    public String getJson_obj() {
        return json_obj;
    }

    public void setJson_obj(String json_obj) {
        this.json_obj = json_obj;
    }
}
