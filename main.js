
var game = {
    //stores data on score,total score, click value and total clicks
    score: 0,
    totalScore: 0,
    clickValue: 1,
    totalClicks: 0,
    prestige: 0,
    
    // adds amount to the score and total score, calls update score function
    addToScore: function(amount) {
        this.score += amount;
        this.totalScore += amount;
        display.updateScore();
    }
};

var display = {
    //updates the score and title
    updateScore: function() {
        document.getElementById("score").innerHTML = game.score;
        document.title = game.score + " KO points - Boxing Clicker";
    },

    updateShop: function() {
        document.getElementById("shopContainer").innerHTML = "";
        for (i = 0; i < skill.name.length; i++) {
            document.getElementById("shopContainer").innerHTML += '<table class="shopButton unslectable" onclick="skill.purchase('+i+')"><tr><td id="image"><img src="'+skill.image[i]+'"></td><td id="nameAndCost"><p>'+skill.name[i]+'</p><p><span>'+skill.cost[i]+'</span> KO Points</p></td><td id="amount"><span>'+skill.count[i]+'</span></td></tr></table>'
        }
    },

    menuOpen: false,

    openMenu: function() {
        document.getElementById("menuContainer").innerHTML = "";
        document.getElementById("menuContainer").innerHTML += '<table class="menuButton unselectable" onclick="resetGame()"><tr><td id="resetButton"><p>Reset Game</p></td></tr></table><table class="menuButton unselectable" onclick="saveGame()"><tr><td id="saveButton"><p>Save Game</p></td></tr></table>'
    },

    closeMenu: function() {
        document.getElementById("menuContainer").innerHTML = "";
    }
}

//updates game when clicker is clicked
document.getElementById("clicker").addEventListener("click", function(event) {
    //adds number to score and total clicks
    game.totalClicks++;
    game.addToScore(game.clickValue);
    
    //calls function
    createNumberOnClicker(event);
}, false);

function createNumberOnClicker(event) {
   //grab the clicker
    let clicker = document.getElementById("clicker");

    //grab the position on where the clicker was clicked
    let clickerOffset = clicker.getBoundingClientRect();
    let position = {
        x: event.pageX - clickerOffset.left + randomNumber(-5, 5),
        y: event.pageY - clickerOffset.top
    }

    //create the number
    let element = document.createElement("div");
    element.textContent = "+" + game.clickValue;
    element.classList.add("number", "unselectable");
    element.style.left = position.x + "px";
    element.style.top = position.y + "px";

    //add the number to the clicker
    clicker.appendChild(element);

    //slowly rise the element to top of screen
    let movementInterval = window.setInterval(function() {
        if (typeof element == "undefined" && element == null) clearInterval(movementInterval);
        
        position.y--;
        element.style.top = position.y + "px";
    }, 10);

    //slowly fade out
    fadeOut(element, 2000, 0.5, function() {
        element.remove();
    });
}   

function fadeOut(element, duration, finalOpacity, callback) {
    //opacity starts at 1 and fades until opacity is less than final opacity
    let opacity = 1;
    let elementFadingInterval = window.setInterval(function(){
        opacity -= 50 / duration;

        if (opacity <= finalOpacity){
            clearInterval(elementFadingInterval);
            callback();
        }
    }, 50);
}

//function for random number generator
function randomNumber(min,max) {
    return Math.round(Math.random() * (max-min) + min);
}


var skill = {
    name: [
        "Jab",
        "Cross",
        "Lead Hook",
        "Rear Hook"
    ],
    image: [
        "images/jab.jpg",
        "images/cross.jpg",
        "images/hook.jpg",
        "images/hook.jpg"
    ],
    count: [
        0,
        0,
        0,
        0
    ],
    income: [
        1,
        10,
        100,
        1000
    ],
    cost: [
        20,
        100,
        500,
        2500
    ],

    purchase: function(index) {
        if (game.score >= skill.cost[index]) {
            //take away cost from score, add 1 to count, increase cost by 1.15
            game.score -= this.cost[index];
            this.count[index]++;
            this.cost[index] = Math.ceil(this.cost[index] * 1.15);
            
            //add income to clickValue when on prestige 0
            if (game.prestige == 0) {
                game.clickValue += this.income[index];
            }
            // updates the score and shop
            display.updateScore();
            display.updateShop();
        }
    }
};

//update game when menu is clicked
document.getElementById("menu").addEventListener("click", function() {
    //check if menu is open
    if (display.menuOpen == true) {
        //close the menu
        display.closeMenu();

        //change menu open to false
        display.menuOpen = false;
    } else if (display.menuOpen == false) {
        //open the menu
        display.openMenu();

        //change menu open to true
        display.menuOpen = true;
    }
}, false);

//saves the game
function saveGame() {
    //create array of variables
    var gameSave = {
        score: game.score,
        totalScore: game.totalScore,
        totalClicks: game.totalClicks,
        clickValue: game.clickValue,
        prestige: game.prestige,
        skillCount: skill.count,
        skillCost: skill.cost,
        skillIncome: skill.income
    };
    //store variables into string in local storage
    localStorage.setItem("gameSave", JSON.stringify(gameSave));
}

//load the game
function loadGame() {
    //turns the string of game save back to variables
    var savedGame = JSON.parse(localStorage.getItem("gameSave"));
    if (localStorage.getItem("gameSave") !== null) {
        if (typeof savedGame.score !== "undefined") game.score = savedGame.score;
        if (typeof savedGame.totalScore !== "undefined") game.totalScore = savedGame.totalScore;
        if (typeof savedGame.totalClicks !== "undefined") game.totalClicks = savedGame.totalClicks;
        if (typeof savedGame.clickValue !== "undefined") game.clickValue = savedGame.clickValue;
        if (typeof savedGame.skillCount !== "undefined") {
            for(i = 0; i < savedGame.skillCount.length; i++) {
                skill.count[i] = savedGame.skillCount[i];
            }
        }
        if (typeof savedGame.skillCost !== "undefined") {
            for(i = 0; i < savedGame.skillCost.length; i++) {
                skill.cost[i] = savedGame.skillCost[i];
            }
        }
        if (typeof savedGame.skillIncome  !== "undefined") {
            for(i = 0; i < savedGame.skillIncome.length; i++) {
                skill.income[i] = savedGame.skillIncome[i];
            }
        }
    }
}

//loads game when window is reloaded
window.onload = function() {
    loadGame();
    display.updateScore();
    display.updateShop();
    display.menuOpen = false;
};

//Saves the game when ctrl + s is hit
document.addEventListener("keydown", function(event) {
    if (event.ctrlKey && event.which == 83) {
        event.preventDefault();
        saveGame();
    }
}, false);

//Saves the game every 30 seconds
setInterval (function(){
    saveGame();
}, 30000);


//Resets the game
function resetGame() {
    if (confirm("Are you sure you want to reset your game")) {
        var gameSave = {};
        localStorage.setItem("gameSave", JSON.stringify(gameSave));
        location.reload();
        loadGame();
    }
}