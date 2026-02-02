import { palette } from "@/styles/theme/colors";
import { radii } from "@/styles/theme/radii";
import { spacing } from "@/styles/theme/spacing";
import { fontSizes, fontWeights } from "@/styles/theme/typography";
import { iInput } from "@/types/iInput";
import { Form, InputGroup } from "react-bootstrap";

export default function InputComponente(props: iInput) {
  return (
    <InputGroup style={{ display: "flex", flexDirection: "column", gap: spacing.md }}>
      {props.label && (
        <Form.Label htmlFor={props.id} style={{fontWeight: fontWeights.medium, fontSize: fontSizes.body, color: palette.azul700}}>
          {props.label}
        </Form.Label>
      )}
      <Form.Control
        type={props.type}
        placeholder={props.placeholder}
        value={props.value}
        onChange={props.onChange}
        id={props.id}
        disabled={props.disabled}
        aria-describedby="input-base"
        style={{
          height: props.height || "48px",
          width: props.width || "100%",
          margin: props.margin || "0",
          padding: props.padding || "12px 16px",
          backgroundColor: props.backgroundColor || palette.branco,
          border: props.border || `1px solid ${palette.azul700}`,
          borderRadius: props.borderRadius || radii.sm,
          color: props.color || palette.cinza800,
          fontSize: props.fontSize || fontSizes.body,
          textAlign: props.textAlign || "left",
        }}
      ></Form.Control>
    </InputGroup>
  );
}
