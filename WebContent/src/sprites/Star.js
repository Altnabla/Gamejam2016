var Star = function (game) {
  Phaser.Sprite.call(this, game, 0, 0, 'star');
  this.texture.baseTexture.scaleMode = PIXI.scaleModes.NEAREST;
  this.checkWorldBounds = true;
  this.outOfBoundsKill = true;
  this.exists = false;
};

Star.prototype = Object.create(Phaser.Sprite.prototype);

Star.prototype.constructor = Star;

Star.prototype.spawn = function () {
    var gameWidth = 1024;
    this.velocity = Math.random( ) * 0.6;
    this.alpha = this.velocity * 2;

    var x = Math.floor( Math.random( ) * gameWidth);
    this.reset(x, 0);
    this.scale.set(1);
};


Star.prototype.update = function () {
  this.y += this.velocity * this.game.time.elapsed;
};
