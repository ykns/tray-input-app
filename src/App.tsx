import './App.css';
import { styled, Theme, ThemeProvider } from 'themes';
import { TabsFrame } from 'components/tabs-frame';
import React, { useState } from 'react';
import { UserForm, UserFormState } from 'components/user-form';
import { PrivacyForm, PrivacyState } from 'components/privacy-form';
import { DoneForm } from 'components/done-form';

export const AppContainer = styled.div<{ theme: Theme }>`
  height: 100vh;
  margin: 1em;
  background:  ${props => props.theme.colors.secondary};  
  color: ${props => props.theme.colors.primary};  
`;

interface FormsState {
  user: UserFormState,
  privacy: PrivacyState,
  userSubmitted: boolean,
  privacySubmitted: boolean
}

function App() {
  const [formsState, setFormsState] = useState<FormsState>({
    user: {
      name: '',
      role: '',
      email: '',
      password: '',
    },
    privacy: {
      receiveUpdatesForTrayByEmail: false,
      receiveUpdatesForOtherProductsByEmail: false,
    },
    userSubmitted: false,
    privacySubmitted: false,
  });

  const isUserValid = formsState.user.nameFailure === null && formsState.user.emailFailure === null && formsState.user.passwordFailure === null;

  return (
    <ThemeProvider theme={{
      colors: {
        primary: 'black',
        secondary: 'white',
        highlightPrimary: 'white',
        highlightSecondary: 'lightblue',
        required: 'red',
        okay: 'green',
      },
      fontSizeNormal: '2em',
      borderStyle: '0.5em solid black'
    }}>
      <AppContainer>
        <TabsFrame tabs={{
          '1': {
            id: '1',
            label: 'User',
            showSubmit: true,
            canNavigate: true,
            canSubmit: isUserValid,
            onSubmit: () => { setFormsState({...formsState, userSubmitted: true })},
            children: <UserForm
              getUserFormState={() => formsState.user}
              onUserFormStateChanged={(user: UserFormState) => {
                setFormsState({ ...formsState, user: user });
              }}
            />,
          },
          '2': {
            id: '2',
            label: 'Privacy',
            canNavigate: isUserValid && formsState.userSubmitted,
            showSubmit: true,
            canSubmit: true,
            onSubmit: () => { setFormsState({...formsState, privacySubmitted: true })},
            children: <PrivacyForm
              getPrivacyFormState={() => formsState.privacy}
              onPrivacyStateChanged={(privacy: PrivacyState) => setFormsState({ ...formsState, privacy: privacy })}
            />
          },
          '3': {
            id: '3',
            label: 'Done',
            canNavigate: isUserValid && formsState.userSubmitted && formsState.privacySubmitted,
            showSubmit: false,
            canSubmit: false,
            onShow: () => logFormData(formsState),
            children: (<DoneForm />)
          }
        }} />
      </AppContainer>
    </ThemeProvider>
  );
}

function logFormData(appState: FormsState) {
  console.log({
    name: appState.user.name,
    role: appState.user.role,
    email: appState.user.email,
    password: appState.user.password,
    receiveUpdatesForTrayByEmail: appState.privacy.receiveUpdatesForTrayByEmail,
    receiveUpdatesForOtherProductsByEmail: appState.privacy.receiveUpdatesForOtherProductsByEmail,
  })
}

export default App;
