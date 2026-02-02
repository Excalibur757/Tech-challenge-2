import { Inter, Fira_Code } from 'next/font/google';

// Carrega a Inter como uma fonte variável
export const inter = Inter({
    subsets: ['latin'],
    weight: ['400', '500', '600', '700'],
    display: 'swap',
    variable: '--font-inter',
});

// Carrega a Fira Code como fonte mono
export const firaCode = Fira_Code({
    subsets: ['latin'],
    weight: ['400', '700'],
    display: 'swap',
    variable: '--font-mono',
});