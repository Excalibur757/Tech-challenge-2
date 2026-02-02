"use client";

import { useEffect, useState } from "react";
import styles from "./page.module.css";
import { ensureUserExists, login as loginService } from "@/services/auth";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
  ensureUserExists();
}, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const data = await loginService(email, password);
      const token = data.result.token;

      // 🔐 CONTRATO GLOBAL DE AUTH
      localStorage.setItem("auth_token", token);
      localStorage.setItem("auth_user", email);

      // 🚀 REDIRECIONA PARA O HOME-MF
      window.location.href = "/home";
    } catch (err: any) {
      setError(err.message || "Erro ao autenticar");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>Login</h1>
      <div className={styles.header}>
        <h2>Bem-vindo de volta!</h2>
        <p>Faça login para acessar seu controle financeiro</p>
      </div>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          className={styles.input}
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className={styles.input}
          placeholder="Senha"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <p className={styles.error}>{error}</p>}

        <button className={styles.button} type="submit" disabled={loading}>
          {loading ? "Entrando..." : "Entrar"}
        </button>
      </form>
    </main>
  );
}
