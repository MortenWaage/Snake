
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

var direction;
var lastdirection;

var score = 0;
var scoreBoard;

var playerDefaultSpeed = 10;
var playerCurrentSpeed;
var playerMaxSpeed = 60;
var nextHeadTurnPoint;

var container;


var deltaTime;
var frameRate = 30;









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













function SetPlayerDirectionAndSpeed()
{
    // Move Player
    playerPosition.x += (playerCurrentSpeed * direction.x ) * deltaTime;
    playerPosition.y += (playerCurrentSpeed * direction.y ) * deltaTime;

    // Move Tail Segments
    for (i = wormSegments.length-1; i >= 0; i--)
    {
        wormSegments[i].position.x += (playerCurrentSpeed * wormSegments[i].direction.x) * deltaTime;
        wormSegments[i].position.y += (playerCurrentSpeed * wormSegments[i].direction.y) * deltaTime;

        CheckSegmentDirection(wormSegments[i], wormSegments[i-1]); 
        
        CheckIfPreviousSegmentTurned();
    }       
}













function CheckSegmentDirection(segment, previousSegment)
{
    if (previousSegment == wormSegments[-1])
        previousSegment = new Vector2(direction.x, direction.y);
    else
        previousSegment = new Vector2(previousSegment.direction.x, previousSegment.direction.y);
    

    


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

    newSegment.direction = new Vector2(wormSegments[wormSegments.length-1].direction.x,wormSegments[wormSegments.length-1].direction.y);
    newSegment.lastDirection = new Vector2(wormSegments[wormSegments.length-1].direction.x,wormSegments[wormSegments.length-1].direction.y);
    newSegment.nextTurnDirection = new Vector2(0,0);

    var offset = new Vector2(wormSegments[wormSegments.length-1].direction.x * newSegment.size, wormSegments[wormSegments.length-1].direction.y * newSegment.size)
    newSegment.SetPosition(new Vector2(wormSegments[wormSegments.length-1].position.x + offset.x, wormSegments[wormSegments.length-1].position.y + offset.y));    
    UpdatePosition(newSegment.model, new Vector2(wormSegments[wormSegments.length-1].position.x, wormSegments[wormSegments.length-1].position.y - newSegment.size));
    
    newSegment.nextTurnPoint = new Vector2(wormSegments[wormSegments.length-1].position.x, wormSegments[wormSegments.length-1].position.y - newSegment.size); 
    wormSegments.push(newSegment);
    container.appendChild(newSegment.model);

    console.log(wormSegments.length);
    // for (i = 0; i < wormSegments.length; i++)
    //     console.log(wormSegments[i].direction.x);
    
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
        score += 1;
        UpdateScoreList();
        PlaceFood();
        AddTailSegment();
    }        
}










function UpdateScoreList()
{    
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












function GetPlayerInput(e)
{
    lastdirection.x = direction.x;
    lastdirection.y = direction.y;

    direction.x = 0;
    direction.y = 0;
    

    if(e.code == "KeyW")
    {
        direction.y += -1;        
    }
    if(e.code == "KeyS")
    {
        direction.y += 1;
    }
    if(e.code == "KeyA")
    {
        direction.x += -1;
    }
    if(e.code == "KeyD")
    {
        direction.x += 1;
    }
     
    
    if (direction.x != lastdirection.x || direction.y != lastdirection.y)
    {
        if (direction.y == 1)
        {
            wormSegments[0].nextTurnPoint.x = playerPosition.x;
            wormSegments[0].nextTurnPoint.y = playerPosition.y + playerSize;
        }
        if (direction.y == -1)
        {
            wormSegments[0].nextTurnPoint.x = playerPosition.x;
            wormSegments[0].nextTurnPoint.y = playerPosition.y;
        }
        if (direction.x == 1)
        {
            wormSegments[0].nextTurnPoint.x = playerPosition.x + playerSize;
            wormSegments[0].nextTurnPoint.y = playerPosition.y;
        }
        if (direction.x == -1)
        {
            wormSegments[0].nextTurnPoint.x = playerPosition.x;
            wormSegments[0].nextTurnPoint.y = playerPosition.y;
        }
    
        RotatePlayer(direction.x, direction.y);
    
        wormSegments[0].nextTurnDirection.x = direction.x;
        wormSegments[0].nextTurnDirection.y = direction.y;
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
