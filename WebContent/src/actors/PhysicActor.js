//  Here is a custom game object
PhysicsActor = function (game, x, y, texture) {
	Phaser.Sprite.call(this, game, x, y, texture);
	this.exists = true;
	this.texture.baseTexture.scaleMode = PIXI.scaleModes.NEAREST;
	
};

PhysicsActor.prototype = Object.create(Phaser.Sprite.prototype);
PhysicsActor.prototype.constructor = PhysicsActor;

PhysicsActor.prototype.init = function() {
	this.game.physics.enable([this],Phaser.Physics.ARCADE);
    this.body.collideWorldBounds = true;
    this.body.gravity.y = 100;
};

PhysicsActor.prototype.update = function() {

};