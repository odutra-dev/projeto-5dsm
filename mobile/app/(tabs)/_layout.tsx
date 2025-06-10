import { Tabs } from "expo-router";
import { House, ClipboardText } from "phosphor-react-native";

export default function Layout_Tabs() {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: "Dashboard",
          tabBarIcon: ({ color, size }) => {
            return <House color={color} size={size} />;
          },
        }}
      />
      <Tabs.Screen
        name="pedidos"
        options={{
          title: "Pedidos",
          tabBarIcon: ({ color, size }) => {
            return <ClipboardText color={color} size={size} />;
          },
        }}
      />
    </Tabs>
  );
}
