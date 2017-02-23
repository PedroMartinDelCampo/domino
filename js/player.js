function Player() {
	this.turn = 0;
	this.tiles = [];
}

Player.prototype.doubles = function() {
	return this.tiles.filter(function(tile) {
		return tile.isDouble();
	});
}

Player.prototype.takeTile = function(tile) {
	this.tiles.push(tile);
};

Player.prototype.performMovement = function() {
	// Performs a movement
};

Player.prototype.doMovement = function() {
	// Generates a movement
};