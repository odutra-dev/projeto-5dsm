import { View, Text } from "react-native";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Home() {
  const [user, setUser] = useState(null);

  const router = useRouter();

  useEffect(() => {
    const getUser = async () => {
      const user = await AsyncStorage.getItem("user");

      if (user) {
        setUser(JSON.parse(user));
      } else {
        router.replace("/login");
      }
    };

    getUser();
  }, []);

  return (
    <View>
      <Text>Home</Text>
    </View>
  );
}
