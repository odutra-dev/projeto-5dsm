import { Timestamp } from "firebase/firestore";

export type Pedido = {
    id: string;
    data: string;
    horario: string;
    tipo_entrega: string;
    tipo_pagamento: string;
  };

  export type NovoPedido = {
    data: string;
    horario: string;
    tipo_entrega: string;
    tipo_pagamento: string;
    clienteId: string;
  };