import React, { Component } from 'react';
import Gameboard from '../gameboard/Gameboard';
import Square from '../gameboard/square/Square';

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
            isHorizontal: true,
            currentModel: 0,
            currentShips: [],
            occupiedSquares: [],
            isShipBuilt: false
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

    onDrag = (event) => {
        event.preventDefault();
    }

    render() {
        return (
            <div className='ship_factory'>
                <Gameboard ships={this.state.currentShips} myBoard={true} resolveBoardDrop={(i) => this.canPlaceShip(i)} />
                <div className='ship_store'>
                    <div className='ship_store_title'>
                        <label>Place your ships</label>
                        <span>Instructions</span>
                    </div>
                    <div className='ship_store_ship_container'>
                        {
                            this.state.isShipBuilt ? <button>Start Game</button> :
                                <div>
                                    <label>Model: {shipStore[this.state.currentModel].model}</label>
                                    <div className='ship_store_ship' draggable onDrag={(event) => this.onDrag(event)}>
                                        {
                                            [...Array(shipStore[this.state.currentModel].size)].map((e, i) => <Square key={i} type={'ship'} myBoard={true} />)
                                        }
                                    </div>
                                </div>
                        }
                    </div>
                </div>
            </div>
        );
    };
};

export default ShipFactory;
