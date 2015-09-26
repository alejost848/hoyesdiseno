var frequency = 7550;
var firstTrigger = true;
var progressInterval;
var progress = document.querySelector('paper-progress');

var elements;

var secretSequence = "731652910804";
var userSequence = [];

var urlString = "?s=";

window.addEventListener('WebComponentsReady', function(e) {
	elements = document.getElementsByTagName("the-icon");
    $("the-icon").on("tap", function (event) {
		if(firstTrigger){			
			firstTrigger = false;
			progressCount();
			//window.history.pushState("", "", urlString);		
		}
		if(this.active){
			$('#playground_buttons_bottom').fadeIn();
			userSequence.push(this.identifier);
			urlString = urlString + this.identifier;
			//window.history.pushState("", "", urlString);				
		}else{
			var index = userSequence.indexOf(this.identifier);
			if (index > -1) {
			    userSequence.splice(index, 1);
			}
		}
		if(userSequence.join('') === secretSequence){
		    alert("YOU'RE WINNER");
		}

		if(!this.unlocked){
    		document.querySelector('#lockedSound').show(); 
		}

		//console.log(location.search);
		//console.log(window.location.hash);
		//window.history.pushState("", "", '?s=22');
	});
});

var away = false;

document.addEventListener('visibilitychange', function(event) {	
	if (!document.hidden) {
		if(away){
			for (var i=0; i<elements.length; i++) {
				if(elements[i].paused){			
					elements[i].playSample();
					elements[i].paused = false;
				}
			}
			progressInterval = setTimeout(progressCount, frequency/16);
			away = false;
		}
	} else {
		away = true;
		for (var i=0; i<elements.length; i++) {		
			if(elements[i].playing){	
				elements[i].pauseSound();
				elements[i].paused = true;
			}
		}
		setTimeout(function(){ clearTimeout(progressInterval); }, 600);
	}
});



function progressCount(){
	if(progress.value==17){
		progress.value = progress.min;
	}
	var activeButtons = 0;
	if(progress.value==progress.min){	
		for (var i=0; i<elements.length; i++) {
			elements[i].playing = false;				
			if(elements[i].active && elements[i].unlocked){
				elements[i].playSample();				
				$('#a'+elements[i].id).fadeIn();
				activeButtons++;
			}
			if(!elements[i].active && elements[i].unlocked){
				elements[i].stopBlinking();
			}
			if(!elements[i].playing){
				$('#a'+elements[i].id).fadeOut();
			}
		}
		if(activeButtons==0){			
			clearTimeout(progressInterval);
			$('#playground_buttons_bottom').fadeOut();
			firstTrigger = true;
		}
	}
	
	if(!firstTrigger){
		progressInterval = setTimeout(progressCount, frequency/16);
		progress.value += 1;
	}
}

function stopSamples (){
	clearTimeout(progressInterval);
	progress.value=progress.min;
	$('#playground_buttons_bottom').fadeOut();
	firstTrigger = true;
	for (var i=0; i<elements.length; i++) {			
		elements[i].active=false;
		elements[i].playing = false;
		elements[i].stopSound();
		$('#a'+elements[i].id).fadeOut();
	}
}

/*Toggles the drawer panel when in a different section than home*/
var drawer_panel = document.getElementById("drawerPanel");

function toggleDrawer (argument){	
	drawer_panel.removeAttribute( "disable-swipe" );
}	

var app0 = document.querySelector("#app0");
var app = document.querySelector("#app");
app.selected_day = "1";
app0.selected_person = "1";

window.onload=function(){	   
    $('#loadingCard').fadeOut(1000);	
};

checkHash();


$(window).on('hashchange', function(e){
   checkHash();
});

function checkHash (){
	var currentHash = window.location.hash;
	
	if($(window).width()<=850){
		if ( currentHash==""||currentHash=="#!/" ) {	
			$('#footer').css( "display", "flex");		
		}else{
			$('#footer').css( "display", "none");
			if (currentHash=="#!/play" || currentHash=="#!/fotos") {			
				$('#menu_button').css( "display", "none");
			}else{
				$('#menu_button').css( "display", "inline");
			}
		}
	}else{
		if (currentHash=="#!/play") {
			$('#footer').css( "display", "none");
			$('#menu_button').css( "display", "none");
		}else{
			$('#footer').css( "display", "flex");
			$('#menu_button').css( "display", "inline");
		}
	}
}



var footer_height = 136;
var available_height = $(window).height()-footer_height;
var available_width = $(window).width();
var event_bg_width = available_width*0.75;

$( "#right_images" ).height(available_height);
$( "#sidebar" ).height(available_height);
$( "#event_bg" ).width(event_bg_width);
$( "#event_bg" ).height(available_height);

