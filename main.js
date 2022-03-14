
var game = {
    //stores data on variables
    score: 0,
    totalScore: 0,
    clickValue: 1,
    totalClicks: 0,
    prestige: 0,
    
    //increase score by an amount
    addToScore: function(amount) {
        //adds amount to game score
        this.score += amount;

        //adds amount to total game score
        this.totalScore += amount;

        //calls update score function
        display.updateScore();
    }
};

var display = {
       //define menu booleens
       isMenuOpen: false,
       isShopMenuOpen: false,
       isUpgradeMenuOpen: false, 
   
    //updates the score and title
    updateScore: function() {
        //sets id of score to game score
        document.getElementById("score").innerHTML = game.score;

        //sets title to game score
        document.title = game.score + " KO points - Boxing Clicker";
    },
    
    //updates shop
    updateShop: function() {
        //sets div id of shopContainer to empty
        document.getElementById("shopContainer").innerHTML = "";

        //check if shop menu is open
        if (this.isShopMenuOpen == false) {
            //adds table div for every skill to id of shopContainer
            for (i = 0; i < skill.name.length; i++) {
                document.getElementById("shopContainer").innerHTML += '<table class="shopButton unslectable" onclick="skill.purchase('+i+')"><tr><td id="image"><img src="'+skill.image[i]+'"></td><td id="nameAndCost"><p>'+skill.name[i]+'</p><p><span>'+skill.cost[i]+'</span> KO Points</p></td><td id="amount"><span>'+skill.count[i]+'</span></td></tr></table>'
            }

            // change the isShopMenuOpen variable to true
            this.isShopMenuOpen = true;
        } else if (this.isShopMenuOpen == true) {
            //change the isShopMenuOpen variable to false
            this.isShopMenuOpen = false;
        }
        
    },

     //update the menu
     updateUpgrades: function() {
        //set div id of upgrade container to empty
        document.getElementById("upgradeContainer").innerHTML = "";

        //check if upgrade menu is open
        if (this.isUpgradeMenuOpen == false) {
            //adds div for every upgrade to id of upgradeContainer
            for (i = 0; i < upgrade.name.length; i++) {
                //check that upgrade hasn't been purchased
                if (!upgrade.purchased[i])
                document.getElementById("upgradeContainer").innerHTML += '<div class="upgradeButton"><img src="images/'+upgrade.image[i]+'" title="'+upgrade.name[i]+' &#10; '+upgrade.description[i]+' &#10; ('+upgrade.cost[i]+' KO Points)" onclick="upgrade.purchase('+i+')"></div>'
            }

            //change the isUpgradeMenuOpen to true
            this.isUpgradeMenuOpen = true;
        } else if (this.isUpgradeMenuOpen == true) {
            //change the isUpgradeMenuOpen to false
            this.isUpgradeMenuOpen = false;
        }
    },

    //updates the menu
    updateMenu: function() {
        //set div id of menuContainer to empty
        document.getElementById("menuContainer").innerHTML = "";

        // if menu isn't open adds table buttons for save and reset game
        if (this.isMenuOpen == false) {
            document.getElementById("menuContainer").innerHTML += '<table class="menuButton unselectable" onclick="resetGame()"><tr><td id="resetButton"><p>Reset Game</p></td></tr></table><table class="menuButton unselectable" onclick="saveGame()"><tr><td id="saveButton"><p>Save Game</p></td></tr></table>'
            
            //changes the isMenuOpen variable to true
            this.isMenuOpen = true;
         
        // if menu is open it leaves the menuContainer to be empty     
        } else if (this.isMenuOpen == true) {
            // change the isMenuOpen variable to false
            this.isMenuOpen = false;
        }
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
    //define all the variables
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
            //updates twice to open menu again
            display.updateShop();
            display.updateShop();
        }
    }
};

var upgrade = {
    //define all the variables
    name: [
        "Snappy Jabs"
    ],

    description: [
        "Jabs are twice as efficient"
    ],

    image: [
        "jab.jpg"
    ],

    skillIndex: [
        0
    ],

    cost: [
        100
    ],

    requirement: [
        1
    ],
    
    bonus: [
        2
    ],
    purchased: [false],

    purchase: function(index) {
        //if you have enough score and upgrade is not purchased
        if (game.score >= this.cost[index] && !this.purchased[index]) {
            //if prestige is 0 and have enough for requirement
            if (game.prestige == 0 && skill.count[this.skillIndex[index]] >= this.requirement[index]) {
                //change to purchased
                this.purchased[index] = true;

                //take cost from score
                game.score -= this.cost[index];

                //add bonus to clickValue
                game.clickValue += skill.count[index] * game.clickValue

                //add bonus to skill income
                skill.income[this.skillIndex[index]] *= this.bonus[index];

                //update score
                display.updateScore();

                //update upgradeMenu twice to reopen
                display.updateUpgrades();
                display.updateUpgrades();

              // if prestige is more than 0 and have enough for requirement  
            } else if (game.prestige >= 1 && skill.count[this.skillIndex[index]] >= this.requirement[index]) {

            }
        }
    }
};

//update game when menu is clicked
document.getElementById("menu").addEventListener("click", function() {
    //call update menu function
    display.updateMenu();
}, false);

//update game when shopMenu is clicked
document.getElementById("shopMenu").addEventListener("click", function() {
    //call the update shopMenu function
    display.updateShop();
}, false);

//update game when upgradeMenu is clicked
document.getElementById("upgradeMenu").addEventListener("click", function() {
    //call the update upgradeMenu function
    display.updateUpgrades();
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
    //call loadGame function
    loadGame();
    
    //call updateScore function
    display.updateScore();

    //set menu to closed
    display.isMenuOpen = false;
    display.isShopMenuOpen = false;
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