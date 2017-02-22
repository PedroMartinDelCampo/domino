function Board() {
	this.tiles = [];
	for (var i = 0; i <= 6; i++) {
		for (var j = i; j <= 6; j++) {
			this.tiles.push(
				new Tile(i, j)
			);
		}
	}
}