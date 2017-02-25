function Tile(x, y, inverted, active) {
	this.x = x;
	this.y = y;
	this.inverted = inverted;
}

Tile.prototype.isCompatibleWith = function(tile, face) {
	if (face == 'x') {
		if (this.x == tile.x) {
			return 'x';
		}
		if (this.x == tile.y) {
			return 'y';
		}
		return false;
	}
	if (face == 'y') {
		if (this.y == tile.x) {
			return 'x';
		}
		if (this.y == tile.y) {
			return 'y';
		}
		return false;
	}
};

Tile.prototype.isDouble = function() {
	return this.x == this.y;
};

Tile.prototype.sum = function() {
	return this.x + this.y;
};

Tile.prototype.view = function() {
	return '<img src="img/tile_'
			+ (this.inverted ? this.y : this.x) + '_'
			+ (this.inverted ? this.x : this.y) + '.png"'
			+ ' class="' + (this.inverted ? 'tile-inverted' : 'tile')
			+ (this.active ? ' active' : '') + '" '
			+ 'data-x="' + this.x + '" data-y="' + this.y + '" '
			+ (this.active ? 'onclick="putTile(this)"' : '') + ' />';
};

Tile.prototype.invert = function() {
	return new Tile(this.y, this.x, true, this.active);
};