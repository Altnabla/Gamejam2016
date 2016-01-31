//  Here is a custom game object
Saucer = function (game, x, y, texture, gameinstance) {
	PhysicsActor.call(this,game,x,y,texture);
	this.currentRotL = 0;
	this.currentRotR = 0;
	this.currentAttractPointX = 0;
	this.currentAttractPointY = 0;
	this.emitter	 = "NULL";
	this.gameinstance = gameinstance;
	this.GameOverTimeLeft = 300;
	this.TimeLeftText = game.add.text( 100, 700, " 5 min 0 sec before running out of fuel", { font: "30px square", fill: "#FFFFFF" });
	
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
		self.TimeLeftText.fixedToCamera = true;
		    //  Create our Timer
		var timer = self.game.time.create(false);

		//  Set a TimerEvent to occur after 2 seconds
		timer.loop(1000, this.decrTimeleft, this);

		//  Start the timer running - this is important!
		//  It won't start automatically, allowing you to hook it to button events and the like.
		timer.start();

		// self.emitter.gravity = 600;

		//	false means don't explode all the sprites at once, but instead release at a rate of one particle per 100ms
		//	The 5000 value is the lifespan of each particle before it's killed
		self.emitter.start(false, 5000, 100);
	};

	this.pushDown = function(self) {
		self.body.thrust( -10000 );
	};

	this.hitten = function(self) {
		console.log('hitten');
		Phaser.Easing.Bounce.InOut

		var tween = this.game.add.tween(self);
		tween.from({ alpha: 0.5 }, 100, Phaser.Easing.Bounce.InOut, true, 0);
	};
	
	this.decrTimeleft = function()
	{
		this.GameOverTimeLeft--;
		console.log(this.GameOverTimeLeft);
		var min = Math.floor(this.GameOverTimeLeft/60);
		var sec = this.GameOverTimeLeft%60;
		if(this.GameOverTimeLeft == -1)
		{
			this.game.paused = true;
		}
		else if(this.GameOverTimeLeft == 0)
		{
			// PERDU
			this.TimeLeftText.setText("");
			this.GameOver();
			this.game.paused = true;

		}
		else
		{
			this.TimeLeftText.setText(min + " min "+ sec + " sec before running out of fuel");
			// this.game.time.events.add(Phaser.Timer.SECOND * 1, self.decrTimeleft, self);
		}
		
	};
	this.GameOver = function( ) {
		var font1 = "45px square";
		var font2 = "54px square";
		var labelWinS = this.game.add.text( this.game.camera.x + window.innerWidth/2, 151, "You ran out of fuel !", { font: font2, fill: "#000" });
		labelWinS.anchor.setTo(0.5, 0.5);
		var labelWin = this.game.add.text( this.game.camera.x + window.innerWidth/2, 150, "You ran out of fuel !", { font: font2, fill: "#33FF33" });
		labelWin.anchor.setTo(0.5, 0.5);
		
		var labelThanksS = this.game.add.text( this.game.camera.x + window.innerWidth/2 , 251, "Thanks for playing", { font: font1, fill: "#000" });
		labelThanksS.anchor.setTo(0.5, 0.5);

		var labelThanks = this.game.add.text( this.game.camera.x + window.innerWidth/2, 250, "Thanks for playing", { font: font1, fill: "#33FF33" });
		labelThanks.anchor.setTo(0.5, 0.5);

		var labelCreditS = this.game.add.text( this.game.camera.x + window.innerWidth/2, 551, "©RaoOol Team / GamJam 2016 - Paris", { font: font1, fill: "#000" });
		labelCreditS.anchor.setTo(0.5, 0.5);

		var labelCredit = this.game.add.text( this.game.camera.x + window.innerWidth/2, 550, "©RaoOol Team / GamJam 2016 - Paris", { font: font1, fill: "#33FF33" });
		labelCredit.anchor.setTo(0.5, 0.5);
		
		labelWinS.fixedToCamera = true;
		labelWin.fixedToCamera = true;
		labelThanksS.fixedToCamera = true;
		labelThanks.fixedToCamera = true;
		labelCreditS.fixedToCamera = true;
		labelCredit.fixedToCamra = true;
		
	};
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
		// snd
		this.gameinstance.soundManager.playSnd_soucoupe_move();
	} else if (this.game.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {
	  this.body.thrust( -600 );
	  // snd
		this.gameinstance.soundManager.playSnd_soucoupe_move();
	} else {
		this.body.thrust(100);
		// snd
		this.gameinstance.soundManager.stopSnd_soucoupe_move();
	}
	if (this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR))
	{
		this.ToggleTractorBeam(true);
		// snd
		this.gameinstance.soundManager.playSnd_soucoupe_rayon();
	}
	else
	{
		this.ToggleTractorBeam(false);
		// snd
		this.gameinstance.soundManager.stopSnd_soucoupe_rayon();
	}
};
