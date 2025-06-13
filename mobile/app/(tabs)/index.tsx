import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Header from "../../components/Header";
import theme from "../../theme";
import CardStatus from "../../components/CardStatus";
import CardPedido from "../../components/CardPedido";

export default function Home() {
  const [user, setUser] = useState("");

  const router = useRouter();

  const pedidos = [
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
  ];

  useEffect(() => {
    const getUser = async () => {
      const user = await AsyncStorage.getItem("user");

      if (user) {
        setUser(user);
      } else {
        router.replace("/login");
      }
    };

    getUser();
  }, []);

  return (
    <View style={styles.container}>
      <Header titulo="Dashboard" />
      <FlatList
        contentContainerStyle={styles.flatListContainer}
        ListHeaderComponent={
          <>
            <Text style={styles.titulo}>Olá, {user}!</Text>

            <Text style={[styles.subtitulo, { marginTop: 32 }]}>
              Resumo Geral
            </Text>
            <View style={styles.cards}>
              <CardStatus numero={4} status="PENDENTE" />
              <CardStatus numero={2} status="EMPRODUCAO" />
              <CardStatus numero={1} status="PRONTO" />
              <CardStatus numero={3} status="CONCLUIDO" />
            </View>

            <View style={styles.main}>
              <Text style={[styles.subtitulo]}>Pedidos Recentes</Text>
              <TouchableOpacity onPress={() => router.push("/pedidos")}>
                <Text style={styles.verTodos}>Ver todos</Text>
              </TouchableOpacity>
            </View>
          </>
        }
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
  main: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 32,
  },
  titulo: {
    color: theme.colors.rosePrincipal[500],
    fontSize: 24,
    fontWeight: "bold",
  },
  subtitulo: {
    marginBottom: 16,
    color: theme.colors.rosePrincipal[500],
    fontSize: 18,
    fontWeight: "bold",
  },

  cards: {
    flexDirection: "row",
    gap: 16,
    flexWrap: "wrap",
    width: "100%",
  },
  flatListContainer: {
    paddingHorizontal: 24,
    paddingVertical: 32,
  },

  verTodos: {
    color: theme.colors.rosePrincipal[500],
    fontSize: 16,
    fontWeight: "bold",
  },
});
