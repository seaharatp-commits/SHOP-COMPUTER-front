"use client";

import Link from "next/link";
import { Box, Flex, HStack, Text, Badge } from "@chakra-ui/react";
import { Cpu, ShoppingCart } from "lucide-react";
import { useCart } from "@/context/CartContext";

const NAV_LINKS = [
  { href: "/", label: "หน้าแรก" },
  { href: "/builder", label: "ปรับแต่งคอม" },
];

export default function Header() {
  const { totalCount } = useCart();

  return (
    <Box as="header" position="sticky" top={0} zIndex={10} bg="white" borderBottomWidth="1px" borderColor="gray.100">
      <Flex maxW="7xl" mx="auto" px={{ base: 4, md: 8 }} h={16} align="center" justify="space-between">
        <Link href="/">
          <HStack gap={2}>
            <Cpu size={26} color="#4f46e5" />
            <Text fontWeight="bold" fontSize="lg" color="gray.800">
              SHOP COMPUTER
            </Text>
          </HStack>
        </Link>

        <HStack gap={8} display={{ base: "none", md: "flex" }}>
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href}>
              <Text fontWeight="medium" color="gray.600" _hover={{ color: "brand.600" }}>
                {link.label}
              </Text>
            </Link>
          ))}
        </HStack>

        <Link href="/cart">
          <Box position="relative" p={2}>
            <ShoppingCart size={22} />
            {totalCount > 0 && (
              <Badge
                position="absolute"
                top={-1}
                right={-1}
                colorPalette="red"
                borderRadius="full"
                fontSize="0.65rem"
                minW={5}
                textAlign="center"
              >
                {totalCount}
              </Badge>
            )}
          </Box>
        </Link>
      </Flex>
    </Box>
  );
}
