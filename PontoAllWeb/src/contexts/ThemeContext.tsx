import { createContext } from 'react';

interface ThemeContextType {
  theme: string;
  fontSize: number;
  changeTheme: (newTheme: string) => void;
  changeFontSize: (newFontSize: number) => void;
}

export const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  fontSize: 16,
  changeFontSize() {},
  changeTheme() {},
});
