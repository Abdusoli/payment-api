/**
 * CURRENT JS REQUIRES app-commions.js TO USE COMMON METHODS AND VARIABLES
 * PLEASE MAKE SURE YOU IMPORTED app-commions.js IN JSP FILE.  
 * 
 */


// Check if there is any worldwide If so hide requires buyers to contact countries else show
function toggleContactRequiredCountries() {
	if ($("#international_shipping_table tbody tr td span div button.disabled").length > 0 ){
		$("#international_buyer_contact_countries_select").val(null);
		$("#international_buyer_contact_countries_select").multiselect("refresh");
		$("#international_buyer_contact_countries_select").parent().hide();
	} else {
		$("#international_buyer_contact_countries_select").val(null);
		$("#international_buyer_contact_countries_select").multiselect("refresh");
		$("#international_buyer_contact_countries_select").parent().show();
	}	
}

$('input:radio[name="returnsAccepted"]').change( function(){
	if ($(this).val() == "ReturnsNotAccepted") {
		$("#returnDetails").hide();
	} else {
		$("#returnDetails").show();
	}
	
});


$('#removeLastLocalShippingServiceOption').on('click', function(){
	 $('table#local_shipping_table tr:last').remove();
});
$('#removeLastInternationalShippingServiceOption').on('click', function(){
	 $('table#international_shipping_table tr:last').remove();
});

$("#estimatedWeight-select").on("change", function() {
	if ($(this).val() == 0 ) {
		$("#weightLBS").val('');
		$("#weightOZ").val('');
		$("#weights").show();
	} else {
		$("#weightLBS").val($(this).val());
		$("#weightOZ").val(0);
		$("#weights").hide();
	}	
});

$("#sales_tax_state").on("change", function() {
	if ($(this).val() == "NONE" ) {
		$("#sale_tax_percent").val('');
		$("#sale_tax_percent").attr("disabled", true);
	} else {
		$("#sale_tax_percent").attr("disabled", false);
	}	
});


/**
 * Adds removes "disable" property in <input> fields when checkbox is triggered onclick event. 
 * @param checkbox
 * @returns
 */

function updateInputFields(checkbox) {
	//get surcharge value true/false
	var surchargeApplies = $("table#local_shipping_table tr:first td input[data-surcharge]").attr("data-surcharge");
	//clean all input fields
	if (checkbox.checked) {
		$("table#local_shipping_table tr:first td input[type=number]").val("");
	}
	$("table#local_shipping_table tr:first td input[data-cost=cost]").attr("disabled", checkbox.checked);
	//check if surcharge applies then let enable surcharge field
	if (surchargeApplies == 'true') {
		console.log(surchargeApplies);
		$("table#local_shipping_table tr:first td input[data-surcharge]").attr("disabled", checkbox.checked);
	}
}



$("#addLocalShippingServiceOption").on("click", function () {

	// Check for Max Limit
	if ($('table#local_shipping_table tr:last').index() >= 3) {
		alert ("You have reached Max eBay limit");
		return;
	}
	
	// Check for duplicate option while adding a new
	if ($("table#local_shipping_table input[value='"+$("#local_shipping_select option:selected" ).val()+ "']").length > 0 ) {
		alert ("You are trying to add existing shipping option");
		return;
	}

	var newRow ="<tr><td>" + ($('table#local_shipping_table tr:last').index() + 2) 
	            +"<input type='hidden' value='"+ $("#local_shipping_select option:selected" ).val() +"' ></td>"
	            +"<td>"+ $("#local_shipping_select option:selected" ).text() +"</td>"
	if ($("#shippingType-input").val() == "Flat" || $("#shippingType-input").val() == "FlatDomesticCalculatedInternational") {
	   	newRow += "<td><input type='number' class='form-control' placeholder='Cost' data-cost='cost'></td>" +
	   			"<td><input type='number' class='form-control' placeholder='Additional Cost' data-cost='cost'></td>";
	   	if($("#local_shipping_select option:selected" ).attr("data-surcharge") == 'true') {
	   		newRow +=  "<td><input type='number' class='form-control'  placeholder='Surecharge' data-surcharge='true' data-toggle='tooltip' title='Add a surcharge for Alaska, Hawaii, and Puerto Rico.'></td>";
		 } else {
			 newRow += "<td><input type='number' class='form-control'  placeholder='N/A' data-surcharge='false' data-toggle='tooltip' title='Surcharge is not applicable for this service.' disabled></td>";
		 }
	   }
	 if ($('table#local_shipping_table tr:last').index() < 0) {
		 newRow += "<td><input type='checkbox' id='freeShipping-checkbox' onclick='javascript:updateInputFields(this);' class='form-input'> free</input></td></tr>";
	 } else {
		 newRow += "<td></td></tr>";
	 } 
	 
	 $(newRow).appendTo("table#local_shipping_table");
	
});

$("#addInternationalShippingServiceOption").on("click", function () {
	
	// Check for Max Limit
	if ($('table#international_shipping_table tr:last').index() >= 4) {
		alert ("You have reached Max eBay limit");
		return;
	}
	// Check for duplicate option while adding a new
	if ($("table#international_shipping_table input[value='"+$("#international_shipping_select option:selected" ).val()+ "']").length > 0 ) {
		alert ("You are trying to add existing shipping option");
		return;
	}
	// Check if CUSTOM, at least on selected on ship to countries drop down
	$("#international_ship_to_location_select")
	if ($("#international_ship_to_location_select option:selected" ).val() == "CUSTOM" && 
			$("#international_ship_to_countries_select").val() == undefined ) {
		alert ("Please, select at lease one country neme.");
		return;
	}
	
	
	
	var newRow = "<tr><td>" + ($('table#international_shipping_table tr:last').index() + 2) 
	            +"<input type='hidden' value='"+ $("#international_shipping_select option:selected" ).val() +"' ></td>"
	            +"<td>"+ $("#international_shipping_select option:selected" ).text() +"</td>";
	if ($("#shippingType-input").val() == "Flat" || $("#shippingType-input").val() == "CalculatedDomesticFlatInternational") {
	   	newRow += "<td><input type='number' placeholder='Cost' class='form-control'></td><td><input type='number' placeholder='Additional Cost' class='form-control'></td>"; 
	   } 
	// Populate with shipping location (international_ship_to_countries_select <select> options) and update Id *_index +2  
	// require buyers to contact you (international_buyer_contact_countries_select <select>)
		
		var $select = $("#international_ship_to_countries_select").clone();
		//$selectElement.find("select").val($("#international_ship_to_countries_select").val());
		var indexNumber = ($('table#international_shipping_table tr:last').index() + 2);
		newRow += "<td><select multiple='multiple' data-toggle='tooltip' title='Choose custom location.' id='ship_to_dynamic_"+ indexNumber +"' >"+$select.html()+"</select></td></tr>";
		
	console.log(newRow);
	$(newRow).appendTo("table#international_shipping_table");
	$("#ship_to_dynamic_"+indexNumber).multiselect({nonSelectedText: 'Country name'});
	
	if ($("#international_ship_to_location_select").find(":selected").val() == 'Worldwide') {
		$("#ship_to_dynamic_"+indexNumber).val($("#international_ship_to_countries_select").val());
		$("#ship_to_dynamic_"+indexNumber).multiselect('disable');
		// Check if there is any worldwide If so hide requires buyers to contact countries else show
		toggleContactRequiredCountries();
	} else {
		$("#ship_to_dynamic_"+indexNumber).val($("#international_ship_to_countries_select").val());
		$("#ship_to_dynamic_"+indexNumber).multiselect('refresh');
	}
	
	$("#international_ship_to_countries_select").val(null);	
	$("#international_ship_to_countries_select").multiselect("refresh");
	

	
});

