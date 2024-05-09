package lvlup.websum.model;

public class PaymentCheckParams {

    private Integer service_id;
    private PaymentCheckFields fields;

    public Integer getService_id() {
        return service_id;
    }

    public void setService_id(Integer service_id) {
        this.service_id = service_id;
    }

    public PaymentCheckFields getFields() {
        return fields;
    }

    public void setFields(PaymentCheckFields fields) {
        this.fields = fields;
    }
}
