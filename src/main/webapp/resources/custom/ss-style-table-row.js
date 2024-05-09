/**
 * CURRENT JS REQUIRES app-commions.js TO USE COMMON METHODS AND VARIABLES
 * PLEASE MAKE SURE YOU IMPORTED app-commions.js IN JSP FILE.  
 * 
 */


var userShippingServiceTable = initShippingServiceListDataTable("#shipping-service-list-table", {
	ajax:{
		headers: appCommons.headerContent,
		beforeSend: function(xhr) {appCommons.setAjaxRequestHeader(xhr);},
		method: 'POST',
		url: '../../../admin/ajax/user-shippingservice-list/'+ $("#userId").val() + '/SSActiveWear',  // + $("#hidden-input-userId").val(), // pass user roles
		"pagingType": 'full_numbers'
		} 
});

$('#product_pane').on('show.bs.collapse', function () {
	$(this).attr("disabled", true);
		initSSStyleDataTable('#ss-style-table', {
			ajax:{
				headers: appCommons.headerContent(),
				beforeSend: function(xhr) {appCommons.setAjaxRequestHeader(xhr);},
				method: 'GET',
				url: '../../../admin/ss_styles',
				"pagingType": 'full_numbers',
				}
				}, $('#userId').val()
		);
});



function initShippingServiceListDataTable(selector, options) {
	
	var table = $(selector).DataTable($.extend( true, {
		ajax:{
			dataSrc: '',
			url: null,
			error: function(jqXHR, status, error) {
				ajaxError(jqXHR, status, error,'Error occurred while getting user shipping service');
			}
		},
		columnDefs: [
					{ "targets" : 0,
						title : "Warehouse",
						data : "warehouseId" 
					},
					{ "targets" : 1, 
						title : "Key",
						data : "eBayShippingServiceKey",
						render: function ( data, type, full, meta ) {
				        return data;
				    }},
				    { "targets" : 2,
				    	title : "Custom name",
				    	data : "customName" 
				    },
					{ "targets" : 3,
				    	title : "Id",
				    	data : "id"
				    },
				    { "targets" : 4,
				    	title : "Shipping Type",
				    	data : "shippingType"
				    },
				    { "targets" : 5,
				       title : "Options",
				       orderable: false,
				       searchable: false,
						render: function ( data, type, full, meta ) {
				        return '<button type="button" id="viewLocal" class="btn btn-primary" >Shipping options</button>';
				    }},
				    { "targets" : 6,
				    	title : "Delete",   
				    	orderable: false,
					       searchable: false,
							render: function ( data, type, full, meta ) {
							if(full.eBayShippingServiceKey == "DEFAULT") {
							return '<button type="button" class="btn btn-success"><span class="glyphicon glyphicon-ok"></span></button>';
							} else {
					        return '<button type="button" class="btn btn-danger"  id="deleteShippingService"><span class="glyphicon glyphicon-remove"></span></button>';
							}
					    }},
				],
				sDom: "t<'row'<'col-sm-6'p><'col-sm-3 text-right'l>>",
				"pagingType": 'simple',
				"order": [[ 0, 'asc' ]]
					}, options || {} ));
	
	table.$('span[data-togle="tooltip"]').each(function() {
		$(this).tooltip();
	});
	
	$(selector+"-filter").on("keyup", function() {
		table.search($(this).val()).draw();
	});
	
	return table;

}

$('#shipping-service-list-table tbody').on( 'click', 'button#deleteShippingService', function () {

	var confirmed = confirm('All assigned styleIds for curren shipping service will be configured to default. \n' 
			+'Do you still want to delete?');
	
	if (confirmed == false) {
		return;
	}
	
	$.ajax({
		  headers: appCommons.headerContent(),
		  beforeSend: function(xhr) {appCommons.setAjaxRequestHeader(xhr);},
	      type: "POST",
	      url: "../../../admin/ajax/delete/shippingservice/" + $(this).closest('tr').find('td:eq(3)').text(),
	     // data: JSON.stringify(shippingServiceOptionList),
	      success : function(data) {
	    	  alert("SUCCESS");
	    	  $("#shipping-service-list-table").DataTable().ajax.reload();
	       
	     },
	      error: function(jqXHR, exception) {
	            if (jqXHR.status === 0) {
	                alert('Not connect.n Verify Network.');
	            } else if (jqXHR.status == 404) {
	                alert('Requested page not found. [404]');
	            } else if (jqXHR.status == 500) {
	                alert('Internal Server Error [500].');
	            } else if (exception === 'parsererror') {
	                alert('Requested JSON parse failed.');
	            } else if (exception === 'timeout') {
	                alert('Time out error.');
	            } else if (exception === 'abort') {
	                alert('Ajax request aborted.');
	            } else {
	                alert('Uncaught Error.n' + jqXHR.responseText);
	            }
	        }
	   });	
});

	
function initSSStyleDataTable(selector, options, currentUser) {
		
	var table = $(selector).DataTable($.extend( true, {
		ajax:{
			dataSrc: '',
			url: null,
			error: function(jqXHR, status, error) {
				ajaxError(jqXHR, status, error,'Error occurred while getting ss styles');
			}
		},
		
		destroy: true,
		
		columns: [
					{ data: 'styleID' },
					{ data: 'styleName' },
					{ data: 'brandName' },
					{ data: 'title' },
					{ data: null,
						sorting : false,
						searchable: false,
						render :   function ( data, type, full, meta ) {
						      return '<img src="https://www.ssactivewear.com/'+data.styleImage.replace("_fm.jpg", "_fs.jpg") +'" width="50" height="50">';}
					},
					{ data: 'styleID',
						sorting : false,
						searchable: false,
						render :   function ( data, type, full, meta ) {
							return '<button type="button" id="viewItem" class="btn btn-primary" >Shipping</button>';
							}
					}
				],
			     sDom:  "<'top' <'col-sm-2'i><'col-sm-8'p><'col-sm-2 text-right'l>>",
				"pagingType": 'full_numbers',
				select:true,
				"order": [[ 2, 'asc' ]]
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
/*    console.log("Error jqXHR", jqXHR);
    console.log("Error status", status);
    console.log("Error object", error);*/
}