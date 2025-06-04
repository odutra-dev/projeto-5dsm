"use client";
import Image from "next/image";

import { useCarrinho } from "@/context/carrinho";

type CardCarrinhoProps = {
  id: string;
  nome: string;
  imagemUrl: string;
  preco: number;
  quantidade: number;
};

export const CardCarrinho = ({
  id,
  nome,
  imagemUrl,
  preco,
}: CardCarrinhoProps) => {
  const { setCarrinho, carrinho } = useCarrinho();

  const quantidadeAtual =
    carrinho.find((item) => item.id === id)?.quantidade || 1;

  const handleDiminuirQuantidade = () => {
    if (quantidadeAtual <= 1) {
      // Remove o item do carrinho
      setCarrinho((prev) => prev.filter((item) => item.id !== id));
    } else {
      // Diminui a quantidade
      setCarrinho(
        carrinho.map((item) => {
          if (item.id === id) {
            return {
              ...item,
              quantidade: item.quantidade - 1,
            };
          }
          return item;
        })
      );
    }
  };

  return (
    <div className="flex bg-sextary/30 rounded-xl border-1 border-primary-text p-4 gap-4 relative mt-8">
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
        <div className="flex justify-between items-center gap-3">
          <div className="flex items-center justify-center">
            <button
              onClick={handleDiminuirQuantidade}
              className="cursor-pointer w-12 h-12 rounded-full bg-primary-foreground border-1 border-primary-text flex justify-center items-center"
            >
              <Image
                src="/minus.svg"
                alt="Diminuir quantidade"
                width={16}
                height={16}
              />
            </button>
            <input
              type="number"
              disabled
              value={quantidadeAtual}
              className="md:p-2 w-12 h-12 text-center md:w-16 md:h-16 text-primary-text font-bold text-lg md:text-xl"
            />
            <button
              onClick={() =>
                setCarrinho(
                  carrinho.map((item) => {
                    if (item.id === id) {
                      return {
                        ...item,
                        quantidade: item.quantidade + 1,
                      };
                    }
                    return item;
                  })
                )
              }
              className="cursor-pointer w-12 h-12 rounded-full bg-primary-foreground border-1 border-primary-text flex justify-center items-center"
            >
              <Image
                src="/add.svg"
                alt="Aumentar quantidade"
                width={24}
                height={24}
              />
            </button>
          </div>
          <p className="font-bold text-primary-text text-base">
            R$ {(preco * quantidadeAtual).toFixed(2)}
          </p>
        </div>
      </div>
      <div className="absolute top-0 right-0 flex gap-2 -translate-y-1/2">
        <a
          className="cursor-pointer w-12 h-12 rounded-full bg-settinary border-2 border-settinary-foreground flex justify-center items-center"
          onClick={() =>
            setCarrinho((prev) => prev.filter((item) => item.id !== id))
          }
        >
          <Image
            src="/trash.svg"
            alt="Excluir do carrinho"
            width={24}
            height={24}
          />
        </a>
      </div>
    </div>
  );
};
