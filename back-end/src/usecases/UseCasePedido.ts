import { NovoPedido, Pedido } from "../@types/typesPedidos";
import { PedidoRepository } from "../repositories/PedidoRepository";

export class UseCasePedido {
    private repository: PedidoRepository;

    constructor(){
        this.repository = new PedidoRepository();
    }
    async create({data, horario, tipo_entrega, tipo_pagamento, clienteId, produtos, status, valor}: NovoPedido): Promise<Pedido> {
        const pedido = await this.repository.create({ data, horario, tipo_entrega, tipo_pagamento, clienteId, produtos, status, valor});
        return pedido;    
    }

    async findAll(): Promise<Pedido[]> {
        const pedidos = await this.repository.findAll();
        return pedidos;
      }
    
      async findById(id: string): Promise<Pedido | null> {
        const pedido = await this.repository.findById(id);
        return pedido;
      }
}