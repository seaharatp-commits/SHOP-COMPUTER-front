import { Box, Flex, Text } from "@chakra-ui/react";

export default function Footer() {
  return (
    <Box as="footer" bg="gray.900" color="gray.300" mt={16}>
      <Flex maxW="7xl" mx="auto" px={{ base: 4, md: 8 }} py={8} direction="column" gap={2}>
        <Text fontWeight="bold" color="white">
          SHOP COMPUTER
        </Text>
        <Text fontSize="sm">ร้านขายคอมเซทออนไลน์ ปรับแต่งสเปกได้ตามใจ ชำระเงินง่ายผ่าน QR Code</Text>
        <Text fontSize="xs" color="gray.500" mt={4}>
          © {new Date().getFullYear()} SHOP COMPUTER. All rights reserved.
        </Text>
      </Flex>
    </Box>
  );
}
