import { View, Text, StyleSheet, FlatList } from "react-native";
import Header from "../../components/Header";
import theme from "../../theme";
import { CardProduto, CardProps } from "../../components/CardProduto";
import { useEffect, useState } from "react";
import { api } from "../../services/api";

export default function Produtos() {
  const [produtos, setProdutos] = useState<CardProps[]>([]);

  useEffect(() => {
    api.get("/produtos").then((response) => {
      setProdutos(response.data);
    });
  }, []);

  return (
    <View style={styles.container}>
      <Header titulo="Produtos" />

      <View style={styles.main}>
        <Text style={styles.titulo}>Produtos</Text>

        <FlatList
          style={{ marginTop: 16 }}
          data={produtos}
          renderItem={({ item }) => (
            <CardProduto
              id={item.id}
              nome={item.nome}
              descricao={item.descricao}
              imagemUrl={item.imagemUrl}
              preco={item.preco}
            />
          )}
          keyExtractor={(item) => item.id}
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
  titulo: {
    color: theme.colors.rosePrincipal[500],
    fontSize: 24,
    fontWeight: "bold",
  },
});
