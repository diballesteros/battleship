import React, { Component } from 'react';
import PlayerView from '../playerview/PlayerView';

import _ from 'lodash';

class Game extends Component {
    constructor(props) {
        super(props);
        const computerMoves = [...Array(100).keys()];
        this.state = {
            computerMoves: computerMoves
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

    performComputerMove() {
        const nextMove = _.sample(this.state.computerMoves);
        this.removeComputerMove(nextMove);
        return nextMove;
    }

    render() {
        return (
            <div>
                <PlayerView performComputerMove={() => this.performComputerMove()}/>
            </div>
        );
    };
}

export default Game;
