//  Here is a custom game object
PhysicsActor = function (game, x, y, texture) {
	Phaser.Sprite.call(this, game, x, y, texture);
	this.exists = true;
	this.texture.baseTexture.scaleMode = PIXI.scaleModes.NEAREST;
	this.anchor.set( 0.5 );
};

PhysicsActor.prototype = Object.create(Phaser.Sprite.prototype);
PhysicsActor.prototype.constructor = PhysicsActor;

PhysicsActor.prototype.init = function(self) {
	self.game.physics.p2.enable(self);
    self.body.collideWorldBounds = true;
};

PhysicsActor.prototype.update = function() {

};