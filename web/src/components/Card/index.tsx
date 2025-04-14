import Image from "next/image";

import { CardProps } from "@/@types/CardProps";
import Link from "next/link";

export const Card = ({ id, nome, descricao, imagemUrl, preco }: CardProps) => {
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
          <button className="cursor-pointer w-12 h-12 rounded-full bg-primary-foreground border-1 border-primary-text flex justify-center items-center">
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
