// app/pedido/[id].tsx
import { useRouter, useLocalSearchParams } from "expo-router";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import theme from "../../theme";
import { useEffect, useState } from "react";
import { api } from "../../services/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

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

export default function DetalhesPedido() {
  const { id } = useLocalSearchParams<{ id: string }>();

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

  const [nome, setNome] = useState<string>("");
  const [endereco, setEndereco] = useState<Endereco | null>(null);

  const { data: pedido, isLoading } = useQuery<Pedido>({
    queryKey: ["pedido", id],
    queryFn: async () => {
      const res = await api.get<Pedido>(`/pedido/${id}`);
      return res.data;
    },
    enabled: !!id, // só executa se tiver id
  });

  useEffect(() => {
    if (pedido?.clienteId) {
      getUser(pedido.clienteId);
    }
  }, [id, pedido?.clienteId]);

  const getUser = async (clienteId: string) => {
    const userRes = await api.get<Cliente>(`/clientes/${clienteId}`);
    setNome(userRes.data.nome);

    const enderecosRes = await api.get<Endereco[]>(`/enderecos/`);

    const enderecoAchado = enderecosRes.data.find(
      (endereco) => endereco.clienteId === userRes.data.id
    );

    if (enderecoAchado) {
      setEndereco(enderecoAchado);
    }
  };

  if (isLoading || !pedido) {
    return <ActivityIndicator />;
  }

  const { bg, borderBg, bgLabel, textColor, label } =
    statusConfig[pedido.status];

  return (
    <View style={styles.container}>
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

        {/* Nome e endereço */}
        <Text style={[styles.nome, { color: textColor.label }]}>{nome}</Text>
        <Text style={[styles.endereco, { color: textColor.label }]}>
          {endereco == null
            ? "Av. Francisco Glycério, 571, Santos, São Paulo"
            : endereco.rua + ", " + endereco.numero}
        </Text>

        {/* Linha pontilhada */}
        <View style={[styles.dashedLine, { borderColor: borderBg }]} />

        {/* Horário e quantidade de itens */}
        <Text style={[styles.info, { color: textColor.label }]}>{`${
          pedido.horario
        } — ${
          Array.isArray(pedido.produtos) ? pedido.produtos.length : 0
        } itens`}</Text>

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
    </View>
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
    fontWeight: "600",
  },
  endereco: {
    fontSize: 14,
    marginBottom: 8,
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
