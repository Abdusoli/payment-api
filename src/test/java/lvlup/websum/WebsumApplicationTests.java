package lvlup.websum;

import lvlup.websum.enums.ServicesEnum;
import lvlup.websum.jpa.entity.ErrorPays;
import lvlup.websum.jpa.entity.Paylist;
import lvlup.websum.jpa.entity.SuccessPays;
import lvlup.websum.jpa.entity.TempData;
import lvlup.websum.jpa.repository.ErrorPaysRepository;
import lvlup.websum.jpa.repository.PaylistRepository;
import lvlup.websum.jpa.repository.SuccessPaysRepository;
import lvlup.websum.jpa.repository.TempDataRepository;
import lvlup.websum.model.*;
import org.apache.commons.codec.digest.DigestUtils;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.*;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.web.client.RestTemplate;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;

@RunWith(SpringRunner.class)
@SpringBootTest(classes = {WebsumApplication.class})
public class WebsumApplicationTests {

    private final String pattern = "yyyy-MM-dd HH:mm:ss.SSS";
    private final SimpleDateFormat simpleDateFormat = new SimpleDateFormat(this.pattern);
    private final int countPay = 300;

    @Autowired
    private PaylistRepository paylistRepository;

    @Autowired
    private SuccessPaysRepository successPaysRepository;

    @Autowired
    private ErrorPaysRepository errorPaysRepository;

    @Autowired
    private TempDataRepository tempDataRepository;

    @Value("${websum.api.url}")
    private String websumURL;

    @Value("${websum.api.id}")
    private String websumID;

    @Value("${websum.api.key}")
    private String websumKEY;

    private JSONParser jsonParser = new JSONParser();
    private JSONObject jsonObject = new JSONObject();

//    @Test
    public void moveData() {
        System.out.println("Start move data from table temp to table playlist");
        List<TempData> tempDatas = this.tempDataRepository.findAll();
        for (TempData tempData : tempDatas) {
            Paylist paylist = new Paylist();
            paylist.setMsisdn(tempData.getMsisdn());
            paylist.setAmount(tempData.getAmount());
            paylist.setOperator(tempData.getOperator());
            paylist.setCreatedAt(new Date());
            paylist.setUpdatedAt(new Date());
            System.out.println(">>> " + paylist.getMsisdn());
            this.paylistRepository.save(paylist);
            this.tempDataRepository.deleteById(tempData.getId());
        }
        System.out.println("Data moved from table temp to table playlist");
    }

