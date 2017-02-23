function sum(array) {
	return array.reduce(function(a, b) {
		return a + b;
	}, 0);
}

function max(array, predicate) {
	return array.reduce(function(a, b) {
		return predicate(a, b) ? a : b;
	});
}

function maxTilePredicate(a, b) {
	return (a.x + a.y) > (b.x + b.y);
}

function session(name, value) {
	if (value !== undefined) {
		localStorage.setItem(name, JSON.stringify(value));
	} else {
		return JSON.parse(localStorage.getItem(name));
	}
}