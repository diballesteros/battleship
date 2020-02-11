import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Square from './Square';

describe('Square component', () => {
    test('Ocean Square initialized', () => {
        const { asFragment } = render(<Square type='ocean' hit={false} />);
        expect(asFragment()).toMatchSnapshot();
    });

    test('Ship Square initialized', () => {
        const { asFragment } = render(<Square type='ship' hit={false} />);
        expect(asFragment()).toMatchSnapshot();
    });

    test('Ship square hit', () => {
        const mockFn = jest.fn();
        const { container } = render(<Square type='ship' hit={false} hitHandler={() => mockFn()} />);
        const component = container.querySelector('div');
        fireEvent.click(component);
        expect(mockFn).toHaveBeenCalled();
    });
});