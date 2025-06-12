import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import theme from "../../theme";

export type CardProps = {
  id: string;
  nome: string;
  descricao: string;
  imagemUrl: string;
  preco: number;
};

export const CardProduto = ({
  id,
  nome,
  descricao,
  imagemUrl,
  preco,
}: CardProps) => {
  return (
    <View style={styles.cardContainer}>
      <Image source={{ uri: imagemUrl }} style={styles.image} />

      <View style={styles.infoContainer}>
        <Text numberOfLines={1} style={styles.nome}>
          {nome}
        </Text>

        <Text numberOfLines={2} style={styles.descricao}>
          {descricao}
        </Text>

        <View style={styles.footer}>
          <Text style={styles.preco}>R$ {preco.toFixed(2)}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: "row",
    backgroundColor: theme.colors.sunshadeOrange[200],
    borderRadius: 16,
    borderWidth: 2,
    borderColor: theme.colors.chocolateBrown[400],
    padding: 16,
    gap: 16,
    marginBottom: 12,
  },
  image: {
    width: 128,
    height: 128,
    borderRadius: 16,
    resizeMode: "cover",
  },
  infoContainer: {
    flex: 1,
    justifyContent: "space-between",
  },
  nome: {
    fontWeight: "bold",
    fontSize: 18,
    color: theme.colors.rosePrincipal[700],
  },
  descricao: {
    fontSize: 14,
    color: theme.colors.chocolateBrown[600],
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  preco: {
    fontWeight: "bold",
    fontSize: 20,
    color: theme.colors.rosePrincipal[600],
  },
});
