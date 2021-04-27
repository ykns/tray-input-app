import { useState } from "react";
import { styled, Theme } from "themes";

const LabelContainer = styled.label<{ theme: Theme }>`
    background: ${props => props.theme.colors.secondary};
    color: ${props => props.theme.colors.primary};     
    display: flex;
    flex-direction: row;
    font-size: ${props => props.theme.fontSizeNormal};
`

const TextInputContainer = styled.input<{ theme: Theme }>`
    background: ${props => props.theme.colors.secondary};
    color: ${props => props.theme.colors.primary}; 
    min-height: 2em; 
    min-width: 100%;
    font-size: ${props => props.theme.fontSizeNormal};
`;

const RequiredContainer = styled.div<{ theme: Theme }>`
    color: ${props => props.theme.colors.required}; 
`

const ErrorTextContainer = styled.div<{hide?: boolean, theme: Theme}>`
    color: ${props => props.theme.colors.required};
    display: ${props => props.hide ? 'hidden': 'block'};
    white-space: pre-line;
    min-height: 4em;
`
export interface TextInputProps {
    label: string,
    initialValue: string,
    isRequired: boolean,
    isPassword?: boolean,
    onValueChanged?: (value: string, validation: string | null) => void,
    validation?: (value: string) => string | null,
    showValidationErrors?: boolean,
}


interface InputState {
    value: string,
    error?: string | null,
}

export function TextInput(props: TextInputProps) {
    const { label, isRequired, onValueChanged, initialValue, validation, isPassword, showValidationErrors } = props;
    const [inputState, setInputState] = useState<InputState>({
        value: initialValue,
    });
    return (<div>
        <LabelContainer>{label}: {isRequired ? (<RequiredContainer>*</RequiredContainer>) : null}
        </LabelContainer>
        <TextInputContainer type={isPassword ? 'password' : 'text'} value={inputState.value} onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            const val = event.target.value;
            const error = validation ? validation(val) : null;
            setInputState({
                value: val,
                error: error,
            });

            onValueChanged && onValueChanged(val, error);
        }} />
        {(<ErrorTextContainer hide={showValidationErrors && !inputState.error}>{inputState.error}</ErrorTextContainer>)}
    </div>
    );
}
