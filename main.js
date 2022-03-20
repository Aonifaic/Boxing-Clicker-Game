
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
    },

    //get scorePerSecond
    getScorePerSecond: function() {
        //define variable
        var scorePerSecond = 0;
        //check if prestige is greater than 1
        if (this.prestige >= 1) {
            //add skill count times skill income
            for (i = 0; i < skill.name.length; i++) {
                scorePerSecond += skill.count[i] * skill.income[i];
            }
            return scorePerSecond;
        } else if (this.prestige == 0) {
            return scorePerSecond;
        }
    }
};

var display = {
       //define menu booleens
       isMenuOpen: false,
       isShopMenuOpen: false,
       isUpgradeMenuOpen: false,
       isAchievementMenuOpen: false,
       isPrestigeMenuOpen: false,
   
    //updates the score and title
    updateScore: function() {
        //sets id of score to game score
        document.getElementById("score").innerHTML = game.score;

        //set scorePerSecond to game ScorePerSecond
        document.getElementById("scorePerSecond").innerHTML = game.getScorePerSecond();

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

     //update the upgradeMenu
     updateUpgrades: function() {
        //set div id of upgrade container to empty
        document.getElementById("upgradeContainer").innerHTML = "";

        //check if upgrade menu is open
        if (this.isUpgradeMenuOpen == false) {
            //adds div for every upgrade to id of upgradeContainer
            for (i = 0; i < upgrade.name.length; i++) {
                //check that upgrade hasn't been purchased
                if (!upgrade.purchased[i]) {
                    document.getElementById("upgradeContainer").innerHTML += '<div class="upgradeButton"><img src="images/'+upgrade.image[i]+'" title="'+upgrade.name[i]+' &#10; '+upgrade.description[i]+' &#10; ('+upgrade.cost[i]+' KO Points)" onclick="upgrade.purchase('+i+')"></div>'
                }
                
            }

            //change the isUpgradeMenuOpen to true
            this.isUpgradeMenuOpen = true;
        } else if (this.isUpgradeMenuOpen == true) {
            //change the isUpgradeMenuOpen to false
            this.isUpgradeMenuOpen = false;
        }
    },

    //updates the achievementMenu
    updateAcievements: function() {
        //set div id of achievementContainer to empty
        document.getElementById("achievementContainer").innerHTML = "";

       //check if achievement menu is open
       if (this.isAchievementMenuOpen == false) {
        //adds div for every achievement to id of achievementContainer
            for (i = 0; i < achievement.name.length; i++) {
                //check that achievement has been earned
                if (achievement.awarded[i]) {
                    document.getElementById("achievementContainer").innerHTML += '<div class="achievementButton"><img src="images/'+achievement.image[i]+'" title="'+achievement.name[i]+' &#10; '+achievement.description[i]+'"></div>'
                }
            }

            //change the isAchievementMenuOpen to true
            this.isAchievementMenuOpen = true;
        } else if (this.isAchievementMenuOpen == true) {
            //change the isUpgradeMenuOpen to false
            this.isAchievementMenuOpen = false;
        }

    },

    //update the prestigeMenu
    updatePrestige: function() {
        //set prestigeContainer to empty
        document.getElementById("prestigeContainer").innerHTML = "";

        //check if prestige menu is open
         if (this.isPrestigeMenuOpen == false) {
             //add button for prestige
             document.getElementById("prestigeContainer").innerHTML += '<table class="prestigeButton" onclick="prestigeUp()"><tr><td id="image"><img src="images/boxingBag.jpg"></td><td id="nameAndCost"><p>Ready To Fight!</p><p>1000000 KO Points</p><td id="amount"><span>'+game.prestige+'</span></td></td></tr></table>'
            //change isPrestigeMenuOpen to true
            this.isPrestigeMenuOpen = true;
        } else if (this.isPrestigeMenuOpen == true) {
            //change isPrestigeMenuOpen to false
            this.isPrestigeMenuOpen = false;
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
        "Rear Hook",
        "Lead Uppercut",
        "Rear Uppercut"
    ],
    image: [
        "images/jab.jpg",
        "images/cross.jpg",
        "images/hook.jpg",
        "images/hook.jpg",
        "images/uppercut.jpg",
        "images/uppercut.jpg"
    ],
    count: [
        0,
        0,
        0,
        0,
        0,
        0
    ],
    income: [
        1,
        10,
        100,
        1000,
        10000,
        100000
    ],
    cost: [
        20,
        100,
        500,
        2500,
        12500,
        100000
    ],

    defaultCost: [
        20,
        100,
        500,
        2500,
        12500,
        100000
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
        "Snappy Jabs",
        "Powerful Jabs",
        "Violent Jabs",
        "Snappy Crosses",
        "Powerful Crosses",
        "Violent Crosses",
        "Snappy Lead Hooks",
        "Powerful Lead Hooks",
        "Violent Lead Hooks",
        "Snappy Rear Hooks",
        "Powerful Rear Hooks",
        "Violent Rear Hooks",
        "Snappy Lead Uppercuts",
        "Powerful Lead Uppercuts",
        "Violent Lead Uppercuts",
        "Snappy Rear Uppercuts",
        "Powerful Rear Uppercuts",
        "Violent Rear Uppercuts",
    ],

    description: [
        "Jabs are twice as efficient",
        "Jabs are twice as efficient",
        "Jabs are twice as efficient",
        "Crosses are twice as efficient",
        "Crosses are twice as efficient",
        "Crosses are twice as efficient",
        "Lead Hooks are twice as efficient",
        "Lead Hooks are twice as efficient",
        "Lead Hooks are twice as efficient",
        "Rear Hooks are twice as efficient",
        "Rear Hooks are twice as efficient",
        "Rear Hooks are twice as efficient",
        "Lead Uppercuts are twice as efficient",
        "Lead Uppercuts are twice as efficient",
        "Lead Uppercuts are twice as efficient",
        "Rear Uppercuts are twice as efficient",
        "Rear Uppercuts are twice as efficient",
        "Rear Uppercuts are twice as efficient",
    ],

    image: [
        "jab.jpg",
        "jab.jpg",
        "jab.jpg",
        "cross.jpg",
        "cross.jpg",
        "cross.jpg",
        "hook.jpg",
        "hook.jpg",
        "hook.jpg",
        "hook.jpg",
        "hook.jpg",
        "hook.jpg",
        "uppercut.jpg",
        "uppercut.jpg",
        "uppercut.jpg",
        "uppercut.jpg",
        "uppercut.jpg",
        "uppercut.jpg"
    ],

    skillIndex: [
        0,
        0,
        0,
        1,
        1,
        1,
        2,
        2,
        2,
        3,
        3,
        3,
        4,
        4,
        4,
        5,
        5,
        5
    ],

    cost: [
        100,
        200,
        500,
        100,
        200,
        500,
        100,
        200,
        500,
        100,
        200,
        500,
        100,
        200,
        500,
        100,
        200,
        500
    ],

    requirement: [
        10,
        25,
        50,
        10,
        25,
        50,
        10,
        25,
        50,
        10,
        25,
        50,
        10,
        25,
        50,
        10,
        25,
        50
    ],
    
    bonus: [
        2,
        4,
        8,
        2,
        4,
        8,
        2,
        4,
        8,
        2,
        4,
        8,
        2,
        4,
        8,
        2,
        4,
        8
    ],
    purchased: [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],

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
                game.clickValue += this.bonus[index] * skill.count[this.skillIndex[index]];

                //add bonus to skill income
                skill.income[this.skillIndex[index]] *= this.bonus[index];

                //update score
                display.updateScore();

                //update upgradeMenu twice to reopen
                display.updateUpgrades();
                display.updateUpgrades();

              // if prestige is more than 0 and have enough for requirement  
            } else if (game.prestige >= 1 && skill.count[this.skillIndex[index]] >= this.requirement[index]) {
                //change to purchased
                this.purchased[index] = true;

                //take cost from score
                game.score -= this.cost[index];

                //add bonus to skill income
                skill.income[this.skillIndex[index]] *= this.bonus[index];

                //update score
                display.updateScore();

                //update upgradeMenu twice to reopen
                display.updateUpgrades();
                display.updateUpgrades();
            }
        }
    }
};

