import { ExtratoItemType, FormularioType } from "@/types/iFormulario";
import dayjs from "dayjs";
import 'dayjs/locale/pt-br';

dayjs.locale('pt-br');

export type ExtratoMensalType = {
  mes: string;
  extratos: ExtratoItemType[];
}[];

export const adicionarTransacao = (
  extratos: ExtratoMensalType,
  novaTransacao: FormularioType
): ExtratoMensalType => {
  const mesAtual = dayjs().format("MMMM YYYY");
  const mesEncontrado = extratos.find((e) => e.mes === mesAtual);

  const novoId = Date.now();

  const transacaoCompleta: ExtratoItemType = {
    ...novaTransacao,
    id: novoId,
    data: dayjs().format("YYYY-MM-DD"),
    valor: novaTransacao.valor,
  };

  if (mesEncontrado) {
    return extratos.map((e) =>
      e.mes === mesAtual
        ? { ...e, extratos: [transacaoCompleta, ...e.extratos] }
        : e
    );
  } else {
    const novoGrupoMes = {
      mes: mesAtual,
      extratos: [transacaoCompleta],
    };
    return [novoGrupoMes, ...extratos];
  }
};

export const editarTransacao = (
  extratos: ExtratoMensalType,
  itemEditado: ExtratoItemType
): ExtratoMensalType => {
  return extratos.map((extratoMes) => ({
    ...extratoMes,
    extratos: extratoMes.extratos.map((item) =>
      item.id === itemEditado.id ? itemEditado : item
    ),
  }));
};

export const removerTransacao = (
  extratos: ExtratoMensalType,
  itemId: number
): ExtratoMensalType => {
  return extratos
    .map((extratoMes) => ({
      ...extratoMes,
      extratos: extratoMes.extratos.filter((item) => item.id !== itemId),
    }))
    .filter((extratoMes) => extratoMes.extratos.length > 0);
};
