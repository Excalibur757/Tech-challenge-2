"use client";

import React from "react";
import { iEstilos } from "@/types/iEstilos";
import { LogIn, LogOut } from "lucide-react";
import { fontSizes, fontWeights } from "@/styles/theme/typography";
import { palette } from "@/styles/theme/colors";
import { useAuth } from "@/context/AuthContext";

interface HeaderProps extends iEstilos {}

export default function HeaderComponente(props: HeaderProps) {
  const { userName, logout } = useAuth();

  function handleLogout() {
    logout();

    // 🔥 redirecionamento ENTRE microfrontends
    window.location.href = "http://localhost:3001/";
  }

  function goToLogin() {
    window.location.href = "http://localhost:3001/";
  }

  const headerStyle: React.CSSProperties = {
    backgroundColor: props.backgroundColor || palette.azul700,
    color: props.color || palette.branco,
    padding: props.padding || "16px 10vw",
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    boxSizing: "border-box",
    fontFamily: props.fontFamily,
    gap: 40,
  };

  const textStyle: React.CSSProperties = {
    fontSize: fontSizes.small,
    fontWeight: fontWeights.medium,
    margin: 0,
    cursor: "pointer",
  };

  const iconStyle: React.CSSProperties = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontWeight: fontWeights.bold,
    color: palette.laranja500,
    cursor: "pointer",
  };

  return (
    <nav style={headerStyle}>
      {userName ? (
        <>
          <p style={textStyle}>
            {`Olá, ${userName.split("@")[0]}`}
          </p>

          <div
            style={iconStyle}
            onClick={handleLogout}
            title="Sair"
          >
            <LogOut size={30} />
          </div>
        </>
      ) : (
        <>
          <p
            style={textStyle}
            onClick={goToLogin}
            title="Entrar"
          >
            Entrar
          </p>

          <div
            style={iconStyle}
            onClick={goToLogin}
            title="Entrar"
          >
            <LogIn size={30} />
          </div>
        </>
      )}
    </nav>
  );
}
