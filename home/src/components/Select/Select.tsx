import { palette } from "@/styles/theme/colors";
import { radii } from "@/styles/theme/radii";
import { spacing } from "@/styles/theme/spacing";
import { fontSizes, fontWeights } from "@/styles/theme/typography";
import { iSelect } from "@/types/iSelect";
import { Form } from "react-bootstrap";

export default function SelectComponente(props: iSelect) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: spacing.md }}>
      {props.label && (
        <Form.Label
          htmlFor={props.id}
          style={{ fontWeight: fontWeights.medium, fontSize: fontSizes.body, color: palette.cinza100}}
        >
          {props.label}
        </Form.Label>
      )}
      <Form.Select
        value={props.value}
        onChange={props.onChange}
        id={props.id}
        disabled={props.disabled}
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
      >
        {props.options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </Form.Select>
    </div>
  );
}
