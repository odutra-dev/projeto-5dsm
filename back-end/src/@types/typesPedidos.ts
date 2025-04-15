import { Timestamp } from "firebase/firestore";

export type Pedido = {
    id: string;
    data: string;
    horario: string;
    tipo_entrega: string;
    tipo_pagamento: string;
  };

  export type PedidoProduto = {
    produtoId: string;
    quantidade: number; // se quiser controlar quantidade
    nome: string; 
  };

  export type NovoPedido = {
    data: string;
    horario: string;
    tipo_entrega: string;
    tipo_pagamento: string;
    clienteId: string;
    produtos: PedidoProduto[]; // nova relação
  };