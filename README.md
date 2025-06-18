# Geladinho Santista

![logo](https://github.com/user-attachments/assets/8742a196-896e-4879-b24c-0c5b1799ff65)

O projeto Geladinho Santista consiste em um sistema digital dividido em duas partes:

- **Web**: Interface para o cliente realizar pedidos de geladinhos e doces.
- **Mobile**: Aplicativo para a empresa gerenciar pedidos, estoque e personalizar as recomendações aos clientes.

## Tecnologias Utilizadas

- **Front-end Web**: (Tecnologias utilizadas na parte da web)
- **Front-end Mobile**: React Native
- **Back-end**: Node.js (API RESTful)
- **Banco de Dados**: PostgreSQL
- **Machine Learning**: Algoritmo para recomendações personalizadas
- **Hospedagem**: AWS ou Vercel

## Funcionalidades

- **Cardápio Digital**: Acesso rápido via QR Code.
- **Painel Administrativo**: Gestão de pedidos, estoque e relatórios.
- **Recomendações Personalizadas**: Sugestões baseadas no histórico de compras.
- **Integração com WhatsApp**: Automação na comunicação e pedidos.

## Objetivo

Desenvolver uma solução que otimize a gestão de pedidos, melhore a experiência do cliente e permita a personalização dos serviços oferecidos pela Geladinho Santista.

## Como executar o projeto

Para executar o projeto, siga os passos abaixo:

```bash
git clone https://github.com/odutra-dev/projeto-5dsm
cd Geladinho-Santista
```

### Web

Primeiramente entre na pasta `web` e execute:

```bash
npm install
```

Em seguida, preencha o arquivo `.env` com as suas credenciais da API e execute:

```bash
npm run dev
```

### Mobile

Primeiramente entre na pasta `mobile` e execute:

```bash
npm install
```

Em seguida, preencha o arquivo `.env` com as suas credenciais da API e execute:

```bash
npx expo start
```

### Back-end

Primeiramente entre na pasta `back-end` e execute:

```bash
npm install
```

Em seguida, preencha o arquivo `.env` com as suas credenciais do Firebase, Criptografia e execute:

```bash
npm run dev
```

### Machine Learning

Para executar o algoritmo de Machine Learning, você terá que ir para o google Colab e executar o arquivo `BaseDeDados_Geladinho.ipynb`. Para isso, execute o seguinte comando:

```bash
jupyter notebook BaseDeDados_Geladinho.ipynb
```
