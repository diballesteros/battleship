import { DisplayState, GameState, TFactoryShip } from './Types';

// Game
export const FIRSTCOLUMNSQUARES = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90];
export const LASTCOLUMNSQUARES = [9, 19, 29, 39, 49, 59, 69, 79, 89, 99];

// Gameboard.js
export const LETTERROW = [' ', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
export const NUMBERCOLUMN = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

// ShipFactory.js
export const SHIPSTORE: TFactoryShip[] = [
  {
    model: 'CARRIER',
    size: 5,
  },
  {
    model: 'BATTLESHIP',
    size: 4,
  },
  {
    model: 'CRUISER',
    size: 3,
  },
  {
    model: 'SUBMARINE',
    size: 3,
  },
  {
    model: 'DESTROYER',
    size: 2,
  },
];

// Testing
export const TESTSHIPS = [
  {
    id: 1,
    positions: [1, 2, 3],
    hits: [false, false, false],
  },
  {
    id: 2,
    positions: [9, 19, 29],
    hits: [false, false, false],
  },
  {
    id: 3,
    positions: [42, 43, 44, 45, 46],
    hits: [false, false, false, false, false],
  },
  {
    id: 4,
    positions: [98, 99],
    hits: [false, false],
  },
  {
    id: 5,
    positions: [62, 72, 82, 92],
    hits: [false, false, false, false],
  },
];

export const INITIAL_STATE: GameState = {
  playerShips: [],
  computerShips: [],
  computerMoves: [...Array(100).keys()],
  lastSuccessfulMoves: [],
  successfulComputerHit: false,
  playerMoves: [],
  completedComputerMoves: [],
  gameResolved: false,
};

export const INITIAL_DISPLAY_STATE: DisplayState = {
  currentTab: 0,
  isVertical: true,
  previousTab: 0,
  squareHeight: 30,
  squareWidth: 30,
};
