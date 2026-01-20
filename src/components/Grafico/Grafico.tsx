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

  return (
    <div style={{
      backgroundColor: palette.branco,
      borderRadius: radii.sm,
      padding: spacing.lg,
      width: '100%',
      height: '400px',
      margin: spacing.md,
      boxSizing: 'border-box',
    }}>
      <h4 style={{ fontSize: fontSizes.heading, color: palette.azul700, fontWeight: fontWeights.bold, marginBottom: spacing.md }}>
        Evolução do Saldo
      </h4>
      <ResponsiveContainer width="100%" height="80%">
        <LineChart data={dados}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="mes" />
          <YAxis />
          <Tooltip formatter={(value) => [`R$ ${value}`, 'Saldo']} />
          <Line type="monotone" dataKey="saldo" stroke={palette.azul700} strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}