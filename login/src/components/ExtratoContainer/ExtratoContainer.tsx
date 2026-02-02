"use client"

import styles from './ExtratoContainer.module.css'
import { Pen, Trash } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import dayjs from 'dayjs'
import Botao from '../Botao/Botao'
import { editarTransacao, ExtratoMensalType, removerTransacao } from '@/utils/transacao'
import { ExtratoItemType } from '@/types/iFormulario'
import ModalEditarTransacao from '../EditarTransacao/modal'
import { fontSizes, fontWeights } from '@/styles/theme/typography'
import { palette } from '@/styles/theme/colors'
import Alerta from '../Alerta/Alerta'

interface ExtratoContainerProps {
    extratos: ExtratoMensalType;
    setExtratos: React.Dispatch<React.SetStateAction<ExtratoMensalType>>;
}

export default function ExtratoContainer({ extratos, setExtratos }: ExtratoContainerProps) {
    const [mostrarAlerta, setMostrarAlerta] = useState<boolean>(false);
    const [mostrarAlertaDelete, setMostrarAlertaDelete] = useState<boolean>(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState<ExtratoItemType | null>(null);

    // quantos meses exibir inicialmente
    const [visibleMonths, setVisibleMonths] = useState(1);

    // sentinel para o intersection observer
    const sentinelRef = useRef<HTMLDivElement | null>(null);
    const listRef = useRef<HTMLDivElement | null>(null);

    // evita múltiplos disparos muito rápidos
    const loadingRef = useRef(false);

    useEffect(() => {
        if (!sentinelRef.current || visibleMonths >= extratos.length) return;

        const observer = new IntersectionObserver(
            (entries) => {
                const entry = entries[0];
                if (entry.isIntersecting && !loadingRef.current) {
                    loadingRef.current = true;
                    // Debounce pequeno
                    setTimeout(() => {
                        setVisibleMonths(prev => {
                            const next = Math.min(prev + 1, extratos.length);
                            return next;
                        });
                        loadingRef.current = false;
                    }, 200);
                }
            },
            {
                root: listRef.current,      // OBSERVE dentro do container rolável
                rootMargin: '150px',       // começa a carregar antes de chegar no fim
                threshold: 0.1,
            }
        );

        observer.observe(sentinelRef.current);

        return () => {
            observer.disconnect();
        };
    }, [extratos.length, visibleMonths]);

    const showModal = (item: ExtratoItemType) => {
        setIsModalOpen(true);
        setSelectedItem(item)
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleEditFinish = (itemEditado: ExtratoItemType) => {
        const novosExtratos = editarTransacao(extratos, itemEditado);
        setExtratos(novosExtratos);
        setMostrarAlerta(true);

        setTimeout(() => {
            setMostrarAlerta(false);
        }, 3000);
        setIsModalOpen(false);
        setSelectedItem(null);
    };

    const handleDelete = (itemId: number) => {
        const novosExtratos = removerTransacao(extratos, itemId);
        setExtratos(novosExtratos);
        setMostrarAlertaDelete(true);
        setTimeout(() => {
            setMostrarAlertaDelete(false);
        }, 3000);
    };

    const extratosRecentes = extratos
    .flatMap(mes => mes.extratos)
    .sort((a, b) => new Date(b.data).getTime() - new Date(a.data).getTime())
    .slice(0, 5); // 👈 quantidade que você quer mostrar


    return (
        <div className={styles.extratoContainer} style={{backgroundColor: palette.branco}}>
            {mostrarAlerta && (
                <Alerta
                    tipo="aviso"
                    mensagem="🎉 Sucesso! Transação editada com êxito."
                />
            )}
            {mostrarAlertaDelete && (
                <Alerta
                    tipo="alerta"
                    mensagem="🎉 Sucesso! Transação excluída com êxito."
                />
            )}
            <div className={styles.extratoHeader}>
                <h1 style={{fontWeight: fontWeights.bold, fontSize: fontSizes.heading, color: palette.azul700}}>
                    Extrato
                </h1>
            </div>

            {/* atribui ref no container rolável */}
            <div className={styles.extratoLista}>
            {extratosRecentes.map((item) => (
                <div key={item.id}>
                    <div className={styles.extratoDia}>
                    <div className={styles.extratoDiaHeader}>
                    <p style={{ fontSize: fontSizes.body }}>
                        {item.descricao} - {dayjs(item.data).format("DD/MM/YYYY")}
                    </p>

                    <h5 style={{ fontWeight: fontWeights.medium }}>
                        {item.tipo !== "deposito" ? "-" : ""} R$ {item.valor}
                    </h5>
                    </div>

                    <div style={{ display: "flex", gap: 6 }}>
                    <Botao
                        label=""
                        onClick={() => showModal(item)}
                        prefixo={<Pen />}
                        backgroundColor={palette.azul700}
                        borderRadius="100%"
                        padding="10px"
                        color={palette.branco}
                    />

                    <Botao
                        label=""
                        prefixo={<Trash />}
                        backgroundColor={palette.laranja500}
                        borderRadius="100%"
                        padding="10px"
                        onClick={() => handleDelete(item.id)}
                        color={palette.branco}
                    />
                    </div>
                </div>

                <hr style={{ margin: "6px 0" }} />
                </div>
            ))}

            {/* BOTÃO VER MAIS */}
            <div style={{ marginTop: 12, textAlign: "center" }}>
                <Botao
                label="Ver extrato completo"
                backgroundColor={palette.verde500}
                onClick={() => window.location.href = "/extrato"}
                />
            </div>
            </div>

            <ModalEditarTransacao isOpen={isModalOpen} onClose={handleCancel} extratoData={selectedItem} onFinish={handleEditFinish} />
        </div>
    )
}
