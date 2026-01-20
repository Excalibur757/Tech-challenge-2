"use client";

import { ChangeEvent, useState, useEffect } from "react";
import styles from "./page.module.css";
import InputComponente from "@/components/Input/Input";
import SelectComponente from "@/components/Select/Select";
import Sidebar from "@/components/Sidebar/Sidebar";
import SaldoContainer from "@/components/SaldoContainer/SaldoContainer";
import ExtratoContainer from "@/components/ExtratoContainer/ExtratoContainer";
import Botao from "@/components/Botao/Botao";
import { listaExtratos, opcoesTransacao } from "../../public/assets/mock";
import { FormularioType } from "@/types/iFormulario";
import { adicionarTransacao } from "@/utils/transacao";
import { radii } from "@/styles/theme/radii";
import { palette } from "@/styles/theme/colors";
import { fontSizes } from "@/styles/theme/typography";
import Grafico from "@/components/Grafico/Grafico";
import Alerta from "@/components/Alerta/Alerta";

export default function Home() {
  const [valorInput, setValorInput] = useState<number>(0);
  const [descricao, setDescricao] = useState<string>("");
  const [valorSelect, setValorSelect] = useState<string>("");
  const [mostrarAlerta, setMostrarAlerta] = useState<boolean>(false);

  const userName = "Joana da Silva Oliveira";
  const firstName = userName.split(' ')[0];

  const [saldo, setSaldo] = useState<number>(0);

  const [extratos, setExtratos] = useState(listaExtratos);

  useEffect(() => {
    let total = 1250.50;
    extratos.forEach(mes => {
      mes.extratos.forEach(ext => {
        if (['deposito', 'estorno'].includes(ext.tipo)) {
          total += ext.valor;
        } else if (['saque', 'pagamento_boleto', 'recarga_celular'].includes(ext.tipo)) {
          total -= ext.valor;
        }
      });
    });
    setSaldo(total);
  }, [extratos]);

  const handleTransactionSubmit = (novaTransacao: FormularioType) => {
    const novosExtratos = adicionarTransacao(extratos, novaTransacao);
    setExtratos(novosExtratos);
  };

  const submeterTransacao = () => {
    const novaTransacao: FormularioType = {
      valor: valorInput,
      tipo: valorSelect,
      descricao: descricao,
    };
    
    handleTransactionSubmit(novaTransacao);

    setMostrarAlerta(true);

    setTimeout(() => {
      setMostrarAlerta(false);
    }, 3000);

    setValorInput(0);
    setDescricao("");
    setValorSelect("");
};

  return (
    <>
      <div className={styles.containerTudo}>

        <Sidebar width={"100%"} height="" />

        <div className={styles.conteudoContainer}>
          
          {mostrarAlerta && (
            <Alerta
              tipo="sucesso"
              mensagem="🎉 Sucesso! Transação adicionada com êxito."
            />
          )}
          
          <SaldoContainer
            height="40%"
            key={firstName}
            firstName={firstName}
            valor={saldo}
          />

          <Grafico extratos={extratos} />

          <div style={{ flex: 1, minHeight: "fit-content", borderRadius: radii.sm, backgroundColor: palette.cinza300 }} className={styles.page}>
            
            <h4 style={{fontSize: fontSizes.heading, color: palette.azul700, fontWeight: 700}}>Nova transação</h4>
            <SelectComponente
              value={valorSelect}
              onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                setValorSelect(e.target.value)
              }
              options={opcoesTransacao}
            />

            <InputComponente
              type={"number"}
              value={valorInput}              
              onChange={(e) => {            
                const valorString = e.target.value;
      
                const valorNumber = valorString === '' ? 0 : parseFloat(valorString);
                
                setValorInput(valorNumber);
              }}        
              label="Valor"
              placeholder="R$ 00,00"
            />

            <InputComponente
              type={"text"}
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              label="Descrição da transação"
            />

            <Botao 
              label={"Adicionar nova transação"} 
              onClick={submeterTransacao}   
              backgroundColor={palette.azul700}          
              disabled={!valorInput || valorInput <= 0 || !descricao || !valorSelect}
            />
          </div>
        </div>

        <ExtratoContainer extratos={extratos} setExtratos={setExtratos} />

      </div>
    </>
  );
}
