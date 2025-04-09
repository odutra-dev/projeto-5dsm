import Image from "next/image";

export const Cardapio = () => {
  return (
    <>
      <header className="bg-primary h-32">
        <div className="flex justify-between items-center px-6 md:px-12 h-full">
          <h1 className="text-3xl font-bold text-secondary">Cardápio</h1>
          <div className="cursor-pointer w-12 h-12 rounded-full bg-primary-foreground border-1 border-primary-text flex justify-center items-center">
            <Image
              className=""
              src="/close.svg"
              alt="Geladinho Santista"
              width={24}
              height={24}
            />
          </div>
        </div>
      </header>
    </>
  );
};

export default Cardapio;
