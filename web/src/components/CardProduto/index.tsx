"use client";
import Image from "next/image";

import { CardProps } from "@/@types/CardProps";
import Link from "next/link";

import { useCarrinho } from "@/context/carrinho";

export const Card = ({ id, nome, descricao, imagemUrl, preco }: CardProps) => {
  const { carrinho, setCarrinho } = useCarrinho();

  return (
    <Link
      href={`/cardapio/${id}`}
      className="flex bg-sextary/30 rounded-xl border-1 border-primary-text p-4 gap-4"
    >
      <Image
        src={imagemUrl}
        alt={nome}
        width={120}
        height={120}
        className="rounded-xl w-32 h-32 object-cover"
      />
      <div className="flex flex-col justify-between w-full">
        <p className="font-bold text-primary-text text-lg line-clamp-1">
          {nome}
        </p>
        <p className="text-quinary text-sm line-clamp-3">{descricao}</p>
        <div className="flex justify-between items-center">
          <p className="font-bold text-primary-text text-xl">
            R$ {preco.toFixed(2)}
          </p>
          <button
            onClick={(e) => {
              e.preventDefault(); // impede que o link seja seguido
              e.stopPropagation(); // impede que o evento suba para o Link
              setCarrinho([
                ...carrinho,
                { id, nome, descricao, imagemUrl, preco, quantidade: 1 },
              ]);
            }}
            className="cursor-pointer w-12 h-12 rounded-full bg-primary-foreground border-1 border-primary-text flex justify-center items-center"
          >
            <Image
              src="/add.svg"
              alt="Adicionar ao carrinho"
              width={24}
              height={24}
            />
          </button>
        </div>
      </div>
    </Link>
  );
};
