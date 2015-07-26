//Use with screen 600 x 960

//fix platform, specific bugs
var deviceType = (navigator.userAgent.match(/iPad/i))  == "iPad" ? "iPad" : (navigator.userAgent.match(/iPhone/i))  == "iPhone" ? "iPhone" : (navigator.userAgent.match(/Android/i)) == "Android" ? "Android" : (navigator.userAgent.match(/BlackBerry/i)) == "BlackBerry" ? "BlackBerry" : "null";

if (deviceType == "iPad" || deviceType == "iPhone"){
	fabHeight = -120;
  	$( "paper-fab" ).css( "margin-top", fabHeight+"px" );
  	$( "#notification" ).css( "margin-top", "-180px");
  	$( '#guessPic').css( "width", "80%");
  	$( '#guessPic').css( "height",   $( '#guessPic' ).css( "width" ));
  	//$( '.emojiButton').css( "width",   "10px");
}

if (deviceType=="iPhone"){
	$( '#guessPic').css( "width", "80%");
  	$( '#guessPic').css( "height",   $( '#guessPic' ).css( "width" ));
  	$( '#notification' ).css("opacity", "0");
  	$( 'h2' ).css("font-size", "80%" );
  //$( '.emojiButton').css( "width",   "10px");
}

if (deviceType=="Android"){
	fabHeight = 0;
}
$(function() {$("h1").text("");});

//End bug fixes

//The paparizzi
document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
    console.log(navigator.camera);

	navigator.camera.getPicture( cameraSuccess, cameraError, cameraOptions );
}
//party is a go

var unreadNum = 0;

function displayMessages(){

	//list for hexadecimal counting
	hex = ['0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f'];  //Note for future - I am using 65 face emojis
																			 //That is

	//get data from parse here (this is just fake data... duh)
	friends		=	[ 'Moriarty','Newton','Turing','Cantor','Euler', 'Conway', 'Reimann', 'Leibniz','Grime'];
	messages 	=	[];	//will be of the form [['Name','emoji','emojiList','picture'], ...]
	for (var i = 0; i < 5; i++) {
		messages.push ([friends[i],'images/twemoji/1f6'+hex[(i-i%16)/16]+hex[i%16]+'.svg',i,'picture']);
	}
	names		=	[ friends[2],friends[3],friends[6],'Euler','Reimann'];
	unreadNum=names.length;
	$(function() {$("#notification").text(unreadNum+" Unread Messages");});



	//generate index first
	for (i = names.length - 1; i >= 0; i--) {
		$('#peopleBox').append('<div class="container" id="newMessage" layout vertical center>'+
						'<paper-button z="5" class=newMessage onClick="gotoPage1();" style="margin-top:'+(i*210)+'px;">'+
							'<post-card>'+
								'<img class="newMessagePic" width="70" height="70" src=\'images/twemoji/1f6'+hex[(i-i%16)/16]+hex[i%16]+'.svg\'>'+
							'<h2>'+names[i]+'</h2>'+
						'</paper-button></post-card></div>'
						);
	}
	$('#peopleBox').append('<div style="position:absolute;margin-top:'+(names.length*210-20)+'px;width:100%;margin-left:50%;">'+
	                        '<h2 style="text-align:center; font-weight:100;">'+
	                       '&#8212; Contacts &#8212;</h2></div>');

	for (i = friends.length - 1; i >= 0; i--) {
		$('#peopleBox').append('<div class="container" id="newMessage" layout vertical center>'+
						'<paper-button z="5" class=contact onClick="gotoPage2();" style="margin-top:'+(names.length*210 + friends.length*105 - i*105)+'px;">'+
							'<post-card style="margin-top:-25px;">'+
								'<img class="" width="70" height="70" src=\'images/twemoji/1f6'+hex[(i-i%16)/16]+hex[i%16]+'.svg\'></img>'+
							'<h2 style="text-align:right;">'+friends.sort()[friends.length - i -1]+'</h2>'+
						'</paper-button></post-card></div>'
						);
	}

	//Generate the guess section
	for (i = 6 - 1; i >= 0; i--) {
		$('#emojiBox').append('<paper-button id="emojiButton" class="emojiButton" onclick="pickEmoji('+(6-i)+')">'+
      '<img height=10%; src=\'images/twemoji/1f60'+hex[i+10]+'.svg\'>'+
    '</paper-button>');
	}

	//Generate page2
	for (i = 6 - 1; i >= 0; i--) {
		$('#emojiContainer').append('<paper-button class="pickEmojiButton" onclick="pickEmoji('+(6-i)+')">'+
      '<img width=100% height=25% src=\'images/twemoji/1f60'+hex[i+10]+'.svg\'>'+
    '</paper-button>');
	}
}

//Animation!!! :D
function gotoPage1() {
  $(function() {$("#notification").text("From: Lydia <3");});
  var speed=500;
  //$( ".addFab" ).animate( {"margin-top": (fabHeight)+"px"}, speed);
  $( ".settingsFab").attr("icon", "settings");
  $( "#page1" ).animate(    {left: "0%"}, speed );
  $( "#index" ).animate(    {left: "200%"}, speed );
  $( "#page2" ).animate(    {left: "300%"}, speed );
}
function gotoIndex() {
  $(function() {$("#notification").text(unreadNum+" Unread Messages");});
	var speed=500;
	//$( ".addFab" ).animate( {"margin-top": (fabHeight)+"px"}, speed);
	$( ".settingsFab").attr("icon", "settings");
  	$( "#page1" ).animate(    {left: "-100%"}, speed );
  	$( "#index" ).animate(    {left: "-50%"}, speed );
  	$( "#page2" ).animate(    {left: "200%"}, speed );
}
function gotoPage2() {
  $(function() {$("#notification").text("Pick an emoji to send");});
	var speed=500;
	//$( ".addFab" ).animate( {"margin-top": (fabHeight-100)+"px"}, speed);
	$( ".settingsFab").attr("icon", "arrow-back");
	$( ".settingsFab").attr("onClick", "gotoIndex()");
	$( ".settingsFab" ).src = "add";
	$("html, body").animate({ scrollTop: 0 }, 10);
  	$( "#page1" ).animate( {left: "-250%"}, speed );
	$( "#index" ).animate( {left: "-150%"}, speed );
  	$( "#page2" ).animate( {left: "0%"}, speed );
}

function settings(){
	//open popup with settings on them
	$(function() {$("#notification").text("this is the settings>");});

	gotoIndex();
	$( "paper-dialog" ).toggle();
}

function pickEmoji(){
	gotoIndex();
	navigator.camera.getPicture( cameraSuccess, cameraError, cameraOptions );
}

window.onload =  displayMessages();

//Sloppy fix for sideways scrolling without disabling vertical scrolling

$(function(){
    $(window).scroll(function(e)
    {
        if($(this).scrollLeft()>0)
        {

            $(this).scrollLeft(-2);
        }
        e.preventDefault();
    });


});
