const size = 10;
const shipType = [4,3,3,2,2,2,1,1,1,1];

function get() {
    let field = createField();
    randomShips(field);
    return field;
}
function createField() {
    let field = [];
    for (let i = 0; i < size; i++) {
        let row = [];
        for (let j = 0; j < size; j++) {
            row[j] = 0;
        }
        field[i] = row;
    }
    return field;
}
function randomShips(field) {

    for (let type of shipType) {
        let isPlace = false;
        while (!isPlace) {
            isPlace = place(type, field);
        }
    }
}

function place(type, field) {

    let startCordinate = [random(size), random(size)];
    let stance = random(2);
    let shipCodinate = [];
    for (let i = 0; i < type; i++) {
        let x = stance == 0 ? startCordinate[0] + i : startCordinate[0];
        let y = stance == 0 ? startCordinate[0] : startCordinate[1] - i;
        try {
            let space = field[x][y];
            if (space != 0) {
                return false;
            }
        } catch (e) {
            return false;
        }
        shipCodinate.push([x, y]);
    }

    for (let cordinate of shipCodinate) {
        field[cordinate[0]][cordinate[1]] = type;
        console.log(`ship type ${type} place at ${cordinate[0]} ,${[cordinate[1]]} value = ${field[cordinate[0]][cordinate[1]]}`);
    }

    return true;

}

function random(max) {
    return Math.floor(Math.random() * max);
}

exports.get = get;