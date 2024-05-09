package lvlup.websum.model;

import lvlup.websum.abstracts.AbstractRequest;

public class BalanceRequest extends AbstractRequest {

    public BalanceRequest() {
        setMethod("balance");
    }

    public String toJSON() {
        return "{\"method\":\"" + getMethod() + "\"," +
                "\"rid\":\"" + getRid() + "\"}";
    }
}
