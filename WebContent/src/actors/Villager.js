//  Here is a custom game object
Villager = function (game, x, y, texture) {
	PhysicsActor.call(this,game,x,y,texture);
	this.prevX = 0;
	this.prevY = 0;
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
	if(this.x < this.currentDestination[0])
	{
		this.scale.x *= -1;
	}
}
Villager.prototype.Idle = function()
{
	if(this.timeLeft <= 0)
	{
		if(Math.random() > 0.5)
		{
			var randX = this.x + (-150 + Math.random()*300);
			var randTimeLimit = 5+Math.random()*10;
			this.moveTo(randX,this.y,randTimeLimit);
			this.loadTexture('spr_enemy_walk', 0);
			this.angle = 0;
			this.animations.add('walk');
			this.animations.play('walk', 8, true);
		}
		else
		{
			this.loadTexture('spr_enemy_idle', 0);
			this.angle = 0;
			this.animations.add('idle');
			this.animations.play('idle', 8, true);
			this.timeLeft = 10+Math.random()*5;
		}
		this.body.rotation = 0;
	}
}

Villager.prototype.Shoot = function(x,y)
{
	var projectile = new Projectile(this.game,this.x,this.y-50,'',this);
    this.game.add.existing(projectile);
	projectile.init(projectile);
	var pjspeed = 150;
	projectile.body.force.x = (x-this.x) * pjspeed;    // accelerateToObject
	projectile.body.force.y = (y-this.y) * pjspeed;
	projectile.loadTexture('spr_bullet_01', 0);
	projectile.angle = 0;
	projectile.animations.add('projectile');
	projectile.animations.play('projectile', 8, true);	

}

Villager.prototype.attract = function(saucerbeam) {
	this.attractedBy = saucerbeam;
    var angle = Math.atan2(saucerbeam.y - this.y, saucerbeam.x - this.x);
    // this.body.rotation = angle + this.game.math.degToRad(90);
    this.body.force.x = Math.cos(angle) * this.speed;    // accelerateToObject
    this.body.force.y = Math.sin(angle) * this.speed;

}

Villager.prototype.PlayFallingAnimation = function()
{
	this.loadTexture('spr_enemy_falling', 0);
    this.animations.add('falling');
    this.animations.play('falling', 8, true);
}

Villager.prototype.update = function() {

	if(this.villagerState == this.States.ZOMBIE)
	{
		// Pray
		return;
	}
	if(this.attractedBy != "")
	{
		var saucerbeam = this.attractedBy;
		var distX = saucerbeam.x-this.x;
		var distY = saucerbeam.y-this.y;
		var active = saucerbeam.emitter.on;
		if(active)
		{
			if(this.villagerState != this.States.FALLING)
			{
				this.villagerState = this.States.FALLING;
				this.PlayFallingAnimation();
			}
			// this.body.angularRotation += Math.random();
			if(Math.abs(distX) < 250 && Math.abs(distY) < 250)
			{
				var angle = Math.atan2(saucerbeam.y - this.y, saucerbeam.x - this.x);
				this.body.force.x = Math.cos(angle) * this.speed;    // accelerateToObject
				this.body.force.y = Math.sin(angle) * this.speed;
			}
			else
			{
				this.attractedBy = "";
				this.villagerState = this.States.IDLE;
			}
		}
		else
		{
			this.attractedBy = "";
			this.villagerState = this.States.IDLE;
		}
	}

	else
	{
		if(Math.abs(this.y-this.prevY) > 0.1)
		{
			if(this.villagerState != this.States.FALLING)
			{
				this.villagerState = this.States.FALLING;
				this.PlayFallingAnimation();
			}
			this.prevY = this.y;
		}
		else
		{
			this.villagerState = this.States.IDLE;
		}
	}


	// Update Movement
	if(this.bIsMoving)
	{
		if(this.timeLeft < 0 || this.bHasStopped)
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
	}
	if(this.timeLeft > 0)
	{
		this.timeLeft -= this.game.time.elapsed/100;
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
	if(this.villagerState == this.States.IDLE && this.bIsMoving == false)
	{
		if(Math.abs(this.game.saucer.x - this.x) < 300 && Math.abs(this.game.saucer.y - this.y) < 300 && this.timeLeft <= 0)
		{
			this.Shoot(this.game.saucer.x,this.game.saucer.y);
			this.timeLeft = 30;
		}
		else
		{
			this.Idle();
		}
	}

};
