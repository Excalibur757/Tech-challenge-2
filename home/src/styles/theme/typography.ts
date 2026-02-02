const sansSerifFallback = [
    'ui-sans-serif',
    '-apple-system',
    'BlinkMacSystemFont',
    '"Segoe UI"',
    'Roboto',
    '"Helvetica Neue"',
    'Arial',
    'sans-serif',
].join(', ');

const monoFallback = [
    'ui-monospace',
    'SFMono-Regular',
    'Menlo',
    'Monaco',
    'Consolas',
    '"Courier New"',
    'monospace',
].join(', ');

export const fontFamilies = {
    primary: `var(--font-inter), ${sansSerifFallback}`,

    secondary: `var(--font-inter), ${sansSerifFallback}`,

    mono: `var(--font-mono), ${monoFallback}`,
};

export const fontWeights = {
    light: 300,
    regular: 400,
    medium: 500,
    bold: 700,
};

export const fontSizes = {
    // 12px
    caption: '0.75rem',
    // 14px
    small: '0.875rem',
    // 16px
    body: '1rem',
    // 18px
    subheading: '1.125rem',
    // 20px
    kicker: '1.25rem',
    // 24px
    heading: '1.5rem',
    // 32px
    title: '2rem',
    // 48px
    display: '3rem',
    // 64px
    displayLarge: '4rem',
};

export const lineHeights = {
    condensed: 1.25,
    normal: 1.5,
    relaxed: 1.75,
};

export const letterSpacings = {
    tight: '-0.025em',
    normal: 'normal',
    wide: '0.05em',
};