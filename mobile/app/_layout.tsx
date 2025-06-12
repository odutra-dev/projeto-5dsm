import { Slot } from "expo-router";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function Layout() {
  const query = new QueryClient();
  return (
    <QueryClientProvider client={query}>
      <Slot />
    </QueryClientProvider>
  );
}
