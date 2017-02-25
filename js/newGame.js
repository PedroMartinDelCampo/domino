function newGame() {
	var numPlayers = document.getElementById('num_players').value;
	if (numPlayers < 2 || numPlayers > 4) {
		alert('Sólo se permiten entre 2 y 4 jugadores');
		return false;
	}
	session('numPlayers', numPlayers);
}