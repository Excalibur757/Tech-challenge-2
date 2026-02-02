import { spacing } from './spacing';
import { lightColors, darkColors, palette } from './colors';
import {
    fontFamilies,
    fontSizes,
    fontWeights,
    lineHeights,
    letterSpacings
} from './typography';

const baseTheme = {
    spacing,
    fontFamilies,
    fontSizes,
    fontWeights,
    lineHeights,
    letterSpacings,
    palette,
};

export const lightTheme = {
    ...baseTheme,
    colors: lightColors,
};

export const darkTheme = {
    ...baseTheme,
    colors: darkColors,
};

export type AppTheme = typeof lightTheme;

export const defaultTheme = lightTheme;