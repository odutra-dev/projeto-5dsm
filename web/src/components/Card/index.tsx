import Image from "next/image";

import { CardProps } from "@/@types/CardProps";

export const Card = ({ nome, descricao, imagem, preco }: CardProps) => {
  return (
    <div className="flex bg-sextary/30 rounded-xl border-1 border-primary-text p-4 gap-4">
      <Image
        src={imagem}
        alt={nome}
        width={100}
        height={100}
        className="rounded"
      />
      <div>
        <p className="font-bold text-primary-text text-lg line-clamp-1">
          {nome}
        </p>
        <p className="text-quinary text-sm line-clamp-3">{descricao}</p>
        <div className="flex justify-between items-center">
          <p className="font-bold text-primary-text text-xl">
            R$ {preco.toFixed(2)}
          </p>
          <a className="cursor-pointer w-12 h-12 rounded-full bg-primary-foreground border-1 border-primary-text flex justify-center items-center">
            <Image
              src="/add.svg"
              alt="Adicionar ao carrinho"
              width={24}
              height={24}
            />
          </a>
        </div>
      </div>
    </div>
  );
};
