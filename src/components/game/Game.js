import React, { Component } from 'react';
import PlayerView from '../playerview/PlayerView';
import ShipFactory from '../shipfactory/ShipFactory';

import _ from 'lodash';

class Game extends Component {
    constructor(props) {
        super(props);
        this.state = {
            computerMoves: [...Array(100).keys()]
        }
    }

    removeComputerMove(i) {
        const modifiedComputerMoves = this.state.computerMoves.slice();
        const computerHitIndex = this.state.computerMoves.findIndex(move => move === i);   
        modifiedComputerMoves.splice(computerHitIndex, 1);
        this.setState({
            computerMoves: modifiedComputerMoves
        })
    };

    getComputerMove() {
        const nextMove = _.sample(this.state.computerMoves);
        this.removeComputerMove(nextMove);
        return nextMove;
    }

    render() {
        return (
            <div>
                <PlayerView getComputerMove={() => this.getComputerMove()}/>
            </div>
        );
    };
}

export default Game;
