/**
 * CURRENT JS REQUIRES app-commions.js TO USE COMMON METHODS AND VARIABLES
 * PLEASE MAKE SURE YOU IMPORTED app-commions.js IN JSP FILE.  
 * 
 */

$('#ss-style-table tbody').on( 'click', 'button#viewItem', function () {
	var STYLE_ID = $(this).closest('tr').find('td:eq(0)').text();
	$("#shippingServiceStyleId").text(STYLE_ID);

var styleConfiguredShippingServices = initConfiguredShippingServicesTable("#style-shipping-service-list-table", {
	ajax:{
		headers: appCommons.headerContent(),
		beforeSend: function(xhr) {appCommons.setAjaxRequestHeader(xhr);},
		tableTools: {
            "sRowSelect": "single"
        },
		method: 'POST',
		url: '../../../admin/ajax/user-shippingservice-list/'+ $("#userId").val() + '/SSActiveWear/' +$("#shippingServiceStyleId").text(),  // + $("#hidden-input-userId").val(), // pass user roles
		"pagingType": 'full_numbers'
		} 
	});

	$('#style-shipping-service-list-modal').modal('show');
});
 

function saveSshippingServiceForStyleId(ajaxURL) {
	$.ajax({
		  headers: appCommons.headerContent(),
		  beforeSend: function(xhr) {appCommons.setAjaxRequestHeader(xhr);},
	      type: "POST",
	      url: "../../../admin/ajax/save/shippingservice/forStyleId" +ajaxURL,
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
}


$("#saveStyleShippingService").click( function() {
	 if ($("#style-shipping-service-list-table tbody .selected").length > 1) {
		 alert("Please select only one");
		 return;
	 }
	 var  ajaxURL = "/" + $("#userId").val() +
	   				"/" + $("#warehouseId").val() +
	   				"/" + $("#shippingServiceStyleId").text();
	 if ($("#style-shipping-service-list-table tbody .selected").length == 1) {
		 ajaxURL += "/" + $("#style-shipping-service-list-table tbody .selected").closest('tr').find('td:eq(3)').text();

		 saveSshippingServiceForStyleId(ajaxURL);
	 } else {
		 ajaxURL += "/NONE";
		 saveSshippingServiceForStyleId(ajaxURL);
	 }
 }); 
 

function initConfiguredShippingServicesTable(selector, options) {
		
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
						  "data" : "warehouseId" 
						},
						{ "targets" : 1,
							"data" : "eBayShippingServiceKey",
							render: function ( data, type, full, meta ) {
					        return data;
					    }},
					    { "targets" : 2, 
							  "data" : "customName" 
						},
						{ "targets" : 3,
					    	"data" : "id"
						},
						{ "targets" : 4,
					    	"data" : "shippingType"
						},
						
						{	targets:  5,
				            orderable: false,
				            data: "isStyleChecked",
				            className: 'select-checkbox',
				            render : function ( data, type, full, meta ) {
				                return '';
				              }
				        }
					],
					sDom: "t<'row'<'col-sm-6'p><'col-sm-3 text-right'l>>",
					"pagingType": 'simple',
					select: {
						style: "single",
						selector: "td:last-child"
					},
					destroy : true,
					rowCallback : function( row, data, index ) {
				    	if (data.isStyleChecked){
				    		$(row).addClass("selected");
				    	}
				  },
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