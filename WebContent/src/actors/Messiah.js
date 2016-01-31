//  Here is a custom game object
Messiah = function (game, x, y,gameinstance) {
  Phaser.Sprite.call(this,game,x,y, 'spr_ennemy_small_01');
  this.fixedToCamera = false;
  this.anchor.set( 0.5,0.5);
  this.gameinstance = gameinstance;

  
  
  this.init = function(self)
  {
		this.loadTexture('spr_messiah_ritual', 0);
		this.animations.add('messiah');
		this.animations.play('messiah', 6, true);
        this.gameinstance.parallax_level2b.add( self );
		this.y -= 80;
		// this.body.static = true;
  }
  // 
  // game.physics.p2.enable(this);
  // this.body.collideWorldBounds = true;
  // this.body.static = true;
  // this.fixedToCamera = false;
};

Messiah.prototype = Object.create(Phaser.Sprite.prototype);
Messiah.prototype.constructor = Messiah;
