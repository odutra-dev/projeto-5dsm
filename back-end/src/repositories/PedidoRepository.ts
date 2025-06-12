import { collection, doc, setDoc, getDocs, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { NovoPedido, Pedido } from "../@types/typesPedidos";
export class PedidoRepository {
  async create(pedido: NovoPedido): Promise<Pedido> {
    const novaRef = doc(collection(db, "pedidos"));
    const idGerado = novaRef.id;
  
    if (
      !pedido.data ||
      !pedido.horario ||
      !pedido.tipo_entrega ||
      !pedido.tipo_pagamento ||
      !pedido.clienteId ||
      !pedido.produtos  ||
      !pedido.status ||
      !pedido.valor
    ) {
      throw new Error("Campos obrigatórios do pedido ausentes ou inválidos.");
    }
  
    const novoPedido: Pedido = {
      id: idGerado,
      data: pedido.data,
      horario: pedido.horario,
      tipo_entrega: pedido.tipo_entrega,
      tipo_pagamento: pedido.tipo_pagamento,
      clienteId: pedido.clienteId,
      produtos: pedido.produtos,
      status: pedido.status,
      valor: pedido.valor,
    };
  
    const pedidoLimpo = JSON.parse(JSON.stringify(novoPedido));
    await setDoc(novaRef, pedidoLimpo);
    return novoPedido;
  }
  
  

    async findAll(): Promise<Pedido[]> {
        const pedidoCol = collection(db, "pedidos");
        const snapshot = await getDocs(pedidoCol);
    
        const pedidos: Pedido[] = snapshot.docs.map(doc => ({
          id: doc.id,
          ...(doc.data() as Omit<Pedido, "id">)
        }));
    
        return pedidos;
      }
    
      async findById(id: string): Promise<Pedido | null> {
        const docRef = doc(db, "pedidos", id);
        const snap = await getDoc(docRef);
    
        if (snap.exists()) {
          return {
            id: snap.id,
            ...(snap.data() as Omit<Pedido, "id">)
          };
        }
        
        return null;
      }
    }