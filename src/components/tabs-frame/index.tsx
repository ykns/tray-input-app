import React, { useState } from 'react';
import { styled, Theme } from 'themes';
import { Button } from 'components/button';

const TabsFrameContainer = styled.div<{ theme: Theme }>`
    background: ${props => props.theme.colors.secondary};
    color: ${props => props.theme.colors.primary};
`;

const TabButtonsContainer = styled.div<{ theme: Theme }>`
    display: flex;
    border: ${props => props.theme.borderStyle};
    margin-bottom: 0.8em;
    --box-shadow-color: black;
    box-shadow: 0.5em 0.5em var(--box-shadow-color);
`;

const TabPanelContainer = styled.div<{ theme: Theme }>`
    padding: 1.5em;
    border: ${props => props.theme.borderStyle};
`;

const SelectedTabContentContainer = styled.div`
    display: block;
    width: 97%;    
`;

const TabButtonContainer = styled(Button) <{ isActive: boolean, theme: Theme }>`
    flex-grow: 1;
    background: ${props => props.isActive ? props.theme.colors.highlightSecondary : props.theme.colors.secondary};
    color: ${props => props.theme.colors.primary};
`
const FooterContainer = styled.div`
    margin-top: 4em;
    display: flex;
    flex-direction: row-reverse;
`

const SubmitButtonContainer = styled(Button) <{ theme: Theme }>`    
    background: ${props => props.theme.colors.okay};
    --box-shadow-color: black;
    box-shadow: 0.2em 0.2em var(--box-shadow-color);
`

export interface Tab {
    id: string;
    label: string;
    children: React.ReactElement;
    canNavigate?: boolean;
    showSubmit?: boolean;
    canSubmit?: boolean;
    onSubmit?: () => void;
    onShow?: () => void;
}

export interface TabFrameProps {
    tabs: { [tabId: string]: Tab }
}

export const TabsFrame = (props: TabFrameProps) => {
    const { tabs, ...rest } = props;
    const [selectedTabId, setSelectedTabId] = useState(Object.values(tabs)[0].id);
    const selectedTab = tabs[selectedTabId];
    const showSelectTabChildren = () => {
        if (selectedTab.onShow) {
            selectedTab.onShow();
        }
        return selectedTab.children;
    }
    return (<TabsFrameContainer {...rest}>
        <TabButtonsContainer>
            {Object.values(tabs).map(tab => (
                <TabButtonContainer key={tab.id} disable={!tab.canNavigate} onClick={() => {
                    setSelectedTabId(tab.id);
                }} role="tab" isActive={tab.id === selectedTabId}>{tab.label}
                </TabButtonContainer>
            ))}
        </TabButtonsContainer>
        <TabPanelContainer>
            <SelectedTabContentContainer role='tabpanel'>
                {showSelectTabChildren()}
            </SelectedTabContentContainer>
            {selectedTab.showSubmit && <FooterContainer>
                <SubmitButtonContainer disable={!selectedTab.canSubmit}
                    onClick={() => {
                        selectedTab.onSubmit && selectedTab.onSubmit();
                        const keys = Object.keys(tabs);
                        const indexOfKey = keys.indexOf(selectedTabId);
                        if (indexOfKey === -1) {
                            throw new Error('Could not find tab by key');
                        }
                        let nextKey = keys[indexOfKey + 1];
                        if (typeof nextKey === typeof undefined) {
                            nextKey = keys[0];
                        }
                        setSelectedTabId(nextKey);
                    }}>Submit</SubmitButtonContainer>
            </FooterContainer>}
        </TabPanelContainer>
    </TabsFrameContainer >);
}