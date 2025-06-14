"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

import { Card } from "@/components/CardProduto";
import { CardProps } from "@/@types/CardProps";
import { api } from "@/services/api";
import Header from "@/components/Header";

export default function Cardapio() {
  const [produtos, setProdutos] = useState<CardProps[]>([]);

  useEffect(() => {
    api.get("/produtos").then((response) => {
      setProdutos(response.data);
    });
  }, []);

  return (
    <>
      <Header
        icon="close"
        title="Cardápio"
        icon2="shop"
        link="/"
        link2="/carrinho"
      />

      <main className="my-6 flex justify-center flex-col items-center px-6 w-full">
        <section className="w-full md:max-w-xl bg-sextary h-full flex px-6 py-4 rounded-xl relative outline-hidden">
          <div className="flex flex-col gap-3">
            <div className="flex flex-col">
              <p className="text-2xl text-quinary font-bold">Novos Sabores</p>
              <p className="text-2xl text-primary-text font-bold">Chegaram!</p>
            </div>
            <button className="bg-primary-text text-secondary h-12 rounded">
              Venha Conferir
            </button>
          </div>
          <Image
            className="absolute right-0 bottom-0 rounded-br-md"
            src="/produto-banner.png"
            alt="Produto Novo"
            width={125}
            height={125}
          />
        </section>

        <section className="mt-8 flex gap-4 w-full md:max-w-xl">
          <div className="flex flex-col items-center gap-2">
            <div className="bg-primary/30 rounded-full w-12 h-12 flex justify-center items-center border-2 border-primary">
              <Image
                src="/geladinho.svg"
                alt="Geladinhos"
                width={24}
                height={24}
              />
            </div>
            <p className="text-xs md:text-base font-bold text-quinary">
              Geladinhos
            </p>
          </div>

          <div className="flex flex-col items-center gap-2">
            <div className="bg-quinary/30 rounded-full w-12 h-12 flex justify-center items-center border-2 border-quinary">
              <Image
                src="/bolo.svg"
                alt="Bolos Inteiros"
                width={24}
                height={24}
              />
            </div>
            <p className="text-xs md:text-base font-bold text-quinary">
              Bolos Inteiros
            </p>
          </div>

          <div className="flex flex-col items-center gap-2">
            <div className="bg-quaternary/30 rounded-full w-12 h-12 flex justify-center items-center border-2 border-quaternary">
              <Image
                src="/cokie.svg"
                alt="Bolos Pedaços"
                width={24}
                height={24}
              />
            </div>
            <p className="text-xs md:text-base font-bold text-quinary">
              Bolos Pedaços
            </p>
          </div>

          <div className="flex flex-col items-center gap-2">
            <div className="bg-sextary/30 rounded-full w-12 h-12 flex justify-center items-center border-2 border-sextary">
              <Image src="/bebida.svg" alt="Bebidas" width={24} height={24} />
            </div>
            <p className="text-xs md:text-base font-bold text-quinary">
              Bebidas
            </p>
          </div>
        </section>

        <section className="mt-8 flex flex-col gap-4 w-full md:max-w-xl">
          {produtos.map((produto) => (
            <Card
              id={produto.id}
              key={produto.id}
              nome={produto.nome}
              descricao={produto.descricao}
              imagemUrl={produto.imagemUrl}
              preco={produto.preco}
            />
          ))}
        </section>
      </main>
    </>
  );
}
