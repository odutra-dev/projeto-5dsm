"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/services/api";
import { usePedido } from "@/context/pedido";

type PedidoProduto = {
  produtoId: string;
  quantidade: number;
};

type Pedido = {
  id: string;
  data: string;
  horario: string;
  clienteId: string;
  produtos: PedidoProduto[];
  tipo_pagamento: string;
  tipo_entrega: string;
  valor: number;
  status: "PENDENTE" | "EMPRODUCAO" | "PRONTO" | "CONCLUIDO";
};

export default function PedidoRealizado() {
  const { pedido } = usePedido();
  const [pedidoLocal, setPedidoLocal] = useState<Partial<Pedido> | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [endereco, setEndereco] = useState<any>(null); // ajuste o tipo se tiver a tipagem do endereço

  // Carrega o pedido e o endereço do localStorage ou do contexto
  useEffect(() => {
    const pedidoSalvo = localStorage.getItem("pedido");

    if (pedidoSalvo) {
      const pedidoParse = JSON.parse(pedidoSalvo);
      setPedidoLocal(pedidoParse as Pedido);
    } else if (pedido?.id) {
      localStorage.setItem("pedido", JSON.stringify(pedido));
      setPedidoLocal(pedido);
    }

    const usuario = localStorage.getItem("usuarioLogado");
    if (usuario) {
      setEndereco(JSON.parse(usuario).endereco);
    }

    setCarregando(false);
  }, [pedido]);

  const { data: pedidoAtualizado } = useQuery({
    queryKey: ["pedido", pedidoLocal?.id],
    queryFn: async () => {
      const { data } = await api.get(`/pedido/${pedidoLocal?.id}`);
      localStorage.setItem("pedido", JSON.stringify(data));
      return data;
    },
    enabled: !!pedidoLocal?.id,
    refetchInterval: 5000, // Atualiza a cada 5 segundos
  });

  const pedidoInfo = pedidoAtualizado || pedidoLocal;

  if (carregando) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-primary-text text-xl">Carregando...</p>
      </div>
    );
  }

  if (!pedidoInfo) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-primary-text text-xl">Nenhum pedido encontrado 😕</p>
      </div>
    );
  }

  return (
    <>
      <header className="bg-primary py-6">
        <div className="flex flex-col justify-between items-center px-6 md:px-12 h-full">
          <Image
            className="w-12 h-12"
            src="/certo.svg"
            alt="Pedido confirmado"
            width={24}
            height={24}
          />
          <h1 className="text-3xl font-bold text-secondary">
            Pedido Confirmado
          </h1>
          <p className="text-secondary">
            Seu pedido foi confirmado e está a caminho
          </p>
        </div>
      </header>

      <main className="mt-6 flex justify-center flex-col px-6 w-full">
        <div className="w-full md:max-w-xl flex rounded-2xl justify-between bg-primary/30 border-1 border-primary-text p-4 gap-4">
          <p className="text-primary-text">Status:</p>
          <p className="font-bold text-primary-text">
            {pedidoInfo?.status || "Carregando..."}
          </p>
        </div>

        <h2 className="text-center font-bold text-primary-text text-2xl">
          Informações gerais
        </h2>
        <div className="mt-6 w-full md:max-w-xl flex flex-col rounded-2xl justify-center bg-primary/30 border-1 border-primary-text p-4 gap-4">
          <div className="text-primary-text flex justify-between">
            <p>Código do pedido:</p>
            <p>{pedidoInfo?.id}</p>
          </div>
          <hr className="w-full border-1 border-primary border-dashed" />
          <div className="text-primary-text flex justify-between">
            <p>Data do pedido:</p>
            <p>{pedidoInfo?.data}</p>
          </div>
        </div>

        <h2 className="text-center font-bold text-primary-text text-2xl mt-6">
          Detalhes da{" "}
          {pedidoInfo?.tipo_entrega === "Delivery" ? "entrega" : "retirada"}
        </h2>

        <div className="mt-6 w-full md:max-w-xl flex flex-col rounded-2xl justify-center bg-primary/30 border-1 border-primary-text p-4 gap-4">
          <div className="text-primary-text flex justify-between flex-col">
            <p>
              Local da{" "}
              {pedidoInfo?.tipo_entrega === "Delivery" ? "entrega" : "retirada"}
              :
            </p>
            <p>
              {pedidoInfo?.tipo_entrega === "Delivery"
                ? `${endereco?.rua}, ${endereco?.numero}`
                : "Avenida Francisco Glycério, 571"}
            </p>
          </div>
        </div>

        <Link
          className="mt-6 bg-primary h-12 md:h-16 text-base md:text-xl font-bold text-secondary w-full md:max-w-xl flex justify-center items-center gap-4 rounded-xl border-2 border-primary-foreground"
          href="/cardapio"
        >
          Voltar ao cardápio
        </Link>
      </main>
    </>
  );
}
