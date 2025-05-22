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
interface ItemCarrinho {
  id: string;
  nome: string;
  descricao: string;
  imagemUrl: string;
  preco: number;
}

// Tipo para o contexto
interface CarrinhoContextType {
  carrinho: ItemCarrinho[];
  setCarrinho: Dispatch<SetStateAction<ItemCarrinho[]>>;
}

// Cria o contexto com tipo ou valor inicial null
const CarrinhoContext = createContext<CarrinhoContextType | undefined>(
  undefined
);

export function CarrinhoProvider({ children }: { children: ReactNode }) {
  const [carrinho, setCarrinho] = useState<ItemCarrinho[]>([]);

  return (
    <CarrinhoContext.Provider value={{ carrinho, setCarrinho }}>
      {children}
    </CarrinhoContext.Provider>
  );
}

// Custom hook que já verifica se o contexto está dentro do provider
export function useCarrinho() {
  const context = useContext(CarrinhoContext);
  if (!context) {
    throw new Error("useCarrinho deve ser usado dentro de um CarrinhoProvider");
  }
  return context;
}
