import { View, Text, StyleSheet, FlatList, ScrollView } from "react-native";
import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Header from "../../components/Header";
import theme from "../../theme";
import CardStatus from "../../components/CardStatus";

export default function Home() {
  const [user, setUser] = useState("");

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

  return (
    <ScrollView style={styles.container}>
      <Header titulo="Dashboard" />
      <View style={styles.main}>
        <Text style={styles.titulo}>Olá, {user}!</Text>

        <Text style={[styles.subtitulo, { marginTop: 32 }]}>Rsumo Geral</Text>
        <View style={styles.cards}>
          <CardStatus numero={4} status="PENDENTE" />
          <CardStatus numero={2} status="EMPRODUCAO" />
          <CardStatus numero={1} status="PRONTO" />
          <CardStatus numero={3} status="CONCLUIDO" />
        </View>

        <Text style={[styles.subtitulo, { marginTop: 32 }]}>
          Pedidos Recentes
        </Text>

        <FlatList
          data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
          keyExtractor={(item) => String(item)}
          renderItem={({ item }) => (
            <View
              style={{
                backgroundColor: theme.colors.rosePrincipal[100],
                padding: 16,
                borderRadius: 8,
                marginBottom: 16,
              }}
            >
              <Text style={{ color: theme.colors.rosePrincipal[500] }}>
                {item}
              </Text>
            </View>
          )}
        />
      </View>
    </ScrollView>
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
});
