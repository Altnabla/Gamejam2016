//  Here is a custom game object
Saucer = function (game, x, y, texture) {
	PhysicsActor.call(this,game,x,y,texture);

};

Saucer.prototype = Object.create(PhysicsActor.prototype);
Saucer.prototype.constructor = Props;


Saucer.prototype.update = function() {

	// this.game.time.elapsed
};