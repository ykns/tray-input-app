import { useState } from "react";
import { styled, Theme } from "themes";
import { v4 as uuidv4 } from 'uuid';

const RootContainer = styled.div`
    min-height: 4em;
`;

const LabelContainer = styled.label<{ htmlFor: string, theme: Theme }>`    
    margin-left: 0.5em; 
    font-size: ${props => props.theme.fontSizeNormal};
`;

const CheckboxInputContainer = styled.input<{ theme: Theme }>`
    background: ${props => props.theme.colors.secondary};
    color: ${props => props.theme.colors.primary}; 
    height: 1.5em;
    width: 1.5em;
    input[type="checkbox"]{
        background: ${props => props.theme.colors.secondary};
        color: ${props => props.theme.colors.primary}; 
        &:checked {
            background: ${props => props.theme.colors.secondary};
            color: ${props => props.theme.colors.primary}; 
        }
    }
`;

export interface CheckboxInputProps {
    label: string,
    initialValue: boolean,
    onValueChanged?: (value: boolean) => void,
}

export function CheckboxInput(props: CheckboxInputProps) {
    const { label, onValueChanged, initialValue } = props;
    const [inputState, setInputState] = useState<boolean>(initialValue);
    const id = uuidv4();
    return (<RootContainer>
        <CheckboxInputContainer id={id} 
        type='checkbox' 
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            const val = event.target.checked;
            onValueChanged && onValueChanged(val);
            setInputState(val);
        }} 
        checked={inputState} 
        />
        <LabelContainer htmlFor={id}>{label}</LabelContainer>
    </RootContainer>);
}
