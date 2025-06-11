import { View, Text, StyleSheet } from "react-native";
import theme from "../../theme";
import { JSX } from "react";

const statusConfig = {
  PENDENTE: {
    bg: theme.colors.yellowBG[300],
    iconBg: theme.colors.yellowBG[400],
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
  icone: JSX.Element;
};

export default function CardStatus({ numero, status, icone }: Props) {
  const { bg, iconBg, borderBg, textColor, label } = statusConfig[status];

  return (
    <View style={[styles.container, { backgroundColor: bg }]}>
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
