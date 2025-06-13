// app/pedido/[id].tsx
import { useRouter, useLocalSearchParams } from "expo-router";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import theme from "../../theme";
import { useEffect, useState } from "react";
import { api } from "../../services/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { showToastWithGravity } from "../../util/toast";
import { User, Phone, MapPin } from "phosphor-react-native";

const statusConfig = {
  PENDENTE: {
    bg: theme.colors.yellowBG[200],
    bgLabel: theme.colors.yellowBG[300],
    borderBg: theme.colors.yellowBG[600],
    textColor: {
      number: theme.colors.yellowBG[700],
      label: theme.colors.yellowBG[700],
    },
    label: "Pendente",
  },
  EMPRODUCAO: {
    bg: theme.colors.sunshadeOrange[200],
    bgLabel: theme.colors.sunshadeOrange[300],
    borderBg: theme.colors.sunshadeOrange[600],
    textColor: {
      number: theme.colors.sunshadeOrange[700],
      label: theme.colors.sunshadeOrange[700],
    },
    label: "Em Produção",
  },
  PRONTO: {
    bg: theme.colors.bostonBlue[200],
    bgLabel: theme.colors.bostonBlue[300],
    borderBg: theme.colors.bostonBlue[600],
    textColor: {
      number: theme.colors.bostonBlue[700],
      label: theme.colors.bostonBlue[700],
    },
    label: "Pronto",
  },
  CONCLUIDO: {
    bg: theme.colors.atlantisGreen[200],
    bgLabel: theme.colors.atlantisGreen[300],
    borderBg: theme.colors.atlantisGreen[600],
    textColor: {
      number: theme.colors.atlantisGreen[700],
      label: theme.colors.atlantisGreen[700],
    },
    label: "Concluído",
  },
};

type PedidoProduto = {
  produtoId: string;
  quantidade: number;
};

type Pedido = {
  id: string;
  data: string;
  horario: string;
  clienteId: string;
  produtos: PedidoProduto[];
  tipo_pagamento: string;
  tipo_entrega: string;
  valor: number;
  status: keyof typeof statusConfig;
};

type Cliente = {
  id: string;
  nome: string;
  telefone: string;
};

type Endereco = {
  id: string;
  cep: string;
  rua: string;
  bairro: string;
  numero: string;
  complemento: string;
  clienteId: string;
};

type Produto = {
  id: string;
  nome: string;
  descricao: string;
  preco: number;
  imagemUrl: string;
};

