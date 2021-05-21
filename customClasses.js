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
    
    direction;
    lastDirection;
    
    nextTurnPoint;
    nextTurnDirection;    

    position;
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