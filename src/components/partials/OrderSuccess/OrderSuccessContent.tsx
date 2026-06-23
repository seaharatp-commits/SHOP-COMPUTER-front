"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Center, Stack, Text, Heading, Circle } from "@chakra-ui/react";
import { CheckCircle2 } from "lucide-react";
import { BaseButton } from "@/components/ui/Button";
import { formatCurrency } from "@/lib/utils/format";

export default function OrderSuccessContent() {
  const searchParams = useSearchParams();
  const orderRef = searchParams.get("ref") ?? "-";
  const total = Number(searchParams.get("total") ?? 0);

  return (
    <Center py={20} px={4}>
      <Stack align="center" gap={4} maxW="md" textAlign="center">
        <Circle size={20} bg="green.100" color="green.600">
          <CheckCircle2 size={48} />
        </Circle>
        <Heading as="h1" size="lg">
          ชำระเงินสำเร็จ!
        </Heading>
        <Text color="gray.600">ขอบคุณที่สั่งซื้อกับ SHOP COMPUTER เราจะจัดส่งสินค้าให้คุณภายใน 3-5 วันทำการ</Text>
        <Stack gap={1} bg="white" borderWidth="1px" borderColor="gray.200" rounded="lg" p={4} w="full">
          <Text fontSize="sm" color="gray.500">
            เลขที่คำสั่งซื้อ
          </Text>
          <Text fontWeight="bold">{orderRef}</Text>
          <Text fontSize="sm" color="gray.500" mt={2}>
            ยอดที่ชำระ
          </Text>
          <Text fontWeight="bold" color="brand.700">
            {formatCurrency(total)}
          </Text>
        </Stack>
        <Link href="/">
          <BaseButton size="lg">กลับสู่หน้าแรก</BaseButton>
        </Link>
      </Stack>
    </Center>
  );
}