export default function DetalhesPedido() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const [usuario, setUsuario] = useState<Cliente | null>(null);
  const [endereco, setEndereco] = useState<Endereco | null>(null);
  const [produtosDetalhes, setProdutosDetalhes] = useState<Produto[]>([]);

  const router = useRouter();

  const queryClient = useQueryClient();

  const updateStatus = useMutation({
    mutationFn: async (novoStatus: Pedido["status"]) => {
      await api.put(`/pedido/${id}`, { status: novoStatus });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pedido", id] }); // Atualiza os dados
    },
  });

  const { data: pedido, isLoading } = useQuery<Pedido>({
    queryKey: ["pedido", id],
    queryFn: async () => {
      const res = await api.get<Pedido>(`/pedido/${id}`);

      console.log(res.data);

      return res.data;
    },
    enabled: !!id, // só executa se tiver id
  });

  useEffect(() => {
    if (pedido) {
      fetchProdutosDetalhes().then((produtos) => {
        const filtrados = produtos.filter((p) =>
          pedido?.produtos?.some((pp) => pp.produtoId === p.id)
        );
        setProdutosDetalhes(filtrados);
      });
    }
  }, [pedido]);

  useEffect(() => {
    if (pedido?.clienteId) {
      getUser(pedido.clienteId);
    }
  }, [id, pedido?.clienteId]);

  if (isLoading || !pedido) {
    return <ActivityIndicator />;
  }

  const fetchProdutosDetalhes = async () => {
    const res = await api.get<Produto[]>("/produtos");
    return res.data;
  };

  const getUser = async (clienteId: string) => {
    const userRes = await api.get<Cliente>(`/clientes/${clienteId}`);
    setUsuario(userRes.data);

    const enderecosRes = await api.get<Endereco[]>(`/enderecos/`);

    const enderecoAchado = enderecosRes.data.find(
      (endereco) => endereco.clienteId === userRes.data.id
    );

    if (enderecoAchado) {
      setEndereco(enderecoAchado);
    }
  };

  const { bg, borderBg, bgLabel, textColor, label } =
    statusConfig[pedido.status];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Detalhes do Pedido</Text>
      </View>

      <View
        style={[styles.card, { backgroundColor: bg, borderColor: borderBg }]}
      >
        {/* Status label no canto superior direito */}
        <View style={styles.statusLabelContainer}>
          <Text
            style={[
              styles.statusLabel,
              { backgroundColor: bgLabel, color: textColor.label },
            ]}
          >
            {label}
          </Text>
        </View>

        {/* Número do pedido */}
        <Text style={[styles.numeroPedido, { color: textColor.number }]}>
          {id}
        </Text>

        <Text style={[styles.info, { color: textColor.label }]}>
          {new Intl.DateTimeFormat("pt-BR").format(new Date(pedido.data))} -{" "}
          {new Date(pedido.horario).toLocaleTimeString("pt-BR", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </Text>

        {/* Informações do Cliente */}
        <Text
          style={[styles.nome, { color: textColor.label, fontWeight: "bold" }]}
        >
          Informações do Cliente
        </Text>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
          <User size={20} color={textColor.label} />
          <Text style={[styles.nome, { color: textColor.label }]}>
            {usuario?.nome}
          </Text>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
          <Phone size={20} color={textColor.label} />
          <Text style={[styles.nome, { color: textColor.label }]}>
            {usuario?.telefone}
          </Text>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
          <MapPin size={20} color={textColor.label} />
          <Text style={[styles.endereco, { color: textColor.label }]}>
            {endereco == null
              ? "Av. Francisco Glycério, 571, Santos, São Paulo"
              : endereco.rua + ", " + endereco.numero}
          </Text>
        </View>

        {/* Linha pontilhada */}
        <View style={[styles.dashedLine, { borderColor: borderBg }]} />

        {/* Produtos */}
        <Text
          style={[styles.nome, { color: textColor.label, fontWeight: "bold" }]}
        >
          Itens do Pedido
        </Text>

        {pedido.produtos?.map((produto) => {
          const detalhe = produtosDetalhes.find(
            (p) => p.id === produto.produtoId
          );

          return (
            <View
              key={produto.produtoId}
              style={{ flexDirection: "row", alignItems: "center", gap: 8 }}
            >
              <Text style={[styles.produto, { color: textColor.label }]}>
                {produto.quantidade}x {detalhe ? detalhe.nome : "Carregando..."}{" "}
                - R$ {detalhe ? detalhe.preco.toFixed(2) : "--"}
              </Text>
            </View>
          );
        })}

        {/* Linha pontilhada */}
        <View style={[styles.dashedLine, { borderColor: borderBg }]} />

        {/* Tipo de pagamento e valor */}
        <View style={styles.footer}>
          <Text style={[styles.pagamento, { color: textColor.label }]}>
            {pedido.tipo_pagamento}
          </Text>
          <Text style={[styles.valor, { color: textColor.label }]}>
            R$ {pedido.valor.toFixed(2)}
          </Text>
        </View>
      </View>

      <View style={{ marginTop: 16, paddingHorizontal: 16, gap: 8 }}>
        <TouchableOpacity
          onPress={() => updateStatus.mutate("EMPRODUCAO")}
          style={[
            styles.botao,
            {
              backgroundColor: theme.colors.sunshadeOrange[300],
              borderColor: theme.colors.sunshadeOrange[500],
            },
          ]}
        >
          <Text
            style={{
              color: theme.colors.sunshadeOrange[700],
              fontWeight: "bold",
            }}
          >
            Mudar para {statusConfig["EMPRODUCAO"].label}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => updateStatus.mutate("PRONTO")}
          style={[
            styles.botao,
            {
              backgroundColor: theme.colors.bostonBlue[300],
              borderColor: theme.colors.bostonBlue[500],
            },
          ]}
        >
          <Text
            style={{ color: theme.colors.bostonBlue[700], fontWeight: "bold" }}
          >
            Mudar para {statusConfig["PRONTO"].label}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => updateStatus.mutate("PRONTO")}
          style={[
            styles.botao,
            {
              backgroundColor: theme.colors.atlantisGreen[300],
              borderColor: theme.colors.atlantisGreen[500],
            },
          ]}
        >
          <Text
            style={{
              color: theme.colors.atlantisGreen[700],
              fontWeight: "bold",
            }}
          >
            Mudar para {statusConfig["CONCLUIDO"].label}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => router.push("/pedidos")}
          style={[
            styles.botao,
            {
              backgroundColor: theme.colors.rosePrincipal[300],
              borderColor: theme.colors.rosePrincipal[500],
            },
          ]}
        >
          <Text
            style={{
              color: theme.colors.rosePrincipal[700],
              fontWeight: "bold",
            }}
          >
            Voltar
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    backgroundColor: theme.colors.sunshadeOrange[200],
    flex: 1,
  },
  header: {
    backgroundColor: theme.colors.rosePrincipal[400],
    paddingHorizontal: 24,
    height: 80,
    justifyContent: "center",
  },
  title: {
    color: theme.colors.yellowBG[100],
    fontSize: 24,
    fontWeight: "bold",
  },
  card: {
    padding: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: theme.colors.rosePrincipal[400],
    marginHorizontal: 16,
    marginTop: 32,
  },
  statusLabelContainer: {
    position: "absolute",
    top: 8,
    right: 8,
    borderRadius: 8,
    paddingVertical: 4,
    paddingHorizontal: 10,
  },
  produto: {
    fontSize: 16,
    marginVertical: 4,
  },
  statusLabel: {
    fontWeight: "bold",
    fontSize: 12,
    padding: 4,
  },
  numeroPedido: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  nome: {
    fontSize: 16,
    marginVertical: 4,
  },
  endereco: {
    fontSize: 16,
    marginVertical: 4,
  },
  dashedLine: {
    borderBottomWidth: 1,
    borderStyle: "dashed",
    marginVertical: 6,
  },
  info: {
    fontSize: 14,
  },
  pagamento: {
    fontSize: 14,
    fontWeight: "500",
  },
  valor: {
    fontSize: 16,
    fontWeight: "bold",
  },
  footer: {
    marginTop: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  botao: {
    paddingVertical: 10,
    borderRadius: 8,
    marginBottom: 8,
    alignItems: "center",
    justifyContent: "center",
    height: 48,
    borderWidth: 2,
  },
});
