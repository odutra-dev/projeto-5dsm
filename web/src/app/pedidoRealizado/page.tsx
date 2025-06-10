"use client";
import Image from "next/image";

import { usePedido } from "@/context/pedido";
import Link from "next/link";

export const PedidoRealizado = () => {
  const { pedido } = usePedido();

  const usuario = localStorage.getItem("usuarioLogado");
  const endereco = usuario?.endereco;

  return (
    <>
      <header className="bg-primary py-6">
        <div className="flex flex-col justify-between items-center px-6 md:px-12 h-full">
          <Image
            className="w-12 h-12"
            src="/certo.svg"
            alt="Geladinho Santista"
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

      <main className="mt-6 flex justify-center flex-col  px-6 w-full">
        <h2 className="text-center font-bold text-primary-text text-2xl">
          Informações gerais
        </h2>
        <div className="mt-6 w-full md:max-w-xl flex flex-col rounded-2xl justify-center bg-primary/30 border-1 border-primary-text p-4 gap-4">
          <div className="text-primary-text flex justify-between">
            <p>Código do pedido:</p>
            <p>{pedido?.id}</p>
          </div>
          <hr className="w-full border-1 border-primary border-dashed" />
          <div className="text-primary-text flex justify-between">
            <p>Data do pedido:</p>
            <p>{pedido?.data}</p>
          </div>
        </div>

        <h2 className="text-center font-bold text-primary-text text-2xl mt-6">
          Detalhes da{" "}
          {pedido?.tipo_entrega === "Delivery" ? "entrega" : "retirada"}
        </h2>

        <div className="mt-6 w-full md:max-w-xl flex flex-col rounded-2xl justify-center bg-primary/30 border-1 border-primary-text p-4 gap-4">
          <div className="text-primary-text flex justify-between flex-col">
            <p>
              Local da{" "}
              {pedido?.tipo_entrega === "Delivery" ? "entrega" : "retirada"}:
            </p>
            <p>
              {pedido?.tipo_entrega === "Delivery"
                ? endereco.rua + ", " + endereco.numero
                : "Avenida Francisco Glycério, 571"}
            </p>
          </div>
          <hr className="w-full border-1 border-primary border-dashed" />
          <div className="text-primary-text flex justify-between">
            <p>Data do pedido:</p>
            <p>{pedido?.data}</p>
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
};

export default PedidoRealizado;
