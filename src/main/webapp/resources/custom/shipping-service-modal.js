/**
 * CURRENT JS REQUIRES app-commions.js TO USE COMMON METHODS AND VARIABLES
 * PLEASE MAKE SURE YOU IMPORTED app-commions.js IN JSP FILE.  
 * 
 */

function moveRows(origin, destination, all) {
	var selected = origin.rows((all)?{}:{selected:true});
	if (destination) destination.rows.add(selected.data()).draw(false);
	selected.remove().draw(false);
}



function setButtonListeners(origin, destination) {

		$("#left").on("click", function() {
			moveRows(destination, origin);
		});

		$("#right").on("click", function() {
			moveRows(origin, destination);
		});
	
}

$("#shippingTypeCode-select").on("change", function() {
	var destination = $("#user-shipping-service-table").DataTable();
	//TO-DO if shipping Type is not calculated, set all values to Zero them=n invalidate and hide
	var table =  destination.cells().invalidate("dom").draw();
	
	var origin = $("#shipping-service-table").DataTable();
	var column1 = destination.column(1);
	var column2 = destination.column(2);
	column1.visible( ! column1.visible() );
	column2.visible( ! column2.visible() );


	table.column(1).data().each( function(value,index) {
		console.log( 'Data in index1: '+index+' is: '+value );
	})
	table.column(2).data().each( function(value,index) {
		console.log( 'Data in index1: '+index+' is: '+value );
	});

	
	
	var oColumn1 = origin.column(1);
	var oColumn2 = origin.column(2);
	oColumn1.visible( ! oColumn1.visible() );
	oColumn2.visible( ! oColumn2.visible() );

});

