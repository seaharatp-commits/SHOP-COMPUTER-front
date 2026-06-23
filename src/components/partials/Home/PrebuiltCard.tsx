"use client";

import Link from "next/link";
import { Box, Badge, Heading, Text, Stack, HStack, List } from "@chakra-ui/react";
import { CheckCircle2 } from "lucide-react";
import { BaseButton } from "@/components/ui/Button";
import { formatCurrency } from "@/lib/utils/format";
import { CATEGORY_ORDER } from "@/constant/data/components";
import type { PrebuiltSet } from "@/types/app/product";

export default function PrebuiltCard({ set }: { set: PrebuiltSet }) {
  const highlightCategories = CATEGORY_ORDER.filter((c) => c === "cpu" || c === "gpu" || c === "ram" || c === "storage");

  return (
    <Box bg="white" borderWidth="1px" borderColor="gray.200" rounded="xl" overflow="hidden" _hover={{ shadow: "lg" }} transition="box-shadow 0.2s">
      <Box bg="gray.50" p={6} textAlign="center">
        <Box as="img" src={set.image} alt={set.name} h="160px" mx="auto" />
      </Box>
      <Stack p={6} gap={3}>
        <HStack justify="space-between">
          <Heading as="h3" size="md">
            {set.name}
          </Heading>
          {set.badge && <Badge colorPalette="brand">{set.badge}</Badge>}
        </HStack>
        <Text fontSize="sm" color="gray.600">
          {set.tagline}
        </Text>
        <List.Root gap={1} fontSize="sm" color="gray.700">
          {highlightCategories.map((category) => {
            const part = set.build[category];
            if (!part) return null;
            return (
              <List.Item key={category} display="flex" alignItems="center" gap={2}>
                <CheckCircle2 size={14} color="#4f46e5" />
                {part.name}
              </List.Item>
            );
          })}
        </List.Root>
        <Text fontSize="2xl" fontWeight="bold" color="brand.700" mt={2}>
          {formatCurrency(set.price)}
        </Text>
        <Link href={`/builder?preset=${set.id}`}>
          <BaseButton w="full">เลือกชุดนี้ / ปรับแต่งเพิ่ม</BaseButton>
        </Link>
      </Stack>
    </Box>
  );
}
