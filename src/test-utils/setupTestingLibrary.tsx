import React from 'react'
import { render } from '@testing-library/react'
import { ThemeProvider } from "themes";


const testTheme = {
  colors: {
    primary: 'black',
    secondary: 'white',
    highlightPrimary: 'white',
    highlightSecondary: 'green',
    required: 'red',
    okay: 'green',  
  },
  fontSizeNormal: '1em', 
  borderStyle: '1px solid black'
};


const AllTheProviders = ({ children }: { children: NonNullable<React.ReactNode> }) => {
  return (
    <ThemeProvider theme={testTheme}>
      {children}
    </ThemeProvider>
  );
}

const customRender = (ui: React.ReactElement, options?: any) =>
  render(ui, { wrapper: AllTheProviders, ...options })

// re-export everything
export * from '@testing-library/react'

// override render method
export { customRender as render }