package lvlup.websum.abstracts;

import java.text.SimpleDateFormat;
import java.util.Date;

public abstract class AbstractRequest {

    private final String pattern = "yyyy-MM-dd HH:mm:ss.SSS";
    private final SimpleDateFormat simpleDateFormat = new SimpleDateFormat(this.pattern);

    private String method;
    private Long rid;

    public String getMethod() {
        return method;
    }

    public void setMethod(String method) {
        this.method = method;
    }

    public Long getRid() {
        return rid;
    }

    public void setRid(Long rid) {
        this.rid = rid;
    }

    public String getStringFromDate(Date date) {
        return this.simpleDateFormat.format(date);
    }
}
