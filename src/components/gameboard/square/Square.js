import React from 'react';
import './Square.css';

const Square = (props) => {
    switch (props.type) {
        case "ship":
            return <div onClick={props.resolveBoardClick} className={`square ship-square ${props.myBoard ? 'my_square' : ''}`}>{props.hit ? 'X' : ''}</div>
        default:
            return <div onClick={props.resolveBoardClick} className={`square ocean-square ${props.myBoard ? 'my_square' : ''}`}>{props.hit ? 'X' : ''}</div>
    }
}

export default Square;
