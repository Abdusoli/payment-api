<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ include file="/WEB-INF/jsp/include/taglib.jsp" %>
<head>
    <title>Websum API</title>
    <meta charset="utf-8">
    <link rel="shortcut icon" href="<c:url value="/resources/img/logo.png"/>"/>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="<c:url value="/resources/bootstrap-3.3.6/css/bootstrap.min.css"/>"/>
    <script src="<c:url value="/resources/jquery/1.12.0/jquery.min.js"/>"></script>
    <script src="<c:url value="/resources/bootstrap-3.3.6/js/bootstrap.min.js"/>"></script>
    <style>
        footer {
            position: fixed;
            left: 0;
            bottom: 0;
            width: 100%;
            background-color: black;
            color: white;
            padding: 15px;
            text-align: center;
        }

        .carousel-inner img {
            width: 100%;
            margin: auto;
            min-height: 200px;
        }
    </style>
</head>
<body>