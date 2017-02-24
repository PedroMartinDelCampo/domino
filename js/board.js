function Board() {
	this.tiles = [];
	this.tilesOnGame = [];
	for (var i = 0; i <= 6; i++) {
		for (var j = i; j <= 6; j++) {
			this.tiles.push(
				new Tile(i, j)
			);
		}
	}
}

Board.prototype.shuffle = function() {
	for (var i = 0; i < this.tiles.length; i++) {
		var x = Math.floor(Math.random() * (this.tiles.length - 1));
		var tmp = this.tiles[x];
		// Swap positions
		this.tiles[x] = this.tiles[i];
		this.tiles[i] = tmp;
	}
};

Board.prototype.takeTile = function() {
	return this.tiles.pop();
};

Board.prototype.setFirstTile = function (tile) {
	tilesOnGame.push(tile);
};