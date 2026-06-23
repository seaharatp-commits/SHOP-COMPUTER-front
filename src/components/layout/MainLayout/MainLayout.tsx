import { Box } from "@chakra-ui/react";
import Header from "./Header";
import Footer from "./Footer";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <Box minH="100vh" display="flex" flexDirection="column" bg="gray.50">
      <Header />
      <Box flex={1}>{children}</Box>
      <Footer />
    </Box>
  );
}
