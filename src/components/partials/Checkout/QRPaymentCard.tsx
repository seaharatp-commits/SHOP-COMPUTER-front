"use client";

import { useEffect, useState } from "react";
import { Box, Stack, Text, HStack, Badge } from "@chakra-ui/react";
import { QrCode } from "lucide-react";
import { BaseButton } from "@/components/ui/Button";
import { formatCurrency } from "@/lib/utils/format";
import MockQrCode from "./MockQrCode";

interface QRPaymentCardProps {
  amount: number;
  orderRef: string;
  expiresAt: string;
  isConfirming: boolean;
  onConfirmPayment: () => void;
}

const getSecondsLeft = (expiresAt: string) => Math.max(0, Math.round((new Date(expiresAt).getTime() - Date.now()) / 1000));

export default function QRPaymentCard({ amount, orderRef, expiresAt, isConfirming, onConfirmPayment }: QRPaymentCardProps) {
  const [secondsLeft, setSecondsLeft] = useState(() => getSecondsLeft(expiresAt));

  useEffect(() => {
    const timer = setInterval(() => setSecondsLeft(getSecondsLeft(expiresAt)), 1000);
    return () => clearInterval(timer);
  }, [expiresAt]);

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;
  const isExpired = secondsLeft === 0;

  return (
    <Box bg="white" rounded="xl" borderWidth="1px" borderColor="gray.200" p={6}>
      <HStack mb={4} gap={2}>
        <QrCode size={20} color="#4f46e5" />
        <Text fontWeight="bold" fontSize="lg">
          ชำระเงินผ่าน QR Code (PromptPay)
        </Text>
      </HStack>

      <Stack align="center" gap={3} mb={4}>
        <Box position="relative" opacity={isExpired ? 0.3 : 1}>
          <MockQrCode seed={orderRef} />
        </Box>
        <Badge colorPalette={isExpired ? "red" : "brand"} size="lg">
          {isExpired ? "QR Code หมดอายุ" : `เหลือเวลา ${minutes}:${seconds.toString().padStart(2, "0")}`}
        </Badge>
        <Text fontSize="sm" color="gray.500">
          เลขที่อ้างอิงคำสั่งซื้อ: {orderRef}
        </Text>
        <Text fontWeight="bold" fontSize="2xl" color="brand.700">
          {formatCurrency(amount)}
        </Text>
      </Stack>

      <Text fontSize="xs" color="gray.500" textAlign="center" mb={4}>
        * ตัวอย่าง QR สำหรับสาธิตหน้าจอเท่านั้น ยังไม่เชื่อมต่อระบบชำระเงินจริง
      </Text>

      <BaseButton w="full" size="lg" loading={isConfirming} disabled={isExpired} onClick={onConfirmPayment}>
        ฉันชำระเงินแล้ว
      </BaseButton>
    </Box>
  );
}
