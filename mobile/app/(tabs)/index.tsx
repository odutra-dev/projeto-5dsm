import { View, Text, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Header from "../../components/Header";
import theme from "../../theme";
import CardStatus from "../../components/CardStatus";
import { Hourglass, ChefHat, Check, Package } from "phosphor-react-native";

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
    <View style={styles.container}>
      <Header titulo="Dashboard" />
      <View style={styles.main}>
        <Text style={styles.titulo}>Olá, {user}!</Text>

        <View style={styles.cards}>
          <CardStatus
            icone={<Hourglass size={24} />}
            numero={4}
            status="PENDENTE"
          />
          <CardStatus
            icone={<ChefHat size={24} />}
            numero={2}
            status="EMPRODUCAO"
          />
          <CardStatus
            icone={<Package size={24} />}
            numero={1}
            status="PRONTO"
          />
          <CardStatus
            icone={<Check size={24} />}
            numero={3}
            status="CONCLUIDO"
          />
        </View>
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
  titulo: {
    color: theme.colors.rosePrincipal[500],
    fontSize: 24,
    fontWeight: "bold",
  },

  cards: {
    flexDirection: "row",
    gap: 16,
    marginTop: 48,
    flexWrap: "wrap",
    width: "100%",
  },
});
