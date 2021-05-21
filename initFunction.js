function RunPlayerObjectSetup()
{
    SetUpWormHead();

    SetUpFirstWormTailSegment();

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











function SetUpFirstWormTailSegment()
{
    var newSegment = new WormSegment();
    newSegment.CreateSegment();

    newSegment.direction = new Vector2(direction.x, direction.y);
    newSegment.lastDirection = new Vector2(direction.x, direction.y);
    newSegment.nextTurnDirection = new Vector2(0,0);

    newSegment.SetPosition(new Vector2(playerPosition.x, playerPosition.y - newSegment.size));
    UpdatePosition(newSegment.model, newSegment.position);

    newSegment.nextTurnPoint = new Vector2(playerPosition.x, playerPosition.y);
    wormSegments.push(newSegment);
    container.appendChild(newSegment.model);
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
    foodObject.position = new Vector2(300,200);

    container.appendChild(foodObject.object);
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
    UpdateScoreList();
}