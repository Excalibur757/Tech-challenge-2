"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import Sidebar from "@/components/Sidebar/Sidebar";
import styles from "./page.module.css";
import { listaExtratos, opcoesTransacao } from "@/../public/assets/mock";

export default function ExtratoPage() {
  const [busca, setBusca] = useState("");
  const [categoria, setCategoria] = useState("");
  const [tipo, setTipo] = useState(""); // receita | despesa
  const [valorMin, setValorMin] = useState("");
  const [valorMax, setValorMax] = useState("");
  const [dataInicio, setDataInicio] = useState("");
  const [dataFim, setDataFim] = useState("");

  const [limite, setLimite] = useState(3);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  // Função para identificar receita ou despesa
  const getTipoFinanceiro = (t: string) => {
    return t === "deposito" ? "receita" : "despesa";
  };

  // FILTRAGEM COMPLETA
  const extratosFiltrados = useMemo(() => {
    return listaExtratos.map((mesObj) => {
      const filtrados = mesObj.extratos.filter((item) => {
        const texto = item.descricao.toLowerCase();
        const tipoFinanceiro = getTipoFinanceiro(item.tipo);

        const matchBusca = texto.includes(busca.toLowerCase());

        const matchCategoria = categoria ? item.tipo === categoria : true;

        const matchTipo = tipo ? tipoFinanceiro === tipo : true;

        const matchValorMin = valorMin ? item.valor >= Number(valorMin) : true;
        const matchValorMax = valorMax ? item.valor <= Number(valorMax) : true;

        const matchDataInicio = dataInicio
          ? new Date(item.data) >= new Date(dataInicio)
          : true;

        const matchDataFim = dataFim
          ? new Date(item.data) <= new Date(dataFim)
          : true;

        return (
          matchBusca &&
          matchCategoria &&
          matchTipo &&
          matchValorMin &&
          matchValorMax &&
          matchDataInicio &&
          matchDataFim
        );
      });

      return { ...mesObj, extratos: filtrados };
    });
  }, [busca, categoria, tipo, valorMin, valorMax, dataInicio, dataFim]);

  // Resetar scroll infinito quando filtros mudarem
  useEffect(() => {
    setLimite(3);
  }, [busca, categoria, tipo, valorMin, valorMax, dataInicio, dataFim]);

  // Scroll infinito
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const alvo = entries[0];
        if (alvo.isIntersecting) {
          setLimite((prev) => prev + 3);
        }
      },
      { threshold: 1 }
    );

    if (sentinelRef.current) observer.observe(sentinelRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div className={styles.containerTudo}>
      <Sidebar width={"100%"} height="" />

      <div className={styles.conteudo}>
        <h1 className={styles.titulo}>Extrato</h1>

        {/* BUSCA */}
        <input
          type="text"
          placeholder="Pesquisar por texto..."
          className={styles.inputBusca}
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
        />

        {/* CATEGORIA */}
        <select
          className={styles.selectFiltro}
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
        >
          <option value="">Selecione um tipo de transação</option>
          {opcoesTransacao.map((op) => (
            <option key={op.value} value={op.value}>
              {op.label}
            </option>
          ))}
        </select>

        {/* TIPO (RECEITA / DESPESA) */}
        <select
          className={styles.selectFiltro}
          value={tipo}
          onChange={(e) => setTipo(e.target.value)}
        >
            <option value="">Selecione um tipo</option>
            <option value="">Todos os tipos</option>
            <option value="receita">Receita</option>
            <option value="despesa">Despesa</option>
        </select>

        {/* VALOR */}
        <div className={styles.filtrosLinha}>
          <input
            type="number"
            placeholder="Valor mínimo"
            className={styles.inputBusca}
            value={valorMin}
            onChange={(e) => setValorMin(e.target.value)}
          />

          <input
            type="number"
            placeholder="Valor máximo"
            className={styles.inputBusca}
            value={valorMax}
            onChange={(e) => setValorMax(e.target.value)}
          />
        </div>

        {/* DATA */}
        <div className={styles.filtrosLinha}>
          <input
            type="date"
            className={styles.inputBusca}
            value={dataInicio}
            onChange={(e) => setDataInicio(e.target.value)}
          />

          <input
            type="date"
            className={styles.inputBusca}
            value={dataFim}
            onChange={(e) => setDataFim(e.target.value)}
          />
        </div>

        {/* LISTA */}
        <div className={styles.listaMeses}>
          {extratosFiltrados.slice(0, limite).map((mesObj) =>
            mesObj.extratos.length > 0 ? (
              <div key={mesObj.mes} className={styles.mesBloco}>
                <h2 className={styles.mesTitulo}>{mesObj.mes}</h2>

                {mesObj.extratos.map((item) => (
                  <div key={item.id} className={styles.itemExtrato}>
                    <div>
                      <p className={styles.descricao}>{item.descricao}</p>
                      <span className={styles.data}>
                        {new Date(item.data).toLocaleDateString("pt-BR")}
                      </span>
                    </div>

                    <span
                      className={`${styles.valor} ${
                        item.tipo === "deposito"
                          ? styles.positivo
                          : styles.negativo
                      }`}
                    >
                      {item.tipo === "deposito" ? "+" : "-"} R$ {item.valor}
                    </span>
                  </div>
                ))}
              </div>
            ) : null
          )}
        </div>

        <div ref={sentinelRef} style={{ height: "40px" }} />
      </div>
    </div>
  );
}