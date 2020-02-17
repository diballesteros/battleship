import React, { Component } from 'react';
import Gameboard from '../gameboard/Gameboard';

import './ShipFactory.css';

const shipStore = [
    {
        model: 'Carrier',
        size: 5
    },
    {
        model: 'Battleship',
        size: 4
    },
    {
        model: 'Cruiser',
        size: 3
    },
    {
        model: 'Submarine',
        size: 3
    },
    {
        model: 'Destroyer',
        size: 2
    }
];

class ShipFactory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isHorizontal: false,
            currentModel: 0,
            currentShips: [],
            occupiedSquares: []
        }
    };

    canPlaceShip(i) {
        const units = shipStore[this.state.currentModel].size;
        const positions = this.createPositionsArray(i, units);
        if (this.state.isHorizontal) {
            const endOfRow = Math.ceil((i + 1) / 10) * 10;
            if ((i + units) <= endOfRow && !this.isOccupied(positions)) {
                this.buildShip(units, positions);
            } else console.log('invalid placement');
        } else {
            if (positions[positions.length - 1] <= 99 && !this.isOccupied(positions)) {
                this.buildShip(units, positions);
            } else console.log('invalid placement');
        }
    };

    isOccupied(positions) {
        for (let i = 0; i < positions.length; i++) {
            if (this.state.occupiedSquares.includes(positions[i])) {
                return true;
            }
        }
        return false;
    };

    createPositionsArray(index, units) {
        const positionArray = [];
        if (this.state.isHorizontal) {
            for (let i = 0; i < units; i++) {
                positionArray.push(index + i);
            }
        } else {
            for (let i = 0; i < units; i++) {
                positionArray.push(index + (i * 10));
            }
        }
        return positionArray;
    };

    buildShip(units, positions) {
        const newShip = {
            id: this.state.currentModel + 1,
            positions: positions,
            hits: Array(units).fill(false)
        }
        const modifiedCurrentShips = this.state.currentShips.slice();
        modifiedCurrentShips.push(newShip);
        const modifiedOccupiedSquares = this.state.occupiedSquares.slice();
        this.setState({
            currentShips: modifiedCurrentShips,
            occupiedSquares: modifiedOccupiedSquares.concat(positions),
            currentModel: this.state.currentModel + 1
        });
    };

    render() {
        return (
            <div>
                <Gameboard ships={this.state.currentShips} myBoard={true} resolveBoardClick={(i) => this.canPlaceShip(i)} />
            </div>
        );
    };
};

export default ShipFactory;
