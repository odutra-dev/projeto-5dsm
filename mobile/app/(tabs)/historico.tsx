import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Header from "../../components/Header";
import theme from "../../theme";
import CardPedido from "../../components/CardPedido";
import { useQuery } from "@tanstack/react-query";
import { api } from "../../services/api";
import { Picker } from "@react-native-picker/picker";

export default function Historico() {
  const [user, setUser] = useState("");
  const [mesSelecionado, setMesSelecionado] = useState<string>("todos");
  const [anoSelecionado, setAnoSelecionado] = useState<string>("todos");
  const router = useRouter();

  const selecionaPedidos = async () => {
    const response = await api.get("/pedido");
    return response.data;
  };

  const querySelecionaPedidos = useQuery({
    queryKey: ["pedidos"],
    queryFn: selecionaPedidos,
  });

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

  const filtraPorMesEAno = (pedido: any) => {
    const [ano, mes] = pedido.data.split("-");

    const condicaoMes = mesSelecionado === "todos" || mes === mesSelecionado;
    const condicaoAno = anoSelecionado === "todos" || ano === anoSelecionado;

    return condicaoMes && condicaoAno;
  };

  const meses = [
    { label: "Todos", value: "todos" },
    { label: "Janeiro", value: "01" },
    { label: "Fevereiro", value: "02" },
    { label: "Março", value: "03" },
    { label: "Abril", value: "04" },
    { label: "Maio", value: "05" },
    { label: "Junho", value: "06" },
    { label: "Julho", value: "07" },
    { label: "Agosto", value: "08" },
    { label: "Setembro", value: "09" },
    { label: "Outubro", value: "10" },
    { label: "Novembro", value: "11" },
    { label: "Dezembro", value: "12" },
  ];

  const anosDisponiveis = ["todos", "2024", "2025"]; // pode gerar isso dinamicamente se quiser

  return (
    <View style={styles.container}>
      <Header titulo="Histórico de Pedidos" />

      <View style={styles.filtros}>
        <View style={styles.filtro}>
          <Text style={styles.label}>Mês:</Text>
          <Picker
            selectedValue={mesSelecionado}
            onValueChange={(itemValue) => setMesSelecionado(itemValue)}
            style={styles.picker}
          >
            {meses.map((m) => (
              <Picker.Item label={m.label} value={m.value} key={m.value} />
            ))}
          </Picker>
        </View>

        <View style={styles.filtro}>
          <Text style={styles.label}>Ano:</Text>
          <Picker
            selectedValue={anoSelecionado}
            onValueChange={(itemValue) => setAnoSelecionado(itemValue)}
            style={styles.picker}
          >
            {anosDisponiveis.map((a) => (
              <Picker.Item label={a} value={a} key={a} />
            ))}
          </Picker>
        </View>
      </View>

      <FlatList
        contentContainerStyle={styles.flatListContainer}
        data={querySelecionaPedidos.data?.filter(filtraPorMesEAno)}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => router.push(`/pedido/${item.id}`)}>
            <CardPedido {...item} />
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <Text style={styles.semPedidos}>Nenhum pedido encontrado.</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.yellowBG[100],
  },
  titulo: {
    color: theme.colors.rosePrincipal[500],
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  filtros: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    marginTop: 16,
  },
  filtro: {
    flex: 1,
    marginHorizontal: 8,
  },
  label: {
    color: theme.colors.rosePrincipal[500],
    marginBottom: 4,
    fontWeight: "bold",
  },
  picker: {
    backgroundColor: theme.colors.sunshadeOrange[100],
    borderRadius: 8,
    height: 48,
    color: theme.colors.rosePrincipal[600],
  },
  flatListContainer: {
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  semPedidos: {
    textAlign: "center",
    color: theme.colors.rosePrincipal[500],
    marginTop: 24,
    fontSize: 16,
  },
});
