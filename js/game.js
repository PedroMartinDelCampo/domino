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

var turn;

function setUpGame() {
	var players = initGame();
	var body = document.getElementsByTagName('body')[0];
	var turn = -1;
	takeTurn();
}

function initGame() {
	var numPlayers = session('numPlayers');
	var board = new Board();
	board.shuffle();
	var players = createPlayers(board, numPlayers);
	selectFirstTile(players);
	return players;
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
	assignTurns(players)
	return players;
}

function assignTurns(players) {
	players.sort(function(player1, player2) {
		var max1 = player1.maxTile();
		var max2 = player2.maxTile();
		return max2.x - max1.x;
	});
	return players;
}

function takeTurn() {
	if (turn == 4) {
		turn = 0;
	} else {
		turn++;
	}
	var player = players[turn];
	var html = '';
	var display = document.getElementById('my_tiles');
	player.tiles.forEach(function(tile) {
		html += tile.view();
	});
	display.innerHTML = html;
}

function setFirstTile(players, board){
	var firstTile = players[0].maxTile();
	board.setFirstTile(firstTile);
}