"use client";

import { ChangeEvent, useState,useRef, useEffect } from "react";
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

  // estados para upload/modal
  const [fazerUpload, setFazerUpload] = useState<boolean>(false);
  const [mostrarModalUpload, setMostrarModalUpload] = useState<boolean>(false);
  const [arquivoSelecionado, setArquivoSelecionado] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

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
    const novaTransacao: FormularioType & { upload?: boolean; arquivo?: string } = {
      valor: valorInput,
      tipo: valorSelect,
      descricao: descricao,
      upload: !!fazerUpload,
      arquivo: arquivoSelecionado ? arquivoSelecionado.name : undefined,
    };

    handleTransactionSubmit(novaTransacao);

    setMostrarAlerta(true);
    setTimeout(() => setMostrarAlerta(false), 3000);

    // reset campos
    setValorInput(0);
    setDescricao("");
    setValorSelect("");
    setFazerUpload(false);
    setArquivoSelecionado(null);
  };

  // Toggle handler: ao ativar, abre modal
  const handleToggleChange = (next: boolean) => {
    setFazerUpload(next);
    if (next) {
      setMostrarModalUpload(true);
    } else {
      // desligou: limpa seleção
      setArquivoSelecionado(null);
    }
  };

  // Handlers do dropzone
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };
  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      setArquivoSelecionado(files[0]);
    }
  };

  const openFilePicker = () => fileInputRef.current?.click();

  const confirmarUpload = () => {
    // se não tem arquivo, não confirmar
    if (!arquivoSelecionado) return;
    setMostrarModalUpload(false);
    // manter fazerUpload = true
  };

  const cancelarUpload = () => {
    setMostrarModalUpload(false);
    setFazerUpload(false);
    setArquivoSelecionado(null);
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
            height="20%"
            key={firstName}
            firstName={firstName}
            valor={saldo}
          />

          <Grafico extratos={extratos} />

          <div style={{ flex: 1, minHeight: "fit-content", borderRadius: radii.sm, backgroundColor: palette.cinza300 }} className={styles.page}>

            <h4 style={{fontSize: fontSizes.heading, color: palette.azul700, fontWeight: 700}}>Nova transação</h4>

            {/* Toggle simples: ao ligar, abre modal */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '12px 0' }}>
              <label style={{ fontSize: 12, fontWeight: 600 }}>DESEJA FAZER UPLOAD DA TRANSAÇÃO?</label>

              <button
                type="button"
                role="switch"
                aria-checked={fazerUpload}
                onClick={() => handleToggleChange(!fazerUpload)}
                title="Ativar upload de arquivo para a transação"
                style={{
                  width: 52,
                  height: 30,
                  borderRadius: 9999,
                  padding: 4,
                  display: "flex",
                  alignItems: "center",
                  background: fazerUpload ? palette.azul700 : '#cfcfcf',
                  border: "none",
                  cursor: "pointer",
                }}
              >
                <span
                  aria-hidden
                  style={{
                    width: 22,
                    height: 22,
                    borderRadius: "50%",
                    background: "#fff",
                    transform: fazerUpload ? "translateX(22px)" : "translateX(0)",
                    transition: "transform 150ms linear",
                    boxShadow: "0 1px 3px rgba(0, 0, 0, 1)",
                  }}
                />
              </button>
            </div>

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

            <div style={{ marginTop: 12 }}>
              {arquivoSelecionado ? (
                <div style={{ fontSize: 13 }}>
                  <strong>Arquivo:</strong> {arquivoSelecionado.name} ({Math.round(arquivoSelecionado.size / 1024)} KB)
                </div>
              ) : (
                <div style={{ fontSize: 13, color: '#474747ff' }}>Nenhum arquivo selecionado</div>
              )}
            </div>

            <Botao
              label={"Adicionar nova transação"}
              onClick={submeterTransacao}
              backgroundColor={palette.azul700}
              disabled={!valorInput || valorInput <= 0 || !descricao || !valorSelect}
              title="Clique para adicionar a nova transação"
            />
          </div>
        </div>

        <ExtratoContainer extratos={extratos} setExtratos={setExtratos} />

        {/* Modal de upload */}
        {mostrarModalUpload && (
          <div style={{ position: 'fixed', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
            <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.4)' }} onClick={cancelarUpload} />

            <div style={{ background: '#fff', padding: 20, borderRadius: 12, width: 520, maxWidth: '92%', boxShadow: '0 10px 30px rgba(0,0,0,0.15)', zIndex: 1001 }} role="dialog" aria-modal="true" aria-labelledby="upload-title">
              <h3 id="upload-title" style={{ marginTop: 0, color: '#004d61' }}>Upload da transação</h3>

              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                style={{
                  borderRadius: 8,
                  border: `2px dashed ${dragActive ? palette.azul700 : '#cfcfcf'}`,
                  padding: 28,
                  textAlign: 'center',
                  cursor: 'pointer',
                }}
                onClick={openFilePicker}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  hidden
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setArquivoSelecionado(e.target.files?.[0] || null)}
                />

                {arquivoSelecionado ? (
                  <div>
                    <p style={{ margin: 0, fontWeight: 600 }}>{arquivoSelecionado.name}</p>
                    <p style={{ margin: '8px 0 0' }}>{Math.round(arquivoSelecionado.size / 1024)} KB</p>
                    <p style={{ margin: '8px 0 0', fontSize: 13, color: '#000000ff' }}> Arquivo selecionado. Clique novamente para trocar o arquivo</p>
                  </div>
                ) : (
                  <div>
                    <p style={{ margin: 0, fontWeight: 600 }}>Arraste o arquivo aqui ou clique para selecionar</p>
                    <p style={{ margin: '8px 0 0', fontSize: 13, color: '#000000ff' }}>PDF, XLSX ou imagens (até 10MB)</p>
                  </div>
                )}
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, marginTop: 16 }}>
                <button onClick={cancelarUpload} title="Cancelar o upload e fechar o modal" style={{ padding: '8px 12px', borderRadius: 8, border: '1px solid #ddd', background: '#fff', cursor: 'pointer', color: '#000000ff' }}>Cancelar</button>
                <button
                  onClick={confirmarUpload}
                  disabled={!arquivoSelecionado}
                  title="Confirmar o upload do arquivo selecionado"
                  style={{ padding: '8px 12px', borderRadius: 8, border: 'none', background: arquivoSelecionado ? palette.azul700 : '#ccc', color: '#000000ff', cursor: arquivoSelecionado ? 'pointer' : 'not-allowed' }}
                >
                  Confirmar upload
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </>
  );
}
