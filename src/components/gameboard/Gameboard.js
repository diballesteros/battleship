import React, { useState, useEffect } from 'react';
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
}

const showShip = (type, isHit) => {
  if (type === 'ship' && isHit === true) {
    return 'ship'
  } else {
    return 'ocean'
  }
};

const Gameboard = (props) => {
  const [board, setBoard] = useState(createInitialBoard());
  const [computerMove, setComputerMove] = useState(props.computerMove)

  useEffect(() => { 
    
  }, [computerMove]);

  function resolveBoardClick(playerMove) {
    if (!board[playerMove].hit) {
      const modifiedBoard = board.slice();
      modifiedBoard[playerMove].hit = true;
      setBoard(modifiedBoard);
  
      if (board[playerMove].type === 'ship') {
        props.receiveAttack(board[playerMove].id, playerMove);
      }
    }
  };

  props.ships.forEach(ship => {
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
    <div className='board'>
      {props.myBoard ? board.map((square, i) =>
        <Square
          key={i}
          type={board[i].type}
          hit={board[i].hit}
          myBoard={props.myBoard}>
        </Square>)
        : board.map((square, i) =>
          <Square
            key={i}
            type={showShip(board[i].type, board[i].hit)}
            hit={board[i].hit}
            resolveBoardClick={() => resolveBoardClick(i)}>
          </Square>)}
    </div>
  );
}

export default Gameboard;
