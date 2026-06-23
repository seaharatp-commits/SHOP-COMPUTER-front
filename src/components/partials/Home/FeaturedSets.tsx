import { Box, Heading, SimpleGrid, Text } from "@chakra-ui/react";
import { PREBUILT_SETS } from "@/constant/data/prebuilt";
import PrebuiltCard from "./PrebuiltCard";

export default function FeaturedSets() {
  return (
    <Box id="featured-sets" maxW="7xl" mx="auto" px={{ base: 4, md: 8 }} py={{ base: 12, md: 16 }}>
      <Box textAlign="center" mb={10}>
        <Heading as="h2" size="xl" mb={2}>
          คอมเซทสำเร็จรูป
        </Heading>
        <Text color="gray.600">เลือกชุดที่ใช่ หรือกดเข้าไปปรับแต่งสเปกเพิ่มได้ทุกชิ้น</Text>
      </Box>
      <SimpleGrid columns={{ base: 1, md: 3 }} gap={6}>
        {PREBUILT_SETS.map((set) => (
          <PrebuiltCard key={set.id} set={set} />
        ))}
      </SimpleGrid>
    </Box>
  );
}
