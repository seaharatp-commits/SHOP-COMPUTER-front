"use client";

import { Box, Stack, Heading, Text, HStack, Separator } from "@chakra-ui/react";
import { CheckCircle2, Circle } from "lucide-react";
import { BaseButton } from "@/components/ui/Button";
import { formatCurrency } from "@/lib/utils/format";
import { CATEGORY_LABEL, CATEGORY_ORDER } from "@/constant/data/components";
import type { PCBuild } from "@/types/app/product";

interface BuildSummaryProps {
  build: PCBuild;
  totalPrice: number;
  isComplete: boolean;
  onAddToCart: () => void;
}

export default function BuildSummary({ build, totalPrice, isComplete, onAddToCart }: BuildSummaryProps) {
  return (
    <Box bg="white" rounded="xl" borderWidth="1px" borderColor="gray.200" p={6} position="sticky" top={24}>
      <Heading as="h3" size="md" mb={4}>
        สรุปสเปกของคุณ
      </Heading>
      <Stack gap={2} mb={4}>
        {CATEGORY_ORDER.map((category) => {
          const part = build[category];
          return (
            <HStack key={category} justify="space-between" fontSize="sm">
              <HStack gap={2} color={part ? "gray.700" : "gray.400"}>
                {part ? <CheckCircle2 size={14} color="#16a34a" /> : <Circle size={14} />}
                <Text>{CATEGORY_LABEL[category]}</Text>
              </HStack>
              <Text fontWeight={part ? "medium" : "normal"} color={part ? "gray.800" : "gray.400"}>
                {part ? formatCurrency(part.price) : "ยังไม่เลือก"}
              </Text>
            </HStack>
          );
        })}
      </Stack>
      <Separator mb={4} />
      <HStack justify="space-between" mb={6}>
        <Text fontWeight="bold">ราคารวม</Text>
        <Text fontWeight="bold" fontSize="xl" color="brand.700">
          {formatCurrency(totalPrice)}
        </Text>
      </HStack>
      <BaseButton w="full" size="lg" disabled={!isComplete} onClick={onAddToCart}>
        {isComplete ? "เพิ่มลงตะกร้า" : "กรุณาเลือกอุปกรณ์ให้ครบ"}
      </BaseButton>
    </Box>
  );
}
