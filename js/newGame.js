function initGame() {
	var numPlayers = document.getElementById('num_players').value;
	if (numPlayers < 2 || numPlayers > 4) {
		alert('Sólo se permiten entre 2 y 4 jugadores');
		return false;
	}
	var board = new Board();
	board.shuffle();
	var players = createPlayers(board, numPlayers);
	console.log(players);
}

function createPlayers(board, numPlayers) {
	var players = [];
	for (var i = 0; i < numPlayers; i++) {
		var player = new Player();
		for (var j = 0; j < 7; j++) {
			var tile = board.takeTile();
			player.takeTile(tile);
		}
		players.push(player);
	}
	return players;
}

function assignTurns(players) {
	players.sort(function(player1, player2) {
		var db1 = player1.doubles();
		var db2 = player2.doubles();
		if (db1.length) {
			if (db2.length) {

			}
		}
		// TODO: This inner function should return -1 if player1 will play after player2,
		//			1 if player1 will player before player2 or 0 if they have the same
		//			ammount of points an no doubles
	});
}