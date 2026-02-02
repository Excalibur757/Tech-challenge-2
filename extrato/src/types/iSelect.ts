import { ChangeEvent } from "react";
import { iEstilos } from "./iEstilos";

export interface iSelect extends iEstilos{
    value: string | number;
    onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
    id?: string;
    disabled?: boolean;
    label?: string;
    options: {value: string | number; label: string}[];
}