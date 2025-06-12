import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Modal,
  TextInput,
  Image,
  ScrollView,
} from "react-native";
import Header from "../../components/Header";
import theme from "../../theme";
import { CardProduto, CardProps } from "../../components/CardProduto";
import { api } from "../../services/api";
import { Plus } from "phosphor-react-native";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import * as ImagePicker from "expo-image-picker";

export default function Produtos() {
  const [modalVisible, setModalVisible] = useState(false);
  const [imagem, setImagem] = useState<string | null>(null);
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [preco, setPreco] = useState(0);
  const queryClient = useQueryClient();

  const selecionaProdutos = async (): Promise<CardProps[]> => {
    const response = await api.get("/produtos");
    return response.data;
  };

  const salvarProduto = async () => {
    if (!imagem) return;

    const formData = new FormData();

    formData.append("nome", nome);
    formData.append("descricao", descricao);
    formData.append("preco", String(preco));

    const fileName = imagem.split("/").pop() || "image.jpg";
    const match = /\.(\w+)$/.exec(fileName ?? "");
    const ext = match?.[1] ?? "jpg";
    const type = `image/${ext}`;

    formData.append("file", {
      uri: imagem,
      name: fileName,
      type,
    } as any); // "as any" é necessário para o React Native

    const response = await api.post("/produtos", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  };

  const mutationAdicionaProduto = useMutation({
    mutationKey: ["produtos"],
    mutationFn: salvarProduto,
    onSuccess: () => {
      setNome("");
      setPreco(0);
      setImagem(null);
      setDescricao("");
      setModalVisible(false);
      queryClient.invalidateQueries({ queryKey: ["produtos"] });
    },
  });

  const querySelecionaProdutos = useQuery({
    queryKey: ["produtos"],
    queryFn: selecionaProdutos,
  });

  const escolherImagem = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImagem(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      <Header titulo="Produtos" />

      <View style={styles.main}>
        <Text style={styles.titulo}>Produtos</Text>

        <FlatList
          style={{ marginTop: 16 }}
          data={querySelecionaProdutos.data}
          renderItem={({ item }) => (
            <CardProduto
              id={item.id}
              nome={item.nome}
              descricao={item.descricao}
              imagemUrl={item.imagemUrl}
              preco={item.preco}
            />
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>

      <TouchableOpacity
        style={styles.add}
        onPress={() => setModalVisible(true)}
      >
        <Plus size={24} color={theme.colors.rosePrincipal[100]} />
      </TouchableOpacity>

      <Modal visible={modalVisible} animationType="slide">
        <ScrollView contentContainerStyle={styles.modalContainer}>
          <Header titulo="Adicionar Produto" />

          <View style={styles.mainModal}>
            <TouchableOpacity
              style={styles.imagePicker}
              onPress={escolherImagem}
            >
              {imagem ? (
                <Image source={{ uri: imagem }} style={styles.imagePreview} />
              ) : (
                <Text style={styles.imagePlaceholder}>Selecionar imagem</Text>
              )}
            </TouchableOpacity>

            <TextInput
              placeholder="Nome do produto"
              value={nome}
              onChangeText={setNome}
              style={styles.input}
            />
            <TextInput
              placeholder="Descrição"
              value={descricao}
              onChangeText={setDescricao}
              style={styles.input}
              multiline
            />
            <TextInput
              placeholder="Preço"
              value={preco}
              onChangeText={setPreco}
              keyboardType="number-pad"
              style={styles.input}
            />

            <TouchableOpacity style={styles.salvar} onPress={salvarProduto}>
              <Text style={styles.salvarText}>Salvar</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => mutationAdicionaProduto.mutate()}>
              <Text style={styles.cancelar}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.yellowBG[100],
    position: "relative",
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
  add: {
    backgroundColor: theme.colors.rosePrincipal[500],
    position: "absolute",
    bottom: 12,
    right: 12,
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  modalContainer: {
    backgroundColor: theme.colors.yellowBG[100],
    flexGrow: 1,
  },
  mainModal: {
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  input: {
    backgroundColor: "transparent",
    borderColor: theme.colors.rosePrincipal[500],
    borderWidth: 1,
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    fontSize: 16,
  },
  imagePicker: {
    height: 150,
    borderRadius: 12,
    backgroundColor: "transparent",
    borderColor: theme.colors.rosePrincipal[500],
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  imagePreview: {
    width: "100%",
    height: "100%",
    borderRadius: 12,
  },
  imagePlaceholder: {
    color: "#777",
  },
  salvar: {
    backgroundColor: theme.colors.rosePrincipal[500],
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 12,
  },
  salvarText: {
    color: theme.colors.rosePrincipal[100],
    fontSize: 16,
    fontWeight: "bold",
  },
  cancelar: {
    textAlign: "center",
    color: "#666",
    fontSize: 16,
  },
});
