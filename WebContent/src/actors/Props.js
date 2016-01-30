//  Here is a custom game object
Props = function (game, x, y, texture) {
	PhysicsActor.call(this,game,x,y,texture);

};

Props.prototype = Object.create(PhysicsActor.prototype);
Props.prototype.constructor = Props;