if(screen.width<=850){
	toggleDrawer();
	available_width = $(window).width();
	available_height = $(window).height();
	$( "#event_bg" ).width(available_width);
	$( "#event_bg" ).height(available_height);
	$( "#event_info" ).removeClass("flex-3");

	$( "#evento_container" ).removeClass("center");
	$( "#element_rows" ).removeClass("horizontal");
	$( "#element_rows" ).addClass("vertical");

	$( "#envivo_wrapper" ).removeClass("horizontal");
	$( "#envivo_wrapper" ).addClass("vertical");

	$( ".ponente_container" ).removeClass("horizontal");
	$( ".ponente_container" ).addClass("vertical");	
}

if($(window).width()<=850){
	available_width = $(window).width();
	available_height = $(window).height();	
	$( "#event_bg" ).width(available_width);
	$( "#event_bg" ).height(available_height);	
	$( "#event_info" ).removeClass("flex-3");

	$( "#evento_container" ).removeClass("center");
	$( "#element_rows" ).removeClass("horizontal");
	$( "#element_rows" ).addClass("vertical");

	$( "#envivo_wrapper" ).removeClass("horizontal");
	$( "#envivo_wrapper" ).addClass("vertical");

	$( ".ponente_container" ).removeClass("horizontal");
	$( ".ponente_container" ).addClass("vertical");	
}

$(window).resize(function() {
	if($(window).width()<=850){
		available_width = $(window).width();
		available_height = $(window).height();
		$( "#event_bg" ).width(available_width);
		$( "#event_bg" ).height(available_height);
		$( "#event_info" ).removeClass("flex-3");	

		$( "#evento_container" ).removeClass("center");
		$( "#element_rows" ).removeClass("horizontal");
		$( "#element_rows" ).addClass("vertical");

		$( "#envivo_wrapper" ).removeClass("horizontal");
		$( "#envivo_wrapper" ).addClass("vertical");		
		
		$( ".ponente_container" ).removeClass("horizontal");
		$( ".ponente_container" ).addClass("vertical");	
	}else{
		drawer_panel.closeDrawer();
		footer_height = 136;
		available_width = $(window).width();
		if($(window).height()>650){
			available_height = $(window).height()-footer_height;
		}
		event_bg_width = available_width*0.75;

		$( "#sidebar" ).height(available_height);
		$( "#event_bg" ).width(event_bg_width);
		$( "#event_bg" ).height(available_height);

		$( "#event_info" ).addClass("flex-3");
		$( "#right_images" ).height(available_height);

		$( "#evento_container" ).addClass("center");
		$( "#element_rows" ).removeClass("vertical");
		$( "#element_rows" ).addClass("horizontal");

		$( "#envivo_wrapper" ).removeClass("vertical");
		$( "#envivo_wrapper" ).addClass("horizontal");

		$( ".ponente_container" ).removeClass("vertical");
		$( ".ponente_container" ).addClass("horizontal");	
	}
	checkHash();
});

$("paper-item").on("tap",function(){
  drawer_panel.closeDrawer();
});


$("#signup_button_mobile").click(function() {
  drawer_panel.closeDrawer();
});

var app3 = document.querySelector("#app3");
app3.pholder1 = "data:image/gif;base64,R0lGODlhWAJYAqIAACUjLDMxOS4sNTAuNyknMCwqMjQyOyMhKiH/C1hNUCBEYXRhWE1QPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS4zLWMwMTEgNjYuMTQ1NjYxLCAyMDEyLzAyLzA2LTE0OjU2OjI3ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpEQTQ0Qzk1MjIwMUYxMUU1ODdEOUE5RDlFRTRERkUwRCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpEQTQ0Qzk1MTIwMUYxMUU1ODdEOUE5RDlFRTRERkUwRCIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M2IChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuZGlkOkY4RTcyQ0JCMUMyMEU1MTE4RTU3QTk3MzE3MzA5QkRBIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkY4RTcyQ0JCMUMyMEU1MTE4RTU3QTk3MzE3MzA5QkRBIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+Af/+/fz7+vn49/b19PPy8fDv7u3s6+rp6Ofm5eTj4uHg397d3Nva2djX1tXU09LR0M/OzczLysnIx8bFxMPCwcC/vr28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";

//Dialogs
function openDialog (element){
	var itemTime = element.time;
	var itemTitle = element.title;
	var itemContent = element.content;

	var app = document.querySelector("#app2");
 	
 	app.dialogTitle = itemTitle;
 	app.dialogTime = itemTime;
 	app.dialogContent = itemContent; 	

 	var dialogFrame = document.getElementById("dialog_schedule");
 	dialogFrame.openDialog(); 	
}

function signup (){
	var url = "https://www.icesi.edu.co/eventos/inscripcion.php?sched_conf_id=162&utm_source=Inscripci%C3%B3n%20HED&utm_medium=banner&utm_term=hoy%20es%20dise%C3%B1o&utm_content=Sitio%20HED&utm_campaign=Conversi%C3%B3n%20Sitio%20HED";
	window.open(url, '_blank');
}

function playgroundInfo (){
	var dialogPlayground = document.getElementById("dialog_playground");
	dialogPlayground.openDialog();
}

