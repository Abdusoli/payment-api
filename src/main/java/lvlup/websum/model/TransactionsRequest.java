package lvlup.websum.model;

import lvlup.websum.abstracts.AbstractRequest;

public class TransactionsRequest extends AbstractRequest {

    private TransactionsParams params;

    public TransactionsRequest() {
        setMethod("transactions");
        setRid(0L);
    }

    public TransactionsParams getParams() {
        return params;
    }

    public void setParams(TransactionsParams params) {
        this.params = params;
    }

    public String toJSON() {
        return "{\"method\":\"" + getMethod() + "\"," +
                "\"rid\":\"" + getRid() + "\"," +
                "\"params\":{" +
                "\"from\":\"" + getStringFromDate(getParams().getFrom()) + "\"," +
                "\"to\":\"" + getStringFromDate(getParams().getTo()) + "\"," +
                "\"order\":\"" + getParams().getOrder() + "\"," +
                "\"offset\":" + getParams().getOffset() + "," +
                "\"limit\":" + getParams().getLimit() +
                "}" +
                "}";
    }
}
