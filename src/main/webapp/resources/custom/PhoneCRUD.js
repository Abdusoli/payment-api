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
			    	
			      url: '../../admin/ajax/phone/edit/' + $(this).closest("tr").find("td:nth-child(1)").find('input').val(), //$('#phoneId').val(),
			  //    data: JSON.stringify(phone),
			      success : function(data) {
			    	  $(".modal-body #phoneIdInModal").val(data.id);
			    	  $(".modal-body #phoneType option[value='" +data.phoneType+ "']").prop('selected', true);
			    	  $(".modal-body #countryCode option[value='" +data.countryCode+ "']").prop('selected', true);
			    	  $('.modal-body #areaCode').val(data.areaCode);
			    	  $('.modal-body #phoneNumber').val(data.phoneNumber);
			       
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

$('button#savePhone').click( function() {
	var phone = null;
	if ($("#phoneIdInModal").val() == "") {
		phone = {
				 "phoneType" : $('#phoneType').val(),
				 "countryCode" : $('#countryCode option:selected').text(),
				 "areaCode" : $('#areaCode').val(),
				 "phoneNumber" : $('#phoneNumber').val()
				 };
		
	} else {
	   
 	   phone = {
 				 "id" : $("#phoneIdInModal").val(),
				 "phoneType" : $('#phoneType').val(),
				 "countryCode" : $('#countryCode option:selected').text(),
				 "areaCode" : $('#areaCode').val(),
				 "phoneNumber" : $('#phoneNumber').val()
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
			    	
			      url: '../../admin/ajax/update/phone/' + $("#userId-input").val(),
			      data: JSON.stringify(phone),
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
			    	
			      url: '../../admin/ajax/delete/phone/' + $(this).closest("tr").find("td:nth-child(1)").find('input').val(), //$('#phoneId').val(),
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