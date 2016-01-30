//  Here is a custom game object
Altar = function (game, x, y) {
	Phaser.Sprite.call(this,game,x,y, 'spr_altar');
  this.fixedToCamera = false;

  this.hitAltar = function(altar, villager) {
    villager.sprite.alpha = 0.3;
  };
};

Altar.prototype = Object.create(Phaser.Sprite.prototype);
Altar.prototype.constructor = Altar;
