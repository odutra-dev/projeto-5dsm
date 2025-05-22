"use client";
import { CardCarrinho } from "@/components/CardCarrinho";
import Header from "@/components/Header";
import Image from "next/image";

import { useCarrinho } from "@/context/carrinho";

export const Carrinho = () => {
  const { carrinho } = useCarrinho();

  return (
    <>
      <Header
        icon="back"
        title="Carrinho"
        icon2="shop"
        link="/"
        link2="/cardapio"
      />

      <main className=" flex justify-center flex-col items-center px-6 w-full">
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
            <p className="">Subtotal:</p>
            <p className=""> R$ 11,00</p>
          </div>
          <div className="text-primary-text flex justify-between">
            <p className="">Taxa de entrega:</p>
            <p className=""> R$ 5,00</p>
          </div>
          <hr className="w-full border-1 border-primary border-dashed" />
          <div className="text-primary-text font-bold flex justify-between">
            <p className="">Total:</p>
            <p className=""> R$ 16,00</p>
          </div>
        </div>

        <div className="mt-6 w-full md:max-w-xl">
          <h2 className="text-center font-bold text-primary-text text-2xl">
            Método de Pagamento
          </h2>
          <div className="w-full md:max-w-xl flex rounded-2xl justify-center  p-4 gap-4">
            <div className="p-4 border-1 border-primary-text rounded-2xl text-primary-text">
              <p>Dinheiro</p>
            </div>
            <div className="p-4 border-1 border-primary-text rounded-2xl text-primary-text">
              <p>Débito</p>
            </div>
            <div className="p-4 border-1 border-primary-text rounded-2xl text-primary-text">
              <p>Crédito</p>
            </div>
            <div className="p-4 border-1 border-primary-text rounded-2xl text-primary-text">
              <p>Pix</p>
            </div>
          </div>
        </div>

        <div className="my-6 w-full md:max-w-xl flex flex-col gap-4">
          <h2 className="text-center font-bold text-primary-text text-2xl">
            Método de Entrega
          </h2>

          <div className="p-4 border-1 border-primary-text rounded-2xl text-primary-text">
            <p>Delivery</p>
          </div>
          <div className="p-4 border-1 border-primary-text rounded-2xl text-primary-text">
            <p>Retiada</p>
          </div>
        </div>

        <button className="flex justify-center items-center gap-4 mb-6 w-full md:max-w-xl h-12 md:h-16 bg-primary border-2 border-primary-foreground rounded-2xl text-secondary font-bold text-xl md:text-2xl">
          Finalizar pedido
          <Image
            src="/back.svg"
            alt="seta que aponta para a direita"
            width={16}
            height={16}
          />
        </button>
      </main>
    </>
  );
};

export default Carrinho;
