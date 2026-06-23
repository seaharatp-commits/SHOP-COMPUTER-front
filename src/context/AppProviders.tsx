"use client";

import { ChakraProvider, createSystem, defaultConfig } from "@chakra-ui/react";
import { ThemeProvider as ColorModeProvider } from "next-themes";
import { CartProvider } from "@/context/CartContext";

const system = createSystem(defaultConfig, {
  theme: {
    tokens: {
      colors: {
        brand: {
          50: { value: "#eef2ff" },
          100: { value: "#e0e7ff" },
          400: { value: "#818cf8" },
          500: { value: "#6366f1" },
          600: { value: "#4f46e5" },
          700: { value: "#4338ca" },
        },
      },
    },
  },
});

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <ChakraProvider value={system}>
      <ColorModeProvider attribute="class" disableTransitionOnChange defaultTheme="light">
        <CartProvider>{children}</CartProvider>
      </ColorModeProvider>
    </ChakraProvider>
  );
}
