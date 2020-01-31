import React, { component } from 'react';

class Ship extends component {
    constructor(props) {
        super(props);
        this.state = {
            sunk: false,
            hits: [],
            coordinates: []
        }
    }

    updateHits (i) {
        const modifiedShip = this.state.hits.slice();
        modifiedShip[i] = !modifiedShip[i];
        this.setState({
            hits: modifiedShip
        });
    };

    isSunk () {
        let sunkStatus = this.state.hits.every(value => value === true);
        this.setState({ sunk: sunkStatus });
    };

    render() {

    }
}

export default Ship;
