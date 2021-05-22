function RunPlayerObjectSetup()
{
    SetUpWormHead();

}









function SetUpWormHead()
{
    direction = new Vector2(0,0);
    lastdirection = new Vector2(0,0);

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
}












function AddTailSegment()
{
    var newSegment = new WormSegment();
    newSegment.CreateSegment();

    if (wormSegments.length > 0)
    {
        newSegment.SetDirection(wormSegments[wormSegments.length-1].direction);
        newSegment.SetPosition(new Vector2(wormSegments[wormSegments.length-1].position.x ,wormSegments[wormSegments.length-1].position.y));
    }
    else if (wormSegments.length == 0)
    {
        newSegment.SetDirection(direction);
        newSegment.SetPosition(new Vector2(playerPosition.x, playerPosition.y));
    }            
    
    container.appendChild(newSegment.model);
    wormSegments.push(newSegment);

    UpdatePosition(newSegment.model, newSegment.position);

    console.log("Worm is now " + wormSegments.length + " segments long.");
    
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










function RunFoodSetup()
{
    foodObject = new Food();
    foodObject.CreateFood();
    foodObject.position = new Vector2(200,350);

    container.appendChild(foodObject.object);

    foodObject.object.style.left = GetPixels(foodObject.position.x);
    foodObject.object.style.top = GetPixels(foodObject.position.y);
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
    wormPath = [];

    debug2.innerHTML = "Worm Path Length: ";

    RunPlayerObjectSetup();
    score = 0;
    UpdateScoreList();
}







