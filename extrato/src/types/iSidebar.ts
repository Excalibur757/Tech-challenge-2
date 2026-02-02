import React from "react";
import { iEstilos } from "./iEstilos";

// Define o formato de um item de link
export interface iSidebarLink {
    href: string;
    label: string;
}

// Estende interface 'iEstilos' e adiciona props específicas
export interface iSidebar extends iEstilos {
    // Props de conteúdo e estado
    links?: iSidebarLink[];

    // Props de layout específicas
    display?: string;
    flexDirection?: React.CSSProperties["flexDirection"];
    gap?: string | number;
    position?: React.CSSProperties["position"];
    top?: string | number;
    left?: string | number;
    zIndex?: number;
}