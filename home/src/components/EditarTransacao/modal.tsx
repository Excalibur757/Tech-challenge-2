"use client";

import React, { useState, ChangeEvent, useEffect } from "react";
import SelectComponente from "@/components/Select/Select";
import { iEstilos } from "@/types/iEstilos";
import { opcoesTransacao } from "../../../public/assets/mock";
import InputComponente from "../Input/Input";
import { ExtratoItemType } from "@/types/iFormulario";
import Botao from "../Botao/Botao";
import { fontSizes, fontWeights } from "@/styles/theme/typography";
import { spacing } from "@/styles/theme/spacing";
import { palette } from "@/styles/theme/colors";
import { radii } from "@/styles/theme/radii";
import styles from "./modal.module.css";

export default function ModalEditarTransacao({
  isOpen,
  onClose,
  extratoData, 
  onFinish
}: {
  isOpen: boolean;
  onClose: () => void;
  extratoData: ExtratoItemType | null;
  onFinish?: (item: ExtratoItemType) => void 
}) {
  const [tipoTransacao, setTipoTransacao] = useState("");
  const [valor, setValor] = useState(0);
  const [descricao, setDescricao] = useState("");

  useEffect(() => {
    if (extratoData) {
      setTipoTransacao(extratoData.tipo || "");
      
      setValor(extratoData.valor);
      
      setDescricao(extratoData.descricao || "");
    } else {
      setTipoTransacao("");
      setValor(0);
      setDescricao("");
    }
    
  }, [extratoData]);

  const handleSave = () => {
    if (!extratoData) {
      alert("Não foi possível carregar os dados para a edição");
        return;
    }

    const itemAtualizado: ExtratoItemType = {
      id: extratoData.id, 
      data: extratoData.data, 
      valor: valor, 
      tipo: tipoTransacao,
      descricao: descricao,
    };

    if (onFinish) {
      onFinish(itemAtualizado);
    }
    onClose(); 
  };

  if (!isOpen) return null;

  const modalStyle: iEstilos = {
    height: "auto",
    padding: spacing.lg,
    backgroundColor: palette.branco,
    color: palette.cinza800,
    border:`1px solid ${palette.cinza100}`,
    borderRadius: radii.sm,
    fontSize: fontSizes.body,
    fontWeight: fontWeights.medium,
    textAlign: "left",
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      }}
    >
      <div style={modalStyle} className={styles.modal}>
        <h2 style={{ marginBottom: spacing.md }}>Editar Transação</h2>
        <form style={{ display: "flex", flexDirection: "column", gap: spacing.md, color:palette.azul700}}>
          <label>
            Tipo de Transação:
          </label>
          <SelectComponente
            value={tipoTransacao}
            onChange={(e: ChangeEvent<HTMLSelectElement>) =>
              setTipoTransacao(e.target.value)
            }
            options={opcoesTransacao}
          />

          <InputComponente
            type="number"
            label="Valor"
            value={valor}
            onChange={(e) => {            
              const valorString = e.target.value;
    
              const valorNumber = valorString === '' ? 0 : parseFloat(valorString);
              
              setValor(valorNumber);
            }}  
          />

          <InputComponente
            type="text"
            label="Descrição da transação"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            />

          <div style={{ display: "flex", justifyContent: "space-between", gap: spacing.sm, marginTop: spacing.lg }}>
          <Botao 
            label={"Editar"}
            onClick={handleSave}
            disabled={!tipoTransacao || !valor || valor <= 0 || !descricao}
            title="Clique para salvar as alterações da transação"
            />
            <Botao 
            label={"Cancelar"}
            onClick={onClose}
            backgroundColor={palette.azul700}
            title="Clique para descartar as alterações e fechar o modal"
            />
          </div>
        </form>
      </div>
    </div>
  );
}