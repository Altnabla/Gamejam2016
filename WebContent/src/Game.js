BasicGame.Game = function (game) {

	//	When a State is added to Phaser it automatically has the following properties set on it, even if they already exist:

    this.game;		//	a reference to the currently running game
    this.add;		//	used to add sprites, text, groups, etc
    this.camera;	//	a reference to the game camera
    this.cache;		//	the game cache
    this.input;		//	the global input manager (you can access this.input.keyboard, this.input.mouse, as well from it)
    this.load;		//	for preloading assets
    this.math;		//	lots of useful common math operations
    this.sound;		//	the sound manager - add a sound, play one, set-up markers, etc
    this.stage;		//	the game stage
    this.time;		//	the clock
    this.tweens;	//	the tween manager
    this.world;		//	the game world
    this.particles;	//	the particle manager
    this.physics;	//	the physics manager
    this.rnd;		//	the repeatable random number generator

    //	You can use any of these from any function within this State.
    //	But do consider them as being 'reserved words', i.e. don't create a property for your own game called "world" or you'll over-write the world reference.

    this.starSpawnTimer = 0;
    this.starSpawnFrequency = 10; // in ms
    this.stars = [];
};

BasicGame.Game.prototype = {

  init: function () {
    this.game.renderer.renderSession.roundPixels = true;
    this.physics.startSystem( Phaser.Physics.ARCADE );
  },

	create: function () {
		//	Honestly, just about anything could go here. It's YOUR game after all. Eat your heart out!

  	// var test = new Props(this.game,100,100,'star');
  	// this.game.add(test);
  	// test.init();
    this.game.world.setBounds(0, 0, 1024 * 6, 768 * 1.5);
    //this.game.add.tileSprite( 0, 0, 1024 * 6, 768, 'plan_placeholder_1');
    for ( var i = 1; i < 6; ++i ) {
      var f = i - 1;
      var p = this.game.add.tileSprite( f * 1024, 0, 1024, 768, 'plan_placeholder_' + i);
      // p.tilePosition.x = f * 1024;
      console.log( p );

      // this.load.image( 'plan_placeholder_' + i, 'images/parallax/plan_placeholder_' + i + '.png' );
    }
    this.cursors = this.game.input.keyboard.createCursorKeys();
    console.log( this.game);
	},

	update: function ( game ) {
    if (this.cursors.up.isDown)
    {
        this.game.camera.y -= 4;
    }
    else if (this.cursors.down.isDown)
    {
        this.game.camera.y += 4;
    }

    if (this.cursors.left.isDown)
    {
      console.log( 'left' );
        this.game.camera.x -= 4;
    }
    else if (this.cursors.right.isDown)
    {
      console.log( 'right' );
        this.game.camera.x += 4;
    }
	},

	quitGame: function (pointer) {
		//	Here you should destroy anything you no longer need.
		//	Stop music, delete sprites, purge caches, free resources, all that good stuff.

		//	Then let's go back to the main menu.
		this.state.start('MainMenu');

	}

};
