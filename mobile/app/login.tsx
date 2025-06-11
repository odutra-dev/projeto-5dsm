import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useState } from "react";
import { SignIn } from "phosphor-react-native";
import { api } from "../services/api";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Login() {
  const [email, setEmail] = useState<string>("");
  const [senha, setSenha] = useState<string>("");

  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const fazerLogin = async () => {
    if (!email || !senha) {
      Alert.alert("Campos obrigatórios", "Preencha e-mail e senha.");
      return;
    }

    setLoading(true);

    try {
      const response = await api.post("/admins/login", { email, senha });

      const { token, nome } = response.data;

      // Valida se token e nome vieram corretamente
      if (!token || !nome) {
        throw new Error("Credenciais inválidas.");
      }

      await AsyncStorage.setItem("token", token);
      await AsyncStorage.setItem("user", nome);

      router.replace("(tabs)");
    } catch (error) {
      const mensagem =
        error.response?.data?.message ||
        error.message ||
        "Erro ao tentar fazer login.";
      Alert.alert("Erro", mensagem);
    } finally {
      setLoading(false);
    }
  };

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
            keyboardType="email-address"
            style={styles.input}
            onChangeText={setEmail}
            value={email}
          />
        </View>
        <View style={{ gap: 4 }}>
          <Text style={styles.label}>Senha</Text>
          <TextInput
            secureTextEntry
            style={styles.input}
            onChangeText={setSenha}
            value={senha}
          />
        </View>

        <TouchableOpacity
          style={[styles.botao, loading && { opacity: 0.6 }]}
          onPress={fazerLogin}
          disabled={loading}
        >
          <Text style={{ color: "#FFFBD6", fontSize: 16, fontWeight: "bold" }}>
            {loading ? "Entrando..." : "Entrar"}
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
