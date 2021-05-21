// TODO - Make Class for head of Worm and the food.

var viewWidth = 800;
var viewHeight = 640;

var debug;
var debug2;

// Sprites
var playerSpriteHead = "sprites/head.png"; 
var playerSpriteBody = "sprites/body.png";
var foodSprite = "sprites/food.png";

var foodObject;
var playerObject;

var foodObjects = [];
var wormSegments = [];

var spawnPosition;
var playerPosition;
var playerSize = 32;

var headDirection;
var lastHeadDirection;

var score = 0;
var scoreBoard;

var playerDefaultSpeed = 10;
var playerCurrentSpeed;
var playerMaxSpeed = 60;
var nextHeadTurnPoint;

var container;


var deltaTime;
var frameRate = 30;


var wormCounter = 0; // for testing the tail segment updates


// Initial Config
function Init()
{
    deltaTime = frameRate/1000;   

    spawnPosition = new Vector2(200,300);    

    document.addEventListener("keydown", GetPlayerInput);
    scoreBoard = document.getElementById("scoreBoard");    
    container = document.getElementById("renderArea");          


    debug = document.getElementById("debug");
    debug2 = document.getElementById("debug2");

    
    Start();
}






// Configure Game Objects
function Start()
{
    RunPlayerObjectSetup();  
    RunFoodSetup();   
    PlaceFood();

    setInterval(Update, frameRate/1000);
}



// Main Game Loop
function Update()
{   

    SetPlayerDirectionAndSpeed();

    UpdateWorm();    

    CheckCollisions();

    UpdateDebug();

}

function PlaceFood()
{
    foodObject.position.x = Math.random() * viewWidth;
    foodObject.position.y = Math.random() * viewHeight;

    if (foodObject.position.x > viewWidth-foodObject.size)
        foodObject.position.x -= foodObject.size;
    if (foodObject.position.y > viewHeight-foodObject.size)
        foodObject.position.y -= foodObject.size;

    foodObject.object.style.left = GetPixels(foodObject.position.x);
    foodObject.object.style.top = GetPixels(foodObject.position.y);
}


function SetPlayerDirectionAndSpeed()
{
    // Move Player
    playerPosition.x += (playerCurrentSpeed * headDirection.x ) * deltaTime;
    playerPosition.y += (playerCurrentSpeed * headDirection.y ) * deltaTime;

    // Move Tail Segments
    for (i = wormSegments.length-1; i >= 0; i--)
    {
        wormSegments[i].position.x += (playerCurrentSpeed * wormSegments[i].direction.x) * deltaTime;
        wormSegments[i].position.y += (playerCurrentSpeed * wormSegments[i].direction.y) * deltaTime;

        CheckSegmentDirection(wormSegments[i], wormSegments[i-1]); 
        
        //CheckIfPreviousSegmentTurned();
    }
         


}



function CheckSegmentDirection(segment, previousSegment)
{
    if (previousSegment == wormSegments[-1])
        previousSegment = headDirection;


    // Moving Right
    if (segment.direction.x == 1)
    {
        if (segment.position.x >= segment.nextTurnPoint.x)
        {
            segment.direction.x = previousSegment.x;
            segment.direction.y = previousSegment.y;
        }  
    }
    // Moving Left
    else if (segment.direction.x == -1)
    {
        if (segment.position.x <= segment.nextTurnPoint.x)
        {
            segment.direction.x = previousSegment.x;
            segment.direction.y = previousSegment.y;
        }  
    }   
    // Moving Down
    else if (segment.direction.y == 1)
    {
        if (segment.position.y >= segment.nextTurnPoint.y)
        {
            segment.direction.x = previousSegment.x;
            segment.direction.y = previousSegment.y;
        }  
    }
    // Moving Up
    else if (segment.direction.y == -1)
    {
        if (segment.position.y <= segment.nextTurnPoint.y)
        {
            segment.direction.x = previousSegment.x;
            segment.direction.y = previousSegment.y;
        }  
    }
    else if (segment.direction.x == 0 && segment.direction.y == 0)
    {
        segment.direction.x = previousSegment.x;
        segment.direction.y = previousSegment.y;
    }
}



