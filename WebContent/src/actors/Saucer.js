//  Here is a custom game object
Saucer = function (game, x, y, texture) {
	PhysicsActor.call(this,game,x,y,texture);
	this.currentRotL = 0;
	this.currentRotR = 0;
	this.emitter	 = "NULL";
	this.init = function(self)
	{
		Saucer.prototype.init(self);
		self.body.angularAcceleration = 0;
		self.body.maxAngular = 200;
		self.body.drag = 30;
		self.body.angularDrag = 50;
		self.anchor.setTo(0.5, 0.5);
		self.emitter = self.game.add.emitter(self.x,self.y, 200);
	    self.emitter.makeParticles('bullet');
		self.emitter.setAlpha(1, 0, 3000);
		self.emitter.setScale(0.0, 2, 0, 2, 3000);

		// self.emitter.gravity = 600;

		//	false means don't explode all the sprites at once, but instead release at a rate of one particle per 100ms
		//	The 5000 value is the lifespan of each particle before it's killed
		self.emitter.start(false, 5000, 100);
	}
};

Saucer.prototype = Object.create(PhysicsActor.prototype);
Saucer.prototype.constructor = Saucer;

Saucer.prototype.ToggleTractorBeam = function(bActivate)
{
	if(bActivate)
	{
		var rad = ((this.angle)* Math.PI / 180)+Math.PI/2;
	    var px = 50 *Math.cos(rad);
		var py = 50 *Math.sin(rad);
		console.log(px);
		console.log(py);
		this.emitter.emitX = this.x + px;
		this.emitter.emitY = this.y + py;
		this.emitter.minParticleSpeed.set(10*px, 10*py);
		this.emitter.maxParticleSpeed.set(10*px, 10*py);

		this.emitter.on = true;
	}
	else
	{
		this.emitter.on = false;	
	}
}

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
	if (this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR))
	{
		this.ToggleTractorBeam(true);
	}
	else
	{
		this.ToggleTractorBeam(false);
	}
};