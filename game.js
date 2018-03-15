
const _get = require('lodash/get');
const size = 10;
const shipType = [4, 3, 3, 2, 2, 2, 1, 1, 1, 1];

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
        if (!canPlace(field, x, y)) {
            return false;
        }
        if (isAdjacent(field, [x, y], type, stance, i)) {
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
function isAdjacent(field, cordinate, type, stance, order) {

    let left = _get(field, `[${cordinate[0] - 1}][${cordinate[1]}]`)
    let right = _get(field, `[${cordinate[0] + 1}][${cordinate[1]}]`)
    let up = _get(field, `[${cordinate[0]}][${cordinate[1] + 1}]`)
    let down = _get(field, `[${cordinate[0]}][${cordinate[1] - 1}]`)
    let upLeft = _get(field, `[${cordinate[0] - 1}][${cordinate[1] + 1}]`)
    let upright = _get(field, `[${cordinate[0] + 1}][${cordinate[1] + 1}]`)
    let downLeft = _get(field, `[${cordinate[0] - 1}][${cordinate[1] - 1}]`)
    let downRight = _get(field, `[${cordinate[0] + 1}][${cordinate[1] - 1}]`)
    let isHead = order == 0;
    let isTail = order == type - 1;
    let isBody = !isHead && !isTail;
    let isOccupied = (v) => v != undefined && v != 0;

    if (type == 1) {
        return isOccupied(left)
            || isOccupied(right)
            || isOccupied(up)
            || isOccupied(down)
            || isOccupied(upLeft)
            || isOccupied(upright)
            || isOccupied(downLeft)
            || isOccupied(downRight);
    } else if (type == 2) {
        return (isTail && stance == 0 ? false : isOccupied(left))
            || (isHead && stance == 0 ? false : isOccupied(right))
            || (isTail && stance == 1 ? false : isOccupied(up))
            || (isHead && stance == 1 ? false : isOccupied(down))
            || isOccupied(upLeft)
            || isOccupied(upright)
            || isOccupied(downLeft)
            || isOccupied(downRight);
    } else if (type == 3) {
        return ((isTail || isBody) && stance == 0 ? false : isOccupied(left))
        || ((isHead || isBody) && stance == 0 ? false : isOccupied(right))
        || ((isTail || isBody) && stance == 1 ? false : isOccupied(up))
        || ((isHead || isBody ) && stance == 1 ? false : isOccupied(down))
        || isOccupied(upLeft)
        || isOccupied(upright)
        || isOccupied(downLeft)
        || isOccupied(downRight);
    } else if (type == 4) {
        return ((isTail || isBody) && stance == 0 ? false : isOccupied(left))
        || ((isHead || isBody) && stance == 0 ? false : isOccupied(right))
        || ((isTail || isBody) && stance == 1 ? false : isOccupied(up))
        || ((isHead || isBody ) && stance == 1 ? false : isOccupied(down))
        || isOccupied(upLeft)
        || isOccupied(upright)
        || isOccupied(downLeft)
        || isOccupied(downRight);
    }


}
function canPlace(field, x, y) {
    try {
        let space = field[x][y];
        if (space != 0) {
            return false;
        }
    } catch (e) {
        return false;
    }
    return true;
}

function random(max) {
    return Math.floor(Math.random() * max);
}

exports.get = get;