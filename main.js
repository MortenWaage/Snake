var viewWidth = 800;
var viewHeight = 640;

var debug;

//var spawnPosition = new Vector2(300,200);

var playerObject;
var playerSprite = "playerSprite.png"; 
var playerModel;
var playerSize = 30;

var dirx = 0;
var diry = 0;

var x = 200;
var y = 100;


var playerCurrentSpeed = 0;
var playerMaxSpeed = 5;
var playerDirection = new Vector2(0,0);


var container;


var deltaTime;
var frameRate = 30;




// Initial Config
function Init()
{
    deltaTime = frameRate/60;

    

    container = document.getElementById("renderArea");

    document.addEventListener("keydown", GetPlayerInput);


    playerObject = document.createElement('div');
    playerModel = document.createElement('div');
    //playerModel = document.createElement('IMG');
    //playerModel.scr = "playerSprite.png";

    playerModel.textContent = "O_O";    
    playerObject.className = 'playerModel';
    playerModel.className = 'playerModel';

       
    container.appendChild(playerObject); 
    playerObject.appendChild(playerModel);
    
     

    debug = document.getElementById("debug");

    Start();
}




// Start the Application
function Start()
{

    setInterval(Update, frameRate/1000);

}



// View
function Update()
{   

    SetPlayerDirectionAndSpeed();

    SetPlayerPosition(x,y); 

    CheckCollisions();

    UpdateDebug();

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



function GetPixels(value)
{
    return value.toString() + "px";
}

function CheckCollisions()
{

    //Left
    if (x < 0 + playerSize)
    {
        playerObject.style.left = GetPixels(0+playerSize);
        dirx = 0;
    }
    //Right
    if (x > viewWidth - playerSize)
    {
        playerObject.style.left = GetPixels(viewWidth-playerSize);
        dirx = 0;
    }
    //Top
    if (y < 0 + playerSize)
    {
        playerObject.style.top = GetPixels(0+playerSize);
        diry = 0;
    }
    //Bottom
    if (y > viewHeight - playerSize)
    {
        playerObject.style.top = GetPixels(viewHeight-playerSize);
        diry = 0;
    }
}











function UpdateDebug()
{
    debug.innerHTML = "X: " + dirx + ". Y: " + diry + ".";
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
    
}