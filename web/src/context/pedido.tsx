"use client";
import {
  useContext,
  createContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

// Defina o tipo do item no carrinho, ajuste conforme seu caso real
interface Pedido {
  id: string;
  data: string;
  horario: string;
  tipo_entrega: string;
  tipo_pagamento: string;
  clienteId: string;
  produtos: {
    produtoId: string;
    quantidade: number;
  }[];
}

interface PedidoContextType {
  metodoPagamento: string;
  setMetodoPagamento: Dispatch<SetStateAction<string>>;
  metodoEntrega: string;
  setMetodoEntrega: Dispatch<SetStateAction<string>>;
  pedido: Pedido | null;
  setPedido: Dispatch<SetStateAction<Pedido | null>>;
}

// Cria o contexto com tipo ou valor inicial null
const PedidoContext = createContext<PedidoContextType | undefined>(undefined);

export function PedidoProvider({ children }: { children: ReactNode }) {
  const [pedido, setPedido] = useState<Pedido | null>(null);
  const [metodoPagamento, setMetodoPagamento] = useState<string>("Dinheiro");
  const [metodoEntrega, setMetodoEntrega] = useState<string>("Delivery");

  return (
    <PedidoContext.Provider
      value={{
        metodoPagamento,
        setMetodoPagamento,
        metodoEntrega,
        setMetodoEntrega,
        pedido,
        setPedido,
      }}
    >
      {children}
    </PedidoContext.Provider>
  );
}

// Custom hook que já verifica se o contexto está dentro do provider
export function usePedido() {
  const context = useContext(PedidoContext);
  if (!context) {
    throw new Error("usePedido deve ser usado dentro de um PedidoProvider");
  }
  return context;
}
