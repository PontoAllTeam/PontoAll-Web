import { ReactNode, useEffect, useState } from 'react';
import { ThemeContext } from './ThemeContext';

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setTheme] = useState('light');
  const [fontSize, setFontSize] = useState(16); // Tamanho da fonte em pixels

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') ?? 'light';
    const savedFontSize = Number(localStorage.getItem('fontSize')) || 16;

    setTheme(savedTheme);
    setFontSize(savedFontSize);

    document.documentElement.setAttribute('data-theme', savedTheme);
    document.documentElement.style.setProperty(
      '--font-size',
      `${savedFontSize}px`
    );
  }, []);

  const changeTheme = (newTheme: string) => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  const changeFontSize = (newFontSize: number) => {
    if (newFontSize < 10 || newFontSize > 44) return; // Impede números absurdos

    setFontSize(newFontSize);
    localStorage.setItem('fontSize', `${newFontSize}`);

    // Atualiza a variável CSS do tamanho da fonte
    document.documentElement.style.setProperty(
      '--font-size',
      `${newFontSize}px`
    );
  };

  return (
    <ThemeContext.Provider
      value={{ theme, fontSize, changeTheme, changeFontSize }}
    >
      {children}
    </ThemeContext.Provider>
  );
}
