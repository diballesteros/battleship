//Game
export const FIRSTCOLUMNSQUARES = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90];
export const LASTCOLUMNSQUARES = [9, 19, 29, 39, 49, 59, 69, 79, 89, 99];

//Gameboard.js
export const LETTERROW = [' ', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
export const NUMBERCOLUMN = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

//ShipFactory.js
export const SHIPSTORE = [
    {
        model: 'Carrier',
        size: 5
    },
    {
        model: 'Battleship',
        size: 4
    },
    {
        model: 'Cruiser',
        size: 3
    },
    {
        model: 'Submarine',
        size: 3
    },
    {
        model: 'Destroyer',
        size: 2
    },
    {
        model: '',
        size: 0
    }
];

//Testing
export const TESTSHIPS = [
    {
        id: 1,
        positions: [1, 2, 3],
        hits: [false, false, false]
    },
    {
        id: 2,
        positions: [9, 19, 29],
        hits: [false, false, false]
    },
    {
        id: 3,
        positions: [42, 43, 44, 45, 46],
        hits: [false, false, false, false, false]
    },
    {
        id: 4,
        positions: [98, 99],
        hits: [false, false]
    },
    {
        id: 5,
        positions: [62, 72, 82, 92],
        hits: [false, false, false, false]
    }
];