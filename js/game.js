//
//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//
//
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//
//               佛祖保佑         永无BUG
// Esto bendecira nuestro código para que no tenga bugs

var turn, board, numPlayers, players, // Main vars
	boardView, myTilesView, player, turnView, // Main views
	closedGameView, winnerView, sumsView, // End of game views
	numPasses, gameEnded; // End of game track

function setUpGame() {
	window.onbeforeunload = function() {
		return "¿Estás seguro? Se perderá el progreso del juego actual";
	};
	initGame();
	setFirstTile();
}

function initGame() {
	numPasses = 0;
	numPlayers = session('numPlayers');
	board = new Board();
	board.shuffle();
	createPlayers();
	boardView = document.getElementById('board_view');
	myTilesView = document.getElementById('my_tiles');
	turnView = document.getElementById('turn_label');
	gameEnded = false;

	closedGameView = document.getElementById('closed_game');
	winnerView = document.getElementById('winner_label');
	sumsView = document.getElementById('sums');
}

function createPlayers() {
	players = [];
	for (var i = 0; i < numPlayers; i++) {
		var player = new Player('Jugador ' + (i+1));
		for (var j = 0; j < 7; j++) {
			var tile = board.takeTile();
			tile.active = true;
			player.takeTile(tile);
		}
		players.push(player);
	}
	assignTurns(players);
}

function assignTurns() {
	players.sort(function(player1, player2) {
		var max1 = player1.maxTile();
		var max2 = player2.maxTile();
		return max2.x - max1.x;
	});
}

function takeTurn() {
	if (player && !player.tiles.length) {
		endGame(true);
	}
	if (gameEnded) {
		alert('El juego ha terminado');
		return;
	}
	if (turn == numPlayers - 1) {
		turn = 0;
	} else {
		turn++;
	}
	player = players[turn];
	update();
}

function pass() {
	if (gameEnded) {
		alert('El juego ha terminado');
		return;
	}
	numPasses++;
	if (numPasses == numPlayers) {
		endGame(false);
	} else {
		takeTurn();
	}
}

function setFirstTile(){
	var firstTile = players[0].maxTile();
	board.setFirstTile(players[0], firstTile);
	turn = 0;
	takeTurn();
}


function update() {
	myTilesView.innerHTML = player.view();
	boardView.innerHTML = board.view();
	turnView.innerHTML = player.label;
}

function putTile(tileView) {
	if (gameEnded) {
		alert('El juego ha terminado');
		return;
	}
	var x = tileView.getAttribute('data-x');
	var y = tileView.getAttribute('data-y');
	var tile = new Tile(x, y, false, false);
	var result = board.trySetTile(player, tile);
	if (result) {
		numPasses = 0;
		takeTurn();
	} else {
		alert('Jugada no válida');
	}
}

function takeTile() {
	if (gameEnded) {
		alert('El juego ha terminado');
		return;
	}
	var tile = board.takeTile();
	if (tile) {
		tile.active = true;
		player.tiles.push(tile);
		update();
	} else {
		alert('Ya no hay fichas');
	}
}

function endGame(success) {
	gameEnded = true;
	update();
	if (success) {
		var winner = turn == 0 ? players[numPlayers-1] : players[turn-1];
		winnerView.innerHTML = '<hr><span><b>Ganador: </b>' + player.label + '</span>';
		winner.className = '';
	} else {
		var sums = players.map(function(p, i) {
			return {
				label: p.label,
				sum: p.sum()
			}
		});
		var winner = sums.reduce(function(winner, record) {
			return record.sum < winner.sum ? record : winner;
		});

		closedGameView.className = '';
		winnerView.innerHTML = '<hr><span><b>Ganador: </b>' + winner.label + '</span>';
		winnerView.className = '';
		var html = '<hr><dl>';
		sums.forEach(function(record) {
			html += '<dt>' + record.label + '</dt><dd>' + record.sum + '</dd>';
		});
		html += '</dl>';
		sumsView.innerHTML = html;
		sumsView.className = '';
	}
}