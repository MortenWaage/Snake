
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

var score = 0;
var scoreBoard;

var playerDefaultSpeed = 40;
var playerCurrentSpeed;
var playerMaxSpeed = 60;
var nextHeadTurnPoint;

var container;


var deltaTime;
var frameRate = 30;


var wormPath = [];







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

    AddPointToWormPath(playerPosition);     

    // Move Tail Segments
    if (wormSegments.length > 0)
    {
        for (i = wormSegments.length-1; i > 0; i--)
        {               
            wormSegments[i].position.x = wormPath[(wormPath.length-1) - wormSegments[i].size - (i*wormSegments[i].size)].x;
            wormSegments[i].position.y = wormPath[(wormPath.length-1) - wormSegments[i].size - (i*wormSegments[i].size)].y;
        }

        wormSegments[0].position.x = wormPath[(wormPath.length-1) - (1*wormSegments[i].size)].x;
        wormSegments[0].position.y = wormPath[(wormPath.length-1) - (1*wormSegments[i].size)].y; 
        
        let sliceStart = wormPath.length - ((wormSegments.length * wormSegments[0].size) + 10);

        if (wormPath.length > (wormSegments.length * wormSegments[0].size) * 10)
            wormPath = wormPath.slice(sliceStart);

     
        debug2.innerHTML = "Worm Path Length: " + wormPath.length;
        
        
    }   
}


function AddPointToWormPath(pos)
{
    if (wormPath.length == 0)
    {
        var newPoint = new Vector2(pos.x, pos.y);
        wormPath.push(newPoint);
    }

    if (wormPath.length > 0)
    {
        if (wormPath[wormPath.length-1].x != pos.x || wormPath[wormPath.length-1].y != pos.y)
        {
            var newPoint = new Vector2(pos.x, pos.y);
            wormPath.push(newPoint);
        }                
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
         
    
    RotatePlayer(direction.x, direction.y);

    
}




















function RotatePlayer(dirx, diry)
{
    var deltaX = 0 - dirx;
    var deltaY = 0 - diry;
    var rad = Math.atan2(deltaY, deltaX);

    var degrees = rad * ( 180 / Math.PI)
    
    playerModel.style.transform = `rotate(${degrees-90}deg)`;
}
