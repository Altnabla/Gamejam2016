ParallaxLevelX = function (game, x, y, texture, group, fixedToCamera) {
	Phaser.Sprite.call(this, game, x, 1152-y, texture);
	this.texture.baseTexture.scaleMode = PIXI.scaleModes.NEAREST;
	this.anchor.set(0.5, 0.5);
  this.fixedToCamera = false;
  game.add.existing( this );
  group.add( this );
};

ParallaxLevelX.prototype = Object.create(Phaser.Sprite.prototype);
ParallaxLevelX.prototype.constructor = ParallaxLevelX;
