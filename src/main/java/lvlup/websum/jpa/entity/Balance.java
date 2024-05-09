package lvlup.websum.jpa.entity;

import lvlup.websum.abstracts.AbstractForDB;

import javax.persistence.*;

@Entity
@Table(name = "balance")
public class Balance extends AbstractForDB {
    @Id
    @GeneratedValue(generator = "balance_generator")
    @SequenceGenerator(
            name = "balance_generator",
            sequenceName = "balance_sequence",
            allocationSize = 1,
            initialValue = 1000
    )
    private Long id;

    @Column(name = "amount")
    private Double amount;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Double getAmount() {
        return amount;
    }

    public void setAmount(Double amount) {
        this.amount = amount;
    }
}
