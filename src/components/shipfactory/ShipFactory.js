import React, { Component } from 'react';
import Gameboard from '../gameboard/Gameboard';
import Square from '../gameboard/square/Square';
import Button from '../UI/button/Button';
import { SHIPSTORE as shipStore } from '../../constants/constant';

import './ShipFactory.css';
import _ from 'lodash';

class ShipFactory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isHorizontal: true,
      currentShips: [],
    };
  }

  canPlaceShip(event, i) {
    event.target.style.removeProperty('background-color');
    const units = shipStore[this.state.currentShips.length].size;
    const positions = this.createPositionsArray(i, units, this.state.isHorizontal);
    if (
      this.arePositionsViable(i, units, positions, this.state.isHorizontal, this.state.currentShips)
    ) {
      this.buildPlayerShip(units, positions);
    }
  }

  arePositionsViable(square, units, positions, isHorizontal, ships) {
    if (isHorizontal) {
      const endOfRow = Math.ceil((square + 1) / 10) * 10;
      if (square + units <= endOfRow && !this.isOccupied(positions, ships)) {
        return true;
      }
    } else {
      if (positions[positions.length - 1] <= 99 && !this.isOccupied(positions, ships)) {
        return true;
      }
    }
    return false;
  }

  isOccupied(positions, ships) {
    for (let i = 0; i < positions.length; i++) {
      for (let j = 0; j < ships.length; j++) {
        if (ships[j].positions.includes(positions[i])) {
          return true;
        }
      }
    }
    return false;
  }

  createPositionsArray(index, units, isHorizontal) {
    const positionArray = [];
    if (isHorizontal) {
      for (let i = 0; i < units; i++) {
        positionArray.push(index + i);
      }
    } else {
      for (let i = 0; i < units; i++) {
        positionArray.push(index + i * 10);
      }
    }
    return positionArray;
  }

  buildPlayerShip(units, positions) {
    const newShip = {
      id: this.state.currentShips.length + 1,
      positions: positions,
      isSunk: false,
      hits: Array(units).fill(false),
    };
    const modifiedCurrentShips = this.state.currentShips.slice();
    modifiedCurrentShips.push(newShip);
    this.setState({
      currentShips: modifiedCurrentShips,
    });
  }

  buildComputerShips() {
    const modifiedComputerShips = [];
    const computerSquares = [...Array(100).keys()];
    let isHorizontal = false;

    while (modifiedComputerShips.length < 5) {
      let square = _.sample(computerSquares);
      const positions = this.createPositionsArray(
        square,
        shipStore[modifiedComputerShips.length].size,
        isHorizontal
      );
      if (
        this.arePositionsViable(
          square,
          shipStore[modifiedComputerShips.length].size,
          positions,
          isHorizontal,
          modifiedComputerShips
        )
      ) {
        const newShip = {
          id: modifiedComputerShips.length + 1,
          positions: positions,
          isSunk: false,
          hits: Array(shipStore[modifiedComputerShips.length].size).fill(false),
        };
        modifiedComputerShips.push(newShip);
        isHorizontal = !isHorizontal;
      }
      const squareIndex = computerSquares.findIndex((i) => i === square);
      computerSquares.splice(squareIndex, 1);
    }
    return modifiedComputerShips;
  }

  onDrag = (event) => {
    event.preventDefault();
  };

  rotateShip() {
    this.setState({
      isHorizontal: !this.state.isHorizontal,
    });
  }

  undoPlacement() {
    if (this.state.currentShips.length > 0) {
      const modifiedCurrentShips = this.state.currentShips.slice();
      modifiedCurrentShips.pop();
      this.setState({
        currentShips: modifiedCurrentShips,
      });
    }
  }

  render() {
    return (
      <div className="ship_factory">
        <Gameboard
          ships={this.state.currentShips}
          myBoard={true}
          resolveBoardDrop={(event, i) => this.canPlaceShip(event, i)}
          playerMoves={[]}
        />
        <div className="ship_store">
          <div className="ship_store_title">
            <label>Arrange your board</label>
            <span>Drag and drop the ship below on a square</span>
          </div>
          {
            <div className="ship_store_ship_container">
              <div className="ship_store_model">
                <label>
                  {this.state.currentShips.length === 5
                    ? 'All ships built! You may start the game.'
                    : 'Model: ' + shipStore[this.state.currentShips.length].model}
                </label>
              </div>
              <div className="ship_builder">
                <div
                  className={`ship_store_ship ${
                    this.state.isHorizontal ? 'horizontal' : 'vertical'
                  }`}
                  draggable
                  onDrag={(event) => this.onDrag(event)}
                >
                  {[...Array(shipStore[this.state.currentShips.length].size)].map((e, i) => (
                    <Square key={i} type={'ship'} myBoard={true} />
                  ))}
                </div>
              </div>
              <div className="ship_store_counter">
                Ships left: {5 - this.state.currentShips.length}/5
              </div>
              <div className="ship_store_buttons">
                <Button
                  disabled={this.state.currentShips.length < 5}
                  clicked={() =>
                    this.props.setShips(this.state.currentShips, this.buildComputerShips())
                  }
                >
                  Start Game
                </Button>
                <Button clicked={() => this.rotateShip()}>Rotate</Button>
                <Button
                  disabled={this.state.currentShips.length === 0}
                  clicked={() => this.undoPlacement()}
                >
                  Undo
                </Button>
              </div>
            </div>
          }
        </div>
      </div>
    );
  }
}

export default ShipFactory;
