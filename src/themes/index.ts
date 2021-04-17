import baseStyled, { ThemedStyledInterface, ThemeProvider as BaseThemeProvider, ThemeProviderComponent } from 'styled-components';

export interface Theme {
  colors: {
    primary: string,
    secondary: string,
    highlightPrimary: string,
    highlightSecondary: string,
    required: string,
    okay: string,
  }
  fontSizeNormal: string,  
  borderStyle: string,
}

export const styled = baseStyled as ThemedStyledInterface<Theme>;
export const ThemeProvider = BaseThemeProvider as ThemeProviderComponent<Theme>;