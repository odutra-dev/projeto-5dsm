import { Tabs } from "expo-router";
import {
  House,
  ClipboardText,
  Package,
  ClockCounterClockwise,
} from "phosphor-react-native";
import theme from "../../theme";

export default function Layout_Tabs() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarInactiveTintColor: theme.colors.rosePrincipal[600],
        tabBarActiveTintColor: theme.colors.yellowBG[100],
        tabBarStyle: {
          backgroundColor: theme.colors.rosePrincipal[400],
          borderTopColor: theme.colors.rosePrincipal[500],
          borderTopWidth: 2,
        },
      }}
    >
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
      <Tabs.Screen
        name="produtos"
        options={{
          title: "Produtos",
          tabBarIcon: ({ color, size }) => {
            return <Package color={color} size={size} />;
          },
        }}
      />
      <Tabs.Screen
        name="historico"
        options={{
          title: "Histórico",
          tabBarIcon: ({ color, size }) => {
            return <ClockCounterClockwise color={color} size={size} />;
          },
        }}
      />
    </Tabs>
  );
}
