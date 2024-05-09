package lvlup.websum.model;

public class PaymentCheckFields {

    private String account;
    private Double amount;
    private int lenghtAccount = 12;

    public String getAccount() {
        return account;
    }

    public String getAccountLenghtFromEnd() {
        if (this.account.length() > lenghtAccount) {
            return this.account.substring(this.account.length() - lenghtAccount);
        }
        return this.account;
    }

    public void setAccount(String account) {
        this.account = account;
    }

    public Double getAmount() {
        return amount;
    }

    public String getAmountString() {
        return String.format("%.0f", getAmount());
    }

    public void setAmount(Double amount) {
        this.amount = amount;
    }

    public int getLenghtAccount() {
        return lenghtAccount;
    }

    public void setLenghtAccount(int lenghtAccount) {
        this.lenghtAccount = lenghtAccount;
    }
}
