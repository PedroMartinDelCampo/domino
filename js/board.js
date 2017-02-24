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
	this.tilesOnGame.push(tile);
};

Board.prototype.trySetTile = function (tile) {
	var position tileIsCompatible(tile);
	if(position){
		setTile(tile,position);
		return 1;
	}
	return 0;
};

Board.prototype.setTile = function (tile, position){
	if(position-1==0) {
		this.tilesOnGame.unshift(tile);
	} else {
		this.tilesOnGame.push(tile);
	}
};

Board.prototype.tileIsCompatible = function (tile) {
	if (tile.isCompatibleWith(this.tilesOnGame[0])){
		return 1;
	}
	if(tile.isCompatibleWith(this.tilesOnGame[this.tilesOnGame.length-1])) {
		return this.tilesOnGame.length;
	}

	return 0;
};
