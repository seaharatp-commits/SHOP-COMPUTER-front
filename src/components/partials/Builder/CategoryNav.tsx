"use client";

import { Box, Stack, Text, HStack, Circle } from "@chakra-ui/react";
import { Check } from "lucide-react";
import { useCatalog } from "@/context/CatalogContext";
import type { ComponentCategory, PCBuild } from "@/types/app/product";

interface CategoryNavProps {
  activeCategory: ComponentCategory;
  build: PCBuild;
  onSelect: (category: ComponentCategory) => void;
}

export default function CategoryNav({ activeCategory, build, onSelect }: CategoryNavProps) {
  const { categoryOrder, categoryLabel } = useCatalog();

  return (
    <Stack gap={1} as="nav">
      {categoryOrder.map((category) => {
        const isActive = category === activeCategory;
        const isSelected = Boolean(build[category]);
        return (
          <HStack
            key={category}
            as="button"
            onClick={() => onSelect(category)}
            justify="space-between"
            px={4}
            py={3}
            rounded="lg"
            bg={isActive ? "brand.50" : "transparent"}
            color={isActive ? "brand.700" : "gray.700"}
            fontWeight={isActive ? "bold" : "medium"}
            _hover={{ bg: "gray.100" }}
            textAlign="left"
            transition="background 0.15s"
          >
            <Text fontSize="sm">{categoryLabel[category]}</Text>
            {isSelected && (
              <Circle size={5} bg="green.500" color="white">
                <Check size={12} />
              </Circle>
            )}
          </HStack>
        );
      })}
    </Stack>
  );
}
