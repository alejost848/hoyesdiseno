function justDoIt (){


var img;
var blueFilter;

var x1;
var y1;

var y2;
var x2;

var w;
var h;

var posX;
var posY;

var canvas;
var imgPuntos;
var imgLineas;
var dashedLines;
var dropIt;

var capture;
var capturing = false;
var snapshot = false;

var aspectRatioScreenshot;

preload();

function preload(){
  imgPuntos = loadImage("bower_components/profile-picture/logo.png");
  imgLineas = loadImage("bower_components/profile-picture/4.png");
  dashedLines = loadImage("bower_components/profile-picture/dashed_lines.png");
  dropIt = loadImage("bower_components/profile-picture/dropIt.png");
  img = createImage(600, 600);
  img.loadPixels();
  for(var x = 0; x < img.width; x++) {
    for(var y = 0; y < img.height; y++) {
      img.set(x, y, [22, 21, 39, 255]); 
    }
  }
  img.updatePixels();
}

function setup() {
  canvas = createCanvas(600, 600);
  canvas.parent("mycanvas");
  canvas.drop(gotFile);
  canvas.dragOver(overHere);
  canvas.dragLeave(overThere);

  var test1 = img.width;
  var test2 = img.height;
  aspectRatio = test1/test2;
  posX = width/2;
  posY = height/2;
  
  imageMode(CENTER);
  noStroke();
  textSize(24);
  textAlign(CENTER);

  image(img, posX, posY, 600, 600);

  image(dashedLines, posX, posY);

  document.getElementById("dl").addEventListener('click', dlCanvas, false);
  document.getElementById("glitch").addEventListener('click', glitch, false);
  document.getElementById("camera").addEventListener('click', camera, false);
  document.getElementById("files").addEventListener('change', handleFileSelect, false);

  blueFilter = createImage(600, 600);
  blueFilter.loadPixels();
  for(var x = 0; x < blueFilter.width; x++) {
    for(var y = 0; y < blueFilter.height; y++) {
      blueFilter.set(x, y, [22, 21, 39, 90]); 
    }
  }
  blueFilter.updatePixels();
}

function draw (){
  if(capturing && !snapshot){
    image(capture, posX, posY, 600*aspectRatioScreenshot, 600);
  }
}

function camera (){
  if(!capturing){
    capture = createCapture(VIDEO);
    aspectRatioScreenshot = capture.width/capture.height;
    capturing = true;
    snapshot = false;    
  }else{  
    capturing = false;    
  }
}

function glitch() {
  background(22,21,39);

  image(img, posX, posY);
  if(capturing){
    image(capture, posX, posY, 600*aspectRatioScreenshot, 600);
    snapshot = true;

    img.loadPixels();
    for(var x = 0; x < img.width; x++) {
      for(var y = 0; y < img.height; y++) {
        img.set(x, y, [22, 21, 39, 100]); 
      }
    }
    img.updatePixels();
  }
   
  for(var i=0; i<10; i++){
    x1 = 0;
    y1 = Math.round(random(0, 600));

    if (aspectRatio<1.25) {
      x2 = round(random(-5, 5));
    }else{
      x2 = round(random(-250, -230));
    }
    
    y2 = round(y1 + random(-5, 5));
    
    w = img.width;
    h = Math.round( random(35, 50));

    copy(img, x1, y1, w, h, x2, y2, w, h);
  }

  image(imgLineas, posX+random(-230, 230), posY);

  for(var x = 0; x < 2; x++) {
    push();
    strokeWeight(1);
    stroke(255);
    noFill();
    rectMode(CENTER);
    translate(width/2, height/2);
    rotate(PI/4.0);
    translate(-width/2, -height/2);
    var tam = random(50,100);
    rect(random(0,width),random(0,height),tam,tam);
    pop();
    rectMode(CORNER);
  }

  image(blueFilter, posX, posY);
 
  createLines();

  image(imgPuntos, posX, posY); 
  
}

function createLines(){
  var tst = random(0,8);
  for(var i=0; i<75; i++){
    fill(22, 21, 39, 120);
    rect(0,i*8+tst,width,4);
  }
}

function gotFile(file) {
  var imageType = /image.*/;

  if (file.type === 'image' || file.type.match(imageType)) {
    var newImg;

  // Create an image DOM element but don't show it
  if(file.data=== undefined)//si file es de p5.file existe file.data
    newImg = createImg(URL.createObjectURL(file)).hide();   
  else
    newImg = createImg(file.data).hide();

    img = loadImage(newImg.elt.src, function(){

    var test1 = img.width;
    var test2 = img.height;
    aspectRatio = test1/test2;
    posX = width/2;
    posY = height/2;      

    if (aspectRatio<1) {
      img.resize(600, round(600/aspectRatio));
    } else {
      img.resize(round(600*aspectRatio), 600);
    }

    image(img, posX, posY);
      
    
    });
    
  } else {
    document.querySelector('#notImage').show(); 
    overThere();
  }
}


function overHere(){
  img.loadPixels();
  for(var x = 0; x < img.width; x++) {
    for(var y = 0; y < img.height; y++) {
      img.set(x, y, [0, 164, 120, 255]); 
    }
  }
  img.updatePixels();
  image(img, posX, posY);
  image(dropIt, posX, posY);
}

function overThere(){
  img.loadPixels();
  for(var x = 0; x < img.width; x++) {
    for(var y = 0; y < img.height; y++) {
      img.set(x, y, [22, 21, 39, 255]);
    }
  }
  img.updatePixels();
  image(img, posX, posY);
  image(dashedLines, posX, posY);
}

function dlCanvas() {
  save("profile_pic.png");
}

function handleFileSelect(evt) {
  capturing = false;
  var files = evt.target.files;
  var output = [];
  for (var i = 0, f; f = files[i]; i++) {
    gotFile(f);
  }
}
}