function ResetGame()
{

    for (n = 0; n < wormSegments.length; n++)
    {
        wormSegments[n].model.remove();
    }
    playerObject.remove();
    playerModel.remove();
    wormSegments = [];

    RunPlayerObjectSetup();
    score = 0;
}

function UpdateWorm()
{
    UpdatePosition(playerObject, playerPosition);

    for (i = 0; i < wormSegments.length; i++)
    {
        UpdatePosition(wormSegments[i].model, wormSegments[i].position);
    }
}

function UpdatePosition(object, pos)
{
    object.style.left = GetPixels(pos.x);
    object.style.top = GetPixels(pos.y);   
}


function AddTailSegment()
{
    var newSegment = new WormSegment();
    newSegment.CreateSegment();

    var newPos = new Vector2(wormSegments[wormSegments.length-1].position.x, wormSegments[wormSegments.length-1].position.y - newSegment.size)
    newSegment.SetPosition(newPos);
    UpdatePosition(newSegment.model, newPos);
    
    
    newSegment.direction = wormSegments[wormSegments.length-1].direction;
    wormSegments.push(newSegment);
    newSegment.lastDirection = new Vector2(wormSegments[wormSegments.length-1].direction.x,wormSegments[wormSegments.length-1].direction.y);
    container.appendChild(newSegment.model);

}


function RunPlayerObjectSetup()
{

    headDirection = new Vector2(0,0);
    lastHeadDirection = new Vector2(0,0);

    playerCurrentSpeed = playerDefaultSpeed;
    playerPosition = new Vector2(200,300);

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
    
    newSegment.direction = new Vector2(headDirection.x,headDirection.y);
    newSegment.lastDirection = new Vector2(headDirection.x, headDirection.y);
    newSegment.nextTurnDirection = new Vector2(0,0);

    var newPos = new Vector2(playerPosition.x, playerPosition.y - newSegment.size)
    newSegment.SetPosition(newPos);
    UpdatePosition(newSegment.model, newPos);



    newSegment.nextTurnPoint = new Vector2(playerPosition.x, playerPosition.y);

    
    wormSegments.push(newSegment);
    container.appendChild(newSegment.model);
}


function RunFoodSetup()
{
    foodObject = new Food();
    foodObject.CreateFood();
    foodObject.position = new Vector2(300,200);

    container.appendChild(foodObject.object);
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
    if (playerPosition.x + playerSize > foodObject.position.x && playerPosition.x < foodObject.position.x + foodObject.size && playerPosition.y + playerSize > foodObject.position.y && playerPosition.y < foodObject.position.y + foodObject.size)
    {
        playerCurrentSpeed += 2;
        playerCurrentSpeed = Math.min(playerCurrentSpeed, playerMaxSpeed);
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
        ResetGame();
    }
    //Right
    if (playerPosition.x > viewWidth - playerSize)
    {
        playerObject.style.left = GetPixels(viewWidth-playerSize);
        ResetGame();
    }
    //Top
    if (playerPosition.y < 0)
    {
        playerObject.style.top = GetPixels(0);
        ResetGame();
    }
    //Bottom
    if (playerPosition.y > viewHeight - playerSize)
    {
        playerObject.style.top = GetPixels(viewHeight-playerSize);
        ResetGame();
    }     
}










function UpdateDebug()
{
    debug.innerHTML = "X: " + playerPosition.x + ". Y: " + playerPosition.y + "." + '<p></p>' + "FoodX: " + foodObject.position.x + ". FoodY: " + foodObject.position.y + "." + '<p></p>' + "Speed: " + playerCurrentSpeed + '<p></p>' + "WormCounter: " + wormCounter + '<p></p>' + "Spawn Pos: " + spawnPosition.x + "," + spawnPosition.y;
    debug2.innerHTML = "Direction X: " + headDirection.x + " - " + "Direction Y: " + headDirection.y + '<p></p>' + "Tail Direction X: " + wormSegments[0].direction.x + " - " + "Tail Direction Y: " + wormSegments[0].direction.y + '<p></p>' + "Tail Turn Point X: " + wormSegments[0].nextTurnPoint.x + " - " +  "Tail Turn Point Y: " + wormSegments[0].nextTurnPoint.y; 
}












