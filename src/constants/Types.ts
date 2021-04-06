export type GameState = {
  playerShips: TShip[];
  computerShips: TShip[];
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
        playerShips: TShip[];
        computerShips: TShip[];
      };
    }
  | {
      type: 'RESET_BOARD';
    }
  | {
      type: 'PLAYER_MOVE';
      payload: {
        computerShips: TShip[];
        playerMoves: number[];
        completedComputerMoves: number[];
        playerShips: TShip[];
        gameResolved: boolean;
      };
    }
  | {
      type: 'COMPUTER_MOVE';
      payload: {
        computerMoves: number[];
      };
    }
  | {
      type: 'UPDATE_HIT';
      payload: {
        lastSuccesfulMoves: number[];
        successfulComputerHit: boolean;
      };
    };

export type TShip = {
  hits: boolean[];
  id: number;
  positions: number[];
};

export type TFactoryShip = {
  model: string;
  size: number;
};