$("#local_shipping_select").on("change",  function () {
	if ($(this).val() =="NONE") {
		$("#addLocalShippingServiceOption").attr("disabled", true);
	} else {
		$("#addLocalShippingServiceOption").removeAttr("disabled");
	}
});

$("#international_shipping_select").on("change",  function () {
	if ($(this).val() =="NONE" || $("#international_ship_to_location_select").find(":selected").val() =="NONE") {
		$("#addInternationalShippingServiceOption").attr("disabled", true);
	} else {
		$("#addInternationalShippingServiceOption").removeAttr("disabled");
	}
});

$("#international_ship_to_location_select").on("change",  function () {
	
	function hideSelectElements() {
		$("#international_ship_to_countries_select").val(null);
		$("#international_ship_to_countries_select").multiselect("refresh");
		$("#international_ship_to_countries_select").parent().hide();
	}

	function showSelectElements() {
		$("#international_ship_to_countries_select").parent().show();
	}
if ($(this).val() =="NONE" || $( "#international_shipping_select").find(":selected").val() =="NONE") {
	$("#addInternationalShippingServiceOption").attr("disabled", true);
} else {
	$("#addInternationalShippingServiceOption").removeAttr("disabled");	
}

if ($(this).val() =="Worldwide") {
	// hide shipping location (international_ship_to_countries_select <select>) & 
	// require buyers to contact you (international_buyer_contact_countries_select <select>)
	hideSelectElements();
} else if ($(this).val() == "CUSTOM") {
	// show shipping location (international_ship_to_countries_select <select>) & 
	// require buyers to contact you (international_buyer_contact_countries_select <select>)
	showSelectElements();
} 
});

$("#shippingTypeCode_select").on("change",  function () {
	if ($(this).val() =="NONE") {
		$("#addShippingDetail").attr("disabled", true);
	} else {
		$("#addShippingDetail").removeAttr("disabled");
	}
});






$("#addShippingDetail").click(function () {
	$("#shippingServiceId").val("EMPTY");
	// Validate if it has DEFAULT already
	if($('#shipping-service-list-table tbody tr').find("td:eq(1):contains('DEFAULT')").length > 0) {
		$("#shippingServiceCustomType-input").val("CUSTOM");
	} else {
		$("#shippingServiceCustomName-input").val("DEFAULT");
		$("#shippingServiceCustomType-input").val("DEFAULT");
	}
	var SHIPPING_SERVICE_TYPE = $("#shippingTypeCode_select").find(":selected").text();
	var USER_ID = $("#userId").val();
	$("#shippingType-input").val(SHIPPING_SERVICE_TYPE);
	
	// Need to do AJAX call to populate drop down menus
	getJsonShippingOption("../../../admin/ajax/shippingservice/" + USER_ID + "/" + SHIPPING_SERVICE_TYPE + "/", false);
	getJsonShippingOption("../../../admin/ajax/shippingservice/" + USER_ID + "/" + SHIPPING_SERVICE_TYPE + "/", true);
	getExcludeLocations("../../../admin/ajax/exclude_locations/" + USER_ID);
	getShipToLocations();

	$('#shipping-service-modal').modal('show');
	
	
});

var INTERNATIONAL_DATA_JSON;
var LOCAL_DATA_JSON;

