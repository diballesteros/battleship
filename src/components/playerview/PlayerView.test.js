import React from 'react';
import { render } from '@testing-library/react';
import PlayerView from './PlayerView';
import {TESTSHIPS} from '../../constants/constant';

describe('PlayerView Component', () => {
    test('Initialized Playerview', () => {
        const { asFragment } = render( <PlayerView receivePlayerAttack={() => mockFn()} 
        playerShips={TESTSHIPS} 
        playerMoves={[]}
        computerShips={TESTSHIPS}
        completedComputerMoves={[]} />);
        expect(asFragment()).toMatchSnapshot();
    });
});
