var availableShippingServiceTable = initShippingServiceOptionsDataTable('#shipping-service-table', {
	ajax:{
		url: '../../../admin/ajax/shipping_service',
		"pagingType": 'full_numbers',
	}
});

var userShippingServiceTable = initShippingServiceOptionsDataTable('#user-shipping-service-table', {
	ajax:{
		method: "POST",
		url: '../../../admin/ajax/shipping_service/'+ $("#hidden-input-userId").val() + "/DEFAULT_KEY",
		"pagingType": 'simple',
	}
});

function initShippingServiceOptionsDataTable(selector, options) {
	
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
			error: function(jqXHR, status, error) {
				ajaxError(jqXHR, status, error,'Error occurred while getting available users');
			}
		},
		columns: [
					//{ data: "name" },
					{ data: "value" }
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