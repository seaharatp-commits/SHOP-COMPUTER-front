"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Box, Center, Flex, Grid, GridItem, Heading, Spinner, Text } from "@chakra-ui/react";
import { useCatalog } from "@/context/CatalogContext";
import { useCart } from "@/context/CartContext";
import CategoryNav from "./CategoryNav";
import CategoryOptions from "./CategoryOptions";
import BuildSummary from "./BuildSummary";
import type { ComponentCategory, ComponentOption, PCBuild } from "@/types/app/product";

export default function BuilderContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { addItem } = useCart();
  const { categoryOrder, getPrebuiltSetById, isLoading, error } = useCatalog();

  const [build, setBuild] = useState<PCBuild>({});
  const [activeCategory, setActiveCategory] = useState<ComponentCategory | null>(null);

  useEffect(() => {
    if (categoryOrder.length > 0 && !activeCategory) setActiveCategory(categoryOrder[0]);
  }, [categoryOrder, activeCategory]);

  useEffect(() => {
    const presetId = searchParams.get("preset");
    const preset = presetId ? getPrebuiltSetById(presetId) : undefined;
    if (preset) setBuild(preset.build);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams, isLoading]);

  const totalPrice = useMemo(
    () => Object.values(build).reduce((sum, part) => sum + (part?.price ?? 0), 0),
    [build],
  );
  const isComplete = categoryOrder.length > 0 && categoryOrder.every((category) => Boolean(build[category]));

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

  if (isLoading || !activeCategory) {
    return (
      <Center py={20}>
        <Spinner color="brand.500" size="lg" />
      </Center>
    );
  }

  if (error) {
    return (
      <Center py={20}>
        <Text color="red.500">{error}</Text>
      </Center>
    );
  }

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
