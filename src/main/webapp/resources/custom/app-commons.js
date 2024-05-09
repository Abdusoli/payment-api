function AppCommons() {
	
/**
 * 
 */
	
//START: AJAX REQUEST HEADER CONFIG --------------------------------------------------------------------------------------------
var headerContent = { 
		  'Accept': 'application/json',
		  'Content-Type': 'application/json' 
		   };

this.headerContent = function() { return headerContent;}

this.removeSpecialChars = function(string) {
	var str = string.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '');
	return str;
}

this.setAjaxRequestHeader = function(xhr) {
	var token = $("meta[name='_csrf']").attr("content");
	var header = $("meta[name='_csrf_header']").attr("content");
    if (header && token) {
        xhr.setRequestHeader(header, token);
    }
};
// END: AJAX REQUEST HEADER CONFIG --------------------------------------------------------------------------------------------

//START: AJAX RESPONSE MESSAGE CONFIG-------------------------------------------------------------------------------------------
this.displayError = function (message) {
    $("#error-message").html(message);
    $("#error-div").show();
    window.scrollTo(0,0);
}

this.displaySuccess = function (message) {
    $("#success-message").html(message);
    $("#success-div").show();
    window.scrollTo(0,0);
}

this.ajaxError = function (jqXHR, status, error, message) {
    displayError(message + ": " + error.toString());
    console.log("Error jqXHR", jqXHR);
    console.log("Error status", status);
    console.log("Error object", error);
}
//END: AJAX RESPONSE MESSAGE CONFIG --------------------------------------------------------------------------------------------


//START: DUAL TABLE ROWS CONFIG-------------------------------------------------------------------------------------------------
/**
 * Helper function for datatables, removes selected/all rows from origin and adds to destination
 * @param origin (datatable object - required)
 * @param destination (datatable object - optional)
 * @param all (boolean - optional) false/null for selected rows, true for all rows
 */

this.setDualDataTable = function (origin, destination, all) {

	function moveRows(origin, destination, all) {
		var selected = origin.rows((all)?{}:{selected:true});
		if (destination) destination.rows.add(selected.data()).draw(false);
		selected.remove().draw(false);
	}

	$("#left").click(function () {
		moveRows(origin, destination);
	});

	$("#right").on("click", function () {
		moveRows(destination, origin);
	});

	$("#leftall").on("click", function () {
		moveRows(origin, destination, true);
	});

	$("#rightall").on("click", function () {
		moveRows(destination, origin, true);
	});
}
//END: DUAL TABLE ROWS CONFIG-----------------------------------------------------------------------------------------------------


}

var appCommons = new AppCommons();