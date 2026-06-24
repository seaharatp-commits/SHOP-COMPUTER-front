"use client";

import { HStack, Stack, Text, Badge, RadioCard, Image } from "@chakra-ui/react";
import { formatCurrency } from "@/lib/utils/format";
import type { ComponentOption } from "@/types/app/product";

export default function OptionCard({ option }: { option: ComponentOption }) {
  return (
    <RadioCard.Item value={option.id} w="full">
      <RadioCard.ItemHiddenInput />
      <RadioCard.ItemControl
        p={4}
        rounded="lg"
        borderWidth="2px"
        _checked={{ borderColor: "brand.500", bg: "brand.50" }}
      >
        <HStack gap={4} w="full" align="start">
          <Image src={option.image} alt={option.name} boxSize="56px" flexShrink={0} />
          <Stack gap={1} flex={1}>
            <HStack justify="space-between">
              <Text fontWeight="bold">{option.name}</Text>
              {option.recommended && (
                <Badge colorPalette="green" size="sm">
                  แนะนำ
                </Badge>
              )}
            </HStack>
            <Text fontSize="xs" color="gray.500">
              {option.brand}
            </Text>
            <Text fontSize="xs" color="gray.600">
              {option.specs.join(" • ")}
            </Text>
            <Text fontWeight="bold" color="brand.700">
              {formatCurrency(option.price)}
            </Text>
          </Stack>
        </HStack>
      </RadioCard.ItemControl>
    </RadioCard.Item>
  );
}
