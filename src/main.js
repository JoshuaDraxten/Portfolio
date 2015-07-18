var list_of_things_I_like = ['Coffee', 'HTML', 'Python', 'Javascript']
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
setInterval(text_animation, 400);

//Make Panels

projects = [['I\'m Joshua Draxten','I like <span id="text_animation"></span>'],
            ['Instagram.','An app to share photos with followers'],
            ['Jarvis.','Your personal computer assistant'],
            ['Facebook Messanger.','Message your friends']]

colors =       ['#3498db','#f1c40f','#2ecc71','#e74c3c']

function panel_generator(n,left_or_right,title,description){
  /*Add link eventually*/
  return("<div class='panel' style= 'top: "+(n)*40+"%;background-color:"+colors[n%8]+"' >" +
    "<img class='picture_align_"+left_or_right+"' src='project_pic_"+n+".png'></img>" +
    "<h1 class='title_text_"+left_or_right+"'>"+title+"</h1>" +
      "<h2 class='subtitle_text_"+left_or_right+"' > "+description+" </h2>" +
  "</div>");
}

function generate_projects(project,n){
  if(n%2==0){
    left_or_right = "left";
  } else {
    left_or_right = "right";
  }
  title = project[0];
  description = project[1];
  document.body.innerHTML += panel_generator(n, left_or_right, title, description);
}
for (var i = 0; i < projects.length; i++) {
  generate_projects(projects[i],i);
}
