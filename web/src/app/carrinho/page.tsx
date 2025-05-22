"use client";
import { CardCarrinho } from "@/components/CardCarrinho";
import Header from "@/components/Header";
import Image from "next/image";
import { useCarrinho } from "@/context/carrinho";
import { useState } from "react";

export const Carrinho = () => {
  const { carrinho } = useCarrinho();

  const [metodoPagamento, setMetodoPagamento] = useState<string | null>(
    "Dinheiro"
  );
  const [metodoEntrega, setMetodoEntrega] = useState<string | null>("Delivery");

  const metodosPagamento = ["Dinheiro", "Débito", "Crédito", "Pix"];
  const metodosEntrega = ["Delivery", "Retirada"];

  return (
    <>
      <Header
        icon="back"
        title="Carrinho"
        icon2="shop"
        link="/cardapio"
        link2="/cardapio"
      />

      <main className="flex justify-center flex-col items-center px-6 w-full">
        {carrinho.map((item) => (
          <CardCarrinho
            key={item.id}
            id={item.id}
            nome={item.nome}
            imagemUrl={item.imagemUrl}
            preco={item.preco}
            quantidade={item.quantidade || 1}
          />
        ))}

        <div className="mt-6 w-full md:max-w-xl flex flex-col rounded-2xl justify-center bg-primary/30 border-1 border-primary-text p-4 gap-4">
          <h2 className="text-center font-bold text-primary-text text-2xl">
            Resumo do Pedido
          </h2>
          <div className="text-primary-text flex justify-between">
            <p>Subtotal:</p>
            <p>
              R$
              {carrinho
                .reduce(
                  (acc, item) => acc + item.preco * (item.quantidade || 1),
                  0
                )
                .toFixed(2)}
            </p>
          </div>
          <div className="text-primary-text flex justify-between">
            <p>Taxa de entrega:</p>
            <p>{metodoEntrega === "Delivery" ? "R$ 5,00" : "R$ 0,00"}</p>
          </div>
          <hr className="w-full border-1 border-primary border-dashed" />
          <div className="text-primary-text font-bold flex justify-between">
            <p>Total:</p>
            <p>
              R${" "}
              {carrinho
                .reduce(
                  (acc, item) => acc + item.preco * (item.quantidade || 1),
                  0
                )
                .toFixed(2)}
            </p>
          </div>
        </div>

        {/* Método de Pagamento */}
        <div className="mt-6 w-full md:max-w-xl">
          <h2 className="text-center font-bold text-primary-text text-2xl">
            Método de Pagamento
          </h2>
          <div className="w-full md:max-w-xl flex flex-wrap justify-center p-4 gap-4">
            {metodosPagamento.map((metodo) => (
              <div
                key={metodo}
                onClick={() => setMetodoPagamento(metodo)}
                className={`p-4 border-1 border-primary-text rounded-2xl cursor-pointer
                  ${
                    metodoPagamento === metodo
                      ? "bg-primary-text text-secondary"
                      : "text-primary-text"
                  }`}
              >
                <p>{metodo}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Método de Entrega */}
        <div className="my-6 w-full md:max-w-xl flex flex-col gap-4">
          <h2 className="text-center font-bold text-primary-text text-2xl">
            Método de Entrega
          </h2>

          {metodosEntrega.map((metodo) => (
            <div
              key={metodo}
              onClick={() => setMetodoEntrega(metodo)}
              className={`p-4 border-2 border-primary-text rounded-2xl cursor-pointer
                ${
                  metodoEntrega === metodo
                    ? "bg-primary-foreground text-secondary"
                    : "text-primary-text"
                }`}
            >
              <p>{metodo}</p>
            </div>
          ))}
        </div>

        <a className="flex justify-center items-center gap-4 mb-6 w-full md:max-w-xl h-12 md:h-16 bg-primary border-2 border-primary-foreground rounded-2xl text-secondary font-bold text-xl md:text-2xl">
          Finalizar pedido
          <Image
            src="/seta.svg"
            alt="seta que aponta para a direita"
            width={16}
            height={16}
          />
        </a>
      </main>
    </>
  );
};

export default Carrinho;
