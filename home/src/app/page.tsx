"use client";

import { useEffect, useRef } from "react";
import { useAuth } from "@/context/AuthContext";
import { ChangeEvent, useState } from "react";
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
import Alerta from "@/components/Alerta/Alerta";
import FinancialCharts from "@/components/FinancialCharts/FinancialCharts";

export default function Home() {
  const [erroValor, setErroValor] = useState<string | null>(null);
  const [erroDescricao, setErroDescricao] = useState<string | null>(null);
  const { token, loading, userName } = useAuth();
  const [valorInput, setValorInput] = useState<number>(0);
  const [descricao, setDescricao] = useState<string>("");
  const [valorSelect, setValorSelect] = useState<string>("");
  const [mostrarAlerta, setMostrarAlerta] = useState<boolean>(false);
  const [anexo, setAnexo] = useState<File | null>(null);
  const [erroAnexo, setErroAnexo] = useState<string | null>(null);
  const firstName = userName ? userName.split("@")[0] : "Usuário";
  const [saldo, setSaldo] = useState<number>(() => calcularSaldo(listaExtratos));
  const [extratos, setExtratos] = useState(listaExtratos);
  const categoriasSugestao = [
    {
      label: "saque",
      keywords: ["mercado", "comida", "restaurante", "padaria", "feira", "compras", "dinheiro", "retirada"],
    },
    {
      label: "deposito",
      keywords: ["transferência recebida", "pix recebido", "depósito", "entrada", "crédito", "salário", "renda"],
    },
    {
      label: "pagamento_boleto",
      keywords: ["boleto", "conta", "água", "luz", "internet", "fatura", "pagamento", "energia", "telefone"],
    },
    {
      label: "estorno",
      keywords: ["estorno", "reembolso", "devolução", "cancelamento", "valor devolvido", "recuperação"],
    },
    {
      label: "recarga_celular",
      keywords: ["recarga", "celular", "claro", "tim", "vivo", "oi", "crédito de celular", "telefone pré-pago"],
    },
  ];
  const [fazerUpload, setFazerUpload] = useState<boolean>(false);
  const [mostrarModalUpload, setMostrarModalUpload] = useState<boolean>(false);
  const [arquivoSelecionado, setArquivoSelecionado] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);


  useEffect(() => {
    if (!loading && !token) {
      window.location.href = "http://localhost:3001/";
    }
  }, [token, loading]);

  function validarValor(valor: number) {
  if (valor <= 0) return "O valor deve ser maior que zero";
  if (valor > 100000) return "Valor muito alto";
  return null;
}


  useEffect(() => {
    setSaldo(calcularSaldo(extratos));
  }, [extratos]);

  function calcularSaldo(extratos: typeof listaExtratos) {
    let saldo = 0;

    extratos.forEach((mes) => {
      mes.extratos.forEach((item) => {
        if (item.tipo === "deposito" || item.tipo === "estorno") {
          saldo += item.valor;
        } else {
          saldo -= item.valor;
        }
      });
    });

    return saldo;
  }

function validarAnexo(file: File) {
  const tiposPermitidos = [
    "application/pdf",
    "image/png",
    "image/jpeg",
  ];

  if (!tiposPermitidos.includes(file.type)) {
    return "Formato inválido. Envie PDF, PNG ou JPG.";
  }

  if (file.size > 5 * 1024 * 1024) {
    return "O arquivo deve ter no máximo 5MB.";
  }

  return null;
}
// Toggle do upload
const handleToggleChange = (next: boolean) => {
  setFazerUpload(next);
  if (next) {
    setMostrarModalUpload(true);
  } else {
    setArquivoSelecionado(null);
  }
};

// Drag & Drop
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
    const erro = validarAnexo(files[0]);
    if (erro) {
      setErroAnexo(erro);
      return;
    }
    setArquivoSelecionado(files[0]);
    setErroAnexo(null);
  }
};

const openFilePicker = () => fileInputRef.current?.click();

const confirmarUpload = () => {
  if (!arquivoSelecionado) return;
  setMostrarModalUpload(false);
};

const cancelarUpload = () => {
  setMostrarModalUpload(false);
  setFazerUpload(false);
  setArquivoSelecionado(null);
  setErroAnexo(null);
};

