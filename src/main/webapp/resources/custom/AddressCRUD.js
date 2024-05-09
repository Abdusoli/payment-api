$('button#btn-edit').click( function() {

		var token = $("meta[name='_csrf']").attr("content");
		var header = $("meta[name='_csrf_header']").attr("content");

		
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
			    	
			      url: '../../admin/ajax/address/edit/' + $(this).closest("tr").find("td:nth-child(1)").find('input').val(), //$('#phoneId').val(),
			  //    data: JSON.stringify(phone),
			      success : function(data) {
			    	  $(".modal-body #addressIdInModal").val(data.id);
			    	  $(".modal-body #addressType option[value='" +data.addressType+ "']").prop('selected', true);
			    	  $('.modal-body #addressLine').val(data.addressLine);
			    	  $('.modal-body #addressLine2').val(data.addressLine2);
			    	  $('.modal-body #city').val(data.city);
			    	  $(".modal-body #state option[value='" +data.stateCode+ "']").prop('selected', true);
			    	  $('.modal-body #zipCode').val(data.zipCode);
			    	  $(".modal-body #country option[value='" +data.countryCode+ "']").prop('selected', true)
			       
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

$('button#addressSave').click( function() {
	
	var address = null;
	if ($("#addressIdInModal").val() == "") {
		address = {
				 "addressType" : $('#addressType option:selected').text(),
				 "addressLine" : $('#addressLine').val(),
				 "addressLine2" : $('#addressLine2').val(),
				 "city" : $('#city').val(),
				 "state" : $('#state option:selected').text(),
				 "stateCode" : $('#state option:selected').val(),
				 "zipCode" : $('#zipCode').val(),
				 "country" : $('#country option:selected').text(),
				 "countryCode" : $('#country option:selected').val()
				 };
		
	} else {
	 address = {
			 "id" : $("#addressIdInModal").val(),
			 "addressType" : $('#addressType option:selected').text(),
			 "addressLine" : $('#addressLine').val(),
			 "addressLine2" : $('#addressLine2').val(),
			 "city" : $('#city').val(),
			 "state" : $('#state option:selected').text(),
			 "stateCode" : $('#state option:selected').val(),
			 "zipCode" : $('#zipCode').val(),
			 "country" : $('#country option:selected').text(),
			 "countryCode" : $('#country option:selected').val()
			 };
	}
		var token = $("meta[name='_csrf']").attr("content");
		var header = $("meta[name='_csrf_header']").attr("content");

		
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
			    	
			      url: '../../admin/ajax/update/address/' + $("#userId-input").val(),
			      data: JSON.stringify(address),
			      success : function(data) {

			    		location.reload();
			       
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

$('button#btn-delete').click( function() {
	// Confirm deletion 
	var confirmed = confirm('Are you sure?')
	if (confirmed) {
		var token = $("meta[name='_csrf']").attr("content");
		var header = $("meta[name='_csrf_header']").attr("content");

		
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
			    	
			      url: '../../admin/ajax/delete/address/' + $(this).closest("tr").find("td:nth-child(1)").find('input').val(), //$('#phoneId').val(),
			      success : function(data) {
			    	  if (data == "SUCCESS") {
			    		  location.reload();
			    	  } else {
			    		  alert("Fail to delete !!!");
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
	
	  return confirmed;
	  
});