//Google Analytics

(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','//www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-65623471-1', 'auto');
ga('send', 'pageview');

//display phone
function frameLoad(){
	ratio =  $("#wrapper").height()/1060;
	$("#frame").css({
		opacity:1,
		"zoom":ratio,
		"-moz-transform": "scale("+ratio+")",
		"-moz-transform-origin": "0 0",
		"-o-transform": "scale("+ratio+")",
		"-o-transform-origin": "0 0","-webkit-transform":"scale("+ratio+")",
		"-webkit-transform-origin": "0 0"});
	}
$(window).resize(frameLoad());

$(document).ready(function(){

	//Check to see if the window is top if not then display button
	$(window).scroll(function(){
		if ($(this).scrollTop() > $(".panel").height()) {
			$('.scrollToTop').fadeIn();
      $('#chevron').css({top:-110});
		} else {
			$('#chevron').css({top:$(".panel").height() - 110 - $(this).scrollTop()});
		}
	});

	//Click event to scroll to top
	$('.scrollToTop').click(function(){
    $("#" + panel_that_is_open).animate({
      top : 40*panel_that_is_open.replace("panel","")+"%"
    }, 500, function(){
      for (var i = 0; i < projects.length; i++) {
          $( "#panel"+i ).animate({
            opacity: 1,
            left: "-10px",
            top:i*40+"%"
          }, 250);
      }
    });

    $(".panel").addClass('animatePanel');
		$('html, body').animate({scrollTop : 0},800, function(){$("#sectionText").animate({opacity: 0},500)});
		scroll_far=false;
		return false;
	});

});
var scroll_far = false;
var wait = 0;
var add=true;
nth_thing_I_like=0;
function text_animation(){
  text = document.getElementById("text_animation").innerHTML;
  thing_I_like = list_of_things_I_like[ nth_thing_I_like % list_of_things_I_like.length];
  if (wait == 0){
      if (text.indexOf("|") != -1) {
          if (add){
            document.getElementById("text_animation").innerHTML = thing_I_like.substring(0, text.length ).replace("|","");
          } else {
            document.getElementById("text_animation").innerHTML = text.replace("|","")/*.slice(0, - 1)*/;
          }
      } else {
          if(add){
            document.getElementById("text_animation").innerHTML = thing_I_like.substring(0, text.length ) + "|";
          } else {
            document.getElementById("text_animation").innerHTML = text.slice(0, - 1) + '|';
        }
      }
  } else {
    wait-=1;
    if (text.indexOf("|") != -1) {
        document.getElementById("text_animation").innerHTML = text.replace("|","");
      } else {
        document.getElementById("text_animation").innerHTML += "|";
      }
  }
  if (text==thing_I_like && add==true){
    wait = 5;
    add = false;
  } if (text.length == 0){
    nth_thing_I_like +=1;
    add = true;
  }
}
setInterval(text_animation, 333);

//Make Panels

colors =       ['#3498db','#f1c40f','#2ecc71','#e74c3c']

function panel_generator(n,left_or_right,title,description){
  /*Add link eventually*/
  return("<div class='panel animatePanel' id='panel"+n+"' onclick='openSection(this)' style='top:"+n*40+"%;background-color:"+colors[n%8]+"' >" +
    "<h1 class='panel_title title_text_"+left_or_right+"'>"+title+"</h1>" +
    "<h2 class='panel_subtitle subtitle_text_"+left_or_right+"' > "+description+" </h2>" +
  "</div>");
}

function generate_projects(project,n){
  if(n%2==0) {left_or_right = "left"; }
  else       {left_or_right = "right";}
  title = project[0];
  description = project[1];
  document.body.innerHTML += panel_generator(n, left_or_right, title, description);
}
for (var i = 0; i < projects.length; i++) {
  generate_projects(projects[i],i);
}

//Function to open a section after a panel is clicked
var panel_that_is_open = "panel0";
function openSection(obj){
	$('html, body').animate({scrollTop : 0},800)
  for (var i = 0; i < projects.length; i++) {
    if ("panel"+i != obj.id){
      $( "#panel"+i ).animate({
        opacity: 0,
        left: "100%"
      }, 1000);
    }
    $( obj ).animate({
      top: 0
    }, 1000);
    document.getElementById("sectionText").innerHTML = document.getElementById( "section" + obj.id.replace("panel","") ).innerHTML;
    $("#sectionText").animate({
      opacity: 1
    }, 100)
  }
  $("#articleTitle").css({ color: colors[obj.id.replace("panel","")] });
  $(".panel").removeClass('animatePanel')
  panel_that_is_open = obj.id
	scroll_far = true;
}
$(window).on("scroll", function(e){
				$(window).height(projects.length*$(".panel").height());
				if($(window).scrollTop()+$(window).height()>projects.length*$(".panel").height() && !scroll_far){
					$(window).scrollTop(-$(window).height()+projects.length*$(".panel").height());
				}
});
// Is this mobile or is this desktop?{
function check_screen_size(){
	if( $(window).width() < 750){ //phone
		ratio = 1;
		$("body").css({
			width:"100%",
			"margin-left":"0px",
			"margin-top":"0px",
			"zoom":ratio,
			"-moz-transform": "scale("+ratio+")",
			"-moz-transform-origin": "0 0",
			"-o-transform": "scale("+ratio+")",
			"-o-transform-origin": "0 0","-webkit-transform":"scale("+ratio+")",
			"-webkit-transform-origin": "0 0"
		});
		$(".title_text_left").css({"margin-left":"25px"});
		$(".title_text_right").css({"right":"35px"});
		$(".panel_subtitle").css({opacity:0});
		$("#sectionText").css({
      width: "90%",
      "margin-left":"5%",
	    "font-size":"100%"
    });
	}
  else if ( $(window).width() < 1000 ){    //Tablet
		$(".panel_subtitle").css({opacity:0});
    $("#sectionText").css({
      width: "80%",
      "margin-left":"10%",
      "font-size":"200%"
    });
		$(".title_text_left").css({"margin-left":"100px"});
		$(".title_text_right").css({"right":"100px"});
  } else {                            //Desktop/laptop
    $(".panel_subtitle").css({opacity:1})
    $("#sectionText").css({
      width: "50%",
      "margin-left":"25%",
	    "font-size":"100%"
    });
		$(".title_text_left").css({"margin-left":"100px"});
		$(".title_text_right").css({"right":"100px"});
  }
}
window.onLoad = setInterval(check_screen_size,100);
