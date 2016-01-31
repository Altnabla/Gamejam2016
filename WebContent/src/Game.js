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
	this.villagers = []; // Array of villagers
    //	You can use any of these from any function within this State.
    //	But do consider them as being 'reserved words', i.e. don't create a property for your own game called "world" or you'll over-write the world reference.
};

BasicGame.Game.prototype = {

  init: function () {
    this.game.renderer.renderSession.roundPixels = true;

  },





	create: function () {
    this.game.world.setBounds(0, 0, 1024 * 6, 1152);
    this.game.stage.backgroundColor = "#43c2ca";
    this.physics.startSystem(Phaser.Physics.P2JS);
  	this.physics.p2.gravity.y = 100;
    this.physics.p2.setImpactEvents(true);
	this.game.bHasEnded = false;
    var altarCollisionGroup = this.game.physics.p2.createCollisionGroup();
    var villagerCollisionGroup = this.game.physics.p2.createCollisionGroup();


    // parallax
    this.parallax_level5 = this.game.add.group();
    this.parallax_level4 = this.game.add.group();
    this.parallax_level3 = this.game.add.group();
    this.parallax_level2 = this.game.add.group();
    this.parallax_level2b = this.game.add.group();
    this.parallax_level2c = this.game.add.group();
    this.parallax_level1 = this.game.add.group();
    this.context_layer = this.game.add.group();

    // parallax level 5: backgorund
    var background = this.game.add.sprite(0, 0, 'l5_tile_01');
    this.parallax_level5.add( background );
    background.fixedToCamera = true;

    var holy_spawn = this.game.add.sprite(0, 0, 'holy_spawn');
    this.parallax_level5.add( holy_spawn );
    holy_spawn.fixedToCamera = true;

    var tween = this.game.add.tween(holy_spawn);
    tween.to({ alpha: 0 }, 5000, 'Linear', true, 0);

    // input
    this.cursors = this.game.input.keyboard.createCursorKeys();

    // player: saucer
    this.saucer = new Saucer(this.game, 100, 100,'spaceship',this);
    this.game.add.existing(this.saucer);
    this.saucer.init(this.saucer);
    this.game.saucer = this.saucer;

    // map

    var re_l2_tile_01 = /l2_tile_01.*/;
    var re_l2_tile_02 = /l2_tile_02.*/;
    var re_spr_altar = /spr_altar.*/;
    var re_spr_ennemy_big_01 = /spr_ennemy_big_01.*/;
    var re_spr_ennemy_small_01 = /spr_ennemy_small_01.*/;
    var re_l3_tile_01 = /l3_tile_01.*/;
    var re_l3_tile_02 = /l3_tile_02.*/;
    var re_l2_tile_03 = /l2_tile_03.*/;
    var re_box = /box.*/;

     var mapJSON = this.game.cache.getJSON('map');
     var mapBoxes = mapJSON.entity[0].obj_info;
     var collideBoxes = {};

     for (var i = 0; i < mapBoxes.length; ++i) {
       collideBoxes[ mapBoxes[ i ].name ] = mapBoxes[ i ];
     }

     var altar_x = 100;

     var mapLayers = mapJSON.entity[0].animation;
     for (var i = 0; i < mapLayers.length; ++i) {
       var layer = mapLayers[ i ];
       for (var j = 0; j < layer.timeline.length; ++j ){
         var element = layer.timeline[ j ];
         var x = element.key[0].object.x ? element.key[0].object.x : 0;
         var y = element.key[0].object.y ? element.key[0].object.y : 0;
         var instance;
         if ( element.name ) {
           if ( element.name.match( re_l3_tile_02 ) ) {
             new ParallaxLevelX( this.game, x, y, 'l3_tile_02', this.parallax_level3, true);
           } else if ( element.name.match( re_l3_tile_01 ) ) {
             new ParallaxLevelX( this.game, x, y, 'l3_tile_01', this.parallax_level3, true);
           } else if ( element.name.match( re_l2_tile_03 ) ) {
             new ParallaxLevelX( this.game, x, y, 'l2_tile_03', this.parallax_level2);
           } else if ( element.name.match( re_l2_tile_01 ) ) {
             new ParallaxLevelX( this.game, x, y, 'l2_tile_01', this.parallax_level2);
           } else if ( element.name.match( re_l2_tile_02 ) ) {
             new ParallaxLevelX( this.game, x, y, 'l2_tile_02', this.parallax_level2);
           } else if ( element.name.match( re_spr_ennemy_big_01 ) || element.name.match( re_spr_ennemy_small_01 ) ) {
             instance = new Villager(this.game,x,y,'spr_ennemy_small_01');
             this.game.add.existing(instance);
             instance.init(instance);
             this.villagers.push( instance );
             this.parallax_level2c.add( instance );
          } else if ( element.name.match( re_box ) ) {
            var box = collideBoxes[ element.name ];
            var scale_x = element.key[0].object.scale_x ? element.key[0].object.scale_x : 1;
            var scale_y = element.key[0].object.scale_y ? element.key[0].object.scale_y : 1;

            var w = Math.abs(box.w * scale_x);
            var h = Math.abs(box.h * scale_y);
            var ry = this.game.world.height-y;
            var rx = x;
            if ( box.w < 0) {
              rx += box.w * scale_x;
            }
            if ( box.h < 0) {
              ry = this.game.world.height - (y + box.h * scale_y);
            }

            var collide_box = new CollideBox(this.game, rx +w/2, ry +h/2, w, h);
          } else if ( element.name.match(re_spr_altar) ) {
            instance = new Altar(this.game, x, this.game.world.height - y);
            instance.y -= instance.height/2;
			instance.y -= 32;
			instance.x += instance.width/2;
            // altar_x = x + instance.width / 2;
            // // instance.x -= instance.width
			this.altar = instance;
            this.game.add.existing(instance);
            this.parallax_level2b.add( instance );
          }
         }
       }
     }


	this.messiah = new Messiah(this.game,this.altar.x,this.altar.y,this);
	this.game.add.existing(this.messiah)
    this.parallax_level2b.add( instance );
	this.messiah.init(this.messiah);

     // start saucer
    this.saucer.body.x = this.altar.x;
    this.saucer.pushDown( this.saucer );


    // camera

    this.game.camera.follow(this.saucer);
	this.game.camera.x=this.saucer.x+this.saucer.width/2;
    this.game.camera.deadzone = new Phaser.Rectangle( 300, 100, 1024 - 600, 768 - 500);

    // Sound Manager
    this.soundManager = new SoundManager(this.game,this);
    this.soundManager.SetVolume(1); // SI le son vous gonfle, c'est ici que ça se passe ;)
    this.soundManager.StartMusic();

    this.soundManager = this.soundManager;

    console.log( this.game);

	},

	update: function ( game ) {

    this.parallax_level3.x = - this.game.camera.x * 0.6;
    this.parallax_level3.y = - this.game.camera.y * 0.6;

    this.parallax_level5.x = - this.game.camera.x * 0.1;
    this.parallax_level5.y = - this.game.camera.y * 0.2;


	var keep = [];
    for (var i = 0; i < this.villagers.length; ++i) {
	  var villager = this.villagers[ i ];
      if (this.checkOverlap(this.altar, this.villagers[ i ]))
      {
        villager.Zombify();
        // console.log( 'Drag the sprites. Overlapping: true' );
      }
      else
      {
		keep.push(villager);
      }
    }

	this.villagers = keep;
	// sound manager update
	this.soundManager.update();

	if (this.villagers.length == 0 && !this.game.bHasEnded){
	  this.end();
	  this.game.bHasEnded = true;
	}


	},


 checkOverlap: function(spriteA, spriteB) {

    var boundsA = spriteA.getBounds();
    var boundsB = spriteB.getBounds();

    return Phaser.Rectangle.intersects(boundsA, boundsB);

},

  __render: function() {

        this.game.debug.cameraInfo(this.game.camera, 32, 32);
        this.game.debug.spriteCoords(this.saucer, 32, 600);

    },

  end: function( ) {
    var font1 = "45px square";
    var font2 = "54px square";
    var labelWinS = this.game.add.text( this.altar.x + 1, 151, "World converted to your cult!", { font: font2, fill: "#000" });
    labelWinS.anchor.setTo(0.5, 0.5);
    var labelWin = this.game.add.text( this.altar.x, 150, "World converted to your cult!", { font: font2, fill: "#33FF33" });
    labelWin.anchor.setTo(0.5, 0.5);


    var labelThanksS = this.game.add.text( this.altar.x + 1, 251, "Thanks for playing", { font: font1, fill: "#000" });
    labelThanksS.anchor.setTo(0.5, 0.5);

    var labelThanks = this.game.add.text( this.altar.x, 250, "Thanks for playing", { font: font1, fill: "#33FF33" });
    labelThanks.anchor.setTo(0.5, 0.5);

    var labelCreditS = this.game.add.text( this.altar.x + 1, 551, "©RaoOol Team / GamJam 2016 - Paris", { font: font1, fill: "#000" });
    labelCreditS.anchor.setTo(0.5, 0.5);


    var labelCredit = this.game.add.text( this.altar.x, 550, "©RaoOol Team / GamJam 2016 - Paris", { font: font1, fill: "#33FF33" });
    labelCredit.anchor.setTo(0.5, 0.5);

    // sound win
    this.soundManager.playSnd_victory();

  },

	quitGame: function (pointer) {
		//	Here you should destroy anything you no longer need.
		//	Stop music, delete sprites, purge caches, free resources, all that good stuff.

		//	Then let's go back to the main menu.
		this.state.start('MainMenu');
	}

};
