import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import { CarrinhoProvider } from "@/context/carrinho";
import { PedidoProvider } from "@/context/pedido";
import { QueryProvider } from "@/providers/QueryProvider";

const nunitoSans = Nunito({
  variable: "--font-nunito-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Geladinho Santista",
  description: "Sobresas de Geladinho Santista",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${nunitoSans.variable} font-sans antialiased bg-secondary`}
      >
        <CarrinhoProvider>
          <PedidoProvider>
            <QueryProvider>{children}</QueryProvider>
          </PedidoProvider>
        </CarrinhoProvider>
      </body>
    </html>
  );
}
