"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Box, Center, Grid, GridItem, Heading, Stack, Text, Alert } from "@chakra-ui/react";
import Link from "next/link";
import { BaseButton } from "@/components/ui/Button";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import * as ordersService from "@/services/orders.service";
import * as paymentsService from "@/services/payments.service";
import { ApiError } from "@/lib/api/client";
import type { CreateOrderItemInput } from "@/types/api/order";
import type { OrderDto } from "@/types/api/order";
import ShippingForm, { type ShippingInfo } from "./ShippingForm";
import OrderSummary from "./OrderSummary";
import QRPaymentCard from "./QRPaymentCard";

const EMPTY_SHIPPING: ShippingInfo = { fullName: "", phone: "", address: "", guestEmail: "" };

export default function CheckoutContent() {
  const router = useRouter();
  const { items, totalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const [shipping, setShipping] = useState<ShippingInfo>(EMPTY_SHIPPING);
  const [order, setOrder] = useState<OrderDto | null>(null);
  const [isCreatingOrder, setIsCreatingOrder] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isShippingValid =
    shipping.fullName.trim() && shipping.phone.trim() && shipping.address.trim() && (user || shipping.guestEmail.trim());

  const handleCreateOrder = async () => {
    setError(null);
    setIsCreatingOrder(true);
    try {
      const orderItems: CreateOrderItemInput[] = items.map((item) => ({
        itemType: "CUSTOM",
        quantity: item.quantity,
        build: Object.fromEntries(
          Object.entries(item.build)
            .filter(([, part]) => Boolean(part))
            .map(([category, part]) => [category, part!.id]),
        ),
      }));

      const createdOrder = await ordersService.createOrder({
        items: orderItems,
        shippingFullName: shipping.fullName,
        shippingPhone: shipping.phone,
        shippingAddress: shipping.address,
        guestEmail: user ? undefined : shipping.guestEmail,
      });
      setOrder(createdOrder);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "สร้างคำสั่งซื้อไม่สำเร็จ กรุณาลองใหม่");
    } finally {
      setIsCreatingOrder(false);
    }
  };

  const handleConfirmPayment = async () => {
    if (!order) return;
    setError(null);
    setIsConfirming(true);
    try {
      await paymentsService.confirmPayment(order.orderNo);
      clearCart();
      router.push(`/order-success?ref=${order.orderNo}&total=${order.total}`);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "ยืนยันการชำระเงินไม่สำเร็จ");
    } finally {
      setIsConfirming(false);
    }
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

      {error && (
        <Alert.Root status="error" mb={6} rounded="md">
          <Alert.Indicator />
          <Alert.Title>{error}</Alert.Title>
        </Alert.Root>
      )}

      <Grid templateColumns={{ base: "1fr", lg: "1fr 1fr" }} gap={8}>
        <GridItem>
          <Stack gap={6}>
            <ShippingForm value={shipping} onChange={setShipping} requireGuestEmail={!user} />
            <OrderSummary items={items} totalPrice={totalPrice} />
            {!order && (
              <BaseButton size="lg" disabled={!isShippingValid} loading={isCreatingOrder} onClick={handleCreateOrder}>
                ดำเนินการชำระเงิน
              </BaseButton>
            )}
          </Stack>
        </GridItem>
        <GridItem>
          {order ? (
            <QRPaymentCard
              amount={Number(order.payment.amount)}
              orderRef={order.orderNo}
              expiresAt={order.payment.expiresAt}
              isConfirming={isConfirming}
              onConfirmPayment={handleConfirmPayment}
            />
          ) : (
            <Center bg="white" rounded="xl" borderWidth="1px" borderColor="gray.200" p={10} h="full">
              <Text color="gray.500" textAlign="center">
                กรอกข้อมูลจัดส่งให้ครบถ้วน แล้วกด &quot;ดำเนินการชำระเงิน&quot;
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
