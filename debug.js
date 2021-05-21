function UpdateDebug()
{
    debug.innerHTML = "X: " + playerPosition.x + ". Y: " + playerPosition.y + "." + '<p></p>' + "FoodX: " + foodObject.position.x + ". FoodY: " + foodObject.position.y + "." + '<p></p>' + "Speed: " + playerCurrentSpeed + '<p></p>' + '<p></p>' + "Spawn Pos: " + spawnPosition.x + "," + spawnPosition.y;
}