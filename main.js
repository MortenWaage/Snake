var viewWidth = 800;
var viewHeight = 640;

var debug;

// Sprites
var playerSpriteHead = "sprites/head.png"; 
var playerSpriteBody = "sprites/body.png";
var foodSprite = "sprites/food.png";

var foodObject;

var playerObject;
var playerSegments = [];

var playerSize = 32;
var foodSize = 40;

var dirx = 0;
var diry = 0;

var x = 200;
var y = 100;

var foodX;
var foodY;

var score = 0;
var scoreBoard;


var playerCurrentSpeed = 0;
var playerMaxSpeed = 20;
var playerDirection = new Vector2(0,0);


var container;


var deltaTime;
var frameRate = 30;




// Initial Config
function Init()
{

    deltaTime = frameRate/1000;


    document.addEventListener("keydown", GetPlayerInput);
    scoreBoard = document.getElementById("scoreBoard");
    
    container = document.getElementById("renderArea");

    

    // Set up the Player Object

    RunPlayerObjectSetup();
    RunFoodSetup();
     

    debug = document.getElementById("debug");

    Start();
}




// Start the Application
function Start()
{

    setInterval(Update, frameRate/1000);

    PlaceFood();

}



// View
function Update()
{   

    SetPlayerDirectionAndSpeed();

    SetPlayerPosition(x,y); 

    CheckCollisions();

    UpdateDebug();

}

function PlaceFood()
{
    foodX = Math.random() * viewWidth;
    foodY = Math.random() * viewHeight;

    if (foodX > viewWidth-foodSize)
        foodX -= foodSize;
    if (foodY > viewHeight-foodSize)
        foodY -= foodSize;

    foodObject.style.left = GetPixels(foodX);
    foodObject.style.top = GetPixels(foodY);
}


function SetPlayerDirectionAndSpeed()
{

    var magnitudeX = dirx;
    var magnitudeY = diry;

    x += (playerMaxSpeed * magnitudeX ) * deltaTime;
    y += (playerMaxSpeed * magnitudeY ) * deltaTime;
}


function SetPlayerPosition(_x, _y)
{
    var xInPixels = GetPixels(_x);
    var yInPixels = GetPixels(_y);

    playerObject.style.left = xInPixels;
    playerObject.style.top = yInPixels;    

}




function RunPlayerObjectSetup()
{
    playerObject = document.createElement('div');
    playerObject.className = 'player';

    playerModel = document.createElement('img');
    playerModel.className = 'player';    

    playerModel.setAttribute('src', playerSpriteHead);
    playerModel.setAttribute('height', playerSize);
    playerModel.setAttribute('width', playerSize);
    playerModel.setAttribute('alt', "PLAYER");

    container.appendChild(playerObject); 
    playerObject.appendChild(playerModel);
}


function RunFoodSetup()
{
    foodObject = document.createElement('img');
    foodObject.className = 'food';

    foodObject.setAttribute('src', foodSprite);
    foodObject.setAttribute('alt', "FOOD");

    container.appendChild(foodObject);
}





function GetPixels(value)
{
    return value.toString() + "px";
}

function CheckCollisions()
{
    CheckWallCollision();
    CheckFoodCollision();
}

function CheckFoodCollision()
{
    if (x + playerSize > foodX && x < foodX + foodSize && y + playerSize > foodY && y < foodY + foodSize)
    {
        playerMaxSpeed += 5;
        UpdateScoreList();
        PlaceFood();
    }        
}

function UpdateScoreList()
{
    score += 1;
    scoreBoard.innerHTML = "Score: " + score.toString();
}


function CheckWallCollision()
{
    var hasCollided = false;
    
    //Left
    if (x < 0)
    {
        playerObject.style.left = GetPixels(0);
        dirx = 0;
        hasCollided = true;

    }
    //Right
    if (x > viewWidth - playerSize)
    {
        playerObject.style.left = GetPixels(viewWidth-playerSize);
        dirx = 0;
        hasCollided = true;
    }
    //Top
    if (y < 0)
    {
        playerObject.style.top = GetPixels(0);
        diry = 0;
        hasCollided = true;
    }
    //Bottom
    if (y > viewHeight - playerSize)
    {
        playerObject.style.top = GetPixels(viewHeight-playerSize);
        diry = 0;
        hasCollided = true;
    }

    if(hasCollided)
        SetPlayerPosition(200, 200)
        playerMaxSpeed = playerBaseSpeed;
        score = 0;
}










function UpdateDebug()
{
    debug.innerHTML = "X: " + x + ". Y: " + y + "." + '<p></p>' + "FoodX: " + foodX + ". FoodY: " + foodY + "." + '<p></p>' + "Speed: " + playerMaxSpeed;
}










// Not in use. Does it work?
function Vector2(x, y)
{
    x = this.x;
    y = this.y;
}





function GetPlayerInput(e)
{

    dirx = 0;
    diry = 0;
    

    if(e.code == "KeyW")
    {
        diry += -1;        
    }
    if(e.code == "KeyS")
    {
        diry += 1;
    }
    if(e.code == "KeyA")
    {
        dirx += -1;
    }
    if(e.code == "KeyD")
    {
        dirx += 1;
    } 
    
    RotatePlayer(dirx, diry);
    
}


function RotatePlayer(dirx, diry)
{
    var deltaX = 0 - dirx;
    var deltaY = 0 - diry;
    var rad = Math.atan2(deltaY, deltaX);

    var degrees = rad * ( 180 / Math.PI)
    
    playerModel.style.transform = `rotate(${degrees-90}deg)`;
}