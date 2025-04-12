import Image from "next/image";
import Link from "next/link";

import { api } from "@/services/api";

import { CardProps } from "@/@types/CardProps";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const { data }: { data: CardProps } = await api.get("/produtos/" + slug);

  return (
    <>
      <header className="bg-primary h-32">
        <div className="flex justify-between items-center px-6 md:px-12 h-full">
          <Link
            href="/cardapio"
            className="cursor-pointer w-12 h-12 rounded-full bg-primary-foreground border-1 border-primary-text flex justify-center items-center"
          >
            <Image
              className="w-6 h-6"
              src="/back.svg"
              alt="Carrinho de compras"
              width={24}
              height={24}
            />
          </Link>
          <h1 className="text-3xl font-bold text-secondary">Detalhes</h1>
          <Link
            href="/carrinho"
            className="cursor-pointer w-12 h-12 rounded-full bg-primary-foreground border-1 border-primary-text flex justify-center items-center"
          >
            <Image
              className=""
              src="/shop.svg"
              alt="Carrinho de compras"
              width={24}
              height={24}
            />
          </Link>
        </div>
      </header>

      <main className="relative flex justify-center flex-col items-center px-6 w-full">
        <section className="w-full md:max-w-xl flex flex-col items-center justify-center">
          <Image
            src={data?.imagem}
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
          <div className="flex justify-between items-center ">
            <p className="font-bold text-primary-text text-2xl">
              R$ {data?.preco.toFixed(2)}
            </p>
            <div className="flex gap-2 items-center justify-center">
              <a className="cursor-pointer w-12 h-12 rounded-full bg-primary-foreground border-1 border-primary-text flex justify-center items-center">
                <Image
                  className=""
                  src="/minus.svg"
                  alt="Carrinho de compras"
                  width={24}
                  height={24}
                />
              </a>
              <input
                type="number"
                disabled
                value={1}
                className="bg-sextary/30 p-3.5 md:p-4 border-1 border-primary-text rounded w-12 h-12 text-center md:w-16 md:h-16 text-primary-text font-bold text-xl md:text-2xl"
              />
              <a className="cursor-pointer w-12 h-12 rounded-full bg-primary-foreground border-1 border-primary-text flex justify-center items-center">
                <Image
                  className=""
                  src="/add.svg"
                  alt="Carrinho de compras"
                  width={24}
                  height={24}
                />
              </a>
            </div>
          </div>

          <button className="mt-8 px-6 py-3 bg-primary h-14 md:h-16 text-base md:text-xl font-semibold text-secondary w-full md:max-w-xl flex justify-between items-center gap-4 rounded-xl border-2 border-primary-foreground">
            Adicionar ao carrinho{" "}
            <Image
              src={"/carrinho.svg"}
              alt="Carrinho de compras"
              width={24}
              height={24}
              className=""
            />
          </button>
        </section>
      </main>
    </>
  );
}
