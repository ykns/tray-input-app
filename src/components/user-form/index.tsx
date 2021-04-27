import { TextInput } from "components/text-input";
import { styled, Theme } from "themes";

const UserFormContainer = styled.div<{ theme: Theme }>`
  background: ${props => props.theme.colors.secondary};
  color: ${props => props.theme.colors.primary};
`;

export interface UserFormProps {
    getUserFormState: () => UserFormState,
    canSubmit?: (userState: UserFormState) => boolean,
    onUserFormStateChanged: (userState: UserFormState) => void,
}

export interface UserFormState {
    name: string | null,
    nameFailure?: string | null,
    role: string | null,
    email: string | null,
    emailFailure?: string | null,
    password: string | null,
    passwordFailure?: string | null,
}

export function UserForm(props: UserFormProps) {
    const { getUserFormState, onUserFormStateChanged } = props;
    const userState = getUserFormState();
    return (<UserFormContainer>
        <TextInput label={'name'}
            isRequired={userState.name ? false : true}
            initialValue={userState.name === null ? '' : userState.name}
            validation={validateName}
            showValidationErrors={true}
            onValueChanged={(value: string, failure: string | null) => onUserFormStateChanged({ ...userState, name: value, nameFailure: failure })} />
        <TextInput label={'role'}
            isRequired={false}
            initialValue={userState.role === null ? '' : userState.role}
            onValueChanged={(value: string) => onUserFormStateChanged({ ...userState, role: value })} />
        <TextInput label={'email'}
            isRequired={userState.email ? false : true}
            initialValue={userState.email === null ? '' : userState.email}
            validation={validateEmail}
            showValidationErrors={true}
            onValueChanged={(value: string, failure: string | null) => onUserFormStateChanged({ ...userState, email: value, emailFailure: failure })}/>
        <TextInput label={'password'}
            isRequired={userState.password ? false : true}
            initialValue={userState.password === null ? '' : userState.password}
            validation={validatePassword}
            showValidationErrors={true}
            isPassword={true}
            onValueChanged={(value: string, failure: string | null) => onUserFormStateChanged({ ...userState, password: value, passwordFailure: failure })} />
    </UserFormContainer>);
}

function validatePassword(value: string) {
    if (value.length === 0) {
        return '';
    }
    if (value.length < 9) {
        return 'password needs to be 9 characters long';
    }
    let missingPasswordCriteria = '';
    if (!value.match(/[0-9]/)) {
        missingPasswordCriteria += '\n- at least one number';
    }
    if (!value.match(/[a-z]/)) {
        missingPasswordCriteria += '\n- at least one lowercase character';
    }
    if (!value.match(/[A-Z]/)) {
        missingPasswordCriteria += '\n- at least one uppercase character';
    }
    if (missingPasswordCriteria) {
        return `password must contain: ${missingPasswordCriteria}`;
    }
    return null;
}

function validateEmail(value: string) {
    if (value.length === 0) {
        return '';
    }
    if (!value.match(/\S+@\S+\.\S+/)) {
        return 'email is invalid';
    }
    return null;
}

function validateName(value: string) {
    return value.length > 0 ? null : '';
}
