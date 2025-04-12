export type Produto = {
  id: string;
  nome: string;
  descricao: string;
  preco: number;
  imagemUrl: string; // <-- URL da imagem do produto
};

export type NovoProduto = {
  nome: string;
  descricao: string;
  preco: number;
  imagemUrl?: string; // <-- também aqui ao criar
};
