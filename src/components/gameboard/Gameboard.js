import React from 'react';
import './Gameboard.css';

import Square from './square/Square';

function showShip(type, isHit) {
  if (type === 'ship' && isHit === true) {
    return 'ship'
  } else {
    return 'ocean'
  }
};

const Gameboard = (props) => {
  props.ships.forEach(ship => {
    ship.positions.forEach((coordinate, index) => {
      props.board[coordinate] = {
        hit: ship.hits[index],
        position: coordinate,
        type: 'ship',
        id: ship.id
      }
    })
  });

  return (
    <div className='board'>
      {props.myBoard ? props.board.map((square, i) =>
        <Square
          key={i}
          type={props.board[i].type}
          hit={props.board[i].hit}
          id={props.board[i].id}
          myBoard={props.myBoard}>
        </Square>)
        : props.board.map((square, i) =>
          <Square
            key={i}
            type={showShip(props.board[i].type, props.board[i].hit)}
            hit={props.board[i].hit}
            id={props.board[i].id}
            receiveAttack={() => props.receiveAttack(i)}>
          </Square>)}
    </div>
  );
}

export default Gameboard;
