"use client";

import Link from "next/link";
import { Box, Flex, Heading, Text, HStack, Image } from "@chakra-ui/react";
import { Settings2, ShieldCheck } from "lucide-react";
import { BaseButton } from "@/components/ui/Button";

export default function HeroSection() {
  return (
    <Box bg="brand.700" color="white" py={{ base: 12, md: 20 }}>
      <Flex maxW="7xl" mx="auto" px={{ base: 4, md: 8 }} direction={{ base: "column", md: "row" }} align="center" gap={10}>
        <Box flex={1}>
          <Heading as="h1" size={{ base: "2xl", md: "3xl" }} mb={4}>
            สร้างคอมในฝัน ปรับแต่งได้เอง ในไม่กี่คลิก
          </Heading>
          <Text fontSize={{ base: "md", md: "lg" }} color="brand.100" mb={8}>
            เลือกคอมเซทสำเร็จรูป หรือเลือกอุปกรณ์ทุกชิ้นด้วยตัวเอง ระบบคำนวณราคาให้ทันที
            ชำระเงินง่าย สแกนจ่ายผ่าน QR Code
          </Text>
          <HStack gap={4} flexWrap="wrap">
            <Link href="/builder">
              <BaseButton size="lg" bg="white" color="brand.700" _hover={{ bg: "brand.50" }}>
                <Settings2 size={18} style={{ marginRight: 8 }} />
                เริ่มปรับแต่งคอมของคุณ
              </BaseButton>
            </Link>
            <Link href="#featured-sets">
              <BaseButton size="lg" variant="outline" borderColor="white" color="white" _hover={{ bg: "whiteAlpha.200" }}>
                ดูคอมเซทสำเร็จรูป
              </BaseButton>
            </Link>
          </HStack>
          <HStack mt={8} gap={2} color="brand.100">
            <ShieldCheck size={18} />
            <Text fontSize="sm">รับประกันสินค้า 3 ปี • ชำระเงินปลอดภัยด้วย QR Code</Text>
          </HStack>
        </Box>
        <Box flex={1} display={{ base: "none", md: "block" }}>
          <Image src="/components/pc-hero.svg" alt="คอมเซทตัวอย่าง" w="full" maxW="420px" mx="auto" />
        </Box>
      </Flex>
    </Box>
  );
}