        @Test
    public void checkPayTest() {

        System.out.println("Start Time: " + this.simpleDateFormat.format(new Date()));

        List<Paylist> paylists = this.paylistRepository.getPaylistsLimit(this.countPay);
        int iterator = 1;
        for (Paylist paylist : paylists) {
            System.out.println();
            System.out.println("" + iterator + "\t <<<<< msisdn: " + paylist.getMsisdn() + "\t \t operator: " + paylist.getOperator() + " >>>>>");

            PaymentCheckFields fields = new PaymentCheckFields();
            fields.setAmount(paylist.getAmount());
            fields.setAccount(paylist.getMsisdn());
            if (paylist.getOperator().equalsIgnoreCase(ServicesEnum.BEELINE.name())
                    || paylist.getOperator().equalsIgnoreCase(ServicesEnum.UCELL.name())) {
                fields.setLenghtAccount(9);
            } else {
                fields.setLenghtAccount(7);
            }

            PaymentCheckParams params = new PaymentCheckParams();
            params.setFields(fields);

            HashMap<String, Integer> service = new HashMap<>();
            for (ServicesEnum item : ServicesEnum.values()) {
                if (paylist.getOperator().equalsIgnoreCase(item.name()))
                    params.setService_id(item.word());
                service.put(item.name(), item.word());
            }

            PaymentCheckRequest request = new PaymentCheckRequest();
            request.setParams(params);
            request.setRid(paylist.getId());

            System.out.println(request.toJSON());

            HttpHeaders headers = getHeaders();
            RestTemplate restTemplate = new RestTemplate();
            HttpEntity<String> entity = new HttpEntity<>(request.toJSON(), headers);
            ResponseEntity<String> response = null;

            try {
                response = restTemplate.exchange(this.websumURL, HttpMethod.POST, entity, String.class);
            } catch (Exception e) {
                e.printStackTrace();
            }

            Integer status_code = 0;
            String status_text = "";
            Integer txn_id = 0;

            boolean isError = false;

            if (response != null) {
                System.out.println(response.getBody());
                try {
                    this.jsonObject = (JSONObject) this.jsonParser.parse(response.getBody());

                    if (this.jsonObject.containsKey("error")
                            && (this.jsonObject.get("error") == null
                            || this.jsonObject.get("error").toString().equalsIgnoreCase("false"))) {

                        status_code = Integer.valueOf(((JSONObject) this.jsonObject.get("result")).get("status_code").toString());
                        status_text = ((JSONObject) this.jsonObject.get("result")).get("status_text").toString();
                        txn_id = Integer.valueOf(((JSONObject) this.jsonObject.get("result")).get("txn_id").toString());
                        if (status_code != 21) {
                            isError = true;
                        }
                    } else {
                        isError = true;
                    }
                } catch (ParseException e) {
                    e.printStackTrace();
                    isError = true;
                }
            } else {
                isError = true;
            }

            if (!isError) {

                PaymentPayParams payParams = new PaymentPayParams();
                payParams.setTxn_id(txn_id);
                PaymentPayRequest payRequest = new PaymentPayRequest();
                payRequest.setParams(payParams);
                payRequest.setRid(paylist.getId());

                HttpHeaders headers1 = getHeaders();
                RestTemplate restTemplate1 = new RestTemplate();
                HttpEntity<String> entity1 = new HttpEntity<>(payRequest.toJSON(), headers1);
                ResponseEntity<String> response1 = null;

                System.out.println(payRequest.toJSON());

                try {
                    response1 = restTemplate1.exchange(this.websumURL, HttpMethod.POST, entity1, String.class);
                } catch (Exception e) {
                    e.printStackTrace();
                }

                boolean isError1 = false;

                if (response1 != null) {
                    System.out.println(response1.getBody());
                    try {
                        this.jsonObject = (JSONObject) this.jsonParser.parse(response1.getBody());

                        if (this.jsonObject.containsKey("error")
                                && (this.jsonObject.get("error") == null
                                || this.jsonObject.get("error").toString().equalsIgnoreCase("false"))) {

                            status_code = Integer.valueOf(((JSONObject) this.jsonObject.get("result")).get("status_code").toString());
                            status_text = ((JSONObject) this.jsonObject.get("result")).get("status_text").toString();
                            if (status_code != 22) {
                                isError1 = true;
                            }
                        } else {
                            isError1 = true;
                        }
                    } catch (ParseException e) {
                        e.printStackTrace();
                        isError1 = true;
                    }
                } else {
                    isError1 = true;
                }
                if (!isError1) {
                    SuccessPays successPays = new SuccessPays();
                    successPays.setMsisdn(paylist.getMsisdn());
                    successPays.setAmount(paylist.getAmount());
                    successPays.setOperator(paylist.getOperator());
                    successPays.setTxn_id(txn_id);
                    successPays.setCode(status_code);
                    successPays.setStatus(status_text);
                    successPays.setJson_obj(response1.getBody());
                    successPays.setCreatedAt(new Date());
                    successPays.setUpdatedAt(new Date());

                    this.successPaysRepository.save(successPays);
                } else {
                    ErrorPays errorPays = new ErrorPays();
                    errorPays.setMsisdn(paylist.getMsisdn());
                    errorPays.setAmount(paylist.getAmount());
                    errorPays.setOperator(paylist.getOperator());
                    errorPays.setJson_obj(response1.getBody());
                    errorPays.setCreatedAt(new Date());
                    errorPays.setUpdatedAt(new Date());

                    this.errorPaysRepository.save(errorPays);
                }
            } else {
                ErrorPays errorPays = new ErrorPays();
                errorPays.setMsisdn(paylist.getMsisdn());
                errorPays.setAmount(paylist.getAmount());
                errorPays.setOperator(paylist.getOperator());
                errorPays.setJson_obj(response.getBody());
                errorPays.setCreatedAt(new Date());
                errorPays.setUpdatedAt(new Date());

                this.errorPaysRepository.save(errorPays);
            }

            this.paylistRepository.deleteById(paylist.getId());
            iterator++;
            try {
                Thread.sleep(2000);
            } catch (InterruptedException e) {
            }
        }
        System.out.println("End Time: " + this.simpleDateFormat.format(new Date()));
    }

    private HttpHeaders getHeaders() {
        Date date = new Date();
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON_UTF8);
        headers.add("Service", this.websumID + ";" + DigestUtils.sha1Hex(date.getTime() + this.websumKEY) + ";" + date.getTime());
        return headers;
    }

}
