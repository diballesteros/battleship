import React from 'react';
import { render } from '@testing-library/react';
import Game from './Game';

describe('Game component', () => {
    test('Initialized board', () => {
        const { asFragment } = render(<Game />);
        expect(asFragment()).toMatchSnapshot();
    });
});
