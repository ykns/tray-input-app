import { styled, Theme } from 'themes';

export const ButtonContainer = styled.button<{ disabled?: boolean, theme: Theme }>`
  background: ${props => props.theme.colors.secondary};
  color: ${props => props.theme.colors.primary}; 
  min-height: 2em; 
  font-size: ${props => props.theme.fontSizeNormal};
  opacity: ${props => props.disabled ? 0.5 : 1};
`;

export interface ButtonProps {
    onClick: (event: React.SyntheticEvent) => void;
    disable?: boolean;
    children: NonNullable<React.ReactNode>;
    role?: string;
}

export const Button = (props: ButtonProps) => {
    const { onClick, disable, children, role, ...rest } = props;

    return <ButtonContainer disabled={disable} onClick={async (event: React.SyntheticEvent) => {
        onClick(event)
    }}  {...(role && { role: role })} {...rest}>{children}</ButtonContainer >
}