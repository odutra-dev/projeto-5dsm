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
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../services/api";

export default function Home() {
  const [user, setUser] = useState("");
  const queryClient = useQueryClient();

  const selecionaPedidos = async () => {
    const response = await api.get("/pedido");
    return response.data;
  };

  const querySelecionaPedidos = useQuery({
    queryKey: ["pedidos"],
    queryFn: selecionaPedidos,
  });

  const router = useRouter();

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

  const isToday = (dateString: string) => {
    const today = new Date();
    const todayString = today.toISOString().split("T")[0]; // formato "2025-06-13"

    return dateString === todayString;
  };

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
              <CardStatus
                numero={
                  querySelecionaPedidos.data?.filter(
                    (pedido: any) =>
                      pedido.status === "PENDENTE" && isToday(pedido.data)
                  ).length || 0
                }
                status="PENDENTE"
              />
              <CardStatus
                numero={
                  querySelecionaPedidos.data?.filter(
                    (pedido: any) =>
                      pedido.status === "EMPRODUCAO" && isToday(pedido.data)
                  ).length || 0
                }
                status="EMPRODUCAO"
              />
              <CardStatus
                numero={
                  querySelecionaPedidos.data?.filter(
                    (pedido: any) =>
                      pedido.status === "PRONTO" && isToday(pedido.data)
                  ).length || 0
                }
                status="PRONTO"
              />
              <CardStatus
                numero={
                  querySelecionaPedidos.data?.filter(
                    (pedido: any) =>
                      pedido.status === "CONCLUIDO" && isToday(pedido.data)
                  ).length || 0
                }
                status="CONCLUIDO"
              />
            </View>

            <View style={styles.main}>
              <Text style={[styles.subtitulo]}>Pedidos Recentes</Text>
              <TouchableOpacity onPress={() => router.push("/pedidos")}>
                <Text style={styles.verTodos}>Ver todos</Text>
              </TouchableOpacity>
            </View>
          </>
        }
        data={querySelecionaPedidos.data?.filter(
          (pedido: any) => isToday(pedido.data) && pedido.status !== "CONCLUIDO"
        )}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => router.push(`/pedido/${item.id}`)}>
            <CardPedido {...item} />
          </TouchableOpacity>
        )}
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
