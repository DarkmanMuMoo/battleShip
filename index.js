const game = require('./game')


let T1 = game.get();
printBoard(T1);
function printBoard(game) {
    let result =''
    for (let i = 9; i >= 0; i--) {
        for (let j = 0; j < 10; j++) {
            result += `| ${game[j][i]} |`;
        }
        result+='\n';
    }
    console.log(result);
}