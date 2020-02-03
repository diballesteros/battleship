import React, { Component } from 'react';
import './Gameboard.css';

import Square from './square/Square';

class Gameboard extends Component {
    // Render gameboard, decide if each individual square is a battleship or a regular square
    // Initial 10 by 10 array
    // Array begins with 100 ocean squares
    // Coordinates construct the ship squares and replace ocean squares with ship squares  
    constructor(props) {
        super(props);
        this.state = {
            board : Array(100).fill(null)
        }
    }

    render() {
      return (
        <div className='board'>
          {this.state.board.map((square, i) =>
            <Square isShip={this.state.board[i]}></Square>)}
          <Square />
        </div>
      );
    }
}

export default Gameboard;
