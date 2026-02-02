"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useState, useMemo, useEffect } from "react";
import Sidebar from "@/components/Sidebar/Sidebar";
import styles from "./page.module.css";
import { listaExtratos, opcoesTransacao } from "@/../public/assets/mock";

export default function ExtratoPage() {
  const { token, loading } = useAuth();
  const router = useRouter();
  const [busca, setBusca] = useState("");
  const [categoria, setCategoria] = useState("");
  const [tipo, setTipo] = useState(""); // receita | despesa
  const [valorMin, setValorMin] = useState("");
  const [valorMax, setValorMax] = useState("");
  const [dataInicio, setDataInicio] = useState("");
  const [dataFim, setDataFim] = useState("");

  // Estados para paginação
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [itensPorPagina, setItensPorPagina] = useState(3); // 3 meses por página

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
    }).filter(mesObj => mesObj.extratos.length > 0); // Remove meses sem itens
  }, [busca, categoria, tipo, valorMin, valorMax, dataInicio, dataFim]);

  // Calcular totais para paginação
  const totalMeses = extratosFiltrados.length;
  const totalPaginas = Math.ceil(totalMeses / itensPorPagina);

  // Calcular índices para slice
  const indiceInicio = (paginaAtual - 1) * itensPorPagina;
  const indiceFim = indiceInicio + itensPorPagina;
  const mesesPaginados = extratosFiltrados.slice(indiceInicio, indiceFim);

  // Resetar página quando filtros mudarem
  useEffect(() => {
    setPaginaAtual(1);
  }, [busca, categoria, tipo, valorMin, valorMax, dataInicio, dataFim]);

  useEffect(() => {
    if (!loading && !token) {
      window.location.href = "http://localhost:3001/";
    }
  }, [token, loading]);

  if (loading) {
    return <p>Carregando autenticação...</p>;
  }

  // Funções de navegação
  const irParaPagina = (pagina: number) => {
    if (pagina >= 1 && pagina <= totalPaginas) {
      setPaginaAtual(pagina);
    }
  };

  const irParaProxima = () => {
    if (paginaAtual < totalPaginas) {
      setPaginaAtual(paginaAtual + 1);
    }
  };

  const irParaAnterior = () => {
    if (paginaAtual > 1) {
      setPaginaAtual(paginaAtual - 1);
    }
  };

  // Gerar array de números de página para exibir
  const paginasParaExibir = () => {
    const paginas = [];
    const maxPaginasVisiveis = 5;
    
    let inicio = Math.max(1, paginaAtual - Math.floor(maxPaginasVisiveis / 2));
    let fim = Math.min(totalPaginas, inicio + maxPaginasVisiveis - 1);
    
    // Ajustar inicio se o fim for limitado
    inicio = Math.max(1, fim - maxPaginasVisiveis + 1);
    
    for (let i = inicio; i <= fim; i++) {
      paginas.push(i);
    }
    
    return paginas;
  };

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
          {/* <option value="">Todos os tipos</option> */}
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

        {/* Contador de resultados */}
        <div className={styles.contadorResultados}>
          <p>
            Mostrando {Math.min(indiceFim, totalMeses)} de {totalMeses} meses
            {totalMeses === 0 ? "" : ` - Página ${paginaAtual} de ${totalPaginas}`}
          </p>
        </div>

        {/* LISTA */}
        <div className={styles.listaMeses}>
          {mesesPaginados.map((mesObj) => (
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
          ))}

          {mesesPaginados.length === 0 && (
            <div className={styles.semResultados}>
              <p>Nenhuma transação encontrada com os filtros atuais.</p>
            </div>
          )}
        </div>

        {/* PAGINAÇÃO */}
        {totalPaginas > 1 && (
          <div className={styles.paginacao}>
            <button
              onClick={irParaAnterior}
              disabled={paginaAtual === 1}
              className={`${styles.botaoPagina} ${paginaAtual === 1 ? styles.desabilitado : ''}`}
            >
              &laquo; Anterior
            </button>

            <div className={styles.numerosPagina}>
              {paginasParaExibir().map((pagina) => (
                <button
                  key={pagina}
                  onClick={() => irParaPagina(pagina)}
                  className={`${styles.botaoPagina} ${pagina === paginaAtual ? styles.paginaAtual : ''}`}
                >
                  {pagina}
                </button>
              ))}
            </div>

            <button
              onClick={irParaProxima}
              disabled={paginaAtual === totalPaginas}
              className={`${styles.botaoPagina} ${paginaAtual === totalPaginas ? styles.desabilitado : ''}`}
            >
              Próxima &raquo;
            </button>
          </div>
        )}
      </div>
    </div>
  );
}