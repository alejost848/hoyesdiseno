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
    setTimeout(function(){
        $('#loadingCard').fadeOut(1000);
	},400);
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
	}
});


$("paper-item").click(function() {
  drawer_panel.togglePanel();
});


console.log( '%c  __                                \n /  |       ______________________  \n |  |      /                      | \n 0  0      | Parece que intentas  | \n || ||     | ver el código fuente | \n || ||  <--| ¿Necesitas ayuda?    | \n ||_/|     |______________________/ \n |___/                              \n                                    ', "background: #222; color: #bada55;  font-size: 14px; font-family: 'Consolas', Helvetica, sans-serif;" );
