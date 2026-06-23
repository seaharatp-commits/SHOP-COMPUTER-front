"use client";

import { Box, Stack, HStack, Text, Separator } from "@chakra-ui/react";
import { formatCurrency } from "@/lib/utils/format";
import type { CartItem } from "@/types/app/cart";

export default function OrderSummary({ items, totalPrice }: { items: CartItem[]; totalPrice: number }) {
  return (
    <Box bg="white" rounded="xl" borderWidth="1px" borderColor="gray.200" p={6}>
      <Text fontWeight="bold" fontSize="lg" mb={4}>
        รายการสั่งซื้อ
      </Text>
      <Stack gap={3}>
        {items.map((item) => (
          <HStack key={item.id} justify="space-between" fontSize="sm">
            <Text color="gray.700">
              {item.name} × {item.quantity}
            </Text>
            <Text fontWeight="medium">{formatCurrency(item.unitPrice * item.quantity)}</Text>
          </HStack>
        ))}
      </Stack>
      <Separator my={4} />
      <HStack justify="space-between">
        <Text fontWeight="bold">ยอดรวมทั้งหมด</Text>
        <Text fontWeight="bold" color="brand.700">
          {formatCurrency(totalPrice)}
        </Text>
      </HStack>
    </Box>
  );
}
