// Paleta com cores primitivas
export const palette = {
    // Brancos e Pretos
    branco: '#f8f8f8',
    preto: '#171717',

    // Cinzas
    cinza100: '#dee9ea',
    cinza300: '#CBCBCB',

    // Cores da Marca
    laranja500: '#ff5031',
    azul700: '#004d61',
    verde500: '#47A138',
    verde100: '#E4EDE3',

    // Cores para Dark Mode (Exemplo)
    cinza900: '#212121',
    cinza800: '#303030',
};

// Tema Light com cores semânticas
export const lightColors = {
    // Fundo e texto
    background: palette.verde100,
    foreground: palette.preto,

    // UI (ex: botões, links)
    primary: palette.laranja500,
    secondary: palette.azul700,
    success: palette.verde500,

    // Superfície (ex: backgrounds de cards, modais)
    surface: palette.branco,

    // Bordas e divisores
    border: palette.cinza300,
};

// Tema Dark com cores semânticas
export const darkColors = {
    // Fundo e texto
    background: palette.preto,
    foreground: palette.branco,

    // UI (ex: botões, links)
    primary: palette.laranja500,
    secondary: palette.azul700,
    success: palette.verde500,

    // Superfície (ex: backgrounds de cards, modais)
    surface: palette.cinza900,

    // Bordas e divisores
    border: palette.cinza800,
};

// Exporta 'lightColors' como o padrão
export const colors = lightColors;