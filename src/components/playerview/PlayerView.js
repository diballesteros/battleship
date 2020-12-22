import React from 'react';
import _ from 'lodash';
import Gameboard from '../gameboard/Gameboard';
import './PlayerView.css';

const getSunkShipCount = (ships) => {
  let count = 0;
  ships.forEach((ship) => {
    if (_.every(ship.hits, (hit) => hit === true)) {
      count += 1;
    }
  });
  return count;
};

const PlayerView = ({
  completedComputerMoves,
  playerShips,
  playerMoves,
  receivePlayerAttack,
  computerShips,
}) => {
  return (
    <div className="player_console">
      <div className="player_board">
        <h2>My Board</h2>
        <Gameboard
          ships={playerShips}
          myBoard
          origin="Player"
          playerMoves={completedComputerMoves}
        />
        <span>Sunk Ships: {getSunkShipCount(playerShips)} / 5</span>
      </div>
      <div data-testid="1" className="player_board">
        <h2>Opponent&apos;s Board</h2>
        <Gameboard
          ships={computerShips}
          myBoard={false}
          origin="Opponent"
          playerMoves={playerMoves}
          receivePlayerAttack={(shipId, i) => receivePlayerAttack(shipId, i)}
        />
        <span>Sunk ships: {getSunkShipCount(computerShips)} / 5</span>
      </div>
    </div>
  );
};

export default PlayerView;
