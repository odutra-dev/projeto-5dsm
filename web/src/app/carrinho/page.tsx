import { CardCarrinho } from "@/components/CardCarrinho";
import Header from "@/components/Header";

export const Carrinho = () => {
  return (
    <>
      <Header
        icon="back"
        title="Carrinho"
        icon2="shop"
        link="/"
        link2="/cardapio"
      />

      <main className="my-10 flex justify-center flex-col items-center px-6 w-full">
        <CardCarrinho
          id="1"
          nome="Coca-Cola"
          preco={5.99}
          imagemUrl=""
          descricao=""
        />
      </main>
    </>
  );
};

export default Carrinho;
