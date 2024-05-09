package lvlup.websum.enums;

public enum MenuEnum {
    HOME("Главная"),
    FOR_PAID("Для оплаты"),
    PAID("Оплаченные"),
    HISTORY("История"),
    BALANCE("Баланс");

    private final String word;

    MenuEnum(String word) {
        this.word = word;
    }

    public String word() {
        return word;
    }
}
