function Player() {
	this.turn = 0;
	this.tiles = [];
}

Player.prototype.doubles = function() {
	return this.tiles.filter(function(tile) {
		return tile.isDouble();
	});
};

Player.prototype.maxTile = function() {
	return this.tiles.reduce(function(a, b) {
		if (a.isDouble()) {
			if (b.isDouble()) {
				return a.x > b.x ? a : b;
			}
			return a;
		}
		if (b.isDouble()) {
			return b;
		}
		return a.x > b.x ? a : b;
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

Player.prototype.setTile = function(tile, board) {
	if(board.trySetTile(tile)){
		this.tiles.splice(this.tiles.indexOf(tile),1);
	}
};