import React, { Component } from 'react';
import './Square.css';

class Square extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sunk: false,
            isShip: false
        }
    }

    isSunk() {
        let sunkStatus = this.state.hits.every(value => value === true);
        this.setState({ sunk: sunkStatus });
    };

    render() {
        return (
            <div className="ocean-square">
                Ocean Square
            </div>
        );
    }
}

export default Square;