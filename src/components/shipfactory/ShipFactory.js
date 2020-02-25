import React, { Component } from 'react';
import Gameboard from '../gameboard/Gameboard';
import Square from '../gameboard/square/Square';
import Button from '../UI/button/Button';

import './ShipFactory.css';
import rotate from './rotate.png';

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
            currentShips: []
        }
    };

    canPlaceShip(event, i) {
        event.target.style.removeProperty('background-color');
        const units = shipStore[this.state.currentShips.length].size;
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
            for (let j = 0; j < this.state.currentShips.length; j++) {
                if (this.state.currentShips[j].positions.includes(positions[i])) {
                    return true;
                }
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
            id: this.state.currentShips.length + 1,
            positions: positions,
            hits: Array(units).fill(false)
        }
        const modifiedCurrentShips = this.state.currentShips.slice();
        modifiedCurrentShips.push(newShip);
        this.setState({
            currentShips: modifiedCurrentShips
        });
    };

    onDrag = (event) => {
        event.preventDefault();
    };

    rotateShip() {
        this.setState({
            isHorizontal: !this.state.isHorizontal
        });
    };

    undoPlacement() {
        if (this.state.currentShips.length > 0) {
            const modifiedCurrentShips = this.state.currentShips.slice();
            modifiedCurrentShips.pop();
            this.setState({
                currentShips: modifiedCurrentShips
            })
        }
    };

    render() {
        return (
            <div className='ship_factory'>
                <Gameboard ships={this.state.currentShips} myBoard={true} resolveBoardDrop={(event, i) => this.canPlaceShip(event, i)} playerMoves={[]} />
                <div className='ship_store'>
                    <div className='ship_store_title'>
                        <label>Arrange your board</label>
                        <span>Drag and drop the ship below on a square</span>
                    </div>
                    {
                        <div className='ship_store_ship_container'>
                            <div className='ship_store_model'>
                                <label>Model: {shipStore[this.state.currentShips.length].model}</label>
                                <div onClick={() => this.rotateShip()}><img alt='rotate' src={rotate} /></div>
                            </div>
                            <div className={`ship_store_ship ${this.state.isHorizontal ? 'horizontal' : 'vertical'}`} draggable onDrag={(event) => this.onDrag(event)}>
                                {
                                    [...Array(shipStore[this.state.currentShips.length].size)].map((e, i) => <Square key={i} type={'ship'} myBoard={true} />)
                                }
                            </div>
                            <div>Ships left: {5 - this.state.currentShips.length}/5</div>
                            <div className='ship_store_buttons'>
                                <Button>Start Game</Button>
                                <Button clicked={() => this.undoPlacement()}>Undo</Button>
                                <Button>Reset</Button>
                            </div>
                        </div>
                    }
                </div>
            </div>
        );
    };
};

export default ShipFactory;
