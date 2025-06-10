"use client";
import Header from "@/components/Header";
import Image from "next/image";
import { useCarrinho } from "@/context/carrinho";
import { useState, FormEvent, useEffect } from "react";
import { api } from "@/services/api";
import { useRouter } from "next/navigation";

export const Entrega = () => {
  const router = useRouter();
  const { metodoEntrega, metodoPagamento, carrinho } = useCarrinho();

  const [usuarioSalvo, setUsuarioSalvo] = useState<any | null>(null);
  const [mostrarModal, setMostrarModal] = useState(false);

  const [nome, setNome] = useState<string>("");
  const [telefone, setTelefone] = useState<string>("");

  const [ruaCompleta, setRuaCompleta] = useState<string>("");
  const [bairro, setBairro] = useState<string>("");
  const [complemento, setComplemento] = useState<string>("");

  useEffect(() => {
    const dados = localStorage.getItem("usuarioLogado");
    if (!dados) return;

    const parsed = JSON.parse(dados)[0];
    setUsuarioSalvo(parsed);

    setMostrarModal(true);
  }, [metodoEntrega]);

  const confirmarDadosSalvos = async () => {
    if (!usuarioSalvo) return;

    if (carrinho.length === 0) {
      alert("Seu carrinho está vazio.");
      return;
    }

    if (metodoEntrega === "Delivery" && !usuarioSalvo.endereco) {
      alert("Endereço necessário para entrega.");
      return;
    }

    try {
      await api.post("/pedido", {
        data: new Date().toISOString().split("T")[0],
        horario: new Date().toISOString(),
        tipo_entrega: metodoEntrega,
        tipo_pagamento: metodoPagamento,
        clienteId: usuarioSalvo.id,
        produtos: carrinho.map((item) => ({
          produtoId: item.id,
          quantidade: item.quantidade,
        })),
      });

      router.push("/pedidoRealizado");
    } catch (error) {
      console.log(error);
      alert("Erro ao usar os dados salvos. Tente novamente.");
    }
  };

  const editarDadosSalvos = () => {
    setNome(usuarioSalvo.nome);
    setTelefone(usuarioSalvo.telefone);
    setRuaCompleta(
      `${usuarioSalvo.endereco.rua}, ${usuarioSalvo.endereco.numero}`
    );
    setBairro(usuarioSalvo.endereco.bairro);
    setComplemento(usuarioSalvo.endereco.complemento);
    setMostrarModal(false);
  };

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

      if (metodoEntrega === "Delivery") {
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

        localStorage.setItem(
          "usuarioLogado",
          JSON.stringify([
            {
              id: cliente.data.id,
              nome: cliente.data.nome,
              telefone: cliente.data.telefone,
              endereco: {
                cep: cep,
                rua: rua,
                bairro: bairro,
                numero: numero,
                complemento: complemento,
              },
            },
          ])
        );
      } else {
        localStorage.setItem(
          "usuarioLogado",
          JSON.stringify([
            {
              id: cliente.data.id,
              nome: cliente.data.nome,
              telefone: cliente.data.telefone,
              endereco: null,
            },
          ])
        );
      }

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

      router.push("/pedidoRealizado");
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

      {mostrarModal && usuarioSalvo && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="relative bg-secondary bg-opacity-95 text-quinary border border-primary-foreground p-6 rounded-xl max-w-lg w-full shadow-xl backdrop-blur-sm">
            {/* Botão X no canto superior direito */}
            <button
              onClick={() => router.push("/carrinho")}
              className="absolute top-3 text-secondary right-3 bg-quinary rounded-full w-8 h-8 flex justify-center items-center text-xl font-bold hover:text-octonary transition"
              aria-label="Fechar"
            >
              ×
            </button>

            <h2 className="text-2xl font-bold mb-4">Confirmar Dados</h2>

            <p>
              <strong>Nome:</strong> {usuarioSalvo.nome}
            </p>
            <p>
              <strong>Telefone:</strong> {usuarioSalvo.telefone}
            </p>

            {metodoEntrega === "Delivery" && (
              <>
                <p>
                  <strong>Endereço:</strong> {usuarioSalvo.endereco.rua},{" "}
                  {usuarioSalvo.endereco.numero}
                </p>
                <p>
                  <strong>Bairro:</strong> {usuarioSalvo.endereco.bairro}
                </p>
                <p>
                  <strong>Complemento:</strong>{" "}
                  {usuarioSalvo.endereco.complemento}
                </p>
              </>
            )}

            <div className="flex gap-4 mt-6 justify-end">
              <button
                onClick={editarDadosSalvos}
                className="bg-settinary text-white px-4 py-2 rounded-xl hover:brightness-90 transition"
              >
                Editar
              </button>
              <button
                onClick={confirmarDadosSalvos}
                className="bg-primary text-white px-4 py-2 rounded-xl hover:brightness-90 transition"
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}

      <main className="mt-6 px-4 sm:px-6 md:px-8 w-full flex justify-center">
        <form
          onSubmit={realizarNovoPedido}
          className="flex flex-col gap-4 w-full max-w-xl"
        >
          <div>
            <label className="text-primary-text">Nome Completo</label>
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className="p-2 md:p-4 w-full rounded-xl border h-12 border-primary-text text-primary-text"
              placeholder="João da Silva"
            />
          </div>

          <div>
            <label className="text-primary-text">Telefone</label>
            <input
              value={telefone}
              onChange={(e) => setTelefone(e.target.value)}
              type="tel"
              className="p-2 md:p-4 w-full rounded-xl border h-12 border-primary-text text-primary-text"
              placeholder="(yy) xxxxx-xxxx"
            />
          </div>

          {metodoEntrega === "Delivery" && (
            <>
              <div>
                <label className="text-primary-text">Rua e Número</label>
                <input
                  value={ruaCompleta}
                  onChange={(e) => setRuaCompleta(e.target.value)}
                  type="text"
                  className="p-2 md:p-4 w-full rounded-xl border h-12 border-primary-text text-primary-text"
                  placeholder="Rua Tal, 123"
                />
              </div>
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <label className="text-primary-text">Complemento</label>
                  <input
                    value={complemento}
                    onChange={(e) => setComplemento(e.target.value)}
                    type="text"
                    className="p-2 md:p-4 w-full rounded-xl border h-12 border-primary-text text-primary-text"
                    placeholder="Apt 101, Fundos"
                  />
                </div>
                <div className="flex-1">
                  <label className="text-primary-text">Bairro</label>
                  <input
                    value={bairro}
                    onChange={(e) => setBairro(e.target.value)}
                    type="text"
                    className="p-2 md:p-4 w-full rounded-xl border h-12 border-primary-text text-primary-text"
                    placeholder="Vila Nova"
                  />
                </div>
              </div>
            </>
          )}

          <button
            className="flex justify-center items-center gap-4 mb-6 w-full h-12 md:h-16 bg-primary border-2 border-primary-foreground rounded-2xl text-secondary font-bold text-xl md:text-2xl"
            type="submit"
          >
            Finalizar pedido
            <Image
              src="/seta.svg"
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
