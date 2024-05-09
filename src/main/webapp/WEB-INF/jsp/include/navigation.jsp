<nav class="navbar navbar-inverse">
    <div class="container-fluid">
        <div class="navbar-header">
            <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
            <img class="navbar-brand" src="<c:url value="/resources/img/logo.png"/>" alt="Level Up">
        </div>
        <div class="collapse navbar-collapse" id="myNavbar">
            <ul class="nav navbar-nav">
                <li class="active">
                    <a href="${pageContext.request.contextPath}/">
                        <span class="glyphicon glyphicon-home"></span>&nbsp;&nbsp;${menu.get("HOME")}</a>
                </li>
                <li>
                    <a href="${pageContext.request.contextPath}/notpaid">${menu.get("FOR_PAID")}</a>
                </li>
                <li>
                    <a href="${pageContext.request.contextPath}/paid">${menu.get("PAID")}</a>
                </li>
                <li>
                    <a href="${pageContext.request.contextPath}/history">${menu.get("HISTORY")}</a>
                </li>
                <li>
                    <a href="${pageContext.request.contextPath}/balance">${menu.get("BALANCE")}</a>
                </li>
            </ul>
        </div>
    </div>
</nav>