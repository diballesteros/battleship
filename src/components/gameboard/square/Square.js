import React from 'react';
import './Square.css';

const onDragOver = (event) => {
    event.preventDefault();
}

const Square = (props) => {
    switch (props.type) {
        case 'ship':
            return <div 
                    onClick={props.resolveSquareClick} 
                    className={`square ship-square ${props.myBoard ? 'my_square' : ''}`}
                    onDrop={props.resolveBoardDrop}
                    onDragOver={event => onDragOver(event)}>
                        {props.hit ? 'X' : ''}
                    </div>
        case 'grid':
            return <div className='square grid-square'>{props.text}</div>
        default:
            return <div 
                    onClick={props.resolveSquareClick} 
                    className={`square ocean-square ${props.myBoard ? 'my_square' : ''}`}
                    onDrop={props.resolveBoardDrop}
                    onDragOver={event => onDragOver(event)}>
                        {props.hit ? 'X' : ''}
                    </div>
    }
}

export default Square;
