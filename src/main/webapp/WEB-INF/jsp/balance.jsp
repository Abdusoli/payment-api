<%@ include file="/WEB-INF/jsp/include/header.jsp" %>
<%@ include file="/WEB-INF/jsp/include/navigation.jsp" %>
<div class="container text-center">
    <h3>${title}</h3>
    <br>
    <div class="row">
        <div class="col-sm-12">
            <div class="well text-left">
                <p><b>RID: </b>${rid}</p>
                <p><b>DATE: </b>${date}</p>
                <p><b>BALANCE: </b>${balance}</p>
            </div>
        </div>
    </div>
</div>
<%@ include file="/WEB-INF/jsp/include/footer.jsp" %>
