package lvlup.websum.enums;

public enum ServicesEnum {
    BEELINE(71),
    UCELL(72),
    PERFECTUM(73),
    UMS(74),
    UZMOBILE_CDMA(75),
    UZMOBILE_GSM(76);

    private final int word;

    ServicesEnum(int word) {
        this.word = word;
    }

    public int word() {
        return word;
    }
}
