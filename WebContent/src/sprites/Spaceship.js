var Spaceship = function (game) {
  Phaser.Sprite.call(this, game, 0, 0, 'spaceship');
  this.texture.baseTexture.scaleMode = PIXI.scaleModes.NEAREST;
  this.checkWorldBounds = true;
  // this.outOfBoundsKill = true;
  // this.exists = false;
  this.anchor.set( 0.5 );
};

Spaceship.prototype = Object.create(Phaser.Sprite.prototype);

Spaceship.prototype.constructor = Spaceship;

Spaceship.prototype.spawn = function () {
  // console.log('spawn');
  // console.log(this);
    // this.exists = true;
    this.x = this.game.width / 2;
    this.y = this.game.height - 150;

    this.game.add.tween(this).from( { y: this.game.height + 200 }, 2000, Phaser.Easing.Bounce.Out, true);

    this.cursors = this.game.input.keyboard.createCursorKeys();
};


Spaceship.prototype.update = function () {
  if ( this.cursors.up.isDown ) {
    this.y -= this.game.time.elapsed;
    this.angle = 0;
  } else if ( this.cursors.down.isDown ) {
    this.angle = 0;
    this.y += this.game.time.elapsed;
  }

  if ( this.cursors.left.isDown ) {
    this.x -= this.game.time.elapsed;
    this.angle = -10;
  } else if ( this.cursors.right.isDown ) {
    this.angle = 10;
    this.x += this.game.time.elapsed;
  }

  var rotate_friction = 0.03 * this.game.time.elapsed;
  if (this.angle > 0) {
    this.angle = Math.max( this.angle - rotate_friction, 0 );
  } else if (this.angle < 0) {
    this.angle = Math.min( this.angle + rotate_friction, 0 );
  }
};
