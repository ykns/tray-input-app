import { render, fireEvent, screen } from 'test-utils/setupTestingLibrary';
import { createControllablePromise } from 'test-utils/controllable-promise';
import { AsyncButton } from './';

describe('<AsyncButton>', () => {
    describe('when not clicked', () => {
        it("should render as enabled", () => {
            const doWorkPromise = createControllablePromise<void>();
            const props = {
                onClick: async () => doWorkPromise.promise,
            };

            render(<AsyncButton {...props}>test</AsyncButton>);

            expect(screen.getByText('test')).toBeEnabled();
        });
    });

    describe('when clicked', () => {
        it("should render as disabled", () => {
            const doWorkPromise = createControllablePromise<void>();
            const props = {
                onClick: async () => doWorkPromise.promise,
            };
            render(<AsyncButton {...props}>test</AsyncButton>);

            fireEvent.click(screen.getByText('test'));

            expect(screen.getByText('test')).toBeDisabled();
        });
    });
});