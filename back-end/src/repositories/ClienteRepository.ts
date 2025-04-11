import { NovoCliente, Cliente } from "../@types/typesClientes";
import { collection, doc, setDoc, getDocs, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

export class ClienteRepository {
  async create(cliente: NovoCliente): Promise<Cliente> {
    const novaRef = doc(collection(db, "clientes"));
    const idGerado = novaRef.id;

    const novoCliente: Cliente = {
      id: idGerado,
      nome: cliente.nome,
      telefone: cliente.telefone,
    };

    await setDoc(novaRef, novoCliente);
    return novoCliente;
  }

  async updateEndereco(clienteId: string, endereco: {
    cep: string;
    rua: string;
    bairro: string;
    numero: string;
    complemento: string;
  }) {
    const clienteRef = doc(db, "clientes", clienteId);
    return await updateDoc(clienteRef, { endereco });
  }

  /**
   * Adiciona o pedido como subdocumento na subcoleção: clientes/{clienteId}/pedidos/{pedidoId}
   */
  async addPedidoSubdocument(clienteId: string, pedidoData: {
    pedidoId: string;
    data: string;
    horario: string;
    tipo_entrega: string;
    tipo_pagamento: string;
    produtos: {
      produtoId: string;
      nome: string;
      quantidade: number;
    }[];
  }) {
    const pedidoRef = doc(db, "clientes", clienteId, "pedidos", pedidoData.pedidoId);
    await setDoc(pedidoRef, pedidoData);
  }
  

  async findAll(): Promise<Cliente[]> {
    const clienteCol = collection(db, "clientes");
    const snapshot = await getDocs(clienteCol);

    const clientes: Cliente[] = snapshot.docs.map(doc => ({
      id: doc.id,
      ...(doc.data() as Omit<Cliente, "id">),
    }));

    return clientes;
  }

  async findById(id: string): Promise<Cliente | null> {
    const docRef = doc(db, "clientes", id);
    const snap = await getDoc(docRef);

    if (snap.exists()) {
      return {
        id: snap.id,
        ...(snap.data() as Omit<Cliente, "id">),
      };
    }

    return null;
  }
}