function validarDescricao(texto: string) {
  if (texto.trim().length < 3)
    return "A descrição deve ter pelo menos 3 caracteres";
  return null;
}


  useEffect(() => {
  if (!descricao) return;

  const texto = descricao.toLowerCase();

  const categoriaEncontrada = categoriasSugestao.find(cat =>
    cat.keywords.some(keyword => texto.includes(keyword))
  );

  if (categoriaEncontrada) {
    setValorSelect(categoriaEncontrada.label);
  }
}, [descricao]);

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

    setTimeout(() => {
      setMostrarAlerta(false);
    }, 3000);

    setValorInput(0);
    setDescricao("");
    setValorSelect("");
    setAnexo(null);
    setErroAnexo(null);
  if (loading) {
    return <p>Carregando autenticação...</p>;
  }

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

          <div className={styles.financialSection}>
            <FinancialCharts extratos={extratos} />

            {/* <p className={styles.analiseTexto}>
              📌 <strong>Análise financeira:</strong><br />
              O usuário apresenta maior volume de receitas em comparação às despesas,
              indicando saldo positivo ao longo dos meses. Os principais gastos estão
              concentrados em pagamentos de boletos e saques, enquanto depósitos
              representam a principal fonte de receita.
            </p> */}
          </div>
          <div
              style={{
                flex: 1,
                minHeight: "fit-content",
                borderRadius: radii.sm,
                backgroundColor: palette.cinza300,
              }}
              className={styles.page}
            >
              <h4
                style={{
                  fontSize: fontSizes.heading,
                  color: palette.azul700,
                  fontWeight: 700,
                }}
              >
                Nova transação
              </h4>
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
                type="number"
                value={valorInput}
                onChange={(e) => {
                  const valorString = e.target.value;
                  const valorNumber =
                    valorString === "" ? 0 : parseFloat(valorString);

                  setValorInput(valorNumber);
                  setErroValor(validarValor(valorNumber));
                }}
                label="Valor"
                placeholder="R$ 00,00"
              />

              {erroValor && (
                <span style={{ color: "red", fontSize: 12 }}>
                  {erroValor}
                </span>
              )}

              <InputComponente
                type="text"
                value={descricao}
                onChange={(e) => {
                  setDescricao(e.target.value);
                  setErroDescricao(validarDescricao(e.target.value));
                }}
                label="Descrição da transação"
              />

              {erroDescricao && (
                <span style={{ color: "red", fontSize: 12 }}>
                  {erroDescricao}
                </span>
              )}

              <div style={{ marginTop: 12 }}>
                {arquivoSelecionado ? (
                  <div style={{ fontSize: 13 }}>
                    <strong>Arquivo:</strong> {arquivoSelecionado.name} (
                    {Math.round(arquivoSelecionado.size / 1024)} KB)
                  </div>
                ) : (
                  <div style={{ fontSize: 13, color: "#474747ff" }}>
                    Nenhum arquivo selecionado
                  </div>
                )}
              </div>

              {erroAnexo && (
                <span style={{ color: "red", fontSize: 12 }}>{erroAnexo}</span>
              )}
                            

              <Botao
                label="Adicionar nova transação"
                onClick={submeterTransacao}
                backgroundColor={palette.azul700}
                disabled={!valorInput || valorInput <= 0 || !descricao || !valorSelect}
                title="Clique para adicionar a nova transação"
              />
            </div>

        </div>

        <ExtratoContainer extratos={extratos} setExtratos={setExtratos} />
        
        {mostrarModalUpload && (
          <div style={{ position: "fixed", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 }}>
            <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.4)" }} onClick={cancelarUpload} />

            <div style={{ background: "#fff", padding: 20, borderRadius: 12, width: 520, maxWidth: "92%", boxShadow: "0 10px 30px rgba(0,0,0,0.15)", zIndex: 1001 }}>
              <h3 style={{ marginTop: 0, color: palette.azul700 }}>
                Upload da transação
              </h3>

              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={openFilePicker}
                style={{
                  borderRadius: 8,
                  border: `2px dashed ${dragActive ? palette.azul700 : "#cfcfcf"}`,
                  padding: 28,
                  textAlign: "center",
                  cursor: "pointer",
                }}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  hidden
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;
                    const erro = validarAnexo(file);
                    if (erro) {
                      setErroAnexo(erro);
                      return;
                    }
                    setArquivoSelecionado(file);
                    setErroAnexo(null);
                  }}
                />

                  {arquivoSelecionado ? (
                    <p style={{ margin: 0, fontWeight: 600, color: "#1a1a1a" }}>
                      {arquivoSelecionado.name}
                    </p>
                  ) : (
                    <p style={{ margin: 0, fontWeight: 600, color: "#1a1a1a" }}>
                      Arraste o arquivo aqui ou clique para selecionar
                    </p>
                  )}
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, marginTop: 16 }}>
                <button
                  onClick={cancelarUpload}
                  style={{ padding: '8px 12px', borderRadius: 8, border: '1px solid #ddd', background: '#fff', cursor: 'pointer', color: '#000000ff' }}
                  title="Cancelar o upload e fechar o modal"
                  >
                    Cancelar
                </button>
                <button
                  onClick={confirmarUpload}
                  disabled={!arquivoSelecionado}
                  style={{ padding: '8px 12px', borderRadius: 8, border: 'none', background: arquivoSelecionado ? palette.azul700 : '#ccc', color: '#000000ff', cursor: arquivoSelecionado ? 'pointer' : 'not-allowed' }}
                  title="Confirmar o upload do arquivo selecionado"
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
