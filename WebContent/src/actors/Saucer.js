//  Here is a custom game object
Saucer = function (game, x, y, texture) {
	PhysicsActor.call(this,game,x,y,texture);
	this.currentRotL = 0;
	this.currentRotR = 0;
	
	this.init = function(self)
	{
		Saucer.prototype.init(self);
		self.body.angularAcceleration = 0;
		self.body.maxAngular = 200;
		self.body.drag = 30;
		self.body.angularDrag = 50;
		self.anchor.setTo(0.5, 0.5);
	}
};

Saucer.prototype = Object.create(PhysicsActor.prototype);
Saucer.prototype.constructor = Saucer;

Saucer.prototype.update = function() {

	// this.game.time.elapsed
    //  Apply acceleration if the left/right arrow keys are held down
    if (this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT))
    {
		this.currentRotL += this.game.time.elapsed*0.04; 
    }
    else if (this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT))
    {
		this.currentRotR += this.game.time.elapsed*0.04; 
    }
	else
	{
		if(this.currentRotL > 0)
		{
			this.currentRotL -= this.game.time.elapsed *0.1; 
		}
		if(this.currentRotR > 0)
		{
			this.currentRotR -= this.game.time.elapsed *0.1; 
		}
	}
	if(this.currentRotR > this.currentRotL)
	{
		this.body.rotateRight(this.currentRotR - this.currentRotL);
	}
	else
	{
		this.body.rotateLeft(this.currentRotL - this.currentRotR);
	}

	if (this.game.input.keyboard.isDown(Phaser.Keyboard.UP))
	{
		this.body.thrust(1000);
	}

};