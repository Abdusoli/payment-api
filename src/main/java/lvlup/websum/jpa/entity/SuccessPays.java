package lvlup.websum.jpa.entity;

import lvlup.websum.abstracts.AbstractForDB;

import javax.persistence.*;

@Entity
@Table(name = "success_pays")
public class SuccessPays extends AbstractForDB {
    @Id
    @GeneratedValue(generator = "success_generator")
    @SequenceGenerator(
            name = "success_generator",
            sequenceName = "success_sequence",
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

    @Column(name = "txn_id")
    private Integer txn_id;

    @Column(name = "status_code")
    private Integer code;

    @Column(name = "status_text")
    private String status;

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

    public Integer getTxn_id() {
        return txn_id;
    }

    public void setTxn_id(Integer txn_id) {
        this.txn_id = txn_id;
    }

    public Integer getCode() {
        return code;
    }

    public void setCode(Integer code) {
        this.code = code;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getJson_obj() {
        return json_obj;
    }

    public void setJson_obj(String json_obj) {
        this.json_obj = json_obj;
    }
}
