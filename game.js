var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

var blueSound = new Audio("./blue.mp3");
var redSound = new Audio("./red.mp3");
var greenSound = new Audio("./green.mp3");
var yellowSound = new Audio("./yellow.mp3");
var wrongSound = new Audio("./wrong.mp3");

var level = 0

var levelWin = true;



function nextSequention() {
    var randomNumber = Math.floor(Math.random() * 4);
    gamePattern.push(buttonColors[randomNumber]);

}

function levelChange() {
    level = level + 1;
    $("h1").text("Level " + level);
}



$(document).keydown(function(event) {
    if(gamePattern < 1) {
        nextSequention();
        levelChange();

        $("." + gamePattern[0]).fadeOut().fadeIn();
    switch (gamePattern[0]) {
        case "blue":
            blueSound.play();
            break;

        case "red":
            redSound.play();
            break;

        case "green":
            greenSound.play();
            break;

        case "yellow":
            yellowSound.play();
            break;

        default:
            break;

    }
    }
    
    

})

$(".btn").click(function(e) {
    var userChosenColor = e.target.id;
    userClickedPattern.push(userChosenColor);

    playSound(userChosenColor);
    animatePressed(userChosenColor);


    if(userClickedPattern.length === gamePattern.length) {
        checker();
        userClickedPattern = [];

    }
});

function playSound(name) {
    switch (name) {
        case "blue":
            blueSound.play();
            break;

        case "red":
            redSound.play();
            break;

        case "green":
            greenSound.play();
            break;

        case "yellow":
            yellowSound.play();
            break;

        default:
            break;

    }

}

function animatePressed(currentColor) {
    $("." + currentColor).addClass("pressed");
    setTimeout(function() {
        $("." + currentColor).removeClass("pressed");
    }, 100);
}

function checker() {
    for(var i = 0; i<gamePattern.length; i++) {
            if(gamePattern[i] === userClickedPattern[i]){
                levelWin = true;
            }
            else {
                wrongSound.play();
                gamePattern = [];
                userClickedPattern = [];
                $("h1").text("Fail,Game will start soon");
                level = 0;
                levelWin = false;
            }
        }
    nextSequention();
    showPattern(0);
    if (levelWin) {
        levelChange();
    }

}


function showPattern(x) {
    setTimeout(function() {
        $("." + gamePattern[x]).fadeOut().fadeIn();
        switch (gamePattern[x]) {
            case "blue":
                blueSound.play();
                break;

            case "red":
                redSound.play();
                break;

            case "green":
                greenSound.play();
                break;

            case "yellow":
                yellowSound.play();
                break;

            default:
                break;

        }
        x++;
        if(x < gamePattern.length) {
            showPattern(x);
        }
    }, 1000);

}