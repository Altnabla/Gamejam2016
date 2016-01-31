//  Here is a custom game object
Altar = function (game, x, y) {
	Phaser.Sprite.call(this,game,x,y, 'l2a_altar');
  this.fixedToCamera = false;
  this.anchor.set( 0.5 );

  //
  // game.physics.p2.enable(this);
  // this.body.collideWorldBounds = true;
  // this.body.static = true;
  // this.fixedToCamera = false;
};

Altar.prototype = Object.create(Phaser.Sprite.prototype);
Altar.prototype.constructor = Altar;
