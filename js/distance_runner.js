/******************** Declare game specific global data and functions *****************/
/* images must be declared as global, so that they will load before the game starts  */
let skyImage = new Image();
skyImage.src = "https://derek.dkit.ie/games_development/canvas/exampleCode/images/scrolling_background_sky.png";
let middleImage = new Image();
middleImage.src = "https://derek.dkit.ie/games_development/canvas/exampleCode/images/scrolling_background_middle.png";
let foregroundImage = new Image();
foregroundImage.src = "https://derek.dkit.ie/games_development/canvas/exampleCode/images/scrolling_background_foreground.png";
let floorImage = new Image();
floorImage.src = "images/floor.png";
let runnerImage = new Image();
runnerImage.src = "images/runner2.png";
let obstacleImage1 = new Image();
obstacleImage1.src = "images/obstacle1.png";
let heartImage = new Image();
heartImage.src = "images/heart.png";
let ballImage = new Image();
ballImage.src = "images/bonus.png";
let rocketImage = new Image();
rocketImage.src = "images/rocket.png";
let logsImage = new Image();
logsImage.src = "images/logs.png";
let lifeImage = new Image();
lifeImage.src = "images/life.png";

//  name = index
const
background3 = 0,
background2 = 1,
background1 = 2,
floor = 3,
runner = 4,
score = 6,
lifes = 7,
topScore = 8,
life = 12;

var GAME_SPEED = .7;

/******************* END OF Declare game specific data and functions *****************/



/* Always have a playGame() function                                     */
/* However, the content of this function will be different for each game */
function playGame()
{
    /* We need to initialise the game objects outside of the Game class */
    /* This function does this initialisation.                          */
    /* This function will:                                              */
    /* 1. create the various game game gameObjects                   */
    /* 2. store the game gameObjects in an array                     */
    /* 3. create a new Game to display the game gameObjects          */
    /* 4. start the Game                                                */


    /* Create the various gameObjects for this game. */
    /* This is game specific code. It will be different for each game, as each game will have it own gameObjects */
    let runnerAnimationSpeed = 150;
    const bottom = document.getElementById("gameCanvas").height;
    
    gameObjects[background3] = new ScrollingBackgroundImage(skyImage, 40*GAME_SPEED);
    gameObjects[background2] = new ScrollingBackgroundImage(middleImage, 30*GAME_SPEED);
    gameObjects[background1] = new ScrollingBackgroundImage(foregroundImage, 15*GAME_SPEED);
    gameObjects[floor] = new ScrollingBackgroundImage(floorImage, 15*GAME_SPEED);
    gameObjects[runner] = new RunnerAnimation(runnerImage, 35, bottom - 125, 100, runnerAnimationSpeed*GAME_SPEED*2, 40*((GAME_SPEED*2)/1.3));
    gameObjects[score] = new ScoreCounter();
    gameObjects[lifes] = new LifeCounter(heartImage);
    gameObjects[topScore] = new TopScore();

    // make the canvas wider for this example
    document.getElementById("gameCanvas").style.width = "1000px";

    /* END OF game specific code. */

    /* Always create a game that uses the gameObject array */
    let game = new RunnerCanvasGame();

    /* Always play the game */
    game.start();


    /* If they are needed, then include any game-specific mouse and keyboard listners */
    document.addEventListener("keydown", function (e)
    {
        if (e.keyCode === 32) // space bar
        {
            gameObjects[runner].jump();
        }
    });
}