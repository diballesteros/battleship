import React, { Component } from 'react';
import PlayerView from '../playerview/PlayerView';

import _ from 'lodash';

class Game extends Component {
    constructor(props) {
        super(props);
        const computerMoves = [...Array(100).keys()];
        this.state = {
            playerTurn: true,
            computerMoves: computerMoves
        }
    }

    turnHandler () {
        this.setState({
            playerTurn: !this.state.playerTurn
        })
    };

    removeComputerMove(i) {
        const modifiedComputerMoves = this.state.computerMoves.slice();
        modifiedComputerMoves.splice(i, 1);
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
                <PlayerView
                    myTurn={this.state.playerTurn} 
                    turnHandler={() => this.turnHandler()}
                    performComputerMove={() => this.performComputerMove()}/>
            </div>
        );
    };
}

export default Game;
