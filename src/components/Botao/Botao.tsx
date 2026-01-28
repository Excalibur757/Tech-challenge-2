import { palette } from "@/styles/theme/colors";
import { radii } from "@/styles/theme/radii";
import { spacing } from "@/styles/theme/spacing";
import { fontSizes, fontWeights } from "@/styles/theme/typography";
import { IBotao } from "@/types/iBotao";
import { Button } from "react-bootstrap";

export default function Botao({
    label,
    prefixo,
    sufixo,
    onClick,
    disabled,
    className,
    title,
    padding,
    margin,
    width,
    height,
    border,
    borderRadius,
    fontSize,
    fontWeight,
    color,
    backgroundColor,
}:IBotao) {
    const buttonStyle = {
        padding: padding ? padding : spacing.md,
        margin,
        width,
        height: height ? height : "fit-content",
        border: border ? border : "none",
        borderRadius: borderRadius ? borderRadius : radii.sm,
        fontSize: fontSize ? fontSize : fontSizes.body,
        fontWeight: fontWeight ? fontWeight : fontWeights.medium,
        color: disabled ? palette.cinza300 : color ? color : palette.branco,
        backgroundColor: disabled ? palette.cinza100 : backgroundColor ? backgroundColor : palette.laranja500,
        cursor: disabled ? "not-allowed" : "pointer"
    };

    return (
        <Button
            onClick={onClick}
            disabled={disabled}
            className={className}
            title={title}
            style={buttonStyle}
        >
            {prefixo}
            {label}
            {sufixo}
        </Button>
    )
}
