//Load sounds
var sound = new Howl({
  src: ['madeon_samples/drum.1.1.mp3'],
  autoplay: false,
});
var sound2 = new Howl({
  src: ['madeon_samples/sounds.1.5.mp3'],
  autoplay: false,
});
var sound3 = new Howl({
  src: ['madeon_samples/bass.1.8.mp3'],
  autoplay: false,
});
var sound4 = new Howl({
  src: ['madeon_samples/drum.1.5.mp3'],
  autoplay: false,
});
var sound5 = new Howl({
  src: ['madeon_samples/sounds.1.7.mp3'],
  autoplay: false,
});
var sound6 = new Howl({
  src: ['madeon_samples/bass.1.5.mp3'],
  autoplay: false,
});
var sound7 = new Howl({
   src: ['madeon_samples/drum.1.4.mp3'],
  autoplay: false,
});
var sound8 = new Howl({
  src: ['madeon_samples/sounds.1.2.mp3'],
  autoplay: false,
});

var active1, active2, active3, active4, active5, active6, active7, active8, active9, active10, active11;

var frequency = 4370;
var myInterval = 0;
var progressInterval = 0;
var firstTrigger = true;


$("puzzle-element").on("mousedown", function (event) {
	var idSelected = this.id;

	if(idSelected=="1"){
		active1=!active1;		 
	}
	if(idSelected=="2"){
		active2=!active2;		
	}
	if(idSelected=="3"){
		active3=!active3;		
	}
	if(idSelected=="4"){ 
		active4=!active4;			
	}
	if(idSelected=="5"){
		active5=!active5;
	}
	if(idSelected=="6"){		
		active6=!active6;
	}
	if(idSelected=="7"){
		active7=!active7;
	}
	if(idSelected=="8"){
		active8=!active8;
	}
	if(idSelected=="9"){
		active9=!active9;
	}
	if(idSelected=="10"){
		active10=!active10;
	}
	if(idSelected=="11"){
		active11=!active11;
	}

	//Triggers the first sample and avoids clicking the background to start playing
	if(firstTrigger){
		playSounds();
		progressCount();
		firstTrigger=false;
	}	
});

var progress = document.querySelector('paper-progress');

function playSounds(){
    if(active1){
		sound.stop();
		sound.play();
	}
	if(active2){		
		sound2.stop();
		sound2.play();
	}
	if(active3){		
		sound3.stop();
		sound3.play();
	}
	if(active4){		
		sound4.stop();
		sound4.play();
	}
	if(active5){		
		sound5.stop();
		sound5.play();
	}
	if(active6){		
		sound6.stop();
		sound6.play();
	}
	if(active7){		
		sound7.stop();
		sound7.play();
	}
	if(active8){		
		sound8.stop();
		sound8.play();
	}

	if(myInterval > 0) clearInterval(myInterval);
	myInterval = setInterval("playSounds()", frequency);	
}


function progressCount(){
	progress.value += 1;
			
	if(progress.value==9){
		progress.value = progress.min;
	}
		
	if(progressInterval > 0) clearInterval(progressInterval);
	progressInterval = setInterval("progressCount()", frequency/8);
}

/*Toggles the drawer panel when in a different section than home*/
var drawer_panel = document.getElementById("drawerPanel");

function toggleDrawer (argument){	
	drawer_panel.removeAttribute( "disable-swipe" );
}	

var app = document.querySelector("#app");
app.selected_day = "1";


window.onload=function(){	   
    $('#loadingCard').fadeOut(1000);
	
};

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
	}else{
		footer_height = 136;
		available_width = $(window).width();
		available_height = $(window).height()-footer_height;
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
	}
});



$("paper-item").click(function() {
  drawer_panel.togglePanel();
});

$("#signup_button_mobile").click(function() {
  drawer_panel.togglePanel();
});

var app3 = document.querySelector("#app3");
app3.pholder1 = "data:image/gif;base64,R0lGODlhWAJYAqIAACUjLDMxOS4sNTAuNyknMCwqMjQyOyMhKiH/C1hNUCBEYXRhWE1QPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS4zLWMwMTEgNjYuMTQ1NjYxLCAyMDEyLzAyLzA2LTE0OjU2OjI3ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpEQTQ0Qzk1MjIwMUYxMUU1ODdEOUE5RDlFRTRERkUwRCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpEQTQ0Qzk1MTIwMUYxMUU1ODdEOUE5RDlFRTRERkUwRCIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M2IChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuZGlkOkY4RTcyQ0JCMUMyMEU1MTE4RTU3QTk3MzE3MzA5QkRBIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkY4RTcyQ0JCMUMyMEU1MTE4RTU3QTk3MzE3MzA5QkRBIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+Af/+/fz7+vn49/b19PPy8fDv7u3s6+rp6Ofm5eTj4uHg397d3Nva2djX1tXU09LR0M/OzczLysnIx8bFxMPCwcC/vr28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";

function openDialog (element){
	var itemTime = element.getAttribute("time");
	var itemTitle = element.getAttribute("title");
	var itemContent = element.getAttribute("content");

	var app = document.querySelector("#app2");
 	
 	app.dialogTitle = itemTitle;
 	app.dialogTime = itemTime;
 	app.dialogContent = itemContent;

 	var dialogFrame = document.getElementById("dialog_schedule");
 	dialogFrame.openDialog();
 	
}

$("#signup_button").click(function() {
	console.log('whatever');
  $("#dialog_signup").openDialog();
});


function signup (){
	var dialogSignup = document.getElementById("dialog_signup");
	dialogSignup.openDialog();
}


 window.addEventListener('WebComponentsReady', function(e) {
    $("#app_wrapper").css("display", "inline");

  });

 function tsts (){
 	console.log('asdfsdfsadf');
 }



//Progress of the conference
var app4 = document.querySelector("#app4");
 setInterval(function() {	
	var currentValue = app4.currentTime/app4.duration;
	$("#conference_progress").attr("value", currentValue*100);
}, 100);

//console.log( '%c  __        ______________________  \n /  |      /                      | \n 0  0      | Parece que intentas  | \n || ||     | ver el código fuente | \n ||_/|  <--| ¿Necesitas ayuda?    | \n |___/     |______________________/ \n                                    ', "color: #272430;  font-size: 14px; font-family: 'Consolas', Helvetica, sans-serif;" );
