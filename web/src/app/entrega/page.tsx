"use client";
import Header from "@/components/Header";
import Image from "next/image";
import { useCarrinho } from "@/context/carrinho";
import { useState, FormEvent } from "react";
import { api } from "@/services/api";

export const Entrega = () => {
  const { metodoEntrega, metodoPagamento, carrinho } = useCarrinho();
  const [nome, setNome] = useState<string>("");
  const [telefone, setTelefone] = useState<string>("");

  const [ruaCompleta, setRuaCompleta] = useState<string>("");
  const [bairro, setBairro] = useState<string>("");
  const [complemento, setComplemento] = useState<string>("");

  function gerarCepAleatorio(): string {
    // CEPs válidos geralmente vão de 01000000 a 99999999
    const cep =
      Math.floor(Math.random() * (99999999 - 10000000 + 1)) + 10000000;
    return cep.toString();
  }

  const realizarNovoPedido = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const cliente = await api.post("/clientes", {
        nome,
        telefone,
      });

      const match = ruaCompleta.match(/^(.*?)(?:,\s*)(\d+.*)$/);

      if (!match) {
        alert("Digite o endereço no formato: Rua Tal, 123");
        return;
      }

      const rua = match?.[1]?.trim() || "";
      const numero = match?.[2]?.trim() || "";

      const cep = gerarCepAleatorio();

      await api.post("/enderecos", {
        cep,
        rua: rua,
        bairro,
        numero,
        complemento,
        clienteId: cliente.data.id,
      });

      await api.post("/pedido", {
        data: new Date().toISOString().split("T")[0],
        horario: new Date().toISOString(),
        tipo_entrega: metodoEntrega,
        tipo_pagamento: metodoPagamento,
        clienteId: cliente.data.id,
        produtos: carrinho.map((item) => ({
          produtoId: item.id,
          quantidade: item.quantidade,
        })),
      });
    } catch (error) {
      console.log(error);
      alert(
        "Ocorreu um erro ao realizar o pedido. Por favor, tente novamente."
      );
    }
  };

  return (
    <>
      <Header icon="back" title="Dados para entrega" link="/carrinho" />

      <main className="mt-6 flex justify-center flex-col  px-6 w-full">
        <form onSubmit={realizarNovoPedido} className="flex flex-col gap-4">
          <div>
            <label htmlFor="" className="text-primary-text">
              Nome Completo
            </label>
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className="p-2 md:p-4 w-full md:max-w-xl rounded-xl border-1 h-12 border-primary-text text-primary-text"
              placeholder="João da Silva"
            />
          </div>
          <div>
            <label htmlFor="" className="text-primary-text">
              Telefone
            </label>
            <input
              value={telefone}
              onChange={(e) => setTelefone(e.target.value)}
              type="tel"
              className="p-2 md:p-4 w-full md:max-w-xl rounded-xl border-1 h-12 border-primary-text text-primary-text"
              placeholder="(yy) xxxxx-xxxx"
            />
          </div>

          {/* Parte da Entrega */}

          {metodoEntrega === "Delivery" && (
            <>
              <div>
                <label className="text-primary-text">Rua e Número</label>
                <input
                  value={ruaCompleta}
                  onChange={(e) => setRuaCompleta(e.target.value)}
                  type="text"
                  className="p-2 md:p-4 w-full md:max-w-xl rounded-xl border-1 h-12 border-primary-text text-primary-text"
                  placeholder="Rua Tal, 123"
                />
              </div>
              <div className="flex gap-4">
                <div>
                  <label className="text-primary-text">Complemento</label>
                  <input
                    value={complemento}
                    onChange={(e) => setComplemento(e.target.value)}
                    type="text"
                    className="p-2 md:p-4 w-full md:max-w-xl rounded-xl border-1 h-12 border-primary-text text-primary-text"
                    placeholder="Apt 101, Fundos"
                  />
                </div>
                <div>
                  <label className="text-primary-text">Bairro</label>
                  <input
                    value={bairro}
                    onChange={(e) => setBairro(e.target.value)}
                    type="text"
                    className="p-2 md:p-4 w-full md:max-w-xl rounded-xl border-1 h-12 border-primary-text text-primary-text"
                    placeholder="Vila Nova"
                  />
                </div>
              </div>
            </>
          )}

          <button
            className="flex justify-center items-center gap-4 mb-6 w-full md:max-w-xl h-12 md:h-16 bg-primary border-2 border-primary-foreground rounded-2xl text-secondary font-bold text-xl md:text-2xl"
            type="submit"
          >
            Finalizar pedido
            <Image
              src="/back.svg"
              alt="seta que aponta para a direita"
              width={16}
              height={16}
            />
          </button>
        </form>
      </main>
    </>
  );
};

export default Entrega;
