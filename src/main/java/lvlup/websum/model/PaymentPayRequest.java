package lvlup.websum.model;

import lvlup.websum.abstracts.AbstractRequest;

public class PaymentPayRequest extends AbstractRequest {

    private PaymentPayParams params;

    public PaymentPayRequest() {
        setMethod("payment_pay");
        setRid(0L);
    }

    public PaymentPayParams getParams() {
        return params;
    }

    public void setParams(PaymentPayParams params) {
        this.params = params;
    }

    public String toJSON() {
        return "{\"method\":\"" + getMethod() + "\"," +
                "\"rid\":\"" + getRid() + "\"," +
                "\"params\":{" +
                "\"txn_id\":" + getParams().getTxn_id() + "" +
                "}" +
                "}";
    }
}
