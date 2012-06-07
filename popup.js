window.onload = function() {
	if (!isEmpty(localStorage["appId"]) && !isEmpty(localStorage['accessToken'])) {
		$('#main').css("display", "block");
		$('#nocredentials').css("display", "none");
		chrome.tabs.getSelected(null, function(tab) {

			$("#message").val((localStorage['message'] != undefined ? localStorage['message'] + " " : "") + tab.url);
			$("#mobile_number").val(localStorage['mobileNumber']);
			document.querySelector('input[value="Share"]').onclick=sendMessage;
			
			/* Shorten using Google URL Shortener API */
            var api_url = 'https://www.googleapis.com/urlshortener/v1/url';
            // If you have your own Google API key, uncomment and enter below 
            //var api_key = 'YOUR_GOOGLE_API_KEY';
            var data = '{"longUrl": "'+tab.url+'"}';
            var xhr = new XMLHttpRequest();
            if (typeof api_key != 'undefined')
            	url = api_url+'?key='+api_key;
            else 
            	url = api_url;
            xhr.open('POST', url, true);
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.onreadystatechange = function() {
                if (xhr.readyState == 4) {
                    if (xhr.getAllResponseHeaders() != '') {
                        var response = JSON.parse(xhr.responseText);
                        if (response.error == undefined) {
                	        shortenUrl = response.id;
                	        $("#message").val((localStorage['message'] != undefined ? localStorage['message'] + " " : "") + shortenUrl);
                        } else {
	                        // showError('general_error', response.error.message);
                        }
                    } else {
	                    // showError('network_error', '');
                    }
                }
            }
            xhr.send(data);
			
		});
	} else {
		$('#main').css("display", "none");
		$('#nocredentials').css("display", "block");	
	}
}

function sendMessage() {
	if ($('#mobile_number').val().length == 0) {
		$('#result').html('Please enter a phone number.');
		return;
	}
	
	$.post('https://secure.hoiio.com/open/sms/bulk_send', {app_id : localStorage["appId"], access_token : localStorage["accessToken"],
		dest : $('#mobile_number').val(), msg : $('#message').val()},
	function(data) {
		if (data.status == 'success_ok') {
			$('#result').html('<text color="blue">Successfully sent</text>');
		} else {
			if (data.status == 'error_insufficient_credit') {
				status = 'You have insufficient credit. Please go to <a href="http://developer.hoiio.com" target="_blank">Hoiio</a> and top up your credit.';
			} else {
				status = 'There is an error: ' + data.status;
			}
			$('#result').html(status);
		}
	});
}

function isEmpty(data) {
	return (data == undefined || data == "");
}