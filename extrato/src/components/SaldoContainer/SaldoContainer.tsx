import { palette } from "@/styles/theme/colors";
import { radii } from "@/styles/theme/radii";
import { spacing } from "@/styles/theme/spacing";
import { fontSizes, fontWeights } from "@/styles/theme/typography";
import { iEstilos } from "@/types/iEstilos";
import dayjs from "dayjs";
import 'dayjs/locale/pt-br';
import { Eye, EyeOff } from "lucide-react";
import React, { useState } from "react";

dayjs.locale('pt-br');

interface Props extends iEstilos {
    firstName: string;
    valor: number;
}

export default function SaldoContainer(props: Props) {
    const { firstName, valor } = props;

    const dataFormatada = dayjs().format('dddd, DD/MM/YYYY');
    const data = dataFormatada.charAt(0).toUpperCase() + dataFormatada.slice(1);

    const [saldoVisivel, setSaldoVisivel] = useState(true);

    const toggleVisibilidade = () => {
        setSaldoVisivel(!saldoVisivel);
    };

    const containerStyle: React.CSSProperties = {
        backgroundColor: props.backgroundColor || palette.azul700,
        borderRadius: props.borderRadius || radii.sm,
        padding: props.padding || "32px",
        width: props.width || "100%",
        height: props.height || "100%",
        color: props.color || palette.branco,
        margin: props.margin || 0,
        border: props.border,
        fontFamily: props.fontFamily,
        display: "flex",
        flexDirection: "column",
        gap: spacing.lg,
        boxSizing: "border-box",
        minHeight: "220px",
    };

    const usernameStyle: React.CSSProperties = {
        fontSize: props.fontSize || fontSizes.heading,
        fontWeight: props.fontWeight || fontWeights.medium,
        color: palette.branco,
    };

    const dataStyle: React.CSSProperties = {
        fontSize: fontSizes.small,
        fontWeight: props.fontWeight || fontWeights.regular,
        color: "inherit",
    };

    const saldoWrapperStyle: React.CSSProperties = {
        display: "flex",
        flexDirection: "column",
        gap: spacing.md,
        alignSelf: "flex-end",
        alignItems: "flex-start",
        padding: "0px 100px 0px 0px"
    };

    const saldoTitleStyle: React.CSSProperties = {
        fontSize: fontSizes.kicker,
        fontWeight: fontWeights.medium,
        color: "inherit",
        margin: 0,
    };

    const accountTypeStyle: React.CSSProperties = {
        fontSize: fontSizes.body,
        fontWeight: fontWeights.regular,
        color: "inherit",
        margin: 0,
    };

    const valorStyleFinal: React.CSSProperties = {
        fontSize: fontSizes.title,
        fontWeight: fontWeights.medium,
        color: "inherit",
        minHeight: "38px",
        margin: 0,
    };

    const orangeLineStyle: React.CSSProperties = {
        width: "100%",
        height: "2px",
        backgroundColor: palette.laranja500,
        marginTop: "4px",
        marginBottom: "4px",
    };

    const iconStyle: React.CSSProperties = {
        fontSize: fontSizes.kicker,
        color: palette.laranja500,
        cursor: "pointer",
        alignSelf: "center"
    };

    return (
        <div style={containerStyle}>
            <div style={{ display: "flex", flexDirection: "column", gap: spacing.sm, alignItems: "start" }}>
                <span style={usernameStyle}>
                    Olá, {firstName}! :)
                </span>
                <span style={dataStyle}>
                    {data}
                </span>
            </div>

            <div style={saldoWrapperStyle}>
                <div style={{ display: "flex", width: "100%", flexDirection: "column", alignItems: "flex-start", gap: spacing.md }}>
                    <div style={{ display: "flex", width: "100%", alignContent: "center", gap: spacing.lg }}>
                        <h4 style={saldoTitleStyle}>
                            Saldo
                        </h4>
                        <span style={iconStyle} onClick={toggleVisibilidade}>
                            {saldoVisivel ? <Eye /> : <EyeOff />}
                        </span>
                    </div>

                    <div style={orangeLineStyle} />

                    <p style={accountTypeStyle}>
                        Conta Corrente
                    </p>
                </div>

                <h3 style={valorStyleFinal}>
                    {saldoVisivel ?
                        valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })
                        : "R$ ••••••"}
                </h3>
            </div>
        </div>
    );
}