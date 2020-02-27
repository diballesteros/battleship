import React from 'react';
import { render } from '@testing-library/react';
import Gameboard from './Gameboard';
import {TESTSHIPS} from '../../constants/constant';

describe('Gameboard component', () => {
    test('Initialized board', () => {
        const { asFragment } = render(<Gameboard ships={TESTSHIPS} myBoard={true} playerMoves={[]}/>);
        expect(asFragment()).toMatchSnapshot();
    });
});
