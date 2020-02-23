import React from 'react';
import './Gameboard.css';
import Square from './square/Square';

const createInitialBoard = () => {
  const initialBoard = new Array(100);
  for (var i = 0; i < 100; i++) {
    initialBoard[i] = {
      hit: false,
      position: i,
      type: 'ocean',
      id: null
    };
  };
  return initialBoard;
};

const showShip = (type, isHit) => {
  if (type === 'ship' && isHit === true) {
    return 'ship'
  } else {
    return 'ocean'
  }
};

const letterRow = [' ', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
const numberColumn = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

const Gameboard = ({ ships, myBoard, receivePlayerAttack, resolveBoardDrop, playerMoves}) => {
  const board = createInitialBoard();

  const checkForHit = (i) => {
    return playerMoves.includes(i);
  };

  ships.forEach(ship => {
    ship.positions.forEach((coordinate, index) => {
      board[coordinate] = {
        hit: ship.hits[index],
        position: coordinate,
        type: 'ship',
        id: ship.id
      }
    })
  });

  return (
    <div>
      <div className='letter_row'>
        {letterRow.map((value, i) =>
          <Square
            key={i}
            text={value}
            type='grid'>
          </Square>)}
      </div>
      <div className='lower_section'>
        <div className='number_column'>
          {numberColumn.map((value, i) =>
            <Square
              key={i}
              text={value}
              type='grid'>
            </Square>)}
        </div>
        <div className='board'>
          {myBoard ? board.map((square, i) =>
            <Square
              key={origin + i}
              type={square.type}
              hit={checkForHit(i)}
              myBoard={myBoard}
              resolveBoardDrop={resolveBoardDrop ? (event, i) => resolveBoardDrop(event, i) : null}>
            </Square>)
            : board.map((square, i) =>
              <Square
                key={origin + i}
                type={showShip(square.type, checkForHit(i))}
                hit={checkForHit(i)}
                resolveSquareClick={checkForHit(i) ? null : () => receivePlayerAttack(square.id, i)}>
              </Square>)}
        </div>
      </div>
    </div>
  );
}

export default Gameboard;
