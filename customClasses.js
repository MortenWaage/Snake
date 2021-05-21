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
    lastPosition;

    direction;
    offset;     
    
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
        this.offset = new Vector2(0,0);
    }

    SetPosition(pos)
    {
        this.position = pos;
    }

    CalculateOffsetAndDirection(_direction)
    {
        console.log(_direction.x);
        console.log(_direction.y);
        this.offset.x = this.size * _direction.x;
        this.offset.y = this.size * _direction.y;
        this.direction = new Vector2(_direction.x, _direction.y);
    }
    CalculateDirection()
    {
        var xDiff = this.position - this.lastPosition;
        var yDiff = this.position - this.lastPosition;

        if (Math.abs(xDiff > Math.abs(yDiff)))
        {
            this.direction.y = 0;
            if (xDiff < 0)
                this.direction.x = -1;
            else
                this.direction.x = 1;
        }
        else
        {
            this.direction.x = 0;
            if (yDiff < 0)
                this.direction.y = -1;
            else
                this.direction.y = 1;
        }

        this.offset.x = this.direction.x * this.size;
        this.offset.y = this.direction.y * this.size;

        console.log(this.offset.x + "/" + this.offset.y);
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