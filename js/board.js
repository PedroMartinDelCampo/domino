function Board() {
	this.tiles = [];
	this.tilesOnGame = [];
	for (var i = 0; i <= 6; i++) {
		for (var j = i; j <= 6; j++) {
			this.tiles.push(
				new Tile(i, j, false, false)
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
	return this.tiles.length ? this.tiles.pop() : false;
};

Board.prototype.setFirstTile = function (player, tile) {
	tile.active = false;
	this.tilesOnGame.push(tile);
	player.tiles.splice(player.tiles.indexOf(tile), 1);
};

Board.prototype.trySetTile = function (player, tile) {
	console.log(this);
	var move = this.performMove(tile);
	this.setTile(player, tile, move);
	return move;
};

Board.prototype.setTile = function (player, tile, move){
	if (move === false) return false;
	console.log(move);
	player.tiles.splice(player.tiles.indexOf(tile), 1);
	if(move.position === 0) {
		this.tilesOnGame.unshift(move.tile);
	} else {
		this.tilesOnGame.push(move.tile);
	}
};

Board.prototype.performMove = function (tile) {
	var x = this.tilesOnGame[0].isCompatibleWith(tile, 'y');
	if (x) {
		if (x == 'y') {
			var retVal = tile.invert();
			retVal.active = false;
			return {
				tile: retVal,
				position: 0
			};
		}
		var retVal = tile;
		retVal.active = false;
		return {
			tile: retVal,
			position: 0
		};
	}
	var lastPosition = this.tilesOnGame.length-1;
	var y = this.tilesOnGame[lastPosition].isCompatibleWith(tile, 'x');
	if(y) {
		if (y == 'x') {
			var retVal = tile.invert();
			retVal.active = false;
			return {
				tile: retVal,
				position: lastPosition
			};
		}
		var retVal = tile;
		retVal.active = false;
		return {
			tile: tile,
			position: lastPosition
		};
	}
	return false;
};

Board.prototype.view = function() {
	var html = '';
	this.tilesOnGame.forEach(function(tile) {
		html += tile.view();
	});
	return html;
}