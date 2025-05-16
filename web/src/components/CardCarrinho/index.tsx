import Image from "next/image";

import { CardProps } from "@/@types/CardProps";

export const CardCarrinho = ({ nome, imagemUrl, preco }: CardProps) => {
  return (
    <div className="flex bg-sextary/30 rounded-xl border-1 border-primary-text p-4 gap-4 relative">
      <Image
        src={imagemUrl}
        alt={nome}
        width={120}
        height={120}
        className="rounded-xl w-20 h-20 object-cover"
      />
      <div className="flex flex-col justify-between w-full">
        <p className="font-bold text-primary-text text-lg line-clamp-1">
          {nome}
        </p>
        <div className="flex justify-between items-center gap-4">
          <div className="flex  items-center justify-center">
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
              value={10}
              className=" p-1 md:p-2 w-10 h-10 text-center md:w-16 md:h-16 text-primary-text font-bold text-lg md:text-xl"
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
          <p className="font-bold text-primary-text text-xl">
            R$ {preco.toFixed(2)}
          </p>
        </div>
      </div>
      <div className="absolute top-0 right-0 flex gap-2 -translate-y-1/2">
        <a className="cursor-pointer w-12 h-12 rounded-full bg-settinary border-2 border-settinary-foreground flex justify-center items-center">
          <Image
            className=""
            src="/trash.svg"
            alt="excluir do carrinho"
            width={24}
            height={24}
          />
        </a>
      </div>
    </div>
  );
};
