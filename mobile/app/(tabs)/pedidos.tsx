import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import Header from "../../components/Header";
import theme from "../../theme";
import { useState } from "react";
import CardPedido from "../../components/CardPedido";

const statusList = [
  { label: "Pendente", value: "PENDENTE" },
  { label: "Em Produção", value: "EMPRODUCAO" },
  { label: "Pronto", value: "PRONTO" },
  { label: "Concluido", value: "CONCLUIDO" },
];

export default function Pedidos() {
  const [status, setStatus] = useState("PENDENTE");

  const [pedidos] = useState([
    {
      numero: "ORD-006",
      nome: "Eduardo Lima",
      endereco: "Rua dos Ipês, 987 - Alto da Boa Vista",
      horario: "11:45",
      itens: 21,
      pagamento: "Cartão de Crédito",
      valor: "R$ 120,00",
      status: "PENDENTE",
    },
    {
      numero: "ORD-007",
      nome: "Eduardo Lima",
      endereco: "Rua dos Ipês, 987 - Alto da Boa Vista",
      horario: "11:45",
      itens: 21,
      pagamento: "Cartão de Crédito",
      valor: "R$ 120,00",
      status: "EMPRODUCAO",
    },
    {
      numero: "ORD-008",
      nome: "Eduardo Lima",
      endereco: "Rua dos Ipês, 987 - Alto da Boa Vista",
      horario: "11:45",
      itens: 21,
      pagamento: "Cartão de Crédito",
      valor: "R$ 120,00",
      status: "PRONTO",
    },
    {
      numero: "ORD-009",
      nome: "Eduardo Lima",
      endereco: "Rua dos Ipês, 987 - Alto da Boa Vista",
      horario: "11:45",
      itens: 21,
      pagamento: "Cartão de Crédito",
      valor: "R$ 120,00",
      status: "CONCLUIDO",
    },
  ]);

  const pedidosFiltrados = pedidos.filter((p) => p.status === status);

  return (
    <View style={styles.container}>
      <Header titulo="Pedidos" />

      <View style={styles.main}>
        <View style={styles.statusContainer}>
          {statusList.map((item) => {
            const isSelected = status === item.value;
            return (
              <TouchableOpacity
                key={item.value}
                style={[
                  styles.botao,
                  isSelected && {
                    backgroundColor: theme.colors.chocolateBrown[600],
                  },
                ]}
                onPress={() => setStatus(item.value)}
              >
                <Text
                  style={[
                    styles.statusLabel,
                    isSelected && { color: theme.colors.chocolateBrown[50] },
                  ]}
                >
                  {item.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <FlatList
          data={pedidosFiltrados}
          keyExtractor={(item) => item.numero}
          renderItem={({ item }) => <CardPedido {...item} />}
          ListEmptyComponent={
            <Text style={{ textAlign: "center", marginTop: 20 }}>
              Nenhum pedido com esse status.
            </Text>
          }
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.yellowBG[100],
  },
  main: {
    paddingHorizontal: 24,
    marginTop: 40,
  },
  statusContainer: {
    flexDirection: "row",
    marginBottom: 12,
    borderRadius: 8,
    backgroundColor: theme.colors.chocolateBrown[200],
    overflow: "hidden",
  },
  botao: {
    padding: 8,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
  },
  statusLabel: {
    color: theme.colors.chocolateBrown[600],
    fontSize: 16,
  },
});
