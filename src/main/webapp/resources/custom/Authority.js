var token = $("meta[name='_csrf']").attr("content");
var header = $("meta[name='_csrf_header']").attr("content");	

function displayError(message) {
    $("#error-message").html(message);
    $("#error-div").show();
    window.scrollTo(0,0);
}

function displaySuccess(message) {
    $("#success-message").html(message);
    $("#success-div").show();
    window.scrollTo(0,0);
}
