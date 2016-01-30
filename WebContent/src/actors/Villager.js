//  Here is a custom game object
Villager = function (game, x, y, texture) {
	PhysicsActor.call(this,game,x,y,texture);	
	this.prevX = 0;
	this.NoMovementCount = 0;
	this.bHasStopped = false;
	this.States = {
		IDLE : 0,
		FALLING : 1,
		ZOMBIE : 2,
		ATTACKING : 3
	}
	this.villagerState = this.States.IDLE;

	this.currentDestination = [0,0];
	this.bIsMoving = false;
	this.timeLeft = 0;
	this.speed = 300;
	this.attractedBy = "";
	this.init = function(self)
	{
		Villager.prototype.init(self);
		self.body.angularAcceleration = 0;
		self.body.drag = 30;
		self.anchor.setTo(0.5, 0.5);
	}
	
};

Villager.prototype = Object.create(PhysicsActor.prototype);
Villager.prototype.constructor = Villager;

Villager.prototype.moveTo = function(x,y,timelimit)
{	
	this.currentDestination = [x,y];
	this.bIsMoving = true;
	this.timeLeft = timelimit;
}
Villager.prototype.Idle = function()
{
	var randX = this.x + (-150 + Math.random()*300);
	var randTimeLimit = 5+Math.random()*10;
	this.moveTo(randX,this.y,randTimeLimit);
    this.loadTexture('spr_enemy_idle', 0);
	this.angle = 0;
    this.animations.add('idle');
    this.animations.play('idle', 3, true);
	this.body.rotation = 0;
}

Villager.prototype.attract = function(saucerbeam) {
	this.attractedBy = saucerbeam;
    var angle = Math.atan2(saucerbeam.y - this.y, saucerbeam.x - this.x);
    // this.body.rotation = angle + this.game.math.degToRad(90); 
    this.body.force.x = Math.cos(angle) * this.speed;    // accelerateToObject 
    this.body.force.y = Math.sin(angle) * this.speed;
}

Villager.prototype.PlayFallingAnimation = function(bIsOn)
{
	this.loadTexture('spr_enemy_idle', 0);
    this.animations.add('idle');
    this.animations.play('idle', 3, true);

}

Villager.prototype.update = function() {

	if(this.attractedBy != "")
	{
		var saucerbeam = this.attractedBy;
		var distX = saucerbeam.x-this.x;
		var distY = saucerbeam.y-this.y;
		var active = saucerbeam.emitter.on;
		if(active)
		{
			this.villagerState = this.States.FALLING;
			// this.body.angularRotation += Math.random();
			if(Math.abs(distX) < 250 && Math.abs(distY) < 250)
			{
				var angle = Math.atan2(saucerbeam.y - this.y, saucerbeam.x - this.x);
				this.body.force.x = Math.cos(angle) * 225;    // accelerateToObject 
				this.body.force.y = Math.sin(angle) * 225;	
			}
		}
		else
		{
			this.attractedBy = "";	
			this.villagerState = this.States.IDLE;
		}
	}	
	//Dirty AI
	if(this.villagerState == this.States.IDLE && this.bIsMoving == false)
	{
		this.Idle();
	}
	// Update Movement
	if(this.bIsMoving)
	{
		if(this.timeleft < 0 || this.bHasStopped)
		{
			this.bIsMoving = false;
		}
		if(this.x < this.currentDestination[0]-25)
		{
			this.body.moveRight(50);
		}
		else if (this.x > this.currentDestination[0]+15)
		{
			this.body.moveLeft(50);
		}
		else
		{
			this.bIsMoving = false;
		}
		 this.timeleft -= 100/this.game.time.elapsed;
	}
	if(Math.abs(this.prevX-this.x) < 1)
	{
		this.NoMovementCount++;
		if(this.NoMovementCount > 3)
		{
			this.bHasStopped = true;
		}
	}
	else
	{
		this.prevX = this.x;
		this.NoMovementCount = 0;
		this.bHasStopped = false;
	}
};
