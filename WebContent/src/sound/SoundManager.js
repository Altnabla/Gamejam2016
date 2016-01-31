//  Here is a custom game object
SoundManager = function (game, gameinstance) {
	
	this._volume = 1;

	this.game = game;
	this.gameinstance = gameinstance;

	this.musicRaoool  = this.game.add.audio('musicRaoool');
	this.musicFideles  = this.game.add.audio('musicFideles');

	this.snd_fidele_angry_01 = this.game.add.audio('snd_fidele_angry_01');
	this.snd_fidele_aspire_01 = this.game.add.audio('snd_fidele_aspire_01');
	this.snd_fidele_aspire_02 = this.game.add.audio('snd_fidele_aspire_02');
	this.snd_fidele_aspire_03 = this.game.add.audio('snd_fidele_aspire_03');
	this.snd_fidele_drop_autel = this.game.add.audio('snd_fidele_drop_autel');
	this.snd_fidele_shoot_01 = this.game.add.audio('snd_fidele_shoot_01');
	this.snd_fidele_shoot_02 = this.game.add.audio('snd_fidele_shoot_02');
	this.snd_fidele_splash_01 = this.game.add.audio('snd_fidele_splash_01');
	this.snd_fidele_splash_02 = this.game.add.audio('snd_fidele_splash_02');
	this.snd_raoool_gimick = this.game.add.audio('snd_raoool_gimick');
	this.snd_ritual_fidele_01 = this.game.add.audio('snd_ritual_fidele_01');
	this.snd_ritual_fidele_02 = this.game.add.audio('snd_ritual_fidele_02');
	this.snd_ritual_fidele_03 = this.game.add.audio('snd_ritual_fidele_03');
	this.snd_ritual_raoool_01 = this.game.add.audio('snd_ritual_raoool_01');
	this.snd_ritual_raoool_02 = this.game.add.audio('snd_ritual_raoool_02');
	this.snd_ritual_raoool_03 = this.game.add.audio('snd_ritual_raoool_03');
	this.snd_soucoupe_explode = this.game.add.audio('snd_soucoupe_explode');
	this.snd_soucoupe_hit_01 = this.game.add.audio('snd_soucoupe_hit_01');
	this.snd_soucoupe_hit_02 = this.game.add.audio('snd_soucoupe_hit_02');
	this.snd_soucoupe_hit_03 = this.game.add.audio('snd_soucoupe_hit_03');
	this.snd_soucoupe_move = this.game.add.audio('snd_soucoupe_move');
	this.snd_soucoupe_rayon = this.game.add.audio('snd_soucoupe_rayon');

	this.snd_game_victory = this.game.add.audio('snd_game_victory');
	this.snd_game_defeat = this.game.add.audio('snd_game_defeat');

	
	this.init = function(self)
	{
		SoundManager.prototype.init(self);
	}
};




SoundManager.prototype = Object.create({});
SoundManager.prototype.constructor = SoundManager;




SoundManager.prototype.StartMusic = function()
{
	this.musicRaoool.loopFull();
	this.musicFideles.loopFull();
};

SoundManager.prototype.StopMusic = function()
{
	this.musicRaoool.stop();
	this.musicFideles.stop();
};


SoundManager.prototype.SetVolume = function(__value)
{
	this.game.sound.volume = __value;
};



SoundManager.prototype.update = function()
{
	saucerPosRatio = this.gameinstance.saucer.x / this.gameinstance.world.width;
	this.musicRaoool.volume = 1-saucerPosRatio;
	this.musicFideles.volume = saucerPosRatio;
};




// SFX METHOS


SoundManager.prototype.playSnd_fidele_angry = function()
{
	this.snd_fidele_angry_01.volume = .2;
	this.snd_fidele_angry_01.play();
};

SoundManager.prototype.playSnd_fidele_aspire = function()
{
	sounds = [this.snd_fidele_aspire_01, this.snd_fidele_aspire_02, this.snd_fidele_aspire_03];
	index = Math.floor(Math.random() * sounds.length);
	snd = sounds[index];
	snd.play();
};

SoundManager.prototype.playSnd_fidele_drop_autel = function()
{
	this.snd_fidele_drop_autel.play();
};

SoundManager.prototype.playSnd_fidele_shoot = function()
{
	sounds = [this.snd_fidele_shoot_01, this.snd_fidele_shoot_02];
	index = Math.floor(Math.random() * sounds.length);
	snd = sounds[index];
	snd.play();
};

SoundManager.prototype.playSnd_fidele_splash = function()
{
	sounds = [this.snd_fidele_splash_01, this.snd_fidele_splash_02];
	index = Math.floor(Math.random() * sounds.length);
	snd = sounds[index];
	snd.play();
};




SoundManager.prototype.playSnd_raoool_gimick = function()
{
	this.snd_raoool_gimick.play();
};



SoundManager.prototype.playSnd_ritual_fidele = function()
{
	sounds = [this.snd_ritual_fidele_01, this.snd_ritual_fidele_02, this.snd_ritual_fidele_03];
	index = Math.floor(Math.random() * sounds.length);
	snd = sounds[index];
	snd.volume = .1;
	snd.play();
};

SoundManager.prototype.playSnd_ritual_raoool = function()
{
	// LOOPP

	sounds = [this.snd_ritual_raoool_01, this.snd_ritual_raoool_02, this.snd_ritual_raoool_03];
	index = Math.floor(Math.random() * sounds.length);
	snd = sounds[index];
	snd.play();
};


SoundManager.prototype.playSnd_soucoupe_explode = function()
{
	this.snd_soucoupe_explode.play();
};


SoundManager.prototype.playSnd_soucoupe_hit = function()
{
	sounds = [this.snd_soucoupe_hit_01, this.snd_soucoupe_hit_02, this.snd_soucoupe_hit_03];
	index = Math.floor(Math.random() * sounds.length);
	snd = sounds[index];
	snd.volume = .7;
	snd.play();
};




// SFX LOOPS

SoundManager.prototype.playSnd_soucoupe_move = function()
{
	if(this.snd_soucoupe_move.isPlaying)
		return;
	this.snd_soucoupe_move.volume = .4;
	this.snd_soucoupe_move.loopFull();
};
SoundManager.prototype.stopSnd_soucoupe_move = function()
{
	this.snd_soucoupe_move.stop();
};


SoundManager.prototype.playSnd_soucoupe_rayon = function()
{
	if(this.snd_soucoupe_rayon.isPlaying)
		return;
	this.snd_soucoupe_rayon.loopFull();
};
SoundManager.prototype.stopSnd_soucoupe_rayon = function()
{
	this.snd_soucoupe_rayon.stop();
};





SoundManager.prototype.playSnd_victory = function()
{
	this.StopMusic();
	this.snd_game_victory.play();
};

SoundManager.prototype.playSnd_defeat = function()
{
	this.StopMusic();
	this.snd_game_defeat.play();
};



