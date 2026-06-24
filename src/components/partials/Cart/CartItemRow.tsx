"use client";

import { HStack, Stack, Text, IconButton, NumberInput, Image } from "@chakra-ui/react";
import { Trash2 } from "lucide-react";
import { formatCurrency } from "@/lib/utils/format";
import type { CartItem } from "@/types/app/cart";

interface CartItemRowProps {
  item: CartItem;
  onQuantityChange: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
}

export default function CartItemRow({ item, onQuantityChange, onRemove }: CartItemRowProps) {
  const specs = Object.values(item.build)
    .filter(Boolean)
    .map((part) => part!.name);

  return (
    <HStack bg="white" rounded="xl" borderWidth="1px" borderColor="gray.200" p={4} gap={4} align="start">
      <Image src={item.image} alt={item.name} boxSize="80px" flexShrink={0} bg="gray.50" rounded="md" />
      <Stack flex={1} gap={1}>
        <Text fontWeight="bold">{item.name}</Text>
        <Text fontSize="xs" color="gray.500">
          {specs.slice(0, 4).join(" • ")}
          {specs.length > 4 ? " ..." : ""}
        </Text>
        <Text fontWeight="bold" color="brand.700">
          {formatCurrency(item.unitPrice)}
        </Text>
      </Stack>
      <Stack align="end" gap={2}>
        <IconButton aria-label="ลบสินค้า" variant="ghost" size="sm" colorPalette="red" onClick={() => onRemove(item.id)}>
          <Trash2 size={16} />
        </IconButton>
        <NumberInput.Root
          size="sm"
          maxW="100px"
          min={1}
          max={10}
          value={String(item.quantity)}
          onValueChange={(details) => onQuantityChange(item.id, Number(details.value) || 1)}
        >
          <NumberInput.Control />
          <NumberInput.Input />
        </NumberInput.Root>
      </Stack>
    </HStack>
  );
}
