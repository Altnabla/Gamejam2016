//  Here is a custom game object
SoundManager = function (game, gameinstance) {
	
	this._volume = 1;

	this.game = game;
	this.gameinstance = gameinstance;

	this.musicRaoool  = this.game.add.audio('musicRaoool');
	this.musicFideles  = this.game.add.audio('musicFideles');

	
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



SoundManager.prototype.SetVolume = function(__value)
{
	this.game.sound.volume = __value;
};

SoundManager.prototype.update = function()
{
	this.musicRaoool.volume = 1;
	this.musicFideles.volume = 0;
};





