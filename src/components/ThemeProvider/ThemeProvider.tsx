import React from 'react';
import { ReactNode } from 'react';
import { ThemeProvider as StyledThemeProvider} from 'styled-components';

import theme from './theme';

interface ThemeProviderProps {
  children: ReactNode;
}

const ThemeProvider = ({ children }: ThemeProviderProps) => {
  return (
    <StyledThemeProvider theme={theme}>{children}</StyledThemeProvider>
  )
}

export default ThemeProvider;
