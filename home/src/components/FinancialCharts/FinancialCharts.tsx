import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { palette } from '@/styles/theme/colors';
import { radii } from '@/styles/theme/radii';
import { spacing } from '@/styles/theme/spacing';
import { fontSizes, fontWeights } from '@/styles/theme/typography';
import { ExtratoMensalType } from '@/utils/transacao';

interface GraficoProps {
  extratos: ExtratoMensalType;
}

export default function Grafico({ extratos }: GraficoProps) {
  const calcularDadosGrafico = (extratos: ExtratoMensalType) => {
    let saldo = 1250.50;
    const dados = [{ mes: 'Inicial', saldo: 1250.50 }];
    
    // Processar do mais antigo ao mais recente
    const extratosOrdenados = [...extratos].reverse();
    
    extratosOrdenados.forEach(mes => {
      mes.extratos.forEach(ext => {
        if (['deposito', 'estorno'].includes(ext.tipo)) {
          saldo += ext.valor;
        } else if (['saque', 'pagamento_boleto', 'recarga_celular'].includes(ext.tipo)) {
          saldo -= ext.valor;
        }
      });
      dados.push({ mes: mes.mes, saldo: parseFloat(saldo.toFixed(2)) });
    });
    
    return dados;
  };

  const dados = calcularDadosGrafico(extratos);
  const saldoAtual = dados[dados.length - 1].saldo;
  const totalTransacoes = extratos.reduce((acc, mes) => acc + mes.extratos.length, 0);

  const getStatusFinanceiro = () => {
    if (saldoAtual > 0) return { texto: 'Saldo Positivo', cor: palette.verde500, dica: 'Parabéns! Continue mantendo um bom controle financeiro.' };
    if (saldoAtual < 0) return { texto: 'Saldo Negativo', cor: palette.laranja500, dica: 'Considere revisar seus gastos e planejar um orçamento para equilibrar as finanças.' };
    return { texto: 'Sem Movimentações', cor: palette.cinza800, dica: 'Que tal adicionar uma transação para começar a acompanhar seu saldo?' };
  };

  const status = getStatusFinanceiro();

  return (
    <div style={{
      backgroundColor: palette.branco,
      borderRadius: radii.sm,
      padding: spacing.lg,
      width: 'auto',
      minHeight: '700px',
      height: 'auto',
      margin: spacing.md,
      boxSizing: 'border-box',
    }}>
      <h4 style={{ fontSize: fontSizes.heading, color: palette.azul700, fontWeight: fontWeights.bold, marginBottom: spacing.md }}>
        Evolução do Saldo
      </h4>
      <ResponsiveContainer width="100%" height="70%">
        <LineChart data={dados}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="mes" />
          <YAxis />
          <Tooltip formatter={(value) => [`R$ ${value}`, 'Saldo']} />
          <Line type="monotone" dataKey="saldo" stroke={palette.azul700} strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
      <div style={{ marginTop: spacing.md, paddingTop: spacing.md, borderTop: `1px solid ${palette.cinza300}` }}>
        <h5 style={{ fontSize: fontSizes.body, fontWeight: fontWeights.medium, color: palette.preto, marginBottom: spacing.sm }}>
          Análise Financeira
        </h5>
        <p style={{ fontSize: fontSizes.small, color: palette.preto, margin: 0 }}>
          Saldo Atual: <span style={{ fontWeight: fontWeights.bold, color: status.cor }}>R$ {saldoAtual.toFixed(2)}</span>
        </p>
        <p style={{ fontSize: fontSizes.small, color: palette.preto, margin: 0 }}>
          Status: <span style={{ fontWeight: fontWeights.bold, color: status.cor }}>{status.texto}</span>
        </p>
        <p style={{ fontSize: fontSizes.small, color: palette.preto, margin: 0 }}>
          Total de Transações: {totalTransacoes}
        </p>
        <p style={{ fontSize: fontSizes.small, color: palette.preto, marginTop: 10, fontStyle: 'italic', justifyContent: 'center' }}>
          Status: {status.dica}
        </p>
      </div>
    </div>
  );
}