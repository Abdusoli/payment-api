// ------------------------------- Listing Rule --------------------------------------------

$(document).ready(function() { //don't execute scripts until the document is ready
	var token = $("meta[name='_csrf']").attr("content");
	var header = $("meta[name='_csrf_header']").attr("content");
// initializing switch buttons onload
	$("#autoQuantityIncrease").prop("checked", "${listingRule.isAutoQuantityIncrease()}" == "true" ? true : false).change();
	$("#autoPriceIncrease").prop("checked", "${listingRule.isAutoPriceIncrease()}" == "true" ? true : false).change();

	$("#minWarehouseQtyForListing option[value='${listingRule.minWarehouseQtyForListing}']").prop('selected', true);
	$("#maxQtyForEcommerceListing option[value='${listingRule.maxQtyForEcommerceListing}']").prop('selected', true);
	$("#minQtyForEcommerceListing option[value='${listingRule.minQtyForEcommerceListing}']").prop('selected', true);
	$("#warehouseState option[value='${listingRule.warehouseState}']").prop('selected', true);
	
	$("#saveListingRule").on('click', function() {
		
		if (confirm('Are you sure?') == true) {
			
			var listingRule = null;
			
			if ($("#listingRule_id").val() == "") {
				listingRule = {
		 			 "userId" : $("#hidden-input-userId").val(),
		 			 "minWarehouseQtyForListing" : $("#minWarehouseQtyForListing").val(),
		 			 "maxWarehousePriceForListing" : $("#maxWarehousePriceForListing").val(),
		 			 "warehouseState" : $("#warehouseState").val(),
		 			 "maxQtyForEcommerceListing" : $("#maxQtyForEcommerceListing").val(),
		 			 "minQtyForEcommerceListing" : $("#minQtyForEcommerceListing").val(),
		 			 "autoQuantityIncrease" : $("input[id='autoQuantityIncrease']").is(":checked"),
		 			 "autoPriceIncrease" : $("input[id='autoPriceIncrease']").is(":checked"),
		 			 "autoPriceIncreasePercent" : $("#autoPriceIncreasePercent").val(),
		 			 "ebaySellerToken" : $("#ebaySellerToken").val(),
		 			 "ssapiBuyerAccount" : $("#ssapiBuyerAccount").val(),
		 			 "ssapiBuyerToken" : $("#ssapiBuyerToken").val()
						 };
			} else {
				listingRule = {
						 "id" : $("#listingRule_id").val(),
			 			 "userId" : $("#hidden-input-userId").val(),
			 			 "minWarehouseQtyForListing" : $("#minWarehouseQtyForListing").val(),
			 			 "maxWarehousePriceForListing" : $("#maxWarehousePriceForListing").val(),
			 			"warehouseState" : $("#warehouseState").val(),
			 			 "maxQtyForEcommerceListing" : $("#maxQtyForEcommerceListing").val(),
			 			 "minQtyForEcommerceListing" : $("#minQtyForEcommerceListing").val(),
			 			 "autoQuantityIncrease" : $("input[id='autoQuantityIncrease']").is(":checked"),
			 			 "autoPriceIncrease" : $("input[id='autoPriceIncrease']").is(":checked"),
			 			 "autoPriceIncreasePercent" : $("#autoPriceIncreasePercent").val(),
			 			 "ebaySellerToken" : $("#ebaySellerToken").val(),
			 			 "ssapiBuyerAccount" : $("#ssapiBuyerAccount").val(),
			 			 "ssapiBuyerToken" : $("#ssapiBuyerToken").val()
							 };
						}
			
		
			
				   $.ajax({
					   headers: { 
						   'Accept': 'application/json',
						  'Content-Type': 'application/json' 
						   },
				      type: "POST",
				      beforeSend: function(xhr) {
				    	    if (header && token) {
				    	        xhr.setRequestHeader(header, token);
				    	    }
				    	},
				      dataType : 'json',
				      url: "../../../admin/ajax/user/listing_rule/save",
				      data: JSON.stringify(listingRule),
				      success : function(data) {

				    		if ("SUCCESS" == data){
				    			displaySuccess("Data saved successfully !!!");
				    		} else {
				    			displayError(data);
				    		};
				       
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
			
		};	
		
	});
});
