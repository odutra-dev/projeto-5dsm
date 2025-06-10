import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useState } from "react";
import { SignIn } from "phosphor-react-native";

export default function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          style={styles.logo}
          source={require("../assets/logo.svg")}
          alt="Geladinho Santista"
          width={24}
          height={24}
        />
      </View>

      <View style={styles.content}>
        <Text style={styles.titulo}>Acesse sua conta</Text>

        <View style={{ gap: 4 }}>
          <Text style={styles.label}>E-mail</Text>
          <TextInput
            style={styles.input}
            onChangeText={setEmail}
            value={email}
          />
        </View>
        <View style={{ gap: 4 }}>
          <Text style={styles.label}>Senha</Text>
          <TextInput
            style={styles.input}
            onChangeText={setPassword}
            value={password}
          />
        </View>

        <TouchableOpacity style={styles.botao}>
          <Text style={{ color: "#FFFBD6", fontSize: 16, fontWeight: "bold" }}>
            Entrar
          </Text>
          <SignIn size={24} color="#FFFBD6" weight="bold" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFBD6",
  },
  header: {
    backgroundColor: "#F493AE",
    paddingHorizontal: 24,
    height: 128,
    position: "relative",
  },
  logo: {
    width: 96,
    height: 96,
    position: "absolute",
    bottom: -48,
  },
  content: {
    paddingHorizontal: 24,
    marginTop: 48,
    gap: 16,
  },
  titulo: {
    color: "#F493AE",
    fontSize: 24,
    fontWeight: "bold",
  },
  label: {
    color: "#A45E4D",
    fontSize: 16,
  },
  input: {
    height: 48,
    borderRadius: 8,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: "#F493AE",
  },
  botao: {
    height: 48,
    flexDirection: "row",
    paddingHorizontal: 24,
    borderRadius: 8,
    backgroundColor: "#F493AE",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
