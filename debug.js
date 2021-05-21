function UpdateDebug()
{
    debug.innerHTML = "X: " + playerPosition.x + ". Y: " + playerPosition.y + "." + '<p></p>' + "FoodX: " + foodObject.position.x + ". FoodY: " + foodObject.position.y + "." + '<p></p>' + "Speed: " + playerCurrentSpeed + '<p></p>' + '<p></p>' + "Spawn Pos: " + spawnPosition.x + "," + spawnPosition.y;
    debug2.innerHTML = "Direction X: " + direction.x + " - " + "Direction Y: " + direction.y + '<p></p>' + "Tail Direction X: " + wormSegments[0].direction.x + " - " + "Tail Direction Y: " + wormSegments[0].direction.y + '<p></p>' + "Tail Turn Point X: " + wormSegments[0].nextTurnPoint.x + " - " +  "Tail Turn Point Y: " + wormSegments[0].nextTurnPoint.y; 
}