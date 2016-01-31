
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
		this.load.image('spr_altar', 'images/placeholders/base.png');
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
		this.load.spritesheet('spr_believer_ritual','images/placeholders/spr_believer_ritual.png',128,128,20);
		this.load.spritesheet('spr_messiah_ritual','images/placeholders/spr_messiah_ritual.png',128,256,18);

		// parallax level 2
		for ( var i = 1; i < 4; ++i ) {
			this.load.image( 'l2_tile_0' + i, 'images/placeholders/l2_tile_0' + i + '.png' );
		}

		this.load.image( 'poteau_base_altar', 'images/decors/2a/poteau_base_altar.png' );
		this.load.image( 'poteau_base_neutre', 'images/decors/2a/poteau_base_neutre.png' );
		this.load.image( 'terrace_base_altar', 'images/decors/2a/terrace_base_altar.png' );
		this.load.image( 'terrace_base_neutre', 'images/decors/2a/terrace_base_neutre.png' );

		for (var i = 1; i < 6; ++i) {
			this.load.image( 'tile_hill' + i, 'images/decors/2a/tile_hill_' + i + '.png' );
		}

		for (var i = 1; i < 6; ++i) {
			this.load.image( 'tile_hill' + i, 'images/decors/2b/tile_hill_' + i + 'b.png' );
		}

		// parallax level 3
		for ( var i = 1; i < 3; ++i ) {
			this.load.image( 'l3_tile_0' + i, 'images/placeholders/l3_tile_0' + i + '.png' );
		}

		// parallax level 5
		// this.load.image( 'l5_tile_01', 'images/placeholders/l5_tile_01.png' );
		this.load.image( 'l5_tile_01', 'images/decors/skybox_2k.jpg' );
		this.load.image( 'holy_spawn', 'images/decors/spawn_raoul.png' );



		// Musics
		this.load.audio('musicRaoool', 'audio/RaooolBase_01.mp3');
        this.load.audio('musicFideles', 'audio/FidelesBase_01.mp3');

        // Sounds
        this.load.audio('snd_fidele_angry_01', 'audio/sfx/fidele_angry_01.mp3');
        this.load.audio('snd_fidele_aspire_01', 'audio/sfx/fidele_aspire_01.mp3');
        this.load.audio('snd_fidele_aspire_02', 'audio/sfx/fidele_aspire_02.mp3');
        this.load.audio('snd_fidele_aspire_03', 'audio/sfx/fidele_aspire_03.mp3');
        this.load.audio('snd_fidele_drop_autel', 'audio/sfx/fidele_drop_autel.mp3');
        this.load.audio('snd_fidele_shoot_01', 'audio/sfx/fidele_shoot_01.mp3');
        this.load.audio('snd_fidele_shoot_02', 'audio/sfx/fidele_shoot_02.mp3');
        this.load.audio('snd_fidele_splash_01', 'audio/sfx/fidele_splash_01.mp3');
        this.load.audio('snd_fidele_splash_02', 'audio/sfx/fidele_splash_02.mp3');
        this.load.audio('snd_raoool_gimick', 'audio/sfx/raoool_gimick.mp3');
        this.load.audio('snd_ritual_fidele_01', 'audio/sfx/ritual_fidele_01.mp3');
        this.load.audio('snd_ritual_fidele_02', 'audio/sfx/ritual_fidele_02.mp3');
        this.load.audio('snd_ritual_fidele_03', 'audio/sfx/ritual_fidele_03.mp3');
        this.load.audio('snd_ritual_raoool_01', 'audio/sfx/ritual_raoool_01.mp3');
        this.load.audio('snd_ritual_raoool_02', 'audio/sfx/ritual_raoool_02.mp3');
        this.load.audio('snd_ritual_raoool_03', 'audio/sfx/ritual_raoool_03.mp3');
        this.load.audio('snd_soucoupe_explode', 'audio/sfx/soucoupe_explode.mp3');
        this.load.audio('snd_soucoupe_hit_01', 'audio/sfx/soucoupe_hit_01.mp3');
        this.load.audio('snd_soucoupe_hit_02', 'audio/sfx/soucoupe_hit_02.mp3');
        this.load.audio('snd_soucoupe_hit_03', 'audio/sfx/soucoupe_hit_03.mp3');
        this.load.audio('snd_soucoupe_move', 'audio/sfx/soucoupe_move.mp3');
        this.load.audio('snd_soucoupe_rayon', 'audio/sfx/soucoupe_rayon.mp3');



        this.soundsToDecode = ['musicRaoool', 'musicFideles', 'snd_fidele_angry_01', 'snd_fidele_aspire_01', 'snd_fidele_aspire_02', 'snd_fidele_aspire_03', 'snd_fidele_drop_autel',
        	'snd_fidele_shoot_01', 'snd_fidele_shoot_02', 'snd_fidele_splash_01', 'snd_fidele_splash_02', 'snd_raoool_gimick',
        	'snd_ritual_fidele_01', 'snd_ritual_fidele_02', 'snd_ritual_fidele_03', 'snd_ritual_raoool_01', 'snd_ritual_raoool_02', 'snd_ritual_raoool_03', 'snd_soucoupe_explode',
        	'snd_soucoupe_hit_01', 'snd_soucoupe_hit_02', 'snd_soucoupe_hit_03', 'snd_soucoupe_move', 'snd_soucoupe_rayon'
		];

	},

	create: function () {

		//	Once the load has finished we disable the crop because we're going to sit in the update loop for a short while as the music decodes
		this.preloadBar.cropEnabled = false;

	},

	update: function () {

		if(this.ready)
			return;

		allSoundsLoaded = true;
		for (var i in this.soundsToDecode)
		{
			if (! this.cache.isSoundDecoded(this.soundsToDecode[i]))
				allSoundsLoaded = false;
		}

		if (allSoundsLoaded)
		{
			this.ready = true;
			this.state.start('MainMenu');
		}

	}

};
