import React from 'react';
import './Gameboard.css';
import Square from './square/Square';
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

const showShip = (type, isHit) => {
  if (type === 'ship' && isHit === true) {
    return 'ship';
  }
  return 'ocean';
};

const Gameboard = ({ ships, myBoard, receivePlayerAttack, resolveBoardDrop, playerMoves }) => {
  const board = createInitialBoard();

  const checkForHit = (i) => {
    return playerMoves.includes(i);
  };

  ships.forEach((ship) => {
    ship.positions.forEach((coordinate, index) => {
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
          <Square key={`letter-${i + 1}`} text={value} type="grid" />
        ))}
      </div>
      <div className="lower_section">
        <div className="number_column">
          {Constants.NUMBERCOLUMN.map((value, i) => (
            <Square key={`number-${i + 1}`} text={value} type="grid" />
          ))}
        </div>
        <div className="board">
          {myBoard
            ? board.map((square, i) => (
                <Square
                  key={`board-${i + 1}`}
                  type={square.type}
                  hit={checkForHit(i)}
                  myBoard={myBoard}
                  resolveBoardDrop={resolveBoardDrop ? (event) => resolveBoardDrop(event, i) : null}
                />
              ))
            : board.map((square, i) => (
                <Square
                  key={`board-${i + 1}`}
                  type={showShip(square.type, checkForHit(i))}
                  hit={checkForHit(i)}
                  resolveSquareClick={
                    checkForHit(i) ? null : () => receivePlayerAttack(square.id, i)
                  }
                />
              ))}
        </div>
      </div>
    </div>
  );
};

export default Gameboard;
