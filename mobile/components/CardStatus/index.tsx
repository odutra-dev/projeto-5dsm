import { View, Text, StyleSheet } from "react-native";
import theme from "../../theme";
import { JSX } from "react";
import { Hourglass, ChefHat, Check, Package } from "phosphor-react-native";

const statusConfig = {
  PENDENTE: {
    bg: theme.colors.yellowBG[300],
    iconBg: theme.colors.yellowBG[400],
    icone: <Hourglass size={24} color={theme.colors.yellowBG[700]} />,
    borderBg: theme.colors.yellowBG[600],
    textColor: {
      number: theme.colors.yellowBG[700],
      label: theme.colors.yellowBG[700],
    },
    label: "Pendente",
  },
  EMPRODUCAO: {
    bg: theme.colors.sunshadeOrange[300],
    iconBg: theme.colors.sunshadeOrange[400],
    icone: <ChefHat size={24} color={theme.colors.sunshadeOrange[700]} />,
    borderBg: theme.colors.sunshadeOrange[600],
    textColor: {
      number: theme.colors.sunshadeOrange[700],
      label: theme.colors.sunshadeOrange[700],
    },
    label: "Em Produção",
  },
  PRONTO: {
    bg: theme.colors.bostonBlue[300],
    iconBg: theme.colors.bostonBlue[400],
    icone: <Package size={24} color={theme.colors.bostonBlue[700]} />,
    borderBg: theme.colors.bostonBlue[600],
    textColor: {
      number: theme.colors.bostonBlue[700],
      label: theme.colors.bostonBlue[700],
    },
    label: "Produto",
  },
  CONCLUIDO: {
    bg: theme.colors.atlantisGreen[300],
    iconBg: theme.colors.atlantisGreen[400],
    icone: <Check size={24} color={theme.colors.atlantisGreen[700]} />,
    borderBg: theme.colors.atlantisGreen[600],
    textColor: {
      number: theme.colors.atlantisGreen[700],
      label: theme.colors.atlantisGreen[700],
    },
    label: "Concluído",
  },
};

type Props = {
  numero: string | number;
  status: keyof typeof statusConfig;
};

export default function CardStatus({ numero, status }: Props) {
  const { bg, icone, iconBg, borderBg, textColor, label } =
    statusConfig[status];

  return (
    <View
      style={[styles.container, { backgroundColor: bg, borderColor: borderBg }]}
    >
      <View
        style={[
          styles.iconWrapper,
          { backgroundColor: iconBg, borderColor: borderBg },
        ]}
      >
        {icone}
      </View>

      <View style={styles.textContainer}>
        <Text style={[styles.number, { color: textColor.number }]}>
          {numero}
        </Text>
        <Text style={[styles.status, { color: textColor.label }]}>{label}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 8,
    height: 80,
    width: 160,
    borderWidth: 1,
  },

  iconWrapper: {
    width: 40,
    borderWidth: 2,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  textContainer: {
    flex: 1,
    justifyContent: "center",
  },

  number: {
    fontSize: 24,
    fontWeight: "bold",
  },

  status: {
    fontSize: 14,
    marginTop: 4,
  },
});
