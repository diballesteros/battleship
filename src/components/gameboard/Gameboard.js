import React, { Component } from 'react';
import './Gameboard.css';

import Square from './square/Square';

class Gameboard extends Component {
    constructor(props) {
        super(props);

        const initialBoard = new Array(100);
        for (var i = 0; i < 100; i++) {
          initialBoard[i] = {
            hit: false,
            position: i,
            type: 'ocean'
          };
        };

        this.state = {
            board : initialBoard
        }
    }

    updateBoard(i) {
      const modifiedBoard = this.state.board.slice();
      const testShip = {
        hit: true,
        position: i,
        type: 'ship'
      }
      modifiedBoard[i] = testShip;
      this.setState({
        board: modifiedBoard
      });
    }

    render() {
      return (
        <div className='board'>
          {this.state.board.map((square, i) =>
            <Square 
              key={i}
              type={this.state.board[i].type}
              hit={this.state.board[i].hit}
              hitHandler={() => this.updateBoard(i)}>
            </Square>)}
        </div>
      );
    }
}

export default Gameboard;
