import { iEstilos } from "./iEstilos";

export interface iInput extends iEstilos{
    type: string;
    placeholder?: string;
    value: string | number;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    id?: string;
    disabled?: boolean;
    label?: string;
}