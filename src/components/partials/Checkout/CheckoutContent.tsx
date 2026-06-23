"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Box, Center, Grid, GridItem, Heading, Stack, Text } from "@chakra-ui/react";
import Link from "next/link";
import { BaseButton } from "@/components/ui/Button";
import { useCart } from "@/context/CartContext";
import ShippingForm, { type ShippingInfo } from "./ShippingForm";
import OrderSummary from "./OrderSummary";
import QRPaymentCard from "./QRPaymentCard";

const EMPTY_SHIPPING: ShippingInfo = { fullName: "", phone: "", address: "" };

export default function CheckoutContent() {
  const router = useRouter();
  const { items, totalPrice, clearCart } = useCart();
  const [shipping, setShipping] = useState<ShippingInfo>(EMPTY_SHIPPING);
  const [isConfirming, setIsConfirming] = useState(false);

  const orderRef = useMemo(() => `ORD-${Date.now().toString().slice(-8)}`, []);
  const isShippingValid = shipping.fullName.trim() && shipping.phone.trim() && shipping.address.trim();

  const handleConfirmPayment = () => {
    setIsConfirming(true);
    setTimeout(() => {
      clearCart();
      router.push(`/order-success?ref=${orderRef}&total=${totalPrice}`);
    }, 1800);
  };

  if (items.length === 0) {
    return (
      <Center maxW="7xl" mx="auto" px={4} py={20} flexDirection="column" gap={4}>
        <Text color="gray.600" fontSize="lg">
          ไม่มีสินค้าในตะกร้า กรุณาเลือกซื้อสินค้าก่อน
        </Text>
        <Link href="/builder">
          <BaseButton>เริ่มปรับแต่งคอมของคุณ</BaseButton>
        </Link>
      </Center>
    );
  }

  return (
    <Box maxW="6xl" mx="auto" px={{ base: 4, md: 8 }} py={10}>
      <Heading as="h1" size="xl" mb={8}>
        ชำระเงิน
      </Heading>
      <Grid templateColumns={{ base: "1fr", lg: "1fr 1fr" }} gap={8}>
        <GridItem>
          <Stack gap={6}>
            <ShippingForm value={shipping} onChange={setShipping} />
            <OrderSummary items={items} totalPrice={totalPrice} />
          </Stack>
        </GridItem>
        <GridItem>
          {isShippingValid ? (
            <QRPaymentCard
              amount={totalPrice}
              orderRef={orderRef}
              isConfirming={isConfirming}
              onConfirmPayment={handleConfirmPayment}
            />
          ) : (
            <Center bg="white" rounded="xl" borderWidth="1px" borderColor="gray.200" p={10} h="full">
              <Text color="gray.500" textAlign="center">
                กรุณากรอกข้อมูลจัดส่งให้ครบถ้วน
                <br />
                เพื่อแสดง QR Code สำหรับชำระเงิน
              </Text>
            </Center>
          )}
        </GridItem>
      </Grid>
    </Box>
  );
}
