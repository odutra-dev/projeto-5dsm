import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <header className="bg-primary h-32 relative">
        <Image
          className="absolute left-1/2 top-1/2 -translate-x-1/2"
          src="/logo.svg"
          alt="Geladinho Santista"
          width={180}
          height={180}
        />
      </header>

      <main className="mt-40 flex justify-center flex-col items-center px-6 w-full">
        <Link
          className="px-6 py-3 bg-primary h-12 md:h-16 text-base md:text-xl font-bold text-secondary w-full md:max-w-xl flex justify-between items-center gap-4 rounded-xl border-2 border-primary-foreground"
          href="/"
        >
          Acessar o cardápio
          <Image
            src="/garfo-faca.svg"
            alt="Garfo e faca"
            width={24}
            height={24}
          />
        </Link>

        <div className="mt-12 flex flex-col  justify-center items-center w-full md:max-w-xl">
          <p className="text-tertiary font-bold text-2xl md:text-3xl">
            Informações
          </p>
          <div className="flex flex-col bg-quaternary/20 border border-quaternary-foreground rounded-xl justify-center w-full md:max-w-xl ">
            <div className="flex p-6 items-center gap-4">
              <Image src="/relogio.svg" alt="relogio" width={24} height={24} />
              <p className="text-quaternary text-sm md:text-xl">
                Seg-Sáb, das 11h ás 22hs
              </p>
            </div>

            <hr className="border-t border-quaternary-foreground my-6" />

            <div className="flex p-6 items-center gap-4">
              <Image
                src="/whatsapp.svg"
                alt="whatsapp"
                width={24}
                height={24}
              />
              <p className="text-quaternary text-sm md:text-xl">
                (13) 9 9784-4058
              </p>
            </div>

            <hr className="border-t border-quaternary-foreground my-6" />

            <div className="flex p-6 items-center gap-4">
              <Image src="/local.svg" alt="local" width={24} height={24} />
              <p className="text-quaternary text-sm md:text-xl">
                Av. Francisco Glycério, nº 571, Santos/SP
              </p>
            </div>

            <hr className="border-t border-quaternary-foreground my-6" />

            <div className="flex p-6 items-center gap-4">
              <Image
                src="/instagram.svg"
                alt="instagram"
                width={24}
                height={24}
              />
              <p className="text-quaternary text-sm md:text-xl">
                @geladinho.santista
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
