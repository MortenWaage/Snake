var container;

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
var wormPath = [];

var spawnPosition;
var playerPosition;
var playerSize = 32;

var playerDefaultSpeed = 40;
var playerCurrentSpeed;
var playerMaxSpeed = 60;


var direction;

var score = 0;
var topScore = 0;
var scoreBoard;

var deltaTime;
var frameRate = 20;










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

        wormSegments[0].position.x = wormPath[(wormPath.length-1) - (1*wormSegments[0].size)].x;
        wormSegments[0].position.y = wormPath[(wormPath.length-1) - (1*wormSegments[0].size)].y;         
        

        if (wormPath.length > (wormSegments.length * wormSegments[0].size) * 2)
        {
            let sliceStart = wormPath.length - ((wormSegments.length * wormSegments[0].size) + 50);
            wormPath = wormPath.slice(sliceStart);
        }             
    }  

    debug2.innerHTML = "Worm Path Length: " + wormPath.length;       
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
        if (wormPath[wormPath.length-1].position != pos)
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
        wormSegments[i].CheckIfCollided(playerPosition, playerSize);
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
    scoreBoard.innerHTML = "Score: " + score.toString() + '<p></p><p></p>' + "Best Score: " + topScore.toString();;
}








function CheckWallCollision()
{
    if (playerPosition.x < 0 ||
        playerPosition.x > viewWidth - playerSize ||
        playerPosition.y < 0 ||
        playerPosition.y > viewHeight - playerSize )     
    {
        ResetGame();
    }    
}







function GetPlayerInput(e)
{

    if(e.code == "KeyW" || e.code == "ArrowUp")
    {
        if (direction.y != 1)
        {
            direction.x = 0;
            direction.y = -1;
        }    
    }
    if(e.code == "KeyS" || e.code == "ArrowDown")
    {
        if (direction.y != -1)
        {
            direction.x = 0;
            direction.y = 1;
        }
    }
    if(e.code == "KeyA" || e.code == "ArrowLeft")
    {
        if (direction.x != 1)
        {
            direction.x = -1;
            direction.y = 0;
        }
    }
    if(e.code == "KeyD" || e.code == "ArrowRight")
    {
        if (direction.x != -1)
        {
            direction.x = 1;
            direction.y = 0;
        }

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
