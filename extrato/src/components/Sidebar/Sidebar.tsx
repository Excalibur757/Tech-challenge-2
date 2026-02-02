import React, { useEffect, useState } from "react";
import { iSidebar, iSidebarLink } from "@/types/iSidebar";
import { fontSizes, fontWeights } from "@/styles/theme/typography";
import { palette } from "@/styles/theme/colors";
import { spacing } from "@/styles/theme/spacing";
import { radii } from "@/styles/theme/radii";

const defaultLinks: iSidebarLink[] = [
  { href: "/home", label: "Início" },
  { href: "#", label: "Transferências" },
  { href: "/extrato", label: "Extrato" },
  { href: "#", label: "Investimentos" },
  { href: "#", label: "Outros serviços" },
];

export default function SidebarComponente(props: iSidebar) {
  const [activeLabel, setActiveLabel] = useState<string>("");

  const { links = defaultLinks } = props;

  const sidebarStyle: React.CSSProperties = {
    width: props.width || "200px",
    backgroundColor: props.backgroundColor || palette.branco,
    color: props.color || palette.azul700,
    height: props.height || "100%",
    padding: props.padding || spacing.md,
    margin: props.margin || "0px 0px 24px 0px",
    border: props.border,
    borderRadius: props.borderRadius || radii.sm,
    fontSize: props.fontSize || fontSizes.body,
    fontWeight: props.fontWeight,
    fontFamily: props.fontFamily,
    textAlign: props.textAlign,

    display: props.display || "flex",
    flexDirection: props.flexDirection || "column",
    gap: props.gap || spacing.mds,
    position: props.position || "relative",
    top: props.top || 0,
    left: props.left || 0,
    zIndex: props.zIndex || 1000,

    boxSizing: "border-box",
  };

  const navListStyle: React.CSSProperties = {
    listStyle: "none",
    padding: 0,
    margin: 0,
    display: "flex",
    flexDirection: "column",
  };

  const baseLinkStyle: React.CSSProperties = {
    color: "inherit",
    textDecoration: "none",
    padding: "16px 8px",
    borderRadius: "6px",
    display: "block",
    textAlign: "center",
  };

  useEffect(() => {
  if (typeof window === "undefined") return;

  const path = window.location.pathname;

  if (path.startsWith("/extrato")) {
    setActiveLabel("Extrato");
  } else if (path.startsWith("/home")) {
    setActiveLabel("Início");
  }
}, []);


  return (
    <aside style={sidebarStyle}>
      <nav>
        <ul style={navListStyle}>
          {links.map((link, index) => {
            const isActive = activeLabel === link.label;
            const isLastItem = index === links.length - 1;

            const dividerStyle: React.CSSProperties = {
              height: "1px",
              backgroundColor: palette.azul700,
              marginLeft: spacing.xl,
              marginRight: spacing.xl,
            };

            const dynamicLinkStyle: React.CSSProperties = {
              ...baseLinkStyle,
              fontWeight: isActive ? fontWeights.bold : fontWeights.regular,
            };

            return (
              <li key={link.label}>
                <a
                  href={link.href}
                  style={dynamicLinkStyle}
                  onClick={(e) => {
                    if (link.href === "#") {
                      e.preventDefault();
                      return;
                    }
                    setActiveLabel(link.label);
                  }}
                >
                  {link.label}
                </a>

                {!isLastItem && <div style={dividerStyle} />}
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}