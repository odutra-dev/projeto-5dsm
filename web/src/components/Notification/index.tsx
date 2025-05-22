"use client";
import React from "react";

import { useCarrinho } from "@/context/carrinho";

type Props = {
  className?: string;
};

export default function Notification({ className }: Props) {
  const { carrinho } = useCarrinho();
  return (
    <div className={className}>
      <p className="text-primary-text font-bold text-xs">{carrinho.length}</p>
    </div>
  );
}
