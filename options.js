function saveCredentials() {
	localStorage["appId"] = document.getElementById("app_id").value;
	localStorage["accessToken"] = document.getElementById("access_token").value;
	document.getElementById("msg").innerHTML = "Successfully change!";
	setTimeout(function(){document.getElementById("msg").innerHTML = '';}, 1500);
}

function eraseCredentials() {
	localStorage.removeItem("appId");
	localStorage.removeItem("accessToken");
	location.reload();
}

function saveOptions() {
	localStorage["mobileNumber"] = $('#mobile_number').val();
	localStorage["message"] = $('#message').val();
	$("#msgOptions").text("Successfully change!");
	setTimeout(function(){$("#msgOptions").text('');}, 1500);
}

function eraseOptions() {
	localStorage.removeItem("mobileNumber");
	localStorage.removeItem("message");
	$("#msgOptions").text("Successfully clear!");
	setTimeout(function(){$("#msgOptions").text('');}, 1500);
	$("#mobile_number").val('');
	$("#message").val('');
}

window.onload = function () {

	if (localStorage['message'] == undefined)
		localStorage['message'] = "Hi, check this out:";

	$("#app_id").val(localStorage["appId"] == undefined ? "" : localStorage["appId"]);
	$("#access_token").val(localStorage["accessToken"] == undefined ? "" : localStorage["accessToken"]);
	$("#mobile_number").val(localStorage["mobileNumber"] == undefined ? "" : localStorage["mobileNumber"]);
	$("#message").val(localStorage["message"] == undefined ? "" : localStorage["message"]);
	
	document.querySelector('input[value="Save"]').onclick=saveCredentials;
	document.querySelector('input[value="Clear"]').onclick=eraseCredentials;
	
	document.querySelector('input[id="save2"]').onclick=saveOptions;
	document.querySelector('input[id="clear2"]').onclick=eraseOptions;
	
	var content = $(".menuitem");
	
	var swapContents= function(target) {
		// swap the content
		var currentSelected = $(target).parent().siblings("#content").children(".contentitem.selected");
		currentSelected.removeClass("selected");
		
		var selectedContent = $("#" + target.id + "-content");
		selectedContent.addClass("selected");		
		
		// swap the menu
		var currentSelectedMenu = $(target).parent().children(".menuitem.selected");
		currentSelectedMenu.removeClass("selected");
		
		$(target).css("background-color", "");
		$(target).addClass("selected");
	}
	
	content.hover(
		function () {
			if (!$(this).hasClass("selected"))
				$(this).css("background-color", "#E4FFE1");
		}, 
		function () {
			if (!$(this).hasClass("selected"))
				$(this).css("background-color", "#DADEE0");
		});

	content.click(function() {
		swapContents(this);
	});
}