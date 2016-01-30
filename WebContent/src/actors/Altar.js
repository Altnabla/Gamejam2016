//  Here is a custom game object
Altar = function (game, x, y) {
	Phaser.Sprite.call(this,game,x,y - 105, 'spr_altar');
  this.fixedToCamera = false;

  game.physics.p2.enable(this);
  this.body.collideWorldBounds = true;
  this.body.static = true;
  this.fixedToCamera = false;

  this.hitAltar = function(altar, villager) {
    villager.sprite.alpha = 0.3;
  };
};

Altar.prototype = Object.create(Phaser.Sprite.prototype);
Altar.prototype.constructor = Altar;
