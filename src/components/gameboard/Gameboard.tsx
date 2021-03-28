import React from 'react';
import './Gameboard.css';
import Square from '../square/Square';
import * as Constants from '../../constants/constant';

const createInitialBoard = () => {
  const initialBoard = new Array(100);
  initialBoard.forEach((el, index) => {
    initialBoard[index] = {
      hit: false,
      position: index,
      type: 'ocean',
      id: null,
    };
  });
  return initialBoard;
};

const showShip = (type: any, isHit: boolean) => {
  if (type === 'ship' && isHit === true) {
    return 'ship';
  }
  return 'ocean';
};

const Gameboard: React.FC = ({
  ships,
  myBoard,
  receivePlayerAttack,
  resolveBoardDrop,
  playerMoves,
}: any) => {
  const board = createInitialBoard();

  const checkForHit = (i: number) => {
    return playerMoves.includes(i);
  };

  ships.forEach((ship: any) => {
    ship.positions.forEach((coordinate: any, index: number) => {
      board[coordinate] = {
        hit: ship.hits[index],
        position: coordinate,
        type: 'ship',
        id: ship.id,
      };
    });
  });

  return (
    <div>
      <div className="letter_row">
        {Constants.LETTERROW.map((value, i) => (
          <Square key={`letter-${i + 1}`} />
        ))}
      </div>
      <div className="lower_section">
        <div className="number_column">
          {Constants.NUMBERCOLUMN.map((value, i) => (
            <Square key={`number-${i + 1}`} />
          ))}
        </div>
        <div className="board">
          {myBoard
            ? board.map((square, i) => <Square key={`board-${i + 1}`} />)
            : board.map((square, i) => <Square key={`board-${i + 1}`} />)}
        </div>
      </div>
    </div>
  );
};

export default Gameboard;
