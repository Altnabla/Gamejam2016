//  Here is a custom game object
Projectile = function (game, x, y, texture) {
	PhysicsActor.call(this,game,x,y,texture);
	
	this.init = function(self)
	{
		Projectile.prototype.init(self);		
		//  Check for the block hitting another object
		self.body.onBeginContact.add(blockHit, self);

	}
};

Projectile.prototype = Object.create(PhysicsActor.prototype);
Projectile.prototype.constructor = Projectile;



function blockHit (body, bodyB, shapeA, shapeB, equation) {

    //  The block hit something.
    //  
    //  This callback is sent 5 arguments:
    //  
    //  The Phaser.Physics.P2.Body it is in contact with. *This might be null* if the Body was created directly in the p2 world.
    //  The p2.Body this Body is in contact with.
    //  The Shape from this body that caused the contact.
    //  The Shape from the contact body.
    //  The Contact Equation data array.
    //  
    //  The first argument may be null or not have a sprite property, such as when you hit the world bounds.
    if (body)
    {
        result = 'You last hit: ' + body.sprite.key;
    }
    else
    {
        result = 'You last hit: The wall :)';
    }

}