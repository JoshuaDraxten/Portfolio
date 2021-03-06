//localStorage.setItem('highscore', 0);\


r = Math.sqrt(
    Math.pow($(window).height()/2,2) +
    Math.pow($(window).width()/2,2)
    );

var ballSize=6;
var score = 0;
var v = r/(ballSize*100);
var lose = true;
var interval = 1; //miliseconds
var bgColor = ["#1abc9c","#3498db","#9b59b6","#f39c12","#95a5a6","#2ecc71"];

if (localStorage.getItem("highscore")==null){
  localStorage.setItem('highscore', 0);
}
$("#highscore").text(localStorage.getItem('highscore'));


$("#player").css({"width": r/ballSize});
$("#block" ).css({"width": r/ballSize});

$("#player").css({"height":$("#player").css("width")});
$("#block" ).css({"height":$("#block" ).css("width")});

function Player(){
  this.x = 0;
  this.y = 0;
}

//Create Player and Block/Place them in their innitial place
var player = new Player();
player.x = $(window).width() /2 - r/(ballSize*2);
player.y = 3*$(window).height() /4 - r/(ballSize*2);

var block  = new Player();
block.x = $(window).width() /2 - r/(ballSize*2);
block.y = $(window).height() /4 - r/(ballSize*2);

//h = height, w = width, r = radius, d = distance between player and block
function moveBlock(){
  player = window.player;
  block  = window.block;
  h = $(window).height()  - $("#block").height();
  w = $(window).width() - $("#block").width( );

  r = Math.sqrt(
    Math.pow(h/2,2) +
    Math.pow(w/2,2)
    );

  d = Math.sqrt(
    Math.pow(player.x-block.x , 2) +
    Math.pow(player.y-block.y , 2)
  );
  v += 2*(Math.pow(d,1.1)/(1000*v));  //The closer you are, the less the velocity increases

  //reposition block closer if tapped far away.
  farEnough = false;
  trys = 0;
  while (!farEnough){
    trys+=1;
    H=h*Math.random();
    W=w*Math.random();
    X = W+Math.pow((2*player.x-W)/(Math.ceil(r/d)),-1);
    Y = H+Math.pow((2*player.y-H)/(Math.ceil(r/d)),-1);
    D = Math.sqrt(
      Math.pow(player.x-X, 2) +
      Math.pow(player.y-Y , 2)
    );
    if (D>2*$("#block").height()){
      farEnough=true;
      block.x=X;
      block.y=Y;
    }
  }
  console.log(trys)
}

$(document).on("click", function () { 
  if (!lose){
    moveBlock();
    lose = false;
 } else if (score >= .01 + $("#score").text()*1){ //wait half a second before starting the game again
  score = 0;
  lose = false;
  player.x = ($(window).width() - $("#block").height())/2;
  player.y = 3*($(window).height()  - $("#block").height())/4;
  block.x =  ($(window).width() - $("#block").height())/2;
  block.y = ($(window).height()  - $("#block").height())/4;
  v=r/(ballSize*100);
  $("#highscore").animate({"opacity":0},1000);
  $( "#liveDie" ).css({
          opacity:0,
          left:"50%",
          top:"50%",
          width:"0px",
          height:"0px"
          }, 1500);
  $("#score").text(0);
   $( "#liveDie" ).animate({
          top:"50%",
          left:"50%",
          "margin-left": 0,
          width:0,
          height:0
          }, 1500, function() {
            $("#highscore").css({"opacity":0});
          });
 }
});

// ------------------------- //

function updatePos(){
  d = Math.sqrt(
    Math.pow(player.x-block.x , 2) +
    Math.pow(player.y-block.y , 2)
  );
  if (lose == true && score > .01){
    d = $("#block").width()/2;
  }
  score+=.01*interval;

  if (d > .9*$("#block").width()){  //hit detection
    player.x+=v*(block.x - player.x)/(d);
    player.y+=v*(block.y - player.y)/(d);
    $("#player").css("left",player.x+"px");
    $("#player").css("top", player.y+"px");
    $("#block" ).css("left", block.x+"px");
    $("#block" ).css("top",  block.y+"px");
    $("#score").text(Math.ceil(score));
    if ($("#score").text() == 6){  //fixes animation glitch between score = 5 and score = 10
      $( "body" ).css({"background-color": bgColor[($("#score").text())/5 % 6 - 1]});
    }
    if ($("#score").text() % 5 == 0){
      $("#tapDiv").stop().animate({backgroundColor:bgColor[Math.floor($("#score").text()/5) % 6 - 1]}, 100);
      }
  } else {    //this is where you lose
    lose = true;

    //update highscore if score is bigger than old highscore
    newScore=false;
    if ($("#score").text()*1 > localStorage.getItem('highscore')*1){
      localStorage.setItem('highscore', $("#score").text());
      $("#highscore").text(localStorage.getItem('highscore'));
    }

    //pull up losing screen
    if (newScore){
      $("#liveDie").css({"opacity":1, "background-color":"#f1c40f"});
    } else {
      $("#liveDie").css({"opacity":1, "background-color":"#f3f3f3"});
    }
    $( "#liveDie" ).animate({
          left:"0",
          top:"20%",
          width:"100%",
          height:"100vw"
          }, 1500, function() {
            $("#highscore").animate({"opacity":1},1000);
          });
  }
  //technically when you start you're in a losing state
}
setInterval(function(){updatePos()}, 10*interval);
