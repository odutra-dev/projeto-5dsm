import Header from "@/components/Header";
import Image from "next/image";

export const Entrega = () => {
  return (
    <>
      <Header icon="back" title="Dados para entrega" link="/carrinho" />

      <main className="mt-6 flex justify-center flex-col  px-6 w-full">
        <div className="flex flex-col gap-4">
          <div>
            <label htmlFor="" className="text-primary-text">
              Nome Completo
            </label>
            <input
              type="text"
              className="p-2 md:p-4 w-full md:max-w-xl rounded-xl border-1 h-12 border-primary-text text-primary-text"
              placeholder="João da Silva"
            />
          </div>
          <div>
            <label htmlFor="" className="text-primary-text">
              Telefone
            </label>
            <input
              type="tel"
              className="p-2 md:p-4 w-full md:max-w-xl rounded-xl border-1 h-12 border-primary-text text-primary-text"
              placeholder="(yy) xxxxx-xxxx"
            />
          </div>
          <div>
            <label htmlFor="" className="text-primary-text">
              Rua e Número
            </label>
            <input
              type="text"
              className="p-2 md:p-4 w-full md:max-w-xl rounded-xl border-1 h-12 border-primary-text text-primary-text"
              placeholder="Rua Tal, 123"
            />
          </div>
          <div className="flex gap-4">
            <div>
              <label htmlFor="" className="text-primary-text">
                Complemento
              </label>
              <input
                type="text"
                className="p-2 md:p-4 w-full md:max-w-xl rounded-xl border-1 h-12 border-primary-text text-primary-text"
                placeholder="Apt 101, Fundos"
              />
            </div>
            <div>
              <label htmlFor="" className="text-primary-text">
                Bairro
              </label>
              <input
                type="text"
                className="p-2 md:p-4 w-full md:max-w-xl rounded-xl border-1 h-12 border-primary-text text-primary-text"
                placeholder="Vila Nova"
              />
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
        </div>
      </main>
    </>
  );
};

export default Entrega;
