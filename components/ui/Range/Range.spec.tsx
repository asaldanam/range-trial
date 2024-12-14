import { fireEvent, prettyDOM, render, screen } from '@testing-library/react';
import Range, { RangeProps } from './Range';

// Render without crashing
test('renders without crashing', () => {
    render(<Range />);
});

describe('Given a min 0 and max 100 with unit €', () => {
    // Arrange
    const props: Partial<RangeProps> = {
        min: 0,
        max: 100,
        unit: '€'
    };

    const setupManualInputs = async (values: { start: number; end: number }) => {
        const { start, end } = values;
        render(<Range {...props} />);

        const minInput = await screen.findByLabelText('start');
        fireEvent.change(minInput, { target: { value: start } });

        const maxInput = await screen.findByLabelText('end');
        fireEvent.change(maxInput, { target: { value: end } });
    };

    describe('when user set start value to 10 and end value to 90 by manual input on fields', () => {
        const start = 10;
        const end = 90;

        test(`start input value should have value of ${start}`, async () => {
            await setupManualInputs({ start, end });
            const minInput = await screen.findByLabelText('start');

            expect(minInput).toHaveValue(start);
        });

        test(`start handler should have a style attribute of "left: ${start}%"`, async () => {
            await setupManualInputs({ start, end });
            const startHandler = await screen.findByTestId('start-handler');

            expect(startHandler).toHaveStyle(`left: ${start}%`);
        });

        test(`end input value should have value of ${end}`, async () => {
            await setupManualInputs({ start, end });
            const maxInput = await screen.findByLabelText('end');

            expect(maxInput).toHaveValue(end);
        });

        test(`end handler should have a style attribute of "left: ${end}%"`, async () => {
            await setupManualInputs({ start, end });
            const endHandler = await screen.findByTestId('end-handler');

            expect(endHandler).toHaveStyle(`left: ${end}%`);
        });
    });

    describe('When user end value over max by manual input on fields', () => {
        const start = 10;
        const end = 150;

        test(`end input value should have value of max ${props.max} instead of ${end}`, async () => {
            await setupManualInputs({ start, end });
            const maxInput = await screen.findByLabelText('end');

            expect(maxInput).toHaveValue(props.max);
        });

        test(`end handler should have a style attribute of "left: ${props.max}%" instead of "left: ${end}%"`, async () => {
            await setupManualInputs({ start, end });
            const endHandler = await screen.findByTestId('end-handler');

            expect(endHandler).toHaveStyle(`left: ${props.max}%`);
        });
    });
});

describe('Given a bar with 200px width', () => {
    // Arrange
    const barRect = { left: 0, width: 200 } as DOMRect;
    const props: Partial<RangeProps> = {
        min: 0,
        max: 100,
        unit: '€'
    };

    const setupHandlerMovement = async (handler: { startXMovement?: number; endXMovement?: number }) => {
        render(<Range {...props} />);
        const bar = await screen.findByTestId('bar');
        jest.spyOn(bar, 'getBoundingClientRect').mockReturnValue(barRect);

        if (typeof handler.startXMovement === 'number') {
            const startHandler = screen.getByTestId('start-handler');
            fireEvent.mouseDown(startHandler);
            fireEvent.mouseMove(document, { clientX: handler.startXMovement });
        }

        if (typeof handler.endXMovement === 'number') {
            const endHandler = screen.getByTestId('end-handler');
            fireEvent.mouseDown(endHandler);
            fireEvent.mouseMove(document, { clientX: handler.endXMovement });
        }
    };

    describe('When start handler is moved 99px to the right', () => {
        const startXMovement = 99;

        test(`start input value should have value of 50`, async () => {
            await setupHandlerMovement({ startXMovement });
            const minInput = await screen.findByLabelText('start');

            expect(minInput).toHaveValue(50);
        });

        test(`start handler should have a style attribute of "left: 50%"`, async () => {
            await setupHandlerMovement({ startXMovement });
            const startHandler = await screen.findByTestId('start-handler');

            expect(startHandler).toHaveStyle(`left: 50%`);
        });
    });

    describe('When end handler is moved 99px to the left', () => {
        const endXMovement = 99;

        test(`end input value should have value of 50`, async () => {
            await setupHandlerMovement({ endXMovement });
            const maxInput = await screen.findByLabelText('end');

            expect(maxInput).toHaveValue(50);
        });

        test(`end handler should have a style attribute of "left: 50%"`, async () => {
            await setupHandlerMovement({ endXMovement });
            const endHandler = await screen.findByTestId('end-handler');

            expect(endHandler).toHaveStyle(`left: 50%`);
        });
    });

    describe('Given a range of [5.99, 7.99, 11.99]', () => {
        test('Start and end inputs should be disabled', () => {
            render(<Range range={[5.99, 7.99, 11.99]} />);
            const minInput = screen.getByLabelText('start');
            const maxInput = screen.getByLabelText('end');

            expect(minInput).toBeDisabled();
            expect(maxInput).toBeDisabled();
        });
    });
});
