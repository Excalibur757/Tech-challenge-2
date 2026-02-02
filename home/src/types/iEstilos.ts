export interface iDimensoes {
  height?: string;
  width?: string;
  margin?: string;
  padding?: string;
}

export interface iCores {
  backgroundColor?: string;
  color?: string;
}

export interface iBorda {
  border?: string;
  borderRadius?: string;
}

export interface iFontes {
  fontSize?: string;
  fontWeight?: string | number;
  fontFamily?: string;
  textAlign?: "left" | "right" | "center" | "justify";
}

export interface iEstilos extends iDimensoes, iCores, iFontes, iBorda {}
