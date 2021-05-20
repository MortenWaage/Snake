// TODO - Make Class for head of Worm and the food.

var viewWidth = 800;
var viewHeight = 640;

var debug;

// Sprites
var playerSpriteHead = "sprites/head.png"; 
var playerSpriteBody = "sprites/body.png";
var foodSprite = "sprites/food.png";

var foodObject;

var playerObject;
var wormSegments = [];

var playerPosition;

var playerSize = 32;
var foodSize = 40;

var dirx = 0;
var diry = 0;

var foodPosition;

var score = 0;
var scoreBoard;


var playerCurrentSpeed = 0;
var playerMaxSpeed = 20;


var container;


var deltaTime;
var frameRate = 30;




// Initial Config
function Init()
{
    playerPosition = new Vector2(200,300);
    foodPosition = new Vector2(300,200);

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

    UpdateWorm();    

    CheckCollisions();

    UpdateDebug();

}

function PlaceFood()
{
    foodPosition.x = Math.random() * viewWidth;
    foodPosition.y = Math.random() * viewHeight;

    if (foodPosition.x > viewWidth-foodSize)
        foodPosition.x -= foodSize;
    if (foodPosition.y > viewHeight-foodSize)
        foodPosition.y -= foodSize;

    foodObject.style.left = GetPixels(foodPosition.x);
    foodObject.style.top = GetPixels(foodPosition.y);
}


function SetPlayerDirectionAndSpeed()
{

    var magnitudeX = dirx;
    var magnitudeY = diry;

    playerPosition.x += (playerMaxSpeed * magnitudeX ) * deltaTime;
    playerPosition.y += (playerMaxSpeed * magnitudeY ) * deltaTime;

    // for (i = 0; i < wormSegments.length; i++)
    // {
    //     wormSegments[i].position.x += (playerMaxSpeed * magnitudeX ) * deltaTime;
    //     wormSegments[i].position.y += (playerMaxSpeed * magnitudeY ) * deltaTime;
    // }

    wormSegments[0].position.x = playerPosition.x - (dirx * 28);
    wormSegments[0].position.y = playerPosition.y - (diry * 28);

    for (i = wormSegments.length-1; i > 0; i--)
    {
        wormSegments[i].position.x = wormSegments[i-1].position.x - (dirx * 28);
        wormSegments[i].position.y = wormSegments[i-1].position.y - (diry * 28);
    }
}


function UpdateWorm()
{
    UpdatePosition(playerObject, playerPosition);

    console.log(wormSegments.length);

    for (i = 0; i < wormSegments.length; i++)
    {
        UpdatePosition(wormSegments[i].model, wormSegments[i].position)
    }
}

function UpdatePosition(object, vector)
{
    object.style.left = GetPixels(vector.x);
    object.style.top = GetPixels(vector.y);   
}


function AddTailSegment()
{
    var newSegment = new WormSegment();
    newSegment.CreateSegment();

    var newPos = new Vector2(wormSegments[wormSegments.length-1].position.x, wormSegments[wormSegments.length-1].position.y - newSegment.size)
    newSegment.SetPosition(newPos);
    UpdatePosition(newSegment.model, newPos);
    
    wormSegments.push(newSegment);
    container.appendChild(newSegment.model);

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

    //Create First Tail Segment
    var newSegment = new WormSegment();

    newSegment.CreateSegment();
    

    var newPos = new Vector2(playerPosition.x, playerPosition.y - newSegment.size)
    newSegment.SetPosition(newPos);
    UpdatePosition(newSegment.model, newPos);

    wormSegments.push(newSegment);
    container.appendChild(newSegment.model);
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
    if (playerPosition.x + playerSize > foodPosition.x && playerPosition.x < foodPosition.x + foodSize && playerPosition.y + playerSize > foodPosition.y && playerPosition.y < foodPosition.y + foodSize)
    {
        playerMaxSpeed += 2;
        UpdateScoreList();
        PlaceFood();
        AddTailSegment();
    }        
}

function UpdateScoreList()
{
    score += 1;
    scoreBoard.innerHTML = "Score: " + score.toString();
}


function CheckWallCollision()
{
   
    //Left
    if (playerPosition.x < 0)
    {
        playerObject.style.left = GetPixels(0);
        dirx = 0;

    }
    //Right
    if (playerPosition.x > viewWidth - playerSize)
    {
        playerObject.style.left = GetPixels(viewWidth-playerSize);
        dirx = 0;
    }
    //Top
    if (playerPosition.y < 0)
    {
        playerObject.style.top = GetPixels(0);
        diry = 0;
    }
    //Bottom
    if (playerPosition.y > viewHeight - playerSize)
    {
        playerObject.style.top = GetPixels(viewHeight-playerSize);
        diry = 0;
    }     
}










function UpdateDebug()
{
    debug.innerHTML = "X: " + playerPosition.x + ". Y: " + playerPosition.y + "." + '<p></p>' + "FoodX: " + foodPosition.x + ". FoodY: " + foodPosition.y + "." + '<p></p>' + "Speed: " + playerMaxSpeed;
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




class Vector2
{  
    constructor(_x, _y)
    {
        this.x = _x;
        this.y = _y;
    }
}


class WormSegment
{
    constructor()
    {
        
    }
    
    position;
    size = 28;

    CreateSegment()
    {
        this.model = document.createElement('img');
        this.model.className = 'wormSegment';    
    
        this.model.setAttribute('src', playerSpriteBody);
        this.model.setAttribute('height', this.size);
        this.model.setAttribute('width', this.size);
        this.model.setAttribute('alt', "SEGMENT");
    }

    SetPosition(pos)
    {
        this.position = pos;

    }

}