var achievement = {
    //define all variables
    name: [
        "Beginner Fighter",
        "Intermediate Figher",
        "Professional Fighter",
        "Beginner Headbutt",
        "Intermediate Headbutt",
        "Professional Headbutt",
        "Beginner Jab",
        "Intermediate Jab",
        "Professional Jab",
        "Beginner Cross",
        "Intermediate Cross",
        "Professional Cross",
        "Beginner Lead Hook",
        "Intermediate Lead Hook",
        "Professional Lead Hook",
        "Beginner Rear Hook",
        "Intermediate Rear Hook",
        "Professional Rear Hook",
        "Beginner Lead Uppercut",
        "Intermediate Lead Uppercut",
        "Professional Lead Uppercut",
        "Beginner Rear Uppercut",
        "Intermediate Rear Uppercut",
        "Professional Rear Uppercut"
    ],

    image: [
        "boxingBag.jpg",
        "boxingBag.jpg",
        "boxingBag.jpg",
        "boxingBag.jpg",
        "boxingBag.jpg",
        "boxingBag.jpg",
        "jab.jpg",
        "jab.jpg",
        "jab.jpg",
        "cross.jpg",
        "cross.jpg",
        "cross.jpg",
        "hook.jpg",
        "hook.jpg",
        "hook.jpg",
        "hook.jpg",
        "hook.jpg",
        "hook.jpg",
        "uppercut.jpg",
        "uppercut.jpg",
        "uppercut.jpg",
        "uppercut.jpg",
        "uppercut.jpg",
        "uppercut.jpg",
        
    ],

    description: [
        "Get 1 KO Point",
        "Get 100 KO Points",
        "Get 10000 KO Points",
        "Click 1 time",
        "Click 100 time",
        "Click 1000 time",
        "Buy 10 Jabs",
        "Buy 25 Jabs",
        "Buy 50 Jabs",
        "Buy 10 Crosses",
        "Buy 25 Crosses",
        "Buy 50 Crosses",
        "Buy 10 Lead Hooks",
        "Buy 25 Lead Hooks",
        "Buy 50 Lead Hooks",
        "Buy 10 Rear Hooks",
        "Buy 25 Rear Hooks",
        "Buy 50 Rear Hooks",
        "Buy 10 Lead Uppercuts",
        "Buy 25 Lead Uppercuts",
        "Buy 50 Lead Uppercuts",
        "Buy 10 Rear Uppercuts",
        "Buy 25 Rear Uppercuts",
        "Buy 50 Rear Uppercuts"
    ],

    type: [
        "score",
        "score",
        "score",
        "click",
        "click",
        "click",
        "skill",
        "skill",
        "skill",
        "skill",
        "skill",
        "skill",
        "skill",
        "skill",
        "skill",
        "skill",
        "skill",
        "skill",
        "skill",
        "skill",
        "skill",
        "skill",
        "skill",
        "skill"
    ],

    objectIndex: [
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        0,
        0,
        0,
        1,
        1,
        1,
        2,
        2,
        2,
        3,
        3,
        3,
        4,
        4,
        4,
        5,
        5,
        5
    ],

    requirement: [
        1,
        100,
        10000,
        1,
        10,
        100,
        10,
        25,
        50,
        10,
        25,
        50,
        10,
        25,
        50,
        10,
        25,
        50,
        10,
        25,
        50,
        10,
        25,
        50
    ],

    awarded: [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],

    earn: function(index) {
        //change awarded to true
        this.awarded[index] = true;

        //update container twice to update and reopen
        display.updateAcievements;
        display.updateAcievements;
    }
};


