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

    RunPlayerObjectSetup();
    score = 0;
    UpdateScoreList();
}