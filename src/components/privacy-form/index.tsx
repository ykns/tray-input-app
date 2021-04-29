import { CheckboxInput } from "components/checkbox-input";
import { styled, Theme } from "themes";

const MarketingFormContainer = styled.div<{ theme: Theme }>`
  background: ${props => props.theme.colors.secondary};
  color: ${props => props.theme.colors.primary};
`;

export interface PrivacyFormProps {
    getPrivacyFormState: () => PrivacyState,
    canSubmit?: (userState: PrivacyState) => boolean,
    onPrivacyStateChanged: (userState: PrivacyState) => void,
}

export interface PrivacyState {
    receiveUpdatesForTrayByEmail: boolean,
    receiveUpdatesForOtherProductsByEmail: boolean,
}

export function PrivacyForm(props: PrivacyFormProps) {
    const { getPrivacyFormState, onPrivacyStateChanged } = props;
    const marketingState = getPrivacyFormState();
    return <MarketingFormContainer>
        <CheckboxInput label={'Receive updates about Tray.io product by email'}
            initialValue={marketingState.receiveUpdatesForTrayByEmail}
            onValueChanged={(value: boolean) => onPrivacyStateChanged({ ...marketingState, receiveUpdatesForTrayByEmail: value })} />
        <CheckboxInput label={'Receive communication by email for other products created by the Tray.io team'}
            initialValue={marketingState.receiveUpdatesForOtherProductsByEmail}
            onValueChanged={(value: boolean) => onPrivacyStateChanged({ ...marketingState, receiveUpdatesForOtherProductsByEmail: value })} />        
    </MarketingFormContainer>
}