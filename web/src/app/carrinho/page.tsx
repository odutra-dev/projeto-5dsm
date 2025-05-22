"use client";
import { CardCarrinho } from "@/components/CardCarrinho";
import Header from "@/components/Header";
import Image from "next/image";
import { useCarrinho } from "@/context/carrinho";
import { useState } from "react";
import { useRouter } from "next/navigation";

export const Carrinho = () => {
  const { carrinho } = useCarrinho();
  const router = useRouter();

  const [metodoPagamento, setMetodoPagamento] = useState<string>("Dinheiro");
  const [metodoEntrega, setMetodoEntrega] = useState<string>("Delivery");

  const metodosPagamento = ["Dinheiro", "Débito", "Crédito", "Pix"];
  const metodosEntrega = ["Delivery", "Retirada"];

  const subtotal = carrinho.reduce(
    (acc, item) => acc + item.preco * (item.quantidade || 1),
    0
  );

  const taxaEntrega = metodoEntrega === "Delivery" ? 5 : 0;
  const total = subtotal + taxaEntrega;

  const handleFinalizarPedido = () => {
    if (carrinho.length === 0) {
      alert("Seu carrinho está vazio!");
      return;
    }

    if (metodoEntrega === "Delivery") {
      router.push("/entrega");
    } else {
      const mensagem = encodeURIComponent(`
Novo Pedido:
${carrinho
  .map(
    (item) =>
      `- ${item.nome} (x${item.quantidade || 1}) - R$ ${(
        item.preco * (item.quantidade || 1)
      ).toFixed(2)}`
  )
  .join("\n")}

Total: R$ ${total.toFixed(2)}
Pagamento: ${metodoPagamento}
Entrega: ${metodoEntrega}
      `);

      const numeroWhatsApp = process.env.NEXT_PUBLIC_WHATSAPP;
      const urlWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${mensagem}`;

      window.open(urlWhatsApp, "_blank");
    }
  };

  return (
    <>
      <Header
        icon="back"
        title="Carrinho"
        icon2="shop"
        link="/cardapio"
        link2="/cardapio"
      />

      <main className="flex justify-center flex-col items-center px-6 w-full">
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
            <p>Subtotal:</p>
            <p>R$ {subtotal.toFixed(2)}</p>
          </div>
          <div className="text-primary-text flex justify-between">
            <p>Taxa de entrega:</p>
            <p>R$ {taxaEntrega.toFixed(2)}</p>
          </div>
          <hr className="w-full border-1 border-primary border-dashed" />
          <div className="text-primary-text font-bold flex justify-between">
            <p>Total:</p>
            <p>R$ {total.toFixed(2)}</p>
          </div>
        </div>

        {/* Método de Pagamento */}
        <div className="mt-6 w-full md:max-w-xl">
          <h2 className="text-center font-bold text-primary-text text-2xl">
            Método de Pagamento
          </h2>
          <div className="w-full md:max-w-xl flex flex-wrap justify-center p-4 gap-4">
            {metodosPagamento.map((metodo) => (
              <div
                key={metodo}
                onClick={() => setMetodoPagamento(metodo)}
                className={`p-4 border-1 border-primary-text rounded-2xl cursor-pointer flex items-center gap-2
                  ${
                    metodoPagamento === metodo
                      ? "bg-primary-text text-secondary"
                      : "text-primary-text"
                  }`}
              >
                <Image
                  src={
                    metodoPagamento === metodo
                      ? metodo + "-selected.svg"
                      : metodo + ".svg"
                  }
                  alt="check"
                  width={24}
                  height={24}
                />
                <p>{metodo}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Método de Entrega */}
        <div className="my-6 w-full md:max-w-xl flex flex-col gap-4">
          <h2 className="text-center font-bold text-primary-text text-2xl">
            Método de Entrega
          </h2>

          {metodosEntrega.map((metodo) => (
            <div
              key={metodo}
              onClick={() => setMetodoEntrega(metodo)}
              className={`p-4 border-2 border-primary-text rounded-2xl cursor-pointer flex items-center gap-2
                ${
                  metodoEntrega === metodo
                    ? "bg-primary-foreground text-secondary"
                    : "text-primary-text"
                }`}
            >
              <Image
                src={
                  metodoEntrega === metodo
                    ? metodo + "-selected.svg"
                    : metodo + ".svg"
                }
                alt="check"
                width={24}
                height={24}
              />
              <p>{metodo}</p>
            </div>
          ))}
        </div>

        <button
          onClick={handleFinalizarPedido}
          className="flex justify-center items-center gap-4 mb-6 w-full md:max-w-xl h-12 md:h-16 bg-primary border-2 border-primary-foreground rounded-2xl text-secondary font-bold text-xl md:text-2xl"
        >
          Finalizar Pedido
          <Image
            src="/seta.svg"
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
