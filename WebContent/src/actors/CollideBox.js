//  Here is a custom game object
CollideBox = function (game, x, y, w, h) {
  var bmd = game.add.bitmapData(w, h);
  bmd.ctx.rect(0, 0, w, h);
  bmd.ctx.fillStyle = "#0f0";
  bmd.ctx.fill();
	Phaser.Sprite.call(this,game,x,y,bmd);

  game.physics.p2.enable(this);
  this.body.collideWorldBounds = true;
  this.body.static = true;
  this.fixedToCamera = false;
  this.alpha = 0.3;
};

CollideBox.prototype = Object.create(Phaser.Sprite.prototype);
CollideBox.prototype.constructor = CollideBox;
