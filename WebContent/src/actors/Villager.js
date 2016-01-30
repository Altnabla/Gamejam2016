//  Here is a custom game object
Villager = function (game, x, y, texture) {
	PhysicsActor.call(this,game,x,y,texture);
	
	this.States = {
		IDLE : 0,
		FALLING : 1,
		ZOMBIE : 2
	}
	this.villagerState = this.States.IDLE;
	
	this.currentDestination = [0,0];
	this.bIsMoving = false;
	this.timeLeft = 0;
	
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
	var randY = 150 - Math.random()*300;
	randY += this.y;
	var randTimeLimit = 5+Math.random()*10;
	moveTo(x,randY,randTimeLimit);
}

Villager.prototype.update = function() {
	//Dirty AI
	
	if(this.villagerState == this.States.IDLE && this.bIsMoving = false)
	{
		this.Idle();
	}
	
	// Update Movement
	if(this.bIsMoving)
	{
		if(this.y < currentDestination.y - 5 && timeleft > 0)
		{
			this.body.moveLeft(this.game.time.elapsed);
		}
		else if (this.y > currentDestination.y + 5 && timeleft > 0)
		{
			this.body.moveRight(this.game.time.elapsed);
		}
		else
		{
			this.bIsMoving = false;
		}
		timeleft -= this.game.time.elapsed;
	}
};