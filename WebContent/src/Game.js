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

    this.starSpawnTimer = 0;
    this.starSpawnFrequency = 10; // in ms
    this.stars = [];
};

BasicGame.Game.prototype = {

  init: function () {
    this.game.renderer.renderSession.roundPixels = true;
  },

	create: function () {
    this.game.world.setBounds(0, 0, 1024 * 4, 1152);
    this.physics.startSystem(Phaser.Physics.P2JS);
  	this.physics.p2.gravity.y = 200;

    // parallax
    this.parallax_level5 = this.game.add.group();
    this.parallax_level4 = this.game.add.group();
    this.parallax_level3 = this.game.add.group();
    this.parallax_level2 = this.game.add.group();
    this.parallax_level1 = this.game.add.group();
    this.context_layer = this.game.add.group();

    // parallax level 5: backgorund
    var background = this.game.add.tileSprite(0, 0, 1024, 768, 'l5_tile_01');
    this.parallax_level5.add( background );
    background.fixedToCamera = true;

    // input
    this.cursors = this.game.input.keyboard.createCursorKeys();

    // player: saucer
    this.saucer = new Saucer(this.game,100,100,'spaceship',this);
    this.game.add.existing(this.saucer);
    this.saucer.init(this.saucer);

    // villagers randoms
	 for(var i = 0;i<15;i++)
	 {
	 	var vilX = this.game.world.randomX;
	 	var vilY = 100;
	 	var villager = new Villager(this.game,vilX,vilY,'villager-small-1');
	 	this.game.add.existing(villager);
	 	villager.init(villager);
		this.villagers[i] = villager;
	 }

  //  var collide_box = new CollideBox(this.game, 400, 400, 400, 400);
  //  this.parallax_level1.add( collide_box );

    var re_l2_tile_01 = /l2_tile_01.*/;
    var re_l2_tile_02 = /l2_tile_02.*/;
    var re_spr_altar = /spr_altar.*/;
    var re_spr_ennemy_big_01 = /spr_ennemy_big_01.*/;
    var re_spr_ennemy_small_01 = /spr_ennemy_small_01.*/;
    var re_l3_tile_01 = /l3_tile_01.*/;
    var re_l3_tile_02 = /l3_tile_02.*/;
    var re_box = /box.*/;

    // map
     var mapJSON = this.game.cache.getJSON('map');
     var mapBoxes = mapJSON.entity[0].obj_info;
     var collideBoxes = {};

     for (var i = 0; i < mapBoxes.length; ++i) {
       collideBoxes[ mapBoxes[ i ].name ] = mapBoxes[ i ];
     }

     var mapLayers = mapJSON.entity[0].animation;
     for (var i = 0; i < mapLayers.length; ++i) {
       var layer = mapLayers[ i ];
       console.log( 'length:' + layer.timeline.length );
       console.log( layer.timeline );
       for (var j = 0; j < layer.timeline.length; ++j ){
         var element = layer.timeline[ j ];
         console.log( element.name );
         var x = element.key[0].object.x ? element.key[0].object.x : 0;
         var y = element.key[0].object.y ? element.key[0].object.y : 0;
         console.log( 'x: ' + x );
         console.log( 'y: ' + y );
         var l;
         if ( element.name ) {
           if ( element.name.match( re_l3_tile_02 ) ) {
             new ParallaxLevelX( this.game, x, y, 'l3_tile_02', this.parallax_level3, true);
           } else if ( element.name.match( re_l3_tile_01 ) ) {
             new ParallaxLevelX( this.game, x, y, 'l3_tile_01', this.parallax_level3, true);
           } else if ( element.name.match( re_l2_tile_01 ) ) {
             new ParallaxLevelX( this.game, x, y, 'l2_tile_01', this.parallax_level2);
           } else if ( element.name.match( re_l2_tile_02 ) ) {
             new ParallaxLevelX( this.game, x, y, 'l2_tile_02', this.parallax_level2);
           } else if ( element.name.match( re_spr_ennemy_big_01 ) ) {
            l = new Villager(this.game,x,y,'spr_ennemy_big_01');
         	 	this.game.add.existing(l);
         	 	l.init(l);
         		this.villagers.push( l );
           } else if ( element.name.match( re_spr_ennemy_small_01 ) ) {
            l = new Villager(this.game,x,y,'spr_ennemy_small_01');
         	 	this.game.add.existing(l);
         	 	l.init(l);
         		this.villagers.push( l );
          } else if ( element.name.match( re_box ) ) {
            var box = collideBoxes[ element.name ];
            var scale_x = element.key[0].object.scale_x ? element.key[0].object.scale_x : 1;
            var scale_y = element.key[0].object.scale_y ? element.key[0].object.scale_y : 1;
            console.log( scale_x );
            console.log( scale_y );
            console.log( box );
            var w = Math.abs(box.w) * scale_x;
            var h = Math.abs(box.h) * scale_y;
            // var ry = 1152 - (y - box.h) * scale_y;
            var ry = y ;
            var rx = x * scale_x;
            if ( box.w < 0) {
              rx += box.w * scale_x;
            }
            if ( box.h < 0) {
              ry += box.h * scale_y;
            }
             ry += 500;

            var collide_box = new CollideBox(this.game, rx, ry, w, h);
            this.parallax_level1.add( collide_box );

            console.log( collide_box );

           }
         } else {
           console.log( 'not matchable' );
         }
       }
     }


    // camera
    this.game.camera.follow(this.saucer);
    this.game.camera.deadzone = new Phaser.Rectangle( 200, 100, 1024 - 400, 768 - 350);

    console.log( this.game);
	},

	update: function ( game ) {

    this.parallax_level3.x = - this.game.camera.x * 0.6;
    this.parallax_level3.y = - this.game.camera.y * 0.6;
	},

  __render: function() {

    this.game.debug.cameraInfo(this.game.camera, 32, 32);
    this.game.debug.spriteCoords(this.saucer, 32, 600);

},

	quitGame: function (pointer) {
		//	Here you should destroy anything you no longer need.
		//	Stop music, delete sprites, purge caches, free resources, all that good stuff.

		//	Then let's go back to the main menu.
		this.state.start('MainMenu');
	}

};
