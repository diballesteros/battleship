import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Button from './Button';

describe('Button component', () => {
    test('Button initalized', () => {
        const { asFragment } = render(<Button disabled={false}>Start Game</Button>);
        expect(asFragment()).toMatchSnapshot();
    });

    test('Button disabled', () => {
        const { asFragment } = render(<Button disabled={true}>Start Game</Button>);
        expect(asFragment()).toMatchSnapshot();
    });

    test('Button click', () => {
        const mockFn = jest.fn();
        const { container } = render(<Button disabled={false} clicked={() => mockFn()}>Start Game</Button>);
        const component = container.querySelector('button');
        fireEvent.click(component);
        expect(mockFn).toHaveBeenCalled();
    });
});
