import Image from "next/image";

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

      <main className="container">
        
      </main>
    </>
  );
}
