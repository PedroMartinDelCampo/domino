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

function initGame() {
	var numPlayers = document.getElementById('num_players').value;
	if (numPlayers < 2 || numPlayers > 4) {
		alert('Sólo se permiten entre 2 y 4 jugadores');
		return false;
	}
	var board = new Board();
	board.shuffle();
	var players = createPlayers(board, numPlayers);
	session('players', players);
	selectFirstTile(players, board);
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
	return assignTurns(players);

}

function assignTurns(players) {
	players.sort(function(player1, player2) {
		var max1 = player1.maxTile();
		var max2 = player2.maxTile();
		return max2.x - max1.x;
	});
	return players;
}

function setFirstTile(players, board){
	var firstTile = players[0].maxTile();
	this.board.setFirstTile(firstTile);

}