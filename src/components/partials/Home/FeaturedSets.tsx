"use client";

import { Box, Heading, SimpleGrid, Text, Spinner, Center } from "@chakra-ui/react";
import { useCatalog } from "@/context/CatalogContext";
import PrebuiltCard from "./PrebuiltCard";

export default function FeaturedSets() {
  const { prebuiltSets, isLoading, error } = useCatalog();

  return (
    <Box id="featured-sets" maxW="7xl" mx="auto" px={{ base: 4, md: 8 }} py={{ base: 12, md: 16 }}>
      <Box textAlign="center" mb={10}>
        <Heading as="h2" size="xl" mb={2}>
          คอมเซทสำเร็จรูป
        </Heading>
        <Text color="gray.600">เลือกชุดที่ใช่ หรือกดเข้าไปปรับแต่งสเปกเพิ่มได้ทุกชิ้น</Text>
      </Box>

      {isLoading && (
        <Center py={10}>
          <Spinner color="brand.500" />
        </Center>
      )}

      {error && (
        <Center py={10}>
          <Text color="red.500">{error}</Text>
        </Center>
      )}

      {!isLoading && !error && (
        <SimpleGrid columns={{ base: 1, md: 3 }} gap={6}>
          {prebuiltSets.map((set) => (
            <PrebuiltCard key={set.id} set={set} />
          ))}
        </SimpleGrid>
      )}
    </Box>
  );
}
