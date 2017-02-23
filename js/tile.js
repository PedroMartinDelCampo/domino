function Tile(x, y) {
	this.x = x;
	this.y = y;
}

Tile.prototype.isCompatibleWith = function(tile) {
	return this.x == tile.x || this.x == tile.y || this.y == tile.y || this.y == tile.y;
};

Tile.prototype.isDouble = function() {
	return this.x == this.y;
};

Tile.prototype.sum = function() {
	return this.x + this.y;
};