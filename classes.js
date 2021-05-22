class Vector2
{  
    constructor(_x, _y)
    {
        this.x = _x;
        this.y = _y;
    }
}












class WormHead
{
    constructor()
    {

    }

    direction;
    lastDirection;

}












class WormSegment
{
    constructor()
    {
        
    }
    
    position;
    direction;      
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



    SetDirection(_direction)
    {
        this.direction = new Vector2(_direction.x, _direction.y);
    }



    CheckIfCollided(pos, size)
    {
        let playerCenter = new Vector2(pos.x + (size/2), pos.y + (size/2));
        let tolerance = 5;

        if (playerCenter.x > this.position.x + (this.size/tolerance) && playerCenter.x < this.position.x + (this.size - (this.size/tolerance)) &&
            playerCenter.y > this.position.y + (this.size/tolerance) && playerCenter.y < this.position.y + (this.size - (this.size/tolerance))  )
            {
                ResetGame();
            }
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