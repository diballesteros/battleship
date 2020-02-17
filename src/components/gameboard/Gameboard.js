import React, { useState, useEffect } from 'react';
import './Gameboard.css';
import _ from 'lodash';
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

const Gameboard = ({ ships, myBoard, computerTurn, resolveComputerTurn, computerMove, computerCallback, receivePlayerAttack, resolveBoardDrop }) => {
  const [board, setBoard] = useState(createInitialBoard());

  useEffect(() => {
    if (computerTurn === true && _.isNumber(computerMove) && resolveComputerTurn) {
      const modifiedBoard = board.slice();
      modifiedBoard[computerMove].hit = true;
      setBoard(modifiedBoard);
      return resolveComputerTurn(modifiedBoard[computerMove].id);
    }
  }, [computerTurn, resolveComputerTurn, computerMove, board, setBoard]);

  const resolveSquareClick = (playerMove) => {
    if (!board[playerMove].hit) {
      const modifiedBoard = board.slice();
      modifiedBoard[playerMove].hit = true;
      setBoard(modifiedBoard);

      if (board[playerMove].type === 'ship') {
        receivePlayerAttack(board[playerMove].id, playerMove);
      }

      if (computerCallback) {
        computerCallback();
      }
    }
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
              key={i}
              type={square.type}
              hit={square.hit}
              myBoard={myBoard}
              resolveBoardDrop={resolveBoardDrop ? () => resolveBoardDrop(i) : null}>
            </Square>)
            : board.map((square, i) =>
              <Square
                key={i}
                type={showShip(square.type, square.hit)}
                hit={square.hit}
                resolveSquareClick={() => resolveSquareClick(i)}>
              </Square>)}
        </div>
      </div>
    </div>
  );
}

export default Gameboard;
