"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Box, Flex, Grid, GridItem, Heading, Text } from "@chakra-ui/react";
import { CATEGORY_ORDER } from "@/constant/data/components";
import { PREBUILT_SETS, calcBuildPrice } from "@/constant/data/prebuilt";
import { useCart } from "@/context/CartContext";
import CategoryNav from "./CategoryNav";
import CategoryOptions from "./CategoryOptions";
import BuildSummary from "./BuildSummary";
import type { ComponentCategory, ComponentOption, PCBuild } from "@/types/app/product";

export default function BuilderContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { addItem } = useCart();

  const [build, setBuild] = useState<PCBuild>({});
  const [activeCategory, setActiveCategory] = useState<ComponentCategory>("cpu");

  useEffect(() => {
    const presetId = searchParams.get("preset");
    const preset = PREBUILT_SETS.find((set) => set.id === presetId);
    if (preset) setBuild(preset.build);
  }, [searchParams]);

  const totalPrice = useMemo(() => calcBuildPrice(build), [build]);
  const isComplete = CATEGORY_ORDER.every((category) => Boolean(build[category]));

  const handleSelect = (option: ComponentOption) => {
    setBuild((prev) => ({ ...prev, [option.category]: option }));
  };

  const handleAddToCart = () => {
    const name = `คอมเซทปรับแต่งเอง (${build.cpu?.name ?? ""} + ${build.gpu?.name ?? ""})`;
    addItem({
      id: `custom-${Date.now()}`,
      type: "custom",
      name,
      image: build.case?.image ?? "/components/case.svg",
      unitPrice: totalPrice,
      build,
    });
    router.push("/cart");
  };

  return (
    <Box maxW="7xl" mx="auto" px={{ base: 4, md: 8 }} py={10}>
      <Heading as="h1" size="xl" mb={1}>
        ปรับแต่งคอมของคุณเอง
      </Heading>
      <Text color="gray.600" mb={8}>
        เลือกอุปกรณ์ทีละหมวด ระบบจะคำนวณราคารวมให้อัตโนมัติ
      </Text>

      <Grid templateColumns={{ base: "1fr", lg: "220px 1fr 320px" }} gap={8}>
        <GridItem display={{ base: "none", lg: "block" }}>
          <CategoryNav activeCategory={activeCategory} build={build} onSelect={setActiveCategory} />
        </GridItem>

        <GridItem>
          <Flex gap={2} mb={6} overflowX="auto" display={{ base: "flex", lg: "none" }}>
            <CategoryNav activeCategory={activeCategory} build={build} onSelect={setActiveCategory} />
          </Flex>
          <CategoryOptions category={activeCategory} selected={build[activeCategory]} onChange={handleSelect} />
        </GridItem>

        <GridItem>
          <BuildSummary build={build} totalPrice={totalPrice} isComplete={isComplete} onAddToCart={handleAddToCart} />
        </GridItem>
      </Grid>
    </Box>
  );
}
