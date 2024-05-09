package lvlup.websum.model;

import lvlup.websum.abstracts.AbstractRequest;

public class PaymentCheckRequest extends AbstractRequest {

    private PaymentCheckParams params;

    public PaymentCheckRequest() {
        setMethod("payment_check");
        setRid(0L);
    }

    public PaymentCheckParams getParams() {
        return params;
    }

    public void setParams(PaymentCheckParams params) {
        this.params = params;
    }

    public String toJSON() {
        return "{\"method\":\"" + getMethod() + "\"," +
                "\"rid\":\"" + getRid() + "\"," +
                "\"params\":{" +
                "\"service_id\":" + getParams().getService_id() + "," +
                "\"fields\":{" +
                "\"account\":\"" + getParams().getFields().getAccountLenghtFromEnd() + "\"," +
                "\"amount\":" + getParams().getFields().getAmountString() +
                "}" +
                "}" +
                "}";
    }
}
