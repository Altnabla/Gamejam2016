//  Here is a custom game object
Saucer = function (game, x, y, texture, gameinstance) {
	PhysicsActor.call(this,game,x,y,texture);
	this.currentRotL = 0;
	this.currentRotR = 0;
	this.currentAttractPointX = 0;
	this.currentAttractPointY = 0;
	this.emitter	 = "NULL";
	this.gameinstance = gameinstance;
	this.init = function(self)
	{
		Saucer.prototype.init(self);
		self.body.angularAcceleration = 0;
		self.body.maxAngular = 200;
		self.body.drag = 30;
		self.body.angularDrag = 50;
		self.anchor.setTo(0.5, 0.5);
		self.emitter = self.game.add.emitter(self.x,self.y, 200);
	    self.emitter.makeParticles('fx_ray');
		self.emitter.setAlpha(1, 0, 2000);
		self.emitter.setScale(0.0, 2, 1, 1, 2000);



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
	    var px = 64 *Math.cos(rad);
		var py = 64 *Math.sin(rad);
		this.emitter.minRotation = this.angle;
		this.emitter.maxRotation = this.angle;
		var originX = this.x + px;
		var originY = this.y + py;
		var tbeamX = this.x + 150 * Math.cos(rad);
		var tbeamY = this.y + 150 * Math.sin(rad);
		this.currentAttractPointX = originX;
		this.currentAttractPointY = originY;
		this.emitter.emitX = originX;
		this.emitter.emitY = originY;
		this.emitter.minParticleSpeed.set(5*px, 5*py);
		this.emitter.maxParticleSpeed.set(5*px, 5*py);
		this.emitter.on = true;
		var div = 8;
		var pxL = 800 * Math.cos(rad - Math.PI/div);
		var pyL = 800 * Math.sin(rad - Math.PI/div);
		var pxR = 800 * Math.cos(rad + Math.PI/div);
		var pyR = 800 * Math.sin(rad + Math.PI/div);
		var graphics = this.game.add.graphics(0, 0);
		var poly = new Phaser.Polygon([ new Phaser.Point(originX,originY), new Phaser.Point(this.x+pxL, this.y+pyL), new Phaser.Point(this.x+pxR, this.y+pyR)]);
		// graphics.clear();
		// graphics.beginFill(0xFF33ff);
		 // graphics.drawPolygon(poly.points);
		 // graphics.endFill();
		for (index = 0; index < this.gameinstance.villagers.length; ++index) {
			var vil = this.gameinstance.villagers[index];
			if (poly.contains(vil.x, vil.y))
			{
				vil.attract(this);
			}
		}
	}
	else
	{
		this.emitter.on = false;
	}
}

Saucer.prototype.update = function() {

	// this.game.time.elapsed
    //  Apply acceleration if the left/right arrow keys are held down
	// console.log(this.angle)
	if(this.angle > 60 || this.angle <	-60)
	{
		this.currentRotL = 0;
		this.currentRotR = 0;
	}
    if (this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT) && this.angle > -60)
    {
		this.currentRotL = 30;
    }
    else if (this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT) && this.angle < 60)
    {
		this.currentRotR = 30;
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
		this.body.thrust(600);
	} else if (this.game.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {
	  this.body.thrust( -600 );
	} else {
		this.body.thrust(100);
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
