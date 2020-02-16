import React from 'react';
import Gameboard from '../gameboard/Gameboard';
import './ShipFactory.css';


const ShipFactory = () => {
    return (
        <div>
            <Gameboard ships={[]} myBoard={true} recieveAttack={(i) => this.receiveAttack(i)} board={[]}/>
        </div>
    );
}

export default ShipFactory;
