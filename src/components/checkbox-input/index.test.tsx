import { render, fireEvent, screen } from 'test-utils/setupTestingLibrary';
import { CheckboxInput } from '.';

describe('<CheckboxInput>', () => {
    describe('initialValue is `false`', () => {
        it("should render with label and be unchecked", () => {
            render(<CheckboxInput label={'test'} initialValue={false} />);

            expect(screen.getByText('test')).toBeDefined();
            expect(screen.getByRole('checkbox')).not.toBeChecked();
        });
    });

    describe('initialValue is `true`', () => {
        it("should render with label and be checked", () => {
            render(<CheckboxInput label={'test'} initialValue={true} />);
            
            expect(screen.getByText('test')).toBeDefined();
            expect(screen.getByRole('checkbox')).toBeChecked();
        });
    });

    describe('when clicked', () => {
        it("the checked state should change", () => {
            render(<CheckboxInput label={'test'} initialValue={true} />);

            fireEvent.click(screen.getByRole('checkbox'));

            expect(screen.getByRole('checkbox')).not.toBeChecked();
        });
    });
});