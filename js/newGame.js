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
	assignTurns(players);
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
	var maxdb = new Tile(0,0);
	players.sort(function(player1, player2) {
		var db1 = player1.doubles();
		var db2 = player2.doubles();
		if (db1.length) {
			if (db2.length) {
				maxdb1= (max(db1,maxTilePredicate));
				maxdb2= (max(db2,maxTilePredicate));
				console.log(maxdb1.x - maxdb2.x);
				return maxdb1.x - maxdb2.x;
				}
			return 1;
			} else if(db2.length){
				return -1;
		}
		var max1 = max(player1.tiles,maxTilePredicate);
		var max2 = max(player2.tiles,maxTilePredicate);
		console.log(maxdb1.x - maxdb2.x);
		return max1.x - max2.x;



			
		// TODO: This inner function should return -1 if player1 will play after player2,
		//			1 if player1 will player before player2 or 0 if they have the same
		//			ammount of points an no doubles
	});
}