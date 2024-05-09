/**
 * inits datatable with default options
 * @param selector - required jquery selector string;
 * @param options - optional datatable options, any option define here will override the default options; 
 */

var token = $("meta[name='_csrf']").attr("content");
var header = $("meta[name='_csrf_header']").attr("content");	

function initRoleDataTable(selector, options) {
	
	var table = $(selector).DataTable($.extend( true, {
		ajax:{
			 headers: { 
				  'Accept': 'application/json',
				  'Content-Type': 'application/json' 
				   },
				   
		     beforeSend: function(xhr) {
		    	    if (header && token) {
		    	        xhr.setRequestHeader(header, token);
		    	    }
		    	},
			method: 'GET',
			dataSrc: '',
			url: '${pageContext.request.contextPath}/admin/ajax/roles',
	//		data: userRoleList,
			error: function(jqXHR, status, error) {
				ajaxError(jqXHR, status, error,'Error occurred while getting available users');
			}
		},
		columns: [
					{ data: 'role' },
					{ data: 'description' }
				],
				sDom: "t<'row'<'col-sm-8'p><'col-sm-4 text-right'l>>",
				"pagingType": 'full_numbers',
				select:true,
				"order": [[ 1, 'asc' ]] 
					}, options || {} ));
	table.$('span[data-togle="tooltip"]').each(function() {
		$(this).tooltip();
	});
	
	$(selector+"-filter").on("keyup", function() {
		table.search($(this).val()).draw();
	});
	
	return table;
}

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

function ajaxError(jqXHR, status, error, message) {
    displayError(message + ": " + error.toString());
    console.log("Error jqXHR", jqXHR);
    console.log("Error status", status);
    console.log("Error object", error);
}

/**
 * Helper function for datatables, removes selected/all rows from origin and adds to destination
 * @param origin (datatable object - required)
 * @param destination (datatable object - optional)
 * @param all (boolean - optional) false/null for selected rows, true for all rows
 */
function moveRows(origin, destination, all) {
	var selected = origin.rows((all)?{}:{selected:true});
	if (destination) destination.rows.add(selected.data()).draw(false);
	selected.remove().draw(false);
}