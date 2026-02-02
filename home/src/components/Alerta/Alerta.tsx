import { palette } from "@/styles/theme/colors";
import { radii } from "@/styles/theme/radii";
import { iAlerta } from "@/types/iAlerta";
import { Alert } from "react-bootstrap";

export default function Alerta(props: iAlerta) {

    if (props.tipo === 'sucesso') {
        return (
            <Alert
                variant={props.tipo}
                style={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    zIndex: 1050,
                    backgroundColor: palette.branco,
                    color: palette.verde500,
                    padding: '20px',
                    borderRadius: radii.sm,
                    border: `1px solid ${palette.verde500}`
                }}
            >
                {props.mensagem}
            </Alert>
        )
    } else if (props.tipo === 'alerta') {
        return (
            <Alert
                variant={props.tipo}
                style={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    zIndex: 1050,
                    backgroundColor: palette.branco,
                    color: palette.laranja500,
                    padding: '20px',
                    borderRadius: radii.sm,
                    border: `1px solid ${palette.laranja500}`
                }}
            >
                {props.mensagem}
            </Alert>
        )
    } else if (props.tipo === 'aviso') {
        return (
            <Alert
                variant={props.tipo}
                style={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    zIndex: 1050,
                    backgroundColor: palette.branco,
                    color: palette.azul700,
                    padding: '20px',
                    borderRadius: radii.sm,
                    border: `1px solid ${palette.azul700}`
                }}
            >
                {props.mensagem}
            </Alert>
        )
    }
}