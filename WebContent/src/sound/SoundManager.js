//  Here is a custom game object
SoundManager = function (game, gameinstance) {
	
	this._volume = 1;

	this.game = game;
	this.gameinstance = gameinstance;

	
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


SoundManager.prototype.Start = function(){
	
	
	console.log("Init SoundManager");

	this.musicRaoool  = this.game.add.audio('musicRaoool');
	this.musicFideles  = this.game.add.audio('musicFideles');

	this.sounds = [this.musicRaoool, this.musicFideles];


	this.game.sound.setDecodedCallback(this.sounds, this._soundsLoaded, this);
}


SoundManager.prototype._soundsLoaded = function() {

	console.log("sound manager start");

	this.StartMusic();

}

