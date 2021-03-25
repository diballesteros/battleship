export type GameState = {
  playerShips: Ship[];
  computerShips: Ship[];
  computerMoves: number[];
  lastSuccessfulMoves: number[];
  successfulComputerHit: boolean;
  playerMoves: number[];
  completedComputerMoves: number[];
  gameResolved: boolean;
};

export type GameActions =
  | {
      type: 'SET_BOARD';
      payload: {
        playerShips: Array<Ship>;
        computerShips: Array<Ship>;
      };
    }
  | {
      type: 'RESET_BOARD';
    }
  | {
      type: 'PLAYER_MOVE';
      payload: {
        computerShips: Array<Ship>;
        playerMoves: Array<number>;
        completedComputerMoves: Array<number>;
        playerShips: Array<Ship>;
        gameResolved: boolean;
      };
    }
  | {
      type: 'COMPUTER_MOVE';
      payload: {
        computerMoves: Array<number>;
      };
    }
  | {
      type: 'UPDATE_HIT';
      payload: {
        lastSuccesfulMoves: Array<number>;
        successfulComputerHit: boolean;
      };
    };

export type Ship = {
  hits: boolean[];
  id: number;
  positions: number[];
};
