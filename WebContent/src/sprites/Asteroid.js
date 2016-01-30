var Asteroid = function (game) {
  Phaser.Sprite.call(this, game, 0, 0, 'grey-asteroid-rotation');
  this.texture.baseTexture.scaleMode = PIXI.scaleModes.NEAREST;
  // this.checkWorldBounds = true;
  // this.outOfBoundsKill = true;
  this.exists = true;

  this.animations.add('grey-asteroid-rotation');

  this.animations.play('grey-asteroid-rotation', 18, true);
  this.x = Math.random( ) * this.game.width;
};

Asteroid.prototype = Object.create(Phaser.Sprite.prototype);

Asteroid.prototype.constructor = Asteroid;

Asteroid.prototype.update = function () {
  this.y += 0.1 * this.game.time.elapsed;
  if ( this.y > 768) {
    this.y = 0;
    this.x = Math.random( ) * this.game.width;
  }
};
