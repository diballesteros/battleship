export type GameState = {
  playerShips: Array<Ship>;
  computerShips: Array<Ship>;
  computerMoves: Array<number>;
  lastSuccessfulMoves: Array<number>;
  successfulComputerHit: boolean;
  playerMoves: Array<number>;
  completedComputerMoves: Array<number>;
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
  id: number;
  positions: Array<number>;
  hits: Array<boolean>;
};
