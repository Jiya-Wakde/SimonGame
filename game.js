var buttonColours = ["red", "blue", "green", "yellow"];

var userClickedPattern = [];
var gamePattern = [];

var started = false;
var level = 0;

$(document).keypress(function(){
     if(!started){
            
    $("h1").text("Level " + level);
    nextSquence();    
    started = true;
    }    
   
});

$("#clickToStart").click(function(){
    if(!started){
           
   $("h1").text("Level " + level);
   nextSquence();    
   started = true;
   }    
  
});

$(".btn").click(function(){
    var userChosenColours = $(this).attr("id");
    userClickedPattern.push(userChosenColours);

   playSound(userClickedPattern);
   animatePress(userChosenColours);

   checkAnswer(userClickedPattern.length-1);
 });


 function checkAnswer(currentLevel){
   if( gamePattern[currentLevel] === userClickedPattern[currentLevel]){
    console.log("sucess");
  
     if( gamePattern.length === userClickedPattern.length){
        setTimeout(function() {
            nextSquence();
        }, 1000);
    }
    } else{
        var wrong = new Audio("./sounds/wrong.mp3");
        wrong.play(); 

        animateWrong();

        $("h1").text("GAME OVER, Press Any Key To Restart");

        startOver();

    console.log("wrong");
   }

}


function nextSquence() {

    userClickedPattern = [];

    level++;
    $("h1").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
  
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  
    playSound(randomChosenColour);
  }


function playSound(name){
    var audio = new Audio("./sounds/" + name + ".mp3");
    audio.play();   
}

function animatePress(currentColour){
    $("#" + currentColour).addClass("pressed");

    setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");        
    }, 100);
}

function animateWrong(){
    $("body").addClass("game-over");

    setTimeout(function() {
    $("body").removeClass("game-over");        
    }, 200);
}

function startOver(){

    level = 0;
    gamePattern = [];
    started = false;
}