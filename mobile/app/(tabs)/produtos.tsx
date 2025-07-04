import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Modal,
  TextInput,
  Image,
  Alert,
  ActivityIndicator,
} from "react-native";
import Header from "../../components/Header";
import theme from "../../theme";
import { CardProduto, CardProps } from "../../components/CardProduto";
import { api } from "../../services/api";
import { Plus } from "phosphor-react-native";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from "expo-media-library";
import { showToastWithGravity } from "../../util/toast";

type ImagemSelecionada = {
  uri: string;
  name: string;
  type: string;
};

export default function Produtos() {
  const [modalVisible, setModalVisible] = useState(false);
  const [imagem, setImagem] = useState<ImagemSelecionada | null>(null);
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [preco, setPreco] = useState("");
  const queryClient = useQueryClient();

  const selecionaProdutos = async (): Promise<CardProps[]> => {
    const response = await api.get("/produtos");
    return response.data;
  };

  const salvarProduto = async ({ nome, descricao, preco, imagem }) => {
    try {
      // Verificação extra para garantir que a imagem tenha sido selecionada
      if (!imagem || !imagem.uri) {
        throw new Error("Imagem não selecionada ou URL inválida.");
      }

      const formData = new FormData();

      formData.append("nome", nome);
      formData.append("descricao", descricao);
      formData.append("preco", preco);

      formData.append("file", {
        uri: imagem.uri,
        name: imagem.name || "imagem.jpg",
        type: imagem.type || "image/jpeg", // Confirmando que o tipo é correto
      });

      const response = await api.post("/produtos", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return response.data; // opcional para usar onSuccess com dados
    } catch (error) {
      console.error("Erro ao salvar produto:", error);
      throw error; // para o React Query captar o erro
    }
  };

  const mutationAdicionaProduto = useMutation({
    mutationKey: ["produtos"],
    mutationFn: salvarProduto,
    onSuccess: () => {
      setNome("");
      setPreco("");
      setImagem(null);
      setDescricao("");
      setModalVisible(false);
      queryClient.invalidateQueries({ queryKey: ["produtos"] });
      showToastWithGravity("Produto adicionado com sucesso!");
    },
  });

  const querySelecionaProdutos = useQuery({
    queryKey: ["produtos"],
    queryFn: selecionaProdutos,
  });

  const selecionarImagem = async (
    setImagem: (img: ImagemSelecionada) => void
  ) => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      Alert.alert(
        "Permissão necessária",
        "Você precisa permitir acesso à galeria nas configurações do app."
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: "images",
      allowsEditing: true,
      quality: 1,
      base64: false, // <- isso é o padrão, mas explícito aqui
    });

    console.log("Resultado do ImagePicker:", result); // Adicionando log aqui

    if (!result.canceled && result.assets.length > 0) {
      const asset = result.assets[0];

      const imagemSelecionada: ImagemSelecionada = {
        uri: asset.uri,
        name: asset.fileName ?? "imagem.jpg",
        type: asset.type?.startsWith("image/") ? asset.type : "image/jpeg", // força tipo válido
      };

      console.log("Imagem selecionada:", imagemSelecionada); // Verificando o que é passado para o setImagem
      setImagem(imagemSelecionada);
    }
  };

  return (
    <View style={styles.container}>
      <Header titulo="Produtos" />

      <FlatList
        data={querySelecionaProdutos.data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <CardProduto
            id={item.id}
            nome={item.nome}
            descricao={item.descricao}
            imagemUrl={item.imagemUrl}
            preco={item.preco}
          />
        )}
        ListHeaderComponent={
          <Text style={[styles.titulo, { marginBottom: 16 }]}>Produtos</Text>
        }
        contentContainerStyle={styles.flatListContainer}
      />

      <TouchableOpacity
        style={styles.add}
        onPress={() => setModalVisible(true)}
      >
        <Plus size={24} color={theme.colors.rosePrincipal[100]} />
      </TouchableOpacity>

      <Modal visible={modalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <Header titulo="Adicionar Produto" />

          <View style={styles.mainModal}>
            <TouchableOpacity
              style={styles.imagePicker}
              onPress={() => selecionarImagem(setImagem)}
            >
              {imagem?.uri ? (
                <Image
                  source={{ uri: imagem.uri }}
                  style={styles.imagePreview}
                />
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

            {mutationAdicionaProduto.isPending ? (
              <View style={{ marginVertical: 16, alignItems: "center" }}>
                <ActivityIndicator
                  size="large"
                  color={theme.colors.rosePrincipal[500]}
                />
                <Text
                  style={{
                    marginTop: 8,
                    color: theme.colors.rosePrincipal[500],
                  }}
                >
                  Salvando produto...
                </Text>
              </View>
            ) : (
              <>
                <TouchableOpacity
                  style={styles.salvar}
                  onPress={() =>
                    mutationAdicionaProduto.mutate({
                      nome,
                      descricao,
                      preco,
                      imagem,
                    })
                  }
                >
                  <Text style={styles.salvarText}>Salvar</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.cancelar}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.cancelarText}>Cancelar</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
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
  titulo: {
    color: theme.colors.rosePrincipal[500],
    fontSize: 24,
    fontWeight: "bold",
    paddingHorizontal: 24,
    paddingTop: 40,
  },
  flatListContainer: {
    paddingHorizontal: 24,
    paddingBottom: 120,
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
    flex: 1,
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
    backgroundColor: theme.colors.chocolateBrown[200],
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  cancelarText: {
    color: theme.colors.chocolateBrown[600],
    fontSize: 16,
    fontWeight: "bold",
  },
});
