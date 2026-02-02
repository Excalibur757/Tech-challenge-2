import { iEstilos } from "./iEstilos";

export interface IBotao extends iEstilos {
    label: string;
    prefixo?: React.ReactNode;
    sufixo?: React.ReactNode;
    onClick?: () => void;
    disabled?: boolean;
    className?: string;
    title?: string;
  }
  