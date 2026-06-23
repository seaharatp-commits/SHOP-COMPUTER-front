"use client";

import Link from "next/link";
import { Box, Stack, HStack, Text, Separator } from "@chakra-ui/react";
import { BaseButton } from "@/components/ui/Button";
import { formatCurrency } from "@/lib/utils/format";

export default function CartSummary({ totalPrice, itemCount }: { totalPrice: number; itemCount: number }) {
  const shippingFee = totalPrice > 0 ? 0 : 0;

  return (
    <Box bg="white" rounded="xl" borderWidth="1px" borderColor="gray.200" p={6} position="sticky" top={24}>
      <Text fontWeight="bold" fontSize="lg" mb={4}>
        สรุปคำสั่งซื้อ
      </Text>
      <Stack gap={2} fontSize="sm">
        <HStack justify="space-between">
          <Text color="gray.600">จำนวนสินค้า</Text>
          <Text>{itemCount} ชิ้น</Text>
        </HStack>
        <HStack justify="space-between">
          <Text color="gray.600">ค่าจัดส่ง</Text>
          <Text color="green.600">ฟรี</Text>
        </HStack>
      </Stack>
      <Separator my={4} />
      <HStack justify="space-between" mb={6}>
        <Text fontWeight="bold">ยอดรวมทั้งหมด</Text>
        <Text fontWeight="bold" fontSize="xl" color="brand.700">
          {formatCurrency(totalPrice + shippingFee)}
        </Text>
      </HStack>
      <Link href="/checkout">
        <BaseButton w="full" size="lg" disabled={itemCount === 0}>
          ดำเนินการชำระเงิน
        </BaseButton>
      </Link>
    </Box>
  );
}
