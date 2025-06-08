"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";

import { api } from "@/services/api";
import { CardProps } from "@/@types/CardProps";
import Header from "@/components/Header";
import { useCarrinho } from "@/context/carrinho";

export default function Page() {
  const params = useParams();
  const slug = params?.slug as string;

  const { carrinho, setCarrinho } = useCarrinho();
  const [data, setData] = useState<CardProps | null>(null);
  const [quantidade, setQuantidade] = useState(1);

  useEffect(() => {
    api.get(`/produtos/${slug}`).then((response) => {
      setData(response.data);
    });
  }, [slug]);

  const adicionarAoCarrinho = () => {
    if (!data) return;

    const jaExiste = carrinho.find((item) => item.id === data.id);
    if (jaExiste) {
      setCarrinho(
        carrinho.map((item) =>
          item.id === data.id
            ? { ...item, quantidade: item.quantidade + quantidade }
            : item
        )
      );
    } else {
      setCarrinho([
        ...carrinho,
        {
          ...data,
          quantidade,
        },
      ]);
    }
  };

  if (!data) return <p className="text-center">Carregando...</p>;

  return (
    <>
      <Header
        icon="back"
        title="Detalhes"
        icon2="shop"
        link="/cardapio"
        link2="/carrinho"
      />

      <main className="relative flex justify-center flex-col items-center px-6 w-full">
        <section className="w-full md:max-w-xl flex flex-col items-center justify-center">
          <Image
            src={data?.imagemUrl}
            alt={data?.nome}
            width={1200}
            height={600}
            className="w-full md:max-w-xl absolute h-72 top-0 left-0 md:left-1/2 md:-translate-x-1/2 object-cover"
          />
        </section>

        <section className="mt-72 w-full md:max-w-xl gap-3">
          <h2 className="mt-4 font-bold text-primary-text text-2xl line-clamp-2">
            {data?.nome}
          </h2>
          <p>{data?.descricao}</p>

          <div className="flex justify-between items-center">
            <p className="font-bold text-primary-text text-2xl">
              R$ {data?.preco.toFixed(2)}
            </p>

            <div className="flex gap-2 items-center justify-center">
              <button
                onClick={() =>
                  setQuantidade((qtd) => (qtd > 1 ? qtd - 1 : 1))
                }
                className="cursor-pointer w-12 h-12 rounded-full bg-primary-foreground border-1 border-primary-text flex justify-center items-center"
              >
                <Image src="/minus.svg" alt="Diminuir" width={24} height={24} />
              </button>

              <input
                type="number"
                disabled
                value={quantidade}
                className="bg-sextary/30 p-3.5 md:p-4 border-1 border-primary-text rounded w-14 h-14 text-center md:w-16 md:h-16 text-primary-text font-bold text-xl md:text-2xl"
              />

              <button
                onClick={() => setQuantidade((qtd) => qtd + 1)}
                className="cursor-pointer w-12 h-12 rounded-full bg-primary-foreground border-1 border-primary-text flex justify-center items-center"
              >
                <Image src="/add.svg" alt="Aumentar" width={24} height={24} />
              </button>
            </div>
          </div>

          <button
            onClick={adicionarAoCarrinho}
            className="mt-8 px-6 py-3 bg-primary h-14 md:h-16 text-base md:text-xl font-semibold text-secondary w-full md:max-w-xl flex justify-between items-center gap-4 rounded-xl border-2 border-primary-foreground"
          >
            Adicionar ao carrinho
            <Image
              src={"/carrinho.svg"}
              alt="Carrinho de compras"
              width={24}
              height={24}
            />
          </button>
        </section>
      </main>
    </>
  );
}
