export type Endereco = {
    id: string;
    cep: string;
    rua: string;
    bairro: string;
    numero: string;
    complemento: string;
    clienteId: string;
  };

  export type NovoEndereco = {
    cep: string;
    rua: string;
    bairro: string;
    numero: string;
    complemento: string;
    clienteId: string;
  };