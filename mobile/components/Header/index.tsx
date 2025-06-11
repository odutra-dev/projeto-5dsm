import { View, Text, StyleSheet } from "react-native";
import theme from "../../theme";
export default function Header({ titulo }: { titulo: string }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{titulo}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.rosePrincipal[400],
    paddingHorizontal: 24,
    height: 80,
    justifyContent: "center",
  },

  title: {
    color: theme.colors.yellowBG[100],
    fontSize: 24,
    fontWeight: "bold",
  },
});
