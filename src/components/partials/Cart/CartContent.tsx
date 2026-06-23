"use client";

import Link from "next/link";
import { Box, Grid, GridItem, Heading, Stack, Text, Center } from "@chakra-ui/react";
import { ShoppingCart } from "lucide-react";
import { BaseButton } from "@/components/ui/Button";
import { useCart } from "@/context/CartContext";
import CartItemRow from "./CartItemRow";
import CartSummary from "./CartSummary";

export default function CartContent() {
  const { items, updateQuantity, removeItem, totalPrice } = useCart();

  if (items.length === 0) {
    return (
      <Center maxW="7xl" mx="auto" px={4} py={20} flexDirection="column" gap={4}>
        <ShoppingCart size={48} color="#9ca3af" />
        <Text color="gray.600" fontSize="lg">
          ตะกร้าสินค้าของคุณว่างอยู่
        </Text>
        <Link href="/builder">
          <BaseButton>เริ่มปรับแต่งคอมของคุณ</BaseButton>
        </Link>
      </Center>
    );
  }

  return (
    <Box maxW="7xl" mx="auto" px={{ base: 4, md: 8 }} py={10}>
      <Heading as="h1" size="xl" mb={8}>
        ตะกร้าสินค้า
      </Heading>
      <Grid templateColumns={{ base: "1fr", lg: "1fr 360px" }} gap={8}>
        <GridItem>
          <Stack gap={4}>
            {items.map((item) => (
              <CartItemRow key={item.id} item={item} onQuantityChange={updateQuantity} onRemove={removeItem} />
            ))}
          </Stack>
        </GridItem>
        <GridItem>
          <CartSummary totalPrice={totalPrice} itemCount={items.length} />
        </GridItem>
      </Grid>
    </Box>
  );
}
