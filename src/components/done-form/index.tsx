import { styled, Theme } from "themes";
import { Tick } from '@styled-icons/typicons/Tick';

const DoneFormContainer = styled.div<{ theme: Theme }>`
    background: ${props => props.theme.colors.secondary};
    color: ${props => props.theme.colors.okay};
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const LabelContainer = styled.label<{ theme: Theme }>`
    font-size: ${props => props.theme.fontSizeNormal};
`

const OkayTick = styled(Tick) <{ theme: Theme }>`
    color: ${props => props.theme.colors.okay};
    width: 10em;
`

export function DoneForm() {
    return (
        <DoneFormContainer>
            <OkayTick />
            <LabelContainer>
                Please verify your email address, you should
            </LabelContainer>
            <LabelContainer>
                have received an email from us already!
            </LabelContainer>
        </DoneFormContainer>
    )
}