function initShippingServiceTable(selector, options) {

	var table = $(selector).DataTable($.extend( true, {
		ajax:{
			stateSave: true,
			stateDuration: 0,
			dataSrc: '',
			error: function(jqXHR, status, error) {
				ajaxError(jqXHR, status, error,'Error occurred while getting available shipping services');
			}
		},
		columnDefs: [
					{ targets: 0, 
						data: "shippingServiceName",
						render :   function ( shippingService, type, full, meta ) {
						      return shippingService;}
					},
					{ targets: 1, 
						data: "shippingServiceCost.value",
						render :   function ( data, type, full, meta ) {
						      return '<input type="text" class="form-control" id="shippingServiceCost" value="' + data + '">';}
					},
					{ targets: 2, 
						data: "shippingServiceAdditionalCost.value",
						render :   function ( data, type, full, meta ) {
						      return '<input type="text" class="form-control" id="shippingServiceAdditionalCost" value="' + data + '">';}
					},
					{	targets: 3,
			            orderable: false,
			            data: "isFree",
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
				destroy: true,
				rowCallback : function( row, data, index ) {
			    	if (data.isFree){
			    		$(row).addClass("selected");
			    		}
			  },
				
					}, options || {} ));
	table.$('span[data-togle="tooltip"]').each(function() {
		$(this).tooltip();
	});
	
	$(selector+"-filter").on("keyup", function() {
		table.search($(this).val()).draw();
	});

	return table;
}


$("#addShippingDetail").click(function () {
	$("#shippingServiceId").val("EMPTY");
	// Validate if it has DEFAULT already
	if($('#shipping-service-list-table tbody tr').find("td:eq(1):contains('DEFAULT')").length > 0) {
		$("#shippingServiceCustomType-input").val("CUSTOM");
	} else {
		$("#shippingServiceCustomName-input").val("DEFAULT");
		$("#shippingServiceCustomType-input").val("DEFAULT");
	}
	
	var shippingServiceTable = initShippingServiceTable('#shipping-service-table', {
		ajax:{
			stateSave: true,
			headers: appCommons.headerContent,
			beforeSend: function(xhr) {appCommons.setAjaxRequestHeader(xhr);},
			method: 'POST',
			url:  "../../../admin/ajax/add/shippingservice",
			"pagingType": 'full_numbers'
		}
	});
	
	var userNewShippingServiceTable = initShippingServiceTable("#user-shipping-service-table", {
		ajax:{
			stateSave: true,
			headers: appCommons.headerContent,
			beforeSend: function(xhr) {appCommons.setAjaxRequestHeader(xhr);},
			method: 'POST',
			url: "../../../admin/ajax/configured-shippingservice/" + null + "/" + null,
			"pagingType": 'full_numbers'
		}
	});
	
	setButtonListeners(shippingServiceTable, userNewShippingServiceTable);
	
	$('#shipping-service-modal').modal('show');
	
	
});



$('#shipping-service-list-table tbody').on( 'click', 'button#viewInternational', function () {
	alert("Coming soon!!");
});


$('#shipping-service-list-table tbody').on( 'click', 'button#viewLocal', function () {

	var customNameValue = $(this).closest('tr').find('td:eq(2)').text();
	var customNameType = $(this).closest('tr').find('td:eq(1)').text();
	$("#shippingServiceId").val($(this).closest('tr').find('td:eq(3)').text());

	if(customNameValue != 'undefined' || customNameValue != "") {
		$("#shippingServiceCustomName-input").val(customNameValue);
		$("#shippingServiceCustomType-input").val(customNameType);
	}

	
	//var tableId = $(this).parent().parent().attr('id');
	var STYLE_IDS = $(this).closest('tr').find('td:eq(0)').text();
	var USER_ID = $("#userId").val();
//	var WAREHOUSE_ID = $("#warehouseId").val();
	var SHIPPING_SERVICE_ID = $(this).closest('tr').find('td:eq(3)').text();
	var availableURL = "../../../admin/ajax/available-configured-shippingservice/" + USER_ID + "/" + SHIPPING_SERVICE_ID;
	var configuredURL = "../../../admin/ajax/configured-shippingservice/" + USER_ID + "/" + SHIPPING_SERVICE_ID;
	
	var shippingServiceTable = initShippingServiceTable('#shipping-service-table', {
		ajax:{
			stateSave: true,
			headers: appCommons.headerContent,
			beforeSend: function(xhr) {appCommons.setAjaxRequestHeader(xhr);},
			method: 'POST',
			url: availableURL,
			"pagingType": 'full_numbers'
		}
	});
	
	var userShippingServiceTable = initShippingServiceTable("#user-shipping-service-table", {
		ajax:{
			stateSave: true,
			headers: appCommons.headerContent,
			beforeSend: function(xhr) {appCommons.setAjaxRequestHeader(xhr);},
			method: 'POST',
			url: configuredURL,
			"pagingType": 'full_numbers'
		}
	});
	
	setButtonListeners(shippingServiceTable, userShippingServiceTable);
	
	$('#shipping-service-modal').modal('show');

	
/* 
	$('#listGroupSelect').on('change', function (evt) {
		var groupId = this.value;
		shippingServiceTable.ajax.url('./ajax/getUsersNotInGroupId?GroupId='+groupId).load();
		userShippingServiceTable.ajax.url('./ajax/getUsersByGroupId?GroupId='+groupId).load();
		$('#membership-buttons').children().attr("disabled", (groupId == 'none'));
	});
 */
	


});




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

function saveUserShippingService() {
	   $.ajax({
	      type: "POST",
	      beforeSend: function(xhr) {
	    	    if (header && token) {
	    	        xhr.setRequestHeader(header, token);
	    	    }
	    	},
	    	
	      url: '../../../admin/ajax/save/user-shippingservice/' + $("#hidden-input-userId").val(),
	      data: {"autherizedRolesList": userShippingServiceTable.column(0).data().join(',')},
	      success : function(data) {

	    	  displaySuccess("User authorities have been saved");
	       
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

$("button#saveShippingServiceModal").on("click",function () {
	// if more then one selected alert message
	if ($("#user-shipping-service-table tbody .selected").length > 1) {
		alert("Please select only one free shipping");
		return;
	}
	
	// If local shipping services exceeds 4 then alert. Ebay not allow local shipping services more then 4
	var maxThreshold = $("#user-shipping-service-table tbody tr").length;
	if (maxThreshold > 4) {
		alert("Local shipping service exceeds max threshold. Please revove " +(maxThreshold - 4));
		return;
	}

	// if empty data table then exit
	if ($("#user-shipping-service-table > tbody > tr").closest('tr').find('td:eq(0)').text()  == "No data available in table") {
		 console.log("exit function");
		 $('#shipping-service-modal').modal('toggle');
		 return;
	}

	var shippingServiceOptionList = [];
	var lastTableRowNumber = $("#user-shipping-service-table > tbody > tr").length;
	
	var counter = 1;
	var hasFreeShipping = false;
	var priorityNumber = 0;
	
	
	
	
	/**
	 * This iteration logic will get all user shipping services and define priority based on free shipping,
	 * Priority number should be 1(One), if there is free shipping. It is the requirement of EBay Trading API.
	 * In EBay listing shipping services will be listed in a sequence based according to priority numbers.   
	 */
	$("#user-shipping-service-table > tbody > tr").each(function(index) {

		var v_isFree =$(this).closest('tr').hasClass("selected");
		var v_serviceName = $(this).closest('tr').find('td:eq(0)').text() ;
		var v_shippingServiceCost = $(this).closest('tr').find('td:eq(1)').find("input").val();
		var v_shippingServiceAdditionalCost = $(this).closest('tr').find('td:eq(2)').find("input").val() ;
		console.log("index: " + index);
		priorityNumber = ++counter;
		console.log("priorityNumber after ++: " + priorityNumber);
		
	    if (v_isFree == true) {
	    	hasFreeShipping = true;
	    	priorityNumber = 1;
	    	--counter;
	    }
	    
	    if (lastTableRowNumber == (index+1) && !hasFreeShipping) {
	    	priorityNumber = 1;
	    }

	    shippingServiceOptionList.push({
	    	shippingService: v_serviceName,
	    	shippingServiceCost : {value: parseFloat(v_shippingServiceCost), currencyID: "USD"} ,
	    	shippingServiceAdditionalCost: {value: parseFloat(v_shippingServiceAdditionalCost), currencyID: "USD"},
	    	shippingServicePriority: priorityNumber,
	    	freeShipping: v_isFree
	    });
	});
		
	console.log(JSON.stringify(shippingServiceOptionList));
	
	
	   $.ajax({
		  headers: appCommons.headerContent(),
		  beforeSend: function(xhr) {appCommons.setAjaxRequestHeader(xhr);},
	      type: "POST",
	      url: "../../../admin/ajax/add/shippingservice/" + $("#shippingServiceId").val()
	      											+ "/" + $("#userId").val() 
	      											+ "/" + $("#warehouseId").val() 
	      											+ "/" + $("#shippingServiceCustomName-input").val()
	      											+ "/" + $("#shippingServiceCustomType-input").val(),
	      data: JSON.stringify(shippingServiceOptionList),
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
	
	   $('#shipping-service-modal').modal('toggle');
});



$("#shipping-service-modal").on("hidden.bs.modal", function () {
    $(this).find('input.form-control').val('');
});

