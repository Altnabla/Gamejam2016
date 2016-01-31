
BasicGame.Preloader = function (game) {

	this.background = null;
	this.preloadBar = null;

	this.ready = false;

};

BasicGame.Preloader.prototype = {

	preload: function () {

		//	These are the assets we loaded in Boot.js
		//	A nice sparkly background and a loading progress bar
		this.background = this.add.sprite(0, 0, 'preloaderBackground');
		this.preloadBar = this.add.sprite(300, 400, 'preloaderBar');

		//	This sets the preloadBar sprite as a loader sprite.
		//	What that does is automatically crop the sprite from 0 to full-width
		//	as the files below are loaded in.
		this.load.setPreloadSprite(this.preloadBar);

		//	Here we load the rest of the assets our game needs.
		//	As this is just a Project Template I've not provided these assets, the lines below won't work as the files themselves will 404, they are just an example of use.
		this.load.image('titlepage', 'images/ui/title.jpg');
		// this.load.image('playButton', 'images/play_button.png');
		this.load.atlas('playButton', 'images/ui/play_button.png', 'images/ui/play_button.json');
		// this.load.audio('titleMusic', ['audio/main_menu.mp3']);
		// this.load.bitmapFont('caslon', 'fonts/caslon.png', 'fonts/caslon.xml');
		//	+ lots of other required assets here
		// this.load.image('star', 'images/game/star.png');
		this.load.image('spaceship', 'images/placeholders/spr_raoool.png');
		this.load.image('villager-small-1','images/placeholders/spr_believer_small_01.png');
		this.load.image('spr_altar', 'images/placeholders/spr_altar.png');
		this.load.image('spr_ennemy_big_01', 'images/placeholders/spr_ennemy_big_01.png');
		this.load.image('spr_ennemy_small_01', 'images/placeholders/spr_ennemy_small_01.png');

		this.load.json('map', 'images/placeholders/map_02.scon');
		// this.load.spritesheet('grey-asteroid-rotation', 'images/animations/asteroid.png', 64, 64, 16);
		this.load.spritesheet('spr_bullet_01','images/placeholders/spr_bullet_01.png',64,64,4);
		this.load.image('fx_ray','images/placeholders/fx_ray.png');
		this.load.spritesheet('spr_enemy_idle', 'images/placeholders/spr_enemy_idle.png', 128, 128, 16);
		this.load.spritesheet('spr_enemy_falling', 'images/placeholders/spr_enemy_falling.png', 128, 128, 4);
		this.load.spritesheet('spr_enemy_walk', 'images/placeholders/spr_enemy_walk.png', 128, 128, 4);
		this.load.spritesheet('spr_enemy_attack','images/placeholders/spr_enemy_attack.png',128,128,27);
		this.load.spritesheet('spr_enemy_ritual','images/placeholders/spr_enemy_ritual.png',128,128,20);
		
		// parallax level 2
		for ( var i = 1; i < 4; ++i ) {
			this.load.image( 'l2_tile_0' + i, 'images/placeholders/l2_tile_0' + i + '.png' );
		}

		// parallax level 3
		for ( var i = 1; i < 3; ++i ) {
			this.load.image( 'l3_tile_0' + i, 'images/placeholders/l3_tile_0' + i + '.png' );
		}

		// parallax level 5
		this.load.image( 'l5_tile_01', 'images/placeholders/l5_tile_01.png' );
	},

	create: function () {

		//	Once the load has finished we disable the crop because we're going to sit in the update loop for a short while as the music decodes
		this.preloadBar.cropEnabled = false;

	},

	update: function () {

		//	You don't actually need to do this, but I find it gives a much smoother game experience.
		//	Basically it will wait for our audio file to be decoded before proceeding to the MainMenu.
		//	You can jump right into the menu if you want and still play the music, but you'll have a few
		//	seconds of delay while the mp3 decodes - so if you need your music to be in-sync with your menu
		//	it's best to wait for it to decode here first, then carry on.

		//	If you don't have any music in your game then put the game.state.start line into the create function and delete
		//	the update function completely.

	//	if (this.cache.isSoundDecoded('titleMusic') && this.ready == false)
	//	{
			this.ready = true;
			this.state.start('MainMenu');
	//	}

	}

};