function profilePics (){
	var dialogProfilePics = document.getElementById("dialog_profile_pic");
	dialogProfilePics.openDialog();
}

function viewPictures (){
	var dialogPictures = document.getElementById("dialog_pictures");
	dialogPictures.openDialog();
}

//Progress of the conference
var app4 = document.querySelector("#app4");
 setInterval(function() {	
	var currentValue = app4.currentTime/app4.duration;
	$("#conference_progress").attr("value", currentValue*100);
}, 100);

//Toast for displaying offline cache completed
var app5 = document.querySelector("#app5");
app5.displayInstalledToast = function() {
    document.querySelector('#caching-complete').show();
  };

function goLink (argument){
	window.location.href = argument;
}

function clickHandlerVideo(e) {
  var button = e.target;
  while (!button.hasAttribute('data-dialog') && button !== document.body) {
    button = button.parentElement;
  }
  if (!button.hasAttribute('data-dialog')) {
    return;
  }
  var id = button.getAttribute('data-dialog');
  var dialog = document.getElementById(id);
  if (dialog) {
    dialog.open();
  }

  var autoplay_video = document.querySelector("#home_video");
  autoplay_video.play()
  console.log('tes');
}

document.getElementById('formPost').addEventListener('iron-form-submit', deliverIt);

function deliverIt(event) {
	console.log(JSON.stringify(event.detail));
	
	var email = $("#email").val(); // get email field value
	var name = $("#name").val(); // get name field value
	var msg = $("#msg").val(); // get message field value
	$.ajax(
	{
		type: "POST",
		url: "https://mandrillapp.com/api/1.0/messages/send.json",
		data: {
			'key': 'lyGXnxHjBHdaVdfDRypDFw',
			'message': {
				'from_email': email,
				'from_name': name,
				'headers': {
					'Reply-To': email
				},
				'subject': 'Mensaje de hoyesdiseno.com',
				'text': msg,
				'to': [
				{
					'email': 'hoyesdisenomercadeo@gmail.com',
					'name': 'Hoy es Diseño',
					'type': 'to'
				}]
			}
		}
	})
	.done(function(response) {
		document.querySelector('#msgSent').show(); // show success message
		$("#name").val(''); // reset field after successful submission
		$("#email").val(''); // reset field after successful submission
		$("#msg").val(''); // reset field after successful submission
		grecaptcha.reset(); // reset captcha after successful submission
	})
	.fail(function(response) {
		document.querySelector('#msgNotSent').show(); // show fail message
	});
	return false; // prevent page refresh
}

function clickHandler(event) {
	document.getElementById('email').validate();
	document.getElementById('name').validate();
	document.getElementById('msg').validate();

	if (document.getElementById('email').validate() && document.getElementById('name').validate() && document.getElementById('msg').validate() && validateCaptcha()) {
		document.getElementById('formPost').submit();
	}
}

function validateCaptcha() {
	var resp = grecaptcha.getResponse();

	if(resp.length == 0) {
		document.querySelector('#msgNoCaptcha').show(); // show captcha validation error message
		return false;
	}

	else {
		return true; 
	}
}

Mousetrap.bind('f u t u r o', function(e, combo) {
    elements[0].unlocked=true;
    elements[0]._updateColors();    
    document.querySelector('#newSound').setAttribute("text", "¡Sonido 1 desbloqueado!");
    document.querySelector('#newSound').show();
});

Mousetrap.bind('2', function() {
    elements[1].unlocked=true;
    elements[1]._updateColors();    
    document.querySelector('#newSound').setAttribute("text", "¡Sonido 2 desbloqueado!");
    document.querySelector('#newSound').show(); 
});

Mousetrap.bind('3', function() {
    elements[2].unlocked=true;
    elements[2]._updateColors();    
    document.querySelector('#newSound').setAttribute("text", "¡Sonido 3 desbloqueado!");
    document.querySelector('#newSound').show(); 
});

Mousetrap.bind('7', function() {
    elements[6].unlocked=true;
    elements[6]._updateColors();    
    document.querySelector('#newSound').setAttribute("text", "¡Sonido 7 desbloqueado!");
    document.querySelector('#newSound').show(); 
});

Mousetrap.bind('8', function() {
    elements[7].unlocked=true;
    elements[7]._updateColors();    
    document.querySelector('#newSound').setAttribute("text", "¡Sonido 8 desbloqueado!");
    document.querySelector('#newSound').show(); 
});

Mousetrap.bind('9', function() {
    elements[8].unlocked=true;
    elements[8]._updateColors();    
    document.querySelector('#newSound').setAttribute("text", "¡Sonido 9 desbloqueado!");
    document.querySelector('#newSound').show(); 
});

	

//console.log( '%c  __        ______________________  \n /  |      /                      | \n 0  0      | Parece que intentas  | \n || ||     | ver el código fuente | \n ||_/|  <--| ¿Necesitas ayuda?    | \n |___/     |______________________/ \n                                    ', "color: #272430;  font-size: 14px; font-family: 'Consolas', Helvetica, sans-serif;" );
