import { View, Text, StyleSheet, FlatList } from "react-native";
import Header from "../../components/Header";
import theme from "../../theme";
import { useState } from "react";
import CardPedido from "../../components/CardPedido";

export default function Pedidos() {
  const [status, setStatus] = useState("PENDENTE");

  const [pedidos, setPedidos] = useState([
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
      numero: "ORD-006",
      nome: "Eduardo Lima",
      endereco: "Rua dos Ipês, 987 - Alto da Boa Vista",
      horario: "11:45",
      itens: 21,
      pagamento: "Cartão de Crédito",
      valor: "R$ 120,00",
      status: "EMPRODUCAO",
    },
    {
      numero: "ORD-006",
      nome: "Eduardo Lima",
      endereco: "Rua dos Ipês, 987 - Alto da Boa Vista",
      horario: "11:45",
      itens: 21,
      pagamento: "Cartão de Crédito",
      valor: "R$ 120,00",
      status: "PRONTO",
    },
    {
      numero: "ORD-006",
      nome: "Eduardo Lima",
      endereco: "Rua dos Ipês, 987 - Alto da Boa Vista",
      horario: "11:45",
      itens: 21,
      pagamento: "Cartão de Crédito",
      valor: "R$ 120,00",
      status: "CONCLUIDO",
    },
  ]);

  return (
    <View style={styles.container}>
      <Header titulo="Pedidos" />

      <FlatList
        data={pedidos}
        keyExtractor={(item) => item.numero}
        renderItem={({ item }) => <CardPedido {...item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.yellowBG[100],
  },
});
