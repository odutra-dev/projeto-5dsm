import Image from "next/image";
import Link from "next/link";

export const Cardapio = () => {
  return (
    <>
      <header className="bg-primary h-32">
        <div className="flex justify-between items-center px-6 md:px-12 h-full">
          <h1 className="text-3xl font-bold text-secondary">Cardápio</h1>
          <Link
            href="/"
            className="cursor-pointer w-12 h-12 rounded-full bg-primary-foreground border-1 border-primary-text flex justify-center items-center"
          >
            <Image
              className=""
              src="/close.svg"
              alt="Geladinho Santista"
              width={24}
              height={24}
            />
          </Link>
        </div>
      </header>

      <main className="mt-6 flex justify-center flex-col items-center px-6 w-full">
        <section className="w-full md:max-w-xl bg-quinary/40 h-full flex px-6 py-4 rounded-xl relative outline-hidden">
          <div className="flex flex-col gap-3">
            <div className="flex flex-col">
              <p className="text-2xl text-quinary font-bold">Novos Sabores</p>
              <p className="text-2xl text-primary-text font-bold">Chegaram!</p>
            </div>
            <button className="bg-primary-text text-secondary h-12 rounded">
              Venha Conferir
            </button>
          </div>
          <Image
            className="absolute right-0 bottom-0 rounded-br-md"
            src="/produto-banner.png"
            alt="Produto Novo"
            width={125}
            height={125}
          />
        </section>
      </main>
    </>
  );
};

export default Cardapio;