function prestigeUp() {
    var prestigeCost = 1000000;
    if(confirm("Are you sure you want to prestige?")) {
        if (game.score >= prestigeCost) {
            //change the prestige up by 1
            game.prestige++;

            //reset variables
            game.score = 0;
            game.clickValue = 1;
            for (i = 0; i < skill.name.length; i++) {
                skill.count[i] = 0;
                skill.cost[i] = skill.defaultCost[i];
            }
            for (i = 0; i < upgrade.name.length; i++) {
                upgrade.purchased[i] = false;
            }

            //update the displays
            display.updateScore();
            display.updateShop();
            display.updateUpgrades();
            display.updateShop();
            display.updateUpgrades();
            display.updatePrestige();
        } else {
            alert("You do not have enough points!");
        }
    }
}

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

//update game when achievementMenu is clicked
document.getElementById("achievementMenu").addEventListener("click", function() {
    //call the update achievementMenu function
    display.updateAcievements();
}, false);

//update game when prestigeMenu is clicked
document.getElementById("prestigeMenu").addEventListener("click", function() {
    //call the update prestigeMenu function
    display.updatePrestige();
}, false);

//update game every second to check if achievement has been earned
setInterval (function() {
    // go through every achievement
    for (i=0; i < achievement.name.length; i++) {
        // check what type it is and then if it meets the requirement
        if (achievement.type[i] == "score" && game.totalScore >= achievement.requirement[i]) {
            achievement.earn(i);
        } else if (achievement.type[i] == "click" && game.totalClicks >= achievement.requirement[i]) {
            achievement.earn(i);
        } else if (achievement.type[i] == "skill" && skill.count[achievement.objectIndex[i]] >= achievement.requirement[i]) {
            achievement.earn(i);
        }
    }
}, 1000); // 1000ms = 1 second

//Update score every second to add scorePerSecond
setInterval (function() {
    //add scorePerSecond to score and total score
    game.score += game.getScorePerSecond();
    game.totalScore += game.getScorePerSecond();

    //update score display
    display.updateScore();
}, 1000); //1000ms = 1 second

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
        skillIncome: skill.income,
        upgradePurchased: upgrade.purchased
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
        if (typeof savedGame.prestige !== "undefined") game.prestige = savedGame.prestige;
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
        if (typeof savedGame.upgradePurchased  !== "undefined") {
            for(i = 0; i < savedGame.upgradePurchased.length; i++) {
                upgrade.purchased[i] = savedGame.upgradePurchased[i];
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

function checkPrestige() {
    alert(game.prestige);
}