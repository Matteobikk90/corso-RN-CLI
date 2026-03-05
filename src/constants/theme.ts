import { DarkTheme, DefaultTheme } from '@react-navigation/native';

export const lightTheme = {
  ...DefaultTheme,
  colors: { ...DefaultTheme.colors, primary: '#6366f1' },
};

export const darkTheme = {
  ...DarkTheme,
  colors: { ...DarkTheme.colors, primary: '#818cf8' },
};
