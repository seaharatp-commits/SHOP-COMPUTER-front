"use client";

import { Stack, Heading, RadioCard } from "@chakra-ui/react";
import { useCatalog } from "@/context/CatalogContext";
import OptionCard from "./OptionCard";
import type { ComponentCategory, ComponentOption } from "@/types/app/product";

interface CategoryOptionsProps {
  category: ComponentCategory;
  selected?: ComponentOption;
  onChange: (option: ComponentOption) => void;
}

export default function CategoryOptions({ category, selected, onChange }: CategoryOptionsProps) {
  const { getOptionsByCategory, categoryLabel } = useCatalog();
  const options = getOptionsByCategory(category);

  return (
    <Stack gap={4}>
      <Heading as="h2" size="md">
        เลือก{categoryLabel[category]}
      </Heading>
      <RadioCard.Root
        value={selected?.id ?? null}
        onValueChange={(details) => {
          const option = options.find((item) => item.id === details.value);
          if (option) onChange(option);
        }}
      >
        <Stack gap={3}>
          {options.map((option) => (
            <OptionCard key={option.id} option={option} />
          ))}
        </Stack>
      </RadioCard.Root>
    </Stack>
  );
}
