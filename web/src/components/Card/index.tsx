import Image from "next/image";

type CardProps = {
  titulo: string;
  descricao: string;
  imagem: string;
  preco: number;
};

export const Card = ({ titulo, descricao, imagem, preco }: CardProps) => {
  return (
    <div className="flex bg-sextary/30 rounded-xl border-1 border-primary-text p-4 gap-4">
      <Image
        src={imagem}
        alt={titulo}
        width={100}
        height={100}
        className="rounded"
      />
      <div>
        <p className="font-bold text-primary-text text-lg">{titulo}</p>
        <p className="text-quinary text-sm">{descricao}</p>
        <p className="font-bold text-primary-text text-xl">R$ {preco}</p>
      </div>
    </div>
  );
};
