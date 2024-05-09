package lvlup.websum.controller;

import lvlup.websum.enums.MenuEnum;
import lvlup.websum.jpa.entity.Balance;
import lvlup.websum.jpa.repository.BalanceRepository;
import lvlup.websum.jpa.repository.ErrorPaysRepository;
import lvlup.websum.jpa.repository.PaylistRepository;
import lvlup.websum.jpa.repository.SuccessPaysRepository;
import lvlup.websum.model.*;
import org.apache.commons.codec.digest.DigestUtils;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.servlet.ModelAndView;

import java.util.Date;
import java.util.HashMap;

@RestController
public class MainController {

    @Autowired
    private PaylistRepository paylistRepository;

    @Autowired
    private BalanceRepository balanceRepository;

    @Autowired
    private SuccessPaysRepository successPaysRepository;

    @Autowired
    private ErrorPaysRepository errorPaysRepository;

    @Value("${websum.api.url}")
    private String websumURL;

    @Value("${websum.api.id}")
    private String websumID;

    @Value("${websum.api.key}")
    private String websumKEY;

    private ModelAndView view;
    private ModelMap model;
    private JSONParser jsonParser = new JSONParser();
    private JSONObject jsonObject = new JSONObject();

    @GetMapping("/")
    public ModelAndView getIndex() {

        this.view = new ModelAndView("home");
        this.model = new ModelMap();

        this.model.addAttribute("content", "<b>Rest</b>-приложение для оплаты на счет абонентам посредством платежной системы <b>Websum</b>");
        this.model.addAttribute("menu", getMenu());
        this.model.addAttribute("title", "Добро пожаловать!!!");
        this.view.addAllObjects(this.model);

        return this.view;
    }

    @GetMapping("/notpaid")
    public ModelAndView getNotPaid() {

        PaymentPayParams params = new PaymentPayParams();
        params.setTxn_id(104309);
        PaymentPayRequest request = new PaymentPayRequest();
        request.setParams(params);
        System.out.println(request.toJSON());

        this.view = new ModelAndView("notpaid");
        this.model = new ModelMap();
        setDefaultParams(this.model, "Добро пожаловать!!!");

        this.model.addAttribute("content", "<b>Rest</b>-приложение для оплаты на счет абонентам посредством платежной системы <b>Websum</b>");
        this.view.addAllObjects(this.model);

        return this.view;
    }

    @GetMapping("/paid")
    public ModelAndView getPaid() {

        PaymentCheckFields fields = new PaymentCheckFields();
        fields.setAmount(100000D);
        fields.setAccount("998946671545");
        fields.setLenghtAccount(9);
        PaymentCheckParams params = new PaymentCheckParams();
        params.setFields(fields);
        params.setService_id(72);
        PaymentCheckRequest request = new PaymentCheckRequest();
        request.setParams(params);
        System.out.println(request.toJSON());

        this.view = new ModelAndView("paid");
        this.model = new ModelMap();
        setDefaultParams(this.model, "Добро пожаловать!!!");

        this.model.addAttribute("content", "<b>Rest</b>-приложение для оплаты на счет абонентам посредством платежной системы <b>Websum</b>");
        this.view.addAllObjects(this.model);

        return this.view;
    }

    @GetMapping("/history")
    public ModelAndView getHistory() {

        TransactionsParams params = new TransactionsParams();
        params.setFrom(new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000));
        params.setTo(new Date());
        params.setOffset(0);
        params.setLimit(10);
        params.setOrder("desc");

        TransactionsRequest transactionsRequest = new TransactionsRequest();
        transactionsRequest.setParams(params);

        this.view = new ModelAndView("history");
        this.model = new ModelMap();
        setDefaultParams(this.model, "Транзакции за последнюю неделю");

        HttpHeaders headers = getHeaders();
        RestTemplate restTemplate = new RestTemplate();
        HttpEntity<String> entity = new HttpEntity<>(transactionsRequest.toJSON(), headers);
        ResponseEntity<String> response = null;
        try {
            response = restTemplate.exchange(this.websumURL, HttpMethod.POST, entity, String.class);
        } catch (Exception e) {
            e.printStackTrace();
        }

        boolean isError = false;

        if (response != null) {
            try {
                this.jsonObject = (JSONObject) this.jsonParser.parse(response.getBody());

                if (this.jsonObject.containsKey("error")
                        && (this.jsonObject.get("error") == null
                        || this.jsonObject.get("error").toString().equalsIgnoreCase("false"))) {
                    this.model.addAttribute("data", response.getBody());
                } else {
                    isError = true;
                }
            } catch (ParseException e) {
                e.printStackTrace();
                isError = true;
            }
        }
        if (isError) {
            this.model.addAttribute("data", "Ошибка при выгрузке Баланса! Пожалуйста, попробуйте позже!");
        }
        this.view.addAllObjects(this.model);

        return this.view;
    }

    @GetMapping("/balance")
    public ModelAndView getBalance() {
        Balance balance = new Balance();
        balance.setCreatedAt(new Date());
        balance.setUpdatedAt(new Date());
        this.balanceRepository.save(balance);

        BalanceRequest balanceRequest = new BalanceRequest();
        balanceRequest.setRid(balance.getId());

        this.view = new ModelAndView("balance");
        this.model = new ModelMap();
        setDefaultParams(this.model, "Баланс");

        HttpHeaders headers = getHeaders();
        RestTemplate restTemplate = new RestTemplate();
        HttpEntity<String> entity = new HttpEntity<>(balanceRequest.toJSON(), headers);
        ResponseEntity<String> response = null;
        try {
            response = restTemplate.exchange(this.websumURL, HttpMethod.POST, entity, String.class);
        } catch (Exception e) {
            e.printStackTrace();
        }

        boolean isError = false;

        if (response != null) {
            try {
                this.jsonObject = (JSONObject) this.jsonParser.parse(response.getBody());

                if (this.jsonObject.containsKey("error")
                        && (this.jsonObject.get("error") == null
                        || this.jsonObject.get("error").toString().equalsIgnoreCase("false"))) {
                    balance.setUpdatedAt(new Date());
                    Double bal = Double.valueOf(((JSONObject) this.jsonObject.get("result")).get("balance").toString());
                    balance.setAmount(bal);
                    this.balanceRepository.save(balance);
                    this.model.addAttribute("rid", this.jsonObject.get("rid").toString());
                    this.model.addAttribute("date", balance.getUpdatedAt().toString());
                    this.model.addAttribute("balance", String.format("%.0f", bal));
                } else {
                    isError = true;
                }
            } catch (ParseException e) {
                e.printStackTrace();
                isError = true;
            }
        }
        if (isError) {
            this.model.addAttribute("rid", "");
            this.model.addAttribute("date", "");
            this.model.addAttribute("balance", "Ошибка при выгрузке Баланса! Пожалуйста, попробуйте позже!");
        }
        this.view.addAllObjects(this.model);

        return this.view;
    }

    private HttpHeaders getHeaders() {
        Date date = new Date();
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON_UTF8);
        headers.add("Service", this.websumID + ";" + DigestUtils.sha1Hex(date.getTime() + this.websumKEY) + ";" + date.getTime());
        return headers;
    }

    private void setDefaultParams(ModelMap model, String title) {
        model.addAttribute("title", title);
        model.addAttribute("menu", getMenu());
    }

    private HashMap<String, String> getMenu() {
        HashMap<String, String> menu = new HashMap<>();
        for (MenuEnum item : MenuEnum.values()) {
            menu.put(item.name(), item.word());
        }
        return menu;
    }
}
