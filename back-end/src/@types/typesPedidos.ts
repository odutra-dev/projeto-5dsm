import { Timestamp } from "firebase/firestore";

export type Pedido = {
  id: string;
  data: string;
  horario: string;
  tipo_entrega: string;
  tipo_pagamento: string;
  status: string;
  valor: number;
};

export type PedidoProduto = {
  produtoId: string;
  quantidade: number; // se quiser controlar a quantidade
  nome: string;
};

export type NovoPedido = {
  data: string;
  horario: string;
  tipo_entrega: string;
  tipo_pagamento: string;
  clienteId: string;
  produtos: PedidoProduto[];
  status: string;
  valor: number;
};