function GetPlayerInput(e)
{
    lastHeadDirection.x = headDirection.x;
    lastHeadDirection.y = headDirection.y;

    headDirection.x = 0;
    headDirection.y = 0;
    

    if(e.code == "KeyW")
    {
        headDirection.y += -1;        
    }
    if(e.code == "KeyS")
    {
        headDirection.y += 1;
    }
    if(e.code == "KeyA")
    {
        headDirection.x += -1;
    }
    if(e.code == "KeyD")
    {
        headDirection.x += 1;
    }
     
    
    if (headDirection.x != lastHeadDirection.x || headDirection.y != lastHeadDirection.y)
    {
        if (headDirection.y == 1)
        {
            wormSegments[0].nextTurnPoint.x = playerPosition.x;
            wormSegments[0].nextTurnPoint.y = playerPosition.y + playerSize;
        }
        if (headDirection.y == -1)
        {
            wormSegments[0].nextTurnPoint.x = playerPosition.x;
            wormSegments[0].nextTurnPoint.y = playerPosition.y;
        }
        if (headDirection.x == 1)
        {
            wormSegments[0].nextTurnPoint.x = playerPosition.x + playerSize;
            wormSegments[0].nextTurnPoint.y = playerPosition.y;
        }
        if (headDirection.x == -1)
        {
            wormSegments[0].nextTurnPoint.x = playerPosition.x;
            wormSegments[0].nextTurnPoint.y = playerPosition.y;
        }
    
        RotatePlayer(headDirection.x, headDirection.y);
    
        wormSegments[0].nextTurnDirection.x = headDirection.x;
        wormSegments[0].nextTurnDirection.y = headDirection.y;
    }  

    
}


function CheckIfPreviousSegmentTurned()
{
    for (s = 1; s < wormSegments.length; s++)
    {
        if (wormSegments[s].position.x != wormSegments[s-1].lastDirection.x || wormSegments[s].position.y != wormSegments[s-1].lastDirection.y)
        {  
    
            if (wormSegments[s-1].direction.y == 1)
            {
                wormSegments[s].nextTurnPoint.x = playerPosition.x;
                wormSegments[s].nextTurnPoint.y = playerPosition.y + playerSize;
            }
            if (wormSegments[s-1].direction.y == -1)
            {
                wormSegments[s].nextTurnPoint.x = playerPosition.x;
                wormSegments[s].nextTurnPoint.y = playerPosition.y;
            }
            if (wormSegments[s-1].direction.y == 1)
            {
                wormSegments[s].nextTurnPoint.x = playerPosition.x + playerSize;
                wormSegments[s].nextTurnPoint.y = playerPosition.y;
            }
            if (wormSegments[s-1].direction.y == -1)
            {
                wormSegments[s].nextTurnPoint.x = playerPosition.x;
                wormSegments[s].nextTurnPoint.y = playerPosition.y;
            }
        
            wormSegments[s].nextTurnDirection.x = wormSegments[s-1].direction.x;
            wormSegments[s].nextTurnDirection.y = wormSegments[s-1].direction.y;
        } 
    }
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
    
    direction;
    lastDirection;
    
    nextTurnPoint;
    nextTurnDirection;    

    position;
    size = 28;
    model;

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


class Food
{
    constructor()
    {

    }

    object;
    position;
    size = 40;

    CreateFood()
    {
        this.object = document.createElement('img');
        this.object.className = 'food';
    
        this.object.setAttribute('src', foodSprite);
        this.object.setAttribute('alt', "FOOD");
    }
}
