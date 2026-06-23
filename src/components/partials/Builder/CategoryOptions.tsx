"use client";

import { Stack, Heading, RadioCard } from "@chakra-ui/react";
import { CATEGORY_LABEL, getOptionsByCategory } from "@/constant/data/components";
import OptionCard from "./OptionCard";
import type { ComponentCategory, ComponentOption } from "@/types/app/product";

interface CategoryOptionsProps {
  category: ComponentCategory;
  selected?: ComponentOption;
  onChange: (option: ComponentOption) => void;
}

export default function CategoryOptions({ category, selected, onChange }: CategoryOptionsProps) {
  const options = getOptionsByCategory(category);

  return (
    <Stack gap={4}>
      <Heading as="h2" size="md">
        เลือก{CATEGORY_LABEL[category]}
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
