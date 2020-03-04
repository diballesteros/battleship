import React, { Component } from 'react';
import Gameboard from '../gameboard/Gameboard';
import './PlayerView.css';

class PlayerView extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    };

    render() {
        return (
            <div className='player_console'>
                <div className='player_board'>
                    <label>My Board</label>
                    <Gameboard
                        ships={this.props.playerShips}
                        myBoard={true}
                        origin={'Player'}
                        playerMoves={this.props.completedComputerMoves} />
                </div>
                <div data-testid='1' className='player_board'>
                    <label>Opponent's Board</label>
                    <Gameboard
                        ships={this.props.computerShips}
                        myBoard={false}
                        receivePlayerAttack={(shipId, i) => this.props.receivePlayerAttack(shipId, i)}
                        origin={'Opponent'}
                        playerMoves={this.props.playerMoves} />
                </div>
            </div>
        );
    };
}

export default PlayerView;
