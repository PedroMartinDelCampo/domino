function setUpGame() {
	var players = session('players');
	var body = document.getElementsByTagName('body')[0];
	body.insertAdjacentHTML('beforeend', '<pre>' + JSON.stringify(players, null, 4) + '</pre>');
}