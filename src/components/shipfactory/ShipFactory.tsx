import React, { useState } from 'react';
import _ from 'lodash';
import Gameboard from 'components/gameboard/Gameboard';
import Square from 'components/square/Square';
import Button from 'components/UI/button/Button';
import { SHIPSTORE as shipStore } from 'constants/constant';
import './ShipFactory.css';

interface ShipFactoryProps {
  setShips: (a: any, b: any) => void;
}

const ShipFactory: React.FC<ShipFactoryProps> = ({ setShips }) => {
  const [isHorizontal, setIsHorizontal] = useState(true);
  const [currentShips, setCurrentShips] = useState([]);

  const isOccupied = (positions: any[], ships: any[]) => {
    positions.forEach((pos, posIndex) => {
      return ships.some((ship, shipIndex) => {
        return ships[shipIndex].positions.includes(positions[posIndex]);
      });
    });
    return false;
  };

  const arePositionsViable = (square: number, units: number, positions: any[], ships: any[]) => {
    if (isHorizontal) {
      const endOfRow = Math.ceil((square + 1) / 10) * 10;
      if (square + units <= endOfRow && !isOccupied(positions, ships)) {
        return true;
      }
    }
    return positions[positions.length - 1] <= 99 && !isOccupied(positions, ships);
  };

  const createPositionsArray = (index: number, units: number) => {
    return Array(units)
      .fill(0)
      .map((unit, i) => {
        if (isHorizontal) {
          return index + i;
        }
        return index + i * 10;
      });
  };

  const buildPlayerShip = (units: number, positions: any[]) => {
    const newShip = {
      id: currentShips.length + 1,
      positions,
      isSunk: false,
      hits: Array(units).fill(false),
    };
    const modifiedCurrentShips = currentShips.slice();
    modifiedCurrentShips.push(newShip);
    setCurrentShips(modifiedCurrentShips);
  };

  const canPlaceShip = (e: React.DragEvent<HTMLDivElement>, i: number) => {
    const units = shipStore[currentShips.length].size;
    const positions = createPositionsArray(i, units);
    if (arePositionsViable(i, units, positions, currentShips)) {
      buildPlayerShip(units, positions);
    }
  };

  const buildComputerShips = () => {
    const modifiedComputerShips = [];
    const computerSquares = [...Array(100).keys()];

    while (modifiedComputerShips.length < 5) {
      const square = _.sample(computerSquares);
      const positions = createPositionsArray(square, shipStore[modifiedComputerShips.length].size);
      if (
        arePositionsViable(
          square,
          shipStore[modifiedComputerShips.length].size,
          positions,
          modifiedComputerShips
        )
      ) {
        const newShip: any = {
          id: modifiedComputerShips.length + 1,
          positions,
          isSunk: false,
          hits: Array(shipStore[modifiedComputerShips.length].size).fill(false),
        };
        modifiedComputerShips.push(newShip);
      }
      const squareIndex = computerSquares.findIndex((i) => i === square);
      computerSquares.splice(squareIndex, 1);
    }
    return modifiedComputerShips;
  };

  const onDrag = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const rotateShip = () => {
    setIsHorizontal((prevState) => !prevState);
  };

  const undoPlacement = () => {
    if (currentShips.length > 0) {
      const modifiedCurrentShips = currentShips.slice();
      modifiedCurrentShips.pop();
      setCurrentShips(modifiedCurrentShips);
    }
  };

  return (
    <div className="ship_factory">
      <div className="ship_store">
        <div className="ship_store_title">
          <h3>Arrange your board</h3>
          <span>Drag and drop the ship below on a square</span>
        </div>
        <div className="ship_store_ship_container">
          <div className="ship_store_model">
            <span>
              {currentShips.length === 5
                ? 'All ships built! You may start the game.'
                : `Model: ${shipStore[currentShips.length].model}`}
            </span>
          </div>
          <div className="ship_builder">
            <div
              className={`ship_store_ship ${isHorizontal ? 'horizontal' : 'vertical'}`}
              draggable
              onDrag={onDrag}
            >
              {[...Array(shipStore[currentShips.length].size)].map((e, i) => (
                <Square key={`shipstore-${i + 1}`} />
              ))}
            </div>
          </div>
          <div className="ship_store_counter">Ships left: {5 - currentShips.length}/5</div>
          <div className="ship_store_buttons">
            <Button
              disabled={currentShips.length < 5}
              clicked={() => setShips(currentShips, buildComputerShips())}
            >
              Start Game
            </Button>
            <Button clicked={() => rotateShip()} disabled={false}>
              Rotate
            </Button>
            <Button disabled={currentShips.length === 0} clicked={() => undoPlacement()}>
              Undo
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShipFactory;
