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
        <p className="font-bold text-primary-text text-lg">{nome}</p>
        <p className="text-quinary text-sm">{descricao}</p>
        <p className="font-bold text-primary-text text-xl">
          R$ {preco.toFixed(2)}
        </p>
      </div>
    </div>
  );
};
