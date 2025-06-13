import { View, Text, StyleSheet } from "react-native";
import theme from "../../theme";
import { useEffect, useState } from "react";
import { api } from "../../services/api";

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

type Endereco = {
  id: string;
  cep: string;
  rua: string;
  bairro: string;
  numero: string;
  complemento: string;
  clientId: string;
};

type Props = {
  id: string;
  data: string;
  horario: string;
  clienteId: string;
  produtos: {
    produtoId: string;
    quantidade: number;
  }[];
  tipo_pagamento: string;
  tipo_entrega: string;
  valor: number;
  status: keyof typeof statusConfig;
};

export default function CardPedido({
  id,
  data,
  horario,
  clienteId,
  produtos,
  tipo_pagamento,
  tipo_entrega,
  valor,
  status,
}: Props) {
  const { bg, borderBg, bgLabel, textColor, label } = statusConfig[status];

  const [nome, setNome] = useState<string>("");
  const [endereco, setEndereco] = useState<Endereco | null>(null);

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    const user = await api.get(`/clientes/${clienteId}`);
    setNome(user.data.nome);

    const enderecos = await api.get(`/enderecos/`);

    const enderecoAchado = enderecos.data.find(
      (endereco: any) => endereco.clienteId === user.data.id
    );

    if (enderecoAchado) {
      setEndereco(enderecoAchado);
    }
  };

  return (
    <View
      style={[styles.container, { backgroundColor: bg, borderColor: borderBg }]}
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
      <Text style={[styles.info, { color: textColor.label }]}>{`${new Date(
        horario
      ).toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
      })} — ${Array.isArray(produtos) ? produtos.length : 0} itens`}</Text>

      {/* Linha pontilhada */}
      <View style={[styles.dashedLine, { borderColor: borderBg }]} />

      {/* Tipo de pagamento e valor */}
      <View style={styles.footer}>
        <Text style={[styles.pagamento, { color: textColor.label }]}>
          {tipo_pagamento}
        </Text>
        <Text style={[styles.valor, { color: textColor.label }]}>
          R$ {valor.toFixed(2)}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 16,
    position: "relative",
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
});
