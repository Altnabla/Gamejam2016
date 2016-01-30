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
  },

	create: function () {
    this.game.world.setBounds(0, 0, 1024 * 6, 768 * 1.5);
    this.physics.startSystem(Phaser.Physics.P2JS);
  	this.physics.p2.gravity.y = 200;

    // var test = new Props(this.game,100,100,'star');
    // this.game.add(test);
    // test.init();

    this.parallax_level5 = this.game.add.group();
    this.parallax_level4 = this.game.add.group();
    this.parallax_level3 = this.game.add.group();
    this.parallax_level2 = this.game.add.group();
    this.parallax_level1 = this.game.add.group();

    var background = this.game.add.tileSprite(0, 0, 1024, 768, 'l5_tile_01');
    background.fixedToCamera = true;

    this.cursors = this.game.input.keyboard.createCursorKeys();

    var saucer = new Saucer(this.game,100,100,'spaceship');
    this.game.add.existing(saucer);
    saucer.init(saucer);

    this.game.camera.follow(saucer);

    console.log( this.game);
	},

	update: function ( game ) {

	},

	quitGame: function (pointer) {
		//	Here you should destroy anything you no longer need.
		//	Stop music, delete sprites, purge caches, free resources, all that good stuff.

		//	Then let's go back to the main menu.
		this.state.start('MainMenu');

	}

};