//
function getJsonShippingOption(strURL, isInternational) {

	$.ajax({
	    type: "POST",
	    headers: appCommons.headerContent,
		beforeSend: function(xhr) {appCommons.setAjaxRequestHeader(xhr);},
	  	async: false,
	    url: strURL + isInternational ,
	  //  data: {"autherizedRolesList": userShippingServiceTable.column(0).data().join(',')},
	    success : function(data) {
	    
	    	var selectHTML = "<option value='NONE'>-- Select service --</option>";
			
			  if (isInternational) {
				  var standardInternational = _.where( data, { shippingCategory : "STANDARD"});
				  var expeditedInternational = _.where( data, { shippingCategory : "EXPEDITED"});
				  var economyInternational = _.where( data, { shippingCategory : "ECONOMY"});
				  var noneInternational = _.where( data, { shippingCategory : "NONE"});
				  var combinedInternational = _.union(standardInternational, expeditedInternational, economyInternational, noneInternational);
				  var template = "{{#data}}<option value='{{shippingService}}' data-weight-required='{{weightRequired}}' data-dimensions-required='{{dimensionsRequired}}'>{{description}}</option>{{/data}}";
				  $("#international_shipping_select").empty();
				  $(selectHTML).appendTo("#international_shipping_select");
				  $(Mustache.render(template, {data:combinedInternational})).appendTo("#international_shipping_select");
			    } else {
			    	var standardLocal = _.where( data, { shippingCategory : "STANDARD"});
					var expeditedLocal = _.where( data, { shippingCategory : "EXPEDITED"});
					var economyLocal = _.where( data, { shippingCategory : "ECONOMY"});
					var noneLocal = _.where( data, { shippingCategory : "NONE"});
					var otherLocal = _.where( data, { shippingCategory : "OTHER"});
					var freightLocal = _.where( data, { shippingCategory : "FREIGHT"});
					var oneDayLocal = _.where( data, { shippingCategory : "ONE_DAY"});
					var pickUpLocal = _.where( data, { shippingCategory : "PICKUP"});
				 
					var template = "{{#data}}<option value='{{shippingService}}' data-surcharge='{{surchargeApplicable}}' data-shippingCategory='{{shippingCategory}}'>{{description}}</option>{{/data}}";
					
					if (standardLocal) {
						selectHTML += "<optgroup label='Standard services'>" + Mustache.render(template, {data:standardLocal}) + "</optgroup>";
					}
					if (economyLocal) {
						selectHTML += "<optgroup label='Economy services'>" + Mustache.render(template, {data:economyLocal}) + "</optgroup>";
					}
					if (expeditedLocal) {
						selectHTML += "<optgroup label='Expedited services'>" + Mustache.render(template, {data:expeditedLocal}) + "</optgroup>";
					}
					if (oneDayLocal) {
						selectHTML += "<optgroup label='One-day services'>" + Mustache.render(template, {data:oneDayLocal}) + "</optgroup>";
					}
					if (freightLocal) {
						selectHTML += "<optgroup label='Freight services'>" + Mustache.render(template, {data:freightLocal}) + "</optgroup>";
					}
					if (otherLocal) {
						selectHTML += "<optgroup label='Other services'>" + Mustache.render(template, {data:otherLocal}) + "</optgroup>";
					}
					if (noneLocal) {
						selectHTML += "<optgroup label='----------'>" + Mustache.render(template, {data:noneLocal}) + "</optgroup>";
					}
					if (pickUpLocal) {
						selectHTML += "<optgroup label='Local pick up'>" + Mustache.render(template, {data:pickUpLocal}) + "</optgroup>";
					}
			      $("#local_shipping_select").empty();
			      $(selectHTML).appendTo("#local_shipping_select");
			      console.log("Local shipping option AJAX call completed");
			    }
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



function createShippingServiceOptionTable(ajaxURL, shippingType) {
	$.ajax({
	    type: "POST",
	    headers: appCommons.headerContent,
		beforeSend: function(xhr) {appCommons.setAjaxRequestHeader(xhr);},
	  	
	    url: ajaxURL ,
	  //  data: {"autherizedRolesList": userShippingServiceTable.column(0).data().join(',')},
	    success : function(data) {
	    	if(data.dispatchMaxDay) {
	    		$("#dispatch_max_time").val(data.dispatchMaxDay);
	    	}
	    	
	    	if(data.postalCode) {
	    		$("#item_location_zip_code").val(data.postalCode);
	    	}
	    	
	    	if(data.location) {
	    		$("#item_location_city_and_state").val(data.location);
	    	}
	
	    	if (data.shippingServiceOptionList) {
	    		// Sort json array by priority# 
	    		var sortedItems = _.sortBy(data.shippingServiceOptionList, function(o) { return o.shippingServicePriority;});
	    		var tableHTML = "";
	    		 $.each( sortedItems, function( index, item ) {

	    			 tableHTML += "<tr><td>" +(++index)+"<input type='hidden' value='"+item.shippingService+"' ></td><td>" 
	    			 + $("#local_shipping_select option[value=" +item.shippingService +"]").text() + "</td>";
	    			 if (shippingType == "Flat" || shippingType == "FlatDomesticCalculatedInternational") {
	    				 if (index == 1 && item.freeShipping) {
	    				    tableHTML += "<td><input type='number' class='form-control' data-cost='cost'  placeholder='Cost' value='" +item.shippingServiceCost.value+"' disabled></td>" +
	    				 		      "<td><input type='number' class='form-control' data-cost='cost'  placeholder='Additional cost' value='" + item.shippingServiceAdditionalCost.value +"' disabled></td>";
	    				    
	    				 } else {
	    					  tableHTML += "<td><input type='number' class='form-control' data-cost='cost'  placeholder='Cost' value='" +item.shippingServiceCost.value+"' ></td>" +
				 		      "<td><input type='number' class='form-control' data-cost='cost'  placeholder='Additional cost' value='" + item.shippingServiceAdditionalCost.value +"' ></td>";
	    				 }
	    				 if($("#local_shipping_select option[value=" +item.shippingService +"]").attr("data-surcharge") == 'true' && item.freeShipping) {
	    					 tableHTML +=  "<td><input type='number' class='form-control' placeholder='Surecharge' data-surcharge='true' data-toggle='tooltip' title='Add a surcharge for Alaska, Hawaii, and Puerto Rico.' value='"+ item.shippingSurcharge.value +"' disabled></td>";
	    				 } else if ($("#local_shipping_select option[value=" +item.shippingService +"]").attr("data-surcharge") == 'true' && item.freeShipping !== true) {
	    					 tableHTML +=  "<td><input type='number' class='form-control' placeholder='Surecharge' data-surcharge='true' data-toggle='tooltip' title='Add a surcharge for Alaska, Hawaii, and Puerto Rico.' value='"+ item.shippingSurcharge.value +"' ></td>";
	    				 } else {
	    					 tableHTML += "<td><input type='number' class='form-control' placeholder='Surecharge N/A' data-toggle='tooltip' data-surcharge='false' title='Surcharge is not applicable for this service.' disabled></td>";
	    				 }
	    			 }
	    			 if (index == 1 && item.freeShipping) {
	    				 tableHTML += "<td><input type='checkbox'  onclick='javascript:updateInputFields(this);' class='form-input' id='freeShipping-checkbox' checked> free</input></td></tr>";
	    			 } else if (index == 1 && item.freeShipping == false) {
	    				 tableHTML += "<td><input type='checkbox' class='form-input'  onclick='javascript:updateInputFields(this);' id='freeShipping-checkbox' > free</input></td></tr>";
	    			 } 
	    			 
	    			 else {
	    				 tableHTML += "<td></td></tr>";
	    			 }
	    		 });
	    		 
	    		
	    		 
	    		 
	    		 
	    		 
	    		$(tableHTML).appendTo("#local_shipping_table");
	    		
	    	}
	    	if (data.internationalShippingServiceOptionList) {
	    		// Sort json array by priority# 
	    	    var sortedItems = _.sortBy(data.internationalShippingServiceOptionList, function(o) { return o.shippingServicePriority;});

	    		$.each(sortedItems, function( index, item ) {
	    			var tableHTML = "";
	    			var $select = $("#international_ship_to_countries_select").clone();   			
	    			var indexNumber = index +1;
	    		
	    			 	tableHTML += "<tr><td>" +indexNumber+"<input type='hidden' value='"+item.shippingService+"' ></td><td>" 
	    			 	+ $("#international_shipping_select option[value=" +item.shippingService +"]").text() + "</td>";
	    			 if (shippingType == "Flat" || shippingType == "CalculatedDomesticFlatInternational") {
	    				 tableHTML += "<td><input type='number' class='form-control' value='" +item.shippingServiceCost.value+"' ></td>" +
	    				 		"<td><input type='number' class='form-control' value='" + item.shippingServiceAdditionalCost.value +"' ></td>"; 
	    			 }
	    			 
	    				tableHTML += "<td><select multiple='multiple' data-toggle='tooltip' title='Choose custom location.' id='ship_to_dynamic_"+indexNumber+"'>"+$select.html()+"</select></td></tr>";

	    				$(tableHTML).appendTo("#international_shipping_table");
	    			
	    			$("#ship_to_dynamic_"+indexNumber).multiselect({nonSelectedText: 'Country name'});
	    			
	    			if ( item.shipToLocation[0] == 'Worldwide') {
	    				$("#ship_to_dynamic_"+indexNumber).val(['Worldwide']);
	    				$("#ship_to_dynamic_"+indexNumber).multiselect('disable');
	    			} else {
	    				$("#ship_to_dynamic_"+indexNumber).val(item.shipToLocation);
	    				$("#ship_to_dynamic_"+indexNumber).multiselect('refresh');
	    			}
	    		 });
	    		
	    		toggleContactRequiredCountries();
	    		$("#ajaxDataI").val("");
	    	}
	    	
	    	if(data.shipToLocations) {
	    		$("#international_buyer_contact_countries_select").val(data.shipToLocations);
	    		$("#international_buyer_contact_countries_select").multiselect('refresh');
	    		
	    		
	    	}
	    	
	    	if(data.excludeShipToLocation) {
	    		$("[data-node-name=exclude_group]").val(data.excludeShipToLocation);
	    		$("[data-node-name=exclude_group]").multiselect('refresh');
	    		
	    		$.each(data.excludeShipToLocation, function( index, value ) {
	    			  if ($('select[data-node-title="'+value+'"]').length !== 0) {
	    				  $('select[data-node-title="'+value+'"]').multiselect('selectAll', false);
	    				  $('select[data-node-title="'+value+'"]').multiselect('refresh');  
	    			  }
	    			});
	    	}
	    	
	    	if(data.salesTax) {
	    		$("#sales_tax_state").val(data.salesTax.salesTaxState);
	    		$("#sale_tax_percent").val(data.salesTax.salesTaxPercent);
	    		$("#shippingIncludedInTax").prop('checked',data.salesTax.shippingIncludedInTax);
	    	}
	    	
	    	if(data.calculatedShippingRate) {
	    		$("#pkgDepth").val(data.calculatedShippingRate.packageDepth.value);
	    		$("#pkgLength").val(data.calculatedShippingRate.packageLength.value);
	    		$("#pkgWidth").val(data.calculatedShippingRate.packageWidth.value);
	    		$("#irregularPackage").prop('checked',data.calculatedShippingRate.shippingIrregular);
	    		$("#pkgType").val(data.calculatedShippingRate.shippingPackage);
	    		$("#weightLBS").val(data.calculatedShippingRate.weightMajor.value);
	    		$("#weightOZ").val(data.calculatedShippingRate.weightMinor.value);
	    		
	    		
	    		if($("#weightLBS").val() > 0 && $("#weightLBS").val() <11 && $("#weightOZ").val() == 0) {
	    			$("#estimatedWeight-select").val($("#weightLBS").val());
	    		} else {
	    			$("#estimatedWeight-select").val(0);
	    			$("#weights").show();
	    		}
	    		
	    		$("#packagingHandlingCosts").val(data.calculatedShippingRate.packagingHandlingCosts.value);
	    		if (data.calculatedShippingRate.internationalPackagingHandlingCosts && data.calculatedShippingRate.internationalPackagingHandlingCosts.value > 0) {
	    			$("#internationalPackagingHandlingCosts").val(data.calculatedShippingRate.internationalPackagingHandlingCosts.value);
	    			
	    		}
	    	}
	    	
	    	if (data.country) {
	    		$("#item_location_country" ).val(data.country);
	    	}
	    	if (data.postalCode) {
	    		$("#item_location_zip_code").val(data.postalCode);
	    	}
	    	if (data.location) {
	    		$("#item_location_city_and_state").val(data.location);
	    	}
	    	
	    	if (data.returnPolicyType) {
	    		if (data.returnPolicyType.returnsAcceptedOption == "ReturnsAccepted") {
	    			$("#returnDetails").show();
	    	    	$("#returnsAccepted").prop('checked',true);
		    		$("#extendedHolidayReturns").prop('checked', data.returnPolicyType.extendedHolidayReturns);
		    		$("#refundGivenAs").val(data.returnPolicyType.refundOption);
		    		$("#restockingFeeValue").val(data.returnPolicyType.restockingFeeValueOption);
		    		$("#itemReturnedWithin").val(data.returnPolicyType.returnsWithinOption);
		    		$("#returnsPaidBy").val(data.returnPolicyType.shippingCostPaidByOption);
		    		$("#returnPolicyDescription").val(data.returnPolicyType.description);
	    		} else {
	    			$("#returnDetails").hide();
	    	    	$("#returnsNotAccepted").prop('checked',true);
	    		}
	    	}
	    	
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



function getExcludeLocations(ajaxURL) {
	
	function createDropDown(arr, selector, all_name) {
		$("#exclude_"+selector).empty();
		var template = "{{#arr}}<option value='{{location}}'>{{description}}</option>{{/arr}}";
		$(Mustache.render(template, {arr:arr})).appendTo("#exclude_"+selector)
		
    	 $("#exclude_"+selector).multiselect(
	    		 {
	    		   enableFiltering: true,
	    		   includeSelectAllOption: true,
	    		   selectAllText: all_name,
	    		   selectAllValue: all_name,
	    		   nonSelectedText: all_name,
	    		   allSelectedText: all_name +" all excluded",
	    		   nSelectedText: " excluded in " + all_name,
	               maxHeight: 200
	           });
	}

	$.ajax({
	    type: "POST",
	    headers: appCommons.headerContent,
		beforeSend: function(xhr) {appCommons.setAjaxRequestHeader(xhr);},
	    url: ajaxURL,
	    success : function(data) {
	    	if(data) {
	    		var domesticList = _.where(data, {region: "Domestic Location"});
		    	var additionalList = _.where(data, {region: "Additional Locations"});
		    	var domesticAndAdditionalList = _.union(domesticList, additionalList);
		    	console.log("Got exclude " +domesticAndAdditionalList.length+" domesticAndAdditionalList locations " + JSON.stringify(domesticAndAdditionalList));
		    	// Create domestic and additional select checkbox
		    	console.log();
		    	var optionsDomesticAndAdditional = "<optgroup label='Domestic'>";
		    	 $.each(domesticList, function( index, item ) {
		    		 
		    		 optionsDomesticAndAdditional += "<option value='" + item.location + "'>" + item.description +"</option>";
		    	 });
		    	 optionsDomesticAndAdditional +="</optgroup><optgroup label='Additional'>";
		    	 
		    	 $.each(additionalList, function( index, item ) {
		    		 
		    		 optionsDomesticAndAdditional += "<option value='" + item.location + "'>" + item.description +"</option>";
		    	 });
		    	 optionsDomesticAndAdditional +="</optgroup>";
   	 
		    	 $("#exclude_domesticAndAdditional").empty();
		    	 $(optionsDomesticAndAdditional).appendTo("#exclude_domesticAndAdditional");
		    	 $("#exclude_domesticAndAdditional").multiselect(
		    			 {
		  	    		   nonSelectedText: "Domestic and Additional",
		  	    		    allSelectedText: "Domestic and Additional are all excluded"
		  	           }
		    	 );

		    	// Create International lists
		    	var africaList = _.where(data, {region: "Africa"});
		    	createDropDown(africaList, "africa", "Africa");
    	
		    	var asiaRowList = _.where(data, {region: "Asia"});
		    	var asiaList = _.reject(asiaRowList,function(item){ return item.location === "Middle East" || item.location === "Southeast Asia"; });
		    	createDropDown(asiaList, "asia", "Asia");
		    	var middlEastList =  _.where(data, {region: "Middle East"});
		    	createDropDown(middlEastList, "middleEast", "Middle East");

		    	var southeastAsiaList =  _.where(data, {region: "Southeast Asia"});
		    	createDropDown(southeastAsiaList, "southeastAsia", "Southeast Asia");
	    		
		    	
	    		var centralAmericaAndCaribbeanList = _.where(data, {region: "Central America and Caribbean"});
	    		createDropDown(centralAmericaAndCaribbeanList, "centralAmericaAndCaribbean", "Central America and Caribbean");
	    		var europList  = _.where(data, {region:  "Europe"});
	    		createDropDown(europList, "europe", "Europe");
	    		
		    	
		    	
	    		var northAmericaList  = _.where(data, {region:  "North America"});
	    		createDropDown(northAmericaList, "northAmerica", "North America");
	    		
	    		
	    		var oceaniaList  = _.where(data, {region:  "Oceania"});
	    		createDropDown(oceaniaList, "oceania","Oceania");
	    		
		    	var southAmericaList  = _.where(data, {region:  "South America"});
		    	createDropDown(southAmericaList, "southAmerica", "South America");

	    	}
	    	
	    	
	    	
	    	//To-Do create bootstrap multiselect drop down
	    	
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


$('#shipping-service-list-table tbody').on( 'click', 'button#viewInternational', function () {
	alert("Coming soon!!");
});




$('#shipping-service-list-table tbody').on( 'click', 'button#viewLocal', function () {
	var SHIPPING_SERVICE_TYPE = $("#shippingType-input").val($(this).closest('tr').find('td:eq(4)').text()).val();
	var USER_ID = $("#userId").val();
	var SHIPPING_SERVICE_ID = $(this).closest('tr').find('td:eq(3)').text();
	
	getJsonShippingOption("../../../admin/ajax/shippingservice/" + USER_ID + "/" + SHIPPING_SERVICE_TYPE + "/", false);
	getJsonShippingOption("../../../admin/ajax/shippingservice/" + USER_ID + "/" + SHIPPING_SERVICE_TYPE + "/", true);
	getExcludeLocations("../../../admin/ajax/exclude_locations/" + USER_ID);
	getShipToLocations();
	var customNameValue = $(this).closest('tr').find('td:eq(2)').text();
	var customNameType = $(this).closest('tr').find('td:eq(1)').text();
	$("#shippingServiceId").val($(this).closest('tr').find('td:eq(3)').text());

	if(customNameValue != 'undefined' || customNameValue != "") {
		$("#shippingServiceCustomName-input").val(customNameValue);
		$("#shippingServiceCustomType-input").val(customNameType);
	}
	
	createShippingServiceOptionTable("../../../admin/ajax/shipping_service_details/"+SHIPPING_SERVICE_ID+"/"+ USER_ID, SHIPPING_SERVICE_TYPE);
	
	
	
	


	$('#shipping-service-modal').modal('show');
	
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

$("button#saveShippingServiceModal").on("click",function () {
	
	
	//Validate if there is no name  
	if ($("#shippingServiceCustomName-input").val() == "") {
		alert("please give custom name");
		return;
	}
	 var isLocalAdditionalCostGreater = false;
///////////////////////////////////////// Local Shipping Service Data from here /////////////////////////////
	var shippingServiceOptionList = [];
	
	/**
	 * This iteration logic will get all user shipping services and define priority based on free shipping,
	 * Priority number should be 1(One), if there is free shipping. It is the requirement of EBay Trading API.
	 * In EBay listing shipping services will be listed in a sequence based according to priority numbers.   
	 */
   $("#local_shipping_table > tbody > tr").each(function(index) {

	   var v_priorityNumber;
	   var v_serviceName;
	   var v_shippingServiceCost;
	   var v_shippingServiceAdditionalCost;
	   var v_shippingSurcharge;
	   var v_isFree;
	

	if ($("#shippingType-input").val() == "Flat" || $("#shippingType-input").val() == "FlatDomesticCalculatedInternational") {
			v_priorityNumber = index +1;
			v_serviceName = $(this).closest('tr').find('input[type="hidden"]').val();
			v_shippingServiceCost =  parseFloat($(this).closest('tr').find('td:eq(2)').find("input").val());
			v_shippingServiceAdditionalCost =  parseFloat($(this).closest('tr').find('td:eq(3)').find("input").val()) ;
			v_shippingSurcharge =  parseFloat($(this).closest('tr').find('td:eq(4)').find("input").val())
			
			if (isNaN(v_shippingServiceCost)) {
				v_shippingServiceCost = 0;
		   }
				   
			if (isNaN(v_shippingServiceAdditionalCost)) {
			   v_shippingServiceAdditionalCost = 0;
			}
			if (v_shippingServiceAdditionalCost > v_shippingServiceCost ) {
				isLocalAdditionalCostGreater = true;
				return false;
			}
			if (isNaN(v_shippingSurcharge)) {
				v_shippingSurcharge = 0;
		   }
		if (index == 0) {
			v_isFree = $(this).closest('tr').find('td:eq(5)').find('input[type="checkbox"]').prop("checked");
		} else {
			v_isFree = false;
		}
		shippingServiceOptionList.push({
	    	shippingServicePriority: v_priorityNumber,
	    	shippingService: v_serviceName,
	    	shippingServiceCost : {value:v_shippingServiceCost, currencyID: "USD"} ,
	    	shippingServiceAdditionalCost: {value: v_shippingServiceAdditionalCost, currencyID: "USD"},
	    	shippingSurcharge:  {value: v_shippingSurcharge, currencyID: "USD"},
	    	freeShipping: v_isFree,
	    });

	} else if ($("#shippingType-input").val() == "Calculated" || $("#shippingType-input").val() == "CalculatedDomesticFlatInternational" ) {
		v_priorityNumber = index +1;
		v_serviceName = $(this).closest('tr').find('input[type="hidden"]').val();
		if (index == 0) {
			v_isFree = $(this).closest('tr').find('td:eq(2)').find('input[type="checkbox"]').prop("checked");
		} else {
			v_isFree = false;
		}
		
		shippingServiceOptionList.push({
	    	shippingServicePriority: v_priorityNumber,
	    	shippingService: v_serviceName,
	    	freeShipping: v_isFree,
	    });	
	}
	
	});
   
   if(isLocalAdditionalCostGreater) {
	   alert("Additional cost can not be greater then original cost in local service");
	   return;
   }
	
	///////////////////////////////////////// International Shipping Service Data from here /////////////////////////////
	
	//Validate at least on local service should be set
	if($("#local_shipping_table tr").length <= 0) {
		alert("Please, set up at least on local service.");
		return;
	}
	
	var isInternationalAdditionalCostGreater = false;
	var iShippingServiceOptionList = [];
	
	   var i_priorityNumber;
	   var i_serviceName;
	   var i_shippingServiceCost = 0.00;
	   var i_shippingServiceAdditionalCost = 0.00;
	   var i_shipToLocation;

	   $("#international_shipping_table > tbody > tr").each(function(index) {
		   
		    i_priorityNumber = index +1;
			i_serviceName = $(this).closest('tr').find('input[type="hidden"]').val();
			
			 console.log("Shipping type" + $("#shippingType-input").val());
			
			   if ($("#shippingType-input").val() == "Calculated" || $("#shippingType-input").val() == "FlatDomesticCalculatedInternational" ) {

				   
				   i_shipToLocation = $(this).closest('tr').find('td:eq(2)').find("select").val();
				   if (i_shipToLocation == null) {
					   i_shipToLocation = ["Worldwide"];
				   }
				   console.log("International ship to  data: " + i_shipToLocation);
				   
				   iShippingServiceOptionList.push({
				    	shippingServicePriority: i_priorityNumber,
				    	shippingService: i_serviceName,
				    	shipToLocation: i_shipToLocation
				    });
			   } else {
				   i_shipToLocation = $(this).closest('tr').find('td:eq(4)').find("select").val();
				   if (i_shipToLocation == null) {
					   i_shipToLocation = ["Worldwide"];
				   }
				   i_shippingServiceCost = parseFloat($(this).closest('tr').find('td:eq(2)').find("input").val());
				   if (isNaN(i_shippingServiceCost)) {
					   i_shippingServiceCost = 0;
				   }
				   
				   i_shippingServiceAdditionalCost = parseFloat($(this).closest('tr').find('td:eq(3)').find("input").val());
				   if (isNaN(i_shippingServiceAdditionalCost)) {
					   i_shippingServiceAdditionalCost = 0;
				   }
				   
				   if(i_shippingServiceAdditionalCost > i_shippingServiceCost) {
					   isInternationalAdditionalCostGreater =true;
					   return false;
				   }

				   iShippingServiceOptionList.push({
				    	shippingServicePriority: i_priorityNumber,
				    	shippingService: i_serviceName,
				    	shippingServiceCost : {value: i_shippingServiceCost, currencyID: "USD"} ,
				    	shippingServiceAdditionalCost: {value: i_shippingServiceAdditionalCost, currencyID: "USD"},
				    	shipToLocation: i_shipToLocation
				    });
			   }
			
	   });
	   
	   if(isInternationalAdditionalCostGreater) {
		   alert("Additional cost can not be greater then original cost in International service");
		   return;
	   }
	
/////////////////////////  Get Package dimension & weight ////////////////////////////////////////
	
	var v_packageType = $("#pkgType option:selected").val();
	var v_pkgLength = $("#pkgLength").val();
	v_pkgLength = (isNaN(v_pkgLength) || v_pkgLength == "") ? 0 : v_pkgLength;
	var v_pkgWidth = $("#pkgWidth").val();
	v_pkgWidth = (isNaN(v_pkgWidth) || v_pkgWidth == "") ? 0 : v_pkgWidth;
	var v_pkgDepth = $("#pkgDepth").val();
	v_pkgDepth = (isNaN(v_pkgDepth) || v_pkgDepth =="") ? 0 : v_pkgDepth;

	
	var v_estimatedWeight = parseFloat($("#estimatedWeight-select option:selected").val());
	var v_weightLBS = $("#weightLBS").val();
	v_weightLBS = (isNaN(v_weightLBS) || v_weightLBS =="") ? 0 : v_weightLBS;
	var v_weightOZ = $("#weightOZ").val();
	v_weightOZ = (isNaN(v_weightOZ) || v_weightOZ == "") ? 0 : v_weightOZ;
	
	var v_shippingIrregular =$("#irregularPackage").is(':checked');
	var v_packagingHandlingCosts =  $("#packagingHandlingCosts").val();
	v_packagingHandlingCosts = (isNaN(v_packagingHandlingCosts) || v_packagingHandlingCosts =="") ? 0 : v_packagingHandlingCosts;
	
	var v_internationalPackagingHandlingCosts = $("#internationalPackagingHandlingCosts").val();
	v_internationalPackagingHandlingCosts = (isNaN(v_internationalPackagingHandlingCosts) || v_internationalPackagingHandlingCosts =="") ? 0 : v_internationalPackagingHandlingCosts;
	
	var calculatedShippingRate =
		{	packageDepth: {value: parseFloat(v_pkgDepth), unit: "in", measurementSystem: "ENGLISH"}, // measurementSystem could be ENGLISH/METRIC
		    packageLength: {value: parseFloat(v_pkgLength), unit: "in", measurementSystem: "ENGLISH"},
		    packageWidth: {value: parseFloat(v_pkgWidth), unit: "in", measurementSystem: "ENGLISH"},
		    shippingIrregular: v_shippingIrregular,
		    shippingPackage: v_packageType,
		    weightMajor: {value: parseFloat(v_weightLBS), unit: "lbs", measurementSystem: "ENGLISH"},
		    weightMinor: {value: parseFloat(v_weightOZ), unit: "oz", measurementSystem: "ENGLISH"},
		    packagingHandlingCosts: {value: v_packagingHandlingCosts, currencyID: "USD"}
		};
	
	if (v_internationalPackagingHandlingCosts > 0){
		calculatedShippingRate.internationalPackagingHandlingCosts = {value: v_internationalPackagingHandlingCosts, currencyID: "USD"};
	}
	
	

/////////////////////  CREATE REQUIRED TO CONTACT ////////////////////

	var shipToLocations = $("#international_buyer_contact_countries_select").val();
	

///////////////// Exclude locations /////////////////////
	var excludeShipToLocation;

	var v_africa;	
	if ($("#exclude_africa").parent().find("div ul li.multiselect-item.multiselect-all.active").length > 0) {
		v_africa = [$("#exclude_africa").parent().find("div ul li.multiselect-item.multiselect-all.active").find("input").val()];
	} else {
		v_africa = $("#exclude_africa").val();
	}
	
	var v_asia;
	if ($("#exclude_asia").parent().find("div ul li.multiselect-item.multiselect-all.active").length > 0) {
		v_asia = [$("#exclude_asia").parent().find("div ul li.multiselect-item.multiselect-all.active").find("input").val()];
	} else {
		v_asia = $("#exclude_asia").val();
	}
	excludeShipToLocation = _.union(v_africa, v_asia);
	
	var v_europe;
	if ($("#exclude_europe").parent().find("div ul li.multiselect-item.multiselect-all.active").length > 0) {
		v_europe = [$("#exclude_europe").parent().find("div ul li.multiselect-item.multiselect-all.active").find("input").val()];
	} else {
		v_europe = $("#exclude_europe").val();
	}
	
	excludeShipToLocation = _.union(excludeShipToLocation, v_europe);
	
	var v_middleEast;
	if ($("#exclude_middleEast").parent().find("div ul li.multiselect-item.multiselect-all.active").length > 0) {
		v_middleEast = [$("#exclude_middleEast").parent().find("div ul li.multiselect-item.multiselect-all.active").find("input").val()];
	} else {
		v_middleEast = $("#exclude_middleEast").val();
	}
	
	excludeShipToLocation = _.union(excludeShipToLocation, v_middleEast);
	
	var v_northAmerica;
	if ($("#exclude_northAmerica").parent().find("div ul li.multiselect-item.multiselect-all.active").length > 0) {
		v_northAmerica = [$("#exclude_northAmerica").parent().find("div ul li.multiselect-item.multiselect-all.active").find("input").val()];
	} else {
		v_northAmerica = $("#exclude_northAmerica").val();
	}
	
	excludeShipToLocation = _.union(excludeShipToLocation, v_northAmerica);
	
	var v_southeastAsia;
	if ($("#exclude_southeastAsia").parent().find("div ul li.multiselect-item.multiselect-all.active").length > 0) {
		v_southeastAsia = [$("#exclude_southeastAsia").parent().find("div ul li.multiselect-item.multiselect-all.active").find("input").val()];
	} else {
		v_southeastAsia = $("#exclude_southeastAsia").val();
	}
	
	excludeShipToLocation = _.union(excludeShipToLocation, v_southeastAsia);
	
	var v_centralAmericaAndCaribbean;
	if ($("#exclude_centralAmericaAndCaribbean").parent().find("div ul li.multiselect-item.multiselect-all.active").length > 0) {
		v_centralAmericaAndCaribbean = [$("#exclude_centralAmericaAndCaribbean").parent().find("div ul li.multiselect-item.multiselect-all.active").find("input").val()];
	} else {
		v_centralAmericaAndCaribbean = $("#exclude_centralAmericaAndCaribbean").val();
	}
	
	excludeShipToLocation = _.union(excludeShipToLocation, v_centralAmericaAndCaribbean);
	
	var v_oceania;
	if ($("#exclude_oceania").parent().find("div ul li.multiselect-item.multiselect-all.active").length > 0) {
		v_oceania = [$("#exclude_oceania").parent().find("div ul li.multiselect-item.multiselect-all.active").find("input").val()];
	} else {
		v_oceania = $("#exclude_oceania").val();
	}
	
	excludeShipToLocation = _.union(excludeShipToLocation, v_oceania);
	
	var v_southAmerica;
	if ($("#exclude_southAmerica").parent().find("div ul li.multiselect-item.multiselect-all.active").length > 0) {
		v_southAmerica = [$("#exclude_southAmerica").parent().find("div ul li.multiselect-item.multiselect-all.active").find("input").val()];
	} else {
		v_southAmerica = $("#exclude_southAmerica").val();
	}
	
	excludeShipToLocation = _.union(excludeShipToLocation, v_southAmerica);
	var v_domesticAndAdditional = $("#exclude_domesticAndAdditional").val();
	if(v_domesticAndAdditional != null && v_domesticAndAdditional != undefined) {
		excludeShipToLocation = _.union(excludeShipToLocation, v_domesticAndAdditional);
	}

////////////////////// To Do get tax
	var v_salesTaxState = $("#sales_tax_state option:selected" ).val();
	var v_salesTaxPercent = parseFloat($("#sale_tax_percent").val());
	if (isNaN(v_salesTaxPercent)) {
		v_salesTaxPercent = 0;
   }
	var v_shippingIncludedInTax = $("#shippingIncludedInTax").is(':checked');
	var salesTaxType = {
			salesTaxState: v_salesTaxState,
			salesTaxPercent: v_salesTaxPercent,
			shippingIncludedInTax: v_shippingIncludedInTax
			
	};
	
//////////////////////To Do get shippingPackageDetails
	
//////////////////////To Do get paymentInstructions

//////////////////////To Do return Policy
	
	
	var shippingDetailsVO = {
			shippingServiceOptionList: shippingServiceOptionList,
			internationalShippingServiceOptionList: iShippingServiceOptionList,
			calculatedShippingRate: calculatedShippingRate,
			shippingPackageDetails: null,
			paymentInstructions: null,
			returnPolicyType: v_returnPolicyType
	}
	
	if (excludeShipToLocation && excludeShipToLocation.length > 0) {
		shippingDetailsVO.excludeShipToLocation = excludeShipToLocation;
	}

	
	if($("#sales_tax_state option:selected" ).val() != "NONE") {
		shippingDetailsVO.salesTax = salesTaxType;
		
	}
	
	if(shipToLocations && shipToLocations.length > 0) {
		shippingDetailsVO.shipToLocations = shipToLocations;
	}
	var v_returnPolicyType ={};
	
	if ($("#returnsAccepted").is(':checked') === true) {
		v_returnPolicyType.extendedHolidayReturns = $("#extendedHolidayReturns").is(':checked');
		v_returnPolicyType.refundOption = $("#refundGivenAs option:selected" ).val();
		v_returnPolicyType.restockingFeeValueOption = $("#restockingFeeValue option:selected" ).val();
		v_returnPolicyType.returnsWithinOption = $("#itemReturnedWithin option:selected" ).val();
		v_returnPolicyType.returnsAcceptedOption = "ReturnsAccepted";
		v_returnPolicyType.shippingCostPaidByOption = $("#returnsPaidBy option:selected" ).val();
		v_returnPolicyType.description = $("#returnPolicyDescription").val();
	} else {
		v_returnPolicyType.returnsAcceptedOption = "ReturnsNotAccepted";
	}
	shippingDetailsVO.returnPolicyType = v_returnPolicyType;
	
//// Item Location
	shippingDetailsVO.country = $("#item_location_country option:selected" ).val();
	shippingDetailsVO.postalCode = $("#item_location_zip_code").val();
	shippingDetailsVO.location = $("#item_location_city_and_state").val();
	shippingDetailsVO.warehouseId =  $("#warehouseId").val();
//// Dispatch Max Day
	shippingDetailsVO.dispatchMaxDay = $("#dispatch_max_time option:selected" ).val();
	
	
	
	var save_all_URL = "../../../admin/ajax/add/all/shippingservice/" + $("#shippingServiceId").val()
	+ "/" + $("#userId").val() 
		+ "/" + $("#warehouseId").val() 
		+ "/" + $("#shippingServiceCustomName-input").val()
		+ "/" + $("#shippingServiceCustomType-input").val()
		+ "/" + $("#shippingType-input").val();
	
	saveShippingServicesAjax(shippingDetailsVO, save_all_URL, "All");
	
	console.log("JASON shippingDetailsVO ======>>>> " + JSON.stringify(shippingDetailsVO));
	   $('#shipping-service-modal').modal('toggle');

 	  $("#shipping-service-list-table").DataTable().ajax.reload();
});



function saveShippingServicesAjax(v_data, v_URL, v_shippingType) {

	$.ajax({
		  headers: appCommons.headerContent(),
		  beforeSend: function(xhr) {appCommons.setAjaxRequestHeader(xhr);},
	      type: "POST",
	      async: false,
	      dataType : 'json',
	      url: v_URL,
	      data: JSON.stringify(v_data),
	      success : function(data) {
	    	  console.log(v_shippingType +" shipping service was saved");
	    	 // $("#shipping-service-list-table").DataTable().ajax.reload();
	       
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


function getShipToLocations() {
	   $.ajax({
			  headers: appCommons.headerContent(),
			  beforeSend: function(xhr) {appCommons.setAjaxRequestHeader(xhr);},
		      type: "POST",
		      async: false,
		      url: "../../../admin/ajax/shipping_service_details/ship_to_locations",
		      success : function(data) {
		    	  if (data) {
		    	  	var selectShipToHTML="";
			    	data.forEach(function(item) {
			    		if (item.shippingLocation == "Worldwide" || item.shippingLocation == "None") {
			    			console.log("skip to populate international_ship_to_countries_select with: " + item.shippingLocation);
			    			
			    		} else {
			    			selectShipToHTML +="<option value='" +item.shippingLocation+ "'>" + item.description + "</option>";
			    		}
			    	});

			    	$("#international_ship_to_countries_select").empty();
			    	$("#international_buyer_contact_countries_select").empty();
			    	$(selectShipToHTML).appendTo("#international_ship_to_countries_select");
			    	$(selectShipToHTML).appendTo("#international_buyer_contact_countries_select");
			    	
		    	  }
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
	   // re-initialize multi select checkbox drop down
	   $('#international_ship_to_co untries_select').multiselect({nonSelectedText: 'Countries'});
	   $('#international_buyer_contact_countries_select').multiselect({nonSelectedText: 'Buyers must contact'});
	   $('#international_ship_to_countries_select').multiselect('rebuild');
	   $('#international_buyer_contact_countries_select').multiselect('rebuild');
}



$("#shipping-service-modal").on("hidden.bs.modal", function () {
    //$(this).find('input.form-control').val('');
    $("#international_shipping_table > tbody").empty();
    $("#local_shipping_table > tbody").empty();
    $("#addLocalShippingServiceOption").attr("disabled", true);
    $("#addInternationalShippingServiceOption").attr("disabled", true);
	$("[data-node-name=exclude_group]").multiselect('deselectAll', false);
	$("[data-node-name=exclude_group]").multiselect('refresh');
	$("[data-node-input=clear_on_modal_close]").val('');
	$("[data-node-checkbox='uncheck_on_modal_close']").prop('checked',false);
	$("#shippingIncludedInTax").prop('checked',false);
	$("#sales_tax_state").val("NONE");